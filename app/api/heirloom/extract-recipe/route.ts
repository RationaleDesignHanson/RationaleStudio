/**
 * Heirloom Recipe Extraction API Route
 *
 * Proxies OCR extraction requests to Anthropic API to protect API key
 * Accepts base64 image data and returns structured recipe JSON
 *
 * Route: POST /api/heirloom/extract-recipe
 */

import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: Simple in-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

interface ExtractRecipeRequest {
  image: string; // base64 encoded image
}

interface RecipeExtraction {
  title: string;
  ingredients: string[];
  instructions: string[];
  servings?: string | null;
  prepTime?: string | null;
  cookTime?: string | null;
  confidence: {
    title: 'high' | 'medium' | 'low';
    ingredients: 'high' | 'medium' | 'low';
    instructions: 'high' | 'medium' | 'low';
  };
}

interface ErrorResponse {
  error: string;
}

/**
 * Simple rate limiting check
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = requestCounts.get(identifier);

  if (!record || now > record.resetTime) {
    requestCounts.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

/**
 * Extract client identifier for rate limiting
 */
function getClientIdentifier(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown';
  return ip;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const clientId = getClientIdentifier(req);
    if (!checkRateLimit(clientId)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a minute.' },
        { status: 429 }
      );
    }

    // Validate API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Parse request body
    const body: ExtractRecipeRequest = await req.json();

    if (!body.image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }

    // Clean base64 string (remove data URL prefix if present)
    const base64Data = body.image.replace(/^data:image\/\w+;base64,/, '');

    // Validate base64 size (approximate 10MB limit)
    const sizeInBytes = (base64Data.length * 3) / 4;
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB

    if (sizeInBytes > maxSizeInBytes) {
      return NextResponse.json(
        { error: 'Image size exceeds 10MB limit' },
        { status: 413 }
      );
    }

    // Make request to Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/jpeg',
                  data: base64Data,
                },
              },
              {
                type: 'text',
                text: `You are an OCR system for recipe cards. Extract the recipe from this image and return ONLY valid JSON with no markdown formatting, no code blocks, no explanation. Just the raw JSON object.

Use this exact structure:
{
  "title": "Recipe Name",
  "ingredients": ["ingredient 1", "ingredient 2"],
  "instructions": ["step 1", "step 2"],
  "servings": "4" or null,
  "prepTime": "15 min" or null,
  "cookTime": "30 min" or null,
  "confidence": {
    "title": "high" | "medium" | "low",
    "ingredients": "high" | "medium" | "low",
    "instructions": "high" | "medium" | "low"
  }
}

Base confidence on legibility:
- "high" = clearly readable, confident extraction
- "medium" = some words unclear but context helped
- "low" = significant guessing required

If you cannot read the image or it's not a recipe, return:
{"error": "Could not extract recipe from image"}`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Anthropic API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to process image' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Extract text from Claude's response
    const textContent = data.content?.find((c: any) => c.type === 'text')?.text;

    if (!textContent) {
      return NextResponse.json(
        { error: 'No text content in response' },
        { status: 500 }
      );
    }

    // Clean response (remove markdown code blocks if present)
    const cleanedText = textContent
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Parse the JSON
    const recipe: RecipeExtraction | ErrorResponse = JSON.parse(cleanedText);

    // Check if extraction failed
    if ('error' in recipe) {
      return NextResponse.json(
        { error: recipe.error },
        { status: 422 }
      );
    }

    // Return successful extraction
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    console.error('Recipe extraction error:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid response format from OCR service' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Reject other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

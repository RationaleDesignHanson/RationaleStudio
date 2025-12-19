/**
 * Heirloom Recipe Detection API Route
 *
 * Analyzes images to detect multiple recipes and their locations
 * Returns array of detected recipes with bounding boxes for selection
 *
 * Route: POST /api/heirloom/detect-recipes
 */

import { NextRequest, NextResponse } from 'next/server';

// Rate limiting: Simple in-memory store (use Redis in production)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

interface DetectRecipesRequest {
  image: string; // base64 encoded image
}

interface DetectedRecipe {
  id: string;
  title: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  confidence: 'high' | 'medium' | 'low';
}

interface DetectionResponse {
  recipes: DetectedRecipe[];
  imageWidth: number;
  imageHeight: number;
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
    const body: DetectRecipesRequest = await req.json();

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
        max_tokens: 1000,
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
                text: `Analyze this image and detect all recipes present. This could be a cookbook page, recipe card collection, or single recipe.

For each recipe detected, identify:
1. The recipe title (extract the actual title if visible)
2. Its approximate position in the image as a bounding box (x, y, width, height as percentages 0-100)
3. Your confidence in the detection

Return ONLY valid JSON with no markdown formatting, no code blocks, no explanation. Just the raw JSON object.

Use this exact structure:
{
  "recipes": [
    {
      "id": "1",
      "title": "Recipe Name Here",
      "boundingBox": {
        "x": 10,
        "y": 20,
        "width": 40,
        "height": 60
      },
      "confidence": "high" | "medium" | "low"
    }
  ],
  "imageWidth": 100,
  "imageHeight": 100
}

Guidelines:
- If you see only ONE recipe, return an array with one item
- If you see MULTIPLE recipes (like a cookbook page with 2-3 recipes), return all of them
- Bounding box coordinates should be percentages (0-100) of the image dimensions
- "high" confidence = clear distinct recipe with visible title
- "medium" confidence = recipe visible but title unclear
- "low" confidence = possible recipe but uncertain
- If no recipes detected, return: {"error": "No recipes found in image"}

Important: Even if there's just one recipe, still return it in the array format so the UI can handle it consistently.`,
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
    const result: DetectionResponse | ErrorResponse = JSON.parse(cleanedText);

    // Check if detection failed
    if ('error' in result) {
      return NextResponse.json(
        { error: result.error },
        { status: 422 }
      );
    }

    // Validate response structure
    if (!result.recipes || !Array.isArray(result.recipes)) {
      return NextResponse.json(
        { error: 'Invalid detection response format' },
        { status: 500 }
      );
    }

    // Return successful detection
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Recipe detection error:', error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid response format from detection service' },
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

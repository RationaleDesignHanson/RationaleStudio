/**
 * Generate an image from a Dumb Questions round using Replicate Flux
 * Uses question + conversation (answer1, answer2, answer3, answer4) as prompt
 */

import { NextResponse } from 'next/server';

const FLUX_MODEL = 'black-forest-labs/flux-schnell';

export async function POST(request: Request) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'REPLICATE_API_TOKEN not configured' },
      { status: 500 }
    );
  }

  let body: { prompt: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { prompt } = body;
  if (!prompt || typeof prompt !== 'string') {
    return NextResponse.json({ error: 'prompt required' }, { status: 400 });
  }

  // Limit prompt length
  const sanitized = prompt.slice(0, 1000);

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Prefer: 'wait=60',
      },
      body: JSON.stringify({
        version: FLUX_MODEL,
        input: {
          prompt: sanitized,
          num_outputs: 1,
          aspect_ratio: '1:1',
          output_format: 'webp',
        },
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('[dumbquestions] Replicate error:', response.status, err);
      return NextResponse.json(
        { error: `Image generation failed: ${response.status}` },
        { status: 502 }
      );
    }

    const result = await response.json();
    const output = result.output;

    if (!output || !Array.isArray(output) || output.length === 0) {
      return NextResponse.json(
        { error: 'No image in response' },
        { status: 502 }
      );
    }

    const imageUrl = output[0];
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[dumbquestions] Generate image error:', err);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}

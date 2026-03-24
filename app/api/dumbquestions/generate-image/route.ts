/**
 * Generate an image from a Dumb Questions round using Replicate Flux Dev
 */

import { NextResponse } from 'next/server';

export const maxDuration = 60;

export async function POST(request: Request) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    console.error('[dumbquestions] REPLICATE_API_TOKEN not set');
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

  const sanitized = prompt.slice(0, 1500);
  console.log('[dumbquestions] Generating image, prompt length:', sanitized.length);

  try {
    const response = await fetch(
      'https://api.replicate.com/v1/models/black-forest-labs/flux-dev/predictions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Prefer: 'wait=55',
        },
        body: JSON.stringify({
          input: {
            prompt: sanitized,
            num_outputs: 1,
            num_inference_steps: 35,
            guidance: 4.0,
            aspect_ratio: '1:1',
            output_format: 'webp',
            output_quality: 90,
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error('[dumbquestions] Replicate API error:', response.status, errBody);
      return NextResponse.json(
        { error: `Replicate returned ${response.status}` },
        { status: 502 }
      );
    }

    const result = await response.json();
    const output = result.output;
    const imageUrl = Array.isArray(output) ? output[0] : output;

    if (!imageUrl || typeof imageUrl !== 'string') {
      console.error('[dumbquestions] No image URL in response:', JSON.stringify(result).slice(0, 500));
      return NextResponse.json(
        { error: 'No image in response' },
        { status: 502 }
      );
    }

    console.log('[dumbquestions] Image generated successfully');
    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[dumbquestions] Generate image error:', err);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}

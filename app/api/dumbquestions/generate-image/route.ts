import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

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

  const sanitized = prompt.slice(0, 1500);

  try {
    const output = await replicate.run('black-forest-labs/flux-dev', {
      input: {
        prompt: sanitized,
        go_fast: true,
        num_outputs: 1,
        num_inference_steps: 28,
        guidance: 4.0,
        aspect_ratio: '1:1',
        output_format: 'webp',
        output_quality: 90,
      },
    });

    const imageUrl = Array.isArray(output) ? output[0] : output;
    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json(
        { error: 'No image in response' },
        { status: 502 }
      );
    }

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[dumbquestions] Generate image error:', err);
    return NextResponse.json(
      { error: 'Image generation failed' },
      { status: 500 }
    );
  }
}

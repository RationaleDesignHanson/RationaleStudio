import { NextResponse } from 'next/server';
import Replicate from 'replicate';

export async function POST(request: Request) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: 'REPLICATE_API_TOKEN not configured' }, { status: 500 });
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
    const replicate = new Replicate({ auth: token });

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

    // output can be: string, FileOutput (has .url()), or array of either
    let imageUrl: string | null = null;

    if (Array.isArray(output)) {
      const first = output[0];
      if (typeof first === 'string') {
        imageUrl = first;
      } else if (first && typeof first === 'object' && 'url' in first) {
        imageUrl = String((first as { url: () => string }).url());
      } else if (first && typeof first.toString === 'function') {
        imageUrl = first.toString();
      }
    } else if (typeof output === 'string') {
      imageUrl = output;
    } else if (output && typeof output === 'object' && 'url' in output) {
      imageUrl = String((output as { url: () => string }).url());
    } else if (output && typeof (output as Record<string, unknown>).toString === 'function') {
      imageUrl = String(output);
    }

    console.log('[dumbquestions] Replicate output type:', typeof output, 'isArray:', Array.isArray(output), 'url:', imageUrl?.slice(0, 100));

    if (!imageUrl || (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://'))) {
      console.error('[dumbquestions] Invalid image URL from Replicate:', imageUrl);
      return NextResponse.json({ error: 'No valid image URL in response' }, { status: 502 });
    }

    return NextResponse.json({ url: imageUrl });
  } catch (err) {
    console.error('[dumbquestions] Generate image error:', err);
    return NextResponse.json({ error: 'Image generation failed' }, { status: 500 });
  }
}

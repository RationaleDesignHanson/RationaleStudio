/**
 * Generate a comedic "cursed listing" photo for the Study Date quiz easter egg.
 * Uses the nano-banana image model (gemini-2.5-flash-image-preview) — the same
 * Gemini image pipeline the Fubo generator uses. Returns the image inline as a
 * base64 data URL so the static prototype page can drop it straight into <img>.
 */

import { NextResponse } from 'next/server';

export const maxDuration = 60;

const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';

interface RequestBody {
  listing?: string;
  riff?: string;
}

export async function POST(request: Request) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  let body: RequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const listing = (body.listing || '').toString().slice(0, 200).trim();
  if (!listing) {
    return NextResponse.json({ error: 'listing required' }, { status: 400 });
  }
  const riff = (body.riff || '').toString().slice(0, 200).trim();

  // Push hard toward the "Zillow Gone Wild / worst listing photo" comedy genre,
  // and force the house to VISIBLY embody the absurd name. A rotating style seed
  // keeps repeat rolls varied.
  const SEEDS = [
    `in the instantly-recognizable style of a viral "Zillow Gone Wild" listing photo`,
    `like the most baffling, unintentionally hilarious real-estate photo on the internet`,
    `as an over-the-top listing photo that makes people ask "wait, why is it like THAT?"`,
    `like a cursed MLS photo a realtor posted at 3am and immediately regretted`,
  ];
  const seed = SEEDS[Math.floor(Math.random() * SEEDS.length)];

  const prompt =
    `A funny, photorealistic real-estate listing photo, ${seed}. ` +
    `The property must VISIBLY and absurdly embody this description: "${listing}". Lean into the joke — make the ` +
    `weirdness obvious at a glance: questionable DIY additions, clashing architectural styles, a crooked or too-big ` +
    `"For Sale" sign in the yard, bizarre landscaping, and dramatic/unflattering lighting. ` +
    (riff ? `Overall vibe: ${riff} ` : '') +
    `Still believable as a real (terrible) listing. Wide-angle exterior shot. No text, captions, logos, or watermarks.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ['TEXT', 'IMAGE'] },
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error('[study-date] Gemini error:', res.status, errText);
      throw new Error(`Gemini returned ${res.status}`);
    }

    const data = await res.json();
    const parts = data?.candidates?.[0]?.content?.parts || [];
    const imgPart = parts.find((p: any) => p.inlineData || p.inline_data);
    const inline = imgPart?.inlineData || imgPart?.inline_data;
    if (!inline?.data) {
      throw new Error('No image in Gemini response');
    }
    const mime = inline.mimeType || inline.mime_type || 'image/png';
    return NextResponse.json({ url: `data:${mime};base64,${inline.data}` });
  } catch (err) {
    console.error('[study-date] listing-image error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Image generation failed' },
      { status: 500 }
    );
  }
}

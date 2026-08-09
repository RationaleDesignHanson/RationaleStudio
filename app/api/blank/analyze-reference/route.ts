/**
 * Reference analysis for the BLANK microsite.
 *
 * A visitor uploads a garment/graphic reference; this classifies it into the
 * same vocabulary the cost model speaks (decoration method, colour count, print
 * size, placement) so the client can price it with lib/blank/economics.ts and
 * show which executable variants come closest.
 *
 * DESIGN NOTES — this endpoint is publicly reachable regardless of the
 * UnlockGate around /work/blank, so it defends itself:
 *
 *  1. The image is NEVER stored. It arrives as base64, goes to the model, and
 *     is discarded when the request ends. No blob store, no logging of pixels.
 *  2. The browser sends NO PROMPT — only an image. The prompt is built here
 *     from a fixed template, so prompt injection has no surface.
 *  3. Structured outputs force the response into a fixed schema, so the
 *     endpoint cannot be turned into a general-purpose text generator.
 *  4. Hard caps on payload size, per-IP rate, and daily spend.
 *
 * Deliberately NOT modelled on app/api/dumbquestions/generate-image/route.ts,
 * which calls Replicate from this same app with no cap, no auth, and no limit.
 */

import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

export const runtime = 'nodejs';

// ── Cost controls ────────────────────────────────────────────────────────────
const MAX_IMAGE_BYTES = 4 * 1024 * 1024; // 4MB decoded
const RATE_LIMIT_PER_IP = 5; // per window
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const DAILY_CALL_CEILING = 200; // hard stop for the whole endpoint

/**
 * NOTE ON DURABILITY: these counters live in module scope, which means they are
 * per-instance. On Netlify's serverless runtime several instances can be warm at
 * once, so the real ceiling is (instances x DAILY_CALL_CEILING) rather than the
 * number below. That is a deliberate v1 tradeoff — it bounds a runaway loop and
 * costs nothing, but it is NOT a spend guarantee.
 *
 * For a real guarantee, move both counters to shared state (the project already
 * has Supabase wired up) or set a hard spend cap in the Anthropic console.
 */
const ipHits = new Map<string, number[]>();
let dailyCount = 0;
let dailyResetAt = 0;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_PER_IP) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

function overDailyCeiling(): boolean {
  const now = Date.now();
  if (now > dailyResetAt) {
    dailyCount = 0;
    dailyResetAt = now + 24 * 60 * 60 * 1000;
  }
  if (dailyCount >= DAILY_CALL_CEILING) return true;
  dailyCount += 1;
  return false;
}

// ── The vocabulary the cost model speaks ─────────────────────────────────────
// Every enum value here maps onto something lib/blank/economics.ts can price.
// If the model can't map a reference into this vocabulary, that IS the finding.
const ANALYSIS_SCHEMA = {
  type: 'object',
  properties: {
    garment: {
      type: 'string',
      enum: ['tee', 'hoodie', 'cap', 'jacket', 'trousers', 'other', 'unclear'],
    },
    decoration: {
      type: 'string',
      enum: ['screen', 'discharge', 'dtf', 'dtg', 'embroidery', 'patch', 'woven-label', 'none', 'unclear'],
      description: 'The decoration technique the reference appears to use.',
    },
    colors: {
      type: 'integer',
      description: 'Distinct ink or thread colours in the decoration. 0 if undecorated.',
    },
    sizeInches: {
      type: 'number',
      description: 'Widest dimension of the decoration in inches, estimated against the garment.',
    },
    placement: {
      type: 'string',
      enum: ['full-front', 'left-chest', 'centre-chest', 'back', 'sleeve', 'hem', 'all-over', 'none', 'unclear'],
    },
    tonal: {
      type: 'boolean',
      description: 'True if the decoration is close in value to the garment (reads as texture, not graphic).',
    },
    confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
    notes: {
      type: 'string',
      description: 'One sentence on what drove the read, or what was ambiguous. Max 200 chars.',
    },
  },
  required: ['garment', 'decoration', 'colors', 'sizeInches', 'placement', 'tonal', 'confidence', 'notes'],
  additionalProperties: false,
} as const;

const SYSTEM = `You classify apparel reference images for a small-run streetwear cost model.

Judge only what is visible. Estimate the decoration's width in inches against the garment, assuming an adult garment roughly 20 inches across the chest.

Distinguish techniques carefully, because they price very differently:
- screen print: flat opaque ink sitting in the cloth, hard edges, countable spot colours
- discharge: the garment's own dye bleached out, soft edges, no ink layer on the surface
- DTF/DTG: photographic or gradient-heavy, often a faint film edge visible
- embroidery: raised satin stitch, visible thread direction and sheen
- patch: a separate piece of fabric stitched on, with a bordered edge
- woven label: a small woven tag at a hem or seam

Count spot colours, not perceived shades — a two-tone halftone is one colour.
Set tonal=true when the decoration is within roughly one value step of the garment.
Use "unclear" rather than guessing when the image does not show enough.`;

interface Body {
  image?: { media_type?: string; data?: string };
}

const ALLOWED_MEDIA = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Analysis is not configured.' }, { status: 503 });
  }

  const ip =
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Rate limit: ${RATE_LIMIT_PER_IP} references per 10 minutes.` },
      { status: 429 },
    );
  }
  if (overDailyCeiling()) {
    return NextResponse.json(
      { error: 'Daily analysis limit reached. Try again tomorrow.' },
      { status: 429 },
    );
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const mediaType = body.image?.media_type;
  const data = body.image?.data;
  if (!data || !mediaType) {
    return NextResponse.json({ error: 'No image supplied.' }, { status: 400 });
  }
  if (!ALLOWED_MEDIA.has(mediaType)) {
    return NextResponse.json({ error: 'Unsupported image type.' }, { status: 415 });
  }
  // base64 inflates by ~4/3; check the decoded size.
  if ((data.length * 3) / 4 > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: 'Image too large — 4MB maximum.' }, { status: 413 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: 'claude-opus-5',
      max_tokens: 2048,
      system: SYSTEM,
      // Low effort: this is a constrained extraction, not a reasoning task.
      // Structured output means the response cannot exceed the schema.
      output_config: {
        effort: 'low',
        format: { type: 'json_schema', schema: ANALYSIS_SCHEMA },
      },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mediaType as 'image/png', data } },
            { type: 'text', text: 'Classify this apparel reference.' },
          ],
        },
      ],
    });

    // A refusal returns HTTP 200 with an empty/partial content array — check
    // before indexing, or this throws on an entirely normal response.
    if (response.stop_reason === 'refusal') {
      return NextResponse.json(
        { error: 'That image could not be analysed. Try a different reference.' },
        { status: 422 },
      );
    }

    const text = response.content.find((b) => b.type === 'text');
    if (!text || text.type !== 'text') {
      return NextResponse.json({ error: 'Analysis returned no result.' }, { status: 502 });
    }

    return NextResponse.json({
      analysis: JSON.parse(text.text),
      usage: {
        input_tokens: response.usage.input_tokens,
        output_tokens: response.usage.output_tokens,
      },
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'Upstream rate limit. Try again shortly.' }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      // Don't leak upstream error text to a public endpoint.
      console.error('[blank/analyze-reference] API error', err.status, err.message);
      return NextResponse.json({ error: 'Analysis failed.' }, { status: 502 });
    }
    console.error('[blank/analyze-reference] error', err);
    return NextResponse.json({ error: 'Analysis failed.' }, { status: 500 });
  }
}

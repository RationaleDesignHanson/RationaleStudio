/**
 * Deviation renders — put a chosen graphic on a chosen garment, in a chosen
 * colourway, at a chosen budget tier.
 *
 * The canonical 15 plates (garment x tier) are committed and served for free.
 * This endpoint exists only for combinations outside that set, which is the
 * half of "play with what it looks like" that can't be pre-generated: 3 garments
 * x 5 tiers x 12 graphics x 5 colourways is 900 images, and nobody is paying to
 * render 900 images against the chance someone looks at one.
 *
 * FOUR THINGS KEEP THIS FROM COSTING MONEY:
 *
 *  1. It is behind the same unlock cookie as the page. This is not a public
 *     endpoint. `app/api/dumbquestions/generate-image/route.ts` calls Replicate
 *     with no auth, no rate limit and no ceiling — that is the precedent NOT
 *     to copy.
 *  2. The cache is checked first and is keyed on the tuple. A deterministic
 *     seed means the second request for a combination is always a free hit.
 *  3. The daily ceiling counts rows in Postgres, not a module-scope integer.
 *     A per-instance counter resets on cold start and is a speed bump, not a
 *     guarantee.
 *  4. Tuples the business model says are impossible are rejected before any
 *     spend. A cap cannot take an 11-inch numeral; a cut-and-sew panel is not
 *     producible in a Stage 0 run. The business logic IS the abuse filter.
 *
 * The browser never sends a prompt — only a tuple. Prompt injection is
 * structurally impossible.
 */

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isUnlocked } from '@/lib/unlock';
import {
  ASPECT,
  composePrompt,
  derivedSeed,
  tupleKey,
  validateTuple,
  type RenderTuple,
} from '@/lib/blank/prompts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Imagen 4, not Flux. A three-model bake-off on the tonal brief: Flux 1.1 Pro
 * failed it across four prompt revisions (blank chest, then full-contrast
 * square, then a larger cream square), while Imagen 4, Flux 2 Pro and
 * Seedream 4 all rendered it correctly on the first attempt with identical
 * text. Imagen 4 won on flat-lay cleanliness; Flux 2 Pro hallucinated text on
 * the neck label and Seedream ignored aspect_ratio.
 */
const RENDER_MODEL = 'google/imagen-4';

/** Hard stop for paid renders in a rolling 24h, counted in Postgres. */
const DAILY_RENDER_CEILING = 60;
/** Per-IP renders per window. Cheap first line; the ceiling is the real one. */
const RATE_LIMIT_PER_IP = 8;
const RATE_WINDOW_MS = 10 * 60 * 1000;

const ipHits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_PER_IP) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function renderWithFlux(tuple: RenderTuple, prompt: string): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN not configured');

  const res = await fetch(
    `https://api.replicate.com/v1/models/${RENDER_MODEL}/predictions`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        // Wait inline rather than polling — a serverless function that returns
        // and then polls has nowhere to keep the prediction id.
        Prefer: 'wait=55',
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio: ASPECT[tuple.garment],
          image_size: '1K',
          output_format: 'jpg',
          // No seed: Imagen 4 does not accept one. The cache, not a seed, is
          // what guarantees a shared link shows the sender's image.
        },
      }),
    },
  );

  if (!res.ok) {
    const body = await res.text();
    console.error('[blank/generate] Replicate error', res.status, body.slice(0, 400));
    throw new Error(`Replicate returned ${res.status}`);
  }

  const result = await res.json();
  if (result.status === 'failed' || result.error) {
    throw new Error(`Render failed: ${String(result.error ?? 'unknown')}`);
  }
  const out = Array.isArray(result.output) ? result.output[0] : result.output;
  if (!out || typeof out !== 'string') throw new Error('No image URL in Replicate response');
  return out;
}

export async function POST(req: Request) {
  // 1. Auth. Same gate as the page it renders into.
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }

  // 2. Validate. Rejects impossible tuples before anything can be spent.
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = validateTuple(body);
  if (!parsed.ok) {
    return NextResponse.json(
      { error: parsed.errors.map((e) => e.reason).join('; '), errors: parsed.errors },
      { status: 422 },
    );
  }
  const tuple = parsed.tuple;
  const key = tupleKey(tuple);

  const supabase = db();
  if (!supabase) {
    return NextResponse.json({ error: 'Renders are not configured.' }, { status: 503 });
  }

  // 3. Cache. Free hit — checked before auth-adjacent limits so a cached tuple
  //    never consumes anyone's rate budget.
  const cached = await supabase
    .from('blank_renders')
    .select('image_url, seed')
    .eq('tuple_key', key)
    .maybeSingle();

  // A cache we can't read is a ceiling we can't enforce. Fail closed rather
  // than spend against a table that might not exist.
  if (cached.error) {
    console.error('[blank/generate] cache read failed', cached.error.message);
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }

  if (cached.data?.image_url) {
    return NextResponse.json({
      imageUrl: cached.data.image_url,
      seed: cached.data.seed,
      cached: true,
      tupleKey: key,
    });
  }

  // 4. Limits — only paid renders get here.
  const ip =
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: `Rate limit: ${RATE_LIMIT_PER_IP} new renders per 10 minutes.` },
      { status: 429 },
    );
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .gte('created_at', since);

  // Fail closed on BOTH branches. A missing table returns `error: null, count:
  // null` — no error at all — so `(count ?? 0)` would silently read as zero and
  // wave every render through with no ceiling. Verified against a real missing
  // table, not assumed.
  if (countError || count === null || count === undefined) {
    console.error('[blank/generate] ceiling check failed', countError?.message ?? 'null count');
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (count >= DAILY_RENDER_CEILING) {
    return NextResponse.json(
      { error: `Daily render ceiling reached (${DAILY_RENDER_CEILING}). Try tomorrow.` },
      { status: 429 },
    );
  }

  // 5. Spend.
  const prompt = composePrompt(tuple);
  let imageUrl: string;
  try {
    imageUrl = await renderWithFlux(tuple, prompt);
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Render failed.';
    const configIssue = msg.includes('not configured');
    console.error('[blank/generate]', msg);
    return NextResponse.json(
      { error: configIssue ? 'Renders are not configured.' : 'Render failed — try again.' },
      { status: configIssue ? 503 : 502 },
    );
  }

  // upsert, not insert: two people can ask for the same new tuple at once.
  const { error: writeError } = await supabase.from('blank_renders').upsert(
    {
      tuple_key: key,
      garment: tuple.garment,
      tier: tuple.tier,
      graphic: tuple.graphic,
      colorway: tuple.colorway,
      seed: derivedSeed(tuple),
      image_url: imageUrl,
      prompt,
    },
    { onConflict: 'tuple_key' },
  );

  if (writeError) {
    // The image is already paid for, so still return it — but this means the
    // next request for the same tuple pays again.
    console.error('[blank/generate] cache write failed', writeError.message);
  }

  return NextResponse.json({
    imageUrl,
    seed: derivedSeed(tuple),
    cached: false,
    tupleKey: key,
  });
}

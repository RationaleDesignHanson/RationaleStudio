/**
 * Apply a partner's own artwork to a garment.
 *
 * `analyze-reference` answers "can we make this and what does it cost" using
 * Claude vision. This answers the other half of the same ask — "show me it on
 * the shirt" — which needs a model that accepts an image, and Imagen 4 is
 * text-only. Seedream 4 takes `image_input`, so reference renders go there
 * while text-only renders stay on Imagen 4. Model per job.
 *
 * PRIVACY: the uploaded image is never stored. Only a SHA-256 of its bytes is
 * kept, as a cache key, so a second request for the same artwork on the same
 * garment is free. The hash cannot reconstruct the image, and two people
 * uploading the same file correctly share one cached render.
 *
 * The prompt is still composed entirely server-side from the same axis
 * constants as every other render. The browser sends an image and a tuple, and
 * never a single word of prompt text. `enhance_prompt` is explicitly disabled:
 * it defaults to TRUE on Seedream and would rewrite the composed prompt,
 * silently breaking the guarantee that every output is on-brand by
 * construction.
 */

import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { isUnlocked } from '@/lib/unlock';
import { ASPECT, COLORWAYS, resolveAxes, resolveColorway } from '@/lib/blank/prompts';
import { MOTIFS, PLACEMENTS, SCALES, FINISHES, axesValid, axesStage0 } from '@/lib/blank/axes';
import { ensureDurable, persistRender } from '@/lib/blank/renderStore';
import type { Garment } from '@/lib/blank/line';

/**
 * How long to block on Replicate.
 *
 * netlify.toml caps every function at 26 seconds. Waiting 55 or 60 meant the
 * platform killed the handler mid-flight: Replicate still ran the prediction and
 * still billed it, nothing was returned, and — because both spend guards count
 * rows in `blank_renders` — no row was written, so the ceiling and the rate
 * limit could not see the renders that cost money and produced nothing. Every
 * retry paid again, invisibly.
 *
 * 18s leaves room for persistRender's fetch, the Storage upload and the upsert
 * inside the same 26s budget. Slow renders now fail HONESTLY: the spend is
 * recorded, the user is told it is still rendering, and a retry re-renders
 * rather than silently double-paying.
 *
 * The real fix is a background function plus client polling, which Netlify
 * allows to run for 15 minutes. This is the fix that stops the bleeding.
 */
const REPLICATE_WAIT_SECONDS = 18;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REFERENCE_MODEL = 'bytedance/seedream-4';
// Bumped for the ground clause, and because the documented prompt REVERT that
// removed 'invented cream cut-and-sew side panels' never bumped it — every tuple
// rendered under the bad prompt was still being served from cache.
const REFERENCE_VERSION = 'ref-v2';

/**
 * Sized DOWN from the platform's own body limit, not up from what feels
 * reasonable. Measured against the running server: a 7MB JSON body is rejected
 * by us with a 413, but a 5MB body 500s inside the platform before the handler
 * ever runs — so the real limit sits below 5.24MB. The request ceiling is set
 * to 4MB with margin, and the image limit derived back from it through base64's
 * 4/3 inflation, rather than the other way round.
 *
 * The client also downscales before upload, so this is a backstop and not the
 * thing users actually hit.
 */
const MAX_REQUEST_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_BYTES = Math.floor((MAX_REQUEST_BYTES - 8192) * 0.74);
const ALLOWED_MEDIA = new Set(['image/jpeg', 'image/png', 'image/webp']);
/** Reference renders share the same 24h ceiling as text renders. */
const DAILY_RENDER_CEILING = 600;

//
// Sized for ONE person testing, not for a crowd. These were set when the tool
// was a public case study that happened to spend money; it is a password-gated
// instrument used by two people, and the limits were stopping the owner mid-
// session. A round is six renders and a comparison is several rounds.
//
// They are still real limits, counted in Postgres rather than in a module-scope
// integer that resets on cold start — a runaway loop or a leaked password costs
// a bounded amount, and that is what they are for.
const RATE_LIMIT_PER_IP = 50;
const RATE_WINDOW_MS = 10 * 60 * 1000;

/**
 * A hashed requester, so a per-IP limit can be enforced across instances
 * without storing anyone's IP address. Salted with the service-role key, which
 * is already secret and never leaves the server, so the hash is not reversible
 * by anyone holding the database.
 */
function requesterHash(ip: string): string {
  return createHash('sha256')
    .update(ip + (process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''))
    .digest('hex')
    .slice(0, 24);
}

/** Magic-byte check: the declared MIME type must match the actual content. */
function looksLikeImage(b: Buffer, mediaType: string): boolean {
  if (b.length < 12) return false;
  if (mediaType === 'image/png') {
    return b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47;
  }
  if (mediaType === 'image/jpeg') {
    return b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;
  }
  if (mediaType === 'image/webp') {
    return b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP';
  }
  return false;
}

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const HOUSE =
  'quiet-flex elevated streetwear, heavyweight garment-dyed cotton, minimal branding, matte tactile surfaces, soft diffused natural light, film-photography color';

const GARMENT_SCENE: Record<Garment, string> = {
  tee: 'a single short-sleeve t-shirt, boxy relaxed cut with a ribbed crew neck and dropped shoulders, lying flat and centred on plain cool grey seamless paper, photographed from directly overhead. No person, no model, no hanger.',
  hoodie:
    'a single oversized dropped-shoulder pullover hoodie with a kangaroo pocket and ribbed cuffs, lying flat and centred on plain cool grey seamless paper, photographed from directly overhead. No person, no model, no hanger.',
  cap: 'a single 6-panel unstructured low-profile cap with a curved brim, photographed straight on to the front panel, centred on plain cool grey seamless paper. No person, no model, no head.',
};


/**
 * Record a render that was paid for but never arrived.
 *
 * Both spend guards count rows in `blank_renders`, so a prediction that outran
 * the function timeout was invisible to them — billed, unreturned, uncounted,
 * and repayable on every retry. `image_url: ''` is deliberately falsy: the cache
 * read treats the row as a miss, so a retry re-renders rather than serving a
 * blank, while the row still counts against the ceiling.
 */
async function recordSpend(
  supabase: NonNullable<ReturnType<typeof db>>,
  key: string,
  who: string,
  garment: string,
  tier: number,
  colorway: string,
) {
  await supabase.from('blank_renders').upsert(
    {
      tuple_key: key,
      garment,
      tier,
      graphic: 'timed-out',
      colorway,
      seed: 0,
      image_url: '',
      prompt: 'timed out before the image returned',
      requester: who,
    },
    { onConflict: 'tuple_key' },
  );
}

export async function POST(req: Request) {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }

  const declaredLength = Number(req.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: `Image too large — ${Math.floor(MAX_IMAGE_BYTES / 1024 / 1024 * 10) / 10}MB maximum.` },
      { status: 413 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // ── the artwork ───────────────────────────────────────────────────────────
  const dataUrl = typeof body.image === 'string' ? body.image : '';
  const m = /^data:([a-z/+-]+);base64,(.+)$/i.exec(dataUrl);
  if (!m) return NextResponse.json({ error: 'No image supplied.' }, { status: 400 });

  const [, mediaType, b64] = m;
  if (!ALLOWED_MEDIA.has(mediaType)) {
    return NextResponse.json({ error: 'Unsupported image type.' }, { status: 415 });
  }
  if ((b64.length * 3) / 4 > MAX_IMAGE_BYTES) {
    return NextResponse.json(
      { error: `Image too large — ${Math.floor(MAX_IMAGE_BYTES / 1024 / 1024 * 10) / 10}MB maximum.` },
      { status: 413 },
    );
  }

  // The declared media type is attacker-controlled and a paid render is the
  // consequence of trusting it. Check the actual magic bytes.
  const bytes = Buffer.from(b64, 'base64');
  if (!looksLikeImage(bytes, mediaType)) {
    return NextResponse.json(
      { error: 'That file does not look like a valid image.' },
      { status: 415 },
    );
  }

  // ── the tuple ─────────────────────────────────────────────────────────────
  const garment = body.garment;
  if (garment !== 'tee' && garment !== 'hoodie' && garment !== 'cap') {
    return NextResponse.json({ error: 'Unknown garment.' }, { status: 422 });
  }
  const tier = Number(body.tier);
  if (!Number.isInteger(tier) || tier < 1 || tier > 5) {
    return NextResponse.json({ error: 'Tier must be 1-5.' }, { status: 422 });
  }
  const colorway = typeof body.colorway === 'string' ? body.colorway : 'charcoal';
  const colourId = resolveColorway(colorway);
  if (!COLORWAYS[colourId]) {
    return NextResponse.json({ error: 'Unknown colourway.' }, { status: 422 });
  }

  const axes = resolveAxes(typeof body.graphic === 'string' ? body.graphic : '', body);
  if (!PLACEMENTS[axes.placement] || !SCALES[axes.scale] || !FINISHES[axes.finish]) {
    return NextResponse.json({ error: 'Unknown placement, scale or finish.' }, { status: 422 });
  }

  // The uploaded artwork replaces the motif, so motif is not validated — but
  // everything else still is, and the same economic filter applies.
  const placement = PLACEMENTS[axes.placement];
  if (!placement.garments.includes(garment)) {
    return NextResponse.json(
      { error: `A ${garment} has no ${placement.title.toLowerCase()}.` },
      { status: 422 },
    );
  }
  const geometry = axesValid(garment, 'abstract-mark', axes.placement, axes.scale, axes.finish);
  if (geometry.length) {
    return NextResponse.json({ error: geometry[0] }, { status: 422 });
  }
  if (!axesStage0('abstract-mark', axes.finish) && tier < 5) {
    return NextResponse.json(
      {
        error: `${FINISHES[axes.finish].title} is not producible in a Stage 0 run — needs the full-line budget.`,
      },
      { status: 422 },
    );
  }

  const supabase = db();
  if (!supabase) {
    return NextResponse.json({ error: 'Renders are not configured.' }, { status: 503 });
  }

  // ── cache, keyed on a hash of the artwork — never the artwork itself ──────
  const sha = createHash('sha256').update(bytes).digest('hex').slice(0, 16);
  // `tier` is deliberately NOT in this key. It was, and it appears nowhere in the
  // prompt below — there is no CLOTH_BY_TIER clause on this route — so the five
  // budget stops produced five cache misses and five paid renders of an
  // identical request. Anything added to the prompt must be added here too.
  const key = `${REFERENCE_VERSION}.${sha}.${garment}.${colourId}.${axes.placement}.${axes.scale}.${axes.finish}`;

  const cached = await supabase
    .from('blank_renders')
    .select('image_url')
    .eq('tuple_key', key)
    .maybeSingle();

  if (cached.error) {
    console.error('[blank/apply-reference] cache read failed', cached.error.message);
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  // Same durability rule as /generate: heal a pre-persistence row into the
  // bucket, or drop it and re-render if the upstream image has already expired.
  if (cached.data?.image_url) {
    const durable = await ensureDurable(supabase, key, cached.data.image_url);
    if (durable) return NextResponse.json({ imageUrl: durable, cached: true });
  }

  // ── limits, only for paid renders ─────────────────────────────────────────
  const ip =
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  const who = requesterHash(ip);
  const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
  const recent = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .eq('requester', who)
    .gte('created_at', windowStart);

  if (recent.error || recent.count === null) {
    console.error('[blank/apply-reference] rate check failed', recent.error?.message ?? 'null count');
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (recent.count >= RATE_LIMIT_PER_IP) {
    return NextResponse.json(
      { error: `Rate limit: ${RATE_LIMIT_PER_IP} reference renders per 10 minutes.` },
      { status: 429 },
    );
  }

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .gte('created_at', since);

  // Fail closed on both branches: a missing table returns error null AND count
  // null, which would otherwise read as zero and disable the ceiling entirely.
  if (countError || count === null || count === undefined) {
    console.error('[blank/apply-reference] ceiling check failed', countError?.message ?? 'null count');
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (count >= DAILY_RENDER_CEILING) {
    return NextResponse.json(
      { error: `Daily render ceiling reached (${DAILY_RENDER_CEILING}). Try tomorrow.` },
      { status: 429 },
    );
  }

  // ── compose and spend ─────────────────────────────────────────────────────
  // REVERTED from a stronger "copy every internal shape, do not simplify"
  // variant. That was written to fix a fidelity problem that did not exist: the
  // emblem reference is genuinely just a plain ring, so Seedream had been
  // faithful all along and I had compared its output to the prompt that made
  // the reference rather than to the reference itself.
  //
  // The stronger wording changed nothing about fidelity and introduced a real
  // regression — it invented cream cut-and-sew side panels on the garment.
  // Insisting harder on copying pushed the model to add construction detail.
  const prompt = `${HOUSE}, ${COLORWAYS[colourId].palette}.
Take the artwork in the supplied reference image and reproduce it as a print on a garment. Keep the artwork's own shapes, composition and character; do not redesign it. The reference image shows the artwork on a plain flat black field; that field is the BACKGROUND ONLY and is not part of the artwork — reproduce the artwork itself and nothing of the field around it.
The garment itself is a plain single-colour blank: no contrast panels, no pieced seams, no colour-blocking, no additional garment detail beyond the print described here.
The print is about ${SCALES[axes.scale].inches} inches wide, ${placement.clause}, ${FINISHES[axes.finish].clause}.

A FLAT-LAY PRODUCT PHOTOGRAPH: ${GARMENT_SCENE[garment]}
Even soft diffused studio light, neutral white balance, no harsh shadow.

Do not reproduce any text, letters or lettering from the reference. No watermarks.`;

  let imageUrl: string;
  try {
    const res = await fetch(
      `https://api.replicate.com/v1/models/${REFERENCE_MODEL}/predictions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN ?? ''}`,
          'Content-Type': 'application/json',
          Prefer: `wait=${REPLICATE_WAIT_SECONDS}`,
        },
        body: JSON.stringify({
          input: {
            prompt,
            image_input: [dataUrl],
            aspect_ratio: ASPECT[garment],
            size: '2K',
            // Defaults TRUE and would rewrite the prompt composed above,
            // breaking the on-brand-by-construction guarantee.
            enhance_prompt: false,
            sequential_image_generation: 'disabled',
          },
        }),
      },
    );
    if (!res.ok) {
      const t = await res.text();
      console.error('[blank/apply-reference] Replicate', res.status, t.slice(0, 300));
      throw new Error(`Replicate returned ${res.status}`);
    }
    const result = await res.json();
    if (result.status === 'failed' || result.error) {
      throw new Error(String(result.error ?? 'render failed'));
    }
    const out = Array.isArray(result.output) ? result.output[0] : result.output;
    if (!out || typeof out !== 'string') {
      // Wait expired, prediction still running — and still billed. Recorded
      // rather than swallowed, or the spend guards never see it.
      if (result.status === 'starting' || result.status === 'processing') {
        throw Object.assign(new Error('still rendering'), { pending: true });
      }
      throw new Error('No image URL in response');
    }
    imageUrl = out;
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Render failed.';
    console.error('[blank/apply-reference]', msg);
    if (e && typeof e === 'object' && 'pending' in e) {
      await recordSpend(supabase, key, who, garment, tier, colorway);
      return NextResponse.json(
        {
          error:
            'Still rendering when the request timed out — it has been counted. Try again in a moment.',
        },
        { status: 504 },
      );
    }
    return NextResponse.json({ error: 'Render failed — try again.' }, { status: 502 });
  }

  // Persist before caching — a Seedream URL expires exactly like an Imagen one.
  const persisted = await persistRender(supabase, imageUrl, key);
  const cacheUrl = persisted?.url ?? imageUrl;

  const { error: writeError } = await supabase.from('blank_renders').upsert(
    {
      tuple_key: key,
      garment,
      tier,
      graphic: 'reference', // the artwork itself is deliberately not stored
      colorway,
      seed: 0, // Seedream takes no seed
      image_url: cacheUrl,
      prompt,
      requester: who,
    },
    { onConflict: 'tuple_key' },
  );
  if (writeError) console.error('[blank/apply-reference] cache write failed', writeError.message);

  return NextResponse.json({ imageUrl: cacheUrl, cached: false });
}

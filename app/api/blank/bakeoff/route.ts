/**
 * Blank — one variant of a bake-off round.
 *
 * THE MECHANIC, made general. Generate several, compare, keep one, iterate. It
 * existed once in this tool, on the brand directions, and only because those had
 * been generated offline before the app was built. Everything else drifted to
 * deterministic CSS — free, instant, always correctly spelled, and individually
 * defensible every time I chose it — with the cumulative effect that the creative
 * act got engineered out of a tool whose entire purpose is creative exploration.
 *
 * ONE VARIANT PER REQUEST, not six. The client fans out and each variant caches
 * on its own key, so a round that is half-cached only pays for the half that is
 * new, results appear as they land instead of after the slowest, and one failure
 * loses one tile rather than the round. The spend ceiling counts them the same as
 * any other render.
 *
 * KINDS
 *  colour — the same garment and the same mark in a different colourway, so
 *           colour is the only variable and the comparison is honest.
 *  mark   — the chosen construction redrawn with custom letterforms, from the
 *           rasterised mark as an image reference. This is the only way to get
 *           drawn letterforms without asking a model to spell, which it cannot do.
 *  graphic — free-text artwork. Not everything on a garment is the identity: a
 *           line needs graphics that are silly, seasonal or one-off, and those
 *           come from a description rather than from the name. Six per round,
 *           each pushed a different way so a round is a spread rather than six
 *           attempts at the same thing.
 */

import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { isUnlocked } from '@/lib/unlock';
import { ensureDurable, persistRender } from '@/lib/blank/renderStore';
import { paletteById } from '@/lib/blank/palettes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const IMAGEN = 'google/imagen-4';
const SEEDREAM = 'bytedance/seedream-4';
const DAILY_RENDER_CEILING = 60;
const RATE_LIMIT_PER_IP = 24; // a round is six, so the window has to hold rounds
const RATE_WINDOW_MS = 10 * 60 * 1000;
const VERSION = 'bake-v1';

const HOUSE =
  'quiet-flex elevated streetwear, heavyweight garment-dyed cotton, minimal branding, matte tactile surfaces, soft diffused natural light, film-photography color';

const SCENE: Record<string, string> = {
  tee: 'a single short-sleeve t-shirt, boxy relaxed cut with a ribbed crew neck and dropped shoulders, lying flat and centred on plain cool grey seamless paper, photographed from directly overhead. No person, no model, no hanger.',
  hoodie:
    'a single oversized dropped-shoulder pullover hoodie with a kangaroo pocket and ribbed cuffs, lying flat and centred on plain cool grey seamless paper, photographed from directly overhead. No person, no model, no hanger.',
  cap: 'a single 6-panel unstructured low-profile cap with a curved brim, photographed straight on to the front panel, centred on plain cool grey seamless paper. No person, no model, no head.',
};

/** Imagen 4 accepts only these. 4:5 and 3:2 both 422 before generating. */
const ASPECT: Record<string, string> = { tee: '3:4', hoodie: '3:4', cap: '1:1' };

/** Six pushes for a graphic round, so a round is a spread not six near-misses. */
const GRAPHIC_ANGLES = [
  'bold and graphic, few shapes, high contrast',
  'fine-lined and technical, like a diagram',
  'hand-drawn and loose, visibly imperfect',
  'heavy and blocky, poster-like',
  'sparse and minimal, mostly empty space',
  'dense and busy, filling the frame',
];

/** Six ways to redraw a mark, so a mark round varies the DRAWING, not the shape. */
const DRAW_STYLES = [
  'redrawn with slightly softened terminals and a little optical correction, as a type designer would',
  'redrawn heavier and tighter, counters closed up, built for small sizes',
  'redrawn with sharp cut terminals and flat joins, geometric and cold',
  'redrawn with a subtle hand-drawn irregularity, as if cut from paper',
  'redrawn with high contrast between thick and thin strokes',
  'redrawn simplified to its fewest possible strokes, stencil-like',
];

function db() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function requesterHash(ip: string): string {
  return createHash('sha256')
    .update(ip + (process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''))
    .digest('hex')
    .slice(0, 32);
}

async function replicate(model: string, input: Record<string, unknown>): Promise<string> {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) throw new Error('REPLICATE_API_TOKEN not configured');
  const res = await fetch(`https://api.replicate.com/v1/models/${model}/predictions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Prefer: 'wait=55',
    },
    body: JSON.stringify({ input }),
  });
  if (!res.ok) {
    console.error('[blank/bakeoff] Replicate', res.status, (await res.text()).slice(0, 300));
    throw new Error(`Replicate returned ${res.status}`);
  }
  const out = await res.json();
  if (out.status === 'failed' || out.error) throw new Error(String(out.error ?? 'render failed'));
  const url = Array.isArray(out.output) ? out.output[0] : out.output;
  if (!url || typeof url !== 'string') throw new Error('No image URL in response');
  return url;
}

export async function POST(req: Request) {
  if (!(await isUnlocked('blank'))) {
    return NextResponse.json({ error: 'Locked.' }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const kind =
    body.kind === 'colour' || body.kind === 'mark' || body.kind === 'graphic' ? body.kind : null;
  if (!kind) return NextResponse.json({ error: 'Unknown bake-off kind.' }, { status: 422 });

  const garment = ['tee', 'hoodie', 'cap'].includes(String(body.garment))
    ? String(body.garment)
    : 'tee';
  const variant = Math.max(0, Math.min(11, Number(body.variant) || 0));

  const supabase = db();
  if (!supabase) {
    return NextResponse.json({ error: 'Renders are not configured.' }, { status: 503 });
  }

  let model: string;
  let input: Record<string, unknown>;
  let keySource: string;

  if (kind === 'colour') {
    const palette = paletteById(String(body.palette));
    if (!palette) return NextResponse.json({ error: 'Unknown colourway.' }, { status: 422 });
    // The mark is optional: a colour round on a blank garment is a legitimate
    // question ("what colour is the line") separate from what is printed on it.
    const markClause =
      typeof body.image === 'string' && body.image.startsWith('data:')
        ? 'The artwork in the supplied reference image is printed on the chest at about 10 inches wide, in flat opaque off-white ink. Keep the artwork’s own shapes; do not redesign it.'
        : 'The garment is completely plain: no print, no graphic, no embroidery and no visible branding.';
    model = typeof body.image === 'string' && body.image.startsWith('data:') ? SEEDREAM : IMAGEN;
    const prompt = `${HOUSE}.
The garment is a plain single-colour blank in ${palette.clause}: no contrast panels, no pieced seams, no colour-blocking.
${markClause}

A FLAT-LAY PRODUCT PHOTOGRAPH: ${SCENE[garment]}
Even soft diffused studio light, neutral white balance, no harsh shadow.

Do not reproduce any text or lettering. No watermarks.`;
    input =
      model === SEEDREAM
        ? {
            prompt,
            image_input: [body.image],
            aspect_ratio: ASPECT[garment],
            size: '2K',
            enhance_prompt: false,
            sequential_image_generation: 'disabled',
          }
        : { prompt, aspect_ratio: ASPECT[garment], image_size: '1K', output_format: 'jpg' };
    keySource = `${kind}.${garment}.${palette.id}.${typeof body.image === 'string' ? createHash('sha256').update(body.image).digest('hex').slice(0, 12) : 'plain'}`;
  } else if (kind === 'graphic') {
    const description = String(body.prompt ?? '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 240);
    if (description.length < 3) {
      return NextResponse.json({ error: 'Describe the graphic in a few words.' }, { status: 422 });
    }
    model = IMAGEN;
    const angle = GRAPHIC_ANGLES[variant % GRAPHIC_ANGLES.length];
    const prompt = `A SINGLE FLAT TWO-DIMENSIONAL PIECE OF ARTWORK, drawn in solid off-white on a flat even cool mid-grey field that fills the frame. Centred, occupying about half the frame width. This is a digital graphic, not a photograph of an object: no surface, no edges, no depth.
The artwork is: ${description}.
Drawn ${angle}.
No text, no letters, no words, no readable lettering, no numerals, no watermarks, no border, no frame. No garment, no fabric, no mockup, no person.`;
    input = { prompt, aspect_ratio: '1:1', image_size: '1K', output_format: 'jpg' };
    keySource = `${kind}.${variant}.${createHash('sha256').update(description).digest('hex').slice(0, 16)}`;
  } else {
    // mark: redraw the rasterised construction with custom letterforms.
    const image = typeof body.image === 'string' ? body.image : '';
    if (!image.startsWith('data:')) {
      return NextResponse.json({ error: 'A mark round needs the mark as an image.' }, { status: 422 });
    }
    model = SEEDREAM;
    const style = DRAW_STYLES[variant % DRAW_STYLES.length];
    const prompt = `A single flat two-dimensional logo mark, solid black on a plain white background, centred with generous margin. No garment, no fabric, no mockup, no person.
Take the mark in the supplied reference image and keep its structure, proportions and the letters it contains EXACTLY as they are — same letters, same arrangement, same enclosure. Do not add or remove letters and do not change what it says.
Draw it ${style}.
No extra text, no additional words, no watermarks, no border.`;
    input = {
      prompt,
      image_input: [image],
      aspect_ratio: '1:1',
      size: '2K',
      enhance_prompt: false,
      sequential_image_generation: 'disabled',
    };
    keySource = `${kind}.${variant}.${createHash('sha256').update(image).digest('hex').slice(0, 16)}`;
  }

  const key = `${VERSION}.${createHash('sha256').update(keySource).digest('hex').slice(0, 22)}`;

  const cached = await supabase
    .from('blank_renders')
    .select('image_url')
    .eq('tuple_key', key)
    .maybeSingle();
  if (cached.error) {
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (cached.data?.image_url) {
    const durable = await ensureDurable(supabase, key, cached.data.image_url);
    if (durable) return NextResponse.json({ imageUrl: durable, cached: true });
  }

  const ip =
    req.headers.get('x-nf-client-connection-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  const who = requesterHash(ip);

  const recent = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .eq('requester', who)
    .gte('created_at', new Date(Date.now() - RATE_WINDOW_MS).toISOString());
  if (recent.error || recent.count === null) {
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (recent.count >= RATE_LIMIT_PER_IP) {
    return NextResponse.json(
      { error: `Rate limit: ${RATE_LIMIT_PER_IP} new renders per 10 minutes.` },
      { status: 429 },
    );
  }

  const midnight = new Date();
  midnight.setUTCHours(0, 0, 0, 0);
  const { count, error: countError } = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .gte('created_at', midnight.toISOString());
  if (countError || count === null) {
    return NextResponse.json({ error: 'Renders are temporarily unavailable.' }, { status: 503 });
  }
  if (count >= DAILY_RENDER_CEILING) {
    return NextResponse.json(
      { error: `Daily render ceiling reached (${DAILY_RENDER_CEILING}).` },
      { status: 429 },
    );
  }

  let imageUrl: string;
  try {
    imageUrl = await replicate(model, input);
  } catch {
    return NextResponse.json({ error: 'Render failed — try again.' }, { status: 502 });
  }

  const persisted = await persistRender(supabase, imageUrl, key);
  const cacheUrl = persisted?.url ?? imageUrl;

  await supabase.from('blank_renders').upsert(
    {
      tuple_key: key,
      garment,
      tier: 1,
      graphic: `bakeoff-${kind}`,
      colorway: kind === 'colour' ? String(body.palette) : 'charcoal',
      seed: variant,
      image_url: cacheUrl,
      prompt: keySource,
      requester: who,
    },
    { onConflict: 'tuple_key' },
  );

  return NextResponse.json({ imageUrl: cacheUrl, cached: false });
}

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
 *  place  — artwork for ONE place, in one of three registers: the sign, the joke
 *           or the song. This is the catalogue business's engine — a shirt per
 *           rest stop, per exit, per town — so the place is the variable and the
 *           register is the editorial voice.
 *
 * WHY THE PLACE KIND FORBIDS LETTERING, INCLUDING FOR SIGNS. The most obvious
 * version of "a shirt for every exit" is the exit sign itself, and an exit sign
 * is almost entirely type. Image models cannot spell — the whole reason this
 * tool draws wordmarks in CSS instead of generating them — so a generated sign
 * reading EXlT 9 MOLIY PITGHER is not a near miss, it is unusable, and it would
 * be unusable one hundred times in a hundred-place catalogue.
 *
 * So generation makes the PANEL and the type gets set over it: the reflective
 * green field, the border, the bolt holes, the arrow, the post. That is the same
 * division of labour the wordmark beats already use, and it is the only one that
 * survives being run at catalogue scale.
 */

import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { isUnlocked } from '@/lib/unlock';
import { ensureDurable, persistRender } from '@/lib/blank/renderStore';
import { paletteById } from '@/lib/blank/palettes';

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

const IMAGEN = 'google/imagen-4';
const SEEDREAM = 'bytedance/seedream-4';
const DAILY_RENDER_CEILING = 60;
const RATE_LIMIT_PER_IP = 24; // a round is six, so the window has to hold rounds
const RATE_WINDOW_MS = 10 * 60 * 1000;
const VERSION = 'bake-v1';

const HOUSE =
  'quiet-flex elevated streetwear, heavyweight garment-dyed cotton, minimal branding, matte tactile surfaces, soft diffused natural light, film-photography color';

/**
 * The composite sent to a model is an opaque JPEG, because JPEG has no alpha.
 *
 * Place and prompt artwork are generated on a pure black field so the browser
 * can knock it out with `mix-blend-mode: screen` — but `artworkDataUrl` flattens
 * to a file, so the field travels with it. The applied views show knocked-out
 * artwork and the paid render would otherwise be a picture of a black rectangle
 * with something in the middle of it.
 *
 * Told rather than keyed out. Alpha-keying to PNG was the alternative and it
 * trades a known problem for an unknown one: nothing here can verify how either
 * model treats an alpha channel, and a model that flattens it onto white would
 * be worse than one told to ignore a black field.
 */
/**
 * NO PEOPLE, and stated positively and EARLY.
 *
 * Generated humans are unusable here — not a taste call, a rights one — and the
 * old exclusion was three words at the end of a long prompt ("no person"),
 * which is the weakest possible place to put a constraint. Diffusion models
 * routinely ignore trailing negatives; FLUX drops a negative prompt outright.
 *
 * The two registers that invited it hardest were the ones asking for CULTURE:
 * "the cliché everyone from there is tired of" is Jersey Shore and the Sopranos,
 * and "the mood of the songs written about this place" is somebody driving away
 * from something. Both are people-shaped briefs, so saying "no person" once at
 * the end never stood a chance — the subject has to be object-shaped instead.
 */
/**
 * The exception, and the only one.
 *
 * People are excluded everywhere else because a model wandering into a product
 * shot is unusable — a rights problem, not a taste one. But a lifestyle photo of
 * someone actually wearing the thing is a deliverable: it is what a lookbook is
 * made of and what a paid-social ad needs. So it is asked for explicitly, once,
 * at the end, and never arrives by accident.
 */
const LIFESTYLE_SCENE: Record<string, string> = {
  tee: 'a person wearing the t-shirt, photographed from the chest up to mid-thigh so the print is fully visible and unobstructed',
  hoodie:
    'a person wearing the hoodie, photographed from the chest up to mid-thigh so the print is fully visible and unobstructed',
  cap: 'a person wearing the cap, photographed straight on from the shoulders up so the front panel is fully visible',
};

const NO_PEOPLE =
  "The artwork depicts OBJECTS ONLY — signage, tools, landscape, type-free shapes, still life. It is not a scene with anybody in it: no people, no person, no figure, no crowd, no silhouette of a body, no hands, no face, no model, no mannequin.";

const GROUND_CLAUSE =
  "The reference image shows the artwork on a plain flat black field; that field is the BACKGROUND ONLY and is not part of the artwork — reproduce the shapes and colours of the artwork itself and nothing of the field around it.";

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

/**
 * The three registers a place can be spoken in, and the six pushes inside each.
 *
 * `sign` is deliberately EMPTY of lettering — see the header. It renders the
 * sign as an object so real type can be set into it afterwards.
 */
const PLACE_REGISTERS: Record<string, { subject: (place: string) => string; angles: string[] }> = {
  sign: {
    subject: (place) =>
      `the road signage of ${place}, rendered as a blank sign panel with NO lettering on it at all — an empty green field waiting for type`,
    angles: [
      'a rectangular interstate guide-sign panel, reflective green with a white border and rounded corners, seen flat and straight on',
      'a numbered route shield, the plain outlined badge shape only, no digits inside it',
      'a small rectangular exit tab panel, the narrow strip that sits above a guide sign',
      'a mile-marker post, a narrow vertical green blade on a slim steel post',
      'a rest-area symbol panel, pictogram only — fork, knife, fuel, bed — no words',
      'a vintage button-copy panel, weathered enamel with visible bolt heads and reflector studs',
    ],
  },
  pun: {
    subject: (place) =>
      `a visual joke about ${place}, told entirely through OBJECTS — the props and signage and paraphernalia of the cliché everyone from there is tired of, arranged straight-faced and affectionately rather than mocking, with nobody present`,
    angles: [
      'bold and graphic, few shapes, high contrast',
      'a deadpan single object, isolated and oversized',
      'hand-drawn and loose, visibly imperfect',
      'a mock heraldic crest built from the wrong objects',
      'sparse and minimal, mostly empty space',
      'a busy dense scene, everything at once',
    ],
  },
  song: {
    subject: (place) =>
      `the mood of the songs written about ${place}, rendered as an EMPTY LANDSCAPE — highway at night, refinery glow, an empty road, taillights receding, the particular romance of leaving somewhere, with no one in the picture`,
    angles: [
      'a wide empty landscape reduced to a few flat bands',
      'headlights and taillights as pure abstract streaks',
      'an industrial silhouette against a low sun',
      'a lone object on a roadside at night',
      'a hand-drawn tour-poster style illustration',
      'a photographic still reduced to two flat tones',
    ],
  },
};

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
      Prefer: `wait=${REPLICATE_WAIT_SECONDS}`,
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
  if (!url || typeof url !== 'string') {
    // The wait expired with the prediction still running. It is billed either
    // way, so this must be distinguishable from a failure — the caller records
    // the spend before giving up.
    if (out.status === 'starting' || out.status === 'processing') {
      throw Object.assign(new Error('still rendering'), { pending: true });
    }
    throw new Error('No image URL in response');
  }
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
    body.kind === 'colour' ||
    body.kind === 'mark' ||
    body.kind === 'graphic' ||
    body.kind === 'place' ||
    body.kind === 'lifestyle'
      ? body.kind
      : null;
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
        ? 'The artwork in the supplied reference image is printed on the chest at about 10 inches wide, in flat opaque off-white ink. Keep the artwork’s own shapes; do not redesign it.' +
          GROUND_CLAUSE
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
    const prompt = `A SINGLE FLAT TWO-DIMENSIONAL PIECE OF ARTWORK, drawn in solid off-white on a PURE BLACK field that fills the entire frame edge to edge — pure black #000000 everywhere, no gradient and no vignette. Centred, occupying about half the frame width. This is a digital graphic, not a photograph of an object: no surface, no edges, no depth.
${NO_PEOPLE}
The artwork is: ${description}.
Drawn ${angle}.
No text, no letters, no words, no readable lettering, no numerals, no watermarks, no border, no frame. No garment, no fabric, no mockup, no person.`;
    input = { prompt, aspect_ratio: '1:1', image_size: '1K', output_format: 'jpg' };
    keySource = `${kind}.k3.${variant}.${createHash('sha256').update(description).digest('hex').slice(0, 16)}`;
  } else if (kind === 'lifestyle') {
    // The deliberate person. Needs the artwork, or it is a stock photo.
    const image = typeof body.image === 'string' ? body.image : '';
    if (!image.startsWith('data:')) {
      return NextResponse.json({ error: 'Pick artwork first.' }, { status: 422 });
    }
    const palette = paletteById(String(body.palette));
    model = SEEDREAM;
    const prompt = `${HOUSE}.
A LIFESTYLE PHOTOGRAPH: ${LIFESTYLE_SCENE[garment] ?? LIFESTYLE_SCENE.tee}.
The garment is ${palette ? palette.clause : 'a plain single-colour blank'}.
The artwork in the supplied reference image is printed on it, keeping the artwork's own shapes and colours — do not redesign it.${GROUND_CLAUSE}
Natural daylight, relaxed candid posture, plain uncluttered background. Photographic, not illustrated.
No added text, no logos, no watermarks.`;
    input = {
      prompt,
      image_input: [image],
      aspect_ratio: '3:4',
      size: '2K',
      enhance_prompt: false,
      sequential_image_generation: 'disabled',
    };
    keySource = `${kind}.${garment}.${String(body.palette)}.${variant}.${createHash('sha256').update(image).digest('hex').slice(0, 16)}`;
  } else if (kind === 'place') {
    const place = String(body.place ?? '')
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u001f]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 120);
    if (place.length < 2) {
      return NextResponse.json({ error: 'Name the place.' }, { status: 422 });
    }
    const register = PLACE_REGISTERS[String(body.register)] ?? PLACE_REGISTERS.sign;
    const registerId = PLACE_REGISTERS[String(body.register)] ? String(body.register) : 'sign';
    model = IMAGEN;
    const angle = register.angles[variant % register.angles.length];
    // PURE BLACK GROUND, not grey. These get printed onto a garment, and the
    // model returns no alpha channel — so the background has to be knocked out
    // by a blend mode instead. `screen` makes black transparent and leaves the
    // colours; mid-grey knocked out nothing, and the applied views showed a
    // visible grey rectangle sitting around the sign on every garment.
    const prompt = `A SINGLE FLAT TWO-DIMENSIONAL PIECE OF ARTWORK, drawn in a few flat colours on a PURE BLACK field that fills the entire frame edge to edge. Centred, occupying about two thirds of the frame width. This is a digital graphic, not a photograph of an object: no surface texture, no depth of field, no vignette, no gradient in the background — the background is pure black #000000 everywhere.
${NO_PEOPLE}
The artwork is: ${register.subject(place)}.
Composed as: ${angle}.
ABSOLUTELY NO TEXT of any kind — no letters, no words, no place names, no numerals, no route numbers, no readable lettering anywhere in the image. Any sign, badge or panel must be COMPLETELY BLANK. No watermarks, no border, no frame. No garment, no fabric, no mockup, no person.`;
    input = { prompt, aspect_ratio: '1:1', image_size: '1K', output_format: 'jpg' };
    // `k2` scopes the cache bust to the place kind — bumping VERSION would have
    // thrown away every colour and mark render too.
    keySource = `${kind}.k3.${registerId}.${variant}.${createHash('sha256').update(place.toLowerCase()).digest('hex').slice(0, 16)}`;
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

  // Rolling 24h, matching apply-reference and generate. These four routes
  // share one table and one ceiling but used two different windows, so just
  // after UTC midnight the bakeoff counter read ~0 while the others still
  // read 60 — an effective ceiling of about 120 across the boundary.
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const { count, error: countError } = await supabase
    .from('blank_renders')
    .select('tuple_key', { count: 'exact', head: true })
    .gte('created_at', since.toISOString());
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
  } catch (e) {
    if (e && typeof e === 'object' && 'pending' in e) {
      // Billed but never returned. Both spend guards count rows in this table,
      // so without a row the render is invisible to them and every retry pays
      // again. Empty image_url keeps the cache read a miss, so a retry
      // re-renders rather than serving nothing.
      await supabase.from('blank_renders').upsert(
        {
          tuple_key: key,
          garment,
          tier: 1,
          graphic: `bakeoff-${kind}`,
          colorway: 'timed-out',
          seed: variant,
          image_url: '',
          prompt: 'timed out before the image returned',
          requester: who,
        },
        { onConflict: 'tuple_key' },
      );
      return NextResponse.json(
        { error: 'Still rendering when it timed out — counted. Try again in a moment.' },
        { status: 504 },
      );
    }
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

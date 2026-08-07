/**
 * Server-side prompt composition for deviation renders.
 *
 * THE CONTRACT: the browser never sends a prompt. It sends a parameter tuple
 * and the server composes the text from these constants. Prompt injection is
 * structurally impossible, every output is on-brand by construction, and the
 * tuple is a natural cache key.
 *
 * Ported from skreet/scripts/prompts.mjs, which generated the canonical plates.
 * Keep them in sync — a deviation render that doesn't look like the pre-generated
 * set is worse than no deviation render at all.
 *
 * Four hard-won rules from generating the line are encoded here:
 *
 *  1. FRONT-LOAD THE DECORATION. Flux weights early tokens; a graphic described
 *     after the garment gets dropped.
 *  2. TONAL-ON-TONAL GETS DROPPED unless the contrast is stated as a positive
 *     instruction ("reads as a change in sheen"), not as an absence.
 *  3. THE PALETTE CLAUSE OVERRIDES THE SCENE. HOUSE_PALETTE asserting "muted
 *     earth" before the scene is what silently killed the stone-grey colourway,
 *     so the palette is a parameter here, never a constant prefix.
 *  4. THE MODEL IS A BIGGER LEVER THAN THE WORDING. Flux 1.1 Pro could not
 *     render low-contrast tonal ink at all — four prompt revisions produced a
 *     blank chest, then a full-contrast square, then a larger cream square.
 *     Imagen 4, Flux 2 Pro and Seedream 4 each got it on the FIRST attempt with
 *     the same text. Renders now go to Imagen 4. Check the model before
 *     rewriting the prompt a third time.
 *
 * Imagen 4 exposes NO seed parameter, so identical tuples are not guaranteed to
 * produce identical pixels. What a partner opening a shared link sees is the
 * CACHED image, which is why the cache is a correctness feature here and not
 * only a cost one.
 */

import type { Garment } from './line';
import {
  MOTIFS,
  PLACEMENTS,
  SCALES,
  FINISHES,
  PRESETS,
  axesValid,
  axesStage0,
} from './axes';

const HOUSE_BASE =
  'quiet-flex elevated streetwear, heavyweight garment-dyed cotton, minimal branding, matte tactile surfaces, soft diffused natural light, film-photography color, restrained Seoul-and-Tokyo minimalism, calm confident restraint';

/** Framing only — no cloth, no colour. Those are parameters. */
const GARMENT_BASES: Record<Garment, string> = {
  tee: `A FLAT-LAY PRODUCT PHOTOGRAPH SHOT FROM DIRECTLY OVERHEAD. One single short-sleeve t-shirt lies flat and centred on plain cool grey seamless paper, seen from straight above, sleeves relaxed and symmetrical. The whole garment is in frame with even margin on all four sides. No person, no model, no hanger.
The tee is a boxy relaxed cut with a ribbed crew neck and dropped shoulders. Even soft diffused studio light, neutral white balance, no harsh shadow.`,
  hoodie: `A FLAT-LAY PRODUCT PHOTOGRAPH SHOT FROM DIRECTLY OVERHEAD. One single pullover hoodie lies flat and centred on plain cool grey seamless paper, seen from straight above, hood laid flat above the shoulders, sleeves relaxed and symmetrical. The whole garment is in frame with even margin on all four sides. No person, no model, no hanger.
The hoodie is an oversized dropped-shoulder pullover with a kangaroo pocket, ribbed cuffs and hem, and a flat drawcord. Even soft diffused studio light, neutral white balance, no harsh shadow.`,
  cap: `A PRODUCT PHOTOGRAPH OF ONE CAP, shot straight on to the front panel, centred on plain cool grey seamless paper. The whole cap is in frame with even margin on all sides. No person, no model, no head.
The cap is a 6-panel unstructured low-profile dad cap with a curved brim and a fabric strap closure. Even soft diffused studio light, neutral white balance, no harsh shadow.`,
};

/** Cloth quality tracks the budget tier — this is what the money buys. */
const CLOTH_BY_TIER: Record<Garment, string[]> = {
  tee: [
    'The tee is a lightweight smooth jersey, thinner and flatter than a heavyweight blank.',
    'The tee is a washed pigment-dyed cotton with visible tonal mottling.',
    'The tee is heavyweight garment-dyed cotton, 240gsm, dye pooling at the seams.',
    'The tee is heavyweight garment-dyed cotton, 240gsm, dye pooling at the seams.',
    'The tee is heavyweight garment-dyed cotton, 240gsm, deeply lived-in, pronounced dye variation.',
  ],
  hoodie: [
    'The hoodie is a standard-weight brushed fleece.',
    'The hoodie is a washed pigment-dyed fleece with visible tonal mottling.',
    'The hoodie is heavyweight garment-dyed fleece, 400gsm, dye pooling at the ribbing.',
    'The hoodie is heavyweight garment-dyed fleece, 400gsm, dye pooling at the ribbing.',
    'The hoodie is heavyweight garment-dyed fleece, 400gsm, deeply lived-in, pronounced dye variation.',
  ],
  cap: [
    'The cap is lightweight cotton twill.',
    'The cap is washed cotton twill.',
    'The cap is washed cotton twill.',
    'The cap is garment-dyed cotton twill with visible dye variation.',
    'The cap is garment-dyed cotton twill, deeply lived-in.',
  ],
};

interface GraphicSpec {
  title: string;
  /** Decoration clause, written to lead the prompt. */
  treatment: string;
  /**
   * Where the render is known to misrepresent the real garment. Shown in the
   * UI next to the image — a partner should not have to guess which parts of a
   * generated picture are trustworthy.
   */
  renderCaveat?: string;
  /** Producible in a 50-150 unit Stage 0 run? Drives the tuple validator. */
  stage0: boolean;
  /** Caps are a 6-panel front — a 13in chest hit is physically impossible. */
  capSafe: boolean;
}

export const GRAPHIC_SPECS: Record<string, GraphicSpec> = {
  'G-abstract-mark': {
    title: 'Abstract mark',
    treatment:
      'a single bold abstract geometric mark about 8 inches wide, centred on the chest, printed in flat opaque off-white ink with hard clean edges',
    stage0: true,
    capSafe: true,
  },
  'G-emblem': {
    title: 'Emblem / crest',
    treatment:
      'a circular emblem about 7 inches wide centred on the chest — a bold ring enclosing simple geometric shapes, two flat colours, off-white and mid grey, like a heraldic crest reduced to its simplest form',
    stage0: true,
    capSafe: true,
  },
  'G-numeral': {
    title: 'Athletic numeral',
    treatment:
      'one very large bold numeral about 11 inches tall centred on the chest in flat off-white ink, collegiate athletic style with a heavy slab weight',
    stage0: true,
    capSafe: false,
  },
  'G-pocket-hit': {
    title: 'Pocket-scale hit',
    treatment:
      'one very small mark about 3 inches wide printed high on the left chest where a pocket would sit, flat off-white ink, everything else plain',
    stage0: true,
    capSafe: true,
  },
  'G-back-panel': {
    title: 'Back-panel graphic',
    treatment:
      'the garment shown from the BACK, with one large bold abstract graphic about 12 inches wide printed across the upper back below the collar in flat off-white ink',
    stage0: true,
    capSafe: false,
  },
  'G-sleeve-hit': {
    title: 'Sleeve hit',
    treatment:
      'one narrow vertical mark about 2 inches wide printed down the outer left sleeve, flat off-white ink, the chest completely plain',
    stage0: true,
    capSafe: false,
  },
  'G-tonal-emboss': {
    title: 'Tonal / no-contrast',
    // Verified on Imagen 4 in a three-model bake-off. This exact wording
    // produced a blank chest on Flux 1.1 Pro; the wording was never the problem.
    treatment:
      'a large geometric mark about 9 inches wide centred on the chest, printed in ink only ONE SHADE LIGHTER than the garment — the mark and the cloth are almost the same value, so the shape is only just perceptible and reads as a change in surface sheen rather than as a bold print',
    stage0: true,
    capSafe: true,
  },
  'G-distressed': {
    title: 'Distressed overlay',
    treatment:
      'a large graphic about 10 inches wide on the chest, heavily cracked and broken up as if washed a hundred times, ink missing in patches, deliberately degraded',
    stage0: true,
    capSafe: false,
  },
  'G-grid-diagram': {
    title: 'Technical diagram',
    treatment:
      'a fine-line technical diagram about 9 inches wide printed on the chest in thin off-white lines — an exploded schematic of grids and measurement marks, engineering-drawing style',
    stage0: false,
    capSafe: false,
  },
  'G-embroidered-patch': {
    title: 'Applied patch',
    treatment:
      'a rectangular woven patch about 4 inches wide in ecru and charcoal, stitched flat onto the left chest with a visible merrowed border',
    stage0: false,
    capSafe: true,
  },
  'G-stripe-panel': {
    title: 'Colour-block panel',
    treatment:
      'a horizontal band of contrasting bone-coloured fabric pieced across the chest from side seam to side seam, about 5 inches deep, sewn in as a separate panel rather than printed',
    stage0: false,
    capSafe: false,
  },
  'G-allover': {
    title: 'All-over pattern',
    treatment:
      'an all-over repeating geometric pattern in tonal charcoal and grey covering the entire garment edge to edge, printed continuously across seams',
    stage0: false,
    capSafe: false,
  },
};

/**
 * Colourways carry their own palette clause. The clause REPLACES the house
 * palette rather than appending to it — appending is what dropped stone grey,
 * because "muted earth palette" asserted before the scene won the argument.
 */
export const COLORWAYS: Record<string, { label: string; palette: string }> = {
  charcoal: {
    label: 'Faded charcoal',
    palette:
      'a strictly near-monochrome palette — charcoal, faded black, mid grey and soft off-white only, no other colour anywhere',
  },
  bone: {
    label: 'Bone',
    palette:
      'the garment is a warm pale oatmeal bone colour throughout, with off-white and soft mid-grey accents only, and no other colour anywhere',
  },
  olive: {
    label: 'Olive',
    palette:
      'the garment is a muted desaturated olive green throughout, with soft off-white accents only, and no other colour anywhere',
  },
  clay: {
    label: 'Clay',
    palette:
      'the garment is a muted terracotta clay brown throughout, with soft off-white accents only, and no other colour anywhere',
  },
  stone: {
    label: 'Stone grey',
    palette:
      'the garment is a cool mid stone grey throughout, distinctly grey and neither brown nor beige, with soft off-white accents only, and no other colour anywhere',
  },
};

export interface RenderTuple {
  garment: Garment;
  /** 1-5, matching the budget stops. */
  tier: number;
  /** Preset id from the library — supplies the axis defaults. */
  graphic: string;
  colorway: string;
  /** Axes. Default from the preset; overridable one at a time. */
  motif: string;
  placement: string;
  scale: string;
  finish: string;
}

/** Fill any axis the caller left out from the preset. */
export function resolveAxes(graphic: string, over: Partial<RenderTuple> = {}) {
  const preset = PRESETS[graphic];
  return {
    motif: over.motif ?? preset?.motif ?? 'abstract-mark',
    placement: over.placement ?? preset?.placement ?? 'chest-centre',
    scale: over.scale ?? preset?.scale ?? 'medium',
    finish: over.finish ?? preset?.finish ?? 'flat-screen',
  };
}

/** Imagen 4 accepts only 1:1, 9:16, 16:9, 3:4, 4:3 — 4:5 is NOT valid and
 *  silently falls back to square, which crops the flat-lay framing. */
export const ASPECT: Record<Garment, string> = { tee: '3:4', hoodie: '3:4', cap: '1:1' };

export type TupleError = { field: string; reason: string };

/**
 * Validation is also the abuse filter: a tuple the business model says you
 * cannot make is rejected before it can cost anything.
 */
export function validateTuple(
  t: unknown,
): { ok: true; tuple: RenderTuple } | { ok: false; errors: TupleError[] } {
  const errors: TupleError[] = [];
  const o = (t ?? {}) as Record<string, unknown>;

  const garment = o.garment;
  if (garment !== 'tee' && garment !== 'hoodie' && garment !== 'cap') {
    errors.push({ field: 'garment', reason: 'must be tee, hoodie or cap' });
  }

  const tier = Number(o.tier);
  if (!Number.isInteger(tier) || tier < 1 || tier > 5) {
    errors.push({ field: 'tier', reason: 'must be an integer 1-5' });
  }

  const graphic = typeof o.graphic === 'string' ? o.graphic : '';
  if (!PRESETS[graphic]) errors.push({ field: 'graphic', reason: 'unknown graphic id' });

  const colorway = typeof o.colorway === 'string' ? o.colorway : '';
  if (!COLORWAYS[colorway]) errors.push({ field: 'colorway', reason: 'unknown colourway' });

  // Axes fall back to the preset's own values when not supplied.
  const axes = resolveAxes(graphic, o as Partial<RenderTuple>);
  if (!MOTIFS[axes.motif]) errors.push({ field: 'motif', reason: 'unknown motif' });
  if (!PLACEMENTS[axes.placement]) errors.push({ field: 'placement', reason: 'unknown placement' });
  if (!SCALES[axes.scale]) errors.push({ field: 'scale', reason: 'unknown scale' });
  if (!FINISHES[axes.finish]) errors.push({ field: 'finish', reason: 'unknown finish' });

  if (errors.length) return { ok: false, errors };

  // Physical impossibility — a cap has no sleeve, an all-over has no placement.
  for (const reason of axesValid(
    garment as Garment,
    axes.motif,
    axes.placement,
    axes.scale,
    axes.finish,
  )) {
    errors.push({ field: 'axes', reason });
  }

  // Economic impossibility. The business model IS the abuse filter: anything
  // off the Stage 0 rate card only survives at the top budget.
  if (!axesStage0(axes.motif, axes.finish) && tier < 5) {
    errors.push({
      field: 'finish',
      reason: `${FINISHES[axes.finish].title} with ${MOTIFS[axes.motif].title.toLowerCase()} is not producible in a Stage 0 run — needs the full-line budget`,
    });
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    tuple: { garment: garment as Garment, tier, graphic, colorway, ...axes },
  };
}

export const tupleKey = (t: RenderTuple) =>
  `${PROMPT_VERSION}.${t.garment}.${t.tier}.${t.colorway}.${t.motif}.${t.placement}.${t.scale}.${t.finish}`;

export const PROMPT_VERSION = 'v8';



/**
 * Stable hash of the tuple. Imagen 4 takes no seed, so this no longer steers
 * the image — it is kept as a compact fingerprint of the tuple for the cache
 * row and for telling two renders apart in logs. FNV-1a, not for security.
 */
export function derivedSeed(t: RenderTuple): number {
  const s = tupleKey(t);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h % 100000;
}

/**
 * Every render tuple names a specific graphic from the library, which is never
 * what a canonical plate shows — those carry the tier's own generic treatment.
 * So the canonical/deviation split is decided in the UI (no graphic selected =>
 * serve the committed plate and spend nothing) and never reaches this module.
 */

export function composePrompt(t: RenderTuple): string {
  const motif = MOTIFS[t.motif];
  const placement = PLACEMENTS[t.placement];
  const scale = SCALES[t.scale];
  const finish = FINISHES[t.finish];
  const { palette } = COLORWAYS[t.colorway];
  const cloth = CLOTH_BY_TIER[t.garment][t.tier - 1];

  // An all-over pattern has no size or position — describing one produces a
  // chest print inside a repeating field, which is neither thing.
  const decoration = motif.fullBleed
    ? motif.clause
    : motif.cutAndSew
      ? motif.clause
      : `${motif.clause} about ${scale.inches} inches wide, ${placement.clause}, ${finish.clause}`;

  // Decoration first: both Flux and Imagen weight early tokens, and a graphic
  // described after the garment gets dropped or shrunk.
  return `${HOUSE_BASE}, ${palette}.
The single most important element: ${decoration}.

${GARMENT_BASES[t.garment]}
${cloth}

The artwork is ONE single connected shape occupying one compact area — never a row of separate forms, never a horizontal sequence, never several small elements arranged side by side left-to-right. A left-to-right row of shapes is what reads as writing, so the composition must not be one. Purely geometric and non-representational, resembling no alphabet or character of any writing system. No text, no letters, no words, no numerals, no typography, no watermarks.`;
}

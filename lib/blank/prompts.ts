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
 *  4. A LOCKED SEED LOCKS A MISTAKE. Seeds derive from the tuple so a given
 *     combination is reproducible, but changing any field moves the seed.
 */

import type { Garment } from './line';

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
    // Stated as a positive surface effect. Phrased as an absence, Flux drops it.
    treatment:
      'a large mark about 9 inches wide on the chest inked in EXACTLY one shade off the garment colour, so it reads only as a change in surface sheen and nearly disappears',
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
  graphic: string;
  colorway: string;
}

export const ASPECT: Record<Garment, string> = { tee: '4:5', hoodie: '4:5', cap: '1:1' };

export type TupleError = { field: string; reason: string };

/**
 * Validation is also the abuse filter: a tuple the business model says you
 * cannot make is rejected before it can cost anything.
 */
export function validateTuple(t: unknown): { ok: true; tuple: RenderTuple } | { ok: false; errors: TupleError[] } {
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
  const spec = GRAPHIC_SPECS[graphic];
  if (!spec) errors.push({ field: 'graphic', reason: 'unknown graphic id' });

  const colorway = typeof o.colorway === 'string' ? o.colorway : '';
  if (!COLORWAYS[colorway]) errors.push({ field: 'colorway', reason: 'unknown colourway' });

  if (spec && garment === 'cap' && !spec.capSafe) {
    errors.push({
      field: 'graphic',
      reason: `${spec.title} does not fit a 6-panel cap front`,
    });
  }

  // Non-Stage-0 decorations leave the decorated-blanks path entirely. Only the
  // top budget could absorb one, so the rest are refused rather than rendered
  // as something the line could never actually produce.
  if (spec && !spec.stage0 && Number.isInteger(tier) && tier < 5) {
    errors.push({
      field: 'graphic',
      reason: `${spec.title} is not producible in a Stage 0 run — needs the full-line budget`,
    });
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    tuple: { garment: garment as Garment, tier, graphic, colorway },
  };
}

export const tupleKey = (t: RenderTuple) => `${t.garment}.${t.tier}.${t.graphic}.${t.colorway}`;

/**
 * Deterministic seed — same tuple always renders the same image, so a link a
 * partner opens tomorrow shows what the sender saw. FNV-1a, not for security.
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
  const spec = GRAPHIC_SPECS[t.graphic];
  const { palette } = COLORWAYS[t.colorway];
  const cloth = CLOTH_BY_TIER[t.garment][t.tier - 1];

  // Decoration first: Flux weights early tokens and drops a graphic described
  // after the garment. Framing, cloth and palette follow.
  return `${HOUSE_BASE}, ${palette}.
The single most important element: ${spec.treatment}.

${GARMENT_BASES[t.garment]}
${cloth}

No text, no letters, no words, no readable lettering, no typography, no watermarks, no logos.`;
}

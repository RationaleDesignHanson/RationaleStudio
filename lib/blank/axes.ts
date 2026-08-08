/**
 * Decoration axes — the thing that actually widens the space.
 *
 * The 12 library graphics each hard-coded a motif AND a placement AND a scale
 * AND an ink, fused into one sentence. That gave 12 *kinds* of graphic and no
 * way to ask the obvious question: "same mark, but small, on the sleeve, in
 * puff ink?"
 *
 * Splitting them turns 12 fixed options into a matrix. The library entries
 * survive as PRESETS — a named starting point that expands into the axes — so
 * the graphics grid and every existing shared link keep working, and the axes
 * are overrides on top.
 *
 * Combinations that can't exist are rejected rather than rendered:
 *   - a cap has no back panel, no sleeve and no hem
 *   - an all-over pattern has no placement or scale; it covers the garment
 *   - a pieced colour-block panel is not an ink at all
 *   - foil and puff leave the Stage 0 decorated-blanks path on cost
 */

import type { Garment } from './line';

// ── Motif: what the shape IS ────────────────────────────────────────────────

export interface Motif {
  title: string;
  clause: string;
  /** Covers the whole garment — placement and scale don't apply. */
  fullBleed?: boolean;
  /** Not a decoration at all; a pieced seam. Only survives at the top budget. */
  cutAndSew?: boolean;
}

export const MOTIFS: Record<string, Motif> = {
  'abstract-mark': {
    title: 'Abstract mark',
    clause: 'a single bold abstract geometric mark with hard clean edges',
  },
  emblem: {
    title: 'Emblem / crest',
    clause:
      'a circular emblem — a bold ring enclosing simple geometric shapes, like a heraldic crest reduced to its simplest form',
  },
  numeral: {
    title: 'Athletic numeral',
    clause: 'one very large bold numeral, collegiate athletic style with a heavy slab weight',
  },
  'technical-diagram': {
    title: 'Technical diagram',
    clause:
      'a fine-line technical diagram — an exploded schematic of grids and measurement marks, engineering-drawing style',
  },
  distressed: {
    title: 'Distressed overlay',
    clause:
      'a bold graphic heavily cracked and broken up as if washed a hundred times, ink missing in patches, deliberately degraded',
  },
  organic: {
    title: 'Organic form',
    clause:
      'one soft irregular organic shape with a hand-drawn edge, like a brush-made blot or a worn river stone',
  },
  grid: {
    title: 'Repeating grid',
    clause: 'a tight regular grid of small identical geometric marks arranged in even rows',
  },
  allover: {
    title: 'All-over pattern',
    clause:
      'an all-over repeating geometric pattern covering the entire garment edge to edge, printed continuously across the seams',
    fullBleed: true,
  },
  'colour-block': {
    title: 'Colour-block panel',
    clause:
      'a horizontal band of contrasting bone-coloured fabric pieced across the chest from side seam to side seam, about 5 inches deep, sewn in as a separate panel rather than printed',
    cutAndSew: true,
  },
};

// ── Placement: where it sits ────────────────────────────────────────────────

export interface Placement {
  title: string;
  clause: string;
  /** Garments this placement physically exists on. */
  garments: Garment[];
  /** Placements that only make sense small. */
  smallOnly?: boolean;
}

export const PLACEMENTS: Record<string, Placement> = {
  'chest-centre': {
    title: 'Centre chest',
    clause: 'centred on the chest',
    garments: ['tee', 'hoodie'],
  },
  'left-chest': {
    title: 'Left chest',
    clause: 'placed high on the left chest where a pocket would sit, the rest of the garment plain',
    garments: ['tee', 'hoodie'],
    smallOnly: true,
  },
  'upper-back': {
    title: 'Upper back',
    clause:
      'shown from the BACK, printed across the upper back below the collar, the front not visible',
    garments: ['tee', 'hoodie'],
  },
  sleeve: {
    title: 'Sleeve',
    clause: 'printed down the outer left sleeve, the chest completely plain',
    garments: ['tee', 'hoodie'],
    smallOnly: true,
  },
  hem: {
    title: 'Hem',
    clause: 'placed low at the front hem on the wearer-left side, the chest completely plain',
    garments: ['tee', 'hoodie'],
    smallOnly: true,
  },
  'cap-front': {
    title: 'Front panel',
    clause: 'across the front panel of the cap',
    garments: ['cap'],
  },
  'cap-side': {
    title: 'Side panel',
    clause: "on the wearer's-left side panel of the cap",
    garments: ['cap'],
    smallOnly: true,
  },
};

// ── Scale ───────────────────────────────────────────────────────────────────

export interface Scale {
  title: string;
  /** Inches, stated in the prompt — Flux and Imagen both respond to it. */
  inches: number;
  small: boolean;
}

export const SCALES: Record<string, Scale> = {
  micro: { title: 'Micro (2in)', inches: 2, small: true },
  small: { title: 'Small (4in)', inches: 4, small: true },
  medium: { title: 'Medium (7in)', inches: 7, small: false },
  large: { title: 'Large (10in)', inches: 10, small: false },
  oversize: { title: 'Oversize (13in)', inches: 13, small: false },
};

// ── Finish: the physical ink or thread ──────────────────────────────────────

export interface Finish {
  title: string;
  clause: string;
  /** Producible in a 50-150 unit Stage 0 run? */
  stage0: boolean;
  /** Shown in the UI so a choice's cost consequence is visible at the point of choosing. */
  costNote: string;
}

export const FINISHES: Record<string, Finish> = {
  'flat-screen': {
    title: 'Flat screen print',
    clause: 'printed in flat opaque off-white ink',
    stage0: true,
    costNote: 'Cheapest. One screen per colour per print size.',
  },
  tonal: {
    title: 'Tonal / no-contrast',
    clause:
      'printed in ink only ONE SHADE LIGHTER than the garment — the mark and the cloth are almost the same value, so the shape is only just perceptible and reads as a change in surface sheen rather than as a bold print',
    stage0: true,
    costNote: 'Same cost as flat screen. On a dark blank it needs an underbase blocker.',
  },
  discharge: {
    title: 'Discharge',
    clause:
      'discharge-printed so the dye is bleached out of the fibres rather than ink sitting on top, leaving a soft chalky mark level with the cloth surface',
    stage0: true,
    costNote: 'Only works on reactive-dyed cotton. Not on pigment-dyed blanks.',
  },
  puff: {
    title: 'Puff ink',
    clause:
      'printed in raised puff ink that swells off the surface with a soft rounded edge and a visible shadow beneath it',
    stage0: false,
    costNote: 'Specialist ink, extra cure pass. Leaves the standard Stage 0 rate card.',
  },
  foil: {
    title: 'Foil',
    clause:
      'heat-pressed metallic foil with a mirror-bright surface that catches the light against the matte cloth',
    stage0: false,
    costNote: 'Adhesive pass plus a foil pass. Two hits, roughly double the decoration cost.',
  },
  embroidery: {
    title: 'Embroidery',
    clause:
      'worked in dense raised satin stitch, individual stitches and thread sheen catching the light, sitting proud of the surface with a soft shadow beneath its edge',
    stage0: true,
    costNote: '$70 digitizing per artwork, paid once. Only amortises over volume.',
  },
  'tonal-embroidery': {
    title: 'Tonal embroidery',
    clause:
      'worked in dense satin stitch with thread matched almost exactly to the cloth, so it reads as texture rather than as a logo',
    stage0: true,
    costNote: 'The quiet-flex option. Same $70 digitizing.',
  },
  appliqué: {
    title: 'Applied patch',
    clause:
      'a woven patch in ecru and charcoal stitched flat onto the garment with a visible merrowed border',
    stage0: false,
    costNote: 'Adds a cut piece plus tack-down labour on every single unit.',
  },
};

// ── Presets: the 12 library entries, expressed in axes ──────────────────────

export interface Preset {
  motif: string;
  placement: string;
  scale: string;
  finish: string;
}

/**
 * Every library graphic resolves to a point in the matrix. Selecting one in the
 * grid sets the axes; the axes can then be changed independently.
 */
export const PRESETS: Record<string, Preset> = {
  'G-abstract-mark': { motif: 'abstract-mark', placement: 'chest-centre', scale: 'medium', finish: 'flat-screen' },
  'G-emblem': { motif: 'emblem', placement: 'chest-centre', scale: 'medium', finish: 'flat-screen' },
  'G-numeral': { motif: 'numeral', placement: 'chest-centre', scale: 'oversize', finish: 'flat-screen' },
  'G-pocket-hit': { motif: 'abstract-mark', placement: 'left-chest', scale: 'micro', finish: 'flat-screen' },
  'G-back-panel': { motif: 'abstract-mark', placement: 'upper-back', scale: 'oversize', finish: 'flat-screen' },
  'G-sleeve-hit': { motif: 'abstract-mark', placement: 'sleeve', scale: 'micro', finish: 'flat-screen' },
  'G-tonal-emboss': { motif: 'abstract-mark', placement: 'chest-centre', scale: 'large', finish: 'tonal' },
  'G-distressed': { motif: 'distressed', placement: 'chest-centre', scale: 'large', finish: 'flat-screen' },
  'G-grid-diagram': { motif: 'technical-diagram', placement: 'chest-centre', scale: 'large', finish: 'flat-screen' },
  'G-embroidered-patch': { motif: 'abstract-mark', placement: 'left-chest', scale: 'small', finish: 'appliqué' },
  'G-stripe-panel': { motif: 'colour-block', placement: 'chest-centre', scale: 'medium', finish: 'flat-screen' },
  'G-allover': { motif: 'allover', placement: 'chest-centre', scale: 'large', finish: 'flat-screen' },
};

/** Total reachable combinations, for the UI to state honestly. */
export function combinationCount(): number {
  let n = 0;
  for (const g of ['tee', 'hoodie', 'cap'] as Garment[])
    for (const m of Object.keys(MOTIFS))
      for (const p of Object.keys(PLACEMENTS))
        for (const s of Object.keys(SCALES))
          for (const f of Object.keys(FINISHES))
            if (axesValid(g, m, p, s, f).length === 0) n++;
  return n;
}

/** Returns the reasons a combination cannot exist. Empty means it can. */
export function axesValid(
  garment: Garment,
  motifId: string,
  placementId: string,
  scaleId: string,
  finishId: string,
): string[] {
  const errs: string[] = [];
  const motif = MOTIFS[motifId];
  const placement = PLACEMENTS[placementId];
  const scale = SCALES[scaleId];
  const finish = FINISHES[finishId];

  if (!motif) errs.push('unknown motif');
  if (!placement) errs.push('unknown placement');
  if (!scale) errs.push('unknown scale');
  if (!finish) errs.push('unknown finish');
  if (errs.length) return errs;

  if (!placement.garments.includes(garment)) {
    errs.push(`a ${garment} has no ${placement.title.toLowerCase()}`);
  }
  if (placement.smallOnly && !scale.small) {
    errs.push(`${scale.title} does not fit on the ${placement.title.toLowerCase()}`);
  }
  if (garment === 'cap' && !scale.small) {
    errs.push(`${scale.title} does not fit a 6-panel cap front`);
  }
  if (motif.fullBleed && placementId !== 'chest-centre') {
    errs.push('an all-over pattern covers the garment — it has no placement');
  }
  if (motif.cutAndSew && finishId !== 'flat-screen') {
    errs.push('a pieced panel is a seam, not an ink — it has no finish');
  }
  if (motif.cutAndSew && garment === 'cap') {
    errs.push('a cap cannot take a pieced chest panel');
  }
  if (motifId === 'technical-diagram' && scale.small) {
    errs.push('fine lines below ~1pt drop out on textured cotton at this size');
  }
  return errs;
}

/** True when the combination stays inside the Stage 0 rate card. */
export function axesStage0(motifId: string, finishId: string): boolean {
  const motif = MOTIFS[motifId];
  const finish = FINISHES[finishId];
  if (!motif || !finish) return false;
  if (motif.cutAndSew) return false;
  if (motif.fullBleed) return false; // sublimation needs polyester — off-brief
  return finish.stage0;
}

/** Default placement for each garment, used when remapping across garments. */
const DEFAULT_PLACEMENT: Record<Garment, string> = {
  tee: 'chest-centre',
  hoodie: 'chest-centre',
  cap: 'cap-front',
};

/**
 * Nudge a set of axes onto a garment that can actually carry them.
 *
 * Presets carry tee placements, so picking "pocket hit" and then switching to a
 * cap asks for a left chest on a cap — which doesn't exist. Rather than dead-end
 * the UI, remap to the nearest thing the garment does have.
 *
 * This is CLIENT-side help only. The API validator stays strict: a caller that
 * posts an impossible tuple still gets a 422, because that check is also the
 * spend filter and must not be softened.
 */
export function coerceAxesForGarment(
  garment: Garment,
  axes: { motif: string; placement: string; scale: string; finish: string },
) {
  let { placement, scale } = axes;

  if (!PLACEMENTS[placement]?.garments.includes(garment)) {
    placement = DEFAULT_PLACEMENT[garment];
  }
  // A cap front is small by construction, and small-only placements can't take
  // a big hit.
  const needsSmall = garment === 'cap' || PLACEMENTS[placement]?.smallOnly;
  if (needsSmall && !SCALES[scale]?.small) scale = 'small';

  // An all-over pattern has no placement; park it at the neutral one so the
  // validator's own rule reads cleanly.
  if (MOTIFS[axes.motif]?.fullBleed) placement = 'chest-centre';

  return { ...axes, placement, scale };
}

/**
 * Motifs that can exist on a garment at all, after the best possible coercion
 * of placement and scale. Some pairs are genuinely impossible — a cap forces a
 * small hit, and a fine-line technical diagram drops out below ~1pt on textured
 * cotton, so a technical diagram can never go on a cap.
 *
 * The UI uses this to disable options rather than offering a choice that will
 * always be refused. Swapping the motif automatically would change what the
 * user actually asked for, so this reports rather than repairs.
 */
export function availableMotifs(garment: Garment): string[] {
  return Object.keys(MOTIFS).filter((motif) => {
    const a = coerceAxesForGarment(garment, {
      motif,
      placement: DEFAULT_PLACEMENT[garment],
      scale: garment === 'cap' ? 'small' : 'medium',
      finish: 'flat-screen',
    });
    return axesValid(garment, a.motif, a.placement, a.scale, a.finish).length === 0;
  });
}

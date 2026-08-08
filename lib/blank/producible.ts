/**
 * BLANK — which marks the budget can actually execute.
 *
 * Each budget stop buys exactly one decoration method (see STATES in line.ts):
 *
 *   $3k   DTF          full colour, fine detail, large format, cheap
 *   $5k   1-col screen one opaque colour, one screen
 *   $8k   2-col screen two colours, and the underbase pass that tonal needs
 *   $12k  embroidery   thread — small scale only, no fine line, no halftone
 *   $20k  embroidery   as above, plus the woven tag and dye programme
 *
 * The important consequence, and the reason this is a mechanic rather than a
 * filter: availability is NOT monotonic in budget. Marks appear AND disappear as
 * you spend more. A fine-line technical diagram is only executable at $3k,
 * because DTF holds sub-1pt lines that screen drops on textured cotton and that
 * thread cannot describe at all. An oversize numeral prints at any screen tier
 * and cannot be stitched at Stage 0 stitch counts. Tonal needs a second pass, so
 * it cannot be had below $8k.
 *
 * That is the page's thesis stated as capability: quiet is expensive, loud is
 * cheap, and the cheap tier can do things the expensive one cannot.
 *
 * CONFIDENCE. These are engineering judgements derived from method capability,
 * not sourced quotes. They are the same class of claim as the `costNote` fields
 * in axes.ts — defensible, and not independently verified. The dollar figures
 * they lean on (the $70 digitizing fee, the 200-piece woven minimum) live in
 * economics.ts and carry their own marks.
 */

import { STATES, tierIndex } from './line';

/** The one decoration method each budget stop pays for. */
export type Method = 'dtf' | 'screen1' | 'screen2' | 'embroidery';

export const TIER_METHOD: Method[] = ['dtf', 'screen1', 'screen2', 'embroidery', 'embroidery'];

export const METHOD_LABEL: Record<Method, string> = {
  dtf: 'DTF',
  screen1: '1-colour screen',
  screen2: '2-colour screen',
  embroidery: 'embroidery',
};

/**
 * Per graphic: the methods that can execute it, and why the others cannot.
 *
 * `never` means no budget reaches it — it leaves the decorated-blanks path
 * entirely, which is a different kind of no from "not at this price".
 */
export interface Executable {
  methods: Method[];
  /** Shown when the current tier's method is not in `methods`. */
  because: Partial<Record<Method, string>>;
  /** Set when the option is off the Stage 0 path at every budget. */
  never?: string;
}

export const EXECUTION: Record<string, Executable> = {
  'G-abstract-mark': {
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  'G-emblem': {
    methods: ['dtf', 'screen2', 'embroidery'],
    because: { screen1: 'A crest needs two colours; this tier pays for one screen.' },
  },
  'G-numeral': {
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery: 'An oversize numeral in thread runs far past the 6–8k stitch budget this tier costs in.',
    },
  },
  'G-pocket-hit': {
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  'G-back-panel': {
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery: 'Back-panel scale in thread is a jumbo hooping job, not a Stage 0 line item.',
    },
  },
  'G-sleeve-hit': {
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  'G-tonal-emboss': {
    methods: ['screen2', 'embroidery'],
    because: {
      dtf: 'DTF film is opaque and sits on top of the cloth — it cannot read as tonal.',
      screen1: 'Tonal on a faded blank needs an underbase blocker, so it costs a second pass this tier has not bought.',
    },
  },
  'G-distressed': {
    methods: ['dtf', 'screen1', 'screen2'],
    because: { embroidery: 'Halftone breakup has no equivalent in thread.' },
  },
  'G-grid-diagram': {
    methods: ['dtf'],
    because: {
      screen1: 'Lines below ~1pt drop out through a screen on textured cotton.',
      screen2: 'Lines below ~1pt drop out through a screen on textured cotton.',
      embroidery: 'Thread cannot hold a sub-1pt line at all.',
    },
  },
  'G-embroidered-patch': {
    methods: ['embroidery'],
    because: {
      dtf: 'Appliqué is a stitched-down cut piece; it needs the embroidery line this tier has not paid for.',
      screen1: 'Appliqué is a stitched-down cut piece; it needs the embroidery line this tier has not paid for.',
      screen2: 'Appliqué is a stitched-down cut piece; it needs the embroidery line this tier has not paid for.',
    },
  },
  'G-stripe-panel': {
    methods: [],
    because: {},
    never: 'Not a decoration — a pieced seam. Leaves the decorated-blanks path at every budget.',
  },
  'G-allover': {
    methods: [],
    because: {},
    never: 'Sublimation needs polyester. Off-brief for a cotton, garment-dyed line at every budget.',
  },
};

export interface Availability {
  ok: boolean;
  /** True when no budget can reach it, as opposed to merely not this one. */
  never: boolean;
  method: Method;
  reason?: string;
  /** Budget stops that CAN execute it, for the "available at" hint. */
  availableAt: number[];
}

/** Can `graphicId` be made at budget stop `tier` (0-indexed)? */
export function availability(graphicId: string, tier: number): Availability {
  const t = Math.min(TIER_METHOD.length - 1, Math.max(0, tier));
  const method = TIER_METHOD[t];
  const spec = EXECUTION[graphicId];

  if (!spec) {
    // Unknown id: fail open rather than silently hiding a graphic.
    return { ok: true, never: false, method, availableAt: STATES.map((_, i) => i) };
  }

  const availableAt = STATES.map((_, i) => i).filter((i) => spec.methods.includes(TIER_METHOD[i]));

  if (spec.never) {
    return { ok: false, never: true, method, reason: spec.never, availableAt: [] };
  }
  if (spec.methods.includes(method)) {
    return { ok: true, never: false, method, availableAt };
  }
  return {
    ok: false,
    never: false,
    method,
    reason: spec.because[method] ?? `Not executable in ${METHOD_LABEL[method]}.`,
    availableAt,
  };
}

/** Convenience for components holding a budget slug rather than an index. */
export function availabilityForSlug(graphicId: string, budgetSlug: string): Availability {
  return availability(graphicId, tierIndex(budgetSlug));
}

/** How many of the given graphics are producible at a stop. For live captions. */
export function producibleCount(graphicIds: string[], tier: number): number {
  return graphicIds.filter((id) => availability(id, tier).ok).length;
}

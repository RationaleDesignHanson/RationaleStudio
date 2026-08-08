/**
 * BLANK — wordmark treatments.
 *
 * Two stages, and they do different jobs. This file is stage one.
 *
 * STAGE ONE (here): SET TYPE. Six typographic treatments, rendered live in the
 * browser from the site's own three families. This is not yet a wordmark — it is
 * a font applied to a word — but it does three things nothing else can: it takes
 * ANY word, it is always spelled correctly, and it costs nothing to explore. Its
 * real job is to pick a lane and to be the reference image for stage two.
 *
 * STAGE TWO (scripts/generate-wordmarks.mjs): DRAW IT. A wordmark proper has
 * modified terminals, tightened counters, a custom ligature — character that set
 * type does not have. That has to be generated. The reason generated wordmarks
 * normally fail is that the model is asked to SPELL, and image models cannot;
 * ask for a seven-letter name and it comes back misspelled, differently wrong on
 * every roll. Passing the correctly-set word as an image reference removes
 * spelling from the model's job and leaves only drawing, which it is good at.
 *
 * PRODUCTION GATING IS PER WORD, not just per treatment, and that is the point.
 * A wordmark's length times its tracking decides whether it clears the 14in
 * standard platen; thin strokes at display size cannot be embroidered at Stage 0
 * stitch counts; hairline serifs drop out through a screen on textured cotton.
 * So a five-letter name and a fourteen-character one genuinely do not have the
 * same options. BLANK is the working name; longer candidates are constrained by
 * the platen before they are constrained by taste.
 */

import { STATES } from './line';

/** Standard platen, referenced in the print library's own notes. */
export const PLATEN_INCHES = 14;

export type Method = 'dtf' | 'screen1' | 'screen2' | 'embroidery';
export const TIER_METHOD: Method[] = ['dtf', 'screen1', 'screen2', 'embroidery'].concat([
  'embroidery',
]) as Method[];

export interface Treatment {
  id: string;
  title: string;
  /** 'straight' reads as type; 'funky' is doing something to it. */
  group: 'straight' | 'funky';
  /** What lane this is, in the founder's terms. */
  lane: string;
  /**
   * Inline style for live rendering. Deliberately loose: the funky treatments
   * need text-stroke, transforms, backgrounds and line-wrapping, not just weight
   * and tracking, and constraining this to four properties is what would make
   * them impossible.
   */
  css: Record<string, string | number>;
  /** Relative width per character, in ems, used to estimate print width. */
  emPerChar: number;
  /**
   * Set on treatments that WRAP. Width is then driven by the longest line, not
   * by the total character count.
   *
   * Without this, a stacked treatment reported half-width for every word,
   * including words short enough to sit on one line — BLANK displayed on a
   * single line while claiming 2.7in against an actual ~5in. Halving the count
   * is only true once the word is long enough to actually wrap.
   */
  maxCharsPerLine?: number;
  /** Methods that can execute it. */
  methods: Method[];
  /** Why the others cannot. */
  because: Partial<Record<Method, string>>;
}

export const TREATMENTS: Treatment[] = [
  {
    id: 'grotesque-tight',
    group: 'straight',
    title: 'Grotesque, tight',
    lane: 'Neutral and modern. The safe default, and the most versatile to produce.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.62,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'grotesque-wide',
    group: 'straight',
    title: 'Grotesque, wide',
    lane: 'Quiet and fashion-adjacent. Open tracking reads as restraint.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 400,
      letterSpacing: '0.42em',
      textTransform: 'uppercase',
    },
    emPerChar: 1.02,
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery:
        'Light strokes at this tracking are too thin to hold as satin stitch, and the width pushes the stitch count past the tier.',
    },
  },
  {
    id: 'serif-heritage',
    group: 'straight',
    title: 'Serif',
    lane: 'Heritage and editorial. Reads older and more expensive than it costs.',
    css: {
      fontFamily: 'var(--font-newsreader), serif',
      fontWeight: 500,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.66,
    methods: ['dtf', 'screen2'],
    because: {
      screen1: 'Hairline serifs need the finer mesh and the second pass; on one screen they fill in.',
      embroidery: 'Serif brackets and hairlines have no equivalent in thread at this scale.',
    },
  },
  {
    id: 'mono-technical',
    group: 'straight',
    title: 'Mono / technical',
    lane: 'Institutional. Pairs with the lot system rather than fighting it.',
    css: {
      fontFamily: 'var(--font-geist-mono), monospace',
      fontWeight: 500,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.74,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'heavy-display',
    group: 'straight',
    title: 'Heavy display',
    lane: 'The loud option, done well. Cheapest to make and the most graphic.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.055em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.66,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'stencil-lot',
    group: 'straight',
    title: 'Stamped / lot',
    lane: 'Utilitarian. The mark and the batch number are the same system.',
    css: {
      fontFamily: 'var(--font-geist-mono), monospace',
      fontWeight: 700,
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.88,
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery:
        'A stamped edge is broken ink by definition; thread renders it as a clean shape and the character is lost.',
    },
  },
];

/**
 * The funky six. Each one does something TO the type rather than just choosing a
 * face, and each earns its place by having a production consequence rather than
 * by being decorative.
 *
 * The one worth arguing for is STACKED. The tool already tells you to "shorten
 * the word, tighten the tracking, or set it on two lines" when a name blows the
 * 14in platen — stacking is that third answer, made available instead of merely
 * suggested. It roughly halves the width, so a long name that fits nothing else
 * fits this. Height is not the binding constraint: the standard platen is 14x16,
 * so there is room to go down but not across.
 */
export const FUNKY: Treatment[] = [
  {
    id: 'stacked',
    group: 'funky',
    title: 'Stacked',
    lane: 'Two lines. Halves the width, which is how a long name clears the platen.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase',
      lineHeight: 0.86,
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      maxWidth: '5.5ch',
    },
    emPerChar: 0.66,
    maxCharsPerLine: 6,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'outline',
    group: 'funky',
    title: 'Outline',
    lane: 'Hollow. Reads expensive in print and is the cheapest ink coverage there is.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 800,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      color: 'transparent',
      WebkitTextStroke: '1.5px var(--era-ink)',
    },
    emPerChar: 0.64,
    methods: ['dtf'],
    because: {
      screen1: 'An outline is two thin strokes per letter; below ~1pt they close up through a screen on textured cotton.',
      screen2: 'Same problem on two screens — the limit is stroke width, not colour count.',
      embroidery: 'Outlining every letter multiplies the stitch path far past the tier budget.',
    },
  },
  {
    id: 'crushed',
    group: 'funky',
    title: 'Crushed',
    lane: 'Letters touching. Aggressive, and the narrowest solid option here.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 900,
      letterSpacing: '-0.14em',
      textTransform: 'uppercase',
    },
    emPerChar: 0.52,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'oblique',
    group: 'funky',
    title: 'Oblique',
    lane: 'Sheared forward. Athletic, and free — no extra passes, no extra ink.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 800,
      letterSpacing: '-0.01em',
      textTransform: 'uppercase',
      transform: 'skewX(-13deg)',
    },
    emPerChar: 0.66,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'knockout',
    group: 'funky',
    title: 'Knockout',
    lane: 'Reversed out of a solid block. The loudest thing on this page.',
    css: {
      fontFamily: 'var(--font-geist-mono), monospace',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      backgroundColor: 'var(--era-ink)',
      color: 'var(--era-bg)',
      padding: '0.12em 0.3em',
      display: 'inline-block',
    },
    emPerChar: 0.8,
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery:
        'A solid filled block is the most expensive shape in thread — the fill alone runs past the stitch budget before the letters start.',
    },
  },
  {
    id: 'compressed',
    group: 'funky',
    title: 'Compressed',
    lane: 'Squeezed narrow. Fits a long name where nothing else will, and still solid.',
    css: {
      fontFamily: 'var(--font-geist-sans), sans-serif',
      fontWeight: 900,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      transform: 'scaleX(0.58)',
      transformOrigin: 'left center',
    },
    emPerChar: 0.4,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
];

/** Everything the grid offers, straight first. */
export const ALL_TREATMENTS: Treatment[] = [...TREATMENTS, ...FUNKY];

/**
 * Cleaned word: uppercase, no runs of space, fully trimmed, capped so a pasted
 * link cannot break layout.
 *
 * Fully trimmed rather than trimStart: this is used for the specimen and for the
 * width estimate, so a trailing space would inflate both the character count and
 * the inch measurement that decides whether the word clears the platen. Typing a
 * space mid-word still works, because the input field renders the raw value and
 * only measurement goes through here.
 */
export function normalise(word: string): string {
  return word.toUpperCase().replace(/\s+/g, ' ').trim().slice(0, 18);
}

/**
 * Estimated print width in inches at a given cap height.
 *
 * Deliberately crude — emPerChar is a per-treatment average, not metrics from
 * the font file — and it is used only to answer "does this clear the platen",
 * which is a question about inches not points. Stated as approximate in the UI.
 */
export function estimateWidthInches(word: string, t: Treatment, capHeightInches = 1.6): number {
  const chars = normalise(word).length;
  if (!chars) return 0;
  // A wrapping treatment is as wide as its longest line, which is the character
  // count only until the word exceeds the line, and the line length after that.
  const effective = t.maxCharsPerLine ? Math.min(chars, t.maxCharsPerLine) : chars;
  return Math.round(effective * t.emPerChar * capHeightInches * 10) / 10;
}

/** How many lines a treatment sets the word on. 1 unless it wraps. */
export function lineCount(word: string, t: Treatment): number {
  const chars = normalise(word).length;
  if (!chars || !t.maxCharsPerLine) return 1;
  return Math.max(1, Math.ceil(chars / t.maxCharsPerLine));
}

export interface WordmarkAvailability {
  ok: boolean;
  method: Method;
  reason?: string;
  availableAt: number[];
  widthInches: number;
  /** Set when the word is simply too long for the platen in this treatment. */
  overPlaten: boolean;
}

export function availability(
  word: string,
  t: Treatment,
  tier: number,
): WordmarkAvailability {
  const i = Math.min(TIER_METHOD.length - 1, Math.max(0, tier));
  const method = TIER_METHOD[i];
  const widthInches = estimateWidthInches(word, t);
  const overPlaten = widthInches > PLATEN_INCHES;
  const availableAt = STATES.map((_, n) => n).filter((n) => t.methods.includes(TIER_METHOD[n]));

  // Platen is a hard stop regardless of budget: a wider print needs jumbo
  // frames, which is not a Stage 0 line item at any of these tiers.
  if (overPlaten) {
    return {
      ok: false,
      method,
      reason: `About ${widthInches}in wide — past the ${PLATEN_INCHES}in standard platen. Shorten the word, tighten the tracking, or set it on two lines.`,
      availableAt: [],
      widthInches,
      overPlaten: true,
    };
  }

  if (!t.methods.includes(method)) {
    return {
      ok: false,
      method,
      reason: t.because[method] ?? `Not executable in ${method}.`,
      availableAt,
      widthInches,
      overPlaten: false,
    };
  }

  return { ok: true, method, availableAt, widthInches, overPlaten: false };
}

export function producibleCount(word: string, tier: number): number {
  return ALL_TREATMENTS.filter((t) => availability(word, t, tier).ok).length;
}

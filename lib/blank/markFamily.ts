/**
 * BLANK — marks made FROM the name.
 *
 * The old symbol step offered six pieces of static artwork with no relationship
 * to the word. Type BLANK, get offered a ring that owes it nothing. That is two
 * brands, not one identity, and no sequencing fixes it.
 *
 * These are CONSTRUCTIONS instead: take the letterform the name gives you and do
 * something structural to it — enclose it, notch it, stack it, mirror it, overlap
 * it. Every one is derived from the name and rendered in the treatment currently
 * chosen for the wordmark, so the mark and the word share a face by construction.
 * Change the name or the face and the whole family changes with it.
 *
 * WHY NOT GENERATE THESE. Generation cannot spell, costs money per roll, takes
 * ten seconds, and produces something different every time — so a "family" of
 * generated marks is six unrelated images. A construction is deterministic, free,
 * instant, always correct, and genuinely a family because they share a source.
 * Generation earns its place later, drawing custom letterforms FROM a chosen
 * construction, where the model's job is drawing rather than spelling.
 *
 * Each construction carries a production profile, because a mark that cannot be
 * made is not a candidate. The rules are the same ones in producible.ts: fine
 * strokes die on screen and in thread, solid compact shapes survive everything,
 * enclosed forms need the counter to stay open at size.
 */

import type { Method } from './producible';
import { normalise } from './wordmark';

export type Enclosure = 'none' | 'circle' | 'square' | 'shield';

export interface Construction {
  id: string;
  title: string;
  /** What the mark is, in a phrase. */
  note: string;
  /** How many letters it uses: 1 = initial, 2 = two letters, 0 = all initials. */
  letters: 1 | 2 | 0;
  enclosure: Enclosure;
  /** Stack the letters vertically rather than setting them in a row. */
  stacked?: boolean;
  /** Second letter mirrored back-to-back against the first. */
  mirrored?: boolean;
  /** Letters overlap into a ligature. */
  overlap?: boolean;
  /** A wedge cut out of the enclosure. */
  notched?: boolean;
  methods: Method[];
  because: Partial<Record<Method, string>>;
}

export const CONSTRUCTIONS: Construction[] = [
  {
    id: 'initial',
    title: 'Initial',
    note: 'The first letter alone. The plainest mark there is, and the cheapest to make.',
    letters: 1,
    enclosure: 'none',
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'initials',
    title: 'Initials',
    note: 'Every word’s first letter, set in a row.',
    letters: 0,
    enclosure: 'none',
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'stacked',
    title: 'Stacked',
    note: 'Two letters one above the other. Squares the mark up, halves its width.',
    letters: 2,
    enclosure: 'none',
    stacked: true,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'ligature',
    title: 'Ligature',
    note: 'Two letters overlapped into one shape. Reads as a monogram rather than as text.',
    letters: 2,
    enclosure: 'none',
    overlap: true,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'mirror',
    title: 'Mirror',
    note: 'The letter and its reflection, back to back. Symmetrical, and reads as a device.',
    letters: 2,
    enclosure: 'none',
    mirrored: true,
    methods: ['dtf', 'screen1', 'screen2', 'embroidery'],
    because: {},
  },
  {
    id: 'roundel',
    title: 'Roundel',
    note: 'The letter inside a ring. The classic patch and cap-front shape.',
    letters: 1,
    enclosure: 'circle',
    methods: ['dtf', 'screen2', 'embroidery'],
    because: {
      screen1:
        'A ring plus a letter is two elements with a gap between them; on one screen at small size the gap closes and it prints as a blob.',
    },
  },
  {
    id: 'notched-roundel',
    title: 'Notched roundel',
    note: 'A ring with a wedge cut out, letter inside. The notch is what stops it looking generic.',
    letters: 1,
    enclosure: 'circle',
    notched: true,
    methods: ['dtf', 'screen2'],
    because: {
      screen1: 'Same closing-gap problem as the roundel, and the notch is the first detail to fill.',
      embroidery:
        'A clean interruption in a satin-stitched ring needs a stop and restart; at Stage 0 stitch counts it reads as a defect.',
    },
  },
  {
    id: 'block',
    title: 'Block',
    note: 'The letter knocked out of a solid square. The loudest of the set.',
    letters: 1,
    enclosure: 'square',
    methods: ['dtf', 'screen1', 'screen2'],
    because: {
      embroidery:
        'A solid filled block is the most expensive shape in thread — the fill runs past the stitch budget before the letter starts.',
    },
  },
  {
    id: 'shield',
    title: 'Shield',
    note: 'The letter in a shield. Institutional, and it wants the lot number under it.',
    letters: 1,
    enclosure: 'shield',
    methods: ['dtf', 'screen2', 'embroidery'],
    because: {
      screen1: 'The outline and the letter need separating; one screen closes the gap.',
    },
  },
];

/** The letters a construction draws from the name. */
export function lettersFor(word: string, c: Construction): string {
  const w = normalise(word) || 'BLANK';
  const parts = w.split(' ').filter(Boolean);
  const initials = parts.map((p) => p[0]).join('');
  if (c.letters === 0) return initials.slice(0, 3);
  if (c.letters === 2) {
    // Two letters: initials if the name has them, otherwise the first two
    // characters, otherwise the single letter doubled so mirror/stack still read.
    if (initials.length >= 2) return initials.slice(0, 2);
    const bare = w.replace(/\s/g, '');
    return bare.length >= 2 ? bare.slice(0, 2) : bare[0] + bare[0];
  }
  return w[0];
}

/**
 * Is this construction executable at a given decoration method?
 *
 * Enclosed forms are the interesting case: the constraint is not the letter, it
 * is the GAP between the letter and the enclosure, which is the first thing to
 * close up on a coarse screen.
 */
export function constructionAvailable(
  c: Construction,
  method: Method,
): { ok: boolean; reason?: string } {
  if (c.methods.includes(method)) return { ok: true };
  return { ok: false, reason: c.because[method] ?? `Not executable in ${method}.` };
}

export function availableCount(method: Method): number {
  return CONSTRUCTIONS.filter((c) => c.methods.includes(method)).length;
}

/**
 * The constructions worth showing for a given name.
 *
 * A single-word name makes "Initials" identical to "Initial" — same letter, same
 * geometry, drawn twice. Two identical cells in a family of variations reads as a
 * bug, and offering a choice that is not a choice is worse than offering fewer.
 */
export function constructionsFor(word: string): Construction[] {
  const seen = new Set<string>();
  return CONSTRUCTIONS.filter((c) => {
    const key = `${lettersFor(word, c)}|${c.enclosure}|${!!c.stacked}|${!!c.mirrored}|${!!c.overlap}|${!!c.notched}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * RANDOMISED CONSTRUCTIONS.
 *
 * The nine canonical constructions are the ones worth naming. They are not the
 * whole space: enclosure, letter count, stacking, mirroring, overlap, notching
 * and rotation combine into far more marks than nine, and most of the good ones
 * are combinations nobody would think to ask for.
 *
 * Seeded, never Math.random. A shuffled set is only useful if you can send your
 * partner the exact one you were looking at, and an unseeded shuffle gives them a
 * different set — which is the same "generated families are not families" problem
 * that made these constructions rather than renders in the first place.
 *
 * mulberry32: small, fast, well-distributed enough for picking from short lists.
 */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ENCLOSURES: Enclosure[] = ['none', 'none', 'circle', 'square', 'shield'];

/** Methods a generated construction can be executed in, from its own geometry. */
function methodsFor(enclosure: Enclosure, notched: boolean): {
  methods: Method[];
  because: Partial<Record<Method, string>>;
} {
  if (enclosure === 'none') {
    return { methods: ['dtf', 'screen1', 'screen2', 'embroidery'], because: {} };
  }
  if (enclosure === 'square') {
    return {
      methods: ['dtf', 'screen1', 'screen2'],
      because: {
        embroidery:
          'A solid filled block is the most expensive shape in thread — the fill runs past the stitch budget before the letter starts.',
      },
    };
  }
  // circle or shield: the letter and the enclosure need a gap, and the gap is
  // what closes first on one screen.
  const base: Method[] = notched ? ['dtf', 'screen2'] : ['dtf', 'screen2', 'embroidery'];
  return {
    methods: base,
    because: {
      screen1:
        'An enclosed mark is two elements with a gap between them; on one screen at small size the gap closes and it prints as a blob.',
      ...(notched
        ? {
            embroidery:
              'A clean interruption in a satin-stitched enclosure needs a stop and restart; at Stage 0 stitch counts it reads as a defect.',
          }
        : {}),
    },
  };
}

/**
 * A set of constructions drawn from the parametric space, deduped against each
 * other and against what they would actually draw for this word.
 */
export function randomConstructions(word: string, seed: number, count = 9): Construction[] {
  const rnd = mulberry32(seed || 1);
  const out: Construction[] = [];
  const seen = new Set<string>();

  // Bounded rather than while(true): a small space plus dedupe can genuinely run
  // out of distinct marks, and a shuffle must not hang looking for a tenth.
  for (let attempt = 0; attempt < 200 && out.length < count; attempt++) {
    const enclosure = ENCLOSURES[Math.floor(rnd() * ENCLOSURES.length)];
    const notched = enclosure !== 'none' && enclosure !== 'square' && rnd() < 0.35;
    const letters: 1 | 2 | 0 = rnd() < 0.5 ? 1 : rnd() < 0.6 ? 2 : 0;
    // Transforms only apply to two-letter marks, and only one at a time —
    // stacked-and-mirrored-and-overlapped is noise, not a mark.
    const roll = rnd();
    const stacked = letters === 2 && roll < 0.34;
    const mirrored = letters === 2 && roll >= 0.34 && roll < 0.67;
    const overlap = letters === 2 && roll >= 0.67;

    const shape: Omit<Construction, 'id' | 'title' | 'note' | 'methods' | 'because'> = {
      letters,
      enclosure,
      stacked,
      mirrored,
      overlap,
      notched,
    };
    const drawn = lettersFor(word, shape as Construction);
    const key = `${drawn}|${enclosure}|${stacked}|${mirrored}|${overlap}|${notched}`;
    if (seen.has(key)) continue;
    seen.add(key);

    const bits = [
      notched ? 'Notched' : '',
      enclosure === 'circle' ? 'roundel' : enclosure === 'square' ? 'block' : enclosure === 'shield' ? 'shield' : '',
      stacked ? 'stack' : mirrored ? 'mirror' : overlap ? 'ligature' : '',
    ].filter(Boolean);
    const title = bits.length
      ? bits.join(' ').replace(/^./, (m) => m.toUpperCase())
      : letters === 1
        ? 'Initial'
        : 'Letters';

    const { methods, because } = methodsFor(enclosure, notched);
    out.push({
      ...shape,
      id: `r-${seed}-${attempt}`,
      title,
      note: `${drawn} — ${title.toLowerCase()}. Generated from the name; shuffle for another set.`,
      methods,
      because,
    });
  }
  return out;
}

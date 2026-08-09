/**
 * BLANK — the colour space the bake-off draws from.
 *
 * The five colourways in prompts.ts exist to serve the deviation renderer and are
 * hardcoded because that route composes them into a tuple prompt. A colour BEAT
 * needs more than five, and it needs them to carry their production consequences,
 * because colour is where a small line quietly gets expensive:
 *
 *  - Stage 0 is TWO COLOURWAYS MAX per style. A third is a third buy of every
 *    blank, at a lower per-unit price break on each.
 *  - Garment dye means piece-to-piece variation is inherent, so you approve a
 *    SHADE BAND, not a Pantone. Anything demanding an exact match is a custom dye
 *    lot, which is 800-1,000m — roughly 300-500 garments in one colour.
 *  - Undyed and ecru are the cheapest things here: no dye lot at all.
 *  - A saturated or very dark shade costs more to hit consistently and shows
 *    print registration errors that a mid-tone hides.
 *
 * Sourced from the same reference material as the rest of the model, and carrying
 * the same caveat: these are planning anchors from vendor ranges, not quotes.
 */

export interface Palette {
  id: string;
  name: string;
  /** Written for the image model, not for the UI. */
  clause: string;
  /** Approximate swatch, for the picker only — never for approval. */
  hex: string;
  /** What choosing it costs, in production terms. */
  note: string;
  /** Stage 0 reachable without a custom dye lot? */
  stage0: boolean;
}

export const PALETTES: Palette[] = [
  {
    id: 'faded-charcoal',
    name: 'Faded charcoal',
    clause: 'a faded charcoal near-black, washed soft and slightly uneven from garment dyeing',
    hex: '#2B2A28',
    note: 'Stock in every blank catalogue. Hides registration drift; shows lint.',
    stage0: true,
  },
  {
    id: 'bone',
    name: 'Bone',
    clause: 'a warm pale oatmeal bone, undyed-looking and slightly creamy',
    hex: '#D9CFBE',
    note: 'Cheapest of all — closest to undyed, no dye lot to match.',
    stage0: true,
  },
  {
    id: 'stone-grey',
    name: 'Stone grey',
    clause: 'a clear neutral stone grey, the colour of weathered concrete, with no warmth in it',
    hex: '#8C8A84',
    note: 'Mid-tone, forgiving. The safest ground for a tonal print.',
    stage0: true,
  },
  {
    id: 'olive',
    name: 'Olive',
    clause: 'a muted drab olive green, dusty rather than bright',
    hex: '#6E6B4E',
    note: 'Stock in most garment-dye programmes. Reads workwear.',
    stage0: true,
  },
  {
    id: 'clay',
    name: 'Clay',
    clause: 'a warm mid-brown tobacco clay, a deep dusty terracotta with no orange brightness',
    hex: '#A6795B',
    note: 'Stock, but a narrower range of blanks carry it.',
    stage0: true,
  },
  {
    id: 'ecru',
    name: 'Ecru',
    clause: 'an undyed ecru natural cotton, greyish off-white with visible slub in the yarn',
    hex: '#E3DDD1',
    note: 'No dye lot at all. The cheapest colourway that exists.',
    stage0: true,
  },
  {
    id: 'washed-indigo',
    name: 'Washed indigo',
    clause: 'a washed-down indigo blue, faded unevenly like an old work jacket',
    hex: '#4A5A6B',
    note: 'Indigo crocks and fades unevenly — a feature, but sample it wet.',
    stage0: true,
  },
  {
    id: 'oxblood',
    name: 'Oxblood',
    clause: 'a deep muted oxblood red-brown, dark and dusty rather than bright',
    hex: '#6B3A38',
    note: 'Saturated dark shades cost more to hit consistently across a lot.',
    stage0: false,
  },
  {
    id: 'sage',
    name: 'Sage',
    clause: 'a pale dusty sage green, soft and chalky',
    hex: '#A8B0A0',
    note: 'Pale greens drift between lots; approve a wide shade band.',
    stage0: true,
  },
  {
    id: 'sand',
    name: 'Sand',
    clause: 'a warm pale sand khaki, sun-bleached rather than yellow',
    hex: '#C4B49A',
    note: 'Stock. Shows every mark, including the ones you did not print.',
    stage0: true,
  },
  {
    id: 'ink',
    name: 'Ink',
    clause: 'a true deep black, dense and flat with very little fade',
    hex: '#141414',
    note: 'A true black is a custom dye lot in garment dye — not Stage 0.',
    stage0: false,
  },
  {
    id: 'rust',
    name: 'Rust',
    clause: 'a burnt rust orange-brown, earthy and desaturated',
    hex: '#9C5B3C',
    note: 'Saturated warm shades need a dedicated lot to stay consistent.',
    stage0: false,
  },
];

/** Stage 0 allows two colourways per style; a third is a third buy. */
export const STAGE0_COLOURWAY_LIMIT = 2;

export const paletteById = (id: string): Palette | undefined => PALETTES.find((p) => p.id === id);

/**
 * Six candidates for a bake-off round, seeded so a shared link shows the same six.
 * Stage 0 palettes are favoured but the non-Stage-0 ones are not hidden — seeing
 * what a true black would cost is the point of putting cost on the tile.
 */
export function paletteRound(seed: number, count = 6): Palette[] {
  let a = (seed || 1) >>> 0;
  const rnd = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pool = [...PALETTES];
  const out: Palette[] = [];
  while (out.length < count && pool.length) {
    // Weighted toward Stage 0 without excluding the rest.
    const i = Math.floor(rnd() * pool.length);
    const p = pool[i];
    if (!p.stage0 && rnd() < 0.5 && pool.length > count - out.length) {
      pool.splice(i, 1);
      continue;
    }
    out.push(p);
    pool.splice(i, 1);
  }
  return out;
}

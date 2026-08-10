/**
 * What a colour does when it lands on actual cloth.
 *
 * A hex is a paint chip. The same dye is not the same colour on a 4.3oz combed
 * jersey, a 14oz brushed fleece and a structured cotton twill cap panel — the
 * fleece eats light and reads deeper and duller, the twill reflects and reads
 * flatter and more saturated, and a pigment- or garment-dyed piece reads lighter
 * and unevenly on purpose, which is the entire reason anyone pays for it.
 *
 * So a colour card of flat hex fields is honest about the DYE and dishonest
 * about the GARMENT, and the garment is what you are buying. Worse, the blank
 * changes with the budget tier — the tee is a 4.3oz Bella+Canvas at $3k and an
 * AS Colour Heavy Faded at $12k — so the same palette genuinely looks like two
 * different lines at two different budgets, and nothing in the tool showed it.
 *
 * This is a MODEL of that, not a photograph of it: a stated shift and a stated
 * texture, cheap enough to sweep a whole palette against. The generated
 * photograph in beat 05 is still the place to find out what it feels like.
 *
 * CONFIDENCE: these are craft judgements about how cloth behaves — the same
 * class of claim as the costNote fields, and softer than the prices. They are
 * directionally right and not colorimetry.
 */

export type Knit = 'jersey' | 'fleece' | 'twill';
export type Dye = 'piece' | 'garment' | 'pigment';

export interface Fabric {
  /** Ounces per square yard. Weight is most of why cloth reads dark. */
  weightOz: number;
  knit: Knit;
  dye: Dye;
}

/**
 * The blanks the line can actually use, by id. Weights and finishes come from
 * the `note` on each blank in economics.ts, which had them in prose only.
 */
export const FABRIC: Record<string, Fabric> = {
  bc3001: { weightOz: 4.3, knit: 'jersey', dye: 'piece' },
  shakaSHGD: { weightOz: 7.5, knit: 'jersey', dye: 'pigment' },
  as5082: { weightOz: 7.0, knit: 'jersey', dye: 'garment' },
  as5085: { weightOz: 7.0, knit: 'jersey', dye: 'garment' },
  la1801gd: { weightOz: 6.5, knit: 'jersey', dye: 'garment' },
  as5146: { weightOz: 12.0, knit: 'fleece', dye: 'piece' },
  as5166: { weightOz: 13.0, knit: 'fleece', dye: 'garment' },
  laHF09: { weightOz: 14.0, knit: 'fleece', dye: 'piece' },
  cap1130: { weightOz: 8.0, knit: 'twill', dye: 'piece' },
};

/**
 * Who made the blank.
 *
 * A palette entry is an abstract name — "olive" — and the tool renders it across
 * a Bella+Canvas tee, an LA Apparel hoodie and an AS Colour cap as a matched
 * set, differing only by weight and knit. Three mills, three dye houses, three
 * cottons. They will not match, and on a rack the mismatch is instantly visible
 * and reads as cheap.
 *
 * A range that does not match on colour is not a range, so the tool has to say
 * so. This is the cheap half of the fix — the expensive half is a per-blank
 * catalogue-colour matrix, which is data entry from public vendor colour lists
 * and worth doing before anyone actually buys.
 */
export const BRAND: Record<string, string> = {
  bc3001: 'Bella+Canvas',
  shakaSHGD: 'Shaka Wear',
  as5082: 'AS Colour',
  as5085: 'AS Colour',
  la1801gd: 'LA Apparel',
  as5146: 'AS Colour',
  as5166: 'AS Colour',
  laHF09: 'LA Apparel',
  cap1130: 'AS Colour',
};

export const brandFor = (blankId: string): string => BRAND[blankId] ?? 'unknown';

/**
 * The distinct manufacturers a set of blanks spans.
 *
 * More than one means a colour cannot be trusted to match across the range, and
 * the only reliable answer is to order both and compare them in daylight.
 */
export function brandsAcross(blankIds: string[]): string[] {
  return [...new Set(blankIds.map(brandFor))].filter((b) => b !== 'unknown');
}

export const DEFAULT_FABRIC: Fabric = { weightOz: 6, knit: 'jersey', dye: 'piece' };

export const fabricFor = (blankId: string): Fabric => FABRIC[blankId] ?? DEFAULT_FABRIC;

// ── Colour, once it is on the cloth ──────────────────────────────────────────

function toRgb(hex: string): [number, number, number] {
  const n = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16)) as [number, number, number];
}

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const toHex = (rgb: number[]) => '#' + rgb.map((v) => clamp(v).toString(16).padStart(2, '0')).join('');

/**
 * The colour as the cloth actually returns it.
 *
 *  - Brushed fleece scatters light in every direction, so it reads DEEPER and
 *    duller the heavier it gets.
 *  - Twill is a flat structured weave and reflects, so it reads cleaner and
 *    slightly more saturated — which is why a cap almost never matches the tee.
 *  - Pigment and garment dye sit on the surface and wash back, so they read
 *    LIGHTER and softer than the swatch. That fade is the product.
 */
export function onCloth(hex: string, f: Fabric): string {
  let [r, g, b] = toRgb(hex);
  const mean = (r + g + b) / 3;

  // Weight darkens: nothing at 4oz, about 12% at 14oz.
  const darken = Math.min(0.14, Math.max(0, (f.weightOz - 4) * 0.012));
  // Knit decides how much light comes back.
  const knitLift = f.knit === 'twill' ? 0.04 : f.knit === 'fleece' ? -0.05 : 0;
  // Dye decides how far it has already faded.
  const dyeLift = f.dye === 'pigment' ? 0.1 : f.dye === 'garment' ? 0.06 : 0;
  const lift = 1 - darken + knitLift + dyeLift;

  // Saturation: fleece and washed dyes lose it, twill keeps it.
  const sat =
    (f.knit === 'fleece' ? 0.82 : f.knit === 'twill' ? 1.06 : 1) *
    (f.dye === 'piece' ? 1 : 0.88);

  [r, g, b] = [r, g, b].map((v) => mean + (v - mean) * sat) as [number, number, number];
  return toHex([r * lift, g * lift, b * lift]);
}

/** One sentence on what this cloth does to a colour and to a print. */
export function clothNote(f: Fabric): string {
  const body =
    f.knit === 'fleece'
      ? `${f.weightOz}oz brushed fleece — deep and matte, and it swallows fine line work`
      : f.knit === 'twill'
        ? `${f.weightOz}oz structured twill — flat and clean, the most saturated of the three`
        : `${f.weightOz}oz jersey — the truest to the swatch, and the least forgiving of a heavy print`;
  const finish =
    f.dye === 'pigment'
      ? '. Pigment dyed, so it arrives already faded and no two lots match exactly'
      : f.dye === 'garment'
        ? '. Garment dyed, so the colour is soft and slightly uneven by design'
        : '';
  return body + finish;
}

/**
 * A CSS background stack that reads as this cloth at swatch size.
 *
 * Procedural rather than photographed: it costs nothing, it recolours instantly
 * for any palette, and there is no photograph of every blank in every colour to
 * be had anyway.
 */
export function clothTexture(hex: string, f: Fabric): { backgroundImage: string; backgroundSize: string } {
  const shade = 'rgba(0,0,0,0.10)';
  const light = 'rgba(255,255,255,0.07)';

  if (f.knit === 'fleece') {
    // Napped surface: soft blotches, no visible line.
    return {
      backgroundImage: [
        `radial-gradient(ellipse at 30% 25%, ${light}, transparent 55%)`,
        `radial-gradient(ellipse at 70% 70%, ${shade}, transparent 60%)`,
        `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0 1px, transparent 1px)`,
      ].join(','),
      backgroundSize: '100% 100%, 100% 100%, 5px 5px',
    };
  }
  if (f.knit === 'twill') {
    // The diagonal is the whole visual signature of a cap panel.
    return {
      backgroundImage: [
        `repeating-linear-gradient(45deg, ${light} 0 1px, transparent 1px 3px)`,
        `linear-gradient(180deg, ${light}, transparent 40%, ${shade})`,
      ].join(','),
      backgroundSize: '4px 4px, 100% 100%',
    };
  }
  // Jersey: fine horizontal courses.
  return {
    backgroundImage: [
      `repeating-linear-gradient(0deg, ${shade} 0 1px, transparent 1px 3px)`,
      `linear-gradient(160deg, ${light}, transparent 45%, ${shade})`,
    ].join(','),
    backgroundSize: '3px 3px, 100% 100%',
  };
}

/** Ink reads dark on a pale ground and light on a dark one. */
export function inkOn(hex: string): string {
  const [r, g, b] = toRgb(hex);
  // Rec. 601 luma — what a printer is deciding when they ask white or black ink.
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? '#1A1A18' : '#F2EFE9';
}

/**
 * BLANK — unit economics.
 *
 * A faithful TypeScript port of the model in
 * `~/Developer/skreet/analysis/02b-economics-corrected.json` (`costFunction`).
 *
 * RULE: if this file and that JSON ever disagree, THIS FILE IS WRONG. The model
 * is the source of truth; this is a transcription so the microsite can compute
 * live without shipping a 336KB JSON to the browser. `economics.test.ts` asserts
 * the model's own worked examples, so a divergence fails CI rather than quietly
 * misinforming a visitor.
 *
 * Every coefficient carries its source id and confidence from the model:
 *   hard             = published/verified live
 *   derived          = computed from sourced inputs
 *   soft             = single soft source (vendor/SEO blog)
 *   soft-conflicted  = sources disagree
 * `confidence` is surfaced in the UI. 37 of 44 figures in the wider analysis are
 * load-bearing and unverified; unmarked numbers are not acceptable on a public
 * page presenting a real venture plan.
 */

export type Confidence = 'hard' | 'derived' | 'soft' | 'soft-conflicted';
export type RunSize = 25 | 50 | 75 | 100 | 150 | 300;
export type Tier = 'budget' | 'premium' | 'premium-usa';

export interface Sourced<T> {
  value: T;
  source: string;
  confidence: Confidence;
  note?: string;
}

// ── Run-size index ───────────────────────────────────────────────────────────
// Normalised to 1.00 at 100 units. Applied to blanks AND to hero CMT/fabric/trims.
export const RUN_INDEX: Record<RunSize, number> = {
  25: 1.15,
  50: 1.08,
  75: 1.03,
  100: 1.0,
  150: 0.96,
  300: 0.9,
};
export const RUN_SIZES: RunSize[] = [25, 50, 75, 100, 150, 300];

/**
 * Log-linear interpolation between tier points, clamped to [0.90, 1.15].
 * Used only by the hero break-even solver, which evaluates non-tier unit counts.
 */
export function runIndexContinuous(n: number): number {
  if (n <= 25) return 1.15;
  if (n >= 300) return 0.9;
  for (let i = 0; i < RUN_SIZES.length - 1; i++) {
    const lo = RUN_SIZES[i];
    const hi = RUN_SIZES[i + 1];
    if (n >= lo && n <= hi) {
      const t = (Math.log(n) - Math.log(lo)) / (Math.log(hi) - Math.log(lo));
      return RUN_INDEX[lo] + t * (RUN_INDEX[hi] - RUN_INDEX[lo]);
    }
  }
  return 1.0;
}

// ── Blanks ───────────────────────────────────────────────────────────────────
export interface Blank {
  id: string;
  name: string;
  tier: Tier;
  category: 'tee' | 'hoodie' | 'cap';
  /** Published tier ladder. A live published break beats a derived index. */
  ladder?: Partial<Record<RunSize, number>>;
  /** Fallback: price at 100 units, scaled by RUN_INDEX. */
  price100?: number;
  /** Faded/pigment/garment-dyed blanks need an underbase blocker = one extra screen. */
  blockerRequired: boolean;
  source: string;
  confidence: Confidence;
  note?: string;
}

export const BLANKS: Record<string, Blank> = {
  bc3001: {
    id: 'bc3001',
    name: 'Bella+Canvas 3001',
    tier: 'budget',
    category: 'tee',
    price100: 4.57,
    blockerRequired: false,
    source: 'HL-4-blanks',
    confidence: 'hard',
    note: '4.3oz. Off-brief for quiet flex — this is the graphics test canvas.',
  },
  shakaSHGD: {
    id: 'shakaSHGD',
    name: 'Shaka Wear SHGD',
    tier: 'premium',
    category: 'tee',
    ladder: { 25: 8.46, 50: 8.46, 75: 8.46, 100: 8.03, 150: 8.03, 300: 8.03 },
    blockerRequired: true,
    source: 'SR-1-blanks',
    confidence: 'hard',
    note: 'Blankstyle published ladder [LIVE]. 7.5oz pigment dyed. Has a genuine "Clay Red".',
  },
  as5082: {
    id: 'as5082',
    name: 'AS Colour 5082 Heavy Faded Tee',
    tier: 'premium',
    category: 'tee',
    price100: 13.5,
    blockerRequired: true,
    source: 'DERIVED',
    confidence: 'derived',
    note: 'AS Colour wholesale sits behind a trade login. Derived; range $12.00–15.50. GET A TRADE QUOTE.',
  },
  as5085: {
    id: 'as5085',
    name: 'AS Colour 5085 Stone Wash Heavy Tee',
    tier: 'premium',
    category: 'tee',
    price100: 12.6,
    blockerRequired: true,
    source: 'DERIVED',
    confidence: 'derived',
  },
  la1801gd: {
    id: 'la1801gd',
    name: 'LA Apparel 1801GD',
    tier: 'premium-usa',
    category: 'tee',
    price100: 17.3,
    blockerRequired: true,
    source: 'DD-2-blankspecs',
    confidence: 'hard',
  },
  as5146: {
    id: 'as5146',
    name: 'AS Colour 5146 Heavy Hood',
    tier: 'premium',
    category: 'hoodie',
    ladder: { 25: 40.5, 50: 36.45, 75: 36.45, 100: 36.45, 150: 36.45, 300: 36.45 },
    // NOT blocker-required: standard-dyed 80/20 CVC, needs a low-bleed POLY ink
    // system instead — a different vendor question, not an extra screen.
    blockerRequired: false,
    source: 'SR-1-blanks',
    confidence: 'hard',
    note: 'Published ascolour.com ladder [LIVE]. $36.45 is a CEILING above 50u, never a floor.',
  },
  as5166: {
    id: 'as5166',
    name: 'AS Colour 5166 Relax Faded Hood',
    tier: 'premium',
    category: 'hoodie',
    // FACT-CHECK CORRECTION (07-factcheck): the model derived $40.10 from an
    // assumed garment-dye premium. Published price is $35.10 — CHEAPER than the
    // 5146, because it is 9.4oz not 11.8oz. Worth $5.00/unit; hoodie GM moves
    // 55.1%→59.3% and 53.9%→58.4%.
    ladder: { 25: 39.0, 50: 35.1, 75: 35.1, 100: 35.1, 150: 35.1, 300: 35.1 },
    blockerRequired: true,
    source: '07-factcheck (supersedes 02b DERIVED $40.10)',
    confidence: 'hard',
    note: 'The actual garment-dyed faded hoodie. The 5146 is NOT garment-dyed.',
  },
  laHF09: {
    id: 'laHF09',
    name: 'LA Apparel HF09 14oz Heavy Fleece',
    tier: 'premium-usa',
    category: 'hoodie',
    price100: 45,
    blockerRequired: false,
    source: 'HL-4-blanks',
    confidence: 'derived',
  },
  cap1130: {
    id: 'cap1130',
    name: 'AS Colour 1130 Access Cap',
    tier: 'premium',
    category: 'cap',
    ladder: { 25: 15, 50: 13, 75: 13, 100: 13, 150: 13, 300: 13 },
    blockerRequired: false,
    source: 'SR-1-blanks',
    confidence: 'derived',
    note: '$20.00 at qty 1 [LIVE]; tiers inferred from the VERIFIED sibling 1138 ladder.',
  },
};

export function blankUnit(blank: Blank, run: RunSize): number {
  if (blank.ladder?.[run] !== undefined) return blank.ladder[run]!;
  return (blank.price100 ?? 0) * RUN_INDEX[run];
}

// ── Decoration ───────────────────────────────────────────────────────────────
export type DecorationMethod =
  | 'none'
  | 'screen'
  | 'discharge'
  | 'dtf'
  | 'dtg'
  | 'embroidery';

export const SCREEN_RATE_PER_COLOR: Record<RunSize, number> = {
  25: 2.25,
  50: 1.9,
  75: 1.7,
  100: 1.5,
  150: 1.3,
  300: 1.05,
};

export const DECO = {
  dischargeMultiplier: { value: 1.25, source: 'DERIVED', confidence: 'derived' as Confidence },
  dtfPerPrint: { value: 1.5, source: 'HL-4-deco', confidence: 'soft' as Confidence },
  dtgPerPrint: { value: 7.5, source: 'HL-4-deco', confidence: 'soft' as Confidence },
  embroideryPer1000Stitches: {
    value: 1.0,
    source: 'DD-1-embroidery / HL-4-deco',
    confidence: 'soft-conflicted' as Confidence,
  },
  embroideryMinCharge: { value: 3.0, source: 'HL-4-blanks', confidence: 'derived' as Confidence },
  screenSetupPerColor: {
    value: 27.5,
    source: 'DD-1-screen / HL-4-deco',
    confidence: 'soft-conflicted' as Confidence,
  },
  embroideryDigitizing: { value: 70, source: 'DD-1-embroidery', confidence: 'soft' as Confidence },
};

export interface Decoration {
  method: DecorationMethod;
  /** Spot colours, for screen/discharge. */
  colors?: number;
  /** Stitch count, for embroidery. */
  stitches?: number;
}

/** passes = colors + (blockerRequired ? 1 : 0) */
export function decorationPasses(deco: Decoration, blank: Blank): number {
  if (deco.method !== 'screen' && deco.method !== 'discharge') return 0;
  return (deco.colors ?? 0) + (blank.blockerRequired ? 1 : 0);
}

export function decorationVariable(deco: Decoration, blank: Blank, run: RunSize): number {
  switch (deco.method) {
    case 'none':
      return 0;
    case 'screen':
      return decorationPasses(deco, blank) * SCREEN_RATE_PER_COLOR[run];
    case 'discharge':
      return (
        decorationPasses(deco, blank) *
        SCREEN_RATE_PER_COLOR[run] *
        DECO.dischargeMultiplier.value
      );
    case 'dtf':
      return DECO.dtfPerPrint.value;
    case 'dtg':
      return DECO.dtgPerPrint.value;
    case 'embroidery':
      return Math.max(
        DECO.embroideryMinCharge.value,
        ((deco.stitches ?? 0) / 1000) * DECO.embroideryPer1000Stitches.value,
      );
  }
}

export function decorationFixed(deco: Decoration, blank: Blank): number {
  if (deco.method === 'screen' || deco.method === 'discharge') {
    return decorationPasses(deco, blank) * DECO.screenSetupPerColor.value;
  }
  if (deco.method === 'embroidery') return DECO.embroideryDigitizing.value;
  return 0;
}

// ── Relabelling ──────────────────────────────────────────────────────────────
export type RelabelMode = 'none' | 'printedNeck' | 'printedNeckAndWoven';

export const RELABEL = {
  printedNeckPerUnit: 0.5,
  printedNeckSetup: 25,
  printedNeckMOQ: 36,
  wovenLabelUnitPrice: 0.3,
  wovenLabelMOQ: 200,
  wovenSewLaborPerUnit: 0.55,
  source: 'DD-2-relabel',
  confidence: 'soft' as Confidence,
};

/**
 * SR-T15 verified relabel ladder — `hard`, but NOT applied in the model's
 * primary case (`appliedToPrimary: false`). The VC pass notes T2's margin fails
 * at 59.1% once this lands, so it is exposed as a toggle rather than buried.
 */
export const RELABEL_VERIFIED_LADDER: Record<number, number> = {
  36: 2.61,
  48: 1.83,
  72: 1.25,
  100: 1.11,
};

export function verifiedPrintedNeckPerUnit(run: number): number {
  const tiers = Object.keys(RELABEL_VERIFIED_LADDER)
    .map(Number)
    .sort((a, b) => a - b);
  let price = RELABEL_VERIFIED_LADDER[tiers[0]];
  for (const t of tiers) if (run >= t) price = RELABEL_VERIFIED_LADDER[t];
  return price;
}

export function relabelVariable(mode: RelabelMode, run: RunSize, useVerified = false): number {
  const neck = useVerified ? verifiedPrintedNeckPerUnit(run) : RELABEL.printedNeckPerUnit;
  if (mode === 'none') return 0;
  if (mode === 'printedNeck') return neck;
  return neck + RELABEL.wovenSewLaborPerUnit;
}

export function relabelFixed(mode: RelabelMode, run: RunSize): number {
  if (mode === 'none') return 0;
  if (mode === 'printedNeck') return RELABEL.printedNeckSetup;
  // Woven label carries its own 200-piece minimum regardless of run size.
  return (
    RELABEL.printedNeckSetup +
    Math.max(run, RELABEL.wovenLabelMOQ) * RELABEL.wovenLabelUnitPrice
  );
}

// ── Overhead ─────────────────────────────────────────────────────────────────
export const OVERHEAD = {
  packagingPerUnit: 0.75,
  defectAllowanceRate: 0.02,
  outboundShipUS: 4.5,
  inboundFreightPerUnit: { 25: 0.6, 50: 0.6, 75: 0.6, 100: 0.45, 150: 0.45, 300: 0.3 } as Record<
    RunSize,
    number
  >,
};

// ── Stage 0 landed COGS ──────────────────────────────────────────────────────
export interface Stage0Input {
  blank: Blank;
  decoration: Decoration;
  run: RunSize;
  relabel: RelabelMode;
  includeOutboundShip?: boolean;
  useVerifiedRelabel?: boolean;
}

export interface CogsBreakdown {
  blankUnit: number;
  decoVar: number;
  relabelVar: number;
  defect: number;
  packaging: number;
  inboundFreight: number;
  amortizedFixed: number;
  outboundShip: number;
  /** Duty is ZERO for every Stage 0 SKU — blanks are bought already landed in the US. */
  duty: number;
  landedCOGS: number;
}

export function stage0Cogs(input: Stage0Input): CogsBreakdown {
  const { blank, decoration, run, relabel } = input;
  const bUnit = blankUnit(blank, run);
  const dVar = decorationVariable(decoration, blank, run);
  const rVar = relabelVariable(relabel, run, input.useVerifiedRelabel);
  const defect = (bUnit + dVar) * OVERHEAD.defectAllowanceRate;
  const fixed = decorationFixed(decoration, blank) + relabelFixed(relabel, run);
  const amortizedFixed = fixed / run;
  const outboundShip = input.includeOutboundShip ? OVERHEAD.outboundShipUS : 0;

  const landedCOGS =
    bUnit +
    dVar +
    rVar +
    defect +
    OVERHEAD.packagingPerUnit +
    OVERHEAD.inboundFreightPerUnit[run] +
    amortizedFixed +
    outboundShip;

  return {
    blankUnit: bUnit,
    decoVar: dVar,
    relabelVar: rVar,
    defect,
    packaging: OVERHEAD.packagingPerUnit,
    inboundFreight: OVERHEAD.inboundFreightPerUnit[run],
    amortizedFixed,
    outboundShip,
    duty: 0,
    landedCOGS,
  };
}

// ── Margin helpers ───────────────────────────────────────────────────────────
export const MARGIN_FLOOR = 0.6;

export const grossMargin = (retail: number, cogs: number) => (retail - cogs) / retail;
export const minRetailForFloor = (cogs: number, floor = MARGIN_FLOOR) => cogs / (1 - floor);
export const keystoneMultiple = (retail: number, cogs: number) => retail / cogs;

// ── Stage 2 hero ─────────────────────────────────────────────────────────────
// The model carries exactly three costed origins. Türkiye, India and Pakistan
// appear in the sourcing analysis but were never given CMT multipliers, so they
// are deliberately absent here rather than invented — an unsourced multiplier
// would silently produce a confident wrong break-even.
export type HeroOrigin = 'portugal' | 'usa_la' | 'china';

/**
 * Duty, resolved by the fact-check (HIGH confidence, from HTS Chapter 99
 * heading text). Section 301 is ADDITIVE to MFN — headings read verbatim "The
 * duty provided in the applicable subheading + 12.5%".
 *
 * The EU is split across two headings, and that split is what saves this
 * garment: 9903.05.38 (EU goods already dutied >=10%) takes no add-on;
 * 9903.05.39 (EU goods under 10%) tops up TO 10%. The chore coat's 8.1% MFN
 * therefore lands at exactly 10.0%.
 *
 * Türkiye gets NO ceiling and takes the full +12.5%. Any plan treating Portugal
 * and Türkiye as duty-equivalent is wrong by 12.5 points.
 */
export const HERO_DUTY: Record<HeroOrigin, { rate: number; note: string; confidence: Confidence }> =
  {
    portugal: {
      rate: 0.1,
      note: 'MFN 8.1% (6211.32.90) topped up to 10% by HTS 9903.05.39 (EU goods under 10%)',
      confidence: 'hard',
    },
    usa_la: { rate: 0, note: 'Domestic — no duty. Also the only origin that can escape the 300 m mill minimum, via deadstock by the yard.', confidence: 'hard' },
    china: { rate: 0.294, note: 'MFN 8.1% + 12.5% (9903.05.31) + legacy 301', confidence: 'derived' },
  };

// From the model's `heroOrigins`. Previously hand-guessed here, which produced a
// wrong Türkiye/Portugal comparison — the CMT saving can outweigh a duty penalty,
// so these cannot be intuited.
export const CMT_MULTIPLIER: Record<HeroOrigin, number> = {
  portugal: 1.0,
  usa_la: 1.55,
  china: 0.62,
};

export interface HeroSpec {
  id: string;
  name: string;
  fabricPerUnit: number;
  cmtPerUnit: number;
  trimsPerUnit: number;
  garmentDyePerUnit: number;
  freightPerUnit: number;
  packagingPerUnit: number;
  development: number;
  /** Mill minimum in metres for a stock colour. THE dominant cost driver below ~137 units. */
  millMinimumMetres: number;
  metresPerUnit: number;
  pricePerMetre: number;
  otherLayeredMinimums: number;
  targetRetail: number;
  moqFloor: number;
}

export const HEROES: Record<string, HeroSpec> = {
  choreCoat: {
    id: 'choreCoat',
    name: 'Chore coat',
    fabricPerUnit: 15.4,
    cmtPerUnit: 24.0,
    trimsPerUnit: 4.75,
    garmentDyePerUnit: 3.5,
    freightPerUnit: 2.2,
    packagingPerUnit: 1.25,
    development: 2000, // tech pack $800 + 3 sample rounds @ $350 + courier
    millMinimumMetres: 300,
    metresPerUnit: 2.2,
    pricePerMetre: 7.0,
    otherLayeredMinimums: 60,
    targetRetail: 225,
    moqFloor: 50,
  },
  trousers: {
    id: 'trousers',
    name: 'Wide-leg trousers',
    fabricPerUnit: 10.4,
    cmtPerUnit: 12.5,
    trimsPerUnit: 2.4,
    garmentDyePerUnit: 3.0,
    freightPerUnit: 1.6,
    packagingPerUnit: 1.0,
    development: 1500,
    millMinimumMetres: 300,
    metresPerUnit: 1.8,
    pricePerMetre: 5.78,
    otherLayeredMinimums: 100,
    targetRetail: 145,
    moqFloor: 50,
  },
};

export interface SharedClothOpts {
  /** LA-only: deadstock by the yard removes the mill minimum entirely. */
  deadstock?: boolean;
  /**
   * TR-T15: one cloth, one dye lot, one 300 m buy serving both heroes.
   * `pricePerMetre` is the SHARED cloth's price and overrides each hero's own —
   * there is only one cloth, so there is only one price. The model uses the
   * jacket's $7.00/m for both.
   */
  sharedClothWith?: { hero: HeroSpec; units: number; pricePerMetre?: number };
}

export interface HeroCogs {
  fobUnit: number;
  duty: number;
  freight: number;
  packaging: number;
  developmentAmortized: number;
  deadClothAmortized: number;
  otherLayeredAmortized: number;
  landedCOGS: number;
  deadClothMetres: number;
}

/**
 * `deadCloth` is priced at the base $/m and NOT scaled by runIndex — a 300 m
 * mill buy is a 300 m mill buy. It behaves exactly like screen-setup
 * amortisation and should render as its own visibly shrinking band.
 *
 * `sharedCloth` splits the mill minimum across two styles cut from one cloth,
 * which takes both heroes to a break-even of 72 — a bigger win than the entire
 * duty correction, and free.
 */
export function heroCogs(
  hero: HeroSpec,
  n: number,
  origin: HeroOrigin,
  opts: SharedClothOpts = {},
): HeroCogs {
  const idx = runIndexContinuous(n);
  const fobUnit =
    (hero.fabricPerUnit +
      hero.cmtPerUnit * CMT_MULTIPLIER[origin] +
      hero.trimsPerUnit +
      hero.garmentDyePerUnit) *
    idx;

  const duty = fobUnit * HERO_DUTY[origin].rate;

  // Deadstock sidesteps the mill minimum entirely, at the cost of colour choice.
  // (LA is the only origin that can do this — deadstock canvas by the yard.)
  //
  // `sharedClothWith` is the TR-T15 mitigation: one cloth and one dye lot serve
  // both heroes off a single 300 m buy, with dead cloth allocated PRO-RATA by
  // metres consumed. Note this is a JOINT solve — halving the minimum per garment
  // is not the same thing and gives an answer ~6 units too optimistic.
  let deadClothMetres: number;
  let deadClothTotal: number;
  if (opts.deadstock) {
    deadClothMetres = 0;
    deadClothTotal = 0;
  } else if (opts.sharedClothWith) {
    const { hero: other, units: otherN, pricePerMetre } = opts.sharedClothWith;
    const mine = hero.metresPerUnit * n;
    const theirs = other.metresPerUnit * otherN;
    const totalDead = Math.max(0, hero.millMinimumMetres - (mine + theirs));
    const share = mine + theirs > 0 ? mine / (mine + theirs) : 1;
    deadClothMetres = totalDead * share;
    deadClothTotal = deadClothMetres * (pricePerMetre ?? hero.pricePerMetre);
  } else {
    deadClothMetres = Math.max(0, hero.millMinimumMetres - hero.metresPerUnit * n);
    deadClothTotal = deadClothMetres * hero.pricePerMetre;
  }

  const developmentAmortized = hero.development / n;
  const deadClothAmortized = deadClothTotal / n;
  const otherLayeredAmortized = hero.otherLayeredMinimums / n;

  const landedCOGS =
    fobUnit +
    duty +
    hero.freightPerUnit +
    hero.packagingPerUnit +
    developmentAmortized +
    deadClothAmortized +
    otherLayeredAmortized;

  return {
    fobUnit,
    duty,
    freight: hero.freightPerUnit,
    packaging: hero.packagingPerUnit,
    developmentAmortized,
    deadClothAmortized,
    otherLayeredAmortized,
    landedCOGS,
    deadClothMetres,
  };
}

/** breakEvenPreorders = min { N >= moqFloor : landedCOGS(N) <= retail x (1 - marginFloor) } */
export function breakEvenPreorders(
  hero: HeroSpec,
  origin: HeroOrigin,
  retail = hero.targetRetail,
  floor = MARGIN_FLOOR,
  opts: SharedClothOpts = {},
): number | null {
  const target = retail * (1 - floor);
  for (let n = hero.moqFloor; n <= 1000; n++) {
    if (heroCogs(hero, n, origin, opts).landedCOGS <= target) return n;
  }
  return null;
}

/**
 * The line model — what it costs to buy a COLLECTION, not a garment.
 *
 * `stage0Cogs` amortises fixed costs across a single SKU's run, which is the
 * right answer for one SKU and the WRONG answer for a line. Summing per-SKU
 * COGS across four SKUs charges the $70 digitizing fee four times, the $25
 * back-neck setup four times, and the 200-piece woven-label minimum four times
 * — roughly $600 of cost that a real factory invoice would never contain.
 *
 * A partner looking at a line buy needs the number they would actually be
 * asked to pay, so this module re-derives fixed costs at LINE level:
 *
 *   - Digitizing is per ARTWORK. One mark embroidered on a tee and a hoodie is
 *     one $70 fee.
 *   - Back-neck setup is per ORDER. One design across the line is one $25.
 *   - The woven-label MOQ is a LINE minimum — 3 SKUs x 100 units buys 300
 *     labels, not 600.
 *   - Screen setup is NOT deduplicated. The treatments specify different print
 *     sizes per garment (9in tee vs 5in hoodie), which needs its own screen.
 *     Deduplicating here would understate the bill.
 *
 * Everything variable still comes from `stage0Cogs`, so the two models can't
 * drift on blank price, ink, defect allowance or freight.
 */

import {
  BLANKS,
  DECO,
  RELABEL,
  RUN_SIZES,
  decorationPasses,
  decorationFixed,
  grossMargin,
  minRetailForFloor,
  relabelFixed,
  stage0Cogs,
  type Blank,
  type Decoration,
  type RelabelMode,
  type RunSize,
} from './economics';

export type Garment = 'tee' | 'hoodie' | 'cap';

export const GARMENTS: { key: Garment; label: string; ratio: string }[] = [
  { key: 'tee', label: 'Tee', ratio: '4/5' },
  { key: 'hoodie', label: 'Hoodie', ratio: '4/5' },
  { key: 'cap', label: 'Cap', ratio: '1/1' },
];

export interface BudgetState {
  budget: number;
  label: string;
  slug: string;
  decoration: Decoration;
  relabel: RelabelMode;
  run: RunSize;
  retail: number;
  hero: boolean;
  brandCarrier: string;
  tierSlug: string;
  treatment: Record<Garment, string>;
}

export const STATES: BudgetState[] = [
  {
    budget: 3000,
    label: 'Graphic',
    slug: 'graphic',
    decoration: { method: 'dtf' },
    relabel: 'none',
    run: 50,
    retail: 35,
    hero: false,
    brandCarrier: 'The print. Nothing else is costed in yet.',
    tierSlug: 'S1-{g}-budget-graphic',
    treatment: { tee: '13in graphic', hoodie: '13in graphic', cap: '4in printed panel' },
  },
  {
    budget: 5000,
    label: 'Washed',
    slug: 'washed',
    decoration: { method: 'screen', colors: 1 },
    relabel: 'printedNeck',
    run: 50,
    retail: 55,
    hero: false,
    brandCarrier: 'Print, plus a printed back-neck where the factory tag was.',
    tierSlug: 'S2-{g}-single-screen',
    treatment: { tee: '1-colour screen, 9in', hoodie: '1-colour screen, 9in', cap: 'Stitched woven patch' },
  },
  {
    budget: 8000,
    label: 'Tonal',
    slug: 'tonal',
    decoration: { method: 'screen', colors: 2 },
    relabel: 'printedNeck',
    run: 50,
    retail: 55,
    hero: false,
    brandCarrier: 'Tonal ink — the mark starts hiding rather than shouting.',
    tierSlug: 'S3-{g}-tonal-screen',
    treatment: { tee: 'Tonal print, 4in', hoodie: 'Tonal print, 5in', cap: 'Flat embroidery, 2.5in' },
  },
  {
    budget: 12000,
    label: 'Stitched',
    slug: 'stitched',
    decoration: { method: 'embroidery', stitches: 6000 },
    relabel: 'printedNeck',
    run: 100,
    retail: 110,
    hero: false,
    brandCarrier: 'Thread. The $70 digitizing fee finally amortises.',
    tierSlug: 'S4-{g}-embroidered-mark',
    treatment: { tee: '2in embroidered mark', hoodie: '2in embroidered mark', cap: 'Tonal embroidery, 1.5in' },
  },
  {
    budget: 20000,
    label: 'Full line',
    slug: 'full',
    decoration: { method: 'embroidery', stitches: 8000 },
    relabel: 'printedNeckAndWoven',
    run: 100,
    retail: 110,
    hero: true,
    brandCarrier: 'Woven hem tag, tonal stitch, garment dye, numbered lots.',
    tierSlug: 'S5-{g}-full-system',
    treatment: { tee: 'Tonal stitch + woven tag', hoodie: 'Tonal stitch + woven tag', cap: 'Tonal stitch + seam label' },
  },
];

/** Blank tier tracks the budget; the specific blank tracks the garment. */
export const BLANK_BY_TIER: Record<Garment, string[]> = {
  tee: ['bc3001', 'shakaSHGD', 'as5082', 'as5082', 'as5082'],
  hoodie: ['laHF09', 'as5146', 'as5166', 'as5166', 'as5166'],
  cap: ['cap1130', 'cap1130', 'cap1130', 'cap1130', 'cap1130'],
};

export const tierIndex = (slug: string) => Math.max(0, STATES.findIndex((s) => s.slug === slug));
export const blankFor = (garment: Garment, tier: number): Blank =>
  BLANKS[BLANK_BY_TIER[garment][tier]];

// ── A SKU in the line ────────────────────────────────────────────────────────

export interface Sku {
  garment: Garment;
  /** Budget-stop slug — decides blank, decoration, relabel and the default retail. */
  tier: string;
  /** Graphic id from the library, or null if none was chosen. */
  graphic: string | null;
  /**
   * Which colourways this style is made in — palette ids, at least one.
   *
   * COLOUR HAD NO COST. A SKU knew its garment, its decoration, its run and its
   * price, and nothing anywhere knew its colour: you could pick six colourways
   * and the buy would not move by a cent, in a tool whose credibility rests on
   * costing everything honestly and whose most important axis is colour.
   *
   * A colourway is a separate blank. Two colours is two buys of half the depth
   * each, which is a worse price band per piece — that is the real trade the
   * interface has to be able to show, and it could not.
   */
  colours: string[];
  /** Units PER COLOURWAY. A style in two colours at 50 is a hundred pieces. */
  units: RunSize;
  /**
   * List price override. Retail is the single largest margin lever in the model
   * (35.9 points, ahead of run size and blank tier), so leaving it pinned to the
   * tier default made the most powerful control on the page invisible.
   * Undefined means "use the tier's own price".
   */
  retail?: number;
}

export interface SkuCost {
  sku: Sku;
  blank: Blank;
  state: BudgetState;
  /** Effective list price — the override if set, otherwise the tier default. */
  retail: number;
  /** Per-unit margin at the effective price. */
  margin: number;
  /** Per-unit cost EXCLUDING fixed setup — fixed is charged once at line level. */
  variablePerUnit: number;
  variableTotal: number;
  revenue: number;
}

export interface SharedFixed {
  digitizing: number;
  screens: number;
  neckSetup: number;
  wovenLabels: number;
  total: number;
}

export interface LineTotals {
  items: SkuCost[];
  totalUnits: number;
  variableTotal: number;
  sharedFixed: SharedFixed;
  /** What per-SKU amortisation would have charged for the same fixed costs. */
  naiveFixed: number;
  /** naiveFixed - sharedFixed.total. The saving from buying as a line. */
  fixedSaving: number;
  totalCost: number;
  totalRevenue: number;
  blendedMargin: number;
  cogsPerUnit: number;
  /** Line revenue needed to clear the 60% floor at the current cost. */
  minRevenueForFloor: number;
}

/**
 * Retail, derived from cost rather than from a ratio off the tee.
 *
 * It WAS a ratio, and the ratio produced a $210 hoodie on a stock AS Colour
 * blank with a 2in embroidered mark — a Fear-of-God price on a garment with no
 * cut-and-sew story behind it. A trade review called it a fantasy and it was.
 *
 * A keystone multiple is how the trade actually prices: take landed cost,
 * multiply, and that is the number you need. DTC wants roughly 4–5x, because
 * after fees, postage, returns and the stock you never sell, a 4x is a normal
 * business and a 3x is a hobby. Wholesale wants 5–6x, because a retailer takes
 * half and you still have to hold your margin on the half that is left.
 *
 * WHAT MAKES THIS BETTER IS THAT IT DIAGNOSES. Deriving from cost means an
 * expensive blank in a cheap tier stops being hidden behind a flattering
 * default: a 14oz fleece at 50 units lands at $52 and keystone asks for $235,
 * which nobody will pay for a graphic hoodie. The old ratio said $65 and showed
 * a red margin, which reads as a pricing problem. It is not — it is the wrong
 * blank for that tier, and the number should say so.
 *
 * CONFIDENCE: the multiple is trade convention and hard; the ceilings below are
 * a judgement about what this category bears and are soft.
 */
export const KEYSTONE = 4.5;

/**
 * Roughly what a stock-blank streetwear piece can ask, before the story has to
 * carry it. Above this the price is not wrong so much as unbelievable.
 */
const CATEGORY_CEILING: Record<Garment, number> = { tee: 85, hoodie: 180, cap: 65 };

/** The keystone price for a landed cost, at a real price point. */
export function keystoneRetail(landedCOGS: number, multiple = KEYSTONE): number {
  return Math.max(5, Math.round((landedCOGS * multiple) / 5) * 5);
}

/** True when the price this cost demands is more than the category bears. */
export function overCategory(garment: Garment, retail: number): boolean {
  return retail > CATEGORY_CEILING[garment];
}

/** Identity of an embroidery artwork — same mark on two garments digitizes once. */
const artworkKey = (s: Sku) => s.graphic ?? 'house-mark';

/**
 * The run size the BLANKS are bought at, which is not the run size of one SKU
 * once a catalogue is involved.
 *
 * Setup does not amortise across designs — that is the fork's whole argument —
 * but blanks absolutely do. Twenty-four places at 25 units each is an order for
 * 600 identical BC3001s, and it was being priced in the 25-piece band: RUN_INDEX
 * 1.15 against 0.90, about 28% over on the blank, plus double the freight. The
 * sheet was arguing against the catalogue partly on a number wrong in its own
 * favour, which is the mirror image of the bug this module exists to fix.
 */
function purchaseBand(units: RunSize, designs: number, colours = 1): RunSize {
  // Colourways DO count toward the band, which is a correction.
  //
  // The first version excluded them so the cost of a second colourway stayed
  // visible. But a distributor takes one purchase order across colours and
  // prices it on the total pieces, so excluding them overstated the very trade
  // the feature exists to show — about 5% over on the blank for a two-colour
  // style. Wrong in the safe direction is still wrong.
  //
  // A colourway still costs: the run is split, so each colour is shallower, and
  // the MOQ and the dye-lot risk are per colour. That cost is real without
  // needing an invented price band on top of it.
  const total = units * Math.max(1, designs) * Math.max(1, colours);
  // Largest band the real order clears.
  return [...RUN_SIZES].reverse().find((r) => total >= r) ?? units;
}

export function costSku(sku: Sku, designs = 1): SkuCost {
  const t = tierIndex(sku.tier);
  const state = STATES[t];
  const blank = blankFor(sku.garment, t);
  const full = stage0Cogs({
    blank,
    decoration: state.decoration,
    run: purchaseBand(sku.units, designs, sku.colours.length),
    relabel: state.relabel,
    // A real order is a size run, and part of it is 2XL. Off by default in
    // economics.ts so the T1 worked example still reconciles.
    includeSizeUpcharge: true,
  });
  // Strip the per-SKU amortised fixed cost; it's re-added once, at line level.
  const variablePerUnit = full.landedCOGS - full.amortizedFixed;
  /**
   * The default price comes off a REFERENCE cost at the tier's own run size,
   * not off this order's cost.
   *
   * Deriving from the actual landed cost made the price fall when you ordered
   * more blanks, because a deeper band is cheaper — and nobody drops their
   * retail because they got a better price on cotton. They keep the price and
   * take the margin. Price is a property of the style; volume is a property of
   * the order.
   */
  const reference = stage0Cogs({
    blank,
    decoration: state.decoration,
    run: state.run,
    relabel: state.relabel,
    includeSizeUpcharge: true,
  }).landedCOGS;
  const retail = sku.retail && sku.retail > 0 ? sku.retail : keystoneRetail(reference);
  return {
    sku,
    blank,
    state,
    retail,
    // Uses the SKU's full landed COGS, not the variable-only figure, so a
    // per-SKU margin can't read better than the line it belongs to.
    margin: retail > 0 ? grossMargin(retail, full.landedCOGS) : 0,
    variablePerUnit,
    variableTotal: variablePerUnit * sku.units,
    revenue: retail * sku.units,
  };
}

/**
 * Cost a line.
 *
 * `designs` is how many DISTINCT ARTWORKS the line carries, and it is the whole
 * difference between the two businesses this tool now models.
 *
 * At `designs: 1` — the considered line — every SKU carries the same mark, so
 * setup is paid once and spread across the whole buy. That is the argument the
 * cost sheet has always made: buying as a collection is cheaper than the sum of
 * its styles.
 *
 * At `designs: 40` — a shirt per rest stop, per exit, per town — that argument
 * inverts, and it inverts hard. A screen is cut per colour PER DESIGN, so forty
 * designs is forty setups and there is nothing to amortise; the collection
 * discount goes to zero and the fixed cost grows linearly with the catalogue.
 * The only method that survives is the one with no setup at all, which is why
 * heat-press print is not the cheap compromise in a micro-targeted line — it is
 * the only thing that makes one possible.
 *
 * The per-SKU figures stay PER DESIGN (a row is "the tee, in each place"), and
 * the aggregates carry the multiplier. That keeps the sheet readable at 40
 * designs without printing forty rows.
 */
export function lineTotals(skus: Sku[], designs = 1): LineTotals {
  const n = Math.max(1, Math.floor(designs));
  const items = skus.map((sk) => costSku(sk, n));

  const digitizedArtworks = new Set<string>();
  let screens = 0;
  let anyRelabel = false;
  let wovenUnits = 0;
  let naiveFixed = 0;

  for (const it of items) {
    const { state, blank, sku } = it;
    naiveFixed +=
      (decorationFixed(state.decoration, blank) + relabelFixed(state.relabel, sku.units)) * n;

    if (state.decoration.method === 'embroidery') digitizedArtworks.add(artworkKey(sku));
    if (state.decoration.method === 'screen' || state.decoration.method === 'discharge') {
      // Not deduplicated: per-garment print sizes need their own screens, and
      // every design needs its own again.
      screens += decorationPasses(state.decoration, blank) * DECO.screenSetupPerColor.value * n;
    }
    if (state.relabel !== 'none') anyRelabel = true;
    if (state.relabel === 'printedNeckAndWoven')
      wovenUnits += sku.units * Math.max(1, sku.colours.length) * n;
  }

  const sharedFixed: SharedFixed = {
    // Digitizing is per artwork, so it multiplies by the catalogue too.
    digitizing: digitizedArtworks.size * n * DECO.embroideryDigitizing.value,
    screens,
    // The neck label is the house brand, not the place graphic — one screen
    // however many designs hang off it.
    neckSetup: anyRelabel ? RELABEL.printedNeckSetup : 0,
    // The 200-piece minimum is a LINE minimum, not a per-SKU one.
    wovenLabels:
      wovenUnits > 0 ? Math.max(wovenUnits, RELABEL.wovenLabelMOQ) * RELABEL.wovenLabelUnitPrice : 0,
    total: 0,
  };
  sharedFixed.total =
    sharedFixed.digitizing + sharedFixed.screens + sharedFixed.neckSetup + sharedFixed.wovenLabels;

  // A row's figures are PER COLOURWAY, so the colour count multiplies alongside
  // the catalogue count. Decoration setup does not: the same artwork on a bone
  // tee and a charcoal tee is one screen.
  const colours = (it: SkuCost) => Math.max(1, it.sku.colours.length);
  const totalUnits = items.reduce((acc, it) => acc + it.sku.units * colours(it), 0) * n;
  const variableTotal = items.reduce((acc, it) => acc + it.variableTotal * colours(it), 0) * n;
  const totalCost = variableTotal + sharedFixed.total;
  const totalRevenue = items.reduce((acc, it) => acc + it.revenue * colours(it), 0) * n;

  return {
    items,
    totalUnits,
    variableTotal,
    sharedFixed,
    naiveFixed,
    fixedSaving: naiveFixed - sharedFixed.total,
    totalCost,
    totalRevenue,
    blendedMargin: totalRevenue > 0 ? grossMargin(totalRevenue, totalCost) : 0,
    cogsPerUnit: totalUnits > 0 ? totalCost / totalUnits : 0,
    minRevenueForFloor: minRetailForFloor(totalCost),
  };
}

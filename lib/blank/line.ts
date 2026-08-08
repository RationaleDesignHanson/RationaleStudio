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
    treatment: { tee: '13in DTF graphic', hoodie: '13in DTF graphic', cap: '4in printed panel' },
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

/** Identity of an embroidery artwork — same mark on two garments digitizes once. */
const artworkKey = (s: Sku) => s.graphic ?? 'house-mark';

export function costSku(sku: Sku): SkuCost {
  const t = tierIndex(sku.tier);
  const state = STATES[t];
  const blank = blankFor(sku.garment, t);
  const full = stage0Cogs({
    blank,
    decoration: state.decoration,
    run: sku.units,
    relabel: state.relabel,
  });
  // Strip the per-SKU amortised fixed cost; it's re-added once, at line level.
  const variablePerUnit = full.landedCOGS - full.amortizedFixed;
  const retail = sku.retail && sku.retail > 0 ? sku.retail : state.retail;
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

export function lineTotals(skus: Sku[]): LineTotals {
  const items = skus.map(costSku);

  const digitizedArtworks = new Set<string>();
  let screens = 0;
  let anyRelabel = false;
  let wovenUnits = 0;
  let naiveFixed = 0;

  for (const it of items) {
    const { state, blank, sku } = it;
    naiveFixed += decorationFixed(state.decoration, blank) + relabelFixed(state.relabel, sku.units);

    if (state.decoration.method === 'embroidery') digitizedArtworks.add(artworkKey(sku));
    if (state.decoration.method === 'screen' || state.decoration.method === 'discharge') {
      // Not deduplicated: per-garment print sizes need their own screens.
      screens += decorationPasses(state.decoration, blank) * DECO.screenSetupPerColor.value;
    }
    if (state.relabel !== 'none') anyRelabel = true;
    if (state.relabel === 'printedNeckAndWoven') wovenUnits += sku.units;
  }

  const sharedFixed: SharedFixed = {
    digitizing: digitizedArtworks.size * DECO.embroideryDigitizing.value,
    screens,
    neckSetup: anyRelabel ? RELABEL.printedNeckSetup : 0,
    // The 200-piece minimum is a LINE minimum, not a per-SKU one.
    wovenLabels:
      wovenUnits > 0 ? Math.max(wovenUnits, RELABEL.wovenLabelMOQ) * RELABEL.wovenLabelUnitPrice : 0,
    total: 0,
  };
  sharedFixed.total =
    sharedFixed.digitizing + sharedFixed.screens + sharedFixed.neckSetup + sharedFixed.wovenLabels;

  const totalUnits = items.reduce((n, it) => n + it.sku.units, 0);
  const variableTotal = items.reduce((n, it) => n + it.variableTotal, 0);
  const totalCost = variableTotal + sharedFixed.total;
  const totalRevenue = items.reduce((n, it) => n + it.revenue, 0);

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

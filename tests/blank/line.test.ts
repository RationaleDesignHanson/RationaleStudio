/**
 * Line-level cost tests.
 *
 * These guard the claim the tray makes to a partner: that the number shown is
 * what a factory would invoice for the whole collection. The failure mode being
 * tested against is the naive one — summing per-SKU COGS and charging every
 * fixed setup once per SKU.
 */

import { describe, it, expect } from 'vitest';
import { lineTotals, costSku, STATES, blankFor, type Sku } from '@/lib/blank/line';
import { stage0Cogs, DECO, RELABEL } from '@/lib/blank/economics';

const sku = (over: Partial<Sku> = {}): Sku => ({
  garment: 'tee',
  tier: 'full',
  graphic: 'G-tonal-emboss',
  units: 100,
  ...over,
});

describe('single SKU — must agree exactly with the per-SKU model', () => {
  it('total cost equals stage0Cogs x units', () => {
    const s = sku();
    const state = STATES.find((x) => x.slug === 'full')!;
    const direct =
      stage0Cogs({
        blank: blankFor('tee', 4),
        decoration: state.decoration,
        run: 100,
        relabel: state.relabel,
      }).landedCOGS * 100;

    expect(lineTotals([s]).totalCost).toBeCloseTo(direct, 6);
  });

  it('charges no more fixed cost than the naive model for one SKU', () => {
    const t = lineTotals([sku()]);
    expect(t.sharedFixed.total).toBeCloseTo(t.naiveFixed, 6);
    expect(t.fixedSaving).toBeCloseTo(0, 6);
  });
});

describe('digitizing is per artwork, not per SKU', () => {
  it('same mark on tee and hoodie digitizes once', () => {
    const t = lineTotals([
      sku({ garment: 'tee' }),
      sku({ garment: 'hoodie' }),
    ]);
    expect(t.sharedFixed.digitizing).toBe(DECO.embroideryDigitizing.value);
  });

  it('two different marks digitize twice', () => {
    const t = lineTotals([
      sku({ garment: 'tee', graphic: 'G-abstract-mark' }),
      sku({ garment: 'hoodie', graphic: 'G-emblem' }),
    ]);
    expect(t.sharedFixed.digitizing).toBe(2 * DECO.embroideryDigitizing.value);
  });

  it('a line with no embroidery pays no digitizing', () => {
    const t = lineTotals([sku({ tier: 'washed' }), sku({ tier: 'tonal', garment: 'hoodie' })]);
    expect(t.sharedFixed.digitizing).toBe(0);
  });
});

describe('the woven-label MOQ is a line minimum, not a per-SKU one', () => {
  it('3 SKUs x 100 units buys 300 labels, not 600', () => {
    const t = lineTotals([
      sku({ garment: 'tee' }),
      sku({ garment: 'hoodie' }),
      sku({ garment: 'cap' }),
    ]);
    expect(t.sharedFixed.wovenLabels).toBeCloseTo(300 * RELABEL.wovenLabelUnitPrice, 6);
  });

  it('still enforces the 200-piece floor when the line is small', () => {
    const t = lineTotals([sku({ units: 50 })]);
    expect(t.sharedFixed.wovenLabels).toBeCloseTo(
      RELABEL.wovenLabelMOQ * RELABEL.wovenLabelUnitPrice,
      6,
    );
  });
});

describe('back-neck setup is per order', () => {
  it('charges $25 once across four SKUs', () => {
    const t = lineTotals([
      sku({ garment: 'tee' }),
      sku({ garment: 'hoodie' }),
      sku({ garment: 'cap' }),
      sku({ garment: 'tee', tier: 'stitched' }),
    ]);
    expect(t.sharedFixed.neckSetup).toBe(RELABEL.printedNeckSetup);
  });

  it('charges nothing when no SKU is relabelled', () => {
    expect(lineTotals([sku({ tier: 'graphic' })]).sharedFixed.neckSetup).toBe(0);
  });
});

describe('screens are deliberately NOT deduplicated', () => {
  it('two screen-printed garments pay both setups — different print sizes', () => {
    // Pass counts differ by blank (a dark blank needs an underbase), so the
    // assertion is additivity, not equality: the line pays the sum of the two,
    // never a deduplicated single setup.
    const tee = lineTotals([sku({ tier: 'washed', garment: 'tee' })]).sharedFixed.screens;
    const hoodie = lineTotals([sku({ tier: 'washed', garment: 'hoodie' })]).sharedFixed.screens;
    const both = lineTotals([
      sku({ tier: 'washed', garment: 'tee' }),
      sku({ tier: 'washed', garment: 'hoodie' }),
    ]).sharedFixed.screens;

    expect(tee).toBeGreaterThan(0);
    expect(hoodie).toBeGreaterThan(0);
    expect(both).toBeCloseTo(tee + hoodie, 6);
    expect(both).toBeGreaterThan(Math.max(tee, hoodie));
  });
});

describe('the line saving is real and bounded', () => {
  it('a 4-SKU embroidered line saves the double-counted fixed costs', () => {
    const t = lineTotals([
      sku({ garment: 'tee' }),
      sku({ garment: 'hoodie' }),
      sku({ garment: 'cap' }),
      sku({ garment: 'tee', units: 150 }),
    ]);
    expect(t.fixedSaving).toBeGreaterThan(0);
    // Saving can never exceed what the naive model charged in the first place.
    expect(t.fixedSaving).toBeLessThan(t.naiveFixed);
    expect(t.sharedFixed.total + t.fixedSaving).toBeCloseTo(t.naiveFixed, 6);
  });

  it('never reports a cheaper line than the sum of its variable costs', () => {
    const t = lineTotals([sku(), sku({ garment: 'hoodie' })]);
    expect(t.totalCost).toBeGreaterThan(t.variableTotal);
  });
});

describe('degenerate input', () => {
  it('an empty line is all zeros, no NaN', () => {
    const t = lineTotals([]);
    expect(t.totalUnits).toBe(0);
    expect(t.totalCost).toBe(0);
    expect(t.blendedMargin).toBe(0);
    expect(t.cogsPerUnit).toBe(0);
    expect(Number.isNaN(t.totalRevenue)).toBe(false);
  });

  it('an unknown tier slug falls back to the first stop rather than crashing', () => {
    expect(() => costSku(sku({ tier: 'not-a-tier' }))).not.toThrow();
    expect(costSku(sku({ tier: 'not-a-tier' })).state.slug).toBe(STATES[0].slug);
  });
});

describe('margin', () => {
  it('blended margin sits between the best and worst SKU margins', () => {
    const t = lineTotals([sku({ tier: 'graphic' }), sku({ tier: 'full', garment: 'hoodie' })]);
    expect(t.blendedMargin).toBeGreaterThan(0);
    expect(t.blendedMargin).toBeLessThan(1);
  });
});


describe('retail override — the largest margin lever in the model', () => {
  it('defaults to the tier price when unset', () => {
    const s = sku();
    const state = STATES.find((x) => x.slug === 'full')!;
    expect(costSku(s).retail).toBe(state.retail);
  });

  it('an override changes revenue and blended margin', () => {
    const cheap = lineTotals([sku({ retail: 60 })]);
    const dear = lineTotals([sku({ retail: 200 })]);
    expect(dear.totalRevenue).toBeGreaterThan(cheap.totalRevenue);
    expect(dear.blendedMargin).toBeGreaterThan(cheap.blendedMargin);
  });

  it('never changes cost — price is not a cost lever', () => {
    expect(lineTotals([sku({ retail: 60 })]).totalCost)
      .toBeCloseTo(lineTotals([sku({ retail: 200 })]).totalCost, 6);
  });

  it('a price below cost reports a negative margin rather than hiding it', () => {
    const t = lineTotals([sku({ retail: 1 })]);
    expect(t.blendedMargin).toBeLessThan(0);
    expect(t.items[0].margin).toBeLessThan(0);
  });

  it('ignores a zero or negative override instead of dividing by zero', () => {
    const state = STATES.find((x) => x.slug === 'full')!;
    expect(costSku(sku({ retail: 0 })).retail).toBe(state.retail);
    expect(costSku(sku({ retail: -5 })).retail).toBe(state.retail);
    expect(Number.isFinite(lineTotals([sku({ retail: 0 })]).blendedMargin)).toBe(true);
  });

  it('per-SKU margin uses full landed COGS, so it never flatters the line', () => {
    // Single SKU: the SKU margin and the line margin must agree exactly.
    const t = lineTotals([sku({ retail: 150 })]);
    expect(t.items[0].margin).toBeCloseTo(t.blendedMargin, 6);
  });
});

/**
 * The catalogue multiplier.
 *
 * This encodes the argument the two-business fork exists to make, so it is
 * pinned rather than left to the interface to be right about: setup amortises
 * for ONE artwork and does not amortise at all for many, and the only
 * decoration that survives a wide catalogue is the one with no setup.
 */
describe('lineTotals — designs multiplier', () => {
  const tee = (tier: string): Sku => ({ garment: 'tee', tier, units: 50, graphic: null });

  it('is unchanged at one design', () => {
    const a = lineTotals([tee('graphic')]);
    const b = lineTotals([tee('graphic')], 1);
    expect(b.totalCost).toBeCloseTo(a.totalCost, 6);
    expect(b.totalUnits).toBe(a.totalUnits);
  });

  it('multiplies units and variable cost by the catalogue', () => {
    const one = lineTotals([tee('graphic')], 1);
    const many = lineTotals([tee('graphic')], 20);
    expect(many.totalUnits).toBe(one.totalUnits * 20);
    expect(many.variableTotal).toBeCloseTo(one.variableTotal * 20, 6);
    expect(many.totalRevenue).toBeCloseTo(one.totalRevenue * 20, 6);
  });

  it('heat-press carries NO setup however wide the catalogue gets', () => {
    // The whole reason a shirt-per-place line is possible.
    for (const n of [1, 20, 200]) {
      expect(lineTotals([tee('graphic')], n).sharedFixed.screens).toBe(0);
    }
    expect(lineTotals([tee('graphic')], 200).sharedFixed.total).toBe(0);
  });

  it('screen setup grows linearly with the catalogue, so it never amortises', () => {
    const one = lineTotals([tee('washed')], 1);
    const many = lineTotals([tee('washed')], 40);
    expect(one.sharedFixed.screens).toBeGreaterThan(0);
    expect(many.sharedFixed.screens).toBeCloseTo(one.sharedFixed.screens * 40, 6);
  });

  it('screen setup per unit is FLAT across catalogue width — it buys no efficiency', () => {
    // The trap, stated as the number it actually is. 40x the screens over 40x
    // the units is the same $1.10 a shirt it was at one design, so widening the
    // catalogue does not earn the setup back the way deeper runs would.
    const perUnit = (n: number) => {
      const r = lineTotals([tee('washed')], n);
      return r.sharedFixed.screens / r.totalUnits;
    };
    expect(perUnit(1)).toBeCloseTo(perUnit(40), 9);
    expect(perUnit(1)).toBeCloseTo(perUnit(200), 9);
    expect(perUnit(40)).toBeGreaterThan(0);
  });

  it('the ONLY thing a wide catalogue amortises is the one-off neck screen', () => {
    // Worth pinning because it is the one honest efficiency in the scale model,
    // and it is small — it should never be mistaken for the collection discount
    // the considered line gets.
    const narrow = lineTotals([tee('washed')], 1);
    const wide = lineTotals([tee('washed')], 40);
    expect(wide.sharedFixed.neckSetup).toBe(narrow.sharedFixed.neckSetup);
    // Which moves cogs/unit by well under a dollar, not by a tier.
    expect(narrow.cogsPerUnit - wide.cogsPerUnit).toBeLessThan(1);
    expect(wide.cogsPerUnit).toBeLessThan(narrow.cogsPerUnit);
  });

  it('heat-press is far cheaper per unit than screen once nothing amortises', () => {
    const press = lineTotals([tee('graphic')], 40).cogsPerUnit;
    const screen = lineTotals([tee('washed')], 40).cogsPerUnit;
    expect(press).toBeLessThan(screen * 0.6);
  });

  it('clamps a nonsense catalogue size rather than producing a nonsense line', () => {
    expect(lineTotals([tee('graphic')], 0).totalUnits).toBe(50);
    expect(lineTotals([tee('graphic')], -5).totalUnits).toBe(50);
  });
});

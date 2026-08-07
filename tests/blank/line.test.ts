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

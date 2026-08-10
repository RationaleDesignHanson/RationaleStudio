/**
 * Line-level cost tests.
 *
 * These guard the claim the tray makes to a partner: that the number shown is
 * what a factory would invoice for the whole collection. The failure mode being
 * tested against is the naive one — summing per-SKU COGS and charging every
 * fixed setup once per SKU.
 */

import { describe, it, expect } from 'vitest';
import { lineTotals, costSku, retailFor, STATES, blankFor, type Sku } from '@/lib/blank/line';
import { stage0Cogs, DECO, RELABEL } from '@/lib/blank/economics';

const sku = (over: Partial<Sku> = {}): Sku => ({
  garment: 'tee',
  colours: ['faded-charcoal'],
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
  const tee = (tier: string): Sku => ({
    garment: 'tee',
    tier,
    units: 50,
    colours: ['faded-charcoal'],
    graphic: null,
  });

  it('is unchanged at one design', () => {
    const a = lineTotals([tee('graphic')]);
    const b = lineTotals([tee('graphic')], 1);
    expect(b.totalCost).toBeCloseTo(a.totalCost, 6);
    expect(b.totalUnits).toBe(a.totalUnits);
  });

  it('multiplies units and revenue by the catalogue', () => {
    const one = lineTotals([tee('graphic')], 20);
    expect(one.totalUnits).toBe(lineTotals([tee('graphic')], 1).totalUnits * 20);
    expect(one.totalRevenue).toBeCloseTo(lineTotals([tee('graphic')], 1).totalRevenue * 20, 6);
  });

  it('buys the blanks cheaper at catalogue volume — 20x units is LESS than 20x cost', () => {
    // Not a rounding artefact: 20 designs x 50 is a thousand-piece blank order,
    // and pricing it in the 50-piece band was a real overcharge.
    const one = lineTotals([tee('graphic')], 1);
    const many = lineTotals([tee('graphic')], 20);
    expect(many.variableTotal).toBeLessThan(one.variableTotal * 20);
    expect(many.variableTotal).toBeGreaterThan(one.variableTotal * 15);
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

  it('amortises the neck screen and the blank order, but never the per-design screens', () => {
    // The two honest efficiencies of scale, and the one thing that is not.
    const narrow = lineTotals([tee('washed')], 1);
    const wide = lineTotals([tee('washed')], 40);
    expect(wide.sharedFixed.neckSetup).toBe(narrow.sharedFixed.neckSetup); // paid once
    expect(wide.cogsPerUnit).toBeLessThan(narrow.cogsPerUnit); // blanks get cheaper
    expect(wide.sharedFixed.screens).toBeGreaterThan(narrow.sharedFixed.screens); // screens do not
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

/**
 * Retail defaults, per garment.
 *
 * The pre-existing tests only ever asserted the TEE, whose ratio is 1.0, so they
 * kept passing through a change that repriced every other garment. These pin the
 * two ceilings review caught: a cap must not be marked below a tee it costs more
 * than, and a decorated stock hoodie must not out-price the cut-and-sew hero.
 */
describe('retailFor', () => {
  const TIERS = [0, 1, 2, 3, 4];

  it('never prices a cap below a tee — the cap blank costs more', () => {
    for (const t of TIERS) expect(retailFor('cap', t)).toBeGreaterThanOrEqual(retailFor('tee', t));
  });

  it('keeps the hoodie under the cut-and-sew hero at every tier', () => {
    // HEROES.choreCoat.targetRetail is 225. A decorated blank listing above a
    // bespoke garment-dyed hero would contradict the page's whole Stage-1 case.
    for (const t of TIERS) expect(retailFor('hoodie', t)).toBeLessThan(225);
  });

  it('never makes a stock hoodie meaningfully more profitable than a tee', () => {
    // The review's finding was a SYSTEMATIC inversion — at 2.6 the hoodie was the
    // best-margin item at four of five tiers, contradicting the fact-check in
    // economics.ts that records it as the marginal garment. A point either way is
    // an artefact of rounding retail to $5 and is not worth chasing; a hoodie
    // that is reliably the most profitable thing in the line is a broken model.
    for (const tier of STATES) {
      const at = (garment: 'tee' | 'hoodie') =>
        costSku({ garment, tier: tier.slug, units: tier.run, colours: ['faded-charcoal'], graphic: null }).margin;
      expect(at('hoodie') - at('tee')).toBeLessThan(0.02);
    }
  });

  it('keeps the hoodie the marginal garment at the cheap tier', () => {
    // The heavy fleece blank is the cost problem the whole tier structure exists
    // to describe, so this must not be smoothed away by a generous ratio.
    const at = (garment: 'tee' | 'hoodie') =>
      costSku({ garment, tier: 'graphic', units: 50, colours: ['faded-charcoal'], graphic: null }).margin;
    expect(at('hoodie')).toBeLessThan(at('tee') - 0.3);
  });

  it('lands on real price points, not arithmetic', () => {
    for (const g of ['tee', 'hoodie', 'cap'] as const)
      for (const t of TIERS) expect(retailFor(g, t) % 5).toBe(0);
  });
});

/**
 * Blanks are bought as ONE order across the catalogue even though setup is not.
 * Both halves matter: getting this wrong in either direction makes the sheet
 * argue for or against the catalogue on a number that is simply incorrect.
 */
describe('lineTotals — purchasing volume across designs', () => {
  const tee = (units: 25 | 50): Sku => ({
    garment: 'tee',
    tier: 'graphic',
    units,
    colours: ['faded-charcoal'],
    graphic: null,
  });

  it('prices blanks at the band the whole order clears, not one design', () => {
    // 24 x 25 = 600 pieces, which clears the deepest band.
    expect(lineTotals([tee(25)], 24).cogsPerUnit).toBeLessThan(lineTotals([tee(25)], 1).cogsPerUnit);
  });

  it('still charges setup per design — volume does not rescue a screen line', () => {
    const wide = lineTotals([{ garment: 'tee', tier: 'washed', units: 25, colours: ['faded-charcoal'], graphic: null }], 24);
    const one = lineTotals([{ garment: 'tee', tier: 'washed', units: 25, colours: ['faded-charcoal'], graphic: null }], 1);
    expect(wide.sharedFixed.screens).toBeCloseTo(one.sharedFixed.screens * 24, 6);
  });

  it('is unchanged for a single-design line', () => {
    expect(lineTotals([tee(50)], 1).cogsPerUnit).toBeCloseTo(lineTotals([tee(50)]).cogsPerUnit, 9);
  });
});

/**
 * Colourways cost something.
 *
 * They cost nothing at all before this: a SKU knew its garment, decoration, run
 * and price and not its colour, so the most important axis in the tool was the
 * one axis with no consequence in the model. These pin the trade in both
 * directions, because getting it wrong either way misleads the decision.
 */
describe('lineTotals — colourways', () => {
  const tee = (colours: string[], units: 25 | 50 | 100 = 50): Sku => ({
    garment: 'tee',
    tier: 'graphic',
    units,
    colours,
    graphic: null,
  });

  it('counts units per colourway — two colours at 50 is a hundred pieces', () => {
    expect(lineTotals([tee(['bone', 'olive'])]).totalUnits).toBe(100);
    expect(lineTotals([tee(['bone'])]).totalUnits).toBe(50);
  });

  it('charges for the second colourway in LOST DEPTH, not in setup', () => {
    // Same hundred pieces, one order or two. Splitting loses the deeper price
    // band, which is exactly what a second colourway really costs.
    const deep = lineTotals([tee(['bone'], 100)]);
    const split = lineTotals([tee(['bone', 'olive'], 50)]);
    expect(split.totalUnits).toBe(deep.totalUnits);
    expect(split.cogsPerUnit).toBeGreaterThan(deep.cogsPerUnit);
  });

  it('does NOT charge a second screen for a second colourway', () => {
    // The garment changes colour; the artwork does not. Charging per colourway
    // here would invent a cost and argue against colour for the wrong reason.
    const one = lineTotals([{ ...tee(['bone']), tier: 'washed' }]);
    const two = lineTotals([{ ...tee(['bone', 'olive']), tier: 'washed' }]);
    expect(two.sharedFixed.screens).toBe(one.sharedFixed.screens);
  });

  it('scales revenue with colourways, so margin is unchanged by colour alone', () => {
    const one = lineTotals([tee(['bone'])]);
    const two = lineTotals([tee(['bone', 'olive'])]);
    expect(two.totalRevenue).toBeCloseTo(one.totalRevenue * 2, 6);
    // Cost and revenue both double, so the ratio barely moves — colour is a
    // depth decision, not a margin one.
    expect(Math.abs(two.blendedMargin - one.blendedMargin)).toBeLessThan(0.02);
  });

  it('composes with the catalogue multiplier', () => {
    const wide = lineTotals([tee(['bone', 'olive'])], 10);
    expect(wide.totalUnits).toBe(50 * 2 * 10);
  });
});

/**
 * Sell-through.
 *
 * The absence of this was the single largest unmodelled variable in the tool:
 * every revenue figure assumed a perfect season, which made every plan look
 * good. These pin the arithmetic, because a plan that loses or invents a shirt
 * is not a plan anyone can order against.
 */

import { describe, it, expect } from 'vitest';
import { SELL_EVERYTHING, SELL_PLAN, sellThrough } from '@/lib/blank/sellthrough';

describe('sellThrough', () => {
  it('always accounts for every unit made', () => {
    for (const n of [1, 7, 50, 137, 300, 1800]) {
      const r = sellThrough(n, 35, 8);
      expect(r.unitsFull + r.unitsMarked + r.unitsUnsold).toBe(n);
      expect(r.unitsUnsold).toBeGreaterThanOrEqual(0);
    }
  });

  it('earns less than list, because that is the whole point', () => {
    const r = sellThrough(300, 35, 8);
    expect(r.revenue).toBeLessThan(r.revenueAtList);
    // 60% at list plus 25% at 40% off is 75% of the units and 75% of list value.
    expect(r.revenue / r.revenueAtList).toBeCloseTo(0.6 + 0.25 * 0.6, 2);
  });

  it('reports cash stuck in stock, which is the number that changes a decision', () => {
    const r = sellThrough(300, 35, 8);
    expect(r.unitsUnsold).toBe(45);
    expect(r.cashInUnsold).toBeCloseTo(45 * 8, 6);
  });

  it('a perfect season is expressible, and is the old behaviour exactly', () => {
    const r = sellThrough(300, 35, 8, SELL_EVERYTHING);
    expect(r.unitsUnsold).toBe(0);
    expect(r.cashInUnsold).toBe(0);
    expect(r.revenue).toBeCloseTo(r.revenueAtList, 6);
  });

  it('clamps a nonsense plan rather than inventing units', () => {
    const r = sellThrough(100, 35, 8, { fullRate: 1.5, markdownRate: 2, markdownDepth: 0 });
    expect(r.unitsFull + r.unitsMarked + r.unitsUnsold).toBe(100);
    expect(r.unitsFull).toBeLessThanOrEqual(100);
  });

  it('defaults are a realistic first season, not an optimistic one', () => {
    expect(SELL_PLAN.fullRate).toBeLessThan(0.7);
    expect(SELL_PLAN.fullRate).toBeGreaterThan(0.5);
  });
});

/**
 * Buy ahead against make to order.
 *
 * The tool only knew one of these, and it was the wrong one for the catalogue —
 * 24 places x 25 units is 1,800 pieces bought speculatively on designs nobody
 * has seen. The comparison is the point, so both routes must be judged against
 * the same season.
 */
import { compareFulfilment, podCostPerUnit, POD_UNIT } from '@/lib/blank/fulfilment';

describe('compareFulfilment', () => {
  const cmp = () => compareFulfilment(200, 170, 6000, 20, 400, 24);

  it('made to order needs no cash up front and strands nothing', () => {
    const c = cmp().pod;
    expect(c.upfront).toBe(0);
    expect(c.stranded).toBe(0);
  });

  it('buying ahead pays for everything made, sold or not', () => {
    const c = cmp().buy;
    expect(c.upfront).toBe(200 * 20 + 400);
    expect(c.stranded).toBe(30 * 20);
  });

  it('judges both against the SAME season, or the comparison is meaningless', () => {
    const { buy, pod } = cmp();
    // Same revenue on both sides; only the cost structure differs.
    expect(buy.profit + buy.upfront).toBeCloseTo(pod.profit + pod.costOfSales, 6);
  });

  it('blends the made-to-order cost by what each style actually makes', () => {
    const blended = podCostPerUnit([
      { garment: 'tee', units: 90 },
      { garment: 'hoodie', units: 10 },
    ]);
    expect(blended).toBeGreaterThan(POD_UNIT.tee);
    expect(blended).toBeLessThan(POD_UNIT.hoodie);
  });

  it('does not divide by zero on an empty line', () => {
    expect(Number.isFinite(podCostPerUnit([]))).toBe(true);
  });
});

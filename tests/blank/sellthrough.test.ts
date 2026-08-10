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

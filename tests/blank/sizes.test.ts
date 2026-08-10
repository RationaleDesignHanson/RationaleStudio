/**
 * The size run.
 *
 * "50 tees" is not an order; "5 S, 12 M, 16 L, 12 XL, 5 XXL" is. These pin the
 * two things that would quietly corrupt a purchase order: pieces that do not sum
 * to the run, and a cap given a size curve it does not have.
 */

import { describe, it, expect } from 'vitest';
import { SIZE_CURVE, curveFor, sizeBreakdown, xxlShare } from '@/lib/blank/sizes';

describe('the curve', () => {
  it('sums to exactly one', () => {
    expect(SIZE_CURVE.reduce((n, c) => n + c.share, 0)).toBeCloseTo(1, 9);
  });

  it('is weighted to the middle, thin at the ends', () => {
    const share = (s: string) => SIZE_CURVE.find((c) => c.size === s)!.share;
    expect(share('L')).toBeGreaterThan(share('M'));
    expect(share('M')).toBeGreaterThan(share('S'));
    expect(share('S')).toBe(share('XXL'));
  });

  it('gives a snapback one size, not a curve', () => {
    expect(curveFor('cap')).toHaveLength(1);
    expect(curveFor('cap')[0].size).toBe('OS');
    expect(xxlShare('cap')).toBe(0);
  });
});

describe('sizeBreakdown', () => {
  it('always sums to the run, including when the curve does not divide evenly', () => {
    for (const n of [1, 7, 25, 37, 50, 100, 101, 300]) {
      expect(sizeBreakdown(n, 'tee').reduce((a, b) => a + b.qty, 0)).toBe(n);
    }
  });

  it('gives the remainder to the largest bucket — an extra L sells', () => {
    // 37 does not divide by the curve; L must absorb the difference.
    const rows = sizeBreakdown(37, 'tee');
    const l = rows.find((r) => r.size === 'L')!.qty;
    expect(l).toBeGreaterThan(Math.floor(37 * 0.3) - 1);
    expect(rows.reduce((a, b) => a + b.qty, 0)).toBe(37);
  });

  it('puts every cap in one line', () => {
    expect(sizeBreakdown(50, 'cap')).toEqual([{ size: 'OS', qty: 50 }]);
  });

  it('never emits a negative or fractional quantity', () => {
    for (const n of [0, 3, 49]) {
      for (const row of sizeBreakdown(n, 'tee')) {
        expect(Number.isInteger(row.qty)).toBe(true);
        expect(row.qty).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

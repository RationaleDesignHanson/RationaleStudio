/**
 * Selling economics.
 *
 * The cost model stopped at the factory door, which is a fine model of
 * manufacturing and a useless model of a business — most useless for the
 * catalogue, whose entire viability is what it costs to reach one person.
 * These pin the number that decides it.
 */

import { describe, it, expect } from 'vitest';
import { CHANNELS, campaign, channelById, sellUnit } from '@/lib/blank/channel';

const social = channelById('social');
const wholesale = channelById('wholesale');
const market = channelById('marketplace');

describe('sellUnit', () => {
  it('break-even CAC is what is left before any ad spend', () => {
    const r = sellUnit(35, 8, social, { cacPerOrder: 0 });
    expect(r.breakEvenCac).toBeCloseTo(r.contributionBeforeCac, 6);
    // $35 less $8 to make, less fees, post and returns — real money, not $27.
    expect(r.breakEvenCac).toBeGreaterThan(0);
    expect(r.breakEvenCac).toBeLessThan(27);
  });

  it('goes underwater when acquisition costs more than the headroom', () => {
    const cheap = sellUnit(35, 8, social, { cacPerOrder: 5 });
    const dear = sellUnit(35, 8, social, { cacPerOrder: 30 });
    expect(cheap.underwater).toBe(false);
    expect(dear.underwater).toBe(true);
    expect(dear.contribution).toBeLessThan(0);
  });

  it('charges no ads and no postage on wholesale, and takes half the price', () => {
    const r = sellUnit(35, 8, wholesale, { cacPerOrder: 30 });
    expect(r.fulfilment).toBe(0);
    // The CAC slider must not touch a channel that buys no traffic.
    expect(r.contribution).toBeCloseTo(r.contributionBeforeCac, 6);
    expect(r.fees).toBeCloseTo(35 * 0.5, 6);
  });

  it('a marketplace takes more in fees but costs nothing to acquire', () => {
    const m = sellUnit(35, 8, market, { cacPerOrder: 12 });
    const s = sellUnit(35, 8, social, { cacPerOrder: 12 });
    expect(m.fees).toBeGreaterThan(s.fees);
    expect(m.contribution).toBeGreaterThan(s.contribution);
  });

  it('a bigger basket spreads postage and acquisition across the units', () => {
    const one = sellUnit(35, 8, social, { cacPerOrder: 12, unitsPerOrder: 1 });
    const two = sellUnit(35, 8, social, { cacPerOrder: 12, unitsPerOrder: 2 });
    expect(two.contribution).toBeGreaterThan(one.contribution);
  });

  it('never divides by a zero basket', () => {
    expect(() => sellUnit(35, 8, social, { unitsPerOrder: 0 })).not.toThrow();
    expect(Number.isFinite(sellUnit(35, 8, social, { unitsPerOrder: 0 }).contribution)).toBe(true);
  });

  it('every channel is priced, so the selector cannot show a broken tab', () => {
    for (const c of CHANNELS) {
      const r = sellUnit(35, 8, c, { cacPerOrder: 10 });
      expect(Number.isFinite(r.contribution)).toBe(true);
      expect(Number.isFinite(r.breakEvenCac)).toBe(true);
    }
  });
});

describe('campaign', () => {
  it('loses money when the order costs more than it leaves', () => {
    const c = campaign(100, 20, 10);
    expect(c.spend).toBe(2000);
    expect(c.net).toBe(-1000);
    expect(c.returnOnSpend).toBeLessThan(1);
  });

  it('is infinite return when nothing is spent, not a divide by zero', () => {
    expect(campaign(100, 0, 10).returnOnSpend).toBe(Infinity);
  });
});

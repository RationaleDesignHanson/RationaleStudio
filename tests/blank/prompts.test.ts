/**
 * Tuple validation is the abuse filter and the spend filter, so it gets tested
 * like one. Anything that reaches Replicate costs money; anything rejected here
 * costs nothing.
 */

import { describe, it, expect } from 'vitest';
import {
  composePrompt,
  derivedSeed,
  tupleKey,
  validateTuple,
  GRAPHIC_SPECS,
  COLORWAYS,
} from '@/lib/blank/prompts';

const good = { garment: 'tee', tier: 3, graphic: 'G-abstract-mark', colorway: 'stone' };

describe('validateTuple accepts only well-formed tuples', () => {
  it('accepts a valid tuple', () => {
    const r = validateTuple(good);
    expect(r.ok).toBe(true);
  });

  it.each([
    ['null', null],
    ['a string', 'tee'],
    ['an empty object', {}],
    ['an array', []],
  ])('rejects %s', (_label, input) => {
    expect(validateTuple(input).ok).toBe(false);
  });

  it('rejects an unknown garment', () => {
    expect(validateTuple({ ...good, garment: 'jacket' }).ok).toBe(false);
  });

  it('rejects an unknown graphic id', () => {
    expect(validateTuple({ ...good, graphic: 'G-does-not-exist' }).ok).toBe(false);
  });

  it('rejects an unknown colourway', () => {
    expect(validateTuple({ ...good, colorway: 'neon' }).ok).toBe(false);
  });

  it.each([0, 6, 2.5, -1, NaN])('rejects tier %s', (tier) => {
    expect(validateTuple({ ...good, tier }).ok).toBe(false);
  });

  it('reports every problem at once rather than the first', () => {
    const r = validateTuple({ garment: 'jacket', tier: 9, graphic: 'nope', colorway: 'neon' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.length).toBeGreaterThanOrEqual(4);
  });
});

describe('physical and economic impossibility is refused before spend', () => {
  it('refuses an 11in numeral on a 6-panel cap', () => {
    const r = validateTuple({ ...good, garment: 'cap', graphic: 'G-numeral' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.some((e) => /cap/i.test(e.reason))).toBe(true);
  });

  it('refuses a back-panel graphic on a cap', () => {
    expect(validateTuple({ ...good, garment: 'cap', graphic: 'G-back-panel' }).ok).toBe(false);
  });

  it('refuses non-Stage-0 decoration below the full-line budget', () => {
    const r = validateTuple({ ...good, tier: 4, graphic: 'G-stripe-panel' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.some((e) => /Stage 0/.test(e.reason))).toBe(true);
  });

  it('allows non-Stage-0 decoration at the full-line budget', () => {
    expect(validateTuple({ ...good, tier: 5, graphic: 'G-stripe-panel' }).ok).toBe(true);
  });

  it('allows a cap-safe graphic on a cap', () => {
    expect(validateTuple({ ...good, garment: 'cap', graphic: 'G-pocket-hit' }).ok).toBe(true);
  });
});

describe('seeds are deterministic and tuple-sensitive', () => {
  const t = { garment: 'tee' as const, tier: 3, graphic: 'G-abstract-mark', colorway: 'stone' };

  it('same tuple always gives the same seed', () => {
    expect(derivedSeed(t)).toBe(derivedSeed({ ...t }));
  });

  it('every field changes the seed', () => {
    const base = derivedSeed(t);
    expect(derivedSeed({ ...t, garment: 'hoodie' })).not.toBe(base);
    expect(derivedSeed({ ...t, tier: 4 })).not.toBe(base);
    expect(derivedSeed({ ...t, graphic: 'G-emblem' })).not.toBe(base);
    expect(derivedSeed({ ...t, colorway: 'olive' })).not.toBe(base);
  });

  it('stays inside Replicate’s seed range', () => {
    for (const g of Object.keys(GRAPHIC_SPECS)) {
      for (const c of Object.keys(COLORWAYS)) {
        const s = derivedSeed({ garment: 'tee', tier: 1, graphic: g, colorway: c });
        expect(Number.isInteger(s)).toBe(true);
        expect(s).toBeGreaterThanOrEqual(0);
        expect(s).toBeLessThan(100000);
      }
    }
  });

  it('tuple keys are unique across the whole space', () => {
    const keys = new Set<string>();
    let n = 0;
    for (const garment of ['tee', 'hoodie', 'cap'] as const)
      for (let tier = 1; tier <= 5; tier++)
        for (const graphic of Object.keys(GRAPHIC_SPECS))
          for (const colorway of Object.keys(COLORWAYS)) {
            keys.add(tupleKey({ garment, tier, graphic, colorway }));
            n++;
          }
    expect(keys.size).toBe(n);
  });
});

describe('composed prompts obey the rules the line was generated under', () => {
  const p = composePrompt({ garment: 'tee', tier: 3, graphic: 'G-tonal-emboss', colorway: 'stone' });

  it('front-loads the decoration ahead of the garment, for every graphic', () => {
    // Anchored on the spec's own treatment string rather than a quoted phrase,
    // so rewording a treatment can't silently retire this check.
    for (const [id, spec] of Object.entries(GRAPHIC_SPECS)) {
      const s = composePrompt({ garment: 'tee', tier: 3, graphic: id, colorway: 'stone' });
      const deco = s.indexOf(spec.treatment);
      const garment = s.indexOf('FLAT-LAY PRODUCT PHOTOGRAPH');
      expect(deco, `${id} treatment missing from prompt`).toBeGreaterThan(-1);
      expect(garment).toBeGreaterThan(-1);
      expect(deco, `${id} decoration not front-loaded`).toBeLessThan(garment);
    }
  });

  it('uses the colourway palette and never the muted-earth house clause', () => {
    // "muted earth palette" asserted before the scene is what killed stone grey.
    expect(p).not.toContain('muted earth palette');
    expect(p).toContain('cool mid stone grey');
  });

  it('suppresses typography, which Flux otherwise invents', () => {
    expect(p).toMatch(/no text, no letters/i);
  });

  it('carries the tier cloth, not a generic one', () => {
    const cheap = composePrompt({ ...{ garment: 'tee' as const, graphic: 'G-emblem', colorway: 'bone' }, tier: 1 });
    const dear = composePrompt({ ...{ garment: 'tee' as const, graphic: 'G-emblem', colorway: 'bone' }, tier: 5 });
    expect(cheap).toContain('lightweight smooth jersey');
    expect(dear).toContain('deeply lived-in');
    expect(cheap).not.toBe(dear);
  });

  it('never emits an empty or truncated prompt', () => {
    for (const g of Object.keys(GRAPHIC_SPECS)) {
      const s = composePrompt({ garment: 'tee', tier: 5, graphic: g, colorway: 'charcoal' });
      expect(s.length).toBeGreaterThan(300);
      expect(s.length).toBeLessThan(2000);
    }
  });
});

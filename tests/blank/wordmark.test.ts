/**
 * Wordmark gating. The interesting property is that it is per WORD: length times
 * tracking decides whether a treatment clears the platen, so two names do not
 * get the same options at the same budget. Also pins gateLabel's direction,
 * which was written wrong twice before it was shared.
 */

import { describe, it, expect } from 'vitest';
import {
  ALL_TREATMENTS,
  FUNKY,
  TREATMENTS,
  availability,
  estimateWidthInches,
  lineCount,
  normalise,
  producibleCount,
  PLATEN_INCHES,
} from '@/lib/blank/wordmark';
import { gateLabel } from '@/lib/blank/producible';
import { STATES } from '@/lib/blank/line';

const byId = (id: string) => TREATMENTS.find((t) => t.id === id)!;
const BUDGETS = STATES.map((s) => s.budget);
const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
const [DTF, SCREEN1, SCREEN2, EMB] = [0, 1, 2, 3];

/** 14 characters. The fixture is about LENGTH, not about any candidate name. */
const LONG_NAME = 'FOURTEEN CHARS';

describe('normalise', () => {
  it('uppercases and collapses whitespace', () => {
    expect(normalise('  two words ')).toBe('TWO WORDS');
  });

  it('caps length so a pasted link cannot break layout', () => {
    expect(normalise('x'.repeat(60)).length).toBe(18);
  });
});

describe('per-word platen gating', () => {
  it('BLANK clears the platen in every treatment', () => {
    for (const t of ALL_TREATMENTS) {
      expect(estimateWidthInches('BLANK', t)).toBeLessThanOrEqual(PLATEN_INCHES);
    }
  });

  it('a long word at wide tracking does NOT clear it', () => {
    const wide = byId('grotesque-wide');
    expect(estimateWidthInches(LONG_NAME, wide)).toBeGreaterThan(PLATEN_INCHES);
    const av = availability(LONG_NAME, wide, DTF);
    expect(av.ok).toBe(false);
    expect(av.overPlaten).toBe(true);
    expect(av.availableAt).toEqual([]);
  });

  it('the same long word DOES fit in a tight treatment — the trade is real', () => {
    const tight = byId('grotesque-tight');
    expect(availability(LONG_NAME, tight, DTF).ok).toBe(true);
  });

  it('platen overrides budget: no tier buys a jumbo frame', () => {
    const wide = byId('grotesque-wide');
    for (const tier of STATES.map((_, i) => i)) {
      expect(availability(LONG_NAME, wide, tier).ok).toBe(false);
    }
  });

  it('an empty word is zero inches and does not throw', () => {
    expect(estimateWidthInches('', byId('serif-heritage'))).toBe(0);
  });
});

describe('per-method gating', () => {
  it('serif needs two screens — hairlines fill in on one', () => {
    expect(availability('BLANK', byId('serif-heritage'), SCREEN1).ok).toBe(false);
    expect(availability('BLANK', byId('serif-heritage'), SCREEN2).ok).toBe(true);
  });

  it('serif and wide grotesque cannot be embroidered', () => {
    expect(availability('BLANK', byId('serif-heritage'), EMB).ok).toBe(false);
    expect(availability('BLANK', byId('grotesque-wide'), EMB).ok).toBe(false);
  });

  it('heavy display and mono survive every method', () => {
    for (const id of ['heavy-display', 'mono-technical', 'grotesque-tight']) {
      for (const tier of STATES.map((_, i) => i)) {
        expect(availability('BLANK', byId(id), tier).ok).toBe(true);
      }
    }
  });

  it('count drops as the budget rises — same non-monotonicity as the marks', () => {
    expect(producibleCount('BLANK', DTF)).toBe(ALL_TREATMENTS.length);
    expect(producibleCount('BLANK', EMB)).toBeLessThan(producibleCount('BLANK', DTF));
  });

  it('every unavailable treatment gives a reason', () => {
    for (const t of ALL_TREATMENTS) {
      for (const tier of STATES.map((_, i) => i)) {
        const av = availability('BLANK', t, tier);
        if (!av.ok) expect(av.reason && av.reason.length > 10).toBe(true);
      }
    }
  });
});

describe('funky treatments', () => {
  it('there are six, and they are all tagged funky', () => {
    expect(FUNKY).toHaveLength(6);
    expect(FUNKY.every((t) => t.group === 'funky')).toBe(true);
    expect(TREATMENTS.every((t) => t.group === 'straight')).toBe(true);
  });

  it('ids are unique across the whole set', () => {
    const ids = ALL_TREATMENTS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('stacked is the answer to an over-platen name — it fits where wide does not', () => {
    const stacked = ALL_TREATMENTS.find((t) => t.id === 'stacked')!;
    const wide = byId('grotesque-wide');
    expect(availability(LONG_NAME, wide, DTF).overPlaten).toBe(true);
    expect(availability(LONG_NAME, stacked, DTF).ok).toBe(true);
    expect(estimateWidthInches(LONG_NAME, stacked)).toBeLessThan(
      estimateWidthInches(LONG_NAME, wide) / 2,
    );
  });

  it('outline is DTF-only — stroke width, not colour count, is the limit', () => {
    const outline = ALL_TREATMENTS.find((t) => t.id === 'outline')!;
    expect(outline.methods).toEqual(['dtf']);
    expect(availability('BLANK', outline, SCREEN2).ok).toBe(false);
    expect(availability('BLANK', outline, SCREEN2).reason).toMatch(/stroke width/i);
  });

  it('knockout cannot be embroidered — a solid fill is the priciest shape in thread', () => {
    const ko = ALL_TREATMENTS.find((t) => t.id === 'knockout')!;
    expect(availability('BLANK', ko, EMB).ok).toBe(false);
    expect(availability('BLANK', ko, EMB).reason).toMatch(/fill/i);
  });

  it('compressed and crushed are narrower than the face they derive from', () => {
    const base = byId('heavy-display');
    for (const id of ['compressed', 'crushed']) {
      const t = ALL_TREATMENTS.find((x) => x.id === id)!;
      expect(estimateWidthInches('BLANK', t)).toBeLessThan(estimateWidthInches('BLANK', base));
    }
  });
});

describe('gateLabel direction — the bug that was written twice', () => {
  it('says "needs" when the option is above the current budget', () => {
    expect(gateLabel([2, 3, 4], DTF, money, BUDGETS)).toBe('needs $8k');
  });

  it('says "up to" when spending MORE lost it, never "needs"', () => {
    const label = gateLabel([0, 1, 2], EMB, money, BUDGETS);
    expect(label).toBe('up to $8k');
    expect(label).not.toContain('needs');
  });

  it('says "not at" for a genuine gap on both sides', () => {
    expect(gateLabel([0, 2, 3, 4], SCREEN1, money, BUDGETS)).toBe('not at $5k');
  });

  it('handles an empty set', () => {
    expect(gateLabel([], DTF, money, BUDGETS)).toBe('not here');
  });

  it('matches what the wordmark grid actually shows for wide grotesque at $12k', () => {
    const av = availability('BLANK', byId('grotesque-wide'), EMB);
    expect(av.ok).toBe(false);
    expect(gateLabel(av.availableAt, EMB, money, BUDGETS)).toBe('up to $8k');
  });
});

describe('wrapping treatments report honest widths', () => {
  const stacked = ALL_TREATMENTS.find((t) => t.id === 'stacked')!;
  const tight = byId('grotesque-tight');

  it('a short word does NOT get the half-width discount — it fits one line', () => {
    expect(lineCount('BLANK', stacked)).toBe(1);
    // Same 5 characters, so within rounding of the unstacked face.
    expect(estimateWidthInches('BLANK', stacked)).toBeGreaterThan(
      estimateWidthInches('BLANK', tight) * 0.9,
    );
  });

  it('a long word wraps, and the width is the longest LINE not the whole word', () => {
    expect(lineCount(LONG_NAME, stacked)).toBeGreaterThan(1);
    expect(estimateWidthInches(LONG_NAME, stacked)).toBeLessThan(
      estimateWidthInches(LONG_NAME, tight),
    );
  });

  it('non-wrapping treatments are always one line', () => {
    for (const t of ALL_TREATMENTS.filter((x) => !x.maxCharsPerLine)) {
      expect(lineCount(LONG_NAME, t)).toBe(1);
    }
  });

  it('width never exceeds the line cap once wrapping kicks in', () => {
    const capped = estimateWidthInches('X'.repeat(18), stacked);
    expect(capped).toBe(estimateWidthInches('X'.repeat(6), stacked));
  });
});

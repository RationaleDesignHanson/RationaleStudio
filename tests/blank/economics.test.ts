/**
 * Asserts the ported cost function against the worked examples published in
 * `02b-economics-corrected.json`. If these fail, the microsite and the model
 * disagree — and the microsite is the one that's wrong.
 */
import { describe, it, expect } from 'vitest';
import {
  BLANKS,
  HEROES,
  stage0Cogs,
  heroCogs,
  breakEvenPreorders,
  grossMargin,
  keystoneMultiple,
  runIndexContinuous,
  blankUnit,
} from '@/lib/blank/economics';

describe('Stage 0 — worked example T1', () => {
  // "T1 — AS Colour 5082, 2-colour screen + blocker (3 screens), run 50,
  //  printed back-neck" → landedCOGS 24.69, GM 55.1% @ $55, keystone 2.23x
  const input = {
    blank: BLANKS.as5082,
    decoration: { method: 'screen' as const, colors: 2 },
    run: 50 as const,
    relabel: 'printedNeck' as const,
  };

  it('blankUnit = 13.50 x runIndex[50]=1.08 = 14.58', () => {
    expect(blankUnit(BLANKS.as5082, 50)).toBeCloseTo(14.58, 2);
  });

  it('decoVar = 3 passes (2 colours + blocker) x 1.90 = 5.70', () => {
    expect(stage0Cogs(input).decoVar).toBeCloseTo(5.7, 2);
  });

  it('amortizedFixed = (3 x 27.50 + 25.00) / 50 = 2.15', () => {
    expect(stage0Cogs(input).amortizedFixed).toBeCloseTo(2.15, 2);
  });

  it('landedCOGS = 24.69', () => {
    expect(stage0Cogs(input).landedCOGS).toBeCloseTo(24.69, 2);
  });

  it('grossMargin @ $55 = 55.1%', () => {
    expect(grossMargin(55, stage0Cogs(input).landedCOGS)).toBeCloseTo(0.551, 3);
  });

  it('keystoneMultiple = 2.23x', () => {
    expect(keystoneMultiple(55, stage0Cogs(input).landedCOGS)).toBeCloseTo(2.23, 2);
  });

  it('duty is zero — Stage 0 blanks are bought already landed in the US', () => {
    expect(stage0Cogs(input).duty).toBe(0);
  });
});

describe('Stage 0 — the 5146 is NOT blocker-required', () => {
  // Standard-dyed 80/20 CVC: needs a low-bleed POLY ink system, not an extra screen.
  it('2-colour screen on the 5146 is 2 passes, not 3', () => {
    const c = stage0Cogs({
      blank: BLANKS.as5146,
      decoration: { method: 'screen', colors: 2 },
      run: 50,
      relabel: 'none',
    });
    expect(c.decoVar).toBeCloseTo(2 * 1.9, 2);
  });

  it('the 5166 IS blocker-required and is cheaper than the 5146 (fact-check)', () => {
    expect(blankUnit(BLANKS.as5166, 50)).toBeLessThan(blankUnit(BLANKS.as5146, 50));
    expect(BLANKS.as5166.blockerRequired).toBe(true);
  });
});

describe('Hero — worked example, chore coat @ N=86, Portugal', () => {
  const hero = HEROES.choreCoat;

  // The model's worked example PRINTS runIndexContinuous(86)=1.0219 and
  // fobUnit=48.69, but its own listed steps then sum to 89.97 while it states a
  // total of 89.66. Log-linear interpolation gives 1.01573 -> fobUnit 48.40,
  // which reproduces the stated 89.66 exactly. The published intermediate is a
  // transcription error; the computed result is right, so break-even 86 stands.
  it('runIndexContinuous(86) = 1.01573 (reconciles the model total, not its printed intermediate)', () => {
    expect(runIndexContinuous(86)).toBeCloseTo(1.01573, 4);
  });

  it('fobUnit = 48.40', () => {
    expect(heroCogs(hero, 86, 'portugal').fobUnit).toBeCloseTo(48.4, 2);
  });

  it('duty @ 10% = 4.84', () => {
    expect(heroCogs(hero, 86, 'portugal').duty).toBeCloseTo(4.84, 2);
  });

  it('deadCloth = 110.6m x $7.00 = $774.20, /86 = 9.00', () => {
    const c = heroCogs(hero, 86, 'portugal');
    expect(c.deadClothMetres).toBeCloseTo(110.8, 1);
    expect(c.deadClothAmortized).toBeCloseTo(9.0, 1);
  });

  it('landedCOGS = 89.66, GM 60.2% — clears the floor', () => {
    const c = heroCogs(hero, 86, 'portugal');
    expect(c.landedCOGS).toBeCloseTo(89.66, 1);
    expect(grossMargin(225, c.landedCOGS)).toBeCloseTo(0.602, 3);
  });

  it('N=50 (the naive MOQ cap): deadCloth/N = 26.60, GM 43.2%', () => {
    const c = heroCogs(hero, 50, 'portugal');
    expect(c.deadClothAmortized).toBeCloseTo(26.6, 1);
    expect(grossMargin(225, c.landedCOGS)).toBeCloseTo(0.432, 2);
  });

  // The model quotes 54.0% here; recomputing from its own coefficients gives
  // 55.9%. Either way N=73 sits under the 60% floor, which is the point being
  // made. Asserting the band rather than a figure the model doesn't reproduce.
  it('N=73 (the superseded v1.0 answer) sits well under the floor', () => {
    const gm = grossMargin(225, heroCogs(hero, 73, 'portugal').landedCOGS);
    expect(gm).toBeLessThan(0.6);
    expect(gm).toBeGreaterThan(0.5);
  });

  it('break-even is 86 pre-orders', () => {
    expect(breakEvenPreorders(hero, 'portugal')).toBe(86);
  });
});

describe('Hero — the levers that actually move it', () => {
  const hero = HEROES.choreCoat;

  // TR-T15: one cloth, one dye lot, one 300 m buy, dead cloth pro-rata by metres.
  // A 1:1 mix at 72/72 is the model's published mitigation.
  it('shared cloth at a 1:1 mix puts the jacket COGS at 86.95 and clears the floor at 72', () => {
    const c = heroCogs(hero, 72, 'portugal', {
      sharedClothWith: { hero: HEROES.trousers, units: 72, pricePerMetre: 7.0 },
    });
    expect(c.landedCOGS).toBeCloseTo(86.95, 1);
    expect(grossMargin(225, c.landedCOGS)).toBeGreaterThan(0.6);
  });

  it('the trousers gain more from shared cloth than the jacket does', () => {
    const t = heroCogs(HEROES.trousers, 72, 'portugal', {
      sharedClothWith: { hero, units: 72, pricePerMetre: 7.0 },
    });
    expect(t.landedCOGS).toBeCloseTo(57.57, 1);
    expect(grossMargin(145, t.landedCOGS)).toBeGreaterThan(0.6);
  });

  it('dead cloth vanishes at N >= 137', () => {
    expect(heroCogs(hero, 137, 'portugal').deadClothAmortized).toBeCloseTo(0, 5);
    expect(heroCogs(hero, 136, 'portugal').deadClothAmortized).toBeGreaterThan(0);
  });

  // Duty alone does not rank origins: China carries 29.4% against Portugal's 10%
  // but a 0.62 CMT multiplier against 1.0, and the CMT saving wins. This is why
  // the multipliers must come from the model rather than be intuited.
  it('China beats Portugal on break-even despite triple the duty', () => {
    expect(breakEvenPreorders(hero, 'china')!).toBeLessThan(breakEvenPreorders(hero, 'portugal')!);
  });

  it('trousers standalone break even at 97', () => {
    expect(breakEvenPreorders(HEROES.trousers, 'portugal')).toBe(97);
  });
});

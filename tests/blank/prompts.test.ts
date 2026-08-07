/**
 * Tuple validation is the abuse filter and the spend filter, so it gets tested
 * like one. Anything that reaches Replicate costs money; anything rejected here
 * costs nothing.
 */

import { describe, it, expect } from 'vitest';
import {
  composePrompt,
  derivedSeed,
  resolveAxes,
  tupleKey,
  validateTuple,
  GRAPHIC_SPECS,
  COLORWAYS,
} from '@/lib/blank/prompts';
import {
  MOTIFS,
  PLACEMENTS,
  SCALES,
  FINISHES,
  PRESETS,
  axesValid,
  availableMotifs,
  coerceAxesForGarment,
  combinationCount,
} from '@/lib/blank/axes';
import type { RenderTuple } from '@/lib/blank/prompts';
import type { Garment } from '@/lib/blank/line';

/** Build a complete tuple the way the validator would, for composePrompt tests. */
const full = (o: {
  garment: Garment;
  tier: number;
  graphic: string;
  colorway: string;
} & Partial<RenderTuple>): RenderTuple => ({ ...o, ...resolveAxes(o.graphic, o) });

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

  it('allows a cap once its axes are placed on the cap', () => {
    // A preset carries TEE placements, so it must be remapped for a cap first.
    // The server stays strict about this on purpose; the client does the remap.
    const axes = coerceAxesForGarment('cap', resolveAxes('G-pocket-hit'));
    expect(validateTuple({ ...good, garment: 'cap', graphic: 'G-pocket-hit', ...axes }).ok)
      .toBe(true);
  });

  it('still refuses a raw tee preset posted against a cap', () => {
    // The strict path: no silent coercion server-side, because this check is
    // also the spend filter.
    expect(validateTuple({ ...good, garment: 'cap', graphic: 'G-pocket-hit' }).ok).toBe(false);
  });
});

describe('seeds are deterministic and tuple-sensitive', () => {
  const t = full({ garment: 'tee', tier: 3, graphic: 'G-abstract-mark', colorway: 'stone' });

  it('same tuple always gives the same seed', () => {
    expect(derivedSeed(t)).toBe(derivedSeed({ ...t }));
  });

  it('every field that affects the image changes the seed', () => {
    const base = derivedSeed(t);
    expect(derivedSeed({ ...t, garment: 'hoodie' })).not.toBe(base);
    expect(derivedSeed({ ...t, tier: 4 })).not.toBe(base);
    expect(derivedSeed({ ...t, colorway: 'olive' })).not.toBe(base);
    expect(derivedSeed({ ...t, motif: 'emblem' })).not.toBe(base);
    expect(derivedSeed({ ...t, placement: 'upper-back' })).not.toBe(base);
    expect(derivedSeed({ ...t, scale: 'micro' })).not.toBe(base);
    expect(derivedSeed({ ...t, finish: 'embroidery' })).not.toBe(base);
  });

  it('the preset id does NOT affect the key — resolved axes do', () => {
    // Two presets that resolve to the same axes describe the same image, so
    // they should share one cache entry rather than paying twice.
    const a = full({ garment: 'tee', tier: 3, graphic: 'G-abstract-mark', colorway: 'stone' });
    const b = full({ garment: 'tee', tier: 3, graphic: 'G-emblem', colorway: 'stone', motif: 'abstract-mark' });
    expect(tupleKey(a)).toBe(tupleKey(b));
  });

  it('stays inside Replicate’s seed range', () => {
    for (const g of Object.keys(GRAPHIC_SPECS)) {
      for (const c of Object.keys(COLORWAYS)) {
        const s = derivedSeed(full({ garment: 'tee', tier: 1, graphic: g, colorway: c }));
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
            keys.add(tupleKey(full({ garment, tier, graphic, colorway })));
            n++;
          }
    expect(keys.size).toBe(n);
  });
});

describe('composed prompts obey the rules the line was generated under', () => {
  const p = composePrompt(full({ garment: 'tee', tier: 3, graphic: 'G-tonal-emboss', colorway: 'stone' }));

  it('front-loads the decoration ahead of the garment, for every graphic', () => {
    // Anchored on the spec's own treatment string rather than a quoted phrase,
    // so rewording a treatment can't silently retire this check.
    for (const [id, spec] of Object.entries(GRAPHIC_SPECS)) {
      const s = composePrompt(full({ garment: 'tee', tier: 3, graphic: id, colorway: 'stone' }));
      const deco = s.indexOf(MOTIFS[PRESETS[id].motif].clause);
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
    expect(p).toContain('ONE SHADE LIGHTER');
  });

  it('suppresses typography, which Flux otherwise invents', () => {
    expect(p).toMatch(/no text, no letters/i);
  });

  it('carries the tier cloth, not a generic one', () => {
    const cheap = composePrompt(full({ garment: 'tee', graphic: 'G-emblem', colorway: 'bone', tier: 1 }));
    const dear = composePrompt(full({ garment: 'tee', graphic: 'G-emblem', colorway: 'bone', tier: 5 }));
    expect(cheap).toContain('lightweight smooth jersey');
    expect(dear).toContain('deeply lived-in');
    expect(cheap).not.toBe(dear);
  });

  it('never emits an empty or truncated prompt', () => {
    for (const g of Object.keys(GRAPHIC_SPECS)) {
      const s = composePrompt(full({ garment: 'tee', tier: 5, graphic: g, colorway: 'charcoal' }));
      expect(s.length).toBeGreaterThan(300);
      expect(s.length).toBeLessThan(2000);
    }
  });
});


describe('axes widen the space without allowing impossible garments', () => {
  it('every preset resolves to a valid combination on its own garment', () => {
    for (const [id, preset] of Object.entries(PRESETS)) {
      const garment: Garment = PLACEMENTS[preset.placement].garments.includes('tee')
        ? 'tee'
        : 'cap';
      const errs = axesValid(garment, preset.motif, preset.placement, preset.scale, preset.finish);
      expect(errs, `${id}: ${errs.join('; ')}`).toEqual([]);
    }
  });

  it('a cap has no sleeve, back or hem', () => {
    for (const p of ['sleeve', 'upper-back', 'hem']) {
      expect(axesValid('cap', 'abstract-mark', p, 'micro', 'flat-screen').length).toBeGreaterThan(0);
    }
  });

  it('a tee has no cap panel', () => {
    expect(axesValid('tee', 'abstract-mark', 'cap-front', 'small', 'flat-screen').length)
      .toBeGreaterThan(0);
  });

  it('refuses an oversize hit on a small-only placement', () => {
    expect(axesValid('tee', 'abstract-mark', 'sleeve', 'oversize', 'flat-screen').length)
      .toBeGreaterThan(0);
    expect(axesValid('tee', 'abstract-mark', 'sleeve', 'micro', 'flat-screen')).toEqual([]);
  });

  it('an all-over pattern has no placement', () => {
    expect(axesValid('tee', 'allover', 'sleeve', 'large', 'flat-screen').length).toBeGreaterThan(0);
  });

  it('a pieced panel has no ink', () => {
    expect(axesValid('tee', 'colour-block', 'chest-centre', 'medium', 'puff').length)
      .toBeGreaterThan(0);
  });

  it('refuses fine-line diagrams at small scale', () => {
    expect(axesValid('tee', 'technical-diagram', 'chest-centre', 'micro', 'flat-screen').length)
      .toBeGreaterThan(0);
  });

  it('opens up substantially more than the 12 fixed graphics', () => {
    const n = combinationCount();
    expect(n).toBeGreaterThan(200);
    // Sanity ceiling: if this ever exceeds the raw product, the filter broke.
    const raw =
      3 * Object.keys(MOTIFS).length * Object.keys(PLACEMENTS).length *
      Object.keys(SCALES).length * Object.keys(FINISHES).length;
    expect(n).toBeLessThan(raw);
  });
});

describe('axis overrides route through validation and the prompt', () => {
  it('an override changes the composed prompt', () => {
    const base = { garment: 'tee' as Garment, tier: 5, graphic: 'G-abstract-mark', colorway: 'stone' };
    const flat = composePrompt(full(base));
    const puff = composePrompt(full({ ...base, finish: 'puff' }));
    expect(flat).not.toBe(puff);
    expect(puff).toContain('puff ink');
  });

  it('an override changes the cache key, so it cannot serve the wrong image', () => {
    const base = { garment: 'tee' as Garment, tier: 5, graphic: 'G-abstract-mark', colorway: 'stone' };
    expect(tupleKey(full(base))).not.toBe(tupleKey(full({ ...base, scale: 'micro' })));
  });

  it('off-rate-card finishes are refused below the top budget', () => {
    const t = { garment: 'tee', tier: 3, graphic: 'G-abstract-mark', colorway: 'stone', finish: 'foil' };
    expect(validateTuple(t).ok).toBe(false);
    expect(validateTuple({ ...t, tier: 5 }).ok).toBe(true);
  });

  it('a valid override validates end to end', () => {
    const r = validateTuple({
      garment: 'hoodie', tier: 4, graphic: 'G-abstract-mark', colorway: 'olive',
      placement: 'upper-back', scale: 'oversize', finish: 'embroidery',
    });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.tuple.placement).toBe('upper-back');
  });
});


describe('client-side coercion keeps garment switching from dead-ending', () => {
  it('moves a tee placement onto a cap', () => {
    const a = coerceAxesForGarment('cap', resolveAxes('G-pocket-hit'));
    expect(PLACEMENTS[a.placement].garments).toContain('cap');
    expect(axesValid('cap', a.motif, a.placement, a.scale, a.finish)).toEqual([]);
  });

  it('shrinks an oversize hit down for a cap', () => {
    const a = coerceAxesForGarment('cap', resolveAxes('G-numeral'));
    expect(SCALES[a.scale].small).toBe(true);
    expect(axesValid('cap', a.motif, a.placement, a.scale, a.finish)).toEqual([]);
  });

  it('produces a valid combination for every preset whose motif the garment allows', () => {
    for (const id of Object.keys(PRESETS))
      for (const g of ['tee', 'hoodie', 'cap'] as Garment[]) {
        const preset = PRESETS[id];
        // Some motif/garment pairs are impossible no matter how the other axes
        // are nudged; those are reported by availableMotifs and disabled in the
        // UI rather than silently rewritten into a different design.
        if (!availableMotifs(g).includes(preset.motif)) continue;
        const a = coerceAxesForGarment(g, resolveAxes(id));
        const errs = axesValid(g, a.motif, a.placement, a.scale, a.finish);
        expect(errs, `${id} on ${g}: ${errs.join('; ')}`).toEqual([]);
      }
  });

  it('reports a technical diagram as impossible on a cap, not coerced into one', () => {
    // A cap forces a small hit and fine lines drop out below ~1pt on textured
    // cotton, so this pair genuinely cannot be made.
    expect(availableMotifs('cap')).not.toContain('technical-diagram');
    expect(availableMotifs('tee')).toContain('technical-diagram');
  });

  it('leaves most motifs available on a tee', () => {
    expect(availableMotifs('tee').length).toBeGreaterThanOrEqual(
      Object.keys(MOTIFS).length - 1,
    );
  });

  it('leaves an already-valid combination alone', () => {
    const before = resolveAxes('G-abstract-mark');
    expect(coerceAxesForGarment('tee', before)).toEqual(before);
  });
});

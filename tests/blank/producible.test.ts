/**
 * Budget-gated producibility. The claim this encodes is the page's thesis, so
 * the non-monotonicity is pinned explicitly: spending more must be able to LOSE
 * you options, not only gain them.
 */

import { describe, it, expect } from 'vitest';
import {
  EXECUTION,
  TIER_METHOD,
  availability,
  availabilityForSlug,
  producibleCount,
  methodGate,
} from '@/lib/blank/producible';
import { STATES } from '@/lib/blank/line';

const ALL = Object.keys(EXECUTION);
const [DTF, SCREEN1, SCREEN2, EMB, FULL] = [0, 1, 2, 3, 4];

describe('tier → method mapping', () => {
  it('covers every budget stop', () => {
    expect(TIER_METHOD).toHaveLength(STATES.length);
  });

  it('matches the decoration each stop actually pays for', () => {
    expect(TIER_METHOD[DTF]).toBe('dtf');
    expect(TIER_METHOD[SCREEN1]).toBe('screen1');
    expect(TIER_METHOD[SCREEN2]).toBe('screen2');
    expect(TIER_METHOD[EMB]).toBe('embroidery');
    expect(TIER_METHOD[FULL]).toBe('embroidery');
  });
});

describe('non-monotonicity — the actual argument', () => {
  it('the technical diagram is executable ONLY at the cheapest stop', () => {
    expect(availability('G-grid-diagram', DTF).ok).toBe(true);
    for (const t of [SCREEN1, SCREEN2, EMB, FULL]) {
      expect(availability('G-grid-diagram', t).ok).toBe(false);
    }
  });

  it('an oversize numeral prints but cannot be stitched', () => {
    expect(availability('G-numeral', DTF).ok).toBe(true);
    expect(availability('G-numeral', SCREEN2).ok).toBe(true);
    expect(availability('G-numeral', EMB).ok).toBe(false);
    expect(availability('G-numeral', EMB).reason).toMatch(/stitch/i);
  });

  it('tonal is gated below $8k and available above it', () => {
    expect(availability('G-tonal-emboss', DTF).ok).toBe(false);
    expect(availability('G-tonal-emboss', SCREEN1).ok).toBe(false);
    expect(availability('G-tonal-emboss', SCREEN2).ok).toBe(true);
    expect(availability('G-tonal-emboss', EMB).ok).toBe(true);
  });

  it('appliqué only becomes possible once embroidery is paid for', () => {
    expect(availability('G-embroidered-patch', SCREEN2).ok).toBe(false);
    expect(availability('G-embroidered-patch', EMB).ok).toBe(true);
  });

  it('the producible count is genuinely not monotonic in budget', () => {
    const counts = STATES.map((_, t) => producibleCount(ALL, t));
    // If it only ever grew, gating would be a filter rather than a trade.
    const monotonic = counts.every((c, i) => i === 0 || c >= counts[i - 1]);
    expect(monotonic).toBe(false);
    // And something must be lost specifically by moving to thread.
    expect(counts[EMB]).toBeLessThan(counts[SCREEN2]);
  });
});

describe('never vs not-here', () => {
  it('cut-and-sew and sublimation are unreachable at every budget', () => {
    for (const id of ['G-stripe-panel', 'G-allover']) {
      for (const t of STATES.map((_, i) => i)) {
        const a = availability(id, t);
        expect(a.ok).toBe(false);
        expect(a.never).toBe(true);
      }
      expect(availability(id, DTF).availableAt).toEqual([]);
    }
  });

  it('a merely-unaffordable mark is not marked never, and says where it lives', () => {
    const a = availability('G-tonal-emboss', DTF);
    expect(a.never).toBe(false);
    expect(a.availableAt).toContain(SCREEN2);
    expect(a.availableAt).not.toContain(DTF);
  });
});

describe('always-available marks', () => {
  it('the abstract mark, pocket hit and sleeve hit survive every stop', () => {
    for (const id of ['G-abstract-mark', 'G-pocket-hit', 'G-sleeve-hit']) {
      for (const t of STATES.map((_, i) => i)) {
        expect(availability(id, t).ok).toBe(true);
      }
    }
  });
});

describe('contract', () => {
  it('every gated method carries a reason, so the UI never shows a bare no', () => {
    for (const id of ALL) {
      for (const t of STATES.map((_, i) => i)) {
        const a = availability(id, t);
        if (!a.ok) expect(a.reason && a.reason.length > 10).toBe(true);
      }
    }
  });

  it('resolves by budget slug as well as index', () => {
    expect(availabilityForSlug('G-tonal-emboss', 'graphic').ok).toBe(false);
    expect(availabilityForSlug('G-tonal-emboss', 'tonal').ok).toBe(true);
    expect(availabilityForSlug('G-grid-diagram', 'graphic').ok).toBe(true);
  });

  it('clamps out-of-range tiers rather than throwing', () => {
    expect(availability('G-abstract-mark', -5).method).toBe('dtf');
    expect(availability('G-abstract-mark', 99).method).toBe('embroidery');
  });

  it('fails open on an unknown graphic id', () => {
    expect(availability('G-does-not-exist', DTF).ok).toBe(true);
  });
});

/**
 * Method gating.
 *
 * The budget is a CONSEQUENCE — read off the decoration you pick per style —
 * so an option that cannot be made must say what it NEEDS, not what it costs.
 * Quoting a price to someone choosing a typeface quotes a number they have not
 * set and cannot see.
 */
describe('methodGate', () => {
  it('says nothing when the current method can make it', () => {
    // Available at the heat-press tier, and we are on it.
    expect(methodGate([0, 1, 2], 0)).toBe('');
  });

  it('names the methods that can, never a price', () => {
    const g = methodGate([3, 4], 0); // embroidery only, viewed from heat-press
    expect(g).toContain('needs');
    expect(g).toContain('embroidery');
    expect(g).not.toMatch(/\$/);
  });

  it('does not repeat a method that spans two tiers', () => {
    // Tiers 3 and 4 are both embroidery; it must not read "embroidery or embroidery".
    expect(methodGate([3, 4], 0)).toBe('needs embroidery');
  });

  it('says so plainly when no method can make it', () => {
    expect(methodGate([], 0)).toBe('cannot be made');
  });

  it('clamps a tier outside the ladder rather than throwing', () => {
    expect(() => methodGate([0], 99)).not.toThrow();
    expect(() => methodGate([0], -3)).not.toThrow();
  });
});

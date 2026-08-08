/**
 * The identity system. The property that matters is that the symbol is RELATED to
 * the name — derived from it and set in the same treatment — because a wordmark and
 * a symbol that share nothing are two brands. The usage rule is derived from the
 * width model rather than written, so it is tested as a consequence.
 */

import { describe, it, expect } from 'vitest';
import {
  LOCKUPS,
  MIN_WORDMARK_INCHES,
  lockupWidthInches,
  monogram,
  usageRule,
} from '@/lib/blank/identity';
import { ALL_TREATMENTS, TREATMENTS, estimateWidthInches } from '@/lib/blank/wordmark';

const byId = (id: string) => ALL_TREATMENTS.find((t) => t.id === id)!;
const lock = (id: string) => LOCKUPS.find((l) => l.id === id)!;

describe('monogram — the relation between name and symbol', () => {
  it('takes the first letter of a single word', () => {
    expect(monogram('BLANK')).toBe('B');
  });

  it('takes initials when the name has more than one word', () => {
    expect(monogram('TWO WORDS')).toBe('TW');
    expect(monogram('a b c')).toBe('ABC');
  });

  it('caps at three — four initials set large is an acronym, not a glyph', () => {
    expect(monogram('a b c d e').length).toBe(3);
  });

  it('never returns empty, so the lockup always has something to draw', () => {
    expect(monogram('')).toBe('B');
    expect(monogram('   ')).toBe('B');
  });

  it('is derived, so it changes when the name changes', () => {
    expect(monogram('ATLAS')).not.toBe(monogram('BLANK'));
  });
});

describe('lockup widths', () => {
  const t = byId('grotesque-tight');

  it('symbol-only is much narrower than wordmark-only — that is why it fits small placements', () => {
    expect(lockupWidthInches('BLANK', t, lock('symbol'))).toBeLessThan(
      lockupWidthInches('BLANK', t, lock('word')),
    );
  });

  it('inline is the widest, so it blows the platen first', () => {
    const widths = LOCKUPS.map((l) => lockupWidthInches('BLANK', t, l));
    expect(Math.max(...widths)).toBe(lockupWidthInches('BLANK', t, lock('inline')));
  });

  it('stacked is no wider than its widest element', () => {
    const w = estimateWidthInches('BLANK', t);
    expect(lockupWidthInches('BLANK', t, lock('stacked'))).toBeLessThanOrEqual(w + 0.1);
  });

  it('word-only equals the wordmark width', () => {
    expect(lockupWidthInches('BLANK', t, lock('word'))).toBe(estimateWidthInches('BLANK', t));
  });

  it('every lockup declares what it puts on the garment', () => {
    for (const l of LOCKUPS) expect(l.usesWord || l.usesSymbol).toBe(true);
  });
});

describe('usage rule — derived, not written', () => {
  const t = byId('grotesque-tight');

  it('with a symbol, the symbol carries the small placements', () => {
    const r = usageRule('BLANK', t, 'monogram');
    expect(r.small).toBe('monogram');
    expect(r.large).toBe('wordmark');
    expect(r.sentence).toContain(`${MIN_WORDMARK_INCHES}in`);
    expect(r.sentence).toMatch(/left chest/i);
  });

  it('an unrelated mark also carries them, and is named as the symbol', () => {
    expect(usageRule('BLANK', t, 'mark').small).toBe('symbol');
  });

  it('with NO symbol the small placements go blank, and it says so', () => {
    const r = usageRule('BLANK', t, 'none');
    expect(r.small).toBe('nothing');
    expect(r.sentence).toMatch(/blank|nothing/i);
    // The finding is stated as a cost rather than hidden.
    expect(r.sentence).toMatch(/cost/i);
  });

  it('the rule is the same shape for every treatment — it is about size, not face', () => {
    for (const tr of TREATMENTS) {
      expect(usageRule('BLANK', tr, 'monogram').small).toBe('monogram');
    }
  });
});

/**
 * Marks made FROM the name.
 *
 * The property under test is the relation: every construction draws its letters
 * from the word, so changing the word changes the whole family. A mark that does
 * not move when the name moves is the bug this file exists to prevent.
 */

import { describe, it, expect } from 'vitest';
import {
  CONSTRUCTIONS,
  constructionAvailable,
  constructionsFor,
  lettersFor,
} from '@/lib/blank/markFamily';
import { TIER_METHOD } from '@/lib/blank/producible';

const byId = (id: string) => CONSTRUCTIONS.find((c) => c.id === id)!;
const [DTF, SCREEN1, SCREEN2, EMB] = TIER_METHOD;

describe('letters are drawn from the name', () => {
  it('the initial is the first letter', () => {
    expect(lettersFor('BLANK', byId('initial'))).toBe('B');
    expect(lettersFor('ATLAS', byId('initial'))).toBe('A');
  });

  it('initials take one letter per word', () => {
    expect(lettersFor('TWO WORDS', byId('initials'))).toBe('TW');
    expect(lettersFor('a b c d', byId('initials'))).toBe('ABC');
  });

  it('two-letter constructions use initials when there are two words', () => {
    expect(lettersFor('TWO WORDS', byId('stacked'))).toBe('TW');
  });

  it('and fall back to the first two characters for a single word', () => {
    expect(lettersFor('BLANK', byId('stacked'))).toBe('BL');
  });

  it('a one-character name still yields two letters, so mirror and stack read', () => {
    expect(lettersFor('X', byId('mirror'))).toBe('XX');
  });

  it('EVERY construction changes when the name changes — that is the relation', () => {
    for (const c of CONSTRUCTIONS) {
      expect(lettersFor('BLANK', c)).not.toBe(lettersFor('ATLAS', c));
    }
  });

  it('never returns empty, so a mark always has something to draw', () => {
    for (const c of CONSTRUCTIONS) {
      expect(lettersFor('', c).length).toBeGreaterThan(0);
      expect(lettersFor('   ', c).length).toBeGreaterThan(0);
    }
  });
});

describe('deduplication', () => {
  it('drops Initials for a single-word name, because it equals Initial', () => {
    const ids = constructionsFor('BLANK').map((c) => c.id);
    expect(ids).toContain('initial');
    expect(ids).not.toContain('initials');
    expect(constructionsFor('BLANK')).toHaveLength(CONSTRUCTIONS.length - 1);
  });

  it('keeps Initials when the name has two words, because TW is not T', () => {
    const ids = constructionsFor('TWO WORDS').map((c) => c.id);
    expect(ids).toContain('initials');
    expect(constructionsFor('TWO WORDS')).toHaveLength(CONSTRUCTIONS.length);
  });

  it('never returns two cells that would draw identically', () => {
    for (const word of ['BLANK', 'TWO WORDS', 'X', 'A B C']) {
      const keys = constructionsFor(word).map(
        (c) =>
          `${lettersFor(word, c)}|${c.enclosure}|${!!c.stacked}|${!!c.mirrored}|${!!c.overlap}|${!!c.notched}`,
      );
      expect(new Set(keys).size).toBe(keys.length);
    }
  });
});

describe('production gating', () => {
  it('plain letterforms survive every method', () => {
    for (const id of ['initial', 'stacked', 'ligature', 'mirror']) {
      for (const m of [DTF, SCREEN1, SCREEN2, EMB]) {
        expect(constructionAvailable(byId(id), m).ok).toBe(true);
      }
    }
  });

  it('enclosed forms fail on one screen — the GAP closes, not the letter', () => {
    const r = constructionAvailable(byId('roundel'), SCREEN1);
    expect(r.ok).toBe(false);
    expect(r.reason).toMatch(/gap|closes|blob/i);
  });

  it('a solid block cannot be embroidered', () => {
    expect(constructionAvailable(byId('block'), EMB).ok).toBe(false);
    expect(constructionAvailable(byId('block'), EMB).reason).toMatch(/fill/i);
  });

  it('the notched roundel is the most constrained — DTF and two screens only', () => {
    expect(byId('notched-roundel').methods).toEqual(['dtf', 'screen2']);
  });

  it('every unavailable combination gives a reason', () => {
    for (const c of CONSTRUCTIONS) {
      for (const m of [DTF, SCREEN1, SCREEN2, EMB]) {
        const a = constructionAvailable(c, m);
        if (!a.ok) expect(a.reason && a.reason.length > 10).toBe(true);
      }
    }
  });

  it('at least one construction is makeable at every method', () => {
    for (const m of [DTF, SCREEN1, SCREEN2, EMB]) {
      expect(CONSTRUCTIONS.some((c) => constructionAvailable(c, m).ok)).toBe(true);
    }
  });
});

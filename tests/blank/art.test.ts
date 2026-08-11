/**
 * The three artwork slots.
 *
 * THE BUG THESE EXIST FOR. There was one slot, `customGraphic`, and four
 * generators writing to it: the drawn wordmark on 01, and the drawn mark, the
 * prompt graphic and the place graphic on 02. Generating a wordmark and then
 * keeping anything on the next screen threw the wordmark away silently, which
 * made generating one pointless — reported as "borderline useless", correctly.
 *
 * What is asserted here is that work carries forward: something made in one
 * beat is still there in the next, and appears on a garment even when the slot
 * it would normally come from is empty.
 */

import { describe, it, expect } from 'vitest';
import { LINE_DEFAULTS, frontArt, allArt, type LineConfig } from '@/lib/blank/lineState';

const cfg = (over: Partial<LineConfig> = {}): LineConfig => ({ ...LINE_DEFAULTS, ...over });
const art = (over: Partial<LineConfig['art']> = {}): LineConfig['art'] => ({
  wordmark: null,
  mark: null,
  graphic: null,
  ...over,
});

const W = 'https://x/storage/v1/object/public/blank-renders/w.jpg';
const M = 'https://x/storage/v1/object/public/blank-renders/m.jpg';
const G = 'https://x/storage/v1/object/public/blank-renders/g.jpg';

describe('frontArt', () => {
  it('is nothing when nothing has been made', () => {
    expect(frontArt(cfg())).toBeNull();
  });

  it('carries a wordmark made on 01 onto a garment, with no graphic anywhere', () => {
    // The whole complaint, as one assertion.
    expect(frontArt(cfg({ art: art({ wordmark: W }) }))).toBe(W);
  });

  it('keeps a wordmark AND a graphic — neither overwrites the other', () => {
    const c = cfg({ art: art({ wordmark: W, graphic: G }) });
    expect(c.art.wordmark).toBe(W);
    expect(frontArt(c)).toBe(G);
  });

  it('puts the wordmark on the chest when it is pointed at', () => {
    const c = cfg({ art: art({ wordmark: W, graphic: G }), frontPrint: 'wordmark' });
    expect(frontArt(c)).toBe(W);
  });

  it('falls back rather than showing a blank garment', () => {
    // frontPrint says wordmark, but only a mark was ever drawn.
    expect(frontArt(cfg({ art: art({ mark: M }), frontPrint: 'wordmark' }))).toBe(M);
  });

  it('still reads a line saved before the slots existed', () => {
    expect(frontArt(cfg({ customGraphic: G }))).toBe(G);
  });

  it('gives a variant its own print, and the line graphic where it has none', () => {
    const c = cfg({
      art: art({ graphic: G }),
      variants: [{ label: 'Asbury Park', graphic: M }, { label: 'Exit 9', graphic: null }],
    });
    expect(frontArt(c, 0)).toBe(M);
    expect(frontArt(c, 1)).toBe(G);
    // Out of range is not a crash and not a blank.
    expect(frontArt(c, 9)).toBe(G);
  });
});

describe('allArt', () => {
  it('lists only what was actually made', () => {
    expect(allArt(cfg())).toEqual([]);
    expect(allArt(cfg({ art: art({ wordmark: W, graphic: G }) }))).toEqual([
      { role: 'wordmark', url: W },
      { role: 'graphic', url: G },
    ]);
  });
});

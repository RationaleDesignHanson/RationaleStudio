/**
 * Sign lettering.
 *
 * These two functions are the whole reason the catalogue business is tractable:
 * the model draws a blank panel and the words are TYPE, so they are always
 * spelled right and cost nothing to change for the next place. Worth pinning,
 * because the failure they prevent — a misspelled sign — would be shipped once
 * per place rather than caught once.
 */

import { describe, it, expect } from 'vitest';
import { signLines, fittedSize } from '@/app/(public)/work/blank/SignArtwork';

describe('signLines', () => {
  it('splits on a slash and trims', () => {
    expect(signLines('MOLLY PITCHER / NJ')).toEqual(['MOLLY PITCHER', 'NJ']);
  });

  it('is one line when there is no slash', () => {
    expect(signLines('ASBURY PARK')).toEqual(['ASBURY PARK']);
  });

  it('drops empty segments rather than rendering a blank line', () => {
    expect(signLines('EXIT 9 //')).toEqual(['EXIT 9']);
    expect(signLines('  /  ')).toEqual([]);
    expect(signLines('')).toEqual([]);
  });

  it('caps at two lines — a guide sign is not a paragraph', () => {
    expect(signLines('A / B / C / D')).toEqual(['A', 'B']);
  });
});

describe('fittedSize', () => {
  it('shrinks as the longest line grows', () => {
    expect(fittedSize('NJ')).toBeGreaterThan(fittedSize('MOLLY PITCHER'));
    expect(fittedSize('MOLLY PITCHER')).toBeGreaterThan(fittedSize('THE PINE BARRENS AND BEYOND'));
  });

  it('measures the LONGEST line, not the total', () => {
    // Both lines matter; the short second line must not inflate the size.
    expect(fittedSize('MOLLY PITCHER / NJ')).toBe(fittedSize('MOLLY PITCHER'));
  });

  it('stays inside bounds the slider can also reach', () => {
    expect(fittedSize('X')).toBeLessThanOrEqual(20);
    expect(fittedSize('A'.repeat(48))).toBeGreaterThanOrEqual(4);
  });

  it('falls back to the default when there is nothing set', () => {
    expect(fittedSize('')).toBe(11);
  });
});

/**
 * BLANK — the identity system: name, symbol, lockup, and the usage rule.
 *
 * THE PROBLEM THIS FIXES. The symbol used to be six pieces of static artwork with
 * no relationship to the name. You could type BLANK and be offered an unrelated
 * ring. That is not an identity, it is two unrelated decisions presented as one,
 * and no amount of sequencing fixes it — a wordmark and a symbol that share
 * nothing are two brands.
 *
 * THE MONOGRAM is the relation. It is derived from the name and set in the SAME
 * treatment as the wordmark, so it inherits the face, the weight, the tracking and
 * every funky transform. Change the wordmark from serif to knockout and the glyph
 * changes with it. That is related BY CONSTRUCTION rather than by assertion, it is
 * deterministic, it costs nothing, and it works for any word — which the six fixed
 * marks can never do.
 *
 * The abstract marks remain, as a deliberate choice rather than the only one: a
 * symbol that shares nothing with the wordmark is a legitimate strategy (Nike's
 * swoosh owes the wordmark nothing), but it should be chosen, not defaulted into.
 *
 * THE USAGE RULE is not editorial, it is derived. A wordmark has a minimum legible
 * width; below it the letters close up on cloth. So the rule "glyph under 4in,
 * wordmark at 4in and above" is a consequence of the same width model that decides
 * whether a name clears the platen, and it tells you which asset goes on the
 * left chest and which goes across the front.
 */

import { estimateWidthInches, normalise, type Treatment } from './wordmark';

/**
 * Below this, a set wordmark stops being legible on cloth: letter strokes and
 * counters close up, and the tighter the tracking the sooner it happens. Same
 * class of claim as the platen ceiling — an engineering judgement, not a quote.
 */
export const MIN_WORDMARK_INCHES = 4;

export type SymbolKind = 'monogram' | 'mark' | 'none';

export interface Lockup {
  id: string;
  title: string;
  /** What it is for, in production terms. */
  use: string;
  /** Does this lockup put the wordmark on the garment? */
  usesWord: boolean;
  /** Does it put the symbol on the garment? */
  usesSymbol: boolean;
}

/**
 * Plainly named on purpose. These were "Wordmark only / Symbol only / Stacked /
 * Inline" behind a control labelled "Lockup", and the answer to "can I use the
 * logo, the wordmark, or both" stopped being findable — the capability was there
 * and the vocabulary hid it. Say what goes on the garment.
 */
export const LOCKUPS: Lockup[] = [
  {
    id: 'word',
    title: 'Wordmark only',
    use: 'Chest and back, where there is room to read it.',
    usesWord: true,
    usesSymbol: false,
  },
  {
    id: 'symbol',
    title: 'Mark only',
    use: 'Left chest, sleeve, cap front — anywhere under 4in.',
    usesWord: false,
    usesSymbol: true,
  },
  {
    id: 'stacked',
    title: 'Both — mark above',
    use: 'Mark over word. Reads as a crest; needs vertical room.',
    usesWord: true,
    usesSymbol: true,
  },
  {
    id: 'inline',
    title: 'Both — mark beside',
    use: 'Mark beside word. The widest option, so the first to blow the platen.',
    usesWord: true,
    usesSymbol: true,
  },
];

/**
 * The monogram: initials if the name has more than one word, otherwise the first
 * letter. Capped at three characters — four initials set large stops reading as a
 * glyph and starts reading as an acronym, which is a wordmark again.
 */
export function monogram(word: string): string {
  const w = normalise(word);
  if (!w) return 'B';
  const parts = w.split(' ').filter(Boolean);
  if (parts.length > 1) return parts.map((p) => p[0]).join('').slice(0, 3);
  return w[0];
}

/**
 * Width of a lockup, in inches, at a given cap height.
 *
 * Inline adds the symbol plus a space of roughly one symbol width; stacked is as
 * wide as its widest element. Deliberately approximate — this answers "does it
 * clear the platen", a question about inches.
 */
export function lockupWidthInches(
  word: string,
  t: Treatment,
  lockup: Lockup,
  capHeightInches = 1.6,
): number {
  const wordW = estimateWidthInches(word, t, capHeightInches);
  const symW = estimateWidthInches(monogram(word), t, capHeightInches);
  let w: number;
  if (lockup.id === 'word') w = wordW;
  else if (lockup.id === 'symbol') w = symW;
  else if (lockup.id === 'stacked') w = Math.max(wordW, symW);
  else w = wordW + symW * 1.6; // inline: symbol + gap
  return Math.round(w * 10) / 10;
}

export interface UsageRule {
  /** The asset to use below MIN_WORDMARK_INCHES. */
  small: string;
  /** The asset to use at and above it. */
  large: string;
  /** Stated as one sentence for the UI. */
  sentence: string;
}

/**
 * Which asset goes where. Derived, not written: if the wordmark cannot hold at
 * small sizes then the symbol has to carry those placements, and if there is no
 * symbol then those placements have nothing to put on them — which is a finding,
 * not a gap to paper over.
 */
export function usageRule(word: string, t: Treatment, symbol: SymbolKind): UsageRule {
  const hasSymbol = symbol !== 'none';
  const wordAtMin = estimateWidthInches(word, t, 1.0);

  if (!hasSymbol) {
    return {
      small: 'nothing',
      large: 'wordmark',
      sentence: `No mark, so anything under ${MIN_WORDMARK_INCHES}in has nothing to carry — the left chest, the sleeve and the cap front all go blank. That is the cost of a wordmark-only identity.`,
    };
  }

  const label = symbol === 'monogram' ? 'the monogram' : 'the mark';
  return {
    small: symbol === 'monogram' ? 'monogram' : 'symbol',
    large: 'wordmark',
    sentence: `Under ${MIN_WORDMARK_INCHES}in use ${label} — left chest, sleeve, cap front. At ${MIN_WORDMARK_INCHES}in and above use the wordmark, which needs about ${Math.max(wordAtMin, MIN_WORDMARK_INCHES)}in to stay legible on cloth.`,
  };
}

/**
 * Wordmark — one specimen at a time.
 *
 * This was a 2-up grid of six, then twelve, and both were wrong for the same
 * reason: a grid asks you to compare, and nobody compares twelve typefaces
 * simultaneously. You look at one, react, move on. So it is a carousel — one
 * specimen at the size you would actually judge it at, with a dropdown for direct
 * access when you already know which lane you want.
 *
 * Cycling IS choosing. There is no separate "select" button, because a carousel
 * whose current frame is not the selection needs the user to hold two ideas at
 * once (what I am looking at vs what I have picked) for no benefit.
 *
 * Set type, not a finished wordmark. Image models cannot spell — ask for a
 * seven-letter name and it comes back misspelled, differently wrong on every roll
 * — so the word is SET here, always correct and free to explore, and this becomes
 * the reference image stage two draws letterforms from. The model's job is drawing,
 * never spelling.
 *
 * Gating is per WORD: length x tracking decides whether it clears the 14in platen,
 * so a short name and a long one do not get the same options at the same budget.
 */

'use client';

import { useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex } from '@/lib/blank/line';
import {
  ALL_TREATMENTS,
  availability,
  lineCount,
  normalise,
  producibleCount,
  PLATEN_INCHES,
} from '@/lib/blank/wordmark';
import { gateLabel } from '@/lib/blank/producible';

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
const BUDGETS = STATES.map((s) => s.budget);

export function Wordmark() {
  const { config, set } = useLine();
  const tier = tierIndex(config.budget);
  const stop = STATES[tier];
  const word = normalise(config.wordmark);
  const makeable = producibleCount(word, tier);

  // The carousel cursor IS the selection. Nothing chosen yet reads as the first
  // treatment, and the first move commits it.
  const found = ALL_TREATMENTS.findIndex((t) => t.id === config.wordmarkStyle);
  const idx = found < 0 ? 0 : found;
  const t = ALL_TREATMENTS[idx];
  const av = availability(word, t, tier);
  const lines = lineCount(word, t);

  const move = useCallback(
    (n: number) => {
      const next = (n + ALL_TREATMENTS.length) % ALL_TREATMENTS.length;
      set('wordmarkStyle', ALL_TREATMENTS[next].id);
    },
    [set],
  );

  return (
    <div className="my-2">
      <p className="mb-4 text-[12px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
        <span style={{ color: 'var(--accent)' }}>{word || 'BLANK'}</span> at {word.length || 0}{' '}
        characters —{' '}
        <span style={{ color: 'var(--era-ink)' }}>
          {makeable} of {ALL_TREATMENTS.length}
        </span>{' '}
        treatments can be made at {money(stop.budget)}. Edit the name in the title above.
      </p>

      {/* The specimen, at a size worth judging. */}
      <div
        className="relative flex items-center justify-center px-10 py-12 overflow-hidden"
        style={{
          backgroundColor: 'var(--era-bg-deep)',
          minHeight: 'min(38vh, 320px)',
          outline: av.ok ? 'none' : '1px solid #A8456E',
          outlineOffset: '-1px',
        }}
      >
        <div
          className="max-w-full overflow-hidden"
          style={{
            opacity: av.ok ? 1 : 0.35,
            color: 'var(--era-ink)',
            fontSize: 'clamp(2rem, 7vw, 5rem)',
            lineHeight: 1.05,
            whiteSpace: 'nowrap',
            ...t.css,
          }}
        >
          {word || 'BLANK'}
        </div>
      </div>

      {/* Controls: arrows for browsing, a dropdown for going straight there. */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => move(idx - 1)}
          aria-label="Previous treatment"
          className="shrink-0 border p-1.5 transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => move(idx + 1)}
          aria-label="Next treatment"
          className="shrink-0 border p-1.5 transition-colors hover:border-[var(--accent)]"
          style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <label className="min-w-0">
          <span className="sr-only">Wordmark treatment</span>
          <select
            value={t.id}
            onChange={(e) => set('wordmarkStyle', e.target.value)}
            className="bg-transparent border px-2.5 py-1.5 text-[12px] font-mono uppercase tracking-wider outline-none focus:border-[var(--accent)]"
            style={{ borderColor: 'var(--era-hairline)', color: 'var(--era-ink)' }}
          >
            <optgroup label="Straight — choosing a face">
              {ALL_TREATMENTS.filter((x) => x.group === 'straight').map((x) => (
                <option key={x.id} value={x.id}>
                  {x.title}
                  {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
                </option>
              ))}
            </optgroup>
            <optgroup label="Funky — doing something to the type">
              {ALL_TREATMENTS.filter((x) => x.group === 'funky').map((x) => (
                <option key={x.id} value={x.id}>
                  {x.title}
                  {availability(word, x, tier).ok ? '' : ' (not at this budget)'}
                </option>
              ))}
            </optgroup>
          </select>
        </label>

        <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
          {idx + 1} / {ALL_TREATMENTS.length}
        </span>
      </div>

      {/* The verdict for the one on screen. */}
      <div className="mt-4 max-w-2xl">
        <div className="flex flex-wrap items-baseline gap-x-2.5">
          <h4 className="font-display text-lg" style={{ color: 'var(--era-ink)' }}>
            {t.title}
          </h4>
          <span
            className="text-[10px] font-mono uppercase tracking-wider"
            style={{ color: t.group === 'funky' ? 'var(--accent)' : 'var(--era-ink-muted)' }}
          >
            {t.group}
          </span>
          <span className="text-[11px] font-mono" style={{ color: 'var(--era-ink-muted)' }}>
            ~{av.widthInches}in{lines > 1 ? ` · ${lines} lines` : ''}
          </span>
          {!av.ok && (
            <span
              className="text-[10px] font-mono uppercase tracking-wider"
              style={{ color: av.overPlaten ? '#A8456E' : 'var(--era-ink-muted)' }}
            >
              {av.overPlaten ? 'over platen' : gateLabel(av.availableAt, tier, money, BUDGETS)}
            </span>
          )}
        </div>
        <p className="text-[13px] mt-1.5" style={{ color: av.ok ? 'var(--era-ink-body)' : '#A8456E' }}>
          {av.ok ? t.lane : av.reason}
        </p>
      </div>

      <p className="mt-6 text-[12px] max-w-2xl" style={{ color: 'var(--era-ink-muted)' }}>
        Set type, not a finished wordmark — the drawn letterforms come next, and this specimen is
        what they get drawn from, which is what keeps the spelling right. Widths are approximate at a
        1.6in cap height; {PLATEN_INCHES}in is the standard platen and larger needs jumbo frames
        Stage 0 does not budget for.
      </p>
    </div>
  );
}

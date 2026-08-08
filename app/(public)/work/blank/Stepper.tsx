/**
 * The stepper — one beat on screen at a time.
 *
 * WHY THIS REPLACED THE SCROLLING PAGE. The page used a single interaction
 * pattern eight times: a simultaneous grid asking "compare N things and pick".
 * 56 buttons across 9.2 viewports, 19 of them in one chapter. Trimming that page
 * still asks the reader to do the most expensive cognitive task on the list,
 * eight times in a row, with no change of mode and no rest.
 *
 * The deeper reason is that this stopped being a page and became a TOOL. A
 * reader wants overview; two people operating something across sessions want one
 * decision in front of them and a record of what is already settled. Review 10
 * defended the grids as comparison instruments, and that was right for a document
 * being read — it is wrong for an instrument being used. The record it needs is
 * the progress rail, which already existed.
 *
 * The one deliberate exception is the direction bake-off, which keeps its 6-up
 * grid: its own caption says "judge the racks, not the tees", so comparison IS
 * the task there. Every other beat shows one thing.
 *
 * SEMANTICS. Not a tablist — the beats are an ordered flow with a next and a
 * back, not parallel views of one thing. Inactive beats are removed from the DOM
 * rather than hidden, so a screen reader is never walked through eight sections
 * of which seven are irrelevant, and so 30-odd images below the fold are never
 * requested. The cost is that find-in-page only searches the current beat, which
 * is the honest trade for a tool.
 */

'use client';

import { useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex, lineTotals } from '@/lib/blank/line';
import { DIRECTION_LABELS } from './BrandBakeoff';
import { normalise, ALL_TREATMENTS } from '@/lib/blank/wordmark';

export interface Beat {
  n: string;
  short: string;
  title: string;
  note: string;
}

export const BEATS: Beat[] = [
  {
    n: '01',
    short: 'Name',
    title: 'Name it',
    note: 'Type anything. It is set in real type, so it is always spelled correctly and costs nothing to try.',
  },
  {
    n: '02',
    short: 'Symbol',
    title: 'Or a symbol',
    note: 'The artwork on its own, one candidate at a time — keep it or pass. What it looks like made comes after the direction is set.',
  },
  {
    n: '03',
    short: 'Direction',
    title: 'Which direction',
    note: 'Six aesthetics, judged on the rack. Quiet flex is the control.',
  },
  {
    n: '04',
    short: 'Budget',
    title: 'The budget',
    note: 'Now the constraint. Quiet is expensive to make and loud is cheap — drag it and watch what you chose above move in and out of reach.',
  },
  {
    n: '05',
    short: 'The line',
    title: 'Your line',
    note: 'Setup is charged once across the collection, so the line costs less than the sum of its garments.',
  },
  {
    n: '06',
    short: 'Expansion',
    title: 'How it expands',
    note: 'Now that the direction is set, here is the name and the mark applied — the family, and where it breaks.',
  },
  {
    n: '07',
    short: 'Standing',
    title: 'Where this stands',
    note: 'Settled, open, and unverified. Read this before you believe any number above.',
  },
];

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;
export const clampStep = (n: string) => {
  const i = BEATS.findIndex((b) => b.n === n);
  return i < 0 ? 0 : i;
};

export function Stepper() {
  const { config, set, skus } = useLine();
  const i = clampStep(config.step);
  const go = useCallback((idx: number) => {
    const next = BEATS[Math.min(BEATS.length - 1, Math.max(0, idx))];
    set('step', next.n);
    // A new beat is a new screen: start at its top rather than inheriting the
    // previous beat's scroll offset.
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [set]);

  // Left/right arrows move between beats, but never while typing — the name
  // field is on beat 01 and arrowing inside it must not navigate away.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowRight') go(i + 1);
      if (e.key === 'ArrowLeft') go(i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go]);

  const stop = STATES[tierIndex(config.budget)];
  const totals = skus.length ? lineTotals(skus) : null;

  // Only what is actually settled. An omitted item says "not yet"; a dash would
  // read as a value.
  const decided: { label: string; value: string; alert?: boolean }[] = [
    { label: 'Name', value: normalise(config.wordmark) || 'BLANK' },
    { label: 'Budget', value: money(stop.budget) },
  ];
  if (config.wordmarkStyle) {
    decided.push({
      label: 'Type',
      value: ALL_TREATMENTS.find((t) => t.id === config.wordmarkStyle)?.title ?? config.wordmarkStyle,
    });
  }
  if (config.direction) {
    decided.push({ label: 'Direction', value: DIRECTION_LABELS[config.direction] ?? config.direction });
  }
  if (config.graphic) {
    decided.push({
      // Marks are M-*, library graphics are G-*: strip either prefix, or the rail
      // reads "M seal".
      label: 'Symbol',
      value: config.graphic.replace(/^[GM]-/, '').replace(/-/g, ' '),
    });
  }
  if (totals) {
    decided.push({ label: 'SKUs', value: String(skus.length) });
    decided.push({
      label: 'Margin',
      value: `${(totals.blendedMargin * 100).toFixed(1)}%`,
      alert: totals.blendedMargin < 0.6,
    });
  }

  return (
    <nav
      aria-label="Progress and current line state"
      className="sticky top-0 md:top-[65px] z-40 border-b backdrop-blur"
      style={{
        borderColor: 'var(--era-hairline)',
        backgroundColor: 'color-mix(in srgb, var(--era-bg) 92%, transparent)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* What the two of you have settled. Scrolls rather than wraps — a second
            row costs fold height the beats cannot spare. */}
        <div
          className="flex gap-x-4 items-baseline pt-2 pb-1.5 text-[11px] font-mono overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ color: 'var(--era-ink-muted)', overscrollBehaviorX: 'contain' }}
        >
          {decided.map((d) => (
            <span key={d.label} className="whitespace-nowrap">
              {d.label} <span style={{ color: d.alert ? '#A8456E' : 'var(--era-ink)' }}>{d.value}</span>
            </span>
          ))}
        </div>

        {/* Progress + prev/next. The steps are buttons, not anchors: there is no
            longer a fragment to link to, because inactive beats are not in the DOM. */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => go(i - 1)}
            disabled={i === 0}
            aria-label="Previous step"
            className="shrink-0 disabled:opacity-25 transition-opacity"
            style={{ color: 'var(--era-ink)' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            className="flex gap-4 overflow-x-auto flex-1 min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ overscrollBehaviorX: 'contain' }}
          >
            {BEATS.map((b, idx) => {
              const on = idx === i;
              const done = idx < i;
              return (
                <button
                  key={b.n}
                  onClick={() => go(idx)}
                  aria-current={on ? 'step' : undefined}
                  className="shrink-0 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2 pb-0.5"
                  style={{
                    color: on ? 'var(--accent)' : done ? 'var(--era-ink)' : 'var(--era-ink-muted)',
                    borderColor: on ? 'var(--accent)' : 'transparent',
                  }}
                >
                  <span className="mr-1.5" style={{ opacity: 0.6 }}>
                    {b.n}
                  </span>
                  {b.short}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => go(i + 1)}
            disabled={i === BEATS.length - 1}
            aria-label="Next step"
            className="shrink-0 disabled:opacity-25 transition-opacity"
            style={{ color: 'var(--era-ink)' }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </nav>
  );
}

/** The bottom control, so you never have to scroll back up to advance. */
export function StepFooter() {
  const { config, set } = useLine();
  const i = clampStep(config.step);
  const go = (idx: number) => {
    set('step', BEATS[Math.min(BEATS.length - 1, Math.max(0, idx))].n);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
  const next = BEATS[i + 1];
  const prev = BEATS[i - 1];

  return (
    <div
      className="mt-10 pt-5 border-t flex items-center justify-between gap-4"
      style={{ borderColor: 'var(--era-hairline)' }}
    >
      {prev ? (
        <button
          onClick={() => go(i - 1)}
          className="text-[12px] font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          <ChevronLeft className="w-3.5 h-3.5" /> {prev.short}
        </button>
      ) : (
        <span />
      )}
      {next ? (
        <button
          onClick={() => go(i + 1)}
          className="text-[13px] font-mono uppercase tracking-wider inline-flex items-center gap-1.5 border px-3 py-1.5 transition-colors hover:border-[var(--accent)]"
          style={{ color: 'var(--accent)', borderColor: 'var(--era-hairline)' }}
        >
          {next.short} <ChevronRight className="w-3.5 h-3.5" />
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

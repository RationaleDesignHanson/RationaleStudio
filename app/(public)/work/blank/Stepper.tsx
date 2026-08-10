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

import { useCallback, useEffect, useState } from 'react';
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
  /**
   * Overrides for the catalogue business, where a beat asks the same question
   * and has a different answer. Beat 02 is the whole reason this exists: "how
   * it looks as a mark / marks built from the name" is precisely wrong for a
   * line whose product is a graphic per place and whose mark is on the neck.
   */
  scale?: { short?: string; title?: string; note?: string };
}

/** The beat, as it reads for the chosen business. */
export function beatFor(b: Beat, strategy: string): Beat {
  return strategy === 'scale' && b.scale ? { ...b, ...b.scale } : b;
}

/**
 * BEAT 04 WAS SPLIT. It measured 4.5 screens on a 390px phone and 5.0 on a 360px
 * one, against ≤3 for every other beat, because it carried four owners: the
 * placement axis, the three garment close-ups, the direction bake-off and the
 * deviation render. Two different jobs were stacked in one screen — laying the
 * mark out on the range (free, instant, vector) and photographing it in a chosen
 * aesthetic (a paid render). They are now 04 and 05.
 *
 * This renumbers everything after it, so an old share link with `st=05` lands on
 * the render beat rather than the cost sheet. Everything else in the link still
 * resolves; only the beat you arrive at moved.
 */
export const BEATS: Beat[] = [
  {
    n: '01',
    short: 'Name',
    title: 'Name it',
    note: 'The word, and the face it is set in. Real type, so it is always spelled correctly and costs nothing to try.',
  },
  {
    n: '02',
    short: 'As a mark',
    title: 'How it looks as a mark',
    note: 'Marks built from the name in the face you picked. Shuffle for a different set, then draw the one you like properly.',
    scale: {
      short: 'The graphic',
      title: 'What goes on each one',
      note: 'A place, a voice, six takes. You are designing the format rather than one graphic, because it has to run for every place in the catalogue.',
    },
  },
  {
    n: '03',
    short: 'Colour',
    title: 'What colour is it',
    note: 'Six colourways of one garment carrying one mark, so colour is the only variable. Stage 0 allows two per style.',
  },
  {
    n: '04',
    short: 'Applied',
    title: 'On the clothes',
    note: 'Where the mark sits and how big, across all three garments at once. Nothing here costs a render.',
  },
  {
    n: '05',
    short: 'Direction',
    title: 'Make a real one',
    note: 'Pick the aesthetic it lives in, then generate an actual photograph of it. This is the part that spends.',
  },
  {
    n: '06',
    short: 'Costs',
    title: 'Dial in the costs',
    // Deliberately says nothing about setup amortising. That is true of the
    // considered line and false of the catalogue, and the sheet itself now
    // states whichever one applies.
    note: 'The line, specced style by style — what each one costs to make, what it lists at, and what the whole buy comes to.',
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

  // The settled-state row is the second thing you want on arriving at a beat and
  // the last thing you want while working in one. It was pinned all the way down,
  // and on a 390px phone the stepper cost 84px of permanent chrome — a tenth of
  // the viewport, in a beat that already ran past the fold. It now rolls up once
  // you are past the top and comes back when you return, or when you change beat
  // (which scrolls to top). Desktop keeps both rows: it has the height.
  const [rolled, setRolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        // Hysteresis, or a stepper sitting exactly on the threshold flickers as
        // the row's own collapse changes the scroll position.
        setRolled((was) => (was ? window.scrollY > 32 : window.scrollY > 72));
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

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
  if (config.mark) {
    decided.push({
      // Marks are M-*, library graphics are G-*: strip either prefix, or the rail
      // reads "M seal".
      label: 'Symbol',
      value: config.mark.replace(/^[GM]-/, '').replace(/-/g, ' '),
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
            row costs fold height the beats cannot spare — and rolls away entirely
            on a phone once you are working. `grid-rows-[0fr]` collapses without a
            magic max-height, so the row can be any number of chips tall. */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-200 md:grid-rows-[1fr] md:opacity-100 ${
            rolled ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'
          }`}
          aria-hidden={rolled ? true : undefined}
        >
          {/* min-h-0 + overflow-hidden are what make the 0fr row actually clip. */}
          <div className="min-h-0 overflow-hidden">
            <div
              className="flex gap-x-4 items-baseline pt-2 pb-1.5 text-[12px] sm:text-[11px] font-mono overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ color: 'var(--era-ink-muted)', overscrollBehaviorX: 'contain' }}
            >
              {decided.map((d) => (
                <span key={d.label} className="whitespace-nowrap">
                  {d.label} <span style={{ color: d.alert ? '#A8456E' : 'var(--era-ink)' }}>{d.value}</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Progress + prev/next. The steps are buttons, not anchors: there is no
            longer a fragment to link to, because inactive beats are not in the DOM. */}
        <div className="flex items-center gap-3 pb-2">
          <button
            onClick={() => go(i - 1)}
            disabled={i === 0}
            aria-label="Previous step"
            className="tap shrink-0 disabled:opacity-25 transition-opacity"
            style={{ color: 'var(--era-ink)' }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div
            className="flex gap-4 overflow-x-auto flex-1 min-w-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            style={{ overscrollBehaviorX: 'contain' }}
          >
            {BEATS.map((raw, idx) => {
              const b = beatFor(raw, config.strategy);
              const on = idx === i;
              const done = idx < i;
              return (
                <button
                  key={b.n}
                  onClick={() => go(idx)}
                  aria-current={on ? 'step' : undefined}
                  className="tap shrink-0 text-[12px] sm:text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2 pb-0.5"
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
            className="tap shrink-0 disabled:opacity-25 transition-opacity"
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
  const next = BEATS[i + 1] && beatFor(BEATS[i + 1], config.strategy);
  const prev = BEATS[i - 1] && beatFor(BEATS[i - 1], config.strategy);

  return (
    <div
      className="mt-10 pt-5 border-t flex items-center justify-between gap-4"
      style={{ borderColor: 'var(--era-hairline)' }}
    >
      {prev ? (
        <button
          onClick={() => go(i - 1)}
          className="tap text-[13px] sm:text-[12px] font-mono uppercase tracking-wider inline-flex items-center gap-1.5"
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

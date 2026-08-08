/**
 * The chapter rail — horizontal navigation, and the state of the line.
 *
 * Two jobs in one strip, because they are the same question. A partner arriving
 * at a shared link needs to know where they are in the sequence AND what has
 * already been decided; the page previously answered neither. Six chapters at
 * the same visual weight with no persistent summary is why it read as long and
 * shapeless rather than as a sequence of moves.
 *
 * It scrolls horizontally on narrow viewports rather than wrapping or
 * collapsing to a burger: the chapters are an ORDER, and a horizontal strip is
 * the only form that keeps the order legible. This is the "horizontal nav"
 * without turning the document sideways — review 10's objection was to
 * horizontal SCROLLING of content, not to a horizontal control.
 *
 * `scrollend` is not used here. Chapter tracking needs a position, not a
 * gesture, so it reads scroll position directly against the chapter offsets.
 */

'use client';

import { useEffect, useState } from 'react';
import { useLine } from '@/lib/blank/lineState';
import { STATES, tierIndex, lineTotals } from '@/lib/blank/line';
import { DIRECTION_LABELS } from './BrandBakeoff';
import { normalise, TREATMENTS } from '@/lib/blank/wordmark';

export interface Chapter {
  id: string;
  n: string;
  short: string;
}

export const CHAPTERS: Chapter[] = [
  { id: 'ch-01', n: '01', short: 'Wordmark' },
  { id: 'ch-02', n: '02', short: 'Budget' },
  { id: 'ch-03', n: '03', short: 'Direction' },
  { id: 'ch-04', n: '04', short: 'Symbol' },
  { id: 'ch-05', n: '05', short: 'Expansion' },
  { id: 'ch-06', n: '06', short: 'The line' },
  { id: 'ch-07', n: '07', short: 'Archive' },
  { id: 'ch-08', n: '08', short: 'Standing' },
];

const money = (n: number) => `$${(n / 1000).toFixed(0)}k`;

export function ChapterRail() {
  const { config, skus } = useLine();
  const [current, setCurrent] = useState('ch-01');

  useEffect(() => {
    // Sticky header is 65px; a chapter counts as current once its top passes
    // just under it, which matches what the reader perceives as "in view".
    const onScroll = () => {
      let active = CHAPTERS[0].id;
      for (const c of CHAPTERS) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= 140) active = c.id;
      }
      setCurrent(active);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stop = STATES[tierIndex(config.budget)];
  const totals = skus.length ? lineTotals(skus) : null;

  // Only decisions actually taken are shown. An empty slot is information —
  // it says "you have not chosen a mark yet" — but a placeholder dash would
  // read as a value, so the whole item is omitted instead.
  const decided: { label: string; value: string; alert?: boolean }[] = [
    { label: 'Name', value: normalise(config.wordmark) || 'BLANK' },
    { label: 'Budget', value: money(stop.budget) },
    { label: 'Direction', value: DIRECTION_LABELS[config.direction] ?? config.direction },
  ];
  if (config.wordmarkStyle) {
    decided.push({
      label: 'Type',
      value: TREATMENTS.find((t) => t.id === config.wordmarkStyle)?.title ?? config.wordmarkStyle,
    });
  }
  if (config.graphic) {
    decided.push({ label: 'Mark', value: config.graphic.replace(/^G-/, '').replace(/-/g, ' ') });
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
      aria-label="Chapters and current line state"
      className="sticky top-0 md:top-[65px] z-40 border-b backdrop-blur"
      style={{
        borderColor: 'var(--era-hairline)',
        backgroundColor: 'color-mix(in srgb, var(--era-bg) 88%, transparent)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* State summary — what the two of you have settled */}
        {/* Scrolls rather than wraps: wrapping to a second row cost 27px of
            fold on a phone, which the budget lever cannot spare. */}
        <div
          className="flex gap-x-4 items-baseline pt-2 pb-1.5 text-[11px] font-mono overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ color: 'var(--era-ink-muted)', overscrollBehaviorX: 'contain' }}
        >
          {decided.map((d) => (
            <span key={d.label} className="whitespace-nowrap">
              {d.label}{' '}
              <span style={{ color: d.alert ? '#A8456E' : 'var(--era-ink)' }}>{d.value}</span>
            </span>
          ))}
          {!config.graphic && !config.wordmarkStyle && (
            <span className="whitespace-nowrap" style={{ color: 'var(--accent)' }}>
              no mark chosen yet
            </span>
          )}
        </div>

        {/* The chapters, in order. Horizontal, and scrolls rather than wraps. */}
        <div
          className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ overscrollBehaviorX: 'contain' }}
        >
          {CHAPTERS.map((c) => {
            const on = current === c.id;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                aria-current={on ? 'true' : undefined}
                className="shrink-0 text-[11px] font-mono uppercase tracking-wider transition-colors border-b-2 pb-0.5"
                style={{
                  color: on ? 'var(--accent)' : 'var(--era-ink-muted)',
                  borderColor: on ? 'var(--accent)' : 'transparent',
                }}
              >
                <span style={{ opacity: 0.6 }}>{c.n}</span> {c.short}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

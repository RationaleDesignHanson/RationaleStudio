/**
 * ChapterRow — case-study chapter formatted to mirror the work-row chrome.
 *
 * Accent stripe + numeral on the left, kicker + title + body content on
 * the right. Stays inside max-w-5xl. No marginalia asides; the chapter
 * is the unit. Reads as one visual family with the WorkViewer rows on
 * the home page.
 *
 * Colors come from CSS vars set by:
 *   ProjectScope  → --accent (per-project tint)
 *   .era-${theme} → --era-bg, --era-ink, --era-ink-body, --era-ink-muted, --era-hairline
 *
 * Wrap the page main in `era-now | era-meta | era-maker` to pick up the
 * era's bg + ink + hairline. The accent stripe + numeral always use the
 * project accent so the case study links visually to its work-index row.
 */

'use client';

import { type ReactNode } from 'react';

interface ChapterRowProps {
  index: string;
  kicker: string;
  title: string;
  children: ReactNode;
}

export function ChapterRow({ index, kicker, title, children }: ChapterRowProps) {
  return (
    <section
      className="px-4 sm:px-6 md:px-8 py-8 md:py-12 border-t"
      style={{ borderColor: 'var(--era-hairline, var(--hairline))' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-4 md:mb-0">
            <span
              className="block w-[3px] self-stretch min-h-[2.5rem] md:min-h-[3rem]"
              style={{ backgroundColor: 'var(--accent)' }}
              aria-hidden
            />
            <span
              className="font-mono text-base sm:text-lg md:text-xl tracking-wider tabular-nums leading-none"
              style={{ color: 'var(--accent)' }}
            >
              {index}
            </span>
          </div>
          <div className="md:col-span-10">
            <p
              className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2"
              style={{ color: 'var(--accent)' }}
            >
              {kicker}
            </p>
            <h2
              className="font-display text-2xl md:text-3xl leading-tight mb-4"
              style={{ color: 'var(--era-ink, var(--ink))' }}
            >
              {title}
            </h2>
            <div
              className="text-base md:text-lg leading-relaxed space-y-4 max-w-3xl"
              style={{ color: 'var(--era-ink-body, var(--ink-body))' }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

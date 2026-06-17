/**
 * WorkIndex — single-style, all-eras-visible work index.
 *
 * Replaces the old parallax-merge WorkViewer (+ WorkViewerMobile). Every
 * era renders stacked in ONE continuous Studio Monograph (paper + serif)
 * page — normal scroll, no pinning, no crossfade, no per-era art
 * direction. Same implementation on mobile and desktop.
 *
 * Wayfinding: a sticky jump-nav (NOW / LEADER / DIRECTOR) pins under the
 * site header, highlights the active era via scroll-spy, and smooth-jumps
 * on click. Each era keeps only a FAINT accent (its label tick + row
 * numerals) so the three-chapter story still reads without three worlds.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';

export interface WorkProject {
  href: string;
  /** Display numeral, e.g. "01" or "✱". */
  index: string;
  title: string;
  blurb: string;
  meta?: string;
  gated?: boolean;
  /** Optional per-project accent (overrides the era accent on the numeral). */
  accentVar?: string;
}

export interface WorkEra {
  /** Anchor id + scroll-spy key, e.g. "now". */
  id: string;
  /** Short label shown in the nav and as the era heading, e.g. "NOW". */
  label: string;
  years: string;
  /** Sub-line under the era heading (role line for NOW, tagline elsewhere). */
  note?: string;
  /** Faint accent color (CSS) for this era's label tick + numerals. */
  accent?: string;
  projects: WorkProject[];
}

interface WorkIndexProps {
  eras: WorkEra[];
}

// Sticky offsets mirror the site Header: mobile utility bar is h-11
// (2.75rem); desktop header sits at top-0 and is ~4rem tall.
const STICKY_TOP = 'top-11 md:top-16';
// Sections must clear the header + the jump-nav when anchor-scrolled.
const SCROLL_MARGIN = 'scroll-mt-[6.5rem] md:scroll-mt-[7.5rem]';

export function WorkIndex({ eras }: WorkIndexProps) {
  const [activeId, setActiveId] = useState(eras[0]?.id ?? '');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll-spy: the era whose top crosses a thin band near the top of
  // the viewport (just under the sticky chrome) becomes active.
  useEffect(() => {
    const els = eras
      .map((e) => sectionRefs.current[e.id])
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId((entry.target as HTMLElement).id);
          }
        }
      },
      // Active band sits between 18% and 60% down the viewport.
      { rootMargin: '-18% 0px -40% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [eras]);

  const jumpTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="era-now bg-paper">
      {/* STICKY JUMP-NAV — pins under the site header, tracks position. */}
      <nav
        aria-label="Jump to era"
        className={`sticky ${STICKY_TOP} z-30 border-b border-hairline bg-paper/95 backdrop-blur-sm`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
          <ul className="flex items-stretch gap-5 sm:gap-8 overflow-x-auto">
            {eras.map((era) => {
              const isActive = era.id === activeId;
              return (
                <li key={era.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => jumpTo(era.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group relative flex items-baseline gap-2 py-3 transition-colors"
                  >
                    <span
                      className="font-mono text-[11px] md:text-xs tracking-[0.25em] uppercase transition-colors"
                      style={{ color: isActive ? 'var(--ink)' : 'var(--ink-muted)' }}
                    >
                      {era.label}
                    </span>
                    <span
                      className="hidden sm:inline font-mono text-[10px] tracking-wide tabular-nums transition-opacity"
                      style={{
                        color: 'var(--ink-muted)',
                        opacity: isActive ? 0.8 : 0.4,
                      }}
                    >
                      {era.years}
                    </span>
                    {/* Active underline in the era's faint accent. */}
                    <span
                      aria-hidden
                      className="absolute left-0 right-0 -bottom-px h-0.5 origin-left transition-transform duration-300"
                      style={{
                        backgroundColor: era.accent ?? 'var(--accent-ink)',
                        transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      }}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* ERA SECTIONS — all rendered, plain stacked scroll. */}
      {eras.map((era) => (
        <section
          key={era.id}
          id={era.id}
          ref={(el) => {
            sectionRefs.current[era.id] = el;
          }}
          className={`px-4 sm:px-6 md:px-8 py-10 md:py-14 border-b border-hairline ${SCROLL_MARGIN}`}
          aria-label={`${era.label} era`}
        >
          <div className="max-w-6xl mx-auto">
            <EraHeading era={era} />
            <div className="mt-6 md:mt-8">
              {era.projects.map((project) => (
                <WorkRow
                  key={project.href}
                  project={project}
                  eraAccent={era.accent}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function EraHeading({ era }: { era: WorkEra }) {
  const accent = era.accent ?? 'var(--accent-ink)';
  return (
    <header className="border-b border-hairline pb-4 md:pb-5">
      <div className="flex items-end justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          {/* Faint era accent tick — the only color in the heading. */}
          <span
            aria-hidden
            className="block h-7 md:h-9 w-1 rounded-full shrink-0"
            style={{ backgroundColor: accent }}
          />
          <h2 className="font-display text-3xl md:text-5xl leading-none text-ink truncate">
            {era.label}
          </h2>
        </div>
        <span className="font-mono text-[11px] md:text-sm tracking-wide tabular-nums text-ink-muted whitespace-nowrap pb-1">
          {era.years}
        </span>
      </div>
      {era.note && (
        <p className="mt-3 text-sm md:text-base text-ink-muted leading-relaxed max-w-2xl">
          {era.note}
        </p>
      )}
    </header>
  );
}

function WorkRow({
  project,
  eraAccent,
}: {
  project: WorkProject;
  eraAccent?: string;
}) {
  const { href, index, title, blurb, meta, gated, accentVar } = project;
  // Project accent wins; otherwise the era's faint accent; else muted ink.
  const accent = accentVar ?? eraAccent ?? 'var(--ink-muted)';
  return (
    <div className="group relative border-t border-hairline first:border-t-0">
      <Link
        href={href}
        className="block py-6 md:py-7 px-4 md:px-5 -mx-4 md:-mx-5 transition-colors hover:bg-paper-deep"
      >
        <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span
              className="block w-[3px] self-stretch min-h-[2.25rem] md:min-h-[2.5rem]"
              style={{ backgroundColor: accent }}
              aria-hidden
            />
            <span
              className="font-mono text-base sm:text-lg md:text-xl tracking-wider tabular-nums leading-none"
              style={{ color: accent }}
            >
              {index}
            </span>
            {gated && (
              <Lock
                className="w-3.5 h-3.5 flex-shrink-0 text-ink-muted"
                aria-label="confidential"
              />
            )}
          </div>
          <div className="md:col-span-7">
            {meta && (
              <p
                className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2"
                style={{ color: accent }}
              >
                {meta}
              </p>
            )}
            <h3 className="font-display text-xl md:text-2xl leading-tight mb-2 text-ink transition-colors group-hover:text-[var(--accent-ink)] flex items-baseline gap-2">
              {title}
            </h3>
            <p className="text-sm md:text-base leading-relaxed max-w-2xl text-ink-body">
              {blurb}
            </p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <ArrowRight className="w-4 h-4 text-ink-muted transition-all duration-300 group-hover:text-[var(--accent-ink)] group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </div>
  );
}

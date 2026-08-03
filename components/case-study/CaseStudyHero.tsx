import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { type ReactNode } from 'react';

interface CaseStudyHeroProps {
  backHref?: string;
  backLabel?: string;
  index: ReactNode;
  total?: ReactNode;
  badge?: ReactNode;
  era?: ReactNode;
  years: ReactNode;
  title: ReactNode;
  children: ReactNode;
  extra?: ReactNode;
}

/**
 * Case-study hero — project index, era, years, title, and subtitle.
 *
 * Mobile: metadata collapses to a single compact line so the chrome doesn't
 * dominate the viewport. Desktop keeps the original stacked index/era/years
 * treatment.
 */
export function CaseStudyHero({
  backHref = '/work',
  backLabel = 'Back to work',
  index,
  total,
  badge,
  era,
  years,
  title,
  children,
  extra,
}: CaseStudyHeroProps) {
  return (
    <section
      className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-7 border-b-2"
      style={{ borderColor: 'var(--accent)' }}
    >
      <div className="max-w-5xl mx-auto">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
        </Link>

        <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
          <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
            <div className="flex items-stretch gap-3">
              <span
                className="block w-[3px] self-stretch min-h-[1.75rem] md:min-h-[5rem]"
                style={{ backgroundColor: 'var(--accent)' }}
                aria-hidden
              />
              {/* Mobile: single compact metadata line. Desktop: stacked. */}
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 leading-none md:flex-col md:gap-0">
                <span
                  className="font-mono text-2xl md:text-5xl tracking-tight tabular-nums"
                  style={{ color: 'var(--accent)' }}
                >
                  {index}
                </span>
                {total && (
                  <>
                    <span className="md:hidden text-[var(--era-ink-muted)]" aria-hidden>·</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] md:mt-1">
                      / {total}
                    </span>
                  </>
                )}
                {badge && (
                  <>
                    <span className="md:hidden text-[var(--era-ink-muted)]" aria-hidden>·</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] inline-flex items-center gap-1 md:mt-1">
                      {badge}
                    </span>
                  </>
                )}
                {era && (
                  <>
                    <span className="md:hidden text-[var(--era-ink-muted)]" aria-hidden>·</span>
                    <span className={`font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] ${total ? 'md:mt-2' : 'md:mt-1'}`}>
                      ERA · {era}
                    </span>
                  </>
                )}
                <span className="md:hidden text-[var(--era-ink-muted)]" aria-hidden>·</span>
                <span
                  className="font-mono text-caption tracking-[0.25em] uppercase md:mt-0.5"
                  style={{ color: 'var(--accent)' }}
                >
                  {years}
                </span>
              </div>
            </div>
          </div>
          <div className="md:col-span-10 max-w-3xl">
            <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
              {title}
            </h1>
            <div className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
              {children}
            </div>
            {extra}
          </div>
        </div>
      </div>
    </section>
  );
}

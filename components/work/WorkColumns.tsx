/**
 * WorkColumns — the era "chapters" (NOW / LEADER / DIRECTOR) as side-by-side
 * columns that fit one desktop viewport (adaptive stack on mobile), fronted by
 * a slim masthead. Replaces the long stacked scroll of <WorkIndex> on the home
 * page. Reuses the WorkIndex visual language (accent stripe + numeral + serif
 * title + mono meta) in a compact, height-distributing form.
 *
 * Presentational only (no client state) so it can render server-side on the
 * home page; the /home-lab experiment wraps it with a variant toggle that
 * flips `showMasthead` / `showBlurb`.
 */

import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { WorkEra, WorkProject } from '@/lib/content/eras';

// Desktop sticky header is ~4rem tall (mirrors WorkIndex's top-16 offset);
// size the columns region to the rest of the viewport so the chapters fit with
// no scroll. On mobile the height cap is dropped and columns stack.
const VIEWPORT_FILL = 'md:h-[calc(100svh-4rem)] md:overflow-hidden';

export function WorkColumns({
  eras,
  showMasthead = true,
  showBlurb = true,
  fitViewport = true,
}: {
  eras: WorkEra[];
  showMasthead?: boolean;
  showBlurb?: boolean;
  /** Fill one desktop viewport (home). Set false when the columns sit inside a
      longer scrolling page (e.g. /work has a hero above + footer below). */
  fitViewport?: boolean;
}) {
  return (
    <div className="era-now bg-paper text-ink-body">
      <div className={`flex flex-col ${fitViewport ? VIEWPORT_FILL : ''}`}>
        {showMasthead && <Masthead />}

        <div className="grid min-h-0 flex-1 grid-cols-1 md:grid-cols-3 md:gap-px md:bg-hairline">
          {eras.map((era) => (
            <EraColumn key={era.id} era={era} showBlurb={showBlurb} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Masthead() {
  return (
    <header className="border-b border-hairline px-5 pb-4 pt-6 md:px-8">
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.35em] text-ink-muted">
        Rationale
      </p>
      <h2 className="max-w-4xl font-display leading-[1.08] text-ink text-[clamp(1.5rem,3.4vh,2.4rem)]">
        Vision bears the burden of proof.
      </h2>
    </header>
  );
}

function EraColumn({ era, showBlurb }: { era: WorkEra; showBlurb: boolean }) {
  const accent = era.accent ?? 'var(--accent-ink)';
  return (
    <section
      aria-label={`${era.label} era`}
      className="flex min-h-0 flex-col border-b border-hairline bg-paper px-5 py-6 last:border-b-0 md:border-b-0 md:px-6 md:py-7"
    >
      {/* Column heading */}
      <header className="mb-3 border-b border-hairline pb-3">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <span
              aria-hidden
              className="block h-6 w-1 shrink-0 rounded-full md:h-7"
              style={{ backgroundColor: accent }}
            />
            <h2 className="truncate font-display text-2xl leading-none text-ink md:text-3xl">
              {era.label}
            </h2>
          </div>
          <span className="whitespace-nowrap font-mono text-[10px] tabular-nums tracking-wide text-ink-muted">
            {era.years}
          </span>
        </div>
        {era.note && (
          <p className="mt-2 text-[11px] leading-snug text-ink-muted">
            {era.note}
          </p>
        )}
      </header>

      {/* Projects: uniform min-height cards so dividers align across columns,
          with comfortable (not viewport-stretched) padding. */}
      <div className="flex flex-col">
        {era.projects.map((project) => (
          <ProjectItem
            key={project.href}
            project={project}
            eraAccent={era.accent}
            showBlurb={showBlurb}
          />
        ))}
      </div>
    </section>
  );
}

function ProjectItem({
  project,
  eraAccent,
  showBlurb,
}: {
  project: WorkProject;
  eraAccent?: string;
  showBlurb: boolean;
}) {
  const { href, index, title, blurb, meta, gated, accentVar } = project;
  // Project accent wins; else era accent; else muted ink.
  const accent = accentVar ?? eraAccent ?? 'var(--ink-muted)';
  return (
    <Link
      href={href}
      className="group flex min-h-[7.5rem] flex-col justify-center border-t border-hairline py-5 transition-colors first:border-t-0 hover:bg-paper-deep"
    >
      <div className="flex gap-3">
        <div className="flex shrink-0 items-stretch gap-2 pt-0.5">
          <span
            aria-hidden
            className="block w-[3px] min-h-[1.4rem] self-stretch"
            style={{ backgroundColor: accent }}
          />
          <span
            className="font-mono text-sm leading-none tabular-nums"
            style={{ color: accent }}
          >
            {index}
          </span>
        </div>
        <div className="min-w-0">
          {meta && (
            <p
              className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {meta}
            </p>
          )}
          <h3 className="flex items-baseline gap-1.5 font-display leading-tight text-ink transition-colors group-hover:text-[var(--accent-ink)] text-[clamp(1rem,2vh,1.2rem)]">
            <span className="truncate">{title}</span>
            {gated && (
              <Lock
                className="h-3 w-3 shrink-0 self-center text-ink-muted"
                aria-label="confidential"
              />
            )}
          </h3>
          {showBlurb && (
            <p className="mt-1 leading-snug text-ink-body text-[clamp(0.72rem,1.5vh,0.85rem)]">
              {blurb}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

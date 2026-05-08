/**
 * UnlockGateSkeleton — chrome that mirrors UnlockGate's locked state so
 * cold-start serverless responses feel responsive. Used by per-route
 * loading.tsx files under (public)/work/<gated-slug>.
 */

import { ArrowLeft, Lock } from 'lucide-react';
import { ProjectScope, type ProjectKey } from '@/components/case-study/ProjectScope';

interface Props {
  project: ProjectKey;
  era?: 'now' | 'meta' | 'maker';
  title: string;
  subtitle?: string;
  meta?: string;
}

export function UnlockGateSkeleton({ project, era = 'now', title, subtitle, meta }: Props) {
  return (
    <ProjectScope project={project}>
      <main
        className={`era-${era} min-h-screen`}
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
        aria-busy="true"
        aria-live="polite"
      >
        <section className="px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-16">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] mb-12 opacity-60">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to work
            </span>

            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-[11px] md:text-xs font-mono text-[var(--accent)] tracking-[0.3em] uppercase mb-3">
                <Lock className="w-3 h-3" /> Confidential
                {meta && <span className="text-[var(--era-ink-muted)]">&middot; {meta}</span>}
              </p>
              <h1 className="font-display text-display-sm text-[var(--era-ink)] mb-3 leading-[0.95]">
                {title}
              </h1>
              {subtitle && (
                <p className="font-display italic text-lg md:text-xl text-[var(--era-ink-body)] leading-snug mb-10">
                  {subtitle}
                </p>
              )}

              <div className="flex items-center gap-3 text-sm font-mono text-[var(--era-ink-muted)]">
                <span className="inline-block w-3 h-3 rounded-full border-2 border-[var(--era-ink-muted)] border-t-transparent animate-spin" aria-hidden />
                Loading&hellip;
              </div>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

/**
 * UnlockGate · server component that renders children only if the visitor's
 * cookie has the right scope. Otherwise renders an interstitial with a
 * password form. Wrap any case-study page that should be confidential.
 *
 *   <UnlockGate scope="rumi" project="rumi" era="now" title="RUMI" subtitle="...">
 *     <RumiCaseStudy />
 *   </UnlockGate>
 */

import { type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import { isUnlocked } from '@/lib/unlock';
import { ProjectScope, type ProjectKey } from '@/components/case-study/ProjectScope';
import { UnlockForm } from './UnlockForm';

interface Props {
  scope: string;
  project: ProjectKey;
  era?: 'now' | 'meta' | 'maker';
  title: string;
  subtitle?: string;
  meta?: string;
  children: ReactNode;
}

export async function UnlockGate({ scope, project, era = 'now', title, subtitle, meta, children }: Props) {
  const unlocked = await isUnlocked(scope);
  if (unlocked) return <>{children}</>;

  return (
    <ProjectScope project={project}>
      <main
        className={`era-${era} min-h-screen`}
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        <section className="px-4 sm:px-6 md:px-8 pt-10 md:pt-14 pb-16">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-12 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to work
            </Link>

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

              <p className="text-sm text-[var(--era-ink-muted)] font-mono mb-4">
                Enter the password to unlock this case study.
              </p>
              <UnlockForm scope={scope} />

              <p className="text-xs text-[var(--era-ink-muted)] mt-8 leading-relaxed">
                Don&rsquo;t have a password?{' '}
                <a href="mailto:hanson@rationale.work" className="underline hover:text-[var(--accent)] transition-colors">
                  hanson@rationale.work
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

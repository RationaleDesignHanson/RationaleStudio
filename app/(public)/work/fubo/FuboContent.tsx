/**
 * Fubo — case study formatted as work-row chapters, NOW era styling.
 * VP of Design tour, 2025–26.
 */

'use client';

import Link from 'next/link';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function FuboContent() {
  return (
    <ProjectScope project="fubo">
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* HERO */}
        <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-7 border-b-2" style={{ borderColor: 'var(--accent)' }}>
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to work
            </Link>

            <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>✱</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">Vault</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · NOW</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2025 — 2026</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Fubo
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  VP of Design at a streaming entertainment platform. Brief tour leading product design across TV, mobile, and web.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE WORK */}
        <ChapterRow index="01" kicker="THE WORK · CROSS-PLATFORM" title="What the role covered">
          <ul className="space-y-2.5">
            <li>Leading product design across all platforms (TV, mobile, web), with responsibility for <strong className="text-[var(--era-ink)]">growth, design systems, and new AI feature development</strong>.</li>
            <li>Defining the design vision and strategy to unify the user experience and accelerate product quality company-wide.</li>
            <li>Partnering with Product, Engineering, and Data Science leadership to align design priorities with business growth objectives.</li>
            <li>Driving initiatives to optimize content placement, onboarding, and engagement &mdash; the foundation for improved retention and conversion.</li>
            <li>Setting up processes, design systems, and design practices that enable faster movement while maintaining a best-in-class user experience.</li>
          </ul>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              ✱ &middot; VAULT &middot; END OF CHAPTER
            </p>
            <Link href="/work/vault" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
              Back to the Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

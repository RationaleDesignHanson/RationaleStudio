/**
 * Writing — Studio Monograph treatment
 */

'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Marginalia } from '@/components/case-study/EditorialLayout';

interface ArchiveEssay {
  title: string;
  slug: string;
  blurb: string;
}

const archive: ArchiveEssay[] = [
  {
    title: 'Two Engines, Proven in Production',
    slug: 'dual-engine-model',
    blurb: 'How Rationale operated two integrated engines that reinforced each other.',
  },
  {
    title: 'Mental Models for Building Products',
    slug: 'mental-models',
    blurb: 'Four frameworks: clarity, direction, environment design, and building to think.',
  },
  {
    title: 'Vision, Proof, and the Work Between',
    slug: 'vision-proof-burden',
    blurb: 'On the responsibility of standing between what is visible and what is provable.',
  },
  {
    title: 'The Build-First Trap',
    slug: 'build-first-trap',
    blurb: 'Why most teams waste 6 months building the wrong thing.',
  },
  {
    title: 'Build-to-Think Methodology',
    slug: 'build-to-think',
    blurb: 'A systematic framework for de-risking development through rapid prototyping.',
  },
  {
    title: 'Spec vs Prototype',
    slug: 'spec-vs-prototype',
    blurb: 'Why experiencing beats describing.',
  },
  {
    title: 'Methodology Origins',
    slug: 'methodology-origins',
    blurb: 'Seven years at Meta Reality Labs. Where the approach comes from.',
  },
];

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      {/* HERO */}
      <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="md:col-span-8">
              <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
                WRITING · IN FLIGHT
              </p>
              <h1 className="font-display text-display text-ink mb-6 max-w-3xl">
                Notes on building.
              </h1>
              <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-3">
                A{' '}
                <a
                  href="https://sendfull.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent-ink)] hover:text-ink underline"
                >
                  Sendfull
                </a>{' '}
                interview drops tomorrow &mdash; on the trust ceiling, hat consolidation, and why I shipped Heirloom instead of Zero. A longer companion piece follows on Substack soon.
              </p>
              <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-2xl mb-6">
                After that, twice a month, on Mondays. Notes on building solo, AI as a coding partner, and what I&rsquo;ve learned across the chapters of the work.
              </p>
              <a
                href="mailto:hanson@rationale.work?subject=Substack%20launch%20notification"
                className="inline-flex items-center gap-2 text-[var(--accent-ink)] hover:text-ink font-display italic text-lg md:text-xl transition-colors"
              >
                Tell me when the first post drops <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <aside className="hidden md:block md:col-span-4 md:col-start-9 text-xs font-mono text-ink-muted leading-relaxed pt-2">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Cadence</p>
              <Marginalia.Field label="Day">Mondays</Marginalia.Field>
              <Marginalia.Field label="Frequency">Twice a month</Marginalia.Field>
              <Marginalia.Field label="Platform">
                <a href="https://matthanson.substack.com" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-ink)] hover:text-ink">
                  matthanson.substack.com →
                </a>
              </Marginalia.Field>
              <Marginalia.Rule />
              <Marginalia.Note>
                Three rails: methodology, build log, career memoir.
              </Marginalia.Note>
            </aside>
          </div>
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 md:mb-10">
            <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3">
              Archive
            </p>
            <p className="text-sm text-ink-muted">
              Older essays from 2024&ndash;25, written under the Rationale Studio framing.
            </p>
          </div>

          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <div className="md:col-span-9">
              <div className="space-y-0">
                {archive.map((essay, i) => (
                  <Link
                    key={essay.slug}
                    href={`/thinking/${essay.slug}`}
                    className="group block py-5 md:py-6 border-t border-hairline hover:bg-paper-deep/40 transition-colors"
                  >
                    <div className="flex items-baseline gap-4 md:gap-6">
                      <span className="font-mono text-sm text-ink-muted tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-display text-xl md:text-2xl text-ink leading-tight mb-1.5 group-hover:text-[var(--accent-ink)] transition-colors">
                          {essay.title}
                        </h3>
                        <p className="text-sm text-ink-body leading-relaxed">
                          {essay.blurb}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-paper-deep/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
            Want to apply this thinking to your product?{' '}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1 text-[var(--accent-ink)] hover:text-ink font-display italic transition-colors"
            >
              Let&rsquo;s talk <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

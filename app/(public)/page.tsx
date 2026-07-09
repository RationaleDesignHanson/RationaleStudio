/**
 * Homepage — Studio Monograph (paper + serif), single style throughout.
 *
 * The three eras (NOW / LEADER / DIRECTOR) render as viewport-fit columns
 * behind a slim masthead via <WorkColumns> — see everything without
 * scrolling. Writing + Contact follow below. Each era keeps only a faint
 * accent; no per-era art direction.
 */

import { ArrowRight } from 'lucide-react';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { WorkColumns } from '@/components/work/WorkColumns';
import { ERAS } from '@/lib/content/eras';

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  // Person + WebSite + Organization render at the root layout for every
  // page, so we only need the page-specific Breadcrumb here.
  const structuredData = [
    generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }]),
  ];

  return (
    <>
      <MultipleStructuredData dataBlocks={structuredData} />

      <main className="min-h-screen bg-paper text-ink-body">
        {/*
          Visually-hidden h1 — the visual design lets era headers (NOW /
          LEADER / DIRECTOR) carry visual weight as h2, but search engines
          want a single semantic h1 that summarizes the page. This is the
          full positioning sentence so both human screen-reader users and
          crawlers get the same disambiguation context.
        */}
        <h1 className="sr-only">
          Matt Hanson — designer-engineer working across AR, AI, and experiential
          systems for 25 years. Animation and creative direction at Psyop,
          Imaginary Forces, Buck, and Hush; VR/AR pitchwork at Framestore;
          screen content direction at Viacom and MTV; eight years at Meta
          leading product design across Spark AR, Orion, and FAIR Embodied AI;
          now applying that experience solo, shipping consumer products with
          AI as a coding partner.
        </h1>

        {/* WORK — eras as viewport-fit columns. Masthead off: the header
            wordmark already rotates in "Vision bears the burden of proof." */}
        <WorkColumns eras={ERAS} showMasthead={false} />

        {/* WRITING · live first post + Sendfull interview */}
        <section className="px-4 sm:px-6 md:px-8 py-12 md:py-20 bg-paper border-t border-hairline">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3">
                  WRITING · LATEST
                </p>
                <h2 className="font-display text-3xl md:text-5xl text-ink leading-tight mb-3 max-w-3xl">
                  When to Hire AI: the longer version
                </h2>
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-5">
                  Substack &middot; Companion to the Sendfull interview
                </p>
                <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-3">
                  A year of building solo, and the parts that didn&rsquo;t fit in 30 minutes &mdash; the dependency map I drew the day I pulled Zero, what &ldquo;the cave&rdquo; means for product decisions, and why the preservation gap is bigger than recipes.
                </p>
                <p className="text-base md:text-lg text-ink-muted leading-relaxed max-w-2xl mb-8">
                  Twice a month after that, on Mondays. Notes on building solo, AI as a coding partner, and what I&rsquo;ve learned across the chapters.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6">
                  <a
                    href="https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[var(--accent-ink)] hover:text-ink font-display italic text-lg md:text-xl transition-colors"
                  >
                    Read the post <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://sendfull.substack.com/p/ep-92-how-a-design-leader-turned"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-mono text-ink-muted hover:text-ink transition-colors"
                  >
                    Or start with Stef Hutka&rsquo;s interview at Sendfull &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="px-4 sm:px-6 md:px-8 py-12 md:py-20 border-t border-hairline bg-paper-deep/40">
          <div className="max-w-6xl mx-auto">
            <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-3">
              GET IN TOUCH
            </p>
            <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl mb-6">
              Available for very selective partnership work.
            </p>
            <a
              href="mailto:hanson@rationale.work"
              className="font-display text-2xl md:text-4xl text-ink hover:text-[var(--accent-ink)] transition-colors inline-block mb-6 break-all"
              data-cta-location="homepage-footer"
              data-cta-type="email"
            >
              hanson@rationale.work
            </a>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted" data-cta-location="homepage-footer">
              <a href="https://www.linkedin.com/in/thematthanson" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ink)] transition-colors" data-cta-type="linkedin">LinkedIn</a>
              <a href="https://rationaledesign.substack.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ink)] transition-colors" data-cta-type="substack">Substack</a>
              <a href="https://github.com/RationaleDesignHanson" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-ink)] transition-colors" data-cta-type="github">GitHub</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/**
 * Framestore VR Studio — case study formatted as work-row chapters,
 * DIRECTOR era styling (black + magenta + cyan neon).
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export function FramestoreContent() {
  return (
    <ProjectScope project="maker">
      <main
        className="era-maker min-h-screen"
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>07</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · DIRECTOR</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2017</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-mono text-display font-bold uppercase tracking-tighter text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Framestore VR Studio
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  One year as Creative Director at Framestore VR Studio and Framestore Labs &mdash; the pitch portfolio that walked into Meta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE WORK */}
        <ChapterRow index="01" kicker="THE WORK · ONE YEAR · MULTIPLE CATEGORIES" title="VR/AR pitches">
          <p>
            Established artistic vision and UX definition while working closely with a multi-disciplined team throughout all aspects of the creative process. VR/AR pitches across:
          </p>
          <ul className="space-y-2 mt-2">
            <li>&middot; Location-based games</li>
            <li>&middot; Motion simulators</li>
            <li>&middot; Educational AR</li>
            <li>&middot; Conversational AI experiences for sports stadiums</li>
            <li>&middot; Automotive experiential work</li>
          </ul>
          <p>
            Deliverables included creative pitches, prototypes, treatments, pre-visualization, scripts, storyboards, and motion/design tests. Most deliverables were pitches; some shipped, some didn&rsquo;t.
          </p>
          <div className="mt-6 max-w-2xl">
            <Figure figNumber="FIG. 01" caption="Starbreeze location-based VR · 12&prime;&times;12&prime; active play space, motorized lazy susan, table with wheels, 7&Prime; multi-tool sized for the Vive controller">
              <Image src="/images/work/framestore/starbreeze-setup.jpg" alt="Starbreeze active play space diagram" width={1600} height={1600} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — THE BRIDGE */}
        <ChapterRow index="02" kicker="THE BRIDGE · INTO META" title="The year before Spark AR">
          <p>
            One year, by design. The pitch portfolio became the argument that walked into the Facebook campus interview in May 2017, and three months later started at Meta as Art Director on Messenger AR.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              07 / 09 &middot; END OF CHAPTER
            </p>
            <Link href="/work/viacom" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
              Continue &rarr; Viacom <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

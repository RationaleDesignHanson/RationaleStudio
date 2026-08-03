/**
 * Framestore VR Studio — case study formatted as work-row chapters,
 * DIRECTOR era styling (black + magenta + cyan neon).
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { CaseStudyHero } from '@/components/case-study/CaseStudyHero';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { ArrowRight } from 'lucide-react';

export function FramestoreContent() {
  return (
    <ProjectScope project="maker">
      <main
        className="era-maker min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* HERO */}
        <CaseStudyHero
          index="07"
          total="09"
          era="DIRECTOR"
          years="2017"
          title="Framestore VR Studio"
        >
          One year as Creative Director at Framestore VR Studio and Framestore Labs &mdash; the pitch portfolio that walked into Meta.
        </CaseStudyHero>

        {/* CHAPTER 01 — THE WORK */}
        <ChapterRow index="01" kicker="THE WORK · ONE YEAR · MULTIPLE CATEGORIES" title="VR/AR pitches">
          <p>
            Set artistic vision and UX definition with a multi-disciplined team across the creative process. VR/AR pitches across:
          </p>
          <ul className="space-y-2 mt-2">
            <li>&middot; Location-based games</li>
            <li>&middot; Motion simulators</li>
            <li>&middot; Educational AR</li>
            <li>&middot; Conversational AI experiences for sports stadiums</li>
            <li>&middot; Automotive experiential work</li>
          </ul>
          <p>
            Deliverables included creative pitches, prototypes, treatments, pre-visualization, scripts, storyboards, and motion/design tests. Most were pitches; some shipped, some didn&rsquo;t.
          </p>
          <div className="mt-6 max-w-2xl">
            <Figure figNumber="FIG. 01" caption="Starbreeze location-based VR · 12&prime;&times;12&prime; active play space, motorized lazy susan, table with wheels, 7&Prime; multi-tool sized for the Vive controller">
              <Image src="/images/work/framestore/starbreeze-setup.jpg" alt="Starbreeze active play space diagram" width={1600} height={1600} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — APEX ASSEMBLY */}
        <ChapterRow index="02" kicker="PITCH · VR HAPTIC PUZZLE · 2017" title="Apex Assembly">
          <p>
            A VR haptic puzzle game pitched out of Framestore Labs. Players slap on work gloves and find a place on the line, assembling increasingly complex doodads from foam blocks moving down a conveyor belt. Motion capture renders the blocks and the player&rsquo;s hands in headset; the connectors are real-world haptic shapes. The displays fritz out, oil drips, the conveyor breaks &mdash; all the things that make assembly comedy in person become game mechanics in VR.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/work/decks/framestore-apex-assembly"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border-2 transition-colors"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Read the Apex Assembly deck · 16 pages, gated <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — THE BRIDGE */}
        <ChapterRow index="03" kicker="THE BRIDGE · INTO META" title="The year before Spark AR">
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

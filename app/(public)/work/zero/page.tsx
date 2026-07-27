/**
 * Zero — case study formatted as work-row chapters, NOW era styling.
 * The post-mortem of an iOS app that hit internal beta then got pulled
 * before public launch.
 */

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { caseStudySchemas } from '@/lib/seo/case-studies';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { PrototypeChapter } from './PrototypeChapter';

const SHOTS = [
  { file: '01-splash-glassmorphic.png', label: 'Splash · glassmorphic' },
  { file: '02-splash-dark-glass.png', label: 'Splash · dark glass' },
  { file: '03-diverse-actions.jpg', label: 'Action diversity' },
  { file: '04-settings-screen.jpg', label: 'Settings' },
];

export default function ZeroPage() {
  return (
    <ProjectScope project="zero">
      <MultipleStructuredData dataBlocks={caseStudySchemas('zero')} />
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
              {/* INDEX COLUMN — matches ChapterRow shape: stripe + big numeral */}
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>03</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">
                      / 09
                    </span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">
                      ERA · NOW
                    </span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>
                      2024
                    </span>
                  </div>
                </div>
              </div>

              {/* CONTENT COLUMN */}
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Zero
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Shortform email. Swipe-first triage with AI-extracted action items. Built solo, internal beta &mdash; the trust ceiling kept it from market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — WHAT IT WAS */}
        <ChapterRow index="01" kicker="WHAT IT WAS" title="Shortform email · swipe-first triage">
          <p>
            Zero is a shortform email app. Swipe-first triage, AI-extracted action items and deadlines, fast inbox processing. Built solo, shipped cross-platform to the App Store.
          </p>
          <p>
            In parallel, I was building Heirloom &mdash; a recipe app to solve a personal frustration I called <em>cooking math</em>. Both apps were live for a stretch. After several rounds of feedback, Zero got sunset and Heirloom went all-in.
          </p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
            {SHOTS.map((s) => (
              <div key={s.file} className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
                <Image src={`/images/work/zero/screenshots/${s.file}`} alt={`Zero · ${s.label}`} width={400} height={865} className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-2 py-1.5 italic">{s.label}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — TRY IT */}
        <PrototypeChapter />


        {/* CHAPTER 03 — WHY IT DIDN'T SHIP */}
        <ChapterRow index="03" kicker="POST-MORTEM · TRUST CEILING" title="Why Zero didn't ship">
          <p>The decision came down to three questions:</p>
          <ol className="space-y-2 list-decimal pl-6">
            <li>What are the consequences if the app fails?</li>
            <li>How much trust does the domain require before users will adopt it?</li>
            <li>Can a new product reach that bar?</li>
          </ol>
          <p>
            Email failed all three. If an AI email tool misses a bill payment notification, someone could lose their mortgage. High stakes raise the trust ceiling, and clearing it demands near-perfect reliability &mdash; a bar a solo studio can&rsquo;t credibly hit.
          </p>
          <p>
            So Heirloom got the green light. Recipes have a different equation: two testable pieces (ingredients and instructions), a low trust ceiling, and a personal connection that justified the build.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <a href="https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors text-sm">
              Read on Substack &mdash; When to Hire AI <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                03 / 09 &middot; END OF CHAPTER
              </p>
              <Link href="/work/fair-embodied-ai" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
                Continue &rarr; FAIR Embodied AI (Leader era) <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

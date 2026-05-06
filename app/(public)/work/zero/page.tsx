/**
 * Zero — case study formatted as work-row chapters, NOW era styling.
 * The post-mortem of an iOS app that hit internal beta then got pulled
 * before public launch.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

interface PrototypeEntry {
  label: string;
  href: string;
  note?: string;
}

const PROTOTYPES: PrototypeEntry[] = [
  {
    label: 'shortform email · full build',
    href: '/prototypes/zero-swipe/index.html',
    note: 'the working triage app · internal beta',
  },
  {
    label: 'intent + action explorer',
    href: '/prototypes/zero-intent/index.html',
    note: 'pre-app validation — corpus of intents mapped to actions',
  },
];

const SHOTS = [
  { file: '01-splash-glassmorphic.png', label: 'Splash · glassmorphic' },
  { file: '02-splash-dark-glass.png', label: 'Splash · dark glass' },
  { file: '03-diverse-actions.png', label: 'Action diversity' },
  { file: '04-settings-screen.png', label: 'Settings' },
];

function PrototypeChapter() {
  const [active, setActive] = useState(0);
  const p = PROTOTYPES[active];
  return (
    <>
      <ChapterRow index="02" kicker="TRY IT · LIVE BUILDS" title="The work that came before the post-mortem">
        <p>
          Two surfaces from the build, in order: an intent + action explorer that validated the classification space before the app, and the swipe-first triage build it grew into. iOS internal beta, then I pulled it — never reached the App Store.
        </p>
      </ChapterRow>
      <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto">
          {PROTOTYPES.length > 1 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {PROTOTYPES.map((entry, i) => (
                <button
                  key={entry.href}
                  onClick={() => setActive(i)}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors ${
                    i === active
                      ? 'bg-[var(--era-ink)] text-[var(--era-bg)] border-[var(--era-ink)]'
                      : 'bg-[var(--era-bg)] text-[var(--era-ink-body)] border-[var(--era-hairline)] hover:border-[var(--era-ink)]'
                  }`}
                >
                  {entry.label}
                </button>
              ))}
            </div>
          )}
          {/* Desktop: caption + iframe demo. Hidden on mobile because
              iOS Safari and mobile Chrome both choke on position-fixed
              elements inside iframes (the prototype's bottom nav was
              breaking specifically). */}
          <div className="hidden md:block">
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono text-[var(--era-ink-muted)]">
              <span>iframe &rarr; {p.href}</span>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                open standalone <ExternalLink className="w-3 h-3" />
              </a>
              {p.note && <span className="italic">· {p.note}</span>}
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white" style={{ height: 'min(900px, 88vh)' }}>
              <iframe
                key={p.href}
                src={p.href}
                title={`Zero · ${p.label}`}
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
              />
            </div>
          </div>

          {/* Mobile launcher card · opens the prototype standalone.
              Same pill toggle above flips the title + href, so the
              card retitles when you switch between the two builds. */}
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden block rounded-md border-2 px-5 py-6 transition-colors active:opacity-80"
            style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--era-bg-deep)' }}
          >
            <p className="text-[10px] font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
              Live build · best on mobile
            </p>
            <p className="font-display text-xl leading-snug mb-1.5" style={{ color: 'var(--era-ink)' }}>
              {p.label}
            </p>
            {p.note && (
              <p className="text-sm italic mb-4" style={{ color: 'var(--era-ink-body)' }}>
                {p.note}
              </p>
            )}
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--era-ink-body)' }}>
              Mobile browsers can&rsquo;t render swipe-based iframes reliably. Open the build standalone for the full experience.
            </p>
            <span
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md text-sm font-mono uppercase tracking-wider"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--era-bg)' }}
            >
              Open prototype <ExternalLink className="w-3.5 h-3.5" />
            </span>
            <p className="mt-3 text-[11px] font-mono text-center" style={{ color: 'var(--era-ink-muted)' }}>
              ↩ Use back button to return to the case study
            </p>
          </a>
        </div>
      </section>
    </>
  );
}

export default function ZeroPage() {
  return (
    <ProjectScope project="zero">
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
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">
                      / 09
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">
                      ERA · NOW
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>
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
            Zero is a shortform email app. Swipe-first triage, AI-extracted action items and deadlines, fast inbox processing. Built solo, iOS, working build, internal beta.
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
            Email failed all three. If an AI email tool misses a bill payment notification, someone could lose their mortgage. High stakes raise the trust ceiling, and a high trust ceiling means near-perfect reliability &mdash; a bar a solo studio can&rsquo;t credibly hit.
          </p>
          <p>
            So Heirloom got the green light. Recipes have a different equation: two testable pieces (ingredients and instructions), a low trust ceiling, and a personal connection that justified the build.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <a href="https://matthanson.substack.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors text-sm">
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

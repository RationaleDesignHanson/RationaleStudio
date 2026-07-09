/**
 * Silly Questions — case study, NOW era. Consumer-facing rewrite.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { TrackedIframe } from '@/components/analytics/TrackedIframe';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { caseStudySchemas } from '@/lib/seo/case-studies';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const PLAY_URL = 'https://silly-questions.com';

const styles = [
  { name: 'Illustrated', file: 'illustrated.webp' },
  { name: 'Photo-Realistic', file: 'photorealistic.webp' },
  { name: 'Watercolor', file: 'watercolor.webp' },
  { name: 'Pixel Art', file: 'pixel.webp' },
  { name: 'Anime', file: 'anime.webp' },
  { name: 'Oil Painting', file: 'oil-painting.webp' },
  { name: 'Collage', file: 'collage.webp' },
  { name: 'Comic Book', file: 'comic.webp' },
];

function PrototypeChapter() {
  return (
    <>
      <ChapterRow index="03" kicker="TRY IT · LIVE" title="Play it in the page">
        <p>
          Below is the actual game, embedded. Open it in a second tab on your phone and grab a friend &mdash; you can play right now.
        </p>
      </ChapterRow>
      <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono text-[var(--era-ink-muted)]">
            <span>iframe &rarr; silly-questions.com</span>
            <a
              href={PLAY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
            >
              open standalone <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white" style={{ height: 'min(900px, 88vh)' }}>
            <TrackedIframe
              prototype="silly-questions"
              src={PLAY_URL}
              title="Silly Questions"
              className="w-full h-full"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default function SillyQuestionsPage() {
  return (
    <ProjectScope project="silly">
      <MultipleStructuredData dataBlocks={caseStudySchemas('silly-questions')} />
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>02</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · NOW</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>Web + iOS · live</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Silly Questions
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  A 2-player AI art party game. Eight art styles, no app download required. Open it on a phone, send the link to a friend, you&rsquo;re playing.
                </p>
                <div className="flex flex-wrap gap-3 mt-5">
                  <a
                    href={PLAY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider transition-colors"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--era-bg)' }}
                  >
                    Play a free game <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — WHAT IT IS */}
        <ChapterRow index="01" kicker="WHAT IT IS" title="A party game where the AI does the clever part">
          <p>
            Most party games rely on the players being clever. Silly Questions inverts that: the questions get sillier each round, and the AI takes whatever you both said and turns it into artwork that somehow represents both of you.
          </p>
          <p>
            Two players, four rounds, one image per round. At the end you get a final composite Polaroid of the whole game &mdash; saveable, shareable, frameable. First game is free.
          </p>
          <div className="mt-6">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Final reveals from real games
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['sample-1', 'sample-2', 'sample-3', 'sample-4'].map((s, i) => (
                <div key={s} className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
                  <Image src={`/images/work/silly-questions/samples/${s}.webp`} alt={`Silly Questions Polaroid sample ${i + 1}`} width={600} height={800} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — HOW A ROUND GOES */}
        <ChapterRow index="02" kicker="HOW A ROUND GOES" title="Four rounds, four images, one final reveal">
          <ul className="space-y-2.5">
            <li><strong className="text-[var(--era-ink)]">Each round, you both get a question.</strong> Both players answer at the same time &mdash; nobody waits.</li>
            <li><strong className="text-[var(--era-ink)]">The AI reads both answers</strong> and generates a piece of art that combines them in the chosen style.</li>
            <li><strong className="text-[var(--era-ink)]">The questions get sillier each round.</strong> By round four nobody is taking themselves seriously.</li>
            <li><strong className="text-[var(--era-ink)]">The final reveal</strong> is a Polaroid composed from the entire conversation &mdash; one image that holds the whole game.</li>
          </ul>
        </ChapterRow>

        {/* CHAPTER 03 — TRY IT */}
        <PrototypeChapter />

        {/* CHAPTER 04 — ART STYLES */}
        <ChapterRow index="04" kicker="ART STYLES" title="Eight ways the picture can land">
          <p>
            Pick the style at the start of the game. Same answers, different style, completely different vibe.
          </p>
          <div className="mt-6 md:mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {styles.map((s) => (
                <div key={s.name} className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
                  <Image src={`/images/work/silly-questions/styles/${s.file}`} alt={`${s.name} art style`} width={400} height={400} className="w-full h-auto" />
                  <p className="text-xs text-[var(--era-ink-muted)] px-2 py-2 text-center">{s.name}</p>
                </div>
              ))}
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — PRICING */}
        <ChapterRow index="05" kicker="PRICING · PAY-PER-GAME" title="No subscription">
          <p>First game free. Then:</p>
          <ul className="space-y-1.5 mt-2 font-mono text-sm md:text-base">
            <li>3 games &mdash; $0.99</li>
            <li>10 games &mdash; $2.99</li>
            <li>25 games &mdash; $4.99</li>
            <li>All 8 art styles unlocked &mdash; $0.99 one-time</li>
          </ul>
          <p className="italic text-[var(--era-ink-muted)] mt-4">
            Party games shouldn&rsquo;t be subscriptions; people play in bursts.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors text-sm">
              silly-questions.com <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                02 / 09 &middot; END OF CHAPTER
              </p>
              <Link href="/work/zero" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
                Continue &rarr; Zero <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

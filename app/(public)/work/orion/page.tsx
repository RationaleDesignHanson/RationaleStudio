/**
 * Orion — case study formatted as work-row chapters, LEADER era styling.
 * Visual evidence uses Meta's publicly shipped press materials.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { MobileCarousel } from '@/components/case-study/MobileCarousel';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { caseStudySchemas } from '@/lib/seo/case-studies';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { LazyVideo } from '@/components/video-player/LazyVideo';

export default function OrionPage() {
  return (
    <ProjectScope project="orion">
      <MultipleStructuredData dataBlocks={caseStudySchemas('orion')} />
      <main
        className="era-meta min-h-screen"
        style={{
          backgroundColor: 'var(--era-bg)',
          color: 'var(--era-ink-body)',
        }}
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>05</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · LEADER</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2023 — 2025</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Orion
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Meta&rsquo;s first true AR glasses, in a regular glasses form factor. Senior Design Manager across the multi-team scope behind the Day-1 use cases shown at the September 2024 unveil.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — WHAT ORION IS */}
        <ChapterRow
          index="01"
          kicker="UNVEIL · SEPT 2024"
          title="The form factor breakthrough"
        >
          <p>
            Meta unveiled{' '}
            <a
              href="https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--era-ink)] underline"
            >
              Orion
            </a>
            {' '}in September 2024 &mdash; &ldquo;the most advanced pair of AR glasses ever made,&rdquo; and the first to look and feel like a regular pair of glasses. Transparent lenses, ~70&deg; field of view, EMG wristband for input, holographic displays. The form-factor breakthrough is the headline.
          </p>
          <p>
            I was <strong className="text-[var(--era-ink)]">Senior Design Manager</strong> across a large, deliberately ambiguous scope &mdash; multiple teams, managers, and Day-1 use cases. Less &ldquo;lead one thing&rdquo; than &ldquo;hold the through-line across many,&rdquo; toward the experiences Meta showed publicly: asking the glasses for a recipe from what&rsquo;s in the fridge, adjusting a family calendar while doing dishes, taking hands-free video calls.
          </p>
          <div className="mt-6 md:mt-8">
            <Figure figNumber="FIG. 01" caption="Meta Orion · official press photo · Meta">
              <Image
                src="/images/work/orion/public/orion-header.jpg"
                alt="Meta Orion AR glasses press photo"
                width={1600}
                height={900}
                className="w-full h-auto rounded-md"
                priority
              />
            </Figure>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="text-caption font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The Day-0 launch slate · 2021 — 2022
            </p>
            <Figure figNumber="FIG. 02" caption="Building the Day 0 launch slate for AR Glasses · chess at a café, EMG wristband, an avatar table conversation, the form factor reveal">
              <Image src="/images/work/orion/decks/orion-day0-hero.jpg" alt="Orion Day-0 launch slate hero" width={1600} height={1067} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="text-caption font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              AR Glasses · Experience Studios · seven verticals
            </p>
            <Figure figNumber="FIG. 03" caption="Surface taxonomy · Games / Lifestyle / Labs / Creative Tools / Media / Productivity / Discovery">
              <Image src="/images/work/orion/decks/orion-experience-studios.jpg" alt="Orion Experience Studios surface tiles" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="text-caption font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Mobile groundwork · the location-anchored AR work that fed Day-1 use cases
            </p>
            <Figure figNumber="FIG. 04" caption="World AR on Mobile (2020 — 2021) · Tate Britain, Universal Studios Japan, Disney character placement, Lucky Dalmatian · location-based work that contributed to the pattern">
              <Image src="/images/work/orion/decks/world-ar-on-mobile.jpg" alt="World AR on Mobile · seven phones" width={1600} height={1067} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — THE DAY-1 APPS */}
        <ChapterRow
          index="02"
          kicker="DAY-1 APPS · PUBLIC DEMOS"
          title="The apps that earned the form factor"
        >
          <p>
            Meta chose the public Day-1 apps to make one case: AR glasses earn everyday life only by helping in hands-busy moments &mdash; useful before spectacular.
          </p>
          <div className="mt-4 space-y-5">
            <div>
              <p className="text-caption font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>Recipe assistance</p>
              <p>
                Contextual visual recognition reads what&rsquo;s in the fridge, surfaces a recipe you can make, and walks the prep step-by-step on the lens &mdash; voice in, display out, hands on the food. The kitchen is the test bed: the most hands-busy room in the house.
              </p>
            </div>
            <div>
              <p className="text-caption font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>Multi-screen multitasking</p>
              <p>
                Multiple floating screens arranged in physical space &mdash; mail beside calendar beside a video call &mdash; addressed at a glance while the wearer keeps doing something else. The display becomes a workspace, not a notification rail.
              </p>
            </div>
            <div>
              <p className="text-caption font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>Hands-free video calls</p>
              <p>
                Take and hold a video call without picking up a device. Presence travels with you &mdash; a glance and a tap replace pulling out a screen.
              </p>
            </div>
            <div>
              <p className="text-caption font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>Augments</p>
              <p>
                Persistent objects pinned to the wearer&rsquo;s space &mdash; clocks, weather, photos, calendars that live in physical locations across sessions. The glasses-and-headset shared layer lets a room hold ambient information without becoming a screen.
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <MobileCarousel desktop="grid-2" label="Orion recipe assistance and multi-screen demos">
              <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                <LazyVideo src="/images/work/orion/public/orion-recipes.mp4" className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">
                  FIG. 02 · Recipe assistance · Meta public demo
                </p>
              </div>
              <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                <LazyVideo src="/images/work/orion/public/orion-multiscreens.mp4" className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">
                  FIG. 03 · Multi-screen multitasking · Meta public demo
                </p>
              </div>
            </MobileCarousel>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="text-caption font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Bonus · Pong on Orion · the demo my team shipped
            </p>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-black" style={{ aspectRatio: '16 / 9' }}>
              <iframe
                src="https://www.youtube.com/embed/Y2RdvxsF5wA?rel=0"
                title="Meta AR Glass Orion · Orion Pong Loop"
                className="w-full h-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-[var(--era-ink-muted)] px-1 pt-2 italic font-mono">
              FIG. 04 · Orion Pong loop · holographic table-tennis on the lens
            </p>
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — TEAMS MANAGED */}
        <ChapterRow
          index="03"
          kicker="TEAMS · MULTIDISCIPLINARY"
          title="The teams I managed"
        >
          <p>
            Each Day-1 app had its own multidisciplinary team &mdash; product, design, prototyping, engineering, research &mdash; and Senior Design Manager meant holding direction across all of them at once. Direct teams covered <strong className="text-[var(--era-ink)]">Experience Design</strong>, <strong className="text-[var(--era-ink)]">Design Prototyping</strong>, <strong className="text-[var(--era-ink)]">Production Design</strong>, and <strong className="text-[var(--era-ink)]">UX Research</strong>. Partner teams spanned hardware engineering, software platform, and AI research.
          </p>
          <p>
            Prototyping answered most of the questions. AR glasses had no precedent UI, no muscle memory, no &ldquo;use the iOS pattern.&rdquo; Every Day-1 use case was built in code, worn on the head, lived with for weeks, then redesigned. Prototypers turned hypotheses into something a person could try and react to &mdash; and that loop drove nearly every meaningful decision in the program.
          </p>
          <p>
            The split looked roughly like this:
          </p>
          <div className="mt-4 space-y-3">
            {[
              ['Experience Design', 'Use-case verticals — recipe, multi-screen, calls, augments. One design lead per vertical, dotted-line into the Senior Design Manager.'],
              ['Design Prototyping', 'Built the experiences in code, on-device. Wearable prototypes, simulator builds, and end-to-end use-case integrations — most Day-1 decisions came from what worked on your head, not what looked right in Figma.'],
              ['Production Design', 'The render-and-ship layer turning concept work into demoable, photographable, recordable experiences for the unveil.'],
              ['UX Research', 'Field studies in real homes, ethnographic work on hands-busy moments, usability runs against the EMG wristband and voice loop.'],
              ['Quest MR partnership', 'Cross-team work integrating MR Mode and the Augments system so the persistent-object language stayed consistent across glasses and headset.'],
              ['Hardware + AI partners', 'Coordination with the optics, EMG, and Embodied-AI teams — translating speculative capabilities into shipping experiences.'],
            ].map(([name, desc]) => (
              <div key={name} className="border-t border-[var(--era-hairline)] pt-3">
                <p className="text-caption font-mono tracking-[0.2em] uppercase mb-1" style={{ color: 'var(--accent)' }}>{name}</p>
                <p className="text-sm md:text-base text-[var(--era-ink-body)]">{desc}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2 flex-wrap text-sm">
              <a
                href="https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                Meta&rsquo;s announcement <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.meta.com/emerging-tech/orion/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                Orion product page <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                05 / 09 &middot; END OF CHAPTER
              </p>
              <Link
                href="/work/spark-ar"
                className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors"
              >
                Continue &rarr; Spark AR <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

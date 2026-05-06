/**
 * Heirloom — case study, NOW era. Consumer-facing rewrite: what it does,
 * how it feels to use, no stack-trivia or thesis chapters.
 */

'use client';

import './print.css';
import { lazy, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const HeirloomDemo = lazy(() => import('@/components/heirloom/HeirloomDemo'));

const APP_STORE_URL = 'https://apps.apple.com/app/id6759019723';
const MARKETING_URL = 'https://heirloomrecipebox.app';

const FEATURES = [
  { src: 'feature-AIGeneration.mp4', title: 'AI Generation', blurb: 'Ask for variations grounded in the recipes you already have. Half the butter, no dairy, doubled for a party.' },
  { src: 'feature-CookbookScan.mp4', title: 'Cookbook Scan', blurb: 'Capture a whole cookbook page by page. Heirloom reads each spread and files everything as separate cards.' },
  { src: 'feature-VideoImport.mp4', title: 'Video Import', blurb: 'Paste a TikTok or Instagram Reels link. The audio and on-screen steps become a structured card.' },
  { src: 'feature-KitchenTable.mp4', title: 'Kitchen Table', blurb: 'A shared cookbook for your family. Everyone adds, edits, and cooks from the same set in real time.' },
  { src: 'feature-VersionTracking.mp4', title: 'Version Tracking', blurb: 'Every change is preserved. The recipe Mom wrote stays the recipe Mom wrote, and your version sits beside it.' },
  { src: 'feature-DiscoverFeed.mp4', title: 'Discover', blurb: 'Themed packs and curated cookbooks for when you don&rsquo;t know what to cook tonight.' },
];

export default function HeirloomCaseStudy() {
  return (
    <ProjectScope project="heirloom">
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>01</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · NOW</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>iOS · live</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-10 max-w-3xl">
                <div className="flex items-start gap-4 md:gap-5 mb-3">
                  <Image
                    src="/images/work/heirloom/brand/app-icon.png"
                    alt="Heirloom app icon"
                    width={96}
                    height={96}
                    className="flex-shrink-0 rounded-2xl border border-[var(--era-hairline)] w-[64px] h-[64px] md:w-[88px] md:h-[88px]"
                    priority
                  />
                  <h1 className="font-display text-display text-[var(--era-ink)] leading-[0.92]">
                    Heirloom
                  </h1>
                </div>
                <p className="font-display italic text-lg md:text-xl text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Preserve your family&rsquo;s recipes. Grandma&rsquo;s handwriting, Mom&rsquo;s voice notes, the videos from Sunday dinner — Heirloom keeps every dish, and the person who first made it.
                </p>
                <p className="text-base md:text-lg text-[var(--era-ink-body)] leading-relaxed max-w-2xl mt-4">
                  The best recipes are rarely written down. They live in a grandparent&rsquo;s head, a parent&rsquo;s muscle memory, a handwritten card stained from forty years of Sunday sauces. One move, one memory fading, one cousin cleaning out a drawer &mdash; and they&rsquo;re gone. Heirloom is the place to put them before that happens.
                </p>
                <p className="font-display italic text-base md:text-lg mt-4 max-w-2xl" style={{ color: 'var(--accent)' }}>
                  Your grandmother&rsquo;s Bolognese is not a Google Doc.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider transition-colors"
                    style={{ backgroundColor: 'var(--accent)', color: 'var(--era-bg)' }}
                  >
                    Download on the App Store <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={MARKETING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] transition-colors"
                  >
                    heirloomrecipebox.app <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/work/heirloom/evolution"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] transition-colors"
                  >
                    The build journey <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — WHAT IT DOES */}
        <ChapterRow index="01" kicker="WHAT IT DOES" title="One box for every recipe you care about">
          <p>
            Heirloom is a recipe box. Photograph your grandmother&rsquo;s handwritten card, screenshot a recipe from a website, scan a whole cookbook page by page, paste a TikTok link, or read a recipe out loud while your hands are floury. Heirloom captures it, fills in a structured card, and files it where you can find it again.
          </p>
          <p>
            Every recipe has lineage. The card Mom wrote in 1985 stays the card Mom wrote in 1985. When you change something &mdash; less butter, a different oven temperature, a tweak from a friend &mdash; your version sits beside hers, and so does the diff: who changed what, and when.
          </p>
        </ChapterRow>

        {/* CHAPTER 02 — IMPORT */}
        <ChapterRow index="02" kicker="HOW IT CAPTURES" title="Six ways in, one private cookbook">
          <ul className="space-y-2.5 mt-2">
            <li><strong className="text-[var(--era-ink)]">Speak it aloud.</strong> Tell Heirloom the recipe while you cook; it transcribes on-device with WhisperKit. Audio never leaves your phone.</li>
            <li><strong className="text-[var(--era-ink)]">Paste a URL.</strong> Any recipe site becomes a clean card &mdash; skip the storytelling and the ads.</li>
            <li><strong className="text-[var(--era-ink)]">Photograph a handwritten card.</strong> Even the cards with smudges, missing steps, or a hundred years of fading.</li>
            <li><strong className="text-[var(--era-ink)]">Scan a whole cookbook.</strong> Page by page. Each spread becomes its own card.</li>
            <li><strong className="text-[var(--era-ink)]">Save a TikTok, Reel, or YouTube video.</strong> Audio and on-screen steps both feed the recipe. Saved to your private Recipe Box, not a feed.</li>
            <li><strong className="text-[var(--era-ink)]">Describe a dish.</strong> Type &ldquo;Grandma&rsquo;s brisket&rdquo; or &ldquo;weeknight pasta something&rdquo; and Heirloom drafts a complete recipe. You review every line before it&rsquo;s saved.</li>
          </ul>
          <p className="mt-4">
            Before a card is saved, Heirloom cross-checks it. It looks up published recipes for the same dish and flags anything that doesn&rsquo;t fit &mdash; a 12-cup butter ratio, a missing step between &ldquo;marinate&rdquo; and &ldquo;plate.&rdquo; You confirm before it commits. Bad recipes don&rsquo;t quietly enter the box.
          </p>
        </ChapterRow>

        {/* CHAPTER 03 — TRY IT */}
        <ChapterRow index="03" kicker="TRY IT · LIVE" title="Try the import flow">
          <p>
            Pick a sample photo (or upload your own). Heirloom reads it, fills in a card, and shows you what changed when the next person edits it.
          </p>
        </ChapterRow>
        <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-white">
              <Suspense fallback={
                <div className="p-12 text-center text-sm font-mono text-[var(--era-ink-muted)]">
                  loading demo&hellip;
                </div>
              }>
                <HeirloomDemo />
              </Suspense>
            </div>
          </div>
        </section>

        {/* CHAPTER 04 — LIVE IN THE APP */}
        <ChapterRow index="04" kicker="LIVE IN THE APP" title="What you can do today">
          <p>
            Six things, all shipping in the current build:
          </p>
          <div className="mt-6 md:mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.src} className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                  <video src={`/videos/heirloom/${f.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                  <div className="px-4 py-3">
                    <h3 className="text-sm font-display text-[var(--era-ink)] mb-1">{f.title}</h3>
                    <p className="text-xs text-[var(--era-ink-muted)] leading-relaxed">{f.blurb}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — COOKBOOK SHARING */}
        <ChapterRow index="05" kicker="SHARING" title="A cookbook, not a social graph">
          <p>
            Make a cookbook. Invite specific family members by username &mdash; no public feed, no algorithm, no strangers reading your grandmother&rsquo;s notes. Recipes added on one phone show up on every other phone instantly. Edits sync the same way. The argument over how much salt is in the soup gets settled in writing.
          </p>
          <p>
            Every recipe carries its own version history, so you can fork from anyone&rsquo;s cookbook without losing theirs. Your mother&rsquo;s pasta stays your mother&rsquo;s pasta even after you&rsquo;ve made it your own. Three generations flow through one recipe.
          </p>
          <p className="font-display italic text-[var(--era-ink)] mt-4">
            From the kitchen to forever.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2 flex-wrap text-sm">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
                App Store <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a href={MARKETING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
                heirloomrecipebox.app <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <Link href="/work/heirloom/evolution" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
                The build journey <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                01 / 09 &middot; END OF CHAPTER
              </p>
              <Link href="/work/silly-questions" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
                Continue &rarr; Silly Questions <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

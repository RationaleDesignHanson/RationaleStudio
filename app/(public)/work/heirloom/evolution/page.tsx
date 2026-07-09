/**
 * Heirloom · Evolution — the four-phase build journey, in monograph style
 * to match /work/heirloom.
 */

'use client';

import Link from 'next/link';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

const PHASES = [
  {
    index: '00',
    kicker: 'PHASE 0 · JAN 2026 · THE SPARK',
    title: 'Pottery',
    body: (
      <>
        <p>
          The first thing I built after Claude Code and Cursor arrived was a giveaway site for pieces from my pottery practice. Colleagues could browse, pick a piece, and drop a shipping address. One weekend. Static HTML + JS + EmailJS. No backend, no auth, no story arc.
        </p>
        <p>
          The point wasn&rsquo;t the site. The point was <em>I had built something</em>. After years of leading through others, that mattered more than I expected.
        </p>
        <blockquote className="border-l-4 pl-4 italic font-display text-[var(--era-ink)] text-lg md:text-xl leading-snug" style={{ borderColor: 'var(--accent)' }}>
          I had this power of making a thing, and it started to build up. I was always a maker before. I just missed making stuff.
        </blockquote>
      </>
    ),
    cta: { href: '/prototypes/pottery-gifts/', label: 'Live · pottery giveaway site' },
  },
  {
    index: '01',
    kicker: 'PHASE 1 · FEB 2026 · WEB · THESIS TEST',
    title: 'Shopping Lab',
    body: (
      <>
        <p>
          Before Heirloom was an iOS app, it was a web demo. The hypothesis: people don&rsquo;t have a recipe-storage problem so much as a <em>cooking math</em> problem &mdash; aggregating ingredients across multiple recipes, converting units, deduping the list, tracking what&rsquo;s already in the pantry.
        </p>
        <p>
          Built the parser and the shopping flow on the web first. React 19 + TypeScript + Vite. 326 tests. 108 ingredients with USDA densities, 277 synonym mappings (US/UK/AU), 34+ unit conversions.
        </p>
        <p>
          If the parser + consolidator couldn&rsquo;t earn user trust on the web, no native iOS app built around it would either. So that&rsquo;s where I started.
        </p>
      </>
    ),
    cta: { href: '/prototypes/heirloom-shopping-lab/', label: 'Live · Heirloom Shopping Lab' },
  },
  {
    index: '02',
    kicker: 'PHASE 2 · FEB–MAR 2026 · WEB · TRUST FRONTIER',
    title: 'OCR Recipe Extraction',
    body: (
      <>
        <p>
          Next: getting recipes <em>in</em>. Photo or screenshot &rarr; ingredients and instructions, structured.
        </p>
        <p>
          Built a Claude Vision pipeline that detects multiple recipes per image with bounding boxes, extracts the text, normalizes the ingredients through the same parser from Phase 1, and outputs a card you can edit. Plus card customization with 50+ stickers &mdash; the part that proved emotional attachment, not just functional.
        </p>
        <p>
          This was where the <em>validator before features</em> discipline locked in. If the OCR mis-counted &ldquo;1/2 cup&rdquo; as &ldquo;12 cup,&rdquo; the trust of the entire app collapsed. So the validator runs web searches to verify proportions and check that the instructions are complete before a recipe lands in your library.
        </p>
      </>
    ),
    videos: [
      { src: 'feature-CookbookScan.mp4', label: 'Cookbook scan flow as it ships today' },
      { src: 'lp-PDF-hero-16x9.mp4', label: 'PDF imports' },
    ],
  },
  {
    index: '03',
    kicker: 'PHASE 3 · MAR 2026 · iOS · PIPELINE EXPERIMENT',
    title: 'Video Lab',
    body: (
      <>
        <p>
          The hardest import format. TikTok and Instagram Reels are 45-second vertical videos that are nearly impossible to cook from. The goal: structured ingredients and instructions out, in 2.5–3.5 minutes, for $0.02–0.03 per video.
        </p>
        <p>
          Built the iOS pipeline as its own lab target before integrating into the app. SwiftUI + SwiftData + AVFoundation + WhisperKit (on-device transcription, free) + Vision OCR (frame analysis) + Claude (recipe structuring) + similar-recipe augmentation + user review + save.
        </p>
        <p>
          72 automated tests. Mock services for simulator. Code-complete, then merged into the main app.
        </p>
      </>
    ),
    videos: [
      { src: 'lp-video-hero-16x9.mp4', label: 'Video import flow as shipped' },
      { src: 'feature-VideoImport.mp4', label: 'Animated highlight' },
    ],
  },
  {
    index: '04',
    kicker: 'PHASE 4 · MAR 2026 – NOW · PRODUCTION',
    title: 'Native iOS app',
    body: (
      <>
        <p>
          Five-week initial sprint to a v1.0 beta. The next four months: refactor from monolith to 24 modular Swift packages, Swift 6 strict concurrency, full Firebase backend with Cloud Functions, FCM push, Algolia search, RevenueCat subscriptions, themed cookbook generation, real-time shared cookbooks, and a Watch experience queued for after the core lands.
        </p>
      </>
    ),
    introVideo: { src: 'intro.mp4', label: 'Overall product intro' },
    featureVideos: [
      { src: 'feature-AIGeneration.mp4', label: 'AI Generation' },
      { src: 'feature-CookbookScan.mp4', label: 'Cookbook Scan' },
      { src: 'feature-VideoImport.mp4', label: 'Video Import' },
      { src: 'feature-KitchenTable.mp4', label: 'Cookbook Sharing' },
      { src: 'feature-VersionTracking.mp4', label: 'Version Tracking' },
      { src: 'feature-DiscoverFeed.mp4', label: 'Discover Feed' },
    ],
  },
];

export default function HeirloomEvolutionPage() {
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
              href="/work/heirloom"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Heirloom
            </Link>

            <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>↻</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">
                      ERA · NOW
                    </span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>
                      Build journey
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  From a weekend pottery site to a 24-package iOS app.
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Most case studies show the polished product. This one shows the path. Heirloom didn&rsquo;t arrive in iOS finished &mdash; it crossed four prototypes and one pivot to get there. Each phase taught the next.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PHASES */}
        {PHASES.map((p) => (
          <ChapterRow key={p.index} index={p.index} kicker={p.kicker} title={p.title}>
            {p.body}
            {p.cta && (
              <div className="mt-2">
                <a
                  href={p.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-mono uppercase tracking-wider border border-[var(--era-hairline)] text-[var(--era-ink)] hover:border-[var(--accent)] transition-colors"
                >
                  {p.cta.label} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
            {p.videos && (
              <div className="mt-6 grid md:grid-cols-2 gap-3">
                {p.videos.map((v) => (
                  <div key={v.src} className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                    <video src={`/videos/heirloom/${v.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                    <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">{v.label}</p>
                  </div>
                ))}
              </div>
            )}
            {p.introVideo && (
              <div className="mt-6 rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30 max-w-2xl">
                <video src={`/videos/heirloom/${p.introVideo.src}`} controls playsInline className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">{p.introVideo.label}</p>
              </div>
            )}
            {p.featureVideos && (
              <div className="mt-6">
                <p className="text-base md:text-lg leading-relaxed mb-4">The features people actually use:</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {p.featureVideos.map((v) => (
                    <div key={v.src} className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                      <video src={`/videos/heirloom/${v.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                      <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">{v.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ChapterRow>
        ))}

        {/* WHAT IT TAUGHT */}
        <ChapterRow index="05" kicker="THE THROUGH-LINE" title="Each phase earned the next">
          <p>
            <strong className="text-[var(--era-ink)]">Each phase tested one piece of the trust ceiling.</strong> Pottery proved I could ship at all. Shopping Lab proved the parser. OCR proved the validator-first discipline. Video Lab proved the on-device pipeline. Only after all four did the native iOS app become buildable as a real product.
          </p>
          <p>
            <strong className="text-[var(--era-ink)]">Web before native saved months.</strong> Most of the trust questions could be answered in the browser. The iOS work was integration and polish on top of validated foundations.
          </p>
          <p>
            <strong className="text-[var(--era-ink)]">Hat consolidation only works if you don&rsquo;t lower the bar.</strong> Each phase has its own test suite, its own architecture decisions, its own quality story. The point of building solo with AI isn&rsquo;t to ship faster &mdash; it&rsquo;s to ship at the same bar a team would, alone.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-x-5 gap-y-2 flex-wrap text-sm">
              <a href="https://rationaledesign.substack.com/p/when-to-hire-ai-the-longer-version" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
                Read on Substack &mdash; When to Hire AI <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-3 pt-4 border-t border-[var(--era-hairline)]">
              <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
                Build journey &middot; end of chapter
              </p>
              <Link href="/work/heirloom" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to the case study
              </Link>
            </div>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

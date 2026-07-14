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
import { MobileCarousel } from '@/components/case-study/MobileCarousel';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { caseStudySchemas } from '@/lib/seo/case-studies';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { LazyVideo } from '@/components/video-player/LazyVideo';

const HeirloomDemo = lazy(() => import('@/components/heirloom/HeirloomDemo'));

const APP_STORE_URL = 'https://apps.apple.com/app/id6759019723';
const MARKETING_URL = 'https://heirloomrecipebox.app';

// Five canonical feature blocks lifted directly from the heirloom-marketing
// homepage (HomepageRedesign.tsx, Section 4). Composite assets are copied
// from heirloom-marketing/public/assets/lifestyle/composite/ — keep the two
// in sync if marketing updates them.
const FEATURE_PATH = '/images/work/heirloom/composite';
const FEATURES = [
  {
    align: 'left' as const,
    media: { src: `${FEATURE_PATH}/spark-capture.mp4`, poster: `${FEATURE_PATH}/spark-capture-poster.jpg`, video: true },
    alt: 'The Heirloom Spark capture flow',
    eyebrow: 'Spark',
    headline: 'Start from a spark.',
    body: 'A name. A craving. A half-remembered Sunday. Type whatever you&rsquo;ve got &mdash; &ldquo;Grandma&rsquo;s brisket,&rdquo; &ldquo;the lemon chicken thing,&rdquo; &ldquo;weeknight pasta something&rdquo; &mdash; and Heirloom fills in the rest. You review every line before it saves. The spark was yours; we just wrote it down.',
  },
  {
    align: 'right' as const,
    media: { src: `${FEATURE_PATH}/scanning-handwritten.mp4`, poster: `${FEATURE_PATH}/scanning-handwritten-poster.jpg`, video: true },
    alt: 'Hands holding a phone over a stack of handwritten recipe cards',
    eyebrow: 'Capture',
    headline: 'Handwritten cards deserve more than a shoebox.',
    body: 'Point your camera at a handwritten card. Heirloom reads the cursive, pulls the ingredients and instructions, and turns a faded heirloom into a recipe your kids can scale, cook, and pass on. Forty years of Sundays, digitized over coffee.',
  },
  {
    align: 'left' as const,
    media: { src: `${FEATURE_PATH}/two-phones-share.png`, video: false },
    alt: 'Two phones on a wooden table, sender and recipient lineage view',
    eyebrow: 'Private',
    headline: 'No public feed. No follower count. No algorithm.',
    body: 'Your cookbook is a book, not a social graph. You invite specific family members. You see who added what. If someone leaves the family, you pull the share. No discover tab. No trending. No strangers reading your grandmother&rsquo;s notes.',
  },
  {
    align: 'right' as const,
    media: { src: `${FEATURE_PATH}/seasonal-lineage.mp4`, poster: `${FEATURE_PATH}/seasonal-lineage-poster.jpg`, video: true },
    alt: 'Three generations of one recipe in Heirloom — the lineage view',
    eyebrow: 'Preserve',
    headline: 'Lineage on every recipe.',
    body: 'When you save your mother&rsquo;s version of Grandma&rsquo;s Bolognese, Heirloom remembers: whose original, who changed what, when. Three generations flow through one recipe. Your kids will know exactly whose hand wrote it down &mdash; and whose kitchen made it theirs.',
  },
  {
    align: 'left' as const,
    media: { src: `${FEATURE_PATH}/table-cookbooks.png`, video: false },
    alt: 'A phone on a wood table showing the Heirloom cookbooks library',
    eyebrow: 'Own',
    headline: 'Private by default. Export anytime.',
    body: 'Every recipe is private until you invite someone specific. No account required to start. Export your entire cookbook as a PDF any time. No lock-in, no dark patterns, no &ldquo;upgrade to export.&rdquo; A heirloom you own, not rent.',
  },
];

export default function HeirloomCaseStudy() {
  return (
    <ProjectScope project="heirloom">
      <MultipleStructuredData dataBlocks={caseStudySchemas('heirloom')} />
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
              <div className="md:col-span-2 mb-6 md:mb-0 hero-stack">
                {/* Mobile: compact horizontal eyebrow so the slim chapter marker
                    doesn't stack as a tall column above the app-icon lockup. */}
                <div className="flex md:hidden items-center gap-x-3 gap-y-1 flex-wrap">
                  <span className="block w-[3px] h-7 rounded-full" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <span className="font-mono text-2xl tracking-tight tabular-nums leading-none" style={{ color: 'var(--accent)' }}>01</span>
                  <span className="font-mono text-caption tracking-[0.2em] uppercase text-[var(--era-ink-muted)]">/ 09</span>
                  <span className="font-mono text-caption tracking-[0.2em] uppercase text-[var(--era-ink-muted)]">· ERA · NOW</span>
                  <span className="font-mono text-caption tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>· iOS · live</span>
                </div>
                {/* Desktop: vertical rail (unchanged; keeps hero-stack animation hooks). */}
                <div className="flex items-stretch gap-3 hidden md:flex">
                  <span className="block w-[3px] self-stretch min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>01</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · NOW</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>iOS · live</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-10 max-w-3xl">
                <div className="flex items-start gap-4 md:gap-5 mb-3">
                  <Image
                    src="/images/work/heirloom/brand/app-icon.png"
                    alt="Heirloom app icon"
                    width={320}
                    height={320}
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
                  The best recipes are rarely written down. They live in a grandparent&rsquo;s head, a parent&rsquo;s muscle memory, a card stained from forty years of Sunday sauces. One move, one fading memory, one cleaned-out drawer &mdash; and they&rsquo;re gone. Heirloom is where you put them first.
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
            Heirloom is a recipe box. Photograph your grandmother&rsquo;s handwritten card, screenshot a recipe from a website, scan a whole cookbook page by page, paste a TikTok link, or read one aloud with floury hands. Heirloom captures it, fills in a structured card, and files it where you&rsquo;ll find it again.
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
            Before a card is saved, Heirloom cross-checks it against published recipes for the same dish and flags anything that doesn&rsquo;t fit &mdash; a 12-cup butter ratio, a missing step between &ldquo;marinate&rdquo; and &ldquo;plate.&rdquo; You confirm before it commits. Bad recipes don&rsquo;t quietly enter the box.
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
            The five canonical feature blocks from the heirloom marketing site, shipping in the current build.
          </p>
        </ChapterRow>
        <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-14">
          <MobileCarousel className="max-w-5xl mx-auto" label="Heirloom features">
            {FEATURES.map((f) => (
              <div
                key={f.eyebrow}
                className="relative h-full rounded-3xl border border-[var(--era-hairline)] bg-white/85 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.08)] ring-1 ring-inset ring-white/40"
              >
                <div className={`grid gap-8 lg:gap-14 lg:grid-cols-2 items-center p-6 sm:p-8 lg:p-12 ${f.align === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  <div className="flex justify-center">
                    <div className="w-full max-w-[440px] rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10">
                      {f.media.video ? (
                        <LazyVideo src={f.media.src} poster={f.media.poster} className="w-full h-auto block" />
                      ) : (
                        <Image
                          src={f.media.src}
                          alt={f.alt}
                          width={880}
                          height={660}
                          className="w-full h-auto block"
                        />
                      )}
                    </div>
                  </div>
                  <div className="max-w-[44ch]">
                    <p className="text-caption font-mono font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
                      {f.eyebrow}
                    </p>
                    <h3
                      className="text-h2 font-display font-semibold tracking-[-0.02em] leading-[1.12] text-[var(--era-ink)]"
                      dangerouslySetInnerHTML={{ __html: f.headline }}
                    />
                    <p
                      className="mt-4 sm:mt-5 text-sm sm:text-base leading-[1.6] text-[var(--era-ink-body)]"
                      dangerouslySetInnerHTML={{ __html: f.body }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </MobileCarousel>
        </section>

        {/* CHAPTER 05 — COOKBOOK SHARING */}
        <ChapterRow index="05" kicker="SHARING" title="A cookbook, not a social graph">
          <p>
            Make a cookbook. Invite specific family members by username &mdash; no public feed, no algorithm, no strangers reading your grandmother&rsquo;s notes. Add a recipe on one phone and it shows up on every other instantly; edits sync the same way. The argument over how much salt is in the soup gets settled in writing.
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

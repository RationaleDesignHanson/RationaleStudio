/**
 * Homepage — Studio Monograph chrome with era-themed sections.
 *
 * Each era is art-directed in its period's idiom:
 *   MAKER (2000–2017)   Designer's Republic / Tomato — black + neon
 *   META  (2017–2025)   Flat-modern, light, Family-of-Apps gradient
 *   NOW   (2024–)       Studio Monograph (paper + serif)
 *
 * Site chrome (hero, writing, contact, /about) stays paper-monograph.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import {
  generateOrganizationStructuredData,
  generateBreadcrumbStructuredData,
} from '@/lib/seo/metadata';
import { WorkViewer, type EraBlockData } from '@/components/work/WorkViewer';
import { WorkViewerMobile } from '@/components/work/WorkViewerMobile';

// =============================================================
// PRIMITIVES — themed wrappers
// =============================================================

type EraTheme = 'now' | 'meta' | 'maker';

interface EraHeaderProps {
  theme: EraTheme;
  era: string;
  years: string;
  tagline?: string;
}

function EraHeader({ theme, era, years, tagline }: EraHeaderProps) {
  if (theme === 'maker') {
    // DR-style: large mono kicker numerals, neon labels.
    // Tuned DOWN from 9xl so it doesn't out-shout NOW + META.
    return (
      <div className="mb-4 md:mb-14 relative">
        <div className="grid md:grid-cols-12 md:gap-6 items-end">
          <div className="md:col-span-8">
            <h2
              className="font-mono text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter"
              style={{ color: 'var(--era-ink)' }}
            >
              DIRECTOR
            </h2>
            <p
              className="mt-2 font-mono text-sm md:text-base tracking-widest"
              style={{ color: 'var(--era-accent-alt)' }}
            >
              {years}
            </p>
          </div>
          {tagline && (
            <aside
              className="md:col-span-4 mt-4 md:mt-0 md:text-right text-sm"
              style={{ color: 'var(--era-ink-body)' }}
            >
              <p className="italic">{tagline}</p>
            </aside>
          )}
        </div>
        <div className="mt-6 h-px" style={{ backgroundColor: 'var(--era-accent)' }} />
      </div>
    );
  }

  if (theme === 'meta') {
    // Flat-modern: clean sans, large headline word, supporting year line.
    return (
      <div className="mb-4 md:mb-14">
        <div
          className="flex items-end justify-between gap-4 pb-5 border-b-2"
          style={{ borderColor: 'var(--era-accent)' }}
        >
          <div>
            <h2
              className="font-sans font-light text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight"
              style={{ color: 'var(--era-ink)' }}
            >
              LEADER
            </h2>
            <p
              className="mt-2 font-sans text-sm md:text-base tracking-wide"
              style={{ color: 'var(--era-accent-alt)' }}
            >
              {years}
            </p>
          </div>
          {tagline && (
            <p className="hidden md:block text-sm max-w-md text-right pb-2" style={{ color: 'var(--era-ink-muted)' }}>
              {tagline}
            </p>
          )}
        </div>
        {tagline && (
          <p className="md:hidden text-sm mt-3" style={{ color: 'var(--era-ink-muted)' }}>
            {tagline}
          </p>
        )}
      </div>
    );
  }

  // NOW — Studio Monograph paper. Era word + role line, structurally
  // parallel to LEADER and DIRECTOR. The manifesto lives above the
  // WorkViewer as a hero so it isn't tied to a single era.
  return (
    <div className="mb-4 md:mb-14">
      <div className="border-b pb-5" style={{ borderColor: 'var(--era-ink)' }}>
        <h2
          className="font-display italic text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight"
          style={{ color: 'var(--era-ink)' }}
        >
          NOW
        </h2>
        <p
          className="mt-2 font-mono whitespace-nowrap tracking-wide text-[clamp(0.625rem,2.8vw,1rem)]"
          style={{ color: 'var(--era-ink-muted)' }}
        >
          {years}
        </p>
      </div>
      {tagline && (
        <p className="mt-3 text-sm italic" style={{ color: 'var(--era-ink-muted)' }}>
          {tagline}
        </p>
      )}
    </div>
  );
}

// =============================================================
// WORK ROWS — three styles, one per era
// =============================================================

interface WorkRowProps {
  theme: EraTheme;
  href: string;
  index: string;
  title: string;
  blurb: string;
  meta?: string;
  gated?: boolean;
  accentVar?: string;
  /**
   * Position within the row's *era block* (0-based). When set, drives the
   * per-era glint stagger so each era's first row fires at 0s instead of
   * cascading from the global numeral. Falls back to (index - 1) when omitted.
   */
  staggerIndex?: number;
}

function WorkRow(props: WorkRowProps) {
  if (props.theme === 'maker') return <MakerRow {...props} />;
  if (props.theme === 'meta') return <MetaRow {...props} />;
  return <NowRow {...props} />;
}

// Standard row dimensions used across all three eras.
// Per-era distinctness comes from font, case, and color — not size.
const ROW_PAD = 'block py-6 md:py-7 px-4 md:px-5';
const ROW_GRID = 'grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start';
const ROW_NUMERAL = 'font-mono text-base sm:text-lg md:text-xl tracking-wider tabular-nums leading-none';
const ROW_TITLE = 'text-xl md:text-2xl leading-tight mb-2 transition-colors flex items-baseline gap-2';
const ROW_BLURB = 'text-sm md:text-base leading-relaxed max-w-2xl';

function glintStyle(index: string, staggerIndex?: number): React.CSSProperties {
  const n = staggerIndex ?? (parseInt(index, 10) || 1) - 1;
  return { ['--glint-delay' as string]: `${n * 0.6}s` };
}

function NowRow({ href, index, title, blurb, meta, gated, accentVar, staggerIndex }: WorkRowProps) {
  const accent = accentVar ?? 'var(--era-ink-muted)';
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index, staggerIndex) }}
    >
      <Link href={href} className={`${ROW_PAD} -mx-4 md:-mx-5 transition-colors hover:bg-[var(--era-bg-deep)]`}>
        <div className={ROW_GRID}>
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span className="block w-[3px] self-stretch min-h-[2.25rem] md:min-h-[2.5rem]" style={{ backgroundColor: accent }} aria-hidden />
            <span className={ROW_NUMERAL} style={{ color: accent }}>{index}</span>
            {gated && <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--era-ink-muted)' }} aria-label="confidential" />}
          </div>
          <div className="md:col-span-7">
            {meta && <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>{meta}</p>}
            <h3 className={`font-display ${ROW_TITLE} group-hover:text-[var(--era-accent)]`} style={{ color: 'var(--era-ink)' }}>
              {title}
            </h3>
            <p className={ROW_BLURB} style={{ color: 'var(--era-ink-body)' }}>{blurb}</p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:text-[var(--era-accent)] group-hover:translate-x-1" style={{ color: 'var(--era-ink-muted)' }} />
          </div>
        </div>
      </Link>
    </div>
  );
}

function MakerRow({ href, index, title, blurb, meta, gated, staggerIndex }: WorkRowProps) {
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index, staggerIndex) }}
    >
      <Link href={href} className={`${ROW_PAD} -mx-4 md:-mx-5 transition-colors hover:bg-[var(--era-bg-deep)]`}>
        <div className={ROW_GRID}>
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span className={ROW_NUMERAL} style={{ color: 'var(--era-accent)' }}>{index}</span>
            {gated && (
              <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--era-accent-alt)' }}>
                ◊ NDA
              </span>
            )}
          </div>
          <div className="md:col-span-7">
            {meta && (
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--era-accent-alt)' }}>
                {meta}
              </p>
            )}
            <h3 className={`font-mono font-bold uppercase tracking-tight ${ROW_TITLE} group-hover:text-[var(--era-accent)]`} style={{ color: 'var(--era-ink)' }}>
              {title}
            </h3>
            <p className={`${ROW_BLURB} font-mono`} style={{ color: 'var(--era-ink-body)' }}>{blurb}</p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <span className="font-mono text-xs tracking-widest transition-transform duration-300 group-hover:translate-x-1" style={{ color: 'var(--era-accent)' }}>►</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MetaRow({ href, index, title, blurb, meta, gated, staggerIndex }: WorkRowProps) {
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index, staggerIndex) }}
    >
      <Link href={href} className={`${ROW_PAD} -mx-4 md:-mx-5 transition-colors hover:bg-[var(--era-bg-deep)]`}>
        <div className={ROW_GRID}>
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span className={`font-sans font-semibold ${ROW_NUMERAL.replace('font-mono ', '')}`} style={{ color: 'var(--era-accent)' }}>
              {index}
            </span>
            {gated && <Lock className="w-3.5 h-3.5 flex-shrink-0" style={{ color: 'var(--era-ink-muted)' }} aria-label="confidential" />}
          </div>
          <div className="md:col-span-7">
            {meta && (
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--era-accent-alt)' }}>
                {meta}
              </p>
            )}
            <h3 className={`font-sans font-semibold ${ROW_TITLE} group-hover:text-[var(--era-accent)]`} style={{ color: 'var(--era-ink)' }}>
              {title}
            </h3>
            <p className={ROW_BLURB} style={{ color: 'var(--era-ink-body)' }}>{blurb}</p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <span
              className="rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1"
              style={{
                background: `linear-gradient(135deg, var(--era-accent), var(--era-accent-alt))`,
                color: 'white',
              }}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

// =============================================================
// ERA BLOCK DATA — fed into <WorkViewer />.
// renderHeader uses the same EraHeader component above.
// =============================================================

const homeBlocks: EraBlockData[] = [
  {
    theme: 'now',
    label: 'NOW',
    era: 'ERA · NOW',
    years: 'Matt Hanson · Product Founder · Designer · Developer',
    renderHeader: (theme, era, years, tagline) => (
      <EraHeader theme={theme} era={era} years={years} tagline={tagline} />
    ),
    rows: (
      <>
        <WorkRow staggerIndex={0} theme="now" href="/work/heirloom" index="01" title="Heirloom" blurb="Recipe preservation, social cookbooks, AI-assisted import. Native iOS, live on the App Store. Built solo." meta="iOS · live" accentVar="var(--project-heirloom)" />
        <WorkRow staggerIndex={1} theme="now" href="/work/silly-questions" index="02" title="Silly Questions" blurb="A 2-player AI art party game. Live on iOS and the web. Eight art styles, no app download required." meta="Web + iOS · live" accentVar="var(--project-silly)" />
        <WorkRow staggerIndex={2} theme="now" href="/work/zero" index="03" title="Zero" blurb="Shortform email. Swipe-first triage with AI-extracted action items. Shipped cross-platform, then deprioritized — read why." meta="Cross-platform · deprioritized" />
        <WorkRow staggerIndex={3} theme="now" href="/work/vault" index="✱" gated title="Vault" blurb="Confidential client work and concept ventures. Locked — request access." meta="Confidential · client + concept" accentVar="var(--project-vault)" />
      </>
    ),
  },
  {
    theme: 'meta',
    label: 'LEADER',
    era: 'ERA · LEADER',
    years: '2017 — 2025',
    tagline: 'AR platform leadership. Spark, Orion, FAIR Embodied AI.',
    renderHeader: (theme, era, years, tagline) => (
      <EraHeader theme={theme} era={era} years={years} tagline={tagline} />
    ),
    rows: (
      <>
        <WorkRow staggerIndex={0} theme="meta" href="/work/fair-embodied-ai" index="04" title="FAIR Embodied AI" blurb="SIRo + Motivo · embodied agent UX. Built and led 4+ teams across simulation and real-world environments." meta="Senior Product Design Manager · 2023–2025" />
        <WorkRow staggerIndex={1} theme="meta" href="/work/orion" index="05" title="Orion" blurb="UX for Meta's first true AR glasses, in a regular glasses form factor. Senior Product Design Manager across Day-1 use cases." meta="Senior Product Design Manager · 2023–2025" />
        <WorkRow staggerIndex={2} theme="meta" href="/work/spark-ar" index="06" title="Spark AR" blurb="Built and led the Experiences team that turned Spark from a few flagship effects into a creator platform across Facebook, Instagram, and Messenger. Scope spanned design, prototyping, education, and the F8 stage." meta="Senior Product Design Manager · 2017–2023" />
      </>
    ),
  },
  {
    theme: 'maker',
    label: 'DIRECTOR',
    era: 'ERA · DIRECTOR',
    years: '2000 — 2017',
    tagline: 'Animation, creative direction, mixed-reality installations.',
    renderHeader: (theme, era, years, tagline) => (
      <EraHeader theme={theme} era={era} years={years} tagline={tagline} />
    ),
    rows: (
      <>
        <WorkRow staggerIndex={0} theme="maker" href="/work/framestore" index="07" gated title="Framestore VR" blurb="Creative Director · 2017. VR/AR pitch portfolio &mdash; the bridge into Meta." meta="CONFIDENTIAL · 2017" />
        <WorkRow staggerIndex={1} theme="maker" href="/work/viacom" index="08" title="Viacom" blurb="Director, Screen Content. The Past Present and Future room, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House." meta="DIRECTOR · 2015–2017" />
        <WorkRow staggerIndex={2} theme="maker" href="/work/studio-era" index="09" title="Studio Era" blurb="Psyop, Imaginary Forces, Buck, own studio, Hush. Animation, creative direction, mixed-reality installations." meta="MULTI-STUDIO · 2000–2015" />
      </>
    ),
  },
];

// =============================================================
// PAGE
// =============================================================

export default function HomePage() {
  // Person + WebSite + Organization now render at the root layout for
  // every page, so we only need the page-specific Breadcrumb here.
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

        {/* WORK VIEWER — desktop is parallax-merge; mobile is straight
            vertical scroll. Two implementations, same data. */}
        <div className="hidden md:block">
          <WorkViewer blocks={homeBlocks} />
        </div>
        <WorkViewerMobile blocks={homeBlocks} />

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

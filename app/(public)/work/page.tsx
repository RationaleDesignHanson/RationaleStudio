/**
 * Work index — chronological table of contents inside a single
 * scrollable Viewer. As you scroll between eras the chrome
 * (border, background, ASCII shader colors) transitions.
 *
 *   NOW      (2024 —)     paper monograph + holographic headline
 *   LEADER   (2017 — 25)  flat-modern Family-of-Apps
 *   DIRECTOR (2000 — 17)  Designer's Republic / Tomato — black + neon
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Lock } from 'lucide-react';
import { WorkViewer, type EraBlockData } from '@/components/work/WorkViewer';

type EraTheme = 'now' | 'meta' | 'maker';

// =============================================================
// ERA HEADER — same treatment as homepage, kept inline so each
// page can iterate freely on its own header chrome if needed.
// =============================================================

interface EraHeaderProps {
  theme: EraTheme;
  era: string;
  years: string;
  tagline?: string;
}

function EraHeader({ theme, era, years, tagline }: EraHeaderProps) {
  if (theme === 'maker') {
    return (
      <div className="mb-10 md:mb-14 relative">
        <div className="grid md:grid-cols-12 md:gap-6 items-end">
          <div className="md:col-span-8">
            <p
              className="text-[11px] md:text-xs font-mono tracking-[0.4em] uppercase mb-3"
              style={{ color: 'var(--era-accent)' }}
            >
              ▌ {era} ▐
            </p>
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
    return (
      <div className="mb-10 md:mb-14">
        <p
          className="text-[11px] md:text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-3"
          style={{ color: 'var(--era-accent)' }}
        >
          {era}
        </p>
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

  // NOW — holographic monotone "NOW" with ASCII-dithered leading edge
  return (
    <div className="mb-10 md:mb-14">
      <p
        className="text-[11px] md:text-xs font-mono tracking-[0.3em] uppercase mb-3"
        style={{ color: 'var(--era-ink-muted)' }}
      >
        {era}
      </p>
      <div
        className="flex items-end justify-between gap-4 border-b pb-5"
        style={{ borderColor: 'var(--era-ink)' }}
      >
        <div>
          <h2 className="holo-headline font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
            <span className="holo-text">NOW</span>
            <span aria-hidden className="holo-ascii">
              ░▒▓░▒▓▒░▓█▓▒░▒▓░▒▓▒░▓█▓▒░▒▓░▒▓▒░▓█▓▒░▒▓░▒▓▒░▓█▓▒░▒▓░▒▓▒░▓█▓▒░▒▓░▒▓▒░
            </span>
          </h2>
          <p
            className="mt-2 font-mono text-sm md:text-base tracking-wide"
            style={{ color: 'var(--era-ink-muted)' }}
          >
            {years}
          </p>
        </div>
        {tagline && (
          <p className="hidden md:block text-sm italic max-w-md text-right pb-2" style={{ color: 'var(--era-ink-muted)' }}>
            {tagline}
          </p>
        )}
      </div>
      {tagline && (
        <p className="md:hidden text-sm italic mt-3" style={{ color: 'var(--era-ink-muted)' }}>
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
}

function WorkRow(props: WorkRowProps) {
  if (props.theme === 'maker') return <MakerRow {...props} />;
  if (props.theme === 'meta') return <MetaRow {...props} />;
  return <NowRow {...props} />;
}

// Standard row dimensions used across all three eras.
const ROW_PAD = 'block py-6 md:py-7 px-4 md:px-5';
const ROW_GRID = 'grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start';
const ROW_NUMERAL = 'font-mono text-base sm:text-lg md:text-xl tracking-wider tabular-nums leading-none';
const ROW_TITLE = 'text-xl md:text-2xl leading-tight mb-2 transition-colors flex items-baseline gap-2';
const ROW_BLURB = 'text-sm md:text-base leading-relaxed max-w-2xl';

function glintStyle(index: string): React.CSSProperties {
  const n = (parseInt(index, 10) || 1) - 1;
  return { ['--glint-delay' as string]: `${n * 0.6}s` };
}

function NowRow({ href, index, title, blurb, meta, gated, accentVar }: WorkRowProps) {
  const accent = accentVar ?? 'var(--era-ink-muted)';
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index) }}
    >
      <Link href={href} className={`${ROW_PAD} -mx-4 md:-mx-5 transition-colors hover:bg-[var(--era-bg-deep)]`}>
        <div className={ROW_GRID}>
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span className="block w-[3px] self-stretch min-h-[2.25rem] md:min-h-[2.5rem]" style={{ backgroundColor: accent }} aria-hidden />
            <span className={ROW_NUMERAL} style={{ color: accent }}>{index}</span>
          </div>
          <div className="md:col-span-7">
            {meta && <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: accent }}>{meta}</p>}
            <h3 className={`font-display ${ROW_TITLE} group-hover:text-[var(--era-accent)]`} style={{ color: 'var(--era-ink)' }}>
              {gated && <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--era-ink-muted)' }} />}
              {title}
            </h3>
            <p className={ROW_BLURB} style={{ color: 'var(--era-ink-body)' }}>{blurb}</p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <ArrowRight className="w-4 h-4 group-hover:text-[var(--era-accent)] transition-colors" style={{ color: 'var(--era-ink-muted)' }} />
          </div>
        </div>
      </Link>
    </div>
  );
}

function MakerRow({ href, index, title, blurb, meta, gated }: WorkRowProps) {
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index) }}
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
            <span className="font-mono text-xs tracking-widest" style={{ color: 'var(--era-accent)' }}>►</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

function MetaRow({ href, index, title, blurb, meta, gated }: WorkRowProps) {
  return (
    <div
      className="group relative border-t first:border-t-0 row-glint"
      style={{ borderColor: 'var(--era-hairline)', ...glintStyle(index) }}
    >
      <Link href={href} className={`${ROW_PAD} -mx-4 md:-mx-5 transition-colors hover:bg-[var(--era-bg-deep)]`}>
        <div className={ROW_GRID}>
          <div className="md:col-span-2 flex items-baseline gap-3 md:gap-4 mb-2 md:mb-0">
            <span className={`font-sans font-semibold ${ROW_NUMERAL.replace('font-mono ', '')}`} style={{ color: 'var(--era-accent)' }}>
              {index}
            </span>
          </div>
          <div className="md:col-span-7">
            {meta && (
              <p className="text-[11px] font-mono tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--era-accent-alt)' }}>
                {meta}
              </p>
            )}
            <h3 className={`font-sans font-semibold ${ROW_TITLE} group-hover:text-[var(--era-accent)]`} style={{ color: 'var(--era-ink)' }}>
              {gated && <Lock className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--era-ink-muted)' }} />}
              {title}
            </h3>
            <p className={ROW_BLURB} style={{ color: 'var(--era-ink-body)' }}>{blurb}</p>
          </div>
          <div className="md:col-span-3 hidden md:flex md:justify-end pt-2">
            <span
              className="rounded-full w-8 h-8 flex items-center justify-center transition-all group-hover:scale-105"
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
// ERA BLOCK DATA — fed into <WorkViewer />
// =============================================================

const workBlocks: EraBlockData[] = [
  {
    theme: 'now',
    label: 'NOW',
    era: 'ERA · NOW',
    years: 'Solo Designer-Engineer',
    renderHeader: (theme, era, years, tagline) => (
      <EraHeader theme={theme} era={era} years={years} tagline={tagline} />
    ),
    rows: (
      <>
        <WorkRow theme="now" href="/work/heirloom" index="01" title="Heirloom" blurb="iOS recipe preservation, social cookbooks. Live on the App Store. 24 SPM packages, AI-assisted import across five formats." meta="iOS · live · 2024 — present" accentVar="var(--project-heirloom)" />
        <WorkRow theme="now" href="/work/silly-questions" index="02" title="Silly Questions" blurb="A 2-player AI art party game. Live now on iOS and the web. Eight art styles, no app download required." meta="Web + iOS · live" accentVar="var(--project-silly)" />
        <WorkRow theme="now" href="/work/zero" index="03" title="Zero" blurb="A working email-triage prototype that didn&rsquo;t ship — read why." meta="Prototype · didn&rsquo;t ship" />
        <WorkRow theme="now" href="/work/vault" index="✱" gated title="Vault" blurb="Confidential client work and concept ventures — Athletes First, Fubo, Rumi, Nimbus, and the rest of the in-flight bets." meta="Confidential · client + concept" accentVar="var(--project-vault)" />
      </>
    ),
  },
  {
    theme: 'meta',
    label: 'LEADER',
    era: 'ERA · LEADER',
    years: '2017 — 2025',
    tagline: 'AR platform leadership across Spark, Orion, and FAIR.',
    renderHeader: (theme, era, years, tagline) => (
      <EraHeader theme={theme} era={era} years={years} tagline={tagline} />
    ),
    rows: (
      <>
        <WorkRow theme="meta" href="/work/fair-embodied-ai" index="04" title="FAIR Embodied AI" blurb="SIRo + Motivo · embodied agent UX. Built and led 4+ teams across simulation and real-world environments." meta="Embodied AI · 2023–2025" />
        <WorkRow theme="meta" href="/work/orion" index="05" title="Orion" blurb="UX for Meta&rsquo;s first true AR glasses, in a regular glasses form factor. Senior Design Manager across Day-1 use cases." meta="Sr. Design Manager · 2023–2025" />
        <WorkRow theme="meta" href="/work/spark-ar" index="06" title="Spark AR" blurb="From four flagship effects at F8 2018 to a platform used by billions across Facebook, Instagram, and Messenger. 400+ XFN org, 150% YoY growth." meta="Experiences team lead · 2017–2023" />
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
        <WorkRow theme="maker" href="/work/framestore" index="07" title="Framestore VR Studio" blurb="Creative Director · 2017. VR/AR pitch portfolio — the bridge into Meta." meta="CONFIDENTIAL · 2017" gated />
        <WorkRow theme="maker" href="/work/viacom" index="08" title="Viacom" blurb="Director, Screen Content. Past Present and Future, Outrage Machine billboards, MTV Open Your Eyes Tilt Brush at the White House." meta="DIRECTOR · 2015–2017" />
        <WorkRow theme="maker" href="/work/studio-era" index="09" title="Studio Era" blurb="Psyop, Imaginary Forces, Buck, own studio, Hush. Animation, creative direction, mixed-reality installations." meta="MULTI-STUDIO · 2000–2015" />
      </>
    ),
  },
];

// =============================================================
// PAGE
// =============================================================

export default function WorkIndexPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      {/* HERO */}
      <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
            WORK · CHRONOLOGICAL
          </p>
          <h1 className="font-display text-display text-ink mb-6 max-w-3xl">
            Work, organized chronologically.
          </h1>
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
            Creative direction and visual effects. Spatial experiences and interactive systems. AR at billion-user scale. Now &mdash; consumer apps shipped solo. The work compounds.
          </p>
        </div>
      </section>

      {/* WORK VIEWER — single bounded scroll containing all eras */}
      <WorkViewer blocks={workBlocks} />

      {/* GATED FOOTER NOTE */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-hairline bg-paper">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
          <p className="text-xs md:text-sm text-ink-muted leading-relaxed flex items-center gap-2">
            <Lock className="w-3 h-3 text-ink-muted" />
            Gated items are password-protected. Email{' '}
            <a href="mailto:hanson@rationale.work" className="text-[var(--accent-ink)] hover:text-ink underline">
              hanson@rationale.work
            </a>{' '}
            for access.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[var(--accent-ink)] hover:text-ink font-display italic transition-colors"
          >
            Get in touch <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </section>
    </main>
  );
}

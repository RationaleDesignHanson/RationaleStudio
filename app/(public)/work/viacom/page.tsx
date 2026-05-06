/**
 * Viacom — case study formatted as work-row chapters,
 * DIRECTOR era styling (black + magenta + cyan neon).
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { Plate } from '@/components/case-study/Plate';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function ViacomPage() {
  return (
    <ProjectScope project="viacom">
      <main
        className="era-maker min-h-screen"
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>08</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · DIRECTOR</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2015 — 2017</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-mono text-display font-bold uppercase tracking-tighter text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Viacom
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Mixed-reality and large-canvas interactive at Viacom&rsquo;s Times Square headquarters. Director, Screen Content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE WORK */}
        <ChapterRow index="01" kicker="THE WORK · 4 PROJECTS · 2 YEARS" title="Mixed-reality and large-canvas interactive">
          <p>
            Four projects in two years across Viacom&rsquo;s Times Square headquarters and one White House lawn. Mixed-reality, real-time playback systems, and large-canvas interactive work &mdash; designed and architected together, software through fabrication.
          </p>
          <div className="mt-4">
            <Figure figNumber="FIG. 01" caption="Past Present and Future · 84-inch transparent touch display, mixed-reality lighting, and a Pepper&rsquo;s-ghost diorama">
              <Image src="/images/work/viacom/ppf-installation-1.jpg" alt="Viacom · Past Present and Future installation" width={2400} height={1600} className="w-full h-auto rounded-md" priority />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — SCREENS */}
        <ChapterRow index="02" kicker="THE SCREENS · REAL-TIME PLAYBACK" title="The system that powered the building">
          <p>
            <strong className="text-[var(--era-ink)]">The Screens</strong> &mdash; a real-time dynamic playback system that powered the brand IDs throughout Viacom&rsquo;s Times Square HQ. Tag-based content routing fed live social feeds into the displays alongside curated brand content, refreshing in real time across the building&rsquo;s lobby, conference rooms, and floor edges.
          </p>
          <p>
            Designed and architected the playback system together &mdash; software, content tooling, and physical install &mdash; so the system was authored by the brand teams who would use it, not engineered around their inability to.
          </p>
          <div className="mt-6 md:mt-8">
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
              <video
                src="/images/work/viacom/screens-reel.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
              <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">
                FIG. 02 &middot; The Screens reel · brand IDs · live data routing across HQ
              </p>
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — PAST PRESENT AND FUTURE */}
        <ChapterRow index="03" kicker="PAST PRESENT AND FUTURE · CODENAME HYPEBOX · 2016" title="84 inches of mixed reality">
          <p>
            An 84-inch transparent touch display, layered with mixed-reality lighting and a Pepper&rsquo;s-ghost-style diorama behind it. Officially the <em>&ldquo;History of Viacom&rdquo;</em> installation &mdash; visitors interacted with the screen and watched physical models behind it light up in response.
          </p>
          <p>
            Six chapters and twenty &ldquo;magic moments&rdquo; of Viacom&rsquo;s company history, acquisitions, and cultural touchpoints. The build pulled together video pipeline, lighting design, fabrication, and touch UI &mdash; a complete physical-plus-digital experience at one piece of furniture&rsquo;s scale.
          </p>
          <div className="mt-2">
            <a
              href="https://motionographer.com/2016/10/18/making-mixed-reality-behind-the-scenes-of-the-history-of-viacom-installation/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
            >
              Behind-the-scenes · Motionographer <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* CONCEPT */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The concept · State 1
            </p>
            <Figure figNumber="FIG. 02" caption="VIACOM: PAST. PRESENT. FUTURE. · proposal showing the 6-row exploded timeline">
              <Image src="/images/work/viacom/ppf-concept-state-1.jpg" alt="Past Present and Future · concept slide" width={1800} height={1013} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          {/* SYSTEM */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The system · empty wall, chapter taxonomy, color sets
            </p>
            <Plate variant="triptych">
              <Figure figNumber="FIG. 03" caption="The wall before content · 84-inch shelving render">
                <Image src="/images/work/viacom/ppf-render-empty-wall.jpg" alt="Empty Past Present and Future wall render" width={1600} height={900} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 04" caption="Chapter taxonomy · acquisitions, launches, hits, awards, fandom, achievements, pro social">
                <Image src="/images/work/viacom/ppf-chapter-taxonomy.jpg" alt="Chapter taxonomy storyboard" width={1600} height={1067} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 05" caption="Color-set palettes · five sets mapping to grid positions">
                <Image src="/images/work/viacom/ppf-color-sets.jpg" alt="Color set palettes" width={1600} height={1326} className="w-full h-auto" />
              </Figure>
            </Plate>
          </div>

          {/* PRODUCTION */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The production · physical maquettes feeding the digital build
            </p>
            <Plate variant="lead-2">
              <Plate.Lead>
                <Figure figNumber="FIG. 06" caption="Production wall · master guide + 24+ chapter design briefs">
                  <Image src="/images/work/viacom/ppf-production-wall.jpg" alt="Production wall with all chapter briefs" width={1800} height={1350} className="w-full h-auto" />
                </Figure>
              </Plate.Lead>
              <Plate.Aside>
                <div className="space-y-4 md:space-y-6">
                  <Figure figNumber="FIG. 07" caption="Maquettes · cardboard chamber prototypes">
                    <Image src="/images/work/viacom/ppf-maquettes-desk.jpg" alt="Cardboard maquettes on a desk" width={1600} height={1200} className="w-full h-auto" />
                  </Figure>
                  <Figure figNumber="FIG. 08" caption="Save The Music · physical horn maquette">
                    <Image src="/images/work/viacom/ppf-savemusic-maquette.jpg" alt="Save The Music horn maquette" width={1400} height={1050} className="w-full h-auto" />
                  </Figure>
                </div>
              </Plate.Aside>
            </Plate>
          </div>

          {/* PHYSICAL TO DIGITAL — Save The Music walkthrough */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Physical &rarr; digital · the Save The Music chamber
            </p>
            <Plate variant="split">
              <Figure figNumber="FIG. 09" caption="Design doc · Top view, model notes, design ref, animation brief">
                <Image src="/images/work/viacom/ppf-savemusic-design-doc.jpg" alt="Save The Music design doc" width={1400} height={1050} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 10" caption="Final render · chrome music sculpture in a pink chamber">
                <Image src="/images/work/viacom/ppf-savemusic-render.jpg" alt="Save The Music final render" width={1400} height={1400} className="w-full h-auto" />
              </Figure>
            </Plate>
          </div>

          {/* FINISHED */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The finished install
            </p>
            <Figure figNumber="FIG. 11" caption="THE HISTORY OF VIACOM · finished render with content populated">
              <Image src="/images/work/viacom/ppf-render-finished.jpg" alt="Past Present and Future finished render with content" width={1800} height={1200} className="w-full h-auto rounded-md" />
            </Figure>

            <div className="mt-6 md:mt-8">
              <Plate variant="triptych">
                <Figure figNumber="FIG. 12" caption="Installation · dusk lighting state">
                  <Image src="/images/work/viacom/ppf-installation-2.jpg" alt="Installation dusk lighting" width={1600} height={1067} className="w-full h-auto" />
                </Figure>
                <Figure figNumber="FIG. 13" caption="Pepper&rsquo;s-ghost diorama detail">
                  <Image src="/images/work/viacom/ppf-detail-1.jpg" alt="Diorama detail" width={850} height={638} className="w-full h-auto" />
                </Figure>
                <Figure figNumber="FIG. 14" caption="Magic-moment chapter activation">
                  <Image src="/images/work/viacom/ppf-detail-3.jpg" alt="Magic-moment activation" width={850} height={638} className="w-full h-auto" />
                </Figure>
              </Plate>
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 04 — OUTRAGE MACHINE */}
        <ChapterRow index="04" kicker="OUTRAGE MACHINE · TIMES SQUARE · NYU ITP" title="The largest canvases">
          <p>
            A real-time playback system on Viacom&rsquo;s largest Times Square billboards, developed in collaboration with students at NYU&rsquo;s ITP program.
          </p>
          <p>
            Live data drove dynamic visual treatments at street scale &mdash; the largest canvases I&rsquo;ve ever shipped to.
          </p>
          <div className="mt-4 max-w-3xl">
            <Figure figNumber="FIG. 08" caption="Outrage Machine on Viacom's Times Square billboards">
              <Image src="/images/work/viacom/outrage-machine.jpg" alt="Outrage Machine billboards" width={1600} height={1067} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — MTV OPEN YOUR EYES */}
        <ChapterRow index="05" kicker="MTV OPEN YOUR EYES · WHITE HOUSE · 2016" title="Tilt Brush at South by South Lawn">
          <p>
            A Tilt Brush VR art show staged at the White House South by South Lawn (2016). Worked with artists creating in VR; their work was displayed alongside lenticular-print companion pieces created from the VR captures.
          </p>
        </ChapterRow>

        {/* CHAPTER 06 — COMPOSITION VI */}
        <ChapterRow index="06" kicker="COMPOSITION VI · COLLABORATION" title="Composition VI">
          <p>
            A long-form generative composition piece for the Viacom HQ environment, made in collaboration with Higa Fox and the Hardwork team. Live-data driven, multi-screen, designed to read across the building&rsquo;s glass and the surrounding street.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
            <a href="https://hardwork.party/viacom-composition-vi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
              hardwork.party · case study <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="https://www.higafox.com/composition-vi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
              higafox.com · composition VI <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="mt-6 md:mt-8 rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
            <video src="/videos/viacom/composition-vi.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
            <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">
              Composition VI &middot; generative multi-screen at Viacom HQ
            </p>
          </div>
        </ChapterRow>

        {/* CHAPTER 07 — ARCHIVE */}
        <ChapterRow index="07" kicker="ARCHIVE · VIMEO SHOWCASE" title="More from the era">
          <p>
            A historical Vimeo showcase &mdash; pieces from across the era, including reels and installation captures.
          </p>
        </ChapterRow>
        <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3 text-xs font-mono text-[var(--era-ink-muted)]">
              <span>iframe &rarr; vimeo.com/showcase/3617561</span>
              <a href="https://vimeo.com/showcase/3617561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors">
                open on Vimeo <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-black" style={{ height: 'min(720px, 80vh)' }}>
              <iframe
                src="https://vimeo.com/showcase/3617561/embed"
                title="Viacom-era Vimeo showcase"
                className="w-full h-full"
                loading="lazy"
                allow="autoplay; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              08 / 09 &middot; END OF CHAPTER
            </p>
            <Link
              href="/work/studio-era"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors"
            >
              Continue &rarr; Studio Era <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

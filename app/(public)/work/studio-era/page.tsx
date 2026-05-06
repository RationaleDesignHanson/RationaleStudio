/**
 * Studio Era — case study formatted as work-row chapters,
 * DIRECTOR era styling (black + magenta + cyan neon).
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function StudioEraPage() {
  return (
    <ProjectScope project="maker">
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · DIRECTOR</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2000 — 2015</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-mono text-display font-bold uppercase tracking-tighter text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Studio Era
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Animation, creative direction, mixed-reality installations &mdash; the fifteen years before Meta.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE ARC */}
        <ChapterRow index="01" kicker="THE ARC · BFA → BROOKLYN INSTALL" title="Five chapters before Meta">
          <p>
            A BFA in Computer Art from SUNY Buffalo (2000), then into the early years of the NYC motion graphics scene and independent studio work. By the mid-2010s the work had moved out of post-production into physical space &mdash; installations at Hush in Brooklyn. Viacom and Framestore VR followed (their own entries), then Meta.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            Each chapter ended pulled toward the next bleeding edge &mdash; motion into CG, post-production into physical space, installations into AR.
          </p>
          <div className="mt-6 rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
            <video
              src="/videos/maker-era/demo-reel.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
            <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">
              FIG. 01 &middot; Maker-era demo reel &middot; mixed reality, motion, installations
            </p>
          </div>
          <div className="mt-6">
            <Figure figNumber="FIG. 02" caption="Career timeline">
              <Image src="/images/work/maker-era/career-timeline.png" alt="Career timeline" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — ANIMATION + VFX */}
        <ChapterRow index="02" kicker="ANIMATION + VFX · EARLY 2000s" title="From After Effects to Psyop">
          <p>
            Came up through After Effects and motion graphics at small NYC design shops, then through Stardust, Buck, Imaginary Forces, Trollback, and Nathan Love. Taught myself the CG pipeline &mdash; Maya, Cinema 4D, Nuke &mdash; on Fanta and Adidas spots in the evenings while doing motion graphics by day. Junior designer to compositor to 3D generalist to creative director, over about a decade.
          </p>
          <p>
            The work that pulled me through that decade was Psyop. Tracked them down in the early 2000s after seeing Company Flow&rsquo;s &ldquo;End to End Burners&rdquo; &mdash; a music video that mixed CG, live action, graffiti, and the New York subway in a way I&rsquo;d never seen before. Spent five or six years working at adjacent shops, building toward a spot on their crew. Eventually got there.
          </p>
          <div className="mt-6">
            <Figure figNumber="FIG. 03" caption="Adidas · Impossible is Nothing · Yao Ming hero comp">
              <Image src="/images/work/maker-era/adidas-yao-ming.jpg" alt="Adidas Yao Ming basketball hero" width={1600} height={1067} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {[
              { src: 'fanta.mp4', label: 'FIG. 04 · Fanta · animation + comp' },
              { src: 'deconstructed-logos.mp4', label: 'FIG. 05 · Deconstructed Logos · motion identity' },
            ].map((v) => (
              <div key={v.src} className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                <video src={`/videos/maker-era/${v.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">{v.label}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — OWN STUDIO */}
        <ChapterRow index="03" kicker="OWN STUDIO · 2009 — 2012" title="Independent shop">
          <p>
            Ran an independent shop for three years. Verizon Fios for McCann was the longest-running engagement and the cash cow. <strong className="text-[var(--era-ink)]">Puma NikeID</strong> &mdash; a custom asset generation system for shoe customization &mdash; was the first piece of platform work I ever built: parametric design, client-facing tooling, automated rendering pipelines. Looking back, a small Spark AR before Spark AR.
          </p>
          <p>
            The shop closed in 2012 when the Verizon work wound down. A brief stint back at Psyop on Mountain Dew and Fanta spots followed.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
              <Image src="/images/work/maker-era/verizon-fios-set.jpg" alt="Verizon Fios storefront SET render" width={1400} height={875} className="w-full h-auto" />
              <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">FIG. 06 · Verizon Fios · storefront SET render for McCann</p>
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
              <video src="/videos/maker-era/verizon-redpen.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
              <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">FIG. 07 · Verizon RedPen · pitch reel</p>
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 04 — HUSH */}
        <ChapterRow index="04" kicker="HUSH · 2012 — 2014 · BROOKLYN" title="Out of post-production, into physical space">
          <p>
            Lead Animation and Experiential Designer at Hush in Brooklyn. The shop&rsquo;s appeal was that it didn&rsquo;t separate the screen from the room &mdash; projects mixed projection, fabrication, motion graphics, and software in whatever combination the brief called for. Under Armour activations, a Niketown installation for the Super Bowl, an iPad/Unity app where users could deconstruct a 3D car layer by layer.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            After more than a decade in post-production, the move into physical space mattered most for what came after. Once you&rsquo;ve watched a stranger&rsquo;s body figure out a gesture you designed, you can&rsquo;t go back to designing for an editor.
          </p>
          <div className="mt-6">
            <Figure figNumber="FIG. 08" caption="Hush · early chambered-shelving maquette · the form that returned three years later as Past Present and Future">
              <Image src="/images/work/maker-era/hush-maquette.jpg" alt="Hush studio maquette" width={1800} height={1013} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
              <video src="/videos/maker-era/hush-social.mp4" autoPlay loop muted playsInline className="w-full h-auto" />
              <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">FIG. 09 · Hush social · activations reel</p>
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
              <Image src="/images/work/maker-era/holorama-bowling.jpg" alt="Holorama Optical Theatre bowling alley scene" width={1600} height={1067} className="w-full h-auto" />
              <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">FIG. 10 · Holorama Optical Theatre · Pepper&rsquo;s-ghost technique applied to a bowling-alley scene · the optical pattern Past Present and Future would later use at scale</p>
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — VIACOM */}
        <ChapterRow index="05" kicker="VIACOM · 2015 — 2017 · TIMES SQUARE" title="Director, Screen Content">
          <p>
            Director, Screen Content at Viacom&rsquo;s Times Square HQ. Four projects: the Screens dynamic playback system, the Past Present and Future room, the Outrage Machine billboards, and the MTV Open Your Eyes Tilt Brush show at the White House.
          </p>
          <p>
            <Link href="/work/viacom" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">
              Full Viacom case study &rarr;
            </Link>
          </p>
        </ChapterRow>

        {/* CHAPTER 06 — FRAMESTORE */}
        <ChapterRow index="06" kicker="FRAMESTORE VR · 2017" title="One year of pitches">
          <p>
            Creative Director at Framestore VR Studio and Framestore Labs. One year. VR/AR pitches for location-based games, motion simulators, educational AR, conversational AI experiences for sports stadiums, and Hyundai experiential work. Most deliverables were pitches; some shipped, some didn&rsquo;t.
          </p>
          <p>
            <Link href="/work/framestore" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">
              Framestore pitch portfolio &rarr;
            </Link>
          </p>
        </ChapterRow>

        {/* CHAPTER 07 — THE PIVOT */}
        <ChapterRow index="07" kicker="PIVOT · MAY 2017" title="The pivot to Meta">
          <p>
            Three months after presenting a 90-slide career portfolio at the Facebook campus in May 2017, I started at Meta as Art Director on Messenger AR. The deck argued one thing: <em>this person keeps moving to the bleeding edge, and he&rsquo;s done it four times.</em> The argument worked.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              09 / 09 &middot; END OF CHAPTER
            </p>
            <Link
              href="/work/heirloom"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors"
            >
              Loop &rarr; Heirloom (Now) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

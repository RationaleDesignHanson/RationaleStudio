/**
 * About — Studio Monograph treatment
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Marginalia } from '@/components/case-study/EditorialLayout';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      {/* HERO */}
      <section className="px-4 sm:px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 border-b border-hairline">
        <div className="max-w-5xl mx-auto">
          <p className="text-[11px] md:text-xs font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
            ABOUT · MATT HANSON
          </p>
          <h1 className="font-display text-display text-ink mb-6 max-w-3xl">
            I build bridges.
          </h1>
          <p className="text-base md:text-lg text-ink-body leading-relaxed max-w-2xl">
            Between people, disciplines, technologies, and ideas. Designer-engineer for over two decades, leading creative direction, AR platforms at Meta scale, and consumer software shipped solo with AI.
          </p>
          <div className="mt-8 md:mt-10">
            <figure className="rounded-md overflow-hidden border border-hairline">
              <Image src="/images/work/about/decks/career-collage.jpg" alt="Career collage spanning Studio Era, Meta, and now" width={1600} height={900} className="w-full h-auto" />
              <figcaption className="text-xs font-mono text-ink-muted px-3 py-2 italic">
                The journey · animation, mixed reality, AR platforms, consumer software shipped solo
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* MAKER ERA */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <aside className="md:col-span-4 md:order-1 mb-6 md:mb-0 text-xs font-mono text-ink-muted leading-relaxed">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Era · Maker</p>
              <Marginalia.Field label="Years">2000 — 2017</Marginalia.Field>
              <Marginalia.Field label="Studios">Psyop · Imaginary Forces · Buck · Hush · Framestore</Marginalia.Field>
              <Marginalia.Field label="Highlights">Past Present and Future · Outrage Machine · MTV / White House</Marginalia.Field>
            </aside>
            <div className="md:col-span-8 md:order-2">
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                Before Meta, the work landed in mixed-reality installations at Viacom &mdash; the Past Present and Future room, Outrage Machine on Times Square, the MTV Open Your Eyes Tilt Brush show at the White House &mdash; and a Framestore VR studio after that.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-6">
                The path there ran through creative direction and visual effects at Psyop, Imaginary Forces, Buck, and my own studio. AR took over from there.
              </p>
              <figure className="rounded-md overflow-hidden border border-hairline bg-paper-deep/30">
                <video
                  src="/videos/maker-era/demo-reel.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto"
                />
                <figcaption className="text-xs font-mono text-ink-muted px-3 py-2 italic">
                  Maker-era demo reel &middot; mixed reality, motion, installations
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* META */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <aside className="md:col-span-4 md:order-1 mb-6 md:mb-0 text-xs font-mono text-ink-muted leading-relaxed">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Era · Meta</p>
              <Marginalia.Field label="Years">2017 — 2025</Marginalia.Field>
              <Marginalia.Field label="Roles">Art Director → PD Manager → Experience Lead</Marginalia.Field>
              <Marginalia.Field label="Org">Reality Labs · 400+ XFN</Marginalia.Field>
              <Marginalia.Field label="Team">Experiences · 2 → 22</Marginalia.Field>
              <Marginalia.Field label="Growth">150% YoY</Marginalia.Field>
              <Marginalia.Field label="AR Commerce">10+ retailers · 100×+ inventory</Marginalia.Field>
              <Marginalia.Field label="FAIR (2023–25)">Embodied AI · 4+ teams · SIRo · Motivo</Marginalia.Field>
              <Marginalia.Rule />
              <Marginalia.Field label="Patent">
                <a
                  href="https://patents.google.com/patent/US11295503B1/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-ink"
                >
                  US11295503B1 →
                </a>
              </Marginalia.Field>
            </aside>
            <div className="md:col-span-8 md:order-2">
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                I joined Meta in 2017 as an Art Director on Messenger AR. In early 2018 the AR product team recruited me, and the role shifted on the fly from creative direction to product design management.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                Over the next five years (2018&ndash;2023, Reality Labs), a small team building camera effects grew into <strong className="text-ink">Spark AR</strong> &mdash; Meta&rsquo;s AR platform of runtime, capabilities, and creator tooling within a 400+ person XFN organization, used across Facebook, Instagram, and Messenger by billions and extended from mobile to headsets.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                The <strong className="text-ink">Experiences team</strong> scaled from 2 to 22 under my lead, took <strong className="text-ink">AR Commerce</strong> from prototype to launch across Instagram and the Family of Apps with 10+ retail partners, and introduced the Product Design Prototyper role that lifted prototype velocity by 60+% &mdash; all in close partnership with the London-based creator-tooling team.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                The Orion chapter followed as <strong className="text-ink">Experience Lead</strong>, driving progress across multiple use cases and teams toward{' '}
                <a
                  href="https://about.fb.com/news/2024/09/introducing-orion-our-first-true-augmented-reality-glasses/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-ink underline"
                >
                  Orion AR Glasses
                </a>{' '}
                Day-1 experiences, alongside Quest MR Mode.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                From 2023 to 2025 the focus moved to <strong className="text-ink">FAIR</strong>, where I led 4+ teams on the <strong className="text-ink">Embodied AI</strong> program &mdash; strategy and prototyping for AI agents across glasses, headsets, and robotics, including SIRo (socially intelligent robots) and Motivo (behavioral foundation models). My team across these chapters contributed to 15+ patents in AR/AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOW */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <aside className="md:col-span-4 md:order-1 mb-6 md:mb-0 text-xs font-mono text-ink-muted leading-relaxed">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Era · Now</p>
              <Marginalia.Field label="Years">2024 —</Marginalia.Field>
              <Marginalia.Field label="Mode">Solo · AI as a coding partner</Marginalia.Field>
              <Marginalia.Rule />
              <Marginalia.Field label="Heirloom">iOS · live</Marginalia.Field>
              <Marginalia.Field label="Silly Questions">Live · web + iOS</Marginalia.Field>
              <Marginalia.Field label="Zero">Working prototype · didn&rsquo;t ship</Marginalia.Field>
              <Marginalia.Note>
                The bet: consumer software a single builder can credibly own end-to-end.
              </Marginalia.Note>
            </aside>
            <div className="md:col-span-8 md:order-2">
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                From Meta until now, the shape of design and product leadership has been shifting &mdash; and rather than try to manage the shift, I went back to building. With AI as a coding partner.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                The progression has been deliberate: tools for my own ceramics hobby, then design at startups, prototypes for partners, and the work that&rsquo;s followed. Each project builds on the last in complexity and quality.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                <strong className="text-ink">Heirloom</strong> (recipe preservation, social cookbooks) is the headline now &mdash; a native iOS app with AI-assisted import across five formats, shared cookbooks with real-time sync, and push notifications. Built solo. Meal planning and a Watch experience are queued for after the core lands.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                <strong className="text-ink">Silly Questions</strong> (a 2-player AI art party game) shipped earlier in the year as a smaller test of the method.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-4">
                Not everything ships: <strong className="text-ink">Zero</strong> stayed at prototype because email demands near-perfect accuracy and too many third-party dependencies for a one-person studio.
              </p>
              <p className="font-display italic text-xl md:text-2xl text-ink leading-snug">
                The bet now is consumer software a single builder can credibly own end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WRITING + CONTACT */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 md:gap-8 lg:gap-12">
            <aside className="md:col-span-4 md:order-1 mb-6 md:mb-0 text-xs font-mono text-ink-muted leading-relaxed">
              <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3">Reach</p>
              <Marginalia.Field label="Email">
                <a href="mailto:hanson@rationale.work" className="text-[var(--accent)] hover:text-ink">
                  hanson@rationale.work
                </a>
              </Marginalia.Field>
              <Marginalia.Field label="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/thematthanson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-ink"
                >
                  thematthanson →
                </a>
              </Marginalia.Field>
              <Marginalia.Field label="Substack">
                <a
                  href="https://matthanson.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-ink"
                >
                  matthanson →
                </a>
              </Marginalia.Field>
              <Marginalia.Rule />
              <Marginalia.Note>
                NYC area. Three daughters. Cooking, Peloton (because of the cooking),{' '}
                <a href="/prototypes/pottery-gifts/index.html" className="text-[var(--accent)] hover:text-ink underline">
                  ceramics
                </a>
                , New York sports.
              </Marginalia.Note>
            </aside>
            <div className="md:col-span-8 md:order-2">
              <p className="text-base md:text-lg text-ink-body leading-relaxed mb-3">
                I write about the method at{' '}
                <a
                  href="https://matthanson.substack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:text-ink underline"
                >
                  matthanson.substack.com
                </a>.
              </p>
              <p className="text-base md:text-lg text-ink-body leading-relaxed">
                Available for very selective partnership work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP CREDO */}
      <section className="px-4 sm:px-6 md:px-8 py-10 md:py-16 border-b border-hairline">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ink mb-3 font-mono">How I work</p>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            <figure className="rounded-md overflow-hidden border border-hairline">
              <Image src="/images/work/about/decks/leadership-credo.jpg" alt="Self-Expectations and Team-Expectations" width={1600} height={900} className="w-full h-auto" />
              <figcaption className="text-xs font-mono text-ink-muted px-3 py-2 italic">
                Self-Expectations / Team-Expectations · the credo
              </figcaption>
            </figure>
            <figure className="rounded-md overflow-hidden border border-hairline">
              <Image src="/images/work/about/decks/lift-framing.jpg" alt="LIFT framing — Lead by Example, Inspire to drive Impact, Function Agnostic, Trust as two way street" width={1600} height={900} className="w-full h-auto" />
              <figcaption className="text-xs font-mono text-ink-muted px-3 py-2 italic">
                LIFT &middot; Lead by Example · Inspire to drive Impact · Function Agnostic · Trust as two-way street
              </figcaption>
            </figure>
          </div>
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-ink-muted mb-3 font-mono">Deeper reading · gated</p>
            <ul className="space-y-2">
              <li>
                <Link href="/work/decks/portfolio-flash-2024" className="text-[var(--accent)] hover:text-ink font-display italic text-base md:text-lg underline">
                  Portfolio Flash · October 2024 (104 pages)
                </Link>
                <span className="text-sm text-ink-muted ml-2">— FAIR, Spark AR, AR Commerce, AR Ads</span>
              </li>
              <li>
                <Link href="/work/decks/portfolio-2022" className="text-[var(--accent)] hover:text-ink font-display italic text-base md:text-lg underline">
                  Portfolio · Spring 2022 (29 pages)
                </Link>
                <span className="text-sm text-ink-muted ml-2">— Spark on Wearables, Camera AR Platform case study, Hanson Scope</span>
              </li>
              <li>
                <Link href="/work/decks/world-ar-avatars" className="text-[var(--accent)] hover:text-ink font-display italic text-base md:text-lg underline">
                  World AR Avatars · Q2 2021 (26 pages)
                </Link>
                <span className="text-sm text-ink-muted ml-2">— the strategic source for the world-locked-avatars patent</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-16 bg-paper-deep/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-ink font-display italic text-lg md:text-xl transition-colors"
          >
            See the work, organized chronologically <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="mailto:hanson@rationale.work"
            className="text-sm font-mono text-ink-muted hover:text-ink transition-colors"
          >
            hanson@rationale.work
          </a>
        </div>
      </section>
    </main>
  );
}

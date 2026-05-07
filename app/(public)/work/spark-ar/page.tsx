/**
 * Spark AR — case study formatted as work-row chapters.
 *
 * Each chapter mirrors the work-index row pattern: accent stripe +
 * numeral on the left, meta + title + body on the right. Reads as
 * one visual family with the work viewer on the home page.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { Figure } from '@/components/case-study/Figure';
import { Plate } from '@/components/case-study/Plate';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export default function SparkARPage() {
  return (
    <ProjectScope project="spark-ar">
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight tabular-nums" style={{ color: 'var(--accent)' }}>06</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">/ 09</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · LEADER</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2017 — 2023</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Spark AR
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Four flagship effects to a platform used by billions across Facebook, Instagram, Messenger, Portal, and Quest. Led the Experiences team &mdash; built, scaled, and taught.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — ORIGIN · CLASS 113 */}
        <ChapterRow
          index="01"
          kicker="ORIGIN · F8 2018 · CLASS 113"
          title="The lightning talk that started it"
        >
          <p>
            Before Spark AR existed as a named product, the Messenger AR team shipped four flagship effects to prove AR could be commercial-grade across very different verticals: <strong className="text-[var(--era-ink)]">Sephora</strong> virtual makeup, <strong className="text-[var(--era-ink)]">KIA</strong> at vehicle scale, <strong className="text-[var(--era-ink)]">Nike SNKRS</strong> footwear, and <strong className="text-[var(--era-ink)]">ASUS Portal</strong> hardware visualization.
          </p>
          <p>
            I presented them at F8 2018 Day 2, Class 113 &mdash; thrown to by Loredana Crisan, then Head of Design at Messenger (now CDO at Figma). The room was rated for 100 and packed past capacity. The talk made the case for AR being a primary social mode, not a filter add-on.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            That session is the inflection point for everything below.
          </p>
          <div className="mt-6 md:mt-8">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The four flagship effects
            </p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { src: 'nike.mp4', label: 'Nike SNKRS · footwear in the SNKRS app' },
                { src: 'sephora.mp4', label: 'Sephora · virtual makeup try-on' },
                { src: 'kia.mp4', label: 'KIA · vehicle-scale AR placement' },
                { src: 'asus.mp4', label: 'ASUS Portal · hardware visualization' },
              ].map((v) => (
                <div key={v.src} className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/30">
                  <video src={`/videos/spark-ar/${v.src}`} autoPlay loop muted playsInline className="w-full h-auto" />
                  <p className="text-xs text-[var(--era-ink-muted)] px-3 py-1.5 italic font-mono">{v.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ChapterRow>

        {/* CHAPTER 02 — PLATFORM LEADERSHIP */}
        <ChapterRow
          index="02"
          kicker="PLATFORM LEADERSHIP · 2018 — 2023"
          title="Building the platform under it"
        >
          <p>
            What grew out of Class 113 was <strong className="text-[var(--era-ink)]">Spark AR</strong> &mdash; runtime, capabilities, and creator tooling, supported by a 400+ person XFN organization. I led the Experiences team in close partnership with the London-based creator-tooling team, scaling from 2 to 22 ICs over five years.
          </p>
          <p>
            The org introduced the <strong className="text-[var(--era-ink)]">Product Design Prototyper</strong> role within Spark AR, lifting prototype velocity by 60+%. We also designed and shipped <strong className="text-[var(--era-ink)]">Story Time</strong> with the Portal team &mdash; a flagship AR feature for video calls that outperformed standard video on engagement and retention. The result confirmed AR could be a primary social mode, not a filter add-on.
          </p>
          <div className="mt-6 md:mt-8">
            <Plate variant="split">
              <Figure figNumber="FIG. 02" caption="Platform overview — surfaces, runtime, creator tooling">
                <Image src="/images/work/spark-ar/figma/spark-overview.jpg" alt="Spark AR platform overview" width={1200} height={900} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 03" caption="Team growth — 2 → 22 ICs across Mobile and AR/MR">
                <Image src="/images/work/spark-ar/figma/team-growth.jpg" alt="Experiences team growth" width={1200} height={900} className="w-full h-auto" />
              </Figure>
            </Plate>
          </div>
          <div className="mt-6 md:mt-8">
            <Figure figNumber="FIG. 04" caption="Hanson Scope · Experiences side (8 PDs + 6 Prototypers + 6 TAs · social) and Platforms side (3 PDs · camera) · the org chart visualized">
              <Image src="/images/work/spark-ar/decks/hanson-scope.jpg" alt="Hanson scope diagram" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-6 md:mt-8">
            <Figure figNumber="FIG. 05" caption="Spark on Wearables · de-risking the move from phones to constrained devices · 4 → 40 XFN in 1 year">
              <Image src="/images/work/spark-ar/decks/spark-on-wearables.jpg" alt="Spark on Wearables" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-6">
            <Link
              href="/work/decks/portfolio-2022"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border-2 transition-colors"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Read the Spring 2022 deck · 29 pages, gated <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — AR COMMERCE */}
        <ChapterRow
          index="03"
          kicker="AR COMMERCE · 0 → 1"
          title="From prototype to retailer scale"
        >
          <p>
            In parallel with platform growth, the team took <strong className="text-[var(--era-ink)]">AR Commerce</strong> from prototype to launch across Instagram and the Family of Apps. Try-ons (cosmetics, footwear, eyewear), branded AR ad formats (<em>Pringles</em>, the <em>Avatar</em> movie launch), and dynamic product placement &mdash; with 10+ retail partners and 200+ products in market.
          </p>
          <p>
            Underneath sat the <strong className="text-[var(--era-ink)]">Container Effects System</strong> &mdash; an extensible substrate for portable UX across Instagram and Facebook, separating interface from content. Three pillars (<em>Bulk Asset Upload · Parameterization · Content Assembly</em>) and seven components made AR Commerce buildable at retailer scale rather than per-effect bespoke.
          </p>
          <p>
            The work surfaced a Three-Pillar success model balancing <strong className="text-[var(--era-ink)]">consumer · platform · business</strong> outcomes, and a conversion funnel that became the template for measuring AR-driven commerce inside Meta.
          </p>

          {/* Container Effects + Funnel + Pillars plate */}
          <div className="mt-6 md:mt-8">
            <Plate variant="lead-2">
              <Plate.Lead>
                <Figure figNumber="FIG. 06" caption="Container Effects System — 3 pillars, 7 components">
                  <Image src="/images/work/spark-ar/figma/container-effects.jpg" alt="Container Effects System diagram" width={1600} height={1200} className="w-full h-auto" />
                </Figure>
              </Plate.Lead>
              <Plate.Aside>
                <div className="space-y-4 md:space-y-6">
                  <Figure figNumber="FIG. 07" caption="Funnel — entry strategies by user intent">
                    <Image src="/images/work/spark-ar/figma/funnel-analysis.jpg" alt="AR Commerce funnel analysis" width={800} height={900} className="w-full h-auto" />
                  </Figure>
                  <Figure figNumber="FIG. 08" caption="Three Success Pillars — consumer · platform · business">
                    <Image src="/images/work/spark-ar/figma/three-success-pillars.jpg" alt="Three success pillars framework" width={800} height={900} className="w-full h-auto" />
                  </Figure>
                </div>
              </Plate.Aside>
            </Plate>
          </div>

          {/* Three-Sided Marketplace + MAC try-on flow + Pattern + Container Effects */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              The marketplace · the system · the experience
            </p>
            <Figure figNumber="FIG. 09" caption="Three-Sided Marketplace · Platform Integration · Consumer Experience · Business Solutions">
              <Image src="/images/work/spark-ar/decks/three-sided-marketplace.jpg" alt="Three-Sided Marketplace" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>
          <div className="mt-6 md:mt-8">
            <Plate variant="split">
              <Figure figNumber="FIG. 10" caption="Pattern + 7 Components · the extensibility system underneath every retailer rollout">
                <Image src="/images/work/spark-ar/decks/pattern-components.jpg" alt="Pattern and components" width={1600} height={900} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 11" caption="Container Effects · bulk-upload 3D asset + empty try-in container = final experience at runtime">
                <Image src="/images/work/spark-ar/decks/container-effects-chair.jpg" alt="Container Effects rattan chair" width={1600} height={900} className="w-full h-auto" />
              </Figure>
            </Plate>
          </div>
          <div className="mt-6 md:mt-8">
            <Figure figNumber="FIG. 12" caption="MAC Cosmetics · the consumer flow · be inspired and try on / buy and share">
              <Image src="/images/work/spark-ar/decks/mac-try-on-flow.jpg" alt="MAC Cosmetics try-on flow" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          {/* Design review before/after — real UX captures */}
          <div className="mt-6 md:mt-8">
            <Plate variant="split">
              <Figure figNumber="FIG. 13" caption="Design review — before-state interaction model">
                <Image src="/assets/spark-ar/chapter-c/02-before.jpg" alt="Before-state design review" width={739} height={1600} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 14" caption="Design review — after, with hint and education states">
                <Image src="/assets/spark-ar/chapter-c/03-after.jpg" alt="After-state design review with hints" width={739} height={1600} className="w-full h-auto" />
              </Figure>
            </Plate>
          </div>

          {/* Scaling ledger */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-4">
              Scaling outcomes &mdash; 12 months
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 divide-y md:divide-y-0 md:divide-x divide-[var(--era-hairline)]">
              <LedgerCell value="150%" label="Spark AR platform growth" accent="text-[var(--accent)]" />
              <LedgerCell value="100×" label="AR-enabled inventory" accent="text-[var(--accent)]" />
              <LedgerCell value="80%" label="Delighted shoppers" />
              <LedgerCell value="60%" label="Satisfied retailers" />
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-4">
              Try-On conversion funnel
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 divide-y md:divide-y-0 md:divide-x divide-[var(--era-hairline)]">
              <LedgerCell value="257" label="DAU · Try-On product pages" />
              <LedgerCell value="23%" label="Try-On participation" />
              <LedgerCell value="7.2%" label="Started checkout" />
              <LedgerCell value="5.7%" label="Completed purchase" />
            </div>
          </div>

          <div className="mt-8 md:mt-10">
            <Figure figNumber="FIG. 15" caption="The ledger · Team / Product / Public · 2 → 22 ICs · 150% growth · 100x inventory · F8 + Oculus Connect talk track">
              <Image src="/images/work/spark-ar/decks/spark-ar-results-ledger.jpg" alt="Spark AR results ledger" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          <div className="mt-6 md:mt-8">
            <Figure figNumber="FIG. 16" caption="Business results · 3D View · AR View · Try-On View · 150% growth · 100x inventory">
              <Image src="/images/work/spark-ar/decks/business-results.jpg" alt="Business results" width={1600} height={900} className="w-full h-auto rounded-md" />
            </Figure>
          </div>

          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-4">
              Four learnings carried forward
            </p>
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
              {[
                ['01', 'Build trust through realism'],
                ['02', 'Seamless integration'],
                ['03', 'Meet shoppers where they are'],
                ['04', 'Brand education is critical'],
              ].map(([n, label]) => (
                <div key={n} className="flex items-baseline gap-3 border-t border-[var(--era-hairline)] pt-3">
                  <span className="font-mono text-sm text-[var(--era-ink-muted)]">{n}</span>
                  <span className="font-display text-lg md:text-xl text-[var(--era-ink)] leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Named launches — text + press */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Named launches
            </p>
            <p>
              Headline collaborations that proved the platform: <strong className="text-[var(--era-ink)]">Starbucks</strong> holiday cup &mdash; an object-recognition AR experience triggered by the seasonal cup itself, animated artwork unlocking when pointed at; <strong className="text-[var(--era-ink)]">Pringles</strong> and the <em>Avatar</em> movie launch as branded AR ad formats; and dynamic try-ons across <strong className="text-[var(--era-ink)]">Adidas · Nike · Warby Parker</strong>.
            </p>
            <p className="text-sm text-[var(--era-ink-muted)] leading-relaxed mt-3">
              Press evidence:{' '}
              <a href="https://about.fb.com/news/2019/11/starbucks-holiday-ar-arrives-on-instagram/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">about.fb.com — Starbucks</a>
              {' · '}
              <a href="https://www.engadget.com/2018-05-01-facebook-messenger-nike-augmented-reality-kyrie-red-carpet.html" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">Engadget — Nike Kyrie</a>
              {' · '}
              <a href="https://mashable.com/article/instagagram-adds-augmented-reality-shopping/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">Mashable — IG AR</a>
            </p>
          </div>
        </ChapterRow>

        {/* CHAPTER 04 — COMMUNITY PEDAGOGY */}
        <ChapterRow
          index="04"
          kicker="COMMUNITY PEDAGOGY · F8 · OC6"
          title="Leadership through teaching"
        >
          <p>
            Spark AR was a developer platform. The work that scaled it past flagship demos was teaching the creator community how to think about AR. I co-wrote the IC public talk track at <strong className="text-[var(--era-ink)]">F8 (multi-year)</strong> and <strong className="text-[var(--era-ink)]">Oculus Connect 6</strong>, and partnered with UX research to publish the public-facing <strong className="text-[var(--era-ink)]">Spark AR Design Guidelines</strong>.
          </p>
          <p>
            The core methodology was the <strong className="text-[var(--era-ink)]">AR Fundamentals</strong> &mdash; five UX Touch-Points and four North Star Beliefs distilled from running the Experiences team: hypotheses we&rsquo;d proven, hypotheses we&rsquo;d had to throw out, and the patterns that survived contact with creators and users.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            The point was to teach, not prescribe.
          </p>

          <div className="grid md:grid-cols-2 gap-x-6 gap-y-5 mt-6">
            <div>
              <p className="text-[11px] font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">Five UX Touch-Points</p>
              <ul className="space-y-1.5 text-sm md:text-base text-[var(--era-ink-body)] leading-relaxed">
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">01</span>Tracking &amp; Recognition</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">02</span>Image &amp; Visual Quality</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">03</span>Interaction &amp; Engagement</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">04</span>2D-to-3D Transition</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">05</span>User Education &amp; Error Handling</li>
              </ul>
            </div>
            <div>
              <p className="text-[11px] font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">Four North Star Beliefs</p>
              <ul className="space-y-1.5 text-sm md:text-base text-[var(--era-ink-body)] leading-relaxed">
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">01</span>Design for what&rsquo;s possible</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">02</span>Minimize friction</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">03</span>Build off familiar use cases</li>
                <li className="border-t border-[var(--era-hairline)] pt-2"><span className="font-mono text-[var(--era-ink-muted)] text-xs mr-3">04</span>Realism through relentless optimization</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 md:mt-8 max-w-2xl">
            <Figure figNumber="FIG. 13" caption="Industry influence — Spark AR's reach into the AR creator community">
              <Image src="/images/work/spark-ar/figma/industry-influence.jpg" alt="Industry influence diagram" width={1200} height={900} className="w-full h-auto" />
            </Figure>
          </div>

          <div className="mt-6 md:mt-8">
            <Link
              href="/work/decks/spark-ar-design-guidelines"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border-2 transition-colors"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              Read the Spark AR Design Guidelines · 21 slides <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <p className="text-xs font-mono text-[var(--era-ink-muted)] mt-2 italic">
              The original sparkar.facebook.com blog went dark when Meta sunset Spark in January 2025; rehosted here.
            </p>
          </div>
        </ChapterRow>

        {/* CHAPTER 05 — ARBE */}
        <ChapterRow
          index="05"
          kicker="ARBE · LOCATION-BASED AR · MARCH 2020"
          title="Research bridge to glasses"
        >
          <p>
            ARBE was a research arc inside Spark AR exploring what AR could do beyond face filters and surface placement &mdash; specifically, <strong className="text-[var(--era-ink)]">location-based AR</strong>: world-anchored content, persistent objects across sessions, multi-user shared spaces, and the consequence of AR leaving the phone screen.
          </p>
          <p>
            The work generated a public patent &mdash;{' '}
            <a
              href="https://patents.google.com/patent/US11295503B1/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:text-[var(--era-ink)] underline inline-flex items-baseline gap-1"
            >
              world-locked interactive avatars
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            {' '}&mdash; and the design vocabulary that fed into the Quest MR Mode and the Orion AR Glasses Day-1 use cases. ARBE is where Spark AR&rsquo;s mobile language started to become a glasses language.
          </p>
          <p className="font-display italic text-[var(--era-ink)]">
            Mobile AR taught the surface. ARBE taught the space.
          </p>

          {/* World AR Avatars · the patent in context */}
          <div className="mt-8 md:mt-10">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              World AR Avatars · the patent in context
            </p>
            <p className="mb-4">
              The most concrete instance of the patent was <strong className="text-[var(--era-ink)]">World AR Avatars</strong> &mdash; a research-to-product arc that put a personal Avatar into the world-camera so people could express themselves in space, not just on their face. The hypothesis: world-anchored AR is more popular when it includes <em>people</em>. The data hook: 30% retention for content with people in it vs 12% for non-people World AR. We launched the MVP in the FB camera in Cambodia first, then iterated on inventory and location behaviours.
            </p>
            <Plate variant="split">
              <Figure figNumber="FIG. 17" caption="Avatars as personal identity · the strategic case for World AR Avatars">
                <Image src="/images/work/spark-ar/decks/avatars-personal-identity.jpg" alt="Avatars as personal identity" width={1600} height={900} className="w-full h-auto" />
              </Figure>
              <Figure figNumber="FIG. 18" caption="In-progress · MVP / inventory / world captions / location context">
                <Image src="/images/work/spark-ar/decks/avatars-progression.jpg" alt="MVP in progress" width={1400} height={1050} className="w-full h-auto" />
              </Figure>
            </Plate>
            <div className="mt-6">
              <Figure figNumber="FIG. 19" caption="Now · Next · Future · scaling+NUX → attribution → interacting with locations and landmarks">
                <Image src="/images/work/spark-ar/decks/avatars-now-next-future.jpg" alt="Now Next Future progression" width={1600} height={781} className="w-full h-auto rounded-md" />
              </Figure>
            </div>
            <div className="mt-6">
              <Link
                href="/work/decks/world-ar-avatars"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono uppercase tracking-wider border-2 transition-colors"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
              >
                Read the full deck · 26 pages, gated <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tate Britain video */}
          <div className="mt-6 md:mt-8">
            <p className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase mb-3">
              Public location-based AR — Tate Britain
            </p>
            <p className="mb-4">
              The most public expression of this research was the <strong className="text-[var(--era-ink)]">Tate Britain</strong> partnership: location-anchored AR experiences inside the museum&rsquo;s &ldquo;Augmenting Abstraction&rdquo; programme. Visitors walked through the gallery with their phones; AR works were anchored to physical artworks and triggered by location.
            </p>
            <div className="rounded-md overflow-hidden border border-hairline bg-paper-deep/30">
              <video
                src="/assets/spark-ar/chapter-d/tate-case-study.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
              />
            </div>
            <p className="text-xs text-[var(--era-ink-muted)] italic font-mono mt-2">
              FIG. 07 &mdash; Tate Britain · Augmenting Abstraction · location-anchored AR
            </p>
            <p className="text-sm text-[var(--era-ink-muted)] leading-relaxed mt-3">
              Press evidence:{' '}
              <a href="https://tech.fb.com/augmenting-abstraction-facebook-expands-ar-experiences-with-tate-britain/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">tech.fb.com</a>
              {' · '}
              <a href="https://www.adweek.com/performance-marketing/facebook-creative-shop-and-the-mill-brought-ar-to-art-at-londons-tate-britain-museum/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">Adweek</a>
            </p>
          </div>
        </ChapterRow>

        {/* CHAPTER 06 — F8 2019 TALKS */}
        <ChapterRow
          index="06"
          kicker="F8 2019 · STAGE TALKS"
          title="Telling the platform story"
        >
          <p>
            F8 2019 was the moment Spark AR went from internal team to public platform. I gave the flagship outlook talk, and supported two team members on stage with their domain-specific deep-dives. Three angles on the same year of work.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4 md:gap-5">
            {[
              { id: 'fT-PgfZh_k4', title: 'Spark AR Outlook · inspiring creation and exploration', kind: 'Flagship' },
              { id: 'qcR3UOxU2nc', title: 'Spark AR for Shopping', kind: 'Team · supported' },
              { id: 'gGrhFz2GyoY', title: 'Spark AR for Places and Spaces', kind: 'Team · supported' },
            ].map((t) => (
              <figure key={t.id}>
                <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-black" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${t.id}?rel=0`}
                    title={`F8 2019 · ${t.title}`}
                    className="w-full h-full"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <figcaption className="text-[11px] md:text-xs font-mono text-[var(--era-ink-muted)] tracking-wide pt-2 leading-snug">
                  <span className="uppercase tracking-[0.2em]" style={{ color: 'var(--accent)' }}>{t.kind}</span>
                  <br />
                  {t.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 07 — WHAT IT BUILT INTO */}
        <ChapterRow
          index="07"
          kicker="BRIDGE · ORION · QUEST MR · FAIR"
          title="What it built into"
        >
          <p>
            Spark AR&rsquo;s runtime, design language, and team became the foundation for the{' '}
            <Link href="/work/orion" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">Orion AR Glasses</Link>{' '}
            Day-1 experiences, the <strong className="text-[var(--era-ink)]">Quest MR Mode</strong>, and the{' '}
            <Link href="/work/fair-embodied-ai" className="text-[var(--accent)] hover:text-[var(--era-ink)] underline">FAIR Embodied AI</Link>{' '}
            program (2023&ndash;2025) &mdash; where, as Senior Product Design Manager, I worked across multiple teams on AI agents for glasses, headsets, and robotics.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-6">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              06 / 09 &middot; END OF CHAPTER
            </p>
            <Link
              href="/work/framestore"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors"
            >
              Continue &rarr; Framestore (Director era) <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

function LedgerCell({ value, label, accent }: { value: string; label: string; accent?: string }) {
  return (
    <div className="px-4 md:px-6 py-2">
      <p className={`font-display text-3xl md:text-4xl lg:text-5xl leading-none mb-2 ${accent ?? 'text-[var(--era-ink)]'}`}>
        {value}
      </p>
      <p className="text-xs md:text-sm text-[var(--era-ink-muted)] leading-snug">{label}</p>
    </div>
  );
}

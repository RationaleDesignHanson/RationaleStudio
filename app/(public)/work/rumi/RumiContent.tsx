/**
 * RUMI — case study formatted as work-row chapters, NOW era styling.
 * Brand-as-execution-engine work for an AI media companion startup.
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';

export function RumiContent() {
  return (
    <ProjectScope project="rumi">
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
                    <span className="font-mono text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>✱</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">Vault</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">ERA · NOW</span>
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2024</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  RUMI
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  Design engine for an AI media companion startup. Head of Design.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — DIAGNOSIS */}
        <ChapterRow index="01" kicker="DIAGNOSIS · DEFINITION GAP" title="Vision wasn't the problem">
          <p>
            When I came in, vision wasn&rsquo;t the problem &mdash; definition was. Brand and product design were conflated. Visual identity changed constantly based on mood or stakeholder input. Internal teams and external contributors had no consistent foundation to build from.
          </p>
          <p>
            Separately, the product had no center: features were added without cohesion, wireframes didn&rsquo;t reflect real usage, and the team was stuck debating hypotheticals.
          </p>
        </ChapterRow>

        {/* CHAPTER 02 — BRAND BECAME EXECUTION ENGINE */}
        <ChapterRow index="02" kicker="BRAND · EXECUTION ENGINE" title="Brand became the team's foundation">
          <p>
            Established RUMI&rsquo;s identity from zero &mdash; clarifying what the product is, who it&rsquo;s for, and how it should feel. Spun up and led a cross-disciplinary collaboration with a vendor team and one internal designer. Co-developed a full-spectrum brand system spanning voice, visual language, motion, and interaction. Aligned the work so marketing had a foundation to build from.
          </p>
          <ul className="space-y-2 mt-2">
            <li><strong className="text-[var(--era-ink)]">Typography:</strong> Synt (primary) and Suisse Int&rsquo;l Mono (secondary)</li>
            <li><strong className="text-[var(--era-ink)]">Emotional color palette:</strong> One Yellow, Curiosity Orange, Passion Red, Contemplative Violet, Excitement Green, Sea Blue, Unease Purple, Wonder Teal &mdash; each tied to a state the product could put a viewer in</li>
            <li><strong className="text-[var(--era-ink)]">Imagery:</strong> mixed-media photo with ASCII/halftone overlays. <em>&ldquo;Almost meets Vogue Business meets Twitch culture.&rdquo;</em></li>
            <li><strong className="text-[var(--era-ink)]">Values vs antivalues:</strong> RUMI is curious, friendly, clever, imaginative. RUMI isn&rsquo;t overly technical, dystopian, authoritarian, or niche.</li>
          </ul>

          <div className="mt-6 grid md:grid-cols-3 gap-3">
            {[
              { file: 'figma/color-palette.png', label: 'Emotional color palette' },
              { file: 'figma/typography.png', label: 'Typography system' },
              { file: 'figma/brand-in-use.png', label: 'Brand in use' },
            ].map((s) => (
              <div key={s.file} className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
                <Image src={`/images/work/rumi/${s.file}`} alt={`RUMI · ${s.label}`} width={1200} height={675} className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-2 py-1.5 italic">{s.label}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 03 — PROTOTYPES IN CODE */}
        <ChapterRow index="03" kicker="PROTOTYPES · NOT SLIDES" title="Prototyping in working code">
          <p>
            The other intervention: <strong className="text-[var(--era-ink)]">prototyping in working code</strong> instead of specs. Brought the team into Cursor for AI-assisted prototyping &mdash; shifted from spec-based cycles to usage-led iteration, simplified the core product surface around a single user journey, and built working prototypes the team could feel rather than discuss.
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            {[
              { file: 'figma/prototyping-vibe.png', label: 'Prototype · timer component' },
              { file: 'figma/prototyping-states.png', label: 'Prototype · extension states' },
              { file: 'figma/prototyping-tokens.png', label: 'Prototype · tokens dashboard' },
              { file: 'figma/prototyping-content.png', label: 'Prototype · content integration' },
            ].map((s) => (
              <div key={s.file} className="rounded-md overflow-hidden border border-[var(--era-hairline)]">
                <Image src={`/images/work/rumi/${s.file}`} alt={`RUMI · ${s.label}`} width={1200} height={675} className="w-full h-auto" />
                <p className="text-xs text-[var(--era-ink-muted)] px-2 py-1.5 italic">{s.label}</p>
              </div>
            ))}
          </div>
        </ChapterRow>

        {/* CHAPTER 04 — TRY IT */}
        <ChapterRow index="04" kicker="TRY IT · LIVE PROTOTYPE" title="The dynamic-channel prototype">
          <p>
            One of the working prototypes from that cycle. Walk through the bottom strip: turn it on &rarr; pick a mode &rarr; edit genre &rarr; choose a mood. RUMI rebuilds a cross-service channel from real catalog data &mdash; a method to track viewing history anonymously, fingerprint content for AI training, and pay viewers back for the contribution.
          </p>
        </ChapterRow>
        <section className="px-4 sm:px-6 md:px-8 pb-8 md:pb-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-3 text-xs font-mono text-[var(--era-ink-muted)]">
              <span>iframe &rarr; /prototypes/rumi/</span>
              <a
                href="/prototypes/rumi/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[var(--accent)] hover:text-[var(--era-ink)] transition-colors"
              >
                open standalone <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="rounded-md overflow-hidden border border-[var(--era-hairline)] bg-black" style={{ height: '780px' }}>
              <iframe
                src="/prototypes/rumi/index.html"
                title="RUMI · dynamic-channel prototype"
                className="w-full h-full"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
              />
            </div>
          </div>
        </section>

        {/* CHAPTER 05 — OUTCOME */}
        <ChapterRow index="05" kicker="OUTCOME" title="Faster decisions, calmer team">
          <p>
            The team aligned around one real, testable surface. Product decisions got faster with less back-and-forth. Engineers shipped with confidence rather than uncertainty. Visual design no longer slowed decisions; it enabled them. The product became buildable, not theoretical.
          </p>
        </ChapterRow>

        {/* FOOTER */}
        <section className="px-4 sm:px-6 md:px-8 py-10 md:py-14 border-t border-[var(--era-hairline)] bg-[var(--era-bg-deep)]/40">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-baseline md:justify-between gap-3">
            <p className="text-xs font-mono text-[var(--era-ink-muted)] tracking-[0.3em] uppercase">
              ✱ &middot; VAULT &middot; END OF CHAPTER
            </p>
            <Link href="/work/vault" className="inline-flex items-center gap-2 text-[var(--accent)] hover:text-[var(--era-ink)] font-display italic text-lg md:text-xl transition-colors">
              Back to the Vault <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
    </ProjectScope>
  );
}

/**
 * NIMBUS — case study formatted as work-row chapters, NOW era styling.
 * Sanitary-waste system venture; in flight as of 2026.
 */

'use client';

import Link from 'next/link';
import { ProjectScope } from '@/components/case-study/ProjectScope';
import { ChapterRow } from '@/components/case-study/ChapterRow';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';

export function NimbusContent() {
  return (
    <ProjectScope project="nimbus">
      <main
        className="era-now min-h-screen"
        style={{ backgroundColor: 'var(--era-bg)', color: 'var(--era-ink-body)' }}
      >
        {/* HERO */}
        <section className="px-4 sm:px-6 md:px-8 pt-6 md:pt-8 pb-5 md:pb-7 border-b-2" style={{ borderColor: 'var(--accent)' }}>
          <div className="max-w-5xl mx-auto">
            <Link
              href="/work/vault"
              className="inline-flex items-center gap-2 text-sm text-[var(--era-ink-muted)] hover:text-[var(--accent)] mb-5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to the Vault
            </Link>

            <div className="grid md:grid-cols-12 md:gap-6 lg:gap-8 items-start">
              <div className="md:col-span-2 flex md:block items-baseline gap-3 md:gap-0 mb-3 md:mb-0 hero-stack">
                <div className="flex items-stretch gap-3">
                  <span className="block w-[3px] self-stretch min-h-[3.5rem] md:min-h-[5rem]" style={{ backgroundColor: 'var(--accent)' }} aria-hidden />
                  <div className="flex flex-col leading-none">
                    <span className="font-mono text-4xl md:text-5xl tracking-tight" style={{ color: 'var(--accent)' }}>✱</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-1">Vault</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase text-[var(--era-ink-muted)] mt-2">In flight</span>
                    <span className="font-mono text-caption tracking-[0.25em] uppercase mt-0.5" style={{ color: 'var(--accent)' }}>2026</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-10 max-w-3xl">
                <h1 className="font-display text-display text-[var(--era-ink)] mb-2 leading-[0.92]">
                  Nimbus
                </h1>
                <p className="font-display italic text-base md:text-lg text-[var(--era-ink-body)] leading-snug max-w-2xl">
                  A household waste system that separates organic, sanitary, and recyclable streams at the bin instead of at the curb. Hardware and software, in concept-prototype.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CHAPTER 01 — THE BET */}
        <ChapterRow index="01" kicker="THE BET" title="Sort at the bin, not at the curb">
          <p>
            Curbside recycling is a 20th-century compromise: ask households to clean and pre-sort, but accept whatever shows up at the truck. Most contamination &mdash; food residue in recycling, sanitary waste in compost &mdash; happens at the bin. Nimbus moves the separation upstream into the moment of disposal so the streams stay clean from the source.
          </p>
          <p>
            The first wedge is the household pickup bag for pet waste &mdash; the most universally hated micro-moment of dog ownership and a clear demonstration of the &ldquo;contain, insulate, isolate&rdquo; thesis. Win there, and the same material + dispensing system extends to the rest of the bin.
          </p>
        </ChapterRow>

        {/* CHAPTER 02 — THE PROBLEM */}
        <ChapterRow index="02" kicker="DIAGNOSIS · DAILY DREAD" title="Pickup hasn't innovated in 30 years">
          <p>
            Every dog owner knows the moment: thin plastic, warmth transmitting through the film, the texture you can feel. The product category has been frozen for three decades &mdash; bag color and biodegradability have changed; the sensory experience has not. Roughly 90M dog owners in the US alone face it daily.
          </p>
          <ul className="space-y-2 mt-2">
            <li><strong className="text-[var(--era-ink)]">Heat transfer:</strong> standard films are too thin to insulate.</li>
            <li><strong className="text-[var(--era-ink)]">Tear &amp; smear:</strong> loose stool ruins single-bag confidence; double-bagging is the workaround.</li>
            <li><strong className="text-[var(--era-ink)]">Fumbling:</strong> rolls + perforated tabs require two hands you don&rsquo;t have.</li>
          </ul>
        </ChapterRow>

        {/* CHAPTER 03 — THE PRODUCT */}
        <ChapterRow index="03" kicker="THE PRODUCT" title="Absorbent-lined bag, pop-up dispenser">
          <p>
            A three-layer pickup bag with an airlaid non-woven absorbent core (600&ndash;1000 microns &mdash; 40&ndash;60&times; thicker than standard) bonded to a film barrier. Liquid wicks instantly; heat doesn&rsquo;t transfer; loose stool stops being an emergency. The dispenser is interfolded flat-pack, so the next bag auto-presents like a premium tissue. Clips to the leash, looks like a high-end accessory rather than a sandwich-bag holster.
          </p>
          <ul className="space-y-2 mt-2">
            <li><strong className="text-[var(--era-ink)]">Material:</strong> airlaid non-woven core + film barrier; compostable PBAT/PLA or recycled LDPE outer.</li>
            <li><strong className="text-[var(--era-ink)]">Format:</strong> interfolded flat-pack, soft-touch leash dispenser, refill subscription or one-time.</li>
            <li><strong className="text-[var(--era-ink)]">Manufacturing:</strong> interfold converting lines &mdash; same tech that produces premium tissues.</li>
          </ul>
        </ChapterRow>

        {/* CHAPTER 04 — STATUS */}
        <ChapterRow index="04" kicker="STATUS · CONCEPT-PROTOTYPE" title="Where it is right now">
          <p>
            Material spec, dispensing format, and brand are locked. Pre-seed deck and IP strategy are written. Beta testing is queued with a small panel of dog owners through Q2 2026; a pre-seed raise is open in parallel. The longer arc &mdash; full household source-separation &mdash; is sequenced behind the pet-waste wedge.
          </p>
          <div className="mt-4">
            <Link
              href="/work/nimbus/deck"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-xs font-mono uppercase tracking-wider border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--era-bg)] transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Open the deck <span aria-hidden>→</span>
            </Link>
            <p className="text-xs text-[var(--era-ink-muted)] mt-2 italic">
              Same vault password unlocks the deck. Investor / partner level — material science, dispenser flow, razor-blade economics, manufacturing plan, retail beta.
            </p>
          </div>
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

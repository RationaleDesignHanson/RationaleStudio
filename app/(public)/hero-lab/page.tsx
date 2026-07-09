/**
 * HERO LAB — four hero treatments stacked on a single page.
 * Sticky top-bar lets you jump between them. Each proposal gets a
 * marker strip with name + one-line description, then the hero
 * itself rendered as it would appear in production.
 *
 * Live at /hero-lab. Pick a winner and we'll wire it into /.
 *
 *   A · Title Page          monograph spread, marginalia ledger
 *   B · Boot Sequence       terminal status → manifesto, ASCII behind
 *   C · Cinematic Marquee   manifesto huge, shader full-bleed
 *   D · Split Spread        manifesto + currently-shipping card
 */

'use client';

import type { ReactNode } from 'react';
import { ASCIIShaderGrid } from '@/components/visual/ASCIIShaderGrid';
import type { WatercolorTheme } from '@/lib/theme/watercolor-palette';

const monographTheme: WatercolorTheme = {
  name: 'Studio Monograph',
  colors: ['#1F1B17', '#A85A40', '#D9417A'],
  primary: '#A85A40',
  description: 'paper monograph palette',
};

// =============================================================
// LAB CHROME
// =============================================================

function LabNav() {
  return (
    <div className="sticky top-0 z-50 bg-paper/95 backdrop-blur border-b border-hairline px-4 sm:px-6 md:px-8 py-3">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="text-caption font-mono tracking-[0.3em] uppercase text-ink">
          HERO LAB · 5 PROPOSALS
        </p>
        <div className="flex gap-3 sm:gap-4 text-caption font-mono tracking-wider">
          <a href="#a" className="hover:text-[var(--accent-ink)] transition-colors">A · Title</a>
          <a href="#b" className="hover:text-[var(--accent-ink)] transition-colors">B · Boot</a>
          <a href="#c" className="hover:text-[var(--accent-ink)] transition-colors">C · Cinematic</a>
          <a href="#d" className="hover:text-[var(--accent-ink)] transition-colors">D · Split</a>
          <a href="#e" className="text-[var(--accent-ink)] hover:opacity-80 transition-opacity">E · Merge ★</a>
        </div>
      </div>
    </div>
  );
}

function Marker({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div id={id} className="px-4 sm:px-6 md:px-8 py-6 md:py-8 bg-paper-deep/40 border-y border-hairline scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <p className="text-caption font-mono tracking-[0.3em] uppercase text-[var(--accent-ink)] mb-2">
          {label}
        </p>
        <p className="text-sm text-ink-muted">{children}</p>
      </div>
    </div>
  );
}

// =============================================================
// A · TITLE PAGE — three-column monograph spread
// =============================================================

function HeroA_TitlePage() {
  return (
    <div className="bg-paper text-ink-body min-h-[80vh] flex items-center px-4 sm:px-6 md:px-8 py-16 md:py-24">
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
          {/* Left marginalia */}
          <aside className="md:col-span-3 text-xs font-mono text-ink-muted leading-relaxed md:pr-6 md:border-r md:border-hairline">
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-3">Vol. I</p>
            <p>NYC</p>
            <p>2026</p>
            <hr className="my-3 border-t border-hairline" />
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">Author</p>
            <p>Matt Hanson</p>
            <p className="italic">designer + engineer</p>
          </aside>

          {/* Center manifesto */}
          <div className="md:col-span-6 text-center">
            <p className="text-caption font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
              ON BUILDING
            </p>
            <h1 className="font-display text-display text-ink leading-[1.05]">
              Vision bears the burden of proof.
            </h1>
            <hr className="my-6 md:my-8 max-w-xs mx-auto border-t border-hairline" />
            <p className="font-display italic text-lg md:text-2xl text-ink-body leading-snug max-w-md mx-auto">
              AI didn&rsquo;t change the work. It changed how much one person can do.
            </p>
          </div>

          {/* Right marginalia */}
          <aside className="md:col-span-3 text-xs font-mono text-ink-muted leading-relaxed md:pl-6 md:border-l md:border-hairline">
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-3">Credentials</p>
            <p>ex-Meta · 2017 — 2025</p>
            <p>Spark AR · Orion · FAIR</p>
            <p>15+ AR/AI patents</p>
            <hr className="my-3 border-t border-hairline" />
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">Now</p>
            <p>Solo. Consumer apps.</p>
            <p>AI as a coding partner.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// B · BOOT SEQUENCE — terminal status, then manifesto
// =============================================================

function HeroB_BootSequence() {
  return (
    <div className="bg-paper text-ink-body min-h-[80vh] px-4 sm:px-6 md:px-8 py-16 md:py-24 relative overflow-hidden">
      {/* ASCII shader subtle behind */}
      <div className="absolute inset-0 pointer-events-none opacity-90" aria-hidden>
        <ASCIIShaderGrid
          opacity={0.05}
          animated
          disableCycle
          characterSet="minimal"
          colorTheme={monographTheme}
          smallSpacing={14}
          mediumSpacing={28}
          smallOpacity={0.5}
          mediumOpacity={0.3}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Boot block */}
        <div className="font-mono text-caption text-ink-muted leading-relaxed mb-8 md:mb-12 max-w-md md:max-w-lg space-y-1">
          <p>BOOT 03.MAY.2026 .................... OK</p>
          <p>LOC: NYC ............................ OK</p>
          <p>ROLE: designer + engineer ........... OK</p>
          <p>YEARS_RECORDED: 25 .................. OK</p>
          <p>CURRENT_STATUS: solo / shipping ..... OK</p>
          <p className="text-[var(--accent-ink)]">
            &gt; rendering manifesto
            <span className="ml-1 inline-block w-2 h-3 align-middle bg-[var(--accent-ink)] animate-pulse" />
          </p>
        </div>

        <h1 className="font-display text-display text-ink mb-6 md:mb-8 max-w-4xl leading-[1.05]">
          Vision bears the burden of proof.
        </h1>
        <p className="font-display italic text-lg md:text-2xl text-ink-body leading-snug max-w-2xl mb-10 md:mb-14">
          AI didn&rsquo;t change the work. It changed how much one person can do.
        </p>

        {/* Fielded marginalia */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-12 font-mono text-xs text-ink-muted">
          <div>
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">era</p>
            <p>2017 — 2025 · Meta</p>
            <p>Spark AR · Orion · FAIR</p>
          </div>
          <div>
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">patents</p>
            <p>15+ AR/AI</p>
          </div>
          <div>
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">now</p>
            <p>Heirloom · Silly Questions</p>
            <p>Consumer apps shipped solo</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// C · CINEMATIC MARQUEE — manifesto huge, shader full-bleed
// =============================================================

function HeroC_Cinematic() {
  return (
    <div className="bg-paper text-ink-body min-h-screen px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col">
      {/* Full-bleed shader */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <ASCIIShaderGrid
          opacity={0.05}
          animated
          disableCycle
          characterSet="minimal"
          colorTheme={monographTheme}
          smallSpacing={18}
          mediumSpacing={36}
          smallOpacity={0.45}
          mediumOpacity={0.25}
        />
      </div>

      {/* Top corner: title-card kicker */}
      <div className="relative z-10 pt-16 md:pt-20">
        <p className="text-caption font-mono text-ink-muted tracking-[0.3em] uppercase">
          ON BUILDING · 2000 — NOW
        </p>
      </div>

      {/* Manifesto */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-16">
        <h1 className="font-display text-[clamp(2.25rem,8vw,8rem)] text-ink leading-[0.95] tracking-tight max-w-5xl text-center">
          Vision bears the burden of proof.
        </h1>
      </div>

      {/* Bottom corners */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-6 md:pb-10 text-xs font-mono text-ink-muted tracking-wider">
        <div>
          <p className="text-caption tracking-[0.3em] uppercase text-ink mb-1">Three eras</p>
          <p className="text-[var(--accent-ink)]">NOW · LEADER · DIRECTOR ↓</p>
        </div>
        <div className="sm:text-right">
          <p className="text-caption tracking-[0.3em] uppercase text-ink mb-1">Matt Hanson</p>
          <p>NYC · designer + engineer</p>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// D · SPLIT SPREAD — manifesto + currently-shipping card
// =============================================================

function HeroD_SplitSpread() {
  return (
    <div className="bg-paper text-ink-body min-h-[85vh] px-4 sm:px-6 md:px-8 py-16 md:py-24 flex items-center">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left — manifesto */}
        <div>
          <p className="text-caption font-mono text-ink-muted tracking-[0.3em] uppercase mb-4">
            MATT HANSON · NYC · DESIGNER-ENGINEER
          </p>
          <h1 className="font-display text-display text-ink mb-6 leading-[1.05]">
            Vision bears the burden of proof.
          </h1>
          <p className="font-display italic text-lg md:text-2xl text-ink-body leading-snug mb-6">
            AI didn&rsquo;t change the work. It changed how much one person can do.
          </p>
          <p className="text-sm md:text-base text-ink-body leading-relaxed max-w-md">
            Creative direction. AR at billion-user scale. Now &mdash; consumer apps shipped solo.
          </p>
        </div>

        {/* Right — currently shipping card */}
        <div className="border border-hairline rounded-xl p-6 md:p-8 bg-paper-deep/40">
          <p className="text-caption font-mono tracking-[0.3em] uppercase text-ink-muted mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-ink)] animate-pulse" />
            CURRENTLY SHIPPING
          </p>

          {/* Stylized device frame */}
          <div className="aspect-[9/16] max-w-[180px] md:max-w-[200px] mx-auto bg-paper border border-hairline rounded-3xl shadow-md mb-5 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-6 bg-paper-deep/40 flex items-center justify-center">
              <span className="block w-12 h-1 rounded-full bg-ink-muted/30" />
            </div>
            <div className="pt-10 px-4 text-center">
              <p className="font-display text-2xl text-ink mb-1">Heirloom</p>
              <p className="text-caption font-mono text-ink-muted tracking-wider uppercase mb-3">in beta</p>
              <div className="space-y-1.5">
                <div className="h-1 bg-hairline rounded-full" />
                <div className="h-1 bg-hairline rounded-full w-3/4" />
                <div className="h-1 bg-hairline rounded-full w-5/6" />
                <div className="h-1 bg-hairline rounded-full w-2/3" />
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-ink-muted leading-relaxed grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <span>STACK</span>
            <span className="text-ink">SwiftUI · Firebase</span>
            <span>SCALE</span>
            <span className="text-ink">24 SPM packages</span>
            <span>MODE</span>
            <span className="text-ink">solo + AI partner</span>
            <span>NEXT</span>
            <span className="text-ink">Silly Questions</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// E · CINEMATIC TITLE PAGE — C's manifesto + A's marginalia ledger
// Drops the "AI didn't change the work" italic and the patents line
// (only 1 personal patent; team patents belong to those teams).
// =============================================================

function HeroE_Merge() {
  return (
    <div className="bg-paper text-ink-body min-h-screen px-4 sm:px-6 md:px-8 relative overflow-hidden flex flex-col">
      {/* Full-bleed shader — paper monograph palette with pop */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <ASCIIShaderGrid
          opacity={0.05}
          animated
          disableCycle
          characterSet="minimal"
          colorTheme={monographTheme}
          smallSpacing={18}
          mediumSpacing={36}
          smallOpacity={0.45}
          mediumOpacity={0.25}
        />
      </div>

      {/* Top frame — kicker + volume mark */}
      <div className="relative z-10 pt-12 md:pt-20">
        <div className="max-w-6xl mx-auto flex items-baseline justify-between gap-4">
          <p className="text-caption sm:text-caption font-mono text-ink-muted tracking-[0.3em] uppercase">
            ON BUILDING · 2000 — NOW
          </p>
          <p className="text-caption sm:text-caption font-mono text-ink tracking-[0.3em] uppercase">
            VOL. I
          </p>
        </div>
      </div>

      {/* Center stage — marginalia row first, then manifesto below */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-10 md:py-16">
        <div className="max-w-6xl mx-auto w-full">
          {/* Marginalia row — three fields, mono ledger */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 text-xs font-mono text-ink-muted leading-snug max-w-4xl mx-auto mb-10 md:mb-14">
            <div>
              <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">Author</p>
              <p>Matt Hanson</p>
              <p className="italic">designer + engineer · NYC</p>
            </div>
            <div className="md:text-center">
              <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">Era</p>
              <p>ex-Meta · 2017—2025</p>
              <p>Spark AR · Orion · FAIR</p>
            </div>
            <div className="text-right col-span-2 md:col-span-1">
              <p className="text-caption tracking-[0.3em] uppercase text-ink mb-2">Now</p>
              <p>
                <a
                  href="https://heirloomrecipebox.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-[var(--accent-ink)] transition-colors"
                >
                  Heirloom
                </a>{' '}
                · shipping
              </p>
              <p>
                <a
                  href="https://silly-questions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink hover:text-[var(--accent-ink)] transition-colors"
                >
                  Silly Questions
                </a>{' '}
                · in beta
              </p>
            </div>
          </div>

          {/* Manifesto — full width, single line on desktop */}
          <h1 className="font-display text-[clamp(1.75rem,4.5vw,4.25rem)] text-ink leading-[1.05] tracking-tight text-center md:whitespace-nowrap">
            Vision bears the burden of proof.
          </h1>
        </div>
      </div>

      {/* Bottom frame — era teaser + read-order */}
      <div className="relative z-10 pb-6 md:pb-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 text-xs font-mono text-ink-muted tracking-wider">
          <div>
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-1">Three eras</p>
            <p className="text-[var(--accent-ink)]">NOW · LEADER · DIRECTOR ↓</p>
          </div>
          <div className="sm:text-right">
            <p className="text-caption tracking-[0.3em] uppercase text-ink mb-1">Read order</p>
            <p>Recent first · scroll the viewer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================
// PAGE
// =============================================================

export default function HeroLabPage() {
  return (
    <main className="min-h-screen bg-paper text-ink-body">
      <LabNav />

      <Marker id="e" label="OPTION E · CINEMATIC TITLE PAGE   ★ MERGE">
        C&rsquo;s manifesto + shader full-bleed, framed by A&rsquo;s marginalia ledger. Drops the AI italic and patents line; NOW shows Heirloom (beta) + Silly Questions (live).
      </Marker>
      <HeroE_Merge />

      <Marker id="a" label="OPTION A · TITLE PAGE">
        Centered manifesto with marginalia ledger left + right. Reads like a monograph title page.
      </Marker>
      <HeroA_TitlePage />

      <Marker id="b" label="OPTION B · BOOT SEQUENCE">
        Terminal status block resolves into the manifesto, with ASCII shader subtle behind. Live, technical.
      </Marker>
      <HeroB_BootSequence />

      <Marker id="c" label="OPTION C · CINEMATIC MARQUEE">
        Manifesto huge. Shader full-bleed. Identity reduced to a corner mark. Most cinematic.
      </Marker>
      <HeroC_Cinematic />

      <Marker id="d" label="OPTION D · SPLIT SPREAD">
        Manifesto on the left, currently-shipping card on the right. Lands the AI-worker thesis with proof.
      </Marker>
      <HeroD_SplitSpread />

      {/* Trailing breather */}
      <section className="px-4 sm:px-6 md:px-8 py-12 md:py-20 bg-paper-deep/40 border-t border-hairline">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-caption font-mono tracking-[0.3em] uppercase text-ink-muted mb-2">END OF LAB</p>
          <p className="text-sm text-ink-body">
            E is the merge you asked for. Confirm and I&rsquo;ll wire it into <code className="font-mono text-[var(--accent-ink)]">/</code>.
          </p>
        </div>
      </section>
    </main>
  );
}

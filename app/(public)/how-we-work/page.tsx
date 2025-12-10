/**
 * How We Work Page
 *
 * Redesigned to match homepage design system:
 * - GlassCard instead of OS8Window
 * - ASCIIUnifiedGrid backgrounds on all sections
 * - VelocityProof component integration
 * - Terminal Republic color palette
 * - Simplified content with visual hierarchy
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { VelocityProof } from '@/components/home/VelocityProof';
import { FitFilter } from '@/components/home/FitFilter';
import {
  DollarSign,
  Star,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Rocket,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';
import { ButtonTertiary } from '@/components/ui/ButtonHierarchy';

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
            PROVEN VELOCITY // ALIGNED INCENTIVES
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            How We Work
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            From 2-week validation sprints to multi-year equity partnerships—we structure every engagement around speed, alignment, and what you need to prove next.
          </p>
        </div>
      </section>

      {/* 2. THREE ENGAGEMENT MODELS */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Three Ways to Work Together
            </h2>
            <p className="text-sm text-gray-400 font-mono tracking-wider">
              CASH // EQUITY // HYBRID
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Model 1: Cash */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700/50 rounded">
                  <DollarSign className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Cash Engagements</h3>
              </div>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Fixed-scope sprints. You pay, we deliver, no equity complexity. Best for teams with runway who need fast answers.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Best For</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>2-6 week validation sprints</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>Pre-seed founders testing ideas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>Clear scope, fast timeline</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Structure</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>Fixed deliverables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>2-12 week timeline</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>IP transfers at completion</span>
                    </li>
                  </ul>
                </div>
              </div>

              <ButtonTertiary href="/contact" className="gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </GlassCard>

            {/* Model 2: Equity */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700/50 rounded">
                  <Star className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Equity Partnerships</h3>
              </div>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                We become your product partner. Equity or cash + equity. Highly selective—we only partner when our expertise creates strategic advantage.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Best For</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>6-18 month build partnerships</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>AI/AR/0-1 product expertise</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>Pre-seed to Series A</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Structure</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>0.5-3% equity typical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>Vesting over engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>Long-term aligned incentives</span>
                    </li>
                  </ul>
                </div>
              </div>

              <ButtonTertiary href="/contact" className="gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </GlassCard>

            {/* Model 3: Hybrid */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-700/50 rounded">
                  <Layers className="w-5 h-5 text-gray-300" />
                </div>
                <h3 className="text-lg font-bold text-white">Hybrid</h3>
              </div>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Reduced cash + equity. You conserve runway, we share upside. Most common for 3-12 month builds.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Best For</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>3-12 month product builds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>Seed-stage runway preservation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                      <span>Strategic partnership mindset</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Structure</p>
                  <ul className="text-sm text-gray-300 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>50-70% cash discount</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>0.5-2% equity typical</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-terminal-gold">→</span>
                      <span>Milestone-based payments</span>
                    </li>
                  </ul>
                </div>
              </div>

              <ButtonTertiary href="/contact" className="gap-2">
                Learn More
                <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. OUR PROCESS - Visual Timeline */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Process
            </h2>
            <p className="text-base text-gray-300">
              Every engagement starts with understanding your riskiest assumptions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phase 1 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold">
                  1
                </div>
                <Lightbulb className="w-5 h-5 text-terminal-gold" />
              </div>
              <h3 className="text-base font-bold mb-2">Week 1: Align</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Map your product thesis and biggest unknowns. What proves this is worth building?
              </p>
            </GlassCard>

            {/* Phase 2 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold">
                  2
                </div>
                <Rocket className="w-5 h-5 text-terminal-gold" />
              </div>
              <h3 className="text-base font-bold mb-2">Weeks 2-4: Prototype</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Build functional software that tests core assumptions. Working demos, not mockups.
              </p>
            </GlassCard>

            {/* Phase 3 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold">
                  3
                </div>
                <Target className="w-5 h-5 text-terminal-gold" />
              </div>
              <h3 className="text-base font-bold mb-2">Weeks 4-6: Validate</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Run real usage scenarios. User testing, technical validation. Evidence, not opinions.
              </p>
            </GlassCard>

            {/* Phase 4 */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-terminal-gold text-black flex items-center justify-center font-bold">
                  4
                </div>
                <TrendingUp className="w-5 h-5 text-terminal-gold" />
              </div>
              <h3 className="text-base font-bold mb-2">Week 6+: Build</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Pivot, persevere, or scale. If it's working, we help you build it.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 5. WHAT CHANGES WITH EQUITY */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Equity Alignment Matters
            </h2>
            <p className="text-base text-gray-300">
              Equity changes how we think, decide, and build together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What Changes */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-sm font-bold uppercase tracking-wide text-terminal-gold mb-4">
                What Changes
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We say no to bad ideas (even if billable)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We prioritize long-term value over scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We build IP, not just deliverables</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We care about your Series A, not just handoff</span>
                </li>
              </ul>
            </GlassCard>

            {/* What Doesn't Change */}
            <GlassCard className="p-6" borderRadius="0.75rem">
              <h3 className="text-sm font-bold uppercase tracking-wide text-terminal-gold mb-4">
                What Doesn't Change
              </h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We still move fast (equity ≠ slow)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>You still own your company and roadmap</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>We're selective, not transactional</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-terminal-gold mt-0.5 flex-shrink-0" />
                  <span>Clear deliverables and milestones still exist</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 6. FIT FILTER */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <FitFilter />
        </div>
      </section>

      {/* 7. QUICK PRICING CONTEXT */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-2">
              PRICING PHILOSOPHY
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              How We Price Engagements
            </h2>
            <p className="text-base text-gray-300 max-w-3xl mx-auto">
              Transparent, customized, and always aligned with what you're building
            </p>
          </div>

          <GlassCard className="p-8" borderRadius="0.75rem">
            <p className="text-base text-gray-200 leading-relaxed mb-8">
              <span className="font-bold text-terminal-gold">We share pricing after understanding your context.</span> Every engagement is structured as cash, equity, or hybrid—and the mix depends on your stage, timeline, and goals.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Discovery Sprint */}
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-sm font-mono text-terminal-gold mb-2">Discovery Sprint</p>
                <p className="text-2xl font-bold text-white mb-1">2 weeks</p>
                <p className="text-sm text-gray-400">
                  Strategy, design, architecture. Not just development hours.
                </p>
              </div>

              {/* Prototype Sprint */}
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-sm font-mono text-terminal-gold mb-2">Prototype Sprint</p>
                <p className="text-2xl font-bold text-white mb-1">4-6 weeks</p>
                <p className="text-sm text-gray-400">
                  Working software. Not mockups.
                </p>
              </div>

              {/* Build Ship Run */}
              <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-sm font-mono text-terminal-gold mb-2">Build Ship Run</p>
                <p className="text-2xl font-bold text-white mb-1">6-18 months</p>
                <p className="text-sm text-gray-400">
                  Your technical co-founder. Equity significantly reduces cash.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-bold text-terminal-gold">Why no exact pricing on the site?</span> Because the right structure depends on mutual fit. We'll share exact pricing on our intro call after learning about your project.
              </p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 8. HOW WE SHIP FASTER - VelocityProof */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Mobile: simplified version */}
          <div className="block md:hidden">
            <VelocityProof simplified={true} />
          </div>

          {/* Desktop: full version */}
          <div className="hidden md:block">
            <VelocityProof simplified={false} />
          </div>

          <div className="mt-12 text-center">
            <ButtonTertiary href="/overview" className="gap-2">
              See the full methodology
              <ArrowRight className="w-4 h-4" />
            </ButtonTertiary>
          </div>
        </div>
      </section>

    </main>
  );
}

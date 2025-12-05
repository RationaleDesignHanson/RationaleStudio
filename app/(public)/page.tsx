/**
 * Rationale Homepage
 *
 * Restructured per December 2025 plan:
 * - Hero with equity positioning
 * - Credibility strip with Dual Engine tooltip
 * - Featured Work (3 projects)
 * - Velocity Proof (from /overview)
 * - How We Work
 * - Fit Filter (softened)
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { FeaturedWorkGrid } from '@/components/work/FeaturedWorkGrid';
import { VelocityProof } from '@/components/home/VelocityProof';
import { FitFilter } from '@/components/home/FitFilter';
import { Info } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
  const [showDualEngineTooltip, setShowDualEngineTooltip] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            We launch products
            <br />
            with builders.
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-[#FFD700] font-semibold mb-8">
            Equity when the fit is right.
          </p>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10">
            Rationale gets you to working prototypes in weeks, not quarters.
            Feel what works early. Build with conviction. Ship with speed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#featured-work"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              See our work
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              Book intro call
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CREDIBILITY STRIP */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8 border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-[#FFD700]">★</span>
              <span>Meta</span>
            </div>
            <span className="text-gray-600">·</span>
            <div>15+ Patents</div>
            <span className="text-gray-600">·</span>
            <div>7 Years AR/AI</div>
            <span className="text-gray-600">·</span>
            <div
              className="relative flex items-center gap-1.5 cursor-help"
              onMouseEnter={() => setShowDualEngineTooltip(true)}
              onMouseLeave={() => setShowDualEngineTooltip(false)}
            >
              <span>Dual Engine</span>
              <Info className="w-4 h-4 text-[#FFD700]" />

              {/* Tooltip */}
              {showDualEngineTooltip && (
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-gray-900 border border-gray-700 rounded-md shadow-xl text-xs text-gray-300 z-10">
                  <p className="mb-2">
                    <span className="font-semibold text-white">Two engines:</span> Products we build & own (like Zero) + Client partnerships for equity & cash.
                  </p>
                  <Link href="/about" className="text-[#FFD700] hover:underline text-xs">
                    Learn more →
                  </Link>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WORK */}
      <section id="featured-work" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <FeaturedWorkGrid />
        </div>
      </section>

      {/* 4. VELOCITY PROOF */}
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
        </div>
      </section>

      {/* 5. HOW WE WORK */}
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How We Work
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Three engagement models, all using the same systematic approach:
              7 prototypes before production, risk mitigated early, working software over endless specs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Clarity Kit */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Clarity Kit</h3>
              <div className="text-sm text-gray-400 mb-4">
                2-week audit · $15-25K
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Current state assessment, opportunity identification, prototype roadmap, go/no-go recommendation.
              </p>
              <Link href="/services/clarity-kit" className="text-[#FFD700] text-sm hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Prototype Kit */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Prototype Kit</h3>
              <div className="text-sm text-gray-400 mb-4">
                4-week sprint · $40-60K
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Interactive prototypes (3-7), technical architecture, user testing insights, implementation roadmap.
              </p>
              <Link href="/services/prototype-kit" className="text-[#FFD700] text-sm hover:underline">
                Learn more →
              </Link>
            </div>

            {/* Build Ship Run */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
              <h3 className="text-xl font-bold text-white mb-2">Build Ship Run</h3>
              <div className="text-sm text-gray-400 mb-4">
                8-12 week pilot · $80-150K+
              </div>
              <p className="text-sm text-gray-300 mb-4">
                Production-ready MVP, deployment & infrastructure, beta rollout strategy, ongoing support options.
              </p>
              <Link href="/services/build-ship-run" className="text-[#FFD700] text-sm hover:underline">
                Learn more →
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/services" className="text-[#FFD700] hover:underline font-medium">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. FIT FILTER */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
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
    </main>
  );
}

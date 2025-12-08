/**
 * Home Page - Window Shrine Design
 *
 * Transformed homepage using the Window Shrine design system from public site.
 * OS8Window components, ASCIIUnifiedGrid backgrounds, Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { homeContent } from '@/lib/content';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        {/* ASCII Grid Background - Terminal Republic Hero */}
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 animate-fade-in-up">
            CONVICTION-FIRST VENTURE STUDIO
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            {homeContent.hero.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-6 animate-fade-in-up delay-200">
            {homeContent.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-400">
            <Link
              href="/services"
              className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              View Rationale Kits →
            </Link>
            <Link
              href="/ventures"
              className="px-8 py-4 border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              See Portfolio IP
            </Link>
          </div>
        </div>
      </section>

      {/* Dual-Engine Model */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              How Rationale Grows
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-mono tracking-wide">
              TWO ENGINES // ONE SYSTEM
            </p>
          </div>

          {/* Desktop: Side-by-Side Windows */}
          <div className="hidden md:grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-8">
            <OS8Window
              title="Engine 1 — Rationale Kits"
              variant="featured"
              delay={100}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Client Engagements</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  Productized engagements from 2-week Clarity Kits to 18-month Build Ship Run. Cash, equity, or hybrid structures. Fund exploration and de-risk ideas systematically.
                </p>
                <ul className="text-xs text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Clarity Kit: 2 weeks to validated direction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Prototype Kit: 4-6 weeks to working software</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Build Ship Run: 6-18 months to App Store</span>
                  </li>
                </ul>
              </div>
            </OS8Window>

            <OS8Window
              title="Engine 2 — Portfolio IP"
              variant="featured"
              delay={200}
            >
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#FFD700]">Ventures We Own</h3>
                <p className="text-sm text-gray-100 leading-relaxed">
                  We design, build, and launch proprietary products. These prove systematic execution and generate IP we can scale or license. Built with conviction, designed to appreciate.
                </p>
                <ul className="text-xs text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Zero: AI email triage (live on App Store)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Project Atlas: CRE intelligence platform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFD700] mt-0.5">→</span>
                    <span>Project Amplify: NIL marketplace</span>
                  </li>
                </ul>
              </div>
            </OS8Window>
          </div>

          {/* Mobile: Stacked */}
          <div className="md:hidden space-y-6 max-w-2xl mx-auto mb-8">
            <OS8Window title="Engine 1 — Rationale Kits" variant="featured" animateIn={false}>
              <p className="text-sm text-gray-100">
                Productized engagements. Cash, equity, or hybrid. 2-week sprints to 18-month builds.
              </p>
            </OS8Window>

            <OS8Window title="Engine 2 — Portfolio IP" variant="featured" animateIn={false}>
              <p className="text-sm text-gray-100">
                Ventures we own. Zero, Atlas, Amplify. Prove execution. Generate IP.
              </p>
            </OS8Window>
          </div>

          {/* The Model */}
          <div className="max-w-4xl mx-auto">
            <OS8Window title="$900K run rate + 90% margin = $500K+ annual venture capital" variant="body" animateIn={false}>
              <p className="text-sm text-gray-100 leading-relaxed text-center">
                This dual-engine model enables systematic 2-3 ventures per year. Kits fund exploration. Portfolio builds IP across sectors. Both engines compound.
              </p>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12">
            Portfolio IP
          </h2>

          {/* Zero - Featured */}
          <div className="mb-8 max-w-4xl mx-auto">
            <Link href="/ventures/zero" className="block group">
              <OS8Window
                title="Zero · AI Email Triage"
                variant="featured"
                animateIn={false}
                className="hover:scale-[1.01] transition-transform duration-300"
              >
                <div className="space-y-4">
                  <span className="text-xs font-bold text-[#FFD700] uppercase tracking-wide">
                    Live on App Store · Concept to Launch &lt;1 Month
                  </span>
                  <h3 className="text-2xl font-bold text-[#FFD700]">
                    Proving AI-Powered Speed: Real Product, Real Users, Real Fast
                  </h3>
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Built to prove we could move faster using AI tools. Swipeable email triage with intelligent categorization. 10 microservices in production. 182 Swift files with A+ architecture.
                  </p>
                  <span className="text-sm font-semibold text-[#FFD700] group-hover:underline inline-block pt-2">
                    View complete details →
                  </span>
                </div>
              </OS8Window>
            </Link>
          </div>

          {/* Meta Work */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <OS8Window
              title="AR Commerce · Meta Reality Labs"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  Platform strategy for AR shopping experiences. F8 2018 stage presenter. 15+ patents filed.
                </p>
                <p className="text-xs text-gray-500">
                  2015-2018 · Meta Reality Labs
                </p>
              </div>
            </OS8Window>

            <OS8Window
              title="Spark AR Camera Platform · Meta"
              variant="interactive"
              animateIn={false}
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-100 leading-relaxed">
                  Built the AR effects platform powering Instagram and Facebook Camera. Computer vision pipelines and creator tools.
                </p>
                <p className="text-xs text-gray-500">
                  2015-2019 · Platform publicly documented
                </p>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Work With Rationale"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed">
                Partner with a studio that ships. Same velocity we brought to Zero. Same systematic execution for your product.
              </p>

              <div className="flex flex-col gap-3 pt-4">
                <Link
                  href="/services"
                  className="w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                >
                  View Rationale Kits →
                </Link>
                <Link
                  href="/investment"
                  className="w-full border border-[#FFD700] hover:border-[#FFE34D] text-[#FFD700] hover:text-[#FFE34D] text-center px-6 py-3 font-semibold transition-colors"
                >
                  Investment Opportunities
                </Link>
              </div>

              <div className="pt-3 border-t border-[#FFD700]/30 text-center">
                <p className="text-xs text-[#FFD700]/70">
                  studio@rationale.design
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}

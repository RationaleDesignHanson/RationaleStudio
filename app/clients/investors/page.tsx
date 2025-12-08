/**
 * Investors Page - Window Shrine Design
 *
 * Password-protected investor overview with business model, traction, and opportunities.
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { investorOverview, businessModel, marketOpportunity } from '@/lib/content/investors';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export default function InvestorsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 text-center animate-fade-in-up">
            {investorOverview.tagline}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
            Investors
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
            We're building the operating system for conviction capital—turning uncertainty into executable strategy through productized services and proprietary IP.
          </p>
        </div>
      </section>

      {/* The Opportunity */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            The Opportunity
          </h2>

          <OS8Window
            title="Market Gap"
            variant="featured"
            animateIn={false}
          >
            <p className="text-base sm:text-lg text-gray-100 leading-relaxed">
              {investorOverview.opportunity}
            </p>
          </OS8Window>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* Problem */}
            <OS8Window
              title="The Problem"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                {investorOverview.problem}
              </p>
            </OS8Window>

            {/* Solution */}
            <OS8Window
              title="Our Solution"
              variant="body"
              animateIn={false}
            >
              <p className="text-sm sm:text-base text-gray-100 leading-relaxed">
                {investorOverview.solution}
              </p>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Business Model
          </h2>

          {/* Revenue Streams */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">{businessModel.revenueStreams.title}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {businessModel.revenueStreams.streams.map((stream, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60"
                >
                  <h4 className="font-semibold text-white mb-2">{stream.name}</h4>
                  <p className="text-sm text-gray-100 mb-2">{stream.description}</p>
                  <p className="text-xs text-[#FFD700] font-medium">{stream.revenue}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Unit Economics */}
          <OS8Window
            title={businessModel.unitEconomics.title}
            variant="body"
            animateIn={false}
          >
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {businessModel.unitEconomics.metrics.map((metric, index) => (
                <div key={index}>
                  <p className="text-3xl font-bold text-[#FFD700] mb-1">{metric.value}</p>
                  <p className="text-sm text-gray-300">{metric.label}</p>
                </div>
              ))}
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Market Opportunity
          </h2>

          {/* Market Size */}
          <OS8Window
            title={marketOpportunity.marketSize.title}
            variant="featured"
            animateIn={false}
          >
            <p className="text-sm sm:text-base text-gray-100 leading-relaxed mb-6">
              {marketOpportunity.marketSize.description}
            </p>
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              {marketOpportunity.marketSize.segments.map((segment, index) => (
                <div key={index}>
                  <p className="text-2xl font-bold text-[#FFD700] mb-1">{segment.size}</p>
                  <p className="text-sm text-gray-100">{segment.name}</p>
                </div>
              ))}
            </div>
          </OS8Window>

          {/* Target Segments */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 text-[#FFD700]">{marketOpportunity.targetSegments.title}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {marketOpportunity.targetSegments.segments.map((segment, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60"
                >
                  <h4 className="font-semibold text-white mb-2">{segment.name}</h4>
                  <p className="text-sm text-gray-100">{segment.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Traction
          </h2>

          <div className="space-y-3">
            {investorOverview.traction.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-4 rounded-lg border border-[#FFD700]/20 bg-black/60"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                  <span className="text-[#FFD700] text-sm font-bold">→</span>
                </div>
                <p className="text-sm sm:text-base text-gray-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Client Projects */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Active Client Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8">
            Live client dashboards showcasing our work on AI-native product development, strategy, and execution.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Zero Inbox */}
            <Link
              href="/client/zero/dashboard"
              className="group"
            >
              <OS8Window
                title="Zero Inbox"
                variant="interactive"
                animateIn={false}
                className="h-full hover:scale-[1.02] transition-transform"
              >
                <p className="text-sm text-gray-100 mb-4">
                  AI-powered email management for busy parents. View roadmap, fundraising strategy, and execution plan.
                </p>
                <div className="text-sm text-[#FFD700] font-medium group-hover:underline">
                  View Dashboard →
                </div>
              </OS8Window>
            </Link>

            {/* Project Bravo */}
            <Link
              href="/client/athletes-first/dashboard"
              className="group"
            >
              <OS8Window
                title="Project Bravo"
                variant="interactive"
                animateIn={false}
                className="h-full hover:scale-[1.02] transition-transform"
              >
                <p className="text-sm text-gray-100 mb-4">
                  NIL compliance and student-athlete management platform. View project roadmap and strategy.
                </p>
                <div className="text-sm text-[#FFD700] font-medium group-hover:underline">
                  View Dashboard →
                </div>
              </OS8Window>
            </Link>

            {/* Project Delta */}
            <Link
              href="/client/creait/dashboard"
              className="group"
            >
              <OS8Window
                title="Project Delta"
                variant="interactive"
                animateIn={false}
                className="h-full hover:scale-[1.02] transition-transform"
              >
                <p className="text-sm text-gray-100 mb-4">
                  AI-powered commercial real estate intelligence platform. View project roadmap and execution.
                </p>
                <div className="text-sm text-[#FFD700] font-medium group-hover:underline">
                  View Dashboard →
                </div>
              </OS8Window>
            </Link>
          </div>
        </div>
      </section>

      {/* The Ask */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <OS8Window
            title="The Ask"
            variant="cta"
            animateIn={false}
          >
            <p className="text-base sm:text-lg text-[#FFD700] leading-relaxed text-center">
              {investorOverview.ask}
            </p>
          </OS8Window>
        </div>
      </section>

      {/* CTA */}
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
            title="Want the full detailed deck?"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          >
            <div className="space-y-6">
              <p className="text-base text-[#FFD700] leading-relaxed text-center">
                Access our comprehensive investor deck with capital strategy, operating model, roadmap, financials, and team details.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <ButtonPrimary href="/investors/deck" size="lg">
                  View full deck
                </ButtonPrimary>
                <ButtonSecondary href="/contact" size="lg">
                  Get in touch
                </ButtonSecondary>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}

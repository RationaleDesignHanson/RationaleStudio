/**
 * Rationale Homepage
 *
 * Product Studio Positioning:
 * - Hero: Product studio identity
 * - Current Focus: Zero, Heirloom + Pipeline (Two engines)
 * - Three Paths: Invest/Partner/Collaborate
 * - How We Ship: Kits methodology
 * - Fit Filter: What makes a great fit
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { VelocityProof } from '@/components/home/VelocityProof';
import { FitFilter } from '@/components/home/FitFilter';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';
import { MultipleStructuredData } from '@/components/seo/StructuredData';
import { generateOrganizationStructuredData, generateBreadcrumbStructuredData } from '@/lib/seo/metadata';
import { ButtonPrimary, ButtonTertiary } from '@/components/ui/ButtonHierarchy';

export default function HomePage() {

  const structuredData = [
    generateOrganizationStructuredData(),
    generateBreadcrumbStructuredData([{ name: 'Home', url: '/' }]),
  ];

  return (
    <>
      <MultipleStructuredData dataBlocks={structuredData} />

      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

        {/* 1. HERO SECTION - Product Studio Identity */}
        <section className="relative py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          {/* ASCII Grid Background */}
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.08}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-0">
            {/* Main Headline - Large */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
                Rationale:&nbsp;<span className="font-light inline-block">Product Development Company</span>
              </h1>
            </div>

            {/* Subheadline - One Line */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-3 md:mb-4 tracking-tight">
              We ship products. <span className="text-gray-300">Yours and ours.</span>
            </p>

            {/* CTA - Yellow linked text */}
            <Link
              href="/overview"
              className="text-terminal-gold hover:text-terminal-gold-hover text-sm font-normal inline-flex items-center gap-1 transition-colors"
            >
              Studio Overview
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* 2. CURRENT FOCUS - Zero, Heirloom + Pipeline */}
        <section id="current-focus" className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-12 px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Current Focus
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-3xl">
                We build software with AI to help make things easier, and develop strategic partnerships which transform strategy into shipped products with conviction.
              </p>
            </div>

            {/* Row 1: Zero and Heirloom */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 px-4 sm:px-0">
              {/* Zero - Beta/Dogfooding */}
              <div className="p-4 md:p-6 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-white">Zero</h3>
                  <span className="inline-block px-2 py-1 bg-terminal-gold/20 border border-terminal-gold/40 rounded-full text-xs text-terminal-gold font-medium">
                    Beta · Dogfooding
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  AI email assistant that achieves Inbox Zero autonomously. Learns your preferences and keeps you focused on what matters.
                </p>

                <div className="hidden md:block space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Used daily by our team to validate core workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-terminal-gold mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Investor preview available for qualified partners</span>
                  </div>
                </div>

                <ButtonTertiary href="/work/zero" className="gap-2 text-sm">
                  Learn about Zero
                  <ArrowRight className="w-4 h-4" />
                </ButtonTertiary>
              </div>

              {/* Heirloom - In Development */}
              <div className="p-4 md:p-6 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg md:text-xl font-bold text-white">Heirloom</h3>
                  <span className="inline-block px-2 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-xs text-[#00D9FF] font-medium">
                    In Development
                  </span>
                </div>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  Where family recipes live—styled, shared, and passed down. Modern recipe box where grandma's cards sit alongside NYT bookmarks.
                </p>

                <div className="hidden md:block space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00D9FF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Native iOS app built for TestFlight launch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#00D9FF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Recipe capture, styling, and sharing workflows complete</span>
                  </div>
                </div>

                <ButtonTertiary href="/work/heirloom" className="gap-2 text-sm text-[#00D9FF] hover:text-[#00D9FF]/80">
                  Learn about Heirloom
                  <ArrowRight className="w-4 h-4" />
                </ButtonTertiary>
              </div>
            </div>

            {/* Row 2: Pipeline (Full Width) */}
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg mx-4 sm:mx-0">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-lg md:text-xl font-bold text-white">Pipeline</h3>
                <span className="inline-block px-2 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-300 font-medium">
                  Q1–Q2 2025
                </span>
              </div>

              <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                Multiple products in development across productivity, knowledge work, and enterprise automation.
              </p>

              <div className="hidden md:block space-y-2 text-sm text-gray-400 mb-6">
                <div>Validation phase for 3 concepts</div>
                <div>Prototype testing with select partners</div>
                <div>Looking for product-minded investors</div>
              </div>

              <ButtonTertiary href="/contact" className="gap-2 text-sm">
                Get in touch
                <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </div>
          </div>
        </section>

        {/* 3. THREE PATHS - Invest / Partner / Collaborate */}
        <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="mb-12 px-4 sm:px-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Three Ways to Work Together
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-3xl">
                Choose the path that fits your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-6 px-4 sm:px-0">
              {/* Invest */}
              <Link
                href="/contact?interest=invest"
                className="flex flex-col items-start p-4 sm:p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-terminal-gold" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">Invest</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Back our product portfolio. Get early access to Zero and our pipeline products.
                </p>
              </Link>

              {/* Partner */}
              <Link
                href="/contact?interest=partner"
                className="flex flex-col items-start p-4 sm:p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-terminal-gold" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">Partner</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Launch products together. We take equity + cash for product development
                  and go-to-market.
                </p>
              </Link>

              {/* Collaborate */}
              <Link
                href="/how-we-work"
                className="flex flex-col items-start p-4 sm:p-5 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-terminal-gold" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">Collaborate</h3>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Ship an MVP fast. Fixed-scope Kits for rapid prototyping and validation.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. HOW WE SHIP FASTER - Kits Methodology */}
        <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <div className="text-center mb-6 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                How We Ship Faster
              </h2>
              <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto">
                Proven methodology from Meta Reality Labs. Working software in weeks, not quarters.
              </p>
            </div>

            {/* Mobile: simplified version */}
            <div className="block md:hidden">
              <VelocityProof simplified={true} />
            </div>

            {/* Desktop: full version */}
            <div className="hidden md:block">
              <VelocityProof simplified={false} />
            </div>

            <div className="mt-8 md:mt-12 text-center">
              <ButtonTertiary href="/how-we-work" className="gap-2 text-sm">
                See the full methodology
                <ArrowRight className="w-4 h-4" />
              </ButtonTertiary>
            </div>
          </div>
        </section>

        {/* 5. FIT FILTER */}
        <section className="relative py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
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
    </>
  );
}

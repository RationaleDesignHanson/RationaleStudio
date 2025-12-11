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

          <div className="relative z-10 max-w-5xl mx-auto text-center px-6 sm:px-8">
            {/* Main Headline - Large */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
                Rationale:&nbsp;<span className="font-light inline-block">Product Development Company</span>
              </h1>
            </div>

            {/* Subheadline - One Line */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium mb-6 md:mb-8 tracking-tight">
              We ship products. <span className="text-gray-300">Yours and ours.</span>
            </p>

            {/* CTA - Yellow linked text */}
            <div className="flex justify-center">
              <Link
                href="/overview"
                className="text-terminal-gold hover:text-terminal-gold-hover text-sm font-normal inline-flex items-center gap-1 transition-colors"
              >
                Studio Overview
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
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
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Current Focus
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-3xl mx-auto">
                We build software in areas we see value, and develop strategic partnerships which transform strategy into shipped products with conviction.
              </p>
            </div>

            {/* Row 1: Zero and Heirloom */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8 px-4 sm:px-0">
              {/* Zero - Beta/Dogfooding */}
              <div className="p-4 sm:p-6 md:p-8 bg-gray-900/70 border border-terminal-gold/30 rounded-lg">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Zero</h3>
                  <span className="inline-block px-3 py-1 bg-terminal-gold/20 border border-terminal-gold/40 rounded-full text-xs text-terminal-gold font-medium">
                    Beta · Dogfooding
                  </span>
                </div>

                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                  AI email assistant that achieves Inbox Zero autonomously. Learns your preferences,
                  handles routine responses, and keeps you focused on what matters.
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
              <div className="p-4 sm:p-6 md:p-8 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Heirloom</h3>
                  <span className="inline-block px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-xs text-[#00D9FF] font-medium">
                    In Development
                  </span>
                </div>

                <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                  Where family recipes live—styled, shared, and passed down exactly as you made them.
                  Modern recipe box where grandma's handwritten cards sit alongside NYT bookmarks.
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
            <div className="p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-700 rounded-lg mx-4 sm:mx-0">
              <div className="mb-3 md:mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Pipeline</h3>
                <span className="inline-block px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-300 font-medium">
                  Q1–Q2 2025
                </span>
              </div>

              <p className="text-sm md:text-base text-gray-300 mb-4 md:mb-6 leading-relaxed">
                Multiple products in development across sectors. We're exploring opportunities
                in productivity, knowledge work, and enterprise automation.
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

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Three Ways to Work Together
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Choose the path that fits your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 md:gap-8">
              {/* Invest */}
              <div className="flex flex-col p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-terminal-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Invest</h3>
                <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6 leading-relaxed flex-grow">
                  Back our product portfolio. Get early access to Zero and our pipeline products.
                </p>
                <ButtonTertiary href="/contact?interest=invest" className="gap-2 self-start text-xs md:text-sm">
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </ButtonTertiary>
              </div>

              {/* Partner */}
              <div className="flex flex-col p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-terminal-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Partner</h3>
                <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6 leading-relaxed flex-grow">
                  Launch products together. We take equity + cash for product development
                  and go-to-market.
                </p>
                <ButtonTertiary href="/contact?interest=partner" className="gap-2 self-start text-xs md:text-sm">
                  Explore partnership
                  <ArrowRight className="w-4 h-4" />
                </ButtonTertiary>
              </div>

              {/* Collaborate */}
              <div className="flex flex-col p-4 sm:p-6 md:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold transition-colors">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg flex items-center justify-center mb-3 md:mb-4">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-terminal-gold" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Collaborate</h3>
                <p className="text-xs md:text-sm text-gray-300 mb-4 md:mb-6 leading-relaxed flex-grow">
                  Ship an MVP fast. Fixed-scope Kits for rapid prototyping and validation.
                </p>
                <ButtonTertiary href="/how-we-work" className="gap-2 self-start text-xs md:text-sm">
                  See how we work
                  <ArrowRight className="w-4 h-4" />
                </ButtonTertiary>
              </div>
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

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                How We Ship Faster
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto">
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

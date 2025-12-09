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
            {/* Main Headline - Large */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight">
                Rationale: <span className="font-light">Product Development Company</span>
              </h1>
            </div>

            {/* Subheadline - One Line */}
            <p className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-medium mb-8 tracking-tight">
              We ship products. <span className="text-gray-300">Yours and ours.</span>
            </p>

            {/* Body Copy */}
            <div className="max-w-2xl mx-auto mb-10">
              <p className="text-base sm:text-lg text-gray-400">
                Proven at Meta AI Reality Labs. Fee + equity engagements available.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center">
              <a
                href="/overview"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-black bg-[#FFD700] hover:bg-[#FFE34D] rounded-lg transition-all duration-200 shadow-lg shadow-[#FFD700]/20 hover:shadow-[#FFD700]/40 hover:scale-105"
              >
                Studio Overview
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* 2. CURRENT FOCUS - Zero, Heirloom + Pipeline */}
        <section id="current-focus" className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Current Focus
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                Product studio with two engines: proprietary software we build and own, and strategic partnerships where we transform strategy into shipped products.
              </p>
            </div>

            {/* Row 1: Zero and Heirloom */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 px-4 sm:px-0">
              {/* Zero - Beta/Dogfooding */}
              <div className="p-6 sm:p-8 bg-gray-900/70 border border-[#FFD700]/30 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Zero</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/40 rounded-full text-xs text-[#FFD700] font-medium">
                        Beta · Dogfooding
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  AI email assistant that achieves Inbox Zero autonomously. Learns your preferences,
                  handles routine responses, and keeps you focused on what matters.
                </p>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Used daily by our team to validate core workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Investor preview available for qualified partners</span>
                  </div>
                </div>

                <Link
                  href="/work/zero"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
                >
                  Learn about Zero
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Heirloom - In Development */}
              <div className="p-6 sm:p-8 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Heirloom</h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#00D9FF]/20 border border-[#00D9FF]/40 rounded-full text-xs text-[#00D9FF] font-medium">
                        In Development
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  Where family recipes live—styled, shared, and passed down exactly as you made them.
                  Modern recipe box where grandma's handwritten cards sit alongside NYT bookmarks.
                </p>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00D9FF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Native iOS app built for TestFlight launch</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#00D9FF] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-400">Recipe capture, styling, and sharing workflows complete</span>
                  </div>
                </div>

                <Link
                  href="/work/heirloom"
                  className="inline-flex items-center gap-2 text-[#00D9FF] hover:text-[#00D9FF]/80 font-medium transition-colors"
                >
                  Learn about Heirloom
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Row 2: Pipeline (Full Width) */}
            <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg mx-4 sm:mx-0">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pipeline</h3>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-300 font-medium">
                    Q1–Q2 2025
                  </span>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed">
                Multiple products in development across sectors. We're exploring opportunities
                in productivity, knowledge work, and enterprise automation.
              </p>

              <div className="space-y-3 text-sm text-gray-400">
                <div>Validation phase for 3 concepts</div>
                <div>Prototype testing with select partners</div>
                <div>Looking for product-minded investors</div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-sm text-gray-400 mb-3">
                  Interested in early access or investment opportunities?
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
                >
                  Get in touch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THREE PATHS - Invest / Partner / Collaborate */}
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
                Three Ways to Work Together
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
                Choose the path that fits your goals.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Invest */}
              <div className="flex flex-col p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Invest</h3>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
                  Back our product portfolio. Get early access to Zero and our pipeline products.
                  We're looking for product-minded investors who can open doors.
                </p>
                <Link
                  href="/contact?interest=invest"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors self-start"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Partner */}
              <div className="flex flex-col p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Partner</h3>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
                  Launch products together. We take equity + cash for product development
                  and go-to-market. Best for founders with distribution and capital.
                </p>
                <Link
                  href="/contact?interest=partner"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors self-start"
                >
                  Explore partnership
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Collaborate */}
              <div className="flex flex-col p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors">
                <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#FFD700]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Collaborate</h3>
                <p className="text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
                  Ship an MVP fast. Fixed-scope Kits for rapid prototyping and validation.
                  Get to working software in weeks, not quarters.
                </p>
                <Link
                  href="/how-we-work"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors self-start"
                >
                  See how we work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW WE SHIP FASTER - Kits Methodology */}
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
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                How We Ship Faster
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
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

            <div className="mt-12 text-center">
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
              >
                See the full methodology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* 5. FIT FILTER */}
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
    </>
  );
}

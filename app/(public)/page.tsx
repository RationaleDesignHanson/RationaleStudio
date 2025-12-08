/**
 * Rationale Homepage
 *
 * Product Studio Positioning (Phase 2):
 * - Hero: Product studio identity
 * - Current Focus: Zero beta + Pipeline
 * - How We Ship: Kits methodology
 * - Portfolio: Own products + Partnerships
 * - Three Paths: Invest/Partner/Collaborate
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
    <MultipleStructuredData dataBlocks={structuredData} /> <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* 1. HERO SECTION - Product Studio Identity */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> {/* ASCII Grid Background */} <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto text-center"> {/* Product Studio Badge */} <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full mb-6"> <Zap className="w-4 h-4 text-[#FFD700]" /> <span className="text-sm text-[#FFD700] font-medium">Product Studio</span> </div> <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"> We ship products. <br /> Yours and ours. </h1> <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto mb-10"> Product studio with two engines: proprietary software we build and own, and client work where we transform strategy into shipped products. Proven at Meta AI Reality Labs. Fee + equity partnerships available. </p> </div> </section> {/* 3. CURRENT FOCUS - Zero Beta + Pipeline */} <section id="current-focus" className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-6xl mx-auto"> <div className="text-center mb-12"> <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"> Current Focus </h2> <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"> What we're building right now. </p> </div> <div className="grid md:grid-cols-2 gap-8"> {/* Zero - Beta/Dogfooding */} <div className="p-6 sm:p-8 bg-gray-900/70 border border-[#FFD700]/30 rounded-lg"> <div className="flex items-start justify-between mb-4"> <div> <h3 className="text-2xl font-bold text-white mb-2">Zero</h3> <div className="flex items-center gap-2"> <span className="px-3 py-1 bg-[#FFD700]/20 border border-[#FFD700]/40 rounded-full text-xs text-[#FFD700] font-medium"> Beta · Dogfooding </span> </div> </div> </div> <p className="text-gray-300 mb-6 leading-relaxed"> AI email assistant that achieves Inbox Zero autonomously. Learns your preferences,
                handles routine responses, and keeps you focused on what matters. </p> <div className="space-y-3 mb-6 text-sm"> <div className="flex items-start gap-2"> <TrendingUp className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" /> <span className="text-gray-400">Used daily by our team to validate core workflows</span> </div> <div className="flex items-start gap-2"> <Users className="w-4 h-4 text-[#FFD700] mt-0.5 flex-shrink-0" /> <span className="text-gray-400">Investor preview available for qualified partners</span> </div> </div> <Link
                href="/work/zero"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
              > Learn about Zero <ArrowRight className="w-4 h-4" /> </Link> </div> {/* Pipeline */} <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg"> <div className="mb-6"> <h3 className="text-2xl font-bold text-white mb-2">Pipeline</h3> <div className="flex items-center gap-2"> <span className="px-3 py-1 bg-gray-700/50 border border-gray-600 rounded-full text-xs text-gray-300 font-medium"> Q1–Q2 2025 </span> </div> </div> <p className="text-gray-300 mb-6 leading-relaxed"> Multiple products in development across sectors. We're exploring opportunities
                in productivity, knowledge work, and enterprise automation. </p> <div className="space-y-3 text-sm text-gray-400"> <div>Validation phase for 3 concepts</div> <div>Prototype testing with select partners</div> <div>Looking for product-minded investors</div> </div> <div className="mt-6 pt-6 border-t border-gray-700"> <p className="text-sm text-gray-400 mb-3"> Interested in early access or investment opportunities? </p> <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
                > Get in touch <ArrowRight className="w-4 h-4" /> </Link> </div> </div> </div> </div> </section> {/* 4. HOW WE SHIP - Kits Methodology */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> {/* Mobile: simplified version */} <div className="block md:hidden"> <VelocityProof simplified={true} /> </div> {/* Desktop: full version */} <div className="hidden md:block"> <VelocityProof simplified={false} /> </div> <div className="mt-12 text-center"> <Link
              href="/how-we-work"
              className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
            > See the full methodology <ArrowRight className="w-4 h-4" /> </Link> </div> </div> </section> {/* 5. THREE PATHS - Invest / Partner / Collaborate */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <div className="text-center mb-12"> <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4"> Three Ways to Work Together </h2> <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto"> Choose the path that fits your goals. </p> </div> <div className="grid md:grid-cols-3 gap-8"> {/* Invest */} <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors"> <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4"> <TrendingUp className="w-6 h-6 text-[#FFD700]" /> </div> <h3 className="text-xl font-bold text-white mb-3">Invest</h3> <p className="text-sm text-gray-300 mb-6 leading-relaxed"> Back our product portfolio. Get early access to Zero and our pipeline products.
                We're looking for product-minded investors who can open doors. </p> <Link
                href="/contact?interest=invest"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
              > Learn more <ArrowRight className="w-4 h-4" /> </Link> </div> {/* Partner */} <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors"> <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4"> <Users className="w-6 h-6 text-[#FFD700]" /> </div> <h3 className="text-xl font-bold text-white mb-3">Partner</h3> <p className="text-sm text-gray-300 mb-6 leading-relaxed"> Launch products together. We take equity + cash for product development
                and go-to-market. Best for founders with distribution and capital. </p> <Link
                href="/contact?interest=partner"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
              > Explore partnership <ArrowRight className="w-4 h-4" /> </Link> </div> {/* Collaborate */} <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#FFD700] transition-colors"> <div className="w-12 h-12 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-lg flex items-center justify-center mb-4"> <Zap className="w-6 h-6 text-[#FFD700]" /> </div> <h3 className="text-xl font-bold text-white mb-3">Collaborate</h3> <p className="text-sm text-gray-300 mb-6 leading-relaxed"> Ship an MVP fast. Fixed-scope Kits for rapid prototyping and validation.
                Get to working software in weeks, not quarters. </p> <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 text-[#FFD700] hover:text-[#FFE34D] font-medium transition-colors"
              > See how we work <ArrowRight className="w-4 h-4" /> </Link> </div> </div> </div> </section> {/* 7. FIT FILTER (Optional - keep softened) */} <section className="relative py-20 px-4 sm:px-6 lg:px-8"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <FitFilter /> </div> </section> </main>
    </>
  );
}

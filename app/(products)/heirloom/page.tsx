/**
 * Heirloom Consumer Marketing Page
 *
 * Redesigned with analogue/nostalgic aesthetic: warm embers, amber tones,
 * vintage recipe card feeling. Consumer-focused JTBD landing page.
 *
 * Route: /heirloom
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Scale, ShoppingCart, Camera, Check, X, ArrowRight } from 'lucide-react';
import { heirloomMarketingContent } from '@/lib/content/products/heirloom-marketing';
import PrototypeEmbed from '@/app/(public)/work/heirloom/components/PrototypeEmbed';
import WarmEmberBackground from '@/components/heirloom/WarmEmberBackground';

export const metadata: Metadata = {
  title: heirloomMarketingContent.seo.title,
  description: heirloomMarketingContent.seo.description,
  keywords: heirloomMarketingContent.seo.keywords,
  openGraph: {
    title: heirloomMarketingContent.seo.title,
    description: heirloomMarketingContent.seo.description,
    type: 'website',
  }
};

const useCaseIcons = [
  <BookOpen key="book" className="w-6 h-6" />,
  <Scale key="scale" className="w-6 h-6" />,
  <ShoppingCart key="cart" className="w-6 h-6" />,
  <Camera key="camera" className="w-6 h-6" />
];

export default function HeirloomProductPage() {
  const content = heirloomMarketingContent;

  return (
    <main className="min-h-screen text-[#2D2D2D] overflow-hidden">
      {/* Global Warm Ember Background */}
      <div className="fixed inset-0">
        <WarmEmberBackground />
      </div>

      {/* HERO */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Product Name */}
          <div className="mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-[#E85D4D]"
              style={{
                textShadow: '0 4px 20px rgba(232, 93, 77, 0.2)'
              }}
            >
              HEIRLOOM
            </h1>
            <p className="text-xs sm:text-sm font-medium tracking-[0.3em] text-[#8B4513]/70 uppercase mt-1">
              {content.hero.preHeadline}
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] leading-tight mb-4">
            {content.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-[#5C4033]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            {content.hero.subheadline}
          </p>

          {/* CTA */}
          <a
            href={content.hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E85D4D] hover:bg-[#D84D3D] text-white font-semibold rounded-full shadow-xl shadow-[#E85D4D]/30 hover:shadow-[#E85D4D]/50 transition-all hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            {content.hero.ctaPrimary.text}
          </a>
        </div>
      </section>

      {/* PROBLEM → SOLUTION - Combined */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 bg-white/60 backdrop-blur-sm border border-[#E85D4D]/20 rounded-2xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-[#2D2D2D] mb-6">
              {content.problem.headline}
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {content.problem.scenarios.map((scenario, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-2xl font-black text-[#E85D4D]/40">{index + 1}</span>
                  <p className="text-sm text-[#5C4033]/80 leading-relaxed">
                    {scenario.scenario}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-semibold text-center text-[#E85D4D] pt-4 border-t border-[#E85D4D]/20">
              {content.problem.transition}
            </p>
          </div>
        </div>
      </section>

      {/* SOLUTION - 4 cards */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-8 text-center">
            {content.solution.headline}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {content.solution.useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-4 bg-white/70 backdrop-blur-sm border border-[#E85D4D]/20 rounded-xl hover:border-[#E85D4D]/40 hover:bg-white/90 transition-all shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E85D4D]/10 border border-[#E85D4D]/20 flex items-center justify-center text-[#E85D4D]">
                    {useCaseIcons[index]}
                  </div>
                  <h3 className="text-sm font-bold text-[#2D2D2D] leading-tight">
                    {useCase.trigger}
                  </h3>
                </div>
                <p className="text-xs text-[#2A9D8F] font-medium">
                  → {useCase.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO - Preserved */}
      <section id="demo" className="relative bg-white/80 backdrop-blur-sm">
        <PrototypeEmbed />
      </section>

      {/* PROOF - Compact */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2D2D] mb-8 text-center">
            {content.proof.headline}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-4 bg-white/70 backdrop-blur-sm border border-[#E85D4D]/20 rounded-xl text-center shadow-sm">
                <div className="text-base md:text-lg font-bold text-[#E85D4D] mb-2">
                  {outcome.metric}
                </div>
                <p className="text-xs text-[#5C4033]/70 leading-relaxed">
                  {outcome.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + WHO IT'S FOR - Combined */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* CTA Card - Takes 3 columns */}
            <div className="lg:col-span-3 p-6 sm:p-8 bg-gradient-to-br from-[#E85D4D]/10 to-white/80 backdrop-blur-xl border border-[#E85D4D]/30 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#E85D4D] flex items-center justify-center shadow-lg shadow-[#E85D4D]/30 flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2D2D2D] mb-1">
                    {content.cta.headline}
                  </h2>
                  <p className="text-sm text-[#5C4033]/70">
                    {content.cta.subheadline}
                  </p>
                </div>
              </div>

              <a
                href={content.hero.ctaPrimary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E85D4D] hover:bg-[#D84D3D] text-white font-semibold rounded-full shadow-lg shadow-[#E85D4D]/30 hover:shadow-[#E85D4D]/50 transition-all hover:scale-105"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-4 h-4" />
              </a>

              <p className="mt-4 text-xs text-[#5C4033]/50">
                {content.cta.trustSignal}
              </p>
            </div>

            {/* Who it's for - Takes 2 columns */}
            <div className="lg:col-span-2 p-5 bg-white/70 backdrop-blur-sm border border-[#E85D4D]/20 rounded-2xl">
              <h3 className="text-sm font-bold text-[#2A9D8F] mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Perfect if you:
              </h3>
              <ul className="space-y-2 mb-4">
                {content.whoItsFor.personas.slice(0, 3).map((persona, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#2A9D8F] mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-[#5C4033]/80 leading-relaxed">{persona}</p>
                  </li>
                ))}
              </ul>

              {content.whoItsFor.antiPersonas && (
                <>
                  <h3 className="text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Skip if:
                  </h3>
                  <ul className="space-y-1">
                    {content.whoItsFor.antiPersonas.map((antiPersona, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
                        <p className="text-xs text-gray-500">{antiPersona}</p>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 text-center border-t border-[#E85D4D]/10">
        <div className="relative z-10">
          <p className="text-xs text-[#5C4033]/40">
            Heirloom • Built by{' '}
            <Link href="/" className="text-[#E85D4D]/60 hover:text-[#E85D4D] transition-colors">
              Rationale
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

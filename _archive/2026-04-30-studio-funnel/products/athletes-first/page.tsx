/**
 * Athletes-First Consumer Marketing Page (020)
 *
 * Partnership-focused landing page for sports agent platform.
 * Emphasizes scale, 4 integrated modules, and partnership model.
 *
 * Route: /products/athletes-first
 * NOTE: This page is NOT linked in navigation until ready for launch
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Zap, Shield, Image, ArrowRight, Check, X, Trophy } from 'lucide-react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui/ButtonHierarchy';
import { athletesFirstMarketingContent } from '@/lib/content/products/athletes-first-marketing';

export const metadata: Metadata = {
  title: athletesFirstMarketingContent.seo.title,
  description: athletesFirstMarketingContent.seo.description,
  keywords: athletesFirstMarketingContent.seo.keywords,
  openGraph: {
    title: athletesFirstMarketingContent.seo.title,
    description: athletesFirstMarketingContent.seo.description,
    type: 'website',
  }
};

export default function AthletesFirstProductPage() {
  const content = athletesFirstMarketingContent;
  const accentColor = '#00FF94'; // Green for sports

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* SECTION 1: HERO (JTBD-FIRST) */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Product Name */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#00FF94]">
              ATHLETES FIRST
            </h1>
          </div>

          {/* Pre-headline */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-full text-sm font-semibold text-[#00FF94] uppercase tracking-wide">
              {content.hero.preHeadline}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {content.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {content.hero.subheadline}
          </p>

          {/* Case Study Link */}
          <div className="mb-12">
            <Link
              href="/work/athletes-first"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors underline underline-offset-4"
            >
              Check out the demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Visual Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800/50 border border-[#00FF94]/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Trophy className="w-16 h-16 text-[#00FF94] mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Image/Video Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {content.problem.headline}
          </h2>

          <div className="space-y-8 mb-12">
            {content.problem.scenarios.map((scenario, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-[#00FF94]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#00FF94] font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {scenario.scenario}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-[#00FF94] font-semibold italic">
              {content.problem.transition}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {content.solution.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {content.solution.useCases.map((useCase, index) => {
              const icons = [<Zap key={0} className="w-6 h-6" />, <Shield key={1} className="w-6 h-6" />, <Image key={2} className="w-6 h-6" />, <Users key={3} className="w-6 h-6" />];
              return (
                <div key={index} className="p-6 lg:p-8 bg-gray-900/70 border border-[#00FF94]/30 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#00FF94]">
                        {icons[index] || <Trophy className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {useCase.trigger}
                      </h3>
                    </div>

                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-[#00FF94] flex-shrink-0 mt-0.5" />
                        <span>{useCase.action}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-white">{useCase.outcome}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROOF IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {content.proof.headline}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-6 bg-gray-900/70 border border-[#00FF94]/30 rounded-lg text-center">
                <div className="text-2xl font-bold text-[#00FF94] mb-3">
                  {outcome.metric}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {outcome.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRIMARY CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00FF94]/10 to-transparent border-b border-gray-800">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {content.cta.headline}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {content.cta.subheadline}
          </p>

          <ButtonPrimary
            href={content.hero.ctaPrimary.href}
            size="lg"
            className="gap-2 inline-flex items-center shadow-xl shadow-[#00FF94]/30 mb-6 bg-[#00FF94] hover:bg-[#00E085] text-gray-900"
          >
            <Trophy className="w-5 h-5" />
            {content.cta.buttonText}
          </ButtonPrimary>

          <p className="text-sm text-gray-400">
            {content.cta.trustSignal}
          </p>
        </div>
      </section>

      {/* SECTION 6: WHO IT'S FOR */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {content.whoItsFor.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personas */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#00FF94] mb-6">Perfect if you:</h3>
              {content.whoItsFor.personas.map((persona, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">{persona}</p>
                </div>
              ))}
            </div>

            {/* Anti-personas */}
            {content.whoItsFor.antiPersonas && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-400 mb-6">Not right for you if:</h3>
                {content.whoItsFor.antiPersonas.map((antiPersona, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-400">{antiPersona}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
            {content.howItWorks.headline}
          </h2>

          <div className="space-y-6 mb-12">
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-[#00FF94]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00FF94] font-bold text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Sidebar */}
          {content.howItWorks.techSidebar && (
            <div className="p-6 bg-gray-900/70 border border-gray-700 rounded-lg">
              <div className="flex items-start gap-3">
                <Trophy className="w-5 h-5 text-[#00FF94] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Technology</h4>
                  <p className="text-sm text-gray-300 mb-4">{content.howItWorks.techSidebar}</p>
                  {content.howItWorks.deepDiveLink && (
                    <Link
                      href={content.howItWorks.deepDiveLink.href}
                      className="text-sm text-[#00FF94] hover:underline inline-flex items-center gap-2"
                    >
                      {content.howItWorks.deepDiveLink.text}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 8: SECONDARY CTAs */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            {content.secondaryCTAs.headline}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.secondaryCTAs.paths.map((path, index) => (
              <Link
                key={index}
                href={path.href}
                className="group p-6 bg-gray-900/50 border border-[#00FF94]/50 rounded-lg transition-all flex flex-col"
              >
                <h4 className="font-bold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                  {path.label}
                </h4>
                <p className="text-sm text-gray-400 mb-4 flex-grow">{path.description}</p>
                <div className="flex items-center text-[#00FF94] text-sm font-semibold mt-auto">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center border-t border-gray-800">
        <p className="text-sm text-gray-500">
          Athletes-First Platform • Built by Rationale Studio
        </p>
      </div>
    </main>
  );
}

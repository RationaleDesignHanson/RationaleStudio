/**
 * 040 Sanitary System Consumer Marketing Page
 *
 * Physical product landing page for pet waste management system.
 * Emphasizes hygiene, convenience, and zero daily maintenance.
 *
 * Route: /products/sanitary-system
 * NOTE: This page is NOT linked in navigation until ready for launch
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, X, Package, Shield, Clock, Droplet } from 'lucide-react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui/ButtonHierarchy';
import { sanitaryMarketingContent } from '@/lib/content/products/sanitary-marketing';

export const metadata: Metadata = {
  title: sanitaryMarketingContent.seo.title,
  description: sanitaryMarketingContent.seo.description,
  keywords: sanitaryMarketingContent.seo.keywords,
  openGraph: {
    title: sanitaryMarketingContent.seo.title,
    description: sanitaryMarketingContent.seo.description,
    type: 'website',
  }
};

export default function SanitarySystemProductPage() {
  const content = sanitaryMarketingContent;
  const accentColor = '#00CED1'; // Clean cyan for hygiene

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* SECTION 1: HERO (JTBD-FIRST) */}
      <section className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Pre-headline */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-sm font-semibold text-cyan-400 uppercase tracking-wide">
              {content.hero.preHeadline}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            {content.hero.headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {content.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <ButtonPrimary
              href={content.hero.ctaPrimary.href}
              size="lg"
              className="gap-2 inline-flex items-center shadow-lg shadow-cyan-500/20 bg-cyan-600 hover:bg-cyan-700"
            >
              <Package className="w-5 h-5" />
              {content.hero.ctaPrimary.text}
            </ButtonPrimary>
            {content.hero.ctaSecondary && (
              <ButtonSecondary
                href={content.hero.ctaSecondary.href}
                size="lg"
                className="gap-2 border-cyan-500/30 hover:border-cyan-500 text-cyan-400"
              >
                {content.hero.ctaSecondary.text}
                <ArrowRight className="w-5 h-5" />
              </ButtonSecondary>
            )}
          </div>

          {/* Visual Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800/50 border border-cyan-500/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Product Photos Coming Soon</p>
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
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-cyan-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {scenario.scenario}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-cyan-400 font-semibold italic">
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
              const icons = [<Droplet key={0} className="w-6 h-6" />, <Clock key={1} className="w-6 h-6" />, <Shield key={2} className="w-6 h-6" />, <Sparkles key={3} className="w-6 h-6" />];
              return (
                <div key={index} className="p-6 lg:p-8 bg-gray-900/70 border border-cyan-500/30 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-cyan-400">
                        {icons[index] || <Package className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {useCase.trigger}
                      </h3>
                    </div>

                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
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
            colorTheme={watercolorThemes.blueTeal}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            {content.proof.headline}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-6 bg-gray-900/70 border border-cyan-500/30 rounded-lg text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-3">
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
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 to-transparent border-b border-gray-800">
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
            className="gap-2 inline-flex items-center shadow-xl shadow-cyan-500/30 mb-6 bg-cyan-600 hover:bg-cyan-700"
          >
            <Package className="w-5 h-5" />
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
              <h3 className="text-xl font-bold text-cyan-400 mb-6">Perfect if you:</h3>
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
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400 font-bold text-xl">{index + 1}</span>
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
                <Sparkles className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Materials & Technology</h4>
                  <p className="text-sm text-gray-300 mb-4">{content.howItWorks.techSidebar}</p>
                  {content.howItWorks.deepDiveLink && (
                    <Link
                      href={content.howItWorks.deepDiveLink.href}
                      className="text-sm text-cyan-400 hover:underline inline-flex items-center gap-2"
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

          <div className="grid md:grid-cols-3 gap-6">
            {content.secondaryCTAs.paths.map((path, index) => (
              <Link
                key={index}
                href={path.href}
                className="group p-6 bg-gray-900/50 border border-gray-700 hover:border-cyan-500/50 rounded-lg transition-all"
              >
                <h4 className="font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {path.label}
                </h4>
                <p className="text-sm text-gray-400 mb-4">{path.description}</p>
                <div className="flex items-center text-cyan-400 text-sm font-semibold">
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
          040 Sanitary Waste System • Built by Rationale Studio
        </p>
      </div>
    </main>
  );
}

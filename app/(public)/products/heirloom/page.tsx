/**
 * Heirloom Consumer Marketing Page
 *
 * JTBD-focused landing page for end-users.
 * Answers: "What does this solve for me?" not "How was this built?"
 *
 * Route: /products/heirloom
 * NOTE: This page is NOT linked in navigation until ready for launch
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Camera, ShoppingCart, Scale, ArrowRight, Check, X, Heart } from 'lucide-react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui/ButtonHierarchy';
import { heirloomMarketingContent } from '@/lib/content/products/heirloom-marketing';

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

export default function HeirloomProductPage() {
  const content = heirloomMarketingContent;
  const accentColor = '#00D9FF'; // Heirloom brand cyan

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
            <span className="inline-block px-4 py-1.5 bg-[#00D9FF]/10 border border-[#00D9FF]/30 rounded-full text-sm font-semibold text-[#00D9FF] uppercase tracking-wide">
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
            <a
              href={content.hero.ctaPrimary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00D9FF] hover:bg-[#00C5E6] text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-[#00D9FF]/20 hover:shadow-xl hover:shadow-[#00D9FF]/30"
            >
              <BookOpen className="w-5 h-5" />
              {content.hero.ctaPrimary.text}
            </a>
            {content.hero.ctaSecondary && (
              <ButtonSecondary
                href={content.hero.ctaSecondary.href}
                size="lg"
                className="gap-2 border-[#00D9FF]/30 hover:border-[#00D9FF] text-[#00D9FF]"
              >
                {content.hero.ctaSecondary.text}
                <ArrowRight className="w-5 h-5" />
              </ButtonSecondary>
            )}
          </div>

          {/* Visual Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800/50 border border-[#00D9FF]/30 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BookOpen className="w-16 h-16 text-[#00D9FF] mx-auto mb-4" />
                <p className="text-gray-400 text-sm">App Screenshots Coming Soon</p>
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
                <div className="w-8 h-8 rounded-full bg-[#00D9FF]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#00D9FF] font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {scenario.scenario}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-[#00D9FF] font-semibold italic">
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
              const icons = [<BookOpen key={0} className="w-6 h-6" />, <Scale key={1} className="w-6 h-6" />, <ShoppingCart key={2} className="w-6 h-6" />, <Camera key={3} className="w-6 h-6" />];
              return (
                <div key={index} className="p-6 lg:p-8 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#00D9FF]">
                        {icons[index] || <BookOpen className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {useCase.trigger}
                      </h3>
                    </div>

                    <div className="space-y-3 text-gray-300">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-[#00D9FF] flex-shrink-0 mt-0.5" />
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-6 bg-gray-900/70 border border-[#00D9FF]/30 rounded-lg text-center">
                <div className="text-2xl font-bold text-[#00D9FF] mb-3">
                  {outcome.metric}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {outcome.context}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          {content.proof.testimonial && (
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-[#00D9FF]/20 to-transparent border-2 border-[#00D9FF] rounded-lg">
              <blockquote className="text-lg md:text-xl text-gray-200 italic mb-4">
                "{content.proof.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 flex items-center justify-center">
                  <span className="text-[#00D9FF] font-bold text-xl">
                    {content.proof.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-white">{content.proof.testimonial.author}</div>
                  <div className="text-sm text-gray-400">{content.proof.testimonial.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: PRIMARY CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#00D9FF]/10 to-transparent border-b border-gray-800">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {content.cta.headline}
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            {content.cta.subheadline}
          </p>

          <a
            href={content.hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00D9FF] hover:bg-[#00C5E6] text-gray-900 rounded-lg font-bold transition-all shadow-xl shadow-[#00D9FF]/30 mb-6"
          >
            <BookOpen className="w-5 h-5" />
            {content.cta.buttonText}
          </a>

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
              <h3 className="text-xl font-bold text-[#00D9FF] mb-6">Perfect if you:</h3>
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
                <div className="w-12 h-12 rounded-full bg-[#00D9FF]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#00D9FF] font-bold text-xl">{index + 1}</span>
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
                <Heart className="w-5 h-5 text-[#00D9FF] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-white mb-2">Technology</h4>
                  <p className="text-sm text-gray-300 mb-4">{content.howItWorks.techSidebar}</p>
                  {content.howItWorks.deepDiveLink && (
                    <Link
                      href={content.howItWorks.deepDiveLink.href}
                      className="text-sm text-[#00D9FF] hover:underline inline-flex items-center gap-2"
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
                className="group p-6 bg-gray-900/50 border border-gray-700 hover:border-[#00D9FF]/50 rounded-lg transition-all"
              >
                <h4 className="font-bold text-white mb-2 group-hover:text-[#00D9FF] transition-colors">
                  {path.label}
                </h4>
                <p className="text-sm text-gray-400 mb-4">{path.description}</p>
                <div className="flex items-center text-[#00D9FF] text-sm font-semibold">
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
          Heirloom Recipe Management • Built by Rationale Studio
        </p>
      </div>
    </main>
  );
}

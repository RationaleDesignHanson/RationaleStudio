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
import PrototypeEmbed from '@/app/(public)/work/heirloom/components/PrototypeEmbed';
import { MobileCarousel } from '@/components/ui/MobileCarousel';

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
  const accentColor = '#E85D4D'; // Heirloom brand coral/red

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460]">

      {/* SECTION 1: HERO (JTBD-FIRST) */}
      <section className="relative pt-8 pb-4 md:pt-12 md:pb-6 lg:pt-16 lg:pb-8 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.03}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Product Name */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#E85D4D]">
              HEIRLOOM
            </h1>
          </div>

          {/* Pre-headline */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-[#E85D4D]/10 border border-[#E85D4D]/30 rounded-full text-sm font-semibold text-[#E85D4D] uppercase tracking-wide">
              {content.hero.preHeadline}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#2D2D2D] leading-tight mb-6">
            {content.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-12 leading-relaxed">
            {content.hero.subheadline}
          </p>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="relative py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.problem.headline}
          </h2>

          {/* Mobile: Carousel */}
          <div className="md:hidden mb-12">
            <MobileCarousel>
              {content.problem.scenarios.map((scenario, index) => (
                <div key={index} className="p-6 bg-white/60 border border-[#E85D4D]/20 rounded-lg shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-[#E85D4D]/20 flex items-center justify-center mb-4">
                    <span className="text-[#E85D4D] font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                    {scenario.scenario}
                  </p>
                </div>
              ))}
            </MobileCarousel>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-12">
            {content.problem.scenarios.map((scenario, index) => (
              <div key={index} className="p-6 bg-white/60 border border-[#E85D4D]/20 rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#E85D4D]/20 flex items-center justify-center mb-4">
                  <span className="text-[#E85D4D] font-bold">{index + 1}</span>
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {scenario.scenario}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-[#E85D4D] font-semibold italic">
              {content.problem.transition}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.solution.headline}
          </h2>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <MobileCarousel>
              {content.solution.useCases.map((useCase, index) => {
                const icons = [<BookOpen key={0} className="w-6 h-6" />, <Scale key={1} className="w-6 h-6" />, <ShoppingCart key={2} className="w-6 h-6" />, <Camera key={3} className="w-6 h-6" />];
                return (
                  <div key={index} className="p-6 lg:p-8 bg-white/60 border-2 border-[#E85D4D]/30 rounded-lg shadow-sm">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-[#E85D4D]">
                          {icons[index] || <BookOpen className="w-6 h-6" />}
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-[#2D2D2D]">
                          {useCase.trigger}
                        </h3>
                      </div>

                      <div className="space-y-3 text-sm md:text-base text-gray-700">
                        <p className="flex items-start gap-2">
                          <ArrowRight className="w-5 h-5 text-[#E85D4D] flex-shrink-0 mt-0.5" />
                          <span>{useCase.action}</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="font-semibold text-[#2D2D2D]">{useCase.outcome}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </MobileCarousel>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8">
            {content.solution.useCases.map((useCase, index) => {
              const icons = [<BookOpen key={0} className="w-6 h-6" />, <Scale key={1} className="w-6 h-6" />, <ShoppingCart key={2} className="w-6 h-6" />, <Camera key={3} className="w-6 h-6" />];
              return (
                <div key={index} className="p-6 lg:p-8 bg-white/60 border-2 border-[#E85D4D]/30 rounded-lg shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#E85D4D]">
                        {icons[index] || <BookOpen className="w-6 h-6" />}
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-[#2D2D2D]">
                        {useCase.trigger}
                      </h3>
                    </div>

                    <div className="space-y-3 text-sm md:text-base text-gray-700">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-[#E85D4D] flex-shrink-0 mt-0.5" />
                        <span>{useCase.action}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="font-semibold text-[#2D2D2D]">{useCase.outcome}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Case Study Link */}
          <div className="text-center mt-12">
            <Link
              href="/work/heirloom"
              className="inline-flex items-center gap-2 text-[#E85D4D] hover:text-[#D84D3D] transition-colors underline underline-offset-4 font-medium text-lg"
            >
              See overview
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Demos Section */}
      <section id="demo" className="bg-white">
        <PrototypeEmbed />
      </section>

      {/* SECTION 4: PROOF IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.proof.headline}
          </h2>

          {/* Mobile: Carousel */}
          <div className="md:hidden mb-12">
            <MobileCarousel>
              {content.proof.outcomes.map((outcome, index) => (
                <div key={index} className="p-6 bg-white/60 border-2 border-[#E85D4D]/30 rounded-lg text-center shadow-sm">
                  <div className="text-xl md:text-2xl font-bold text-[#E85D4D] mb-3">
                    {outcome.metric}
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                    {outcome.context}
                  </p>
                </div>
              ))}
            </MobileCarousel>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-6 bg-white/60 border-2 border-[#E85D4D]/30 rounded-lg text-center shadow-sm">
                <div className="text-xl md:text-2xl font-bold text-[#E85D4D] mb-3">
                  {outcome.metric}
                </div>
                <p className="text-xs md:text-sm text-gray-700 leading-relaxed">
                  {outcome.context}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          {content.proof.testimonial && (
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-[#E85D4D]/10 to-white/50 border-2 border-[#E85D4D] rounded-lg shadow-lg">
              <blockquote className="text-lg md:text-xl text-gray-800 italic mb-4">
                "{content.proof.testimonial.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#E85D4D]/20 flex items-center justify-center">
                  <span className="text-[#E85D4D] font-bold text-xl">
                    {content.proof.testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="text-sm md:text-base font-semibold text-[#2D2D2D]">{content.proof.testimonial.author}</div>
                  <div className="text-xs md:text-sm text-gray-600">{content.proof.testimonial.role}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 5: PRIMARY CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E85D4D]/15 to-transparent border-b border-[#E85D4D]/20">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4">
            {content.cta.headline}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-8">
            {content.cta.subheadline}
          </p>

          <a
            href={content.hero.ctaPrimary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E85D4D] hover:bg-[#D84D3D] text-white rounded-lg font-bold transition-all shadow-xl shadow-[#E85D4D]/30 mb-6"
          >
            <BookOpen className="w-5 h-5" />
            {content.cta.buttonText}
          </a>

          <p className="text-sm text-gray-600">
            {content.cta.trustSignal}
          </p>
        </div>
      </section>

      {/* SECTION 6: WHO IT'S FOR */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.whoItsFor.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personas */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-[#E85D4D] mb-6">Perfect if you:</h3>
              {content.whoItsFor.personas.map((persona, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-sm md:text-base text-gray-700">{persona}</p>
                </div>
              ))}
            </div>

            {/* Anti-personas */}
            {content.whoItsFor.antiPersonas && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-600 mb-6">Not right for you if:</h3>
                {content.whoItsFor.antiPersonas.map((antiPersona, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                    <p className="text-sm md:text-base text-gray-600">{antiPersona}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={watercolorThemes.coralOrange}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.howItWorks.headline}
          </h2>

          <div className="space-y-6 mb-12">
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-white/60 border border-[#E85D4D]/20 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#E85D4D]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#E85D4D] font-bold text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Sidebar */}
          {content.howItWorks.techSidebar && (
            <div className="p-6 bg-white/60 border-2 border-[#E85D4D]/30 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-[#E85D4D] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm md:text-base font-semibold text-[#2D2D2D] mb-2">Technology</h4>
                  <p className="text-xs md:text-sm text-gray-700 mb-4">{content.howItWorks.techSidebar}</p>
                  {content.howItWorks.deepDiveLink && (
                    <Link
                      href={content.howItWorks.deepDiveLink.href}
                      className="text-sm text-[#E85D4D] hover:text-[#D84D3D] hover:underline inline-flex items-center gap-2 font-medium"
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

      {/* SECTION 7B: FULL FEATURE SET */}
      {content.fullFeatureSet && (
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D4D]/20 bg-white/30">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.02}
              animated={true}
              colorTheme={watercolorThemes.coralOrange}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-4 text-center">
              {content.fullFeatureSet.headline}
            </h2>
            <p className="text-base md:text-lg text-gray-700 text-center mb-12 max-w-3xl mx-auto">
              {content.fullFeatureSet.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Demoed Features */}
              <div className="p-6 bg-gradient-to-br from-[#E85D4D]/10 to-white/50 border-2 border-[#E85D4D] rounded-lg shadow-lg">
                <h3 className="text-lg md:text-xl font-bold text-[#E85D4D] mb-4">
                  {content.fullFeatureSet.demoedFeatures.headline}
                </h3>
                <div className="space-y-4 mb-6">
                  {content.fullFeatureSet.demoedFeatures.features.map((feature, index) => (
                    <div key={index} className="pb-4 border-b border-[#E85D4D]/20 last:border-0 last:pb-0">
                      <h4 className="text-sm md:text-base font-bold text-[#2D2D2D] mb-2">{feature.name}</h4>
                      <p className="text-xs md:text-sm text-gray-700">{feature.description}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={content.fullFeatureSet.demoedFeatures.link.href}
                  className="inline-flex items-center gap-2 text-[#E85D4D] hover:text-[#D84D3D] transition-colors font-medium text-sm"
                >
                  {content.fullFeatureSet.demoedFeatures.link.text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Additional Features */}
              <div className="p-6 bg-white/60 border border-[#E85D4D]/20 rounded-lg shadow-sm">
                <h3 className="text-lg md:text-xl font-bold text-[#2D2D2D] mb-4">
                  {content.fullFeatureSet.additionalFeatures.headline}
                </h3>
                <div className="space-y-3">
                  {content.fullFeatureSet.additionalFeatures.features.map((feature, index) => (
                    <div key={index} className="pb-3 border-b border-gray-200 last:border-0 last:pb-0">
                      <h4 className="text-xs md:text-sm font-semibold text-[#2D2D2D] mb-1">{feature.name}</h4>
                      <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 8: SECONDARY CTAs */}
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-[#2D2D2D] mb-8 text-center">
            {content.secondaryCTAs.headline}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.secondaryCTAs.paths.map((path, index) => (
              <Link
                key={index}
                href={path.href}
                className="group p-6 bg-white/60 border border-[#E85D4D]/20 hover:border-[#E85D4D]/50 rounded-lg transition-all shadow-sm hover:shadow-md flex flex-col"
              >
                <h4 className="text-base md:text-lg font-bold text-[#2D2D2D] mb-2 group-hover:text-[#E85D4D] transition-colors">
                  {path.label}
                </h4>
                <p className="text-xs md:text-sm text-gray-600 mb-4 flex-grow">{path.description}</p>
                <div className="flex items-center text-[#E85D4D] text-sm font-semibold mt-auto">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center border-t border-[#E85D4D]/20 bg-white/30">
        <p className="text-sm text-gray-600">
          Heirloom Recipe Management • Built by Rationale Studio
        </p>
      </div>
    </main>
  );
}

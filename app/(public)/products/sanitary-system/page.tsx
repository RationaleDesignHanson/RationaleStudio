/**
 * Nimbus Consumer Marketing Page
 *
 * Physical product landing page for dog waste pickup system.
 * Emphasizes eliminating the disgusting sensory experience during pickup.
 *
 * Route: /products/sanitary-system
 * NOTE: This page is NOT linked in navigation until ready for launch
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
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
  const accentColor = '#E85D42'; // Tomato/coral - matching case study

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-[#F5F1E8] to-[#F4A261]">

      {/* SECTION 1: HERO (JTBD-FIRST) */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 lg:pt-16 lg:pb-32 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.03}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Product Name */}
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#E85D42]">
              NIMBUS
            </h1>
          </div>

          {/* Pre-headline */}
          <div className="mb-4">
            <span className="inline-block px-4 py-1.5 bg-[#E85D42]/10 border border-[#E85D42]/30 rounded-full text-sm font-semibold text-[#E85D42] uppercase tracking-wide">
              {content.hero.preHeadline}
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2D2D2D] leading-tight mb-6">
            {content.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
            {content.hero.subheadline}
          </p>

          {/* Case Study Link */}
          <div className="mb-12">
            <Link
              href="/clients/work/sanitary-waste-system/full-overview"
              className="inline-flex items-center gap-2 text-[#E85D42] hover:text-[#D84A32] transition-colors underline underline-offset-4 font-medium"
            >
              Check out the demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="relative aspect-video bg-white/50 border-2 border-[#E85D42]/30 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/sanitary-waste-system/image1.png"
                alt="Cross-section showing airlaid liner, compostable film, and zone bonding"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-3 italic">
              Three-layer construction: 600-1000 micron absorbent liner eliminates heat transfer
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.problem.headline}
          </h2>

          <div className="space-y-8 mb-12">
            {content.problem.scenarios.map((scenario, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/60 border border-[#E85D42]/20 rounded-lg shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#E85D42]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[#E85D42] font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {scenario.scenario}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xl md:text-2xl text-[#E85D42] font-semibold italic">
              {content.problem.transition}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.solution.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {content.solution.useCases.map((useCase, index) => {
              const icons = [<Droplet key={0} className="w-6 h-6" />, <Clock key={1} className="w-6 h-6" />, <Shield key={2} className="w-6 h-6" />, <Sparkles key={3} className="w-6 h-6" />];
              return (
                <div key={index} className="p-6 lg:p-8 bg-white/60 border-2 border-[#E85D42]/30 rounded-lg shadow-sm">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-[#E85D42]">
                        {icons[index] || <Package className="w-6 h-6" />}
                      </div>
                      <h3 className="text-lg font-bold text-[#2D2D2D]">
                        {useCase.trigger}
                      </h3>
                    </div>

                    <div className="space-y-3 text-gray-700">
                      <p className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-[#E85D42] flex-shrink-0 mt-0.5" />
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
        </div>
      </section>

      {/* SECTION 4: PROOF IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.proof.headline}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.proof.outcomes.map((outcome, index) => (
              <div key={index} className="p-6 bg-white/60 border-2 border-[#E85D42]/30 rounded-lg text-center shadow-sm">
                <div className="text-2xl font-bold text-[#E85D42] mb-3">
                  {outcome.metric}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {outcome.context}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: PRIMARY CTA */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#E85D42]/15 to-transparent border-b border-[#E85D42]/20">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
            {content.cta.headline}
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            {content.cta.subheadline}
          </p>

          <ButtonPrimary
            href={content.hero.ctaPrimary.href}
            size="lg"
            className="gap-2 inline-flex items-center shadow-xl shadow-[#E85D42]/30 mb-6 bg-[#E85D42] hover:bg-[#D84A32] text-white"
          >
            <Package className="w-5 h-5" />
            {content.cta.buttonText}
          </ButtonPrimary>

          <p className="text-sm text-gray-600">
            {content.cta.trustSignal}
          </p>
        </div>
      </section>

      {/* SECTION 6: WHO IT'S FOR */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20 bg-white/30">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.whoItsFor.headline}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Personas */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#E85D42] mb-6">Perfect if you:</h3>
              {content.whoItsFor.personas.map((persona, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{persona}</p>
                </div>
              ))}
            </div>

            {/* Anti-personas */}
            {content.whoItsFor.antiPersonas && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-600 mb-6">Not right for you if:</h3>
                {content.whoItsFor.antiPersonas.map((antiPersona, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-gray-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-600">{antiPersona}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E85D42]/20">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.02}
            animated={true}
            colorTheme={{
              name: 'Sanitary System',
              colors: ['#F4A261', '#E76F51', '#E85D42'],
              primary: '#E85D42',
              description: 'Warm orange with tomato accents'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-12 text-center">
            {content.howItWorks.headline}
          </h2>

          <div className="space-y-6 mb-12">
            {content.howItWorks.steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 p-6 bg-white/60 border border-[#E85D42]/20 rounded-lg shadow-sm">
                <div className="w-12 h-12 rounded-full bg-[#E85D42]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[#E85D42] font-bold text-xl">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tech Sidebar */}
          {content.howItWorks.techSidebar && (
            <div className="p-6 bg-white/60 border-2 border-[#E85D42]/30 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#E85D42] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Materials & Technology</h4>
                  <p className="text-sm text-gray-700 mb-4">{content.howItWorks.techSidebar}</p>
                  {content.howItWorks.deepDiveLink && (
                    <Link
                      href={content.howItWorks.deepDiveLink.href}
                      className="text-sm text-[#E85D42] hover:text-[#D84A32] hover:underline inline-flex items-center gap-2 font-medium"
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
      <section className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="relative z-10 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-[#2D2D2D] mb-8 text-center">
            {content.secondaryCTAs.headline}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.secondaryCTAs.paths.map((path, index) => (
              <Link
                key={index}
                href={path.href}
                className="group p-6 bg-white/60 border border-[#E85D42]/20 hover:border-[#E85D42]/50 rounded-lg transition-all shadow-sm hover:shadow-md flex flex-col"
              >
                <h4 className="font-bold text-[#2D2D2D] mb-2 group-hover:text-[#E85D42] transition-colors">
                  {path.label}
                </h4>
                <p className="text-sm text-gray-600 mb-4 flex-grow">{path.description}</p>
                <div className="flex items-center text-[#E85D42] text-sm font-semibold mt-auto">
                  Learn more
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center border-t border-[#E85D42]/20 bg-white/30">
        <p className="text-sm text-gray-600">
          Nimbus • Built by Rationale Studio
        </p>
      </div>
    </main>
  );
}

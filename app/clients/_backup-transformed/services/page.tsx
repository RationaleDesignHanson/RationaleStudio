/**
 * Services Page - Window Shrine Design
 *
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 * Preserves all functionality: KitCards, quiz, comparison table, payment flexibility.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { KitCard } from '@/components/cards';
import { serviceKits, expertiseAreas, paymentFlexibility } from '@/lib/content/kits';
import { servicesContent } from '@/lib/content';
import { KitQuiz } from '@/components/conversion';
import { StickyCTABar } from '@/components/conversion';

export default function ServicesPage() {
  const [showQuiz, setShowQuiz] = useState(false);

  // Featured kit (most popular)
  const featuredKit = serviceKits.find(k => k.slug === 'prototype-kit') || serviceKits[0];
  const otherKits = serviceKits.filter(k => k.slug !== featuredKit.slug);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        {/* Hero */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.08}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 text-center animate-fade-in-up">
              ENGINE 1 // CLIENT ENGAGEMENTS
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100">
              Rationale Kits
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200">
              Productized client engagements. Cash, equity, or hybrid. One engine of our dual-model studio. Kits fund runway and validate our execution systems. Portfolio IP accumulates value.
            </p>
          </div>
        </section>

        {/* Dual-Engine Context */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.04}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <OS8Window
              title="Kits + Portfolio: How Our Dual-Engine Model Works"
              variant="body"
              animateIn={false}
            >
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-100 mb-4">
                <div>
                  <p className="mb-2">
                    <span className="font-bold text-[#FFD700]">Rationale Kits</span> (this page): Client engagements that fund exploration, validate our systems, and generate market data.
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    <span className="font-bold text-[#FFD700]">Portfolio IP</span>{' '}
                    <Link href="/ventures" className="text-[#FFD700] hover:underline">
                      (see ventures)
                    </Link>
                    : Conviction-backed products we originate and own. Built to appreciate, not trade time.
                  </p>
                </div>
              </div>
              <p className="text-xs text-center text-gray-300 pt-4 border-t border-[#FFD700]/20">
                <span className="font-bold text-gray-100">Result:</span> Every Kit engagement compounds our execution capability. Every Portfolio venture proves our conviction. Systematic IP accumulation.
              </p>
            </OS8Window>
          </div>
        </section>

        {/* Payment Flexibility */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {paymentFlexibility.title}
              </h2>
              <p className="text-lg text-[#FFD700] font-medium mb-3">
                {paymentFlexibility.subtitle}
              </p>
              <p className="text-base text-gray-300">
                {paymentFlexibility.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {paymentFlexibility.models.map((model, index) => (
                <OS8Window
                  key={index}
                  title={model.type}
                  variant="body"
                  animateIn={false}
                >
                  <div className="text-center space-y-3">
                    <div className="text-4xl font-bold text-[#FFD700] mb-4">
                      {model.icon}
                    </div>
                    <p className="text-sm font-medium text-[#FFD700]">{model.label}</p>
                    <p className="text-sm text-gray-100 leading-relaxed">
                      {model.description}
                    </p>
                    <p className="text-xs text-gray-400 italic">
                      {model.availability}
                    </p>
                    {model.ventureLink && (
                      <Link href={model.ventureLink} className="text-xs text-[#FFD700] hover:underline inline-flex items-center gap-1">
                        See example →
                      </Link>
                    )}
                  </div>
                </OS8Window>
              ))}
            </div>

            <OS8Window title="Payment Flexibility Note" variant="subtle" animateIn={false}>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-100">
                  {paymentFlexibility.note}
                </p>
                {paymentFlexibility.venturesNote && (
                  <p className="text-sm text-gray-100">
                    <Link href="/ventures" className="text-[#FFD700] hover:underline font-medium">
                      {paymentFlexibility.venturesNote}
                    </Link>
                  </p>
                )}
              </div>
            </OS8Window>
          </div>
        </section>

        {/* All Service Kits */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
              Our Kits
            </h2>

            {/* Quiz CTA */}
            <div className="max-w-2xl mx-auto mb-12 text-center">
              <p className="text-gray-300 mb-4">
                Not sure which kit is right for you? Take our 2-minute quiz to find your perfect match.
              </p>
              <button
                onClick={() => setShowQuiz(true)}
                className="px-6 py-3 border border-[#FFD700] hover:border-[#FFE34D] text-[#FFD700] hover:text-[#FFE34D] font-semibold transition-colors"
              >
                Take the quiz →
              </button>
            </div>

            {/* Featured Kit */}
            <div className="mb-8 max-w-4xl mx-auto">
              <div className="rounded-lg border border-[#FFD700]/30 bg-[#FFD700]/5 backdrop-blur-sm overflow-hidden">
                <KitCard kit={featuredKit} featured />
              </div>
            </div>

            {/* Other Kits */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherKits.map((kit) => (
                <div
                  key={kit.slug}
                  className="rounded-lg border border-gray-700 hover:border-[#FFD700] bg-gray-900/50 backdrop-blur-sm overflow-hidden transition-colors"
                >
                  <KitCard kit={kit} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Choose */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Which kit is right for you?
              </h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
                These kits are starting points, not fixed packages. We tailor scope, timeline, and approach based on your specific situation. Not sure which fits? Let's talk—we'll figure it out together.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceKits.map((kit) => (
                <OS8Window
                  key={kit.slug}
                  title={kit.name}
                  variant="interactive"
                  animateIn={false}
                >
                  <div className="space-y-4">
                    <p className="text-sm text-[#FFD700] font-medium">{kit.tagline}</p>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-2">
                        Perfect for:
                      </h4>
                      <ul className="space-y-2">
                        {kit.perfectFor.map((item, idx) => (
                          <li key={idx} className="flex gap-2 text-sm text-gray-100">
                            <span className="text-[#FFD700]">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link
                      href={`/services/${kit.slug}`}
                      className="text-sm text-[#FFD700] hover:underline inline-flex items-center gap-1"
                    >
                      View details →
                    </Link>
                  </div>
                </OS8Window>
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Areas */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.darkGalaxy}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Expertise
              </h2>
              <p className="text-base sm:text-lg text-gray-300">
                We specialize in taking ambitious ideas from uncertainty to execution.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {expertiseAreas.map((area, index) => (
                <OS8Window
                  key={index}
                  title={area.title}
                  variant="body"
                  animateIn={false}
                >
                  <p className="text-sm text-gray-100 leading-relaxed">{area.description}</p>
                </OS8Window>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.06}
              animated={true}
              colorTheme={watercolorThemes.terminalSubtle}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                {servicesContent.comparison.title}
              </h2>
              <p className="text-lg text-[#FFD700] font-medium">
                {servicesContent.comparison.subtitle}
              </p>
            </div>

            {/* Desktop Table */}
            <OS8Window
              title="Comparison Table"
              variant="body"
              animateIn={false}
              className="hidden md:block"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-4 px-4 text-sm font-semibold text-gray-400">Aspect</th>
                      <th className="py-4 px-4 text-sm font-semibold text-[#FFD700]">Rationale</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-400">Agencies</th>
                      <th className="py-4 px-4 text-sm font-semibold text-gray-400">Consultants</th>
                    </tr>
                  </thead>
                  <tbody>
                    {servicesContent.comparison.categories.map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-[#FFD700]/5 transition-colors">
                        <td className="py-4 px-4 text-sm font-medium text-gray-100">{row.aspect}</td>
                        <td className="py-4 px-4 text-sm text-[#FFD700] font-medium">{row.rationale}</td>
                        <td className="py-4 px-4 text-sm text-gray-400">{row.agencies}</td>
                        <td className="py-4 px-4 text-sm text-gray-400">{row.consultants}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </OS8Window>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {servicesContent.comparison.categories.map((row, index) => (
                <OS8Window key={index} title={row.aspect} variant="body" animateIn={false}>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-[#FFD700] mb-1">Rationale</p>
                      <p className="text-sm text-[#FFD700] font-medium">{row.rationale}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">Agencies</p>
                      <p className="text-sm text-gray-300">{row.agencies}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 mb-1">Consultants</p>
                      <p className="text-sm text-gray-300">{row.consultants}</p>
                    </div>
                  </div>
                </OS8Window>
              ))}
            </div>

            <div className="mt-8 max-w-3xl mx-auto">
              <OS8Window title="Our Philosophy" variant="subtle" animateIn={false}>
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-100">
                    We're not here to trade time for money. Kits fund our runway and prove our systems. Portfolio IP appreciates over time. <span className="font-bold text-[#FFD700]">Conviction first, IP always.</span> When we believe in what you're building, we partner with equity.
                  </p>
                  <p className="text-sm text-gray-100">
                    <Link href="/ventures" className="text-[#FFD700] hover:underline font-medium">
                      See our Portfolio IP for proof of conviction →
                    </Link>
                  </p>
                </div>
              </OS8Window>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <ASCIIUnifiedGrid
              opacity={0.12}
              animated={true}
              colorTheme={watercolorThemes.terminalGold}
              charSet="default"
            />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto flex justify-center">
            <OS8Window
              title="Ready to build conviction?"
              variant="cta"
              animateIn={false}
              className="max-w-lg"
            >
              <div className="space-y-6">
                <p className="text-base text-[#FFD700] leading-relaxed text-center">
                  Let's talk about your opportunity. We'll help you figure out which kit makes sense—or if you need something custom.
                </p>

                <div className="flex flex-col gap-3 pt-4">
                  <Link
                    href="/contact"
                    className="w-full bg-[#FFD700] hover:bg-[#FFE34D] text-black text-center px-6 py-3 font-semibold transition-colors"
                  >
                    Start a conversation
                  </Link>
                </div>
              </div>
            </OS8Window>
          </div>
        </section>
      </main>

      {/* Sticky CTA Bar */}
      <StickyCTABar
        message="Ready to build conviction?"
        ctaText="Start a conversation"
        ctaHref="/contact"
        scrollThreshold={0.3}
        storageKey="services-sticky-cta"
      />

      {/* Kit Quiz Modal */}
      {showQuiz && <KitQuiz onClose={() => setShowQuiz(false)} />}
    </>
  );
}

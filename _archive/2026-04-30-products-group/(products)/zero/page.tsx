/**
 * Zero Consumer Marketing Page
 *
 * Immersive, consumer-friendly landing page with spacey gradient + firefly particles.
 * Focused on JTBD: "Turn email into actions, not homework"
 *
 * Route: /zero
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Zap, Package, Calendar, Archive, Check, X, ArrowRight } from 'lucide-react';
import { zeroMarketingContent } from '@/lib/content/products/zero-marketing';
import InteractiveDemo from '@/components/zero/InteractiveDemo';
import GalaxyBackground from '@/components/zero/GalaxyBackground';

export const metadata: Metadata = {
  title: zeroMarketingContent.seo.title,
  description: zeroMarketingContent.seo.description,
  keywords: zeroMarketingContent.seo.keywords,
  openGraph: {
    title: zeroMarketingContent.seo.title,
    description: zeroMarketingContent.seo.description,
    type: 'website',
  }
};

const useCaseIcons = [
  <Zap key="zap" className="w-6 h-6" />,
  <Package key="package" className="w-6 h-6" />,
  <Calendar key="calendar" className="w-6 h-6" />,
  <Archive key="archive" className="w-6 h-6" />
];

export default function ZeroProductPage() {
  const content = zeroMarketingContent;

  return (
    <main className="min-h-screen text-white overflow-hidden">
      {/* Global Galaxy Background */}
      <div className="fixed inset-0">
        <GalaxyBackground />
      </div>

      {/* HERO */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Glowing Product Name */}
          <div className="mb-6">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter bg-gradient-to-b from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 80px rgba(99, 102, 241, 0.5), 0 0 120px rgba(139, 92, 246, 0.3)'
              }}
            >
              ZERO
            </h1>
            <p className="text-xs sm:text-sm font-medium tracking-[0.3em] text-indigo-300/70 uppercase mt-1">
              {content.hero.preHeadline}
            </p>
          </div>

          {/* Main Headline */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            {content.hero.headline}
          </h2>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-indigo-100/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            {content.hero.subheadline}
          </p>

          {/* CTA */}
          <Link
            href={content.hero.ctaPrimary.href}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-full shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
          >
            <Mail className="w-5 h-5" />
            {content.hero.ctaPrimary.text}
          </Link>
        </div>
      </section>

      {/* THE PROBLEM - Compact */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="p-6 sm:p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
              {content.problem.headline}
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {content.problem.scenarios.map((scenario, index) => (
                <div key={index} className="flex gap-3">
                  <span className="text-2xl font-black text-indigo-500/50">{index + 1}</span>
                  <p className="text-sm text-indigo-100/70 leading-relaxed">
                    {scenario.scenario}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-lg sm:text-xl font-semibold text-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent pt-4 border-t border-white/10">
              {content.problem.transition}
            </p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION - Compact 4-column */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            {content.solution.headline}
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {content.solution.useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:border-indigo-500/40 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300">
                    {useCaseIcons[index]}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {useCase.trigger}
                  </h3>
                </div>
                <p className="text-xs text-emerald-300/90 font-medium">
                  → {useCase.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO */}
      <section id="demo" className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Try It Yourself
            </h2>
            <p className="text-sm text-indigo-200/60">
              Drag cards or use keyboard arrows
            </p>
          </div>

          <div className="rounded-2xl border border-indigo-500/20 shadow-2xl shadow-indigo-500/10 overflow-hidden bg-black/40 backdrop-blur-sm">
            <InteractiveDemo />
          </div>
        </div>
      </section>

      {/* CTA + WHO IT'S FOR - Combined */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-6">
            {/* CTA Card - Takes 3 columns */}
            <div className="lg:col-span-3 p-6 sm:p-8 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-indigo-500/30 rounded-2xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40 flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {content.cta.headline}
                  </h2>
                  <p className="text-sm text-indigo-100/70">
                    {content.cta.subheadline}
                  </p>
                </div>
              </div>

              <Link
                href={content.hero.ctaPrimary.href}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold rounded-full shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-105"
              >
                {content.cta.buttonText}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <p className="mt-4 text-xs text-indigo-200/40">
                {content.cta.trustSignal}
              </p>
            </div>

            {/* Who it's for - Takes 2 columns */}
            <div className="lg:col-span-2 p-5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Check className="w-4 h-4" />
                Perfect if you:
              </h3>
              <ul className="space-y-2 mb-4">
                {content.whoItsFor.personas.slice(0, 3).map((persona, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-indigo-100/70 leading-relaxed">{persona}</p>
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
                        <div className="w-1 h-1 rounded-full bg-gray-600 mt-1.5 flex-shrink-0" />
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
      <footer className="relative py-8 px-4 text-center border-t border-white/5">
        <div className="relative z-10">
          <p className="text-xs text-indigo-200/30">
            Zero • Built by{' '}
            <Link href="/" className="text-indigo-300/50 hover:text-indigo-200 transition-colors">
              Rationale
            </Link>
          </p>
        </div>
      </footer>
    </main>
  );
}

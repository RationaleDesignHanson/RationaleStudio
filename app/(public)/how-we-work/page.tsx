/**
 * How We Work Page
 *
 * Process-focused: What happens when we work together
 * - Discovery → Prototype → Ship
 * - Three engagement models (Cash / Equity / Hybrid)
 * - Minimal CTA
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { DollarSign, Star, Layers, ArrowRight } from 'lucide-react';

function ProcessStepper({
  steps,
}: {
  steps: Array<{ title: string; description: string }>;
}) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Desktop connector line */}
      <div className="hidden md:block absolute left-0 right-0 top-[18px] h-px bg-gray-700/70" />

      <ol className="grid gap-6 md:gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <li key={step.title} className="relative">
            <div className="flex gap-4 md:block">
              {/* Step marker */}
              <div className="flex-shrink-0">
                <div className="relative z-10 w-9 h-9 rounded-full bg-gray-900 border border-terminal-gold/40 flex items-center justify-center">
                  <span className="font-mono text-xs text-terminal-gold tracking-wider">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                {/* Mobile connector */}
                {i !== steps.length - 1 && (
                  <div className="md:hidden w-px h-10 bg-gray-700/70 mx-auto" />
                )}
              </div>

              {/* Content */}
              <div className="pt-0.5 md:pt-6">
                <div className="font-mono text-xs text-terminal-gold tracking-wider mb-2">
                  {step.title}
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* 1. HERO */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-xs font-mono text-terminal-gold tracking-widest mb-3">
            BUILD WITH US
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Discovery → Prototype → Ship
          </h1>

          <p className="text-base md:text-lg text-gray-300 max-w-3xl">
            We build working software to reduce uncertainty—then ship what's validated.
          </p>
        </div>
      </section>

      {/* 2. PROCESS */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <ProcessStepper
            steps={[
              {
                title: 'DISCOVERY',
                description: 'Align on problem, users, and constraints. Define what success looks like. Identify the riskiest assumptions.'
              },
              {
                title: 'PROTOTYPE',
                description: 'Build working software to test assumptions. Real interactions, real feedback, real decisions.'
              },
              {
                title: 'SHIP',
                description: 'Production-ready delivery. We stay involved through launch and early adoption.'
              },
            ]}
          />
        </div>
      </section>

      {/* 3. ENGAGEMENT MODELS */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
            <p className="text-xs md:text-sm text-gray-300">
              <span className="font-semibold text-white">Three ways to structure an engagement.</span>{' '}
              Cash, equity, or hybrid—depending on fit.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Cash */}
            <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-4 h-4 text-terminal-gold" />
                <h3 className="text-sm font-bold text-white">Cash</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Fixed-scope sprints. You pay, we deliver, no equity complexity. IP transfers at completion.
              </p>
            </div>

            {/* Equity */}
            <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-terminal-gold" />
                <h3 className="text-sm font-bold text-white">Equity</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                We become your product partner. Highly selective—only when our expertise creates strategic advantage.
              </p>
            </div>

            {/* Hybrid */}
            <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Layers className="w-4 h-4 text-terminal-gold" />
                <h3 className="text-sm font-bold text-white">Hybrid</h3>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Reduced cash + equity. You conserve runway, we share upside. Most common for longer builds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT YOU GET */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* With Equity */}
            <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">With Equity</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>We're invested in your success—literally</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>Lower upfront cost preserves your runway</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>Long-term support, not just delivery and goodbye</span>
                </li>
              </ul>
            </div>

            {/* Always True */}
            <div className="p-4 md:p-5 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">Always True</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>You own your company and make the calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>Clear deliverables with defined timelines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-terminal-gold mt-0.5">→</span>
                  <span>Same quality and commitment, any structure</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA (minimal) */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-terminal-gold flex-shrink-0 mt-1.5" />
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              Interested in working together?{' '}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 text-terminal-gold hover:text-terminal-gold-hover font-semibold transition-colors"
              >
                Schedule a call <ArrowRight className="w-3 h-3" />
              </Link>
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

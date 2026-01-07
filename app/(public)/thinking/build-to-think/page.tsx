/**
 * Essay: Build-to-Think Methodology
 *
 * Blog-style article matching home/collab styling
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function BuildToThinkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">

      {/* Hero */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Thinking
          </Link>

          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-mono text-terminal-gold tracking-widest">METHODOLOGY</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">10 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Build-to-Think Methodology
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Rapid prototypes answer binary questions. Each prototype tests one assumption. 7 prototypes = 7 validated decisions before production. Zero guesswork.
          </p>
        </div>
      </section>

      {/* Article Content */}
      <article className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.04}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">

            <h2 className="text-xl md:text-2xl font-bold text-white mt-0 mb-4">Prototypes as Decision Tools</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Traditional approach: Write 20-page spec, debate for weeks, build, discover issues in production.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Rationale approach: Build Prototype 1 in 2 days, put in user hands, get answer.
            </p>

            <div className="border-l-2 border-terminal-gold pl-4 my-6">
              <p className="text-sm text-terminal-gold font-mono mb-1">EXAMPLE: ZERO PROTOTYPE 3</p>
              <p className="text-gray-300 leading-relaxed mb-2">
                Tested swipe direction. 73% of users expected opposite of our hypothesis.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We pivoted immediately—before writing any production code. Cost: 2 days. Savings: 2 weeks of rework.
              </p>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">A Systematic Prototype Approach</h2>

            <div className="bg-gray-900/50 border border-terminal-gold/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-300 leading-relaxed">
                <span className="font-semibold text-white">This is a guideline, not a prescription.</span> Some projects need 3 prototypes. Some need 12. What matters is the systematic approach: identify assumptions, build minimal tests, validate or pivot before committing to production.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              The framework below shows a typical progression. Think of it as a checklist of decision points, not a rigid sequence.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
                <span className="text-terminal-gold font-mono text-sm font-bold">1-2</span>
                <div>
                  <p className="text-white font-semibold text-sm">Core Interaction Model</p>
                  <p className="text-xs text-gray-400">Test fundamental user interactions and navigation patterns</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
                <span className="text-terminal-gold font-mono text-sm font-bold">3-4</span>
                <div>
                  <p className="text-white font-semibold text-sm">Information Architecture</p>
                  <p className="text-xs text-gray-400">Validate content structure and data hierarchy</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
                <span className="text-terminal-gold font-mono text-sm font-bold">5-6</span>
                <div>
                  <p className="text-white font-semibold text-sm">Edge Cases & Error States</p>
                  <p className="text-xs text-gray-400">Test failure modes and boundary conditions</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-gray-900/50 border border-gray-700 rounded-lg">
                <span className="text-terminal-gold font-mono text-sm font-bold">7</span>
                <div>
                  <p className="text-white font-semibold text-sm">Polish & Microinteractions</p>
                  <p className="text-xs text-gray-400">Refine timing, transitions, and feedback loops</p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              Each prototype has success criteria. Pass → Next prototype. Fail → Pivot or kill.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Zero used this approach to go from concept to production-ready architecture in 2 weeks.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Why This Saves Time</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Counterintuitive: "7 prototypes sounds slow."
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Reality: Prototype 1 takes 2 days. Finding the same issue in production takes 2 weeks to fix.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 my-6">
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-[10px] font-mono text-terminal-gold mb-1">PROTOTYPES</p>
                <p className="text-lg font-bold text-white">Low-fidelity</p>
                <p className="text-xs text-gray-400">High-speed iteration</p>
              </div>
              <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
                <p className="text-[10px] font-mono text-gray-500 mb-1">PRODUCTION</p>
                <p className="text-lg font-bold text-white">High-fidelity</p>
                <p className="text-xs text-gray-400">Low-speed rework</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-4">
              We de-risk the high-speed phase so production is single-pass, not iterative guessing.
            </p>

            <div className="border-l-2 border-terminal-gold pl-4 my-6">
              <p className="text-sm text-terminal-gold font-mono mb-1">ZERO'S RESULT</p>
              <p className="text-gray-300 leading-relaxed">
                0 architectural pivots during production because we validated with 7 prototypes first.
              </p>
            </div>

          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/thinking/build-first-trap"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Previous: Build-First Trap
            </Link>
            <Link
              href="/thinking/spec-vs-prototype"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              Next: Spec vs Prototype
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

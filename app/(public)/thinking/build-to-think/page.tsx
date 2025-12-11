/**
 * Essay: Build-to-Think Methodology
 *
 * The systematic framework for de-risking development
 * Extracted from /overview presentation
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

export default function BuildToThinkPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      {/* Back Link */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Thinking
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="relative py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
                Methodology
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">10 min read</span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-bold mb-6">
              Build-to-Think Methodology
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Rationale's build-to-think methodology: Rapid prototypes answer binary questions. Each prototype tests one assumption. 7 prototypes = 7 validated decisions before production. Zero guesswork.
            </p>
          </header>

          {/* Content Sections */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Prototypes as Decision Tools</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Traditional approach: Write 20-page spec, debate for weeks, build, discover issues in production.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Rationale approach: Build Prototype 1 in 2 days, put in user hands, get answer.
              </p>
              <div className="border-l-4 border-[#00D9FF] pl-6 py-2 my-6">
                <p className="text-white font-medium mb-2">Example: Zero Prototype 3</p>
                <p className="text-gray-300 leading-relaxed mb-3">
                  Tested swipe direction. 73% of users expected opposite of our hypothesis.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We pivoted immediately—before writing any production code. Cost: 2 days. Savings: 2 weeks of rework.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The 7-Prototype Framework</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                This isn't random prototyping. It's systematic validation of every major decision point before production.
              </p>

              <div className="space-y-4">
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF] font-mono text-sm font-bold">1-2</span>
                    <div>
                      <h3 className="text-white font-bold mb-1">Core Interaction Model</h3>
                      <p className="text-sm text-gray-400">Test fundamental user interactions and navigation patterns</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF] font-mono text-sm font-bold">3-4</span>
                    <div>
                      <h3 className="text-white font-bold mb-1">Information Architecture</h3>
                      <p className="text-sm text-gray-400">Validate content structure and data hierarchy</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF] font-mono text-sm font-bold">5-6</span>
                    <div>
                      <h3 className="text-white font-bold mb-1">Edge Cases & Error States</h3>
                      <p className="text-sm text-gray-400">Test failure modes and boundary conditions</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF] font-mono text-sm font-bold">7</span>
                    <div>
                      <h3 className="text-white font-bold mb-1">Polish & Microinteractions</h3>
                      <p className="text-sm text-gray-400">Refine timing, transitions, and feedback loops</p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mt-6">
                Each prototype has success criteria. Pass → Next prototype. Fail → Pivot or kill.
              </p>
              <p className="text-gray-300 leading-relaxed mt-4">
                Zero used this exact framework to go from concept to production-ready architecture in 2 weeks.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why This Saves Time</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Counterintuitive: "7 prototypes sounds slow."
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Reality: Prototype 1 takes 2 days. Finding the same issue in production takes 2 weeks to fix.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 my-6">
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="text-xs font-mono text-gray-400 mb-2">PROTOTYPES</div>
                  <div className="text-2xl font-bold text-[#00D9FF] mb-1">Low-fidelity</div>
                  <div className="text-sm text-gray-300">High-speed iteration</div>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <div className="text-xs font-mono text-gray-400 mb-2">PRODUCTION</div>
                  <div className="text-2xl font-bold text-[#FF4444] mb-1">High-fidelity</div>
                  <div className="text-sm text-gray-300">Low-speed rework</div>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                We de-risk the high-speed phase so production is single-pass, not iterative guessing.
              </p>
              <div className="border-l-4 border-[#00FF94] pl-6 py-2 my-6">
                <p className="text-white font-medium mb-2">Zero's Result</p>
                <p className="text-gray-300 leading-relaxed">
                  0 architectural pivots during production because we validated with 7 prototypes first.
                </p>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Adaptive, Not Rigid</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The 7-prototype framework is a guideline, not a straitjacket. Some projects need 5 prototypes. Some need 10.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                What matters is the systematic approach: identify assumptions, build minimal tests, validate or pivot.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The framework adapts to your domain, but the principle doesn't change: validate before you commit capital to production.
              </p>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking/build-first-trap"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous: Build-First Trap
              </Link>
              <Link
                href="/thinking/spec-vs-prototype"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Next: Spec vs Prototype
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

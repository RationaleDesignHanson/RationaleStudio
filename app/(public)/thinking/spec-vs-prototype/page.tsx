/**
 * Essay: Spec vs Prototype
 *
 * Why experiencing beats describing
 * Extracted from /overview presentation
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

export default function SpecVsPrototypePage() {
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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8">
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
      <article className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
                Methodology
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">6 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Spec vs Prototype
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Specs describe interactions. Prototypes reveal behavior. The fundamental difference between documentation and validation.
            </p>
          </header>

          {/* Content Sections */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Problem with Specs</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                A spec is a map. A prototype is the territory.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Specs describe what should happen. "When the user swipes left, the email archives." Clear, unambiguous, documented.
              </p>
              <p className="text-gray-300 leading-relaxed">
                But specs can't tell you what users expect. They can't reveal mental models. They can't predict behavior.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">What Prototypes Reveal</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Prototypes force behavior into the real world. Users can't lie to a prototype. Their hands reveal truth their words can't express.
              </p>

              <div className="border-l-4 border-[#00D9FF] pl-6 py-2 my-6">
                <p className="text-white font-medium mb-2">The Zero Swipe Test</p>
                <p className="text-gray-300 leading-relaxed mb-3">
                  <span className="font-bold">Spec said:</span> "Swipe left to archive"
                </p>
                <p className="text-gray-300 leading-relaxed mb-3">
                  <span className="font-bold">Prototype revealed:</span> 73% of users tried swiping right
                </p>
                <p className="text-gray-300 leading-relaxed">
                  <span className="font-bold">Result:</span> We pivoted in 2 days instead of discovering this in Week 16 of production
                </p>
              </div>

              <p className="text-gray-300 leading-relaxed">
                No amount of spec review would have caught this. We would have debated swipe direction in abstract terms, picked one, and built it. Then we'd discover the problem when users couldn't figure out the interaction.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Comparison</h2>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Specs</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ Describe interactions</li>
                    <li>→ Document intent</li>
                    <li>→ Define requirements</li>
                    <li>→ Can't predict behavior</li>
                    <li>→ Require interpretation</li>
                    <li>→ Static and abstract</li>
                  </ul>
                </div>

                <div className="bg-gray-900/50 border border-[#00D9FF] p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-4">Prototypes</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ Reveal behavior</li>
                    <li>→ Test assumptions</li>
                    <li>→ Validate decisions</li>
                    <li>→ Show what works</li>
                    <li>→ Force clarity</li>
                    <li>→ Dynamic and concrete</li>
                  </ul>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">When Specs Are Useful</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                This isn't about eliminating specs. Specs serve a purpose: They document decisions after validation. They communicate requirements to engineering. They create shared understanding across teams.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                The problem is using specs for validation instead of documentation.
              </p>
              <div className="bg-gray-900/50 border border-[#00FF94] p-6 rounded-lg my-6">
                <p className="text-white font-bold mb-3">The Right Sequence</p>
                <ol className="space-y-3 text-sm text-gray-300">
                  <li><span className="text-[#00FF94] font-mono">1.</span> Build prototype to test assumption</li>
                  <li><span className="text-[#00FF94] font-mono">2.</span> Get user feedback and validate</li>
                  <li><span className="text-[#00FF94] font-mono">3.</span> Iterate or pivot based on behavior</li>
                  <li><span className="text-[#00FF94] font-mono">4.</span> Write spec documenting validated decision</li>
                  <li><span className="text-[#00FF94] font-mono">5.</span> Build production with confidence</li>
                </ol>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Prototypes validate. Specs document. Use each for its strength.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Cost of Getting This Wrong</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you validate with specs instead of prototypes, you push risk into production.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                12 weeks into development, you discover the core interaction doesn't work. The spec was clear, but the behavior was wrong.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Now you're choosing between two bad options: ship subpar UX or throw away weeks of work.
              </p>
              <div className="border-l-4 border-terminal-gold pl-6 py-2 my-6">
                <p className="text-white font-medium mb-2">The Alternative</p>
                <p className="text-gray-300 leading-relaxed">
                  Prototype in 2 days. Test with users. Find the issue before writing production code. Pivot costs 2 days instead of 2 weeks.
                </p>
              </div>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking/build-to-think"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous: Build-to-Think
              </Link>
              <Link
                href="/thinking/methodology-origins"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Next: Methodology Origins
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

/**
 * Essay: The Build-First Trap
 *
 * Why most teams waste 6 months building the wrong thing
 * Extracted from /overview presentation
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

export default function BuildFirstTrapPage() {
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
                Problem
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">8 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              The Build-First Trap
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Most teams commit to production architecture before validating core assumptions. By the time users see it, you're 3-6 months in. Pivoting means throwing away weeks of work. Killing means political fallout.
            </p>
          </header>

          {/* Content Sections */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Pattern</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Traditional approach: 4 weeks of specs + 16 weeks of build + 4 weeks of testing = 24 weeks at risk before first user feedback.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When you finally discover the UX doesn't work, you're too deep to pivot.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why Specs Fail</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Users don't know what they want until they feel it. A 20-page spec describes an interaction. A prototype lets users experience it. Experience reveals problems specs can't predict.
              </p>
              <div className="border-l-4 border-[#FFD700] pl-6 py-2 my-6">
                <p className="text-white font-medium mb-2">Example: Zero Inbox</p>
                <p className="text-gray-300 leading-relaxed">
                  Zero's spec said "swipe left to archive." Prototype testing revealed 73% of users expected swipe right. We pivoted in Day 3, not Month 4.
                </p>
              </div>
              <p className="text-gray-300 leading-relaxed">
                A spec would have never caught this. We would have built the entire interaction pattern wrong, discovered it 12 weeks into production, and faced a brutal choice: ship subpar UX or throw away weeks of work.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Sunk Cost Problem</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                12 weeks into development, you discover the core UX doesn't work. Pivoting means throwing away weeks of engineering work. Politically, it's a failure. Financially, it's a write-off.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Teams double down on bad UX to avoid admitting the sunk cost.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg my-6">
                <h3 className="text-lg font-bold text-white mb-3">The Timeline of Regret</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#FFD700] font-mono">Week 4:</span>
                    <span className="text-gray-300">Capital invested, UX issue found</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FFD700] font-mono">Week 8:</span>
                    <span className="text-gray-300">More sunk, core interaction failing tests</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FFD700] font-mono">Week 12:</span>
                    <span className="text-gray-300">Months wasted, user feedback confirms it's wrong</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#FFD700] font-mono">Week 16:</span>
                    <span className="text-gray-300">Too deep to pivot—launch with known problems or kill</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Result: Ship subpar product to "not waste the investment." Users suffer. Product fails. Team gets blamed.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Alternative</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                What if you could test those core assumptions in 2 days instead of discovering them in Week 12?
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                What if pivoting cost 2 days of prototype work instead of 2 weeks of production rework?
              </p>
              <p className="text-gray-300 leading-relaxed">
                That's the build-to-think methodology. Validate before you commit. De-risk before you invest.
              </p>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All essays
              </Link>
              <Link
                href="/thinking/build-to-think"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Next: Build-to-Think Methodology
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

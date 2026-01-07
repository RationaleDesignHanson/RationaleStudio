/**
 * Essay: The Build-First Trap
 *
 * Blog-style article matching home/collab styling
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function BuildFirstTrapPage() {
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
            <span className="text-[10px] font-mono text-terminal-gold tracking-widest">PROBLEM</span>
            <span className="text-gray-600">·</span>
            <span className="text-xs text-gray-500">8 min read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            The Build-First Trap
          </h1>

          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            Most teams commit to production architecture before validating core assumptions. By the time users see it, you're 3-6 months in. Pivoting means throwing away weeks of work. Killing means political fallout.
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

            <h2 className="text-xl md:text-2xl font-bold text-white mt-0 mb-4">The Pattern</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Traditional approach: 4 weeks of specs + 16 weeks of build + 4 weeks of testing = 24 weeks at risk before first user feedback.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              When you finally discover the UX doesn't work, you're too deep to pivot.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">Why Specs Fail</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              Users don't know what they want until they feel it. A 20-page spec describes an interaction. A prototype lets users experience it. Experience reveals problems specs can't predict.
            </p>

            <div className="border-l-2 border-terminal-gold pl-4 my-6">
              <p className="text-sm text-terminal-gold font-mono mb-1">EXAMPLE: ZERO INBOX</p>
              <p className="text-gray-300 leading-relaxed">
                Zero's spec said "swipe left to archive." Prototype testing revealed 73% of users expected swipe right. We pivoted in Day 3, not Month 4.
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              A spec would have never caught this. We would have built the entire interaction pattern wrong, discovered it 12 weeks into production, and faced a brutal choice: ship subpar UX or throw away weeks of work.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">The Sunk Cost Problem</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              12 weeks into development, you discover the core UX doesn't work. Pivoting means throwing away weeks of engineering work. Politically, it's a failure. Financially, it's a write-off.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              Teams double down on bad UX to avoid admitting the sunk cost.
            </p>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 my-6">
              <p className="text-xs font-mono text-terminal-gold mb-3">THE TIMELINE OF REGRET</p>
              <div className="space-y-2 text-sm">
                <div className="flex gap-3">
                  <span className="text-terminal-gold font-mono w-16">Week 4</span>
                  <span className="text-gray-400">Capital invested, UX issue found</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-terminal-gold font-mono w-16">Week 8</span>
                  <span className="text-gray-400">More sunk, core interaction failing tests</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-terminal-gold font-mono w-16">Week 12</span>
                  <span className="text-gray-400">Months wasted, user feedback confirms it's wrong</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-terminal-gold font-mono w-16">Week 16</span>
                  <span className="text-gray-400">Too deep to pivot—launch with known problems or kill</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-8">
              Result: Ship subpar product to "not waste the investment." Users suffer. Product fails. Team gets blamed.
            </p>

            <h2 className="text-xl md:text-2xl font-bold text-white mb-4">The Alternative</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              What if you could test those core assumptions in 2 days instead of discovering them in Week 12?
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              What if pivoting cost 2 days of prototype work instead of 2 weeks of production rework?
            </p>
            <p className="text-gray-300 leading-relaxed">
              That's the build-to-think methodology. Validate before you commit. De-risk before you invest.
            </p>

          </div>
        </div>
      </article>

      {/* Navigation */}
      <section className="relative py-6 md:py-10 px-4 sm:px-6 md:px-8">
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href="/thinking"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              All essays
            </Link>
            <Link
              href="/thinking/build-to-think"
              className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-terminal-gold transition-colors"
            >
              Next: Build-to-Think
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

/**
 * Essay: Two Engines, Proven in Production
 *
 * How Rationale operates two integrated engines that reinforce each other
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function DualEngineModelPage() {
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
      <div className="relative z-10 px-4 sm:px-6 md:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/thinking"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Thinking
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="relative py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-terminal-gold uppercase tracking-wide">
                MODEL
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              Two Engines, Proven in Production
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              How Rationale operates two integrated engines that reinforce each other—and why this model produces better outcomes for clients.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-12">
            {/* The Model */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">The Model</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Rationale runs two integrated engines: <strong className="text-white">Portfolio IP</strong> (products we own like Zero) proves methodologies work with our own capital. <strong className="text-white">Client Partnerships</strong> (fee + equity engagements) apply those same patterns to your highest-stakes product decisions.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Internal products test approaches before we recommend them. Client work funds continued R&D. You get methods hardened in production, not theory.
              </p>
            </section>

            {/* Two Engines */}
            <section>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border-l-2 border-[#6366F1] p-5 rounded-lg">
                  <h3 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">
                    ENGINE 1: Portfolio IP
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">Zero, Compass, future products</p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    We build and ship our own products. This keeps us honest—we can't recommend approaches we haven't validated ourselves. Every methodology we use with clients has been tested on our own ventures first.
                  </p>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400">Proves methodology with our capital</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border-l-2 border-terminal-gold p-5 rounded-lg">
                  <h3 className="text-xs font-mono text-terminal-gold uppercase tracking-wide mb-3">
                    ENGINE 2: Client Partnerships
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">Discovery Sprint, Prototype Sprint, Build Ship Run</p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-4">
                    We partner with companies on their highest-stakes product decisions. Fee + equity alignment means we're invested in outcomes, not hours billed. We apply the same systematic approach that works on our own products.
                  </p>
                  <div className="pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400">Applies proven patterns to your roadmap</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why This Model Works */}
            <section>
              <h2 className="text-xl font-bold text-white mb-6">Why This Model Works</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Methods tested before recommended</p>
                    <p className="text-sm text-gray-300">We don't recommend approaches we haven't used ourselves. Every framework, every tool, every process has been validated on our own products first.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Continuous R&D funded by client work</p>
                    <p className="text-sm text-gray-300">Client partnerships fund continued development of our products and methodologies. This creates a virtuous cycle of improvement.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Aligned incentives through equity</p>
                    <p className="text-sm text-gray-300">We take equity in client partnerships because we believe in long-term outcomes. We're not optimizing for billable hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Skin in the game</p>
                    <p className="text-sm text-gray-300">When we recommend a direction, we've already bet our own capital on similar approaches. You get conviction backed by experience.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* The Result */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">The Result</h2>
              <p className="text-gray-300 leading-relaxed">
                You get methods hardened in production, not theory. When we say "this approach works," we mean we've used it ourselves, measured the results, and refined it based on real outcomes. That's the difference between consulting and building.
              </p>
            </section>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Essays
              </Link>
              <Link
                href="/thinking/vision-proof-burden"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-terminal-gold transition-colors"
              >
                Next: Vision, Proof, and the Work Between
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

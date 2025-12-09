/**
 * Essay: The Dual Engine Model
 *
 * Why we build our own products alongside client work
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

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
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/investors"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Investors
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-gray-400 uppercase tracking-wide">
                Business Model
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">9 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              The Dual Engine Model
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Internal products test methodologies in production. Client partnerships apply proven patterns. Revenue from clients funds internal R&D. Each engine feeds the other—creating systematic competitive advantage.
            </p>
          </header>

          {/* Content Sections */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why Most Studios Fail</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Most agencies and studios choose one model:
              </p>
              <div className="space-y-4 my-6">
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <h4 className="text-white font-bold mb-2">Pure Client Work</h4>
                  <p className="text-sm text-gray-300">
                    Predictable revenue but no R&D time. Methodologies stagnate. Competitive advantage erodes as everyone adopts the same tools.
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 p-4 rounded-lg">
                  <h4 className="text-white font-bold mb-2">Pure Product Studio</h4>
                  <p className="text-sm text-gray-300">
                    Full control but no revenue until exit. Long runway required. Expensive experiments with no feedback loop from paying customers.
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Both models leave value on the table. Client work provides revenue but no innovation. Product work provides innovation but no revenue.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Dual Engine Structure</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Rationale runs both engines in parallel. Not as separate teams. As one integrated system.
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-gray-900/50 border-l-4 border-[#00D9FF] p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-3">Engine 1: Internal Products</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ Zero Inbox (AI email management)</li>
                    <li>→ Rationale Site (marketing execution)</li>
                    <li>→ Future products in development</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs font-mono text-gray-400 mb-2">PURPOSE</p>
                    <p className="text-sm text-gray-300">Test methodologies in production before applying to client work</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border-l-4 border-[#00FF94] p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-3">Engine 2: Client Partnerships</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ B2B enterprise platforms</li>
                    <li>→ Consumer products</li>
                    <li>→ Complex multi-module systems</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs font-mono text-gray-400 mb-2">PURPOSE</p>
                    <p className="text-sm text-gray-300">Apply proven patterns at scale, fund internal R&D</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">How the Engines Feed Each Other</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                This isn't just portfolio diversification. It's a systematic advantage loop.
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-[#FFD700] pl-6 py-3">
                  <h4 className="text-white font-bold mb-2">Internal → Client</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When we build Zero, we test the 7-prototype framework in production. We discover what works at each stage. We validate timing, tooling, and team structure.
                  </p>
                  <p className="text-sm text-gray-300">
                    Then we apply those proven patterns to client work. Not theory—proven execution. Clients get methodologies already validated in production.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-6 py-3">
                  <h4 className="text-white font-bold mb-2">Client → Internal</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Client work reveals problems at scale. Enterprise B2B surfaces different challenges than consumer apps. Complex systems expose edge cases.
                  </p>
                  <p className="text-sm text-gray-300">
                    Those learnings improve our internal products. Client revenue funds R&D time to solve those problems systematically.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-6 py-3">
                  <h4 className="text-white font-bold mb-2">Compounding Advantage</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Each cycle makes both engines stronger. Internal products prove methodologies. Client work funds improvements. Better methodologies win better clients. Better clients surface harder problems.
                  </p>
                  <p className="text-sm text-gray-300">
                    This isn't linear growth. It's compound advantage that increases over time.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Zero as Proof of Concept</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Zero Inbox demonstrates the dual engine model in practice.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg my-6">
                <h4 className="text-white font-bold mb-4">What Zero Validated</h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF]">1.</span>
                    <p>7-prototype framework works at 30-day timelines</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF]">2.</span>
                    <p>Prototyping eliminates architectural pivots in production</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF]">3.</span>
                    <p>Build-to-think methodology scales to complex systems (10 microservices)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#00D9FF]">4.</span>
                    <p>Single developer can ship production app using proven patterns</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Now when we work with clients, we're not selling theory. We're applying a methodology proven on our own products. That credibility changes the conversation.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why This Matters for Clients</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                When you engage Rationale, you're not hiring a traditional agency. You're accessing methodologies we use on our own products.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#00FF94] text-xl">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Proven in production</p>
                    <p className="text-sm text-gray-300">We risk our own capital testing these approaches first</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00FF94] text-xl">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Continuously improving</p>
                    <p className="text-sm text-gray-300">Every internal product refines the methodology you'll benefit from</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00FF94] text-xl">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Skin in the game</p>
                    <p className="text-sm text-gray-300">We use the same tools and processes we recommend to you</p>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Long-Term Play</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Most studios optimize for quarterly revenue. Rationale optimizes for compound advantage over years.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Client revenue funds R&D. R&D produces better methodologies. Better methodologies attract better clients. Better clients fund more ambitious R&D.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Five years from now, Rationale will have battle-tested methodologies no pure agency or pure product studio can match. That's the dual engine advantage.
              </p>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-center">
              <Link
                href="/investors"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Investors Overview
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

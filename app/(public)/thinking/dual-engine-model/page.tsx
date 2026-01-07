/**
 * Essay: Two Engines, Proven in Production
 *
 * Why we build our own products alongside partnership work
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
              Two Engines, Proven in Production
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              Internal products test methodologies in production. Partnership work applies proven patterns. Revenue from partnerships funds internal R&D. Each engine feeds the other—creating systematic competitive advantage.
            </p>
          </header>

          {/* Content */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Why Most Studios Fail</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Most agencies and studios choose one model:
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                  <h4 className="text-white font-bold mb-2">Pure Client Work</h4>
                  <p className="text-sm text-gray-300">
                    Predictable revenue but no R&D time. Methodologies stagnate. Competitive advantage erodes as everyone adopts the same tools.
                  </p>
                </div>
                <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                  <h4 className="text-white font-bold mb-2">Pure Product Studio</h4>
                  <p className="text-sm text-gray-300">
                    Full control but no revenue until exit. Long runway required. Expensive experiments with no feedback loop from paying customers.
                  </p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Both models leave value on the table. Client work provides revenue but no innovation. Product work provides innovation but no revenue.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">The Dual Engine Structure</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                Rationale runs both engines in parallel. Not as separate teams. As one integrated system.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-900/50 border-l-2 border-[#6366F1] p-5 rounded-lg">
                  <h3 className="text-base font-bold text-white mb-3">Engine 1: Portfolio IP</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ Zero Inbox (AI email triage)</li>
                    <li>→ Heirloom (recipe storage & meal planning)</li>
                    <li>→ Future products in development</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs font-mono text-gray-400 mb-1">PURPOSE</p>
                    <p className="text-sm text-gray-300">Test methodologies in production before applying to partnership work</p>
                  </div>
                </div>

                <div className="bg-gray-900/50 border-l-2 border-terminal-gold p-5 rounded-lg">
                  <h3 className="text-base font-bold text-white mb-3">Engine 2: Partnerships</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>→ B2B enterprise platforms</li>
                    <li>→ Consumer products</li>
                    <li>→ Complex multi-module systems</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-xs font-mono text-gray-400 mb-1">PURPOSE</p>
                    <p className="text-sm text-gray-300">Apply proven patterns at scale, fund internal R&D</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">How the Engines Feed Each Other</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                This isn't just portfolio diversification. It's a systematic advantage loop.
              </p>

              <div className="space-y-4">
                <div className="border-l-2 border-terminal-gold pl-5 py-2">
                  <h4 className="text-white font-bold mb-2">Internal → Partnership</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    When we build Zero or Heirloom, we test our prototyping framework in production. We discover what works at each stage. We validate timing, tooling, and team structure.
                  </p>
                  <p className="text-sm text-gray-300">
                    Then we apply those proven patterns to partnership work. Not theory—proven execution. Partners get methodologies already validated in production.
                  </p>
                </div>

                <div className="border-l-2 border-terminal-gold pl-5 py-2">
                  <h4 className="text-white font-bold mb-2">Partnership → Internal</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Partnership work reveals problems at scale. Enterprise B2B surfaces different challenges than consumer apps. Complex systems expose edge cases.
                  </p>
                  <p className="text-sm text-gray-300">
                    Those learnings improve our internal products. Partnership revenue funds R&D time to solve those problems systematically.
                  </p>
                </div>

                <div className="border-l-2 border-terminal-gold pl-5 py-2">
                  <h4 className="text-white font-bold mb-2">Compounding Advantage</h4>
                  <p className="text-sm text-gray-300 mb-2">
                    Each cycle makes both engines stronger. Internal products prove methodologies. Partnership work funds improvements. Better methodologies win better partners. Better partners surface harder problems.
                  </p>
                  <p className="text-sm text-gray-300">
                    This isn't linear growth. It's compound advantage that increases over time.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Zero & Heirloom as Proof</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Our portfolio products demonstrate the dual engine model in practice.
              </p>
              <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg mb-6">
                <h4 className="text-white font-bold mb-4">What We've Validated</h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-gold">1.</span>
                    <p>Rapid prototyping framework works at compressed timelines</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-gold">2.</span>
                    <p>Prototyping eliminates architectural pivots in production</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-gold">3.</span>
                    <p>Build-to-think methodology scales to complex systems</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-gold">4.</span>
                    <p>Small teams can ship production apps using proven patterns</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                When we work with partners, we're not selling theory. We're applying methodologies proven on our own products. That credibility changes the conversation.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">Why This Matters for Partners</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                When you engage Rationale, you're not hiring a traditional agency. You're accessing methodologies we use on our own products.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Proven in production</p>
                    <p className="text-sm text-gray-300">We risk our own capital testing these approaches first</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Continuously improving</p>
                    <p className="text-sm text-gray-300">Every internal product refines the methodology you'll benefit from</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-terminal-gold text-lg">→</span>
                  <div>
                    <p className="text-white font-medium mb-1">Skin in the game</p>
                    <p className="text-sm text-gray-300">We use the same tools and processes we recommend to you</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-xl font-bold text-white mb-4">The Long-Term Play</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Most studios optimize for quarterly revenue. Rationale optimizes for compound advantage over years.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Partnership revenue funds R&D. R&D produces better methodologies. Better methodologies attract better partners. Better partners fund more ambitious R&D.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Five years from now, Rationale will have battle-tested methodologies no pure agency or pure product studio can match. That's the dual engine advantage.
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

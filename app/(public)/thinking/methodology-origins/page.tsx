/**
 * Essay: Methodology Origins
 *
 * Where Rationale's approach comes from
 * Extracted from /overview presentation
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft } from 'lucide-react';

export default function MethodologyOriginsPage() {
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
                Origin Story
              </span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-400">7 min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Methodology Origins
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              7 years at Meta Reality Labs shipping AR/AI products to billions taught us: specs fail, prototypes work. That experience isn't decoration—it's the methodology we bring to every Rationale engagement.
            </p>
          </header>

          {/* Content Sections */}
          <div className="prose prose-invert max-w-none">
            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Meta Reality Labs Context</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                7 years building augmented reality and AI products at Meta Reality Labs. Not research. Not prototypes. Production systems shipping to billions of users on Instagram and Facebook.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When you're building AR features that reach 2 billion users, you can't afford to guess. You can't iterate in production. You have to validate before launch.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">What We Built</h2>

              <div className="space-y-4">
                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">Spark AR Platform</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Creator tools powering Instagram and Facebook AR effects
                  </p>
                  <p className="text-sm text-gray-300">
                    Enabled millions of creators to build AR experiences. Required systematic prototyping to validate interaction models before shipping to creator community.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">AR Commerce Strategy</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Virtual try-on for Nike, Target, Sephora
                  </p>
                  <p className="text-sm text-gray-300">
                    Built frameworks for brands to create AR shopping experiences. Every interaction pattern validated with rapid prototypes before production.
                  </p>
                </div>

                <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-bold text-white mb-2">15+ Patents Filed</h3>
                  <p className="text-sm text-gray-400 mb-3">
                    Novel AR/AI interaction patterns
                  </p>
                  <p className="text-sm text-gray-300">
                    Each patent required extensive prototyping to validate feasibility and user comprehension before filing.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">What We Learned</h2>
              <p className="text-gray-300 leading-relaxed mb-6">
                The pattern repeated across every product:
              </p>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-[#00D9FF] pl-6 py-2">
                  <h4 className="text-white font-bold mb-2">Specs Failed in Predictable Ways</h4>
                  <p className="text-gray-300 text-sm">
                    Detailed specs described interactions clearly. But they couldn't predict how users would actually behave. AR interactions are physical—they require body movement, spatial awareness, gesture memory. You can't spec your way to understanding those.
                  </p>
                </div>

                <div className="border-l-4 border-[#00FF94] pl-6 py-2">
                  <h4 className="text-white font-bold mb-2">Prototypes Revealed Truth</h4>
                  <p className="text-gray-300 text-sm">
                    Put a prototype in someone's hands and their behavior tells you everything. They reach for the wrong gesture. They expect feedback at different timing. They misunderstand affordances. All discoverable in hours, not months.
                  </p>
                </div>

                <div className="border-l-4 border-[#FFD700] pl-6 py-2">
                  <h4 className="text-white font-bold mb-2">Scale Amplified Mistakes</h4>
                  <p className="text-gray-300 text-sm">
                    When you ship to billions, small UX issues become massive problems. A confusing gesture that affects 0.1% of users is still millions of people. We learned to validate everything before production because the cost of mistakes was measured in millions.
                  </p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                This is where the build-to-think methodology came from. Not theory. Not academic research. Production necessity at scale.
              </p>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">Why This Matters for Rationale</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                That 7 years of experience isn't résumé decoration. It's the foundation of how we work.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6">
                Every Rationale engagement applies patterns proven at Meta scale:
              </p>

              <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl">→</span>
                  <p className="text-sm text-gray-300">Rapid prototyping to validate before committing to production architecture</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl">→</span>
                  <p className="text-sm text-gray-300">Systematic testing of interaction patterns with real users</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl">→</span>
                  <p className="text-sm text-gray-300">Clear binary decision points: pass/fail criteria for each prototype</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[#00D9FF] text-xl">→</span>
                  <p className="text-sm text-gray-300">Pivot-friendly development that treats changes as learning, not failure</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8 mb-8" borderRadius="0.75rem">
              <h2 className="text-2xl font-bold text-white mb-4">The Transfer from Meta to Startups</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                Startups face the same problem as Meta, just with higher stakes: limited runway means you can't afford to build the wrong thing.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Meta had resources to recover from mistakes. Startups don't. That makes validated learning even more critical.
              </p>
              <p className="text-gray-300 leading-relaxed">
                The methodology that worked at billion-user scale works even better at 0-to-1 scale. Validate early. Pivot cheap. Ship with conviction.
              </p>
            </GlassCard>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex items-center justify-between">
              <Link
                href="/thinking/spec-vs-prototype"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous: Spec vs Prototype
              </Link>
              <Link
                href="/thinking/dual-engine-model"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
              >
                Next: Dual Engine Model
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

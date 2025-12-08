/**
 * Clarity Kit Service Page
 *
 * 2-week validation sprint
 * $15-25K investment
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, Check } from 'lucide-react';

export default function ClarityKitPage() {
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
        <div className="max-w-4xl mx-auto">
          <Link
            href="/partnerships"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 bg-gray-900/50 border border-gray-700 rounded text-xs font-mono text-gray-400 mb-4">
            KIT 1
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Clarity Kit
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Validate before you build. 2-week assessment that tells you if your concept is worth pursuing—and exactly what to prototype first.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Timeline</div>
              <div className="text-2xl font-bold text-white">2 weeks</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Investment</div>
              <div className="text-2xl font-bold text-white">$15-25K</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Checkpoints</div>
              <div className="text-2xl font-bold text-white">Weekly</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Deliverables</div>
              <div className="text-2xl font-bold text-white">4 key</div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* What You Get */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">What You Get</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Current State Assessment',
                  description: 'Deep analysis of your concept, market position, and technical requirements. We identify assumptions that need validation.'
                },
                {
                  title: 'Opportunity Identification',
                  description: 'Map high-value features and interaction patterns that differentiate your product. Focus on what matters.'
                },
                {
                  title: 'Prototype Roadmap',
                  description: '7-prototype framework customized for your concept. Clear sequence of validation checkpoints.'
                },
                {
                  title: 'Go/No-Go Recommendation',
                  description: 'Honest assessment based on technical feasibility, market fit, and resource requirements. Clear next steps or pivot recommendations.'
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 pt-1">
                    <Check className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Week by Week */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Week by Week</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#00D9FF] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 1</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Discovery & Analysis</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Stakeholder interviews</li>
                  <li>→ Competitive landscape analysis</li>
                  <li>→ Technical requirements mapping</li>
                  <li>→ Assumption identification</li>
                  <li>→ Checkpoint: Initial findings review</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#00FF94] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 2</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Strategy & Roadmap</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Validation framework design</li>
                  <li>→ Prototype sequence planning</li>
                  <li>→ Resource estimation</li>
                  <li>→ Risk analysis</li>
                  <li>→ Final presentation + recommendation</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Perfect For */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Perfect For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Early-Stage Founders</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You have conviction about a problem and potential solution, but need validation before committing significant capital.
                </p>
                <p className="text-sm text-gray-300">
                  Clarity Kit gives you confidence to proceed—or saves you months of building the wrong thing.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Teams Considering Pivots</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Your current approach isn't working. You need objective analysis of what to change and how to validate new direction.
                </p>
                <p className="text-sm text-gray-300">
                  We help you test pivot hypotheses without committing to full rebuild.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* What Happens Next */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens Next</h2>
            <p className="text-gray-400 mb-6">
              After Clarity Kit, you'll have three options:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">1</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Move to Prototype Kit</h4>
                  <p className="text-sm text-gray-400">Build 3-7 interactive prototypes to validate core assumptions (4 weeks, $40-60K)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">2</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Pivot or Pause</h4>
                  <p className="text-sm text-gray-400">Use insights to refine concept before committing to development</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">3</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Skip to Build Ship Run</h4>
                  <p className="text-sm text-gray-400">If validation shows clear path, jump to production MVP (8-12 weeks, $80-150K+)</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Pricing */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Investment</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-white">$15-25K</span>
              <span className="text-gray-400">for 2 weeks</span>
            </div>
            <p className="text-gray-400 mb-6">
              Price varies based on concept complexity and number of stakeholder interviews required.
            </p>
            <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-3">
                Equity Option
              </h3>
              <p className="text-sm text-gray-300">
                Available for equity discussion. We prefer equity when the fit is right, but Clarity Kit can be 100% cash-based. Let's talk about what makes sense for your situation.
              </p>
            </div>
          </GlassCard>
        </div>
      </article>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to validate your concept?</h2>
          <p className="text-gray-300 mb-8">
            Book a 30-minute intro call to discuss your project and see if Clarity Kit is the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/partnerships"
              className="px-8 py-4 border border-gray-300 hover:border-[#FFD700] text-white font-semibold transition-colors"
            >
              Compare all services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

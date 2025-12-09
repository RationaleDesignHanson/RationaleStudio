/**
 * Prototype Kit Service Page
 *
 * 4-week validation sprint
 * $40-60K investment
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, Check } from 'lucide-react';

export default function PrototypeKitPage() {
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
            KIT 2
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Prototype Kit
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            De-risk your development with 3-7 interactive prototypes that validate core assumptions before you write production code. Zero guesswork.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Timeline</div>
              <div className="text-2xl font-bold text-white">4 weeks</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Investment</div>
              <div className="text-2xl font-bold text-white">$40-60K</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Prototypes</div>
              <div className="text-2xl font-bold text-white">3-7</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Checkpoints</div>
              <div className="text-2xl font-bold text-white">Bi-weekly</div>
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
                  title: 'Interactive Prototypes (3-7)',
                  description: 'High-fidelity clickable prototypes that test one assumption each. Users interact with real flows, not static mocks. Each prototype has pass/fail criteria.'
                },
                {
                  title: 'Technical Architecture',
                  description: 'Production-ready system design based on validated UX patterns. Database schema, API structure, service architecture—documented and reviewed.'
                },
                {
                  title: 'User Testing Insights',
                  description: '5-10 user tests per prototype. Quantitative metrics (task success, time-on-task) + qualitative feedback. Clear pivot recommendations.'
                },
                {
                  title: 'Implementation Roadmap',
                  description: 'Phased development plan with effort estimates. Single-pass production build roadmap because all assumptions are validated.'
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

          {/* The 7-Prototype Framework */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">The 7-Prototype Framework</h2>
            <p className="text-gray-400 mb-6">
              Not all projects need 7 prototypes. We adapt based on your complexity. But the sequence is systematic:
            </p>
            <div className="space-y-4">
              {[
                { range: '1-2', title: 'Core Interaction Model', description: 'Fundamental user flows and navigation patterns' },
                { range: '3-4', title: 'Information Architecture', description: 'Content structure and data hierarchy' },
                { range: '5-6', title: 'Edge Cases & Error States', description: 'Failure modes and boundary conditions' },
                { range: '7', title: 'Polish & Microinteractions', description: 'Timing, transitions, and feedback loops' }
              ].map((stage, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                  <div className="flex items-start gap-4">
                    <span className="text-accent font-mono text-sm font-bold">{stage.range}</span>
                    <div>
                      <h4 className="text-white font-bold mb-1">{stage.title}</h4>
                      <p className="text-sm text-gray-400">{stage.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-6">
              Each prototype has success criteria. Pass → Next prototype. Fail → Pivot or kill. This is how Zero went from concept to production-ready in 2 weeks with 0 architectural changes.
            </p>
          </GlassCard>

          {/* Week by Week */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Week by Week</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-[#00D9FF] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 1</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Core Interactions</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Prototypes 1-2: Primary user flows</li>
                  <li>→ User testing (5-10 participants)</li>
                  <li>→ Quantitative metrics + qualitative feedback</li>
                  <li>→ Checkpoint: Validate or pivot</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#00D9FF] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 2</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Information Architecture</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Prototypes 3-4: Content structure & hierarchy</li>
                  <li>→ Navigation pattern testing</li>
                  <li>→ Data model validation</li>
                  <li>→ Checkpoint: Architecture review</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#00FF94] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 3</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Edge Cases & Polish</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Prototypes 5-7: Error states, edge cases, refinement</li>
                  <li>→ Comprehensive user testing</li>
                  <li>→ Technical architecture documentation</li>
                </ul>
              </div>

              <div className="border-l-4 border-[#00FF94] pl-6 py-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-gray-400">WEEK 4</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">Production Planning</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ System architecture documentation</li>
                  <li>→ Implementation roadmap with estimates</li>
                  <li>→ Final presentation + handoff materials</li>
                  <li>→ Decision: Build or iterate</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Perfect For */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Perfect For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Pre-Production Validation</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You know what you want to build, but need to validate core assumptions before committing engineering resources.
                </p>
                <p className="text-sm text-gray-300">
                  Prototype Kit de-risks production by testing UX patterns with real users first.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Teams with Capital but No Conviction</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You have funding and team, but uncertainty about the right interaction model or technical approach.
                </p>
                <p className="text-sm text-gray-300">
                  We validate quickly so you can build with confidence instead of iterating in production.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* ROI */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Return on Investment</h2>
            <p className="text-gray-400 mb-6">
              Prototype Kit typically delivers 10-15x ROI by avoiding wasted development:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
                <h4 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wide">Traditional Approach</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ 12 weeks production development</li>
                  <li>→ Discover UX issues in Week 8</li>
                  <li>→ 4 weeks rework ($80-120K waste)</li>
                  <li>→ Ship compromised product</li>
                </ul>
              </div>
              <div className="bg-gray-900/50 border border-[#00FF94] p-6 rounded-lg">
                <h4 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wide">Prototype Kit Approach</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ 4 weeks prototyping ($40-60K)</li>
                  <li>→ Discover issues in Week 2</li>
                  <li>→ Pivot costs 2 days, not 4 weeks</li>
                  <li>→ Production is single-pass</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* What Happens Next */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">What Happens Next</h2>
            <p className="text-gray-400 mb-6">
              After Prototype Kit, you'll have validated architecture ready for production:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">1</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Move to Build Ship Run</h4>
                  <p className="text-sm text-gray-400">Full production build based on validated prototypes (8-12 weeks, $80-150K+)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">2</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Build with Your Team</h4>
                  <p className="text-sm text-gray-400">Take documented architecture and implementation roadmap to your internal team</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">3</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Iterate Prototypes</h4>
                  <p className="text-sm text-gray-400">If testing reveals pivot opportunity, refine prototypes before production commitment</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Pricing */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Investment</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-white">$40-60K</span>
              <span className="text-gray-400">for 4 weeks</span>
            </div>
            <p className="text-gray-400 mb-6">
              Price varies based on prototype complexity, number of user flows, and testing requirements.
            </p>
            <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-3">
                Equity Option
              </h3>
              <p className="text-sm text-gray-300">
                Available for equity discussion. We prefer equity when the fit is right, but Prototype Kit can be 100% cash-based. Let's talk about what makes sense for your situation.
              </p>
            </div>
          </GlassCard>
        </div>
      </article>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to de-risk your development?</h2>
          <p className="text-gray-300 mb-8">
            Book a 30-minute intro call to discuss your project and see if Prototype Kit is the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-terminal-gold hover:bg-[#FFE34D] text-black font-semibold transition-all shadow-[0_0_17px_rgba(255,215,0,0.17)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]"
            >
              Book intro call
            </Link>
            <Link
              href="/partnerships"
              className="px-8 py-4 border border-gray-300 hover:border-terminal-gold text-white font-semibold transition-colors"
            >
              Compare all services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

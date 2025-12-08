/**
 * Build Ship Run Service Page
 *
 * 8-12 week production MVP
 * $80-150K+ investment
 */

'use client';

import Link from 'next/link';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { GlassCard } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ArrowLeft, Check } from 'lucide-react';

export default function BuildShipRunPage() {
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
            KIT 3
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Build Ship Run
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Production-ready MVP from concept to users. Full development cycle including prototyping, architecture, build, deployment, and beta rollout strategy.
          </p>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Timeline</div>
              <div className="text-2xl font-bold text-white">8-12 weeks</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Investment</div>
              <div className="text-2xl font-bold text-white">$80-150K+</div>
            </GlassCard>
            <GlassCard className="p-4" borderRadius="0.5rem">
              <div className="text-xs text-gray-500 mb-1">Deliverable</div>
              <div className="text-2xl font-bold text-white">Live MVP</div>
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
                  title: 'Production-Ready MVP',
                  description: 'Not a demo. Not a prototype. A complete, production-grade application deployed and running with real users. Clean architecture, documented code, A+ engineering standards.'
                },
                {
                  title: 'Deployment & Infrastructure',
                  description: 'Cloud hosting configured, CI/CD pipelines working, monitoring and logging set up. Everything needed to run and scale your product.'
                },
                {
                  title: 'Beta Rollout Strategy',
                  description: 'Phased launch plan with cohort structure, quality gates, and go/no-go checkpoints. Not just "ship it"—systematic rollout with learning loops.'
                },
                {
                  title: 'Ongoing Support Options',
                  description: 'Post-launch support packages available. Bug fixes, feature additions, scaling support—structured options for continued partnership.'
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

          {/* Complete Scope */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Complete Scope</h2>
            <p className="text-gray-400 mb-6">
              Build Ship Run includes everything from Prototype Kit plus full production build:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-4">Validation Phase (Weeks 1-4)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ 3-7 interactive prototypes</li>
                  <li>→ User testing & validation</li>
                  <li>→ Technical architecture design</li>
                  <li>→ Production roadmap with estimates</li>
                  <li className="pt-2 text-accent">Checkpoint: Build or pivot</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-4">Build Phase (Weeks 5-10)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Production development (frontend + backend)</li>
                  <li>→ Database & API implementation</li>
                  <li>→ Integration testing</li>
                  <li>→ Security & performance optimization</li>
                  <li className="pt-2 text-accent">Checkpoint: Deploy or refine</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-4">Ship Phase (Weeks 11-12)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Production deployment</li>
                  <li>→ Infrastructure configuration</li>
                  <li>→ Beta cohort onboarding</li>
                  <li>→ Monitoring & analytics setup</li>
                  <li className="pt-2 text-accent">Outcome: Live with users</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-4">Run Phase (Post-Launch)</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>→ Rollout strategy execution</li>
                  <li>→ User feedback collection</li>
                  <li>→ Performance monitoring</li>
                  <li>→ Handoff to your team or ongoing support</li>
                </ul>
              </div>
            </div>
          </GlassCard>

          {/* Zero Case Study */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Example: Zero Inbox</h2>
            <p className="text-gray-400 mb-6">
              Zero demonstrates Build Ship Run execution at speed:
            </p>
            <div className="space-y-4">
              <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent font-mono text-sm">WEEK 1-2</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">Validation Phase</span>
                </div>
                <p className="text-sm text-gray-300">
                  7 prototypes built and tested. Prototype 3 revealed 73% of users expected opposite swipe direction. Pivoted immediately. 0 architectural changes during production because everything was validated first.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent font-mono text-sm">WEEK 3-4</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">Production Build</span>
                </div>
                <p className="text-sm text-gray-300">
                  10 microservices, 182 Swift files, complete MVVM architecture. Single-pass development with no rework because prototypes validated everything.
                </p>
              </div>
              <div className="bg-gray-900/50 border border-gray-700 p-5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent font-mono text-sm">WEEK 5</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-sm text-gray-400">Launch</span>
                </div>
                <p className="text-sm text-gray-300">
                  Live on App Store with 4-cohort beta rollout strategy. Complete financial model. 24-week roadmap. Not just shipped—systematically launched.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <Link href="/work/zero" className="text-accent hover:underline font-medium">
                View full Zero case study →
              </Link>
            </div>
          </GlassCard>

          {/* Perfect For */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-6">Perfect For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-3">0-to-1 Products</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You have conviction about a problem and solution. You need a production MVP with real users to validate market fit.
                </p>
                <p className="text-sm text-gray-300">
                  Build Ship Run takes you from concept to users in 8-12 weeks with systematic validation at every stage.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-3">Funded Founders Ready to Execute</h3>
                <p className="text-sm text-gray-400 mb-4">
                  You've raised capital and need systematic velocity. Not interested in agencies that bill hours—want partners who ship products.
                </p>
                <p className="text-sm text-gray-300">
                  We bring the same methodology we use on Zero to your engagement. Proven patterns, production quality.
                </p>
              </div>
            </div>
          </GlassCard>

          {/* What Makes This Different */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">What Makes This Different</h2>
            <p className="text-gray-400 mb-6">
              Most agencies deliver code. Rationale delivers working products with validated execution plans.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Product Thinking, Not Just Engineering</h4>
                  <p className="text-sm text-gray-400">You get beta rollout strategy, financial models, roadmaps—not just code handoff</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Systematic Velocity</h4>
                  <p className="text-sm text-gray-400">Prototypes eliminate guesswork. Production is single-pass because assumptions are validated</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Clear Checkpoints</h4>
                  <p className="text-sm text-gray-400">Every 2 weeks: review progress, validate direction, decide to continue or pivot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">→</span>
                <div>
                  <h4 className="text-white font-bold mb-1">A+ Architecture</h4>
                  <p className="text-sm text-gray-400">Production-grade code reviewed by senior engineers. Clean patterns, documented systems</p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Pricing */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Investment</h2>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-white">$80-150K+</span>
              <span className="text-gray-400">for 8-12 weeks</span>
            </div>
            <p className="text-gray-400 mb-6">
              Price varies based on technical complexity, number of microservices, third-party integrations, and deployment infrastructure.
            </p>
            <div className="bg-gray-900/50 border border-gray-700 p-6 rounded-lg mb-6">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-3">
                What's Included
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>→ Complete Prototype Kit ($40-60K value)</li>
                <li>→ Production development (frontend + backend)</li>
                <li>→ Cloud infrastructure & deployment</li>
                <li>→ Beta rollout strategy & execution</li>
                <li>→ 30 days post-launch support</li>
              </ul>
            </div>
            <div className="bg-gray-900/50 border border-[#00FF94] p-6 rounded-lg">
              <h3 className="text-sm font-mono text-gray-400 uppercase tracking-wide mb-3">
                Equity Option
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                Build Ship Run is available for equity discussion. We prefer equity when the fit is right and can structure deals with:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>→ Reduced cash + equity split</li>
                <li>→ Full equity (no cash) for exceptional fits</li>
                <li>→ Revenue share structures</li>
              </ul>
              <p className="text-sm text-gray-400 mt-4">
                Let's talk about what makes sense for your situation.
              </p>
            </div>
          </GlassCard>

          {/* Post-Launch Support */}
          <GlassCard className="p-8" borderRadius="0.75rem">
            <h2 className="text-2xl font-bold text-white mb-4">Post-Launch Support</h2>
            <p className="text-gray-400 mb-6">
              After the 30-day support period, choose your ongoing engagement model:
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">1</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Full Handoff</h4>
                  <p className="text-sm text-gray-400">Complete documentation and knowledge transfer. Your team takes over operations and development.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">2</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Maintenance Retainer</h4>
                  <p className="text-sm text-gray-400">Monthly support for bug fixes, minor updates, and scaling as you grow ($5-15K/mo)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent text-xl">3</span>
                <div>
                  <h4 className="text-white font-bold mb-1">Ongoing Partnership</h4>
                  <p className="text-sm text-gray-400">Continue with feature development, roadmap execution, and strategic product direction</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </article>

      {/* CTA */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to build your MVP?</h2>
          <p className="text-gray-300 mb-8">
            Book a 30-minute intro call to discuss your project and see if Build Ship Run is the right fit.
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

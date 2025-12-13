/**
 * CREaiT - Quick Overview
 *
 * Scrollable one-page summary of the CREaiT consulting engagement.
 * Complements the full interactive pitch deck.
 * Protected by Firebase authentication - requires CREaiT login or admin access.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Presentation, Rocket, CheckCircle, AlertCircle } from 'lucide-react';
import { ClientAuthGuard } from '@/components/auth/ClientAuthGuard';
import { GlassCard } from '@/components/visual/GlassCard';
import { BaseCard } from '@/components/ui/BaseCard';

export default function CREaiTOverviewPage() {
  return (
    <ClientAuthGuard requiredClient="creait">
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* HERO */}
      <section className="relative py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/#portfolio"
            className="text-sm text-gray-400 hover:text-amber-400 font-semibold transition-colors mb-6 inline-block"
          >
            ← Back to Portfolio
          </Link>

          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-amber-400">CREaiT</span> Product Roadmap
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
              AI-Powered Commercial Real Estate Intelligence Platform
            </p>
            <p className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed">
              From working prototype to market-ready product in 12 weeks.
              Strategic roadmap + technical execution + investor positioning.
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/clients/creait/strategic-roadmap"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-amber-400/20"
            >
              <Presentation className="w-4 h-4 md:w-5 md:h-5" />
              View Full Strategic Roadmap
            </Link>
          </div>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center leading-tight">Where We Are Today</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-2xl border-2 border-green-500 bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-green-400 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-black flex-shrink-0">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-400">What's Working</h3>
              </div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-1">→</span>
                  <span>Working MVP with AI-powered property analysis</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-1">→</span>
                  <span>Core data pipeline (parcels, zoning, demographics)</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-1">→</span>
                  <span>Functional UI with map + search interface</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-1">→</span>
                  <span>Positive early traction with CRE investors</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-green-400 flex-shrink-0 mt-1">→</span>
                  <span>Clear product-market fit validation</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-red-500 bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-8 shadow-xl hover:shadow-2xl hover:border-red-400 transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-black flex-shrink-0">
                  <AlertCircle className="w-7 h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-red-400">The Critical Gap</h3>
              </div>
              <ul className="space-y-4 text-sm text-gray-300">
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-1">→</span>
                  <span>Scoring engine completely missing (0 implementations)</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-1">→</span>
                  <span>Opportunity intelligence API not built</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-1">→</span>
                  <span>Scoring dashboard UI doesn't exist</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-1">→</span>
                  <span>Frontend bypasses backend (39 direct DB calls)</span>
                </li>
                <li className="flex items-start gap-3 leading-relaxed">
                  <span className="text-red-400 flex-shrink-0 mt-1">→</span>
                  <span>Data pipeline automation not implemented</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE ENGAGEMENT */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center leading-tight">12-Week Engagement</h2>
          <div className="space-y-8">
            {/* Week 1-3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/70 border-2 border-gray-700 p-6 md:p-8 shadow-md transition-all hover:shadow-xl hover:border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-black flex-shrink-0">
                  1-3
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Weeks 1-3</div>
                  <div className="text-base text-gray-400">Strategic Foundation</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    Product Strategy
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Competitive analysis (CoStar, Reonomy, etc.)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Feature prioritization for investor demo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Technical debt assessment</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">💼</span>
                    Investor Materials
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Pitch deck (problem, solution, traction)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Financial model (unit economics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Product roadmap (12-month view)</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all group-hover:w-full"></div>
            </div>

            {/* Week 4-6 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/70 border-2 border-gray-700 p-6 md:p-8 shadow-md transition-all hover:shadow-xl hover:border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-black flex-shrink-0">
                  4-6
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Weeks 4-6</div>
                  <div className="text-base text-gray-400">Technical Architecture</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">⚙️</span>
                    System Design
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Scalable data pipeline architecture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>API design for enterprise clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Performance optimization strategy</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">🔧</span>
                    Implementation
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Database schema refactor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Caching layer for queries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Background job processing</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all group-hover:w-full"></div>
            </div>

            {/* Week 7-9 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/70 border-2 border-gray-700 p-6 md:p-8 shadow-md transition-all hover:shadow-xl hover:border-amber-400">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-black flex-shrink-0">
                  7-9
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Weeks 7-9</div>
                  <div className="text-base text-gray-400">Product Polish</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">🎨</span>
                    Design System
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Professional UI redesign</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Component library standardization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Responsive layout optimization</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    Key Features
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Saved searches & alerts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Portfolio comparison tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Export/reporting functionality</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all group-hover:w-full"></div>
            </div>

            {/* Week 10-12 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gray-900/70 border-2 border-amber-400 p-6 md:p-8 shadow-md transition-all hover:shadow-xl hover:border-amber-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-2xl font-bold text-black flex-shrink-0">
                  10-12
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Weeks 10-12</div>
                  <div className="text-base text-gray-400">Launch Preparation</div>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    Go-to-Market
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Investor outreach strategy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Beta customer onboarding plan</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Pricing model validation</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <div className="text-base font-semibold text-amber-400 flex items-center gap-2">
                    <span className="text-lg">📦</span>
                    Final Deliverables
                  </div>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Complete pitch deck</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>Technical documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">→</span>
                      <span>6-month product roadmap</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-amber-400 transition-all group-hover:w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center leading-tight">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <BaseCard
              variant="interactive"
              paddingSize="lg"
              className="border-2 border-gray-700 hover:border-amber-400 transition-all bg-gray-900/70"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex-shrink-0">
                  <Presentation className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Investor-Ready Materials</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Professional pitch deck, financial model, competitive analysis, and product roadmap ready for fundraising.
              </p>
            </BaseCard>

            <BaseCard
              variant="interactive"
              paddingSize="lg"
              className="border-2 border-gray-700 hover:border-amber-400 transition-all bg-gray-900/70"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex-shrink-0">
                  <Rocket className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Scalable Technical Foundation</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Refactored architecture, optimized data pipeline, and documented codebase that can handle 10x growth.
              </p>
            </BaseCard>

            <BaseCard
              variant="interactive"
              paddingSize="lg"
              className="border-2 border-gray-700 hover:border-amber-400 transition-all bg-gray-900/70"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 border-2 border-amber-400 flex-shrink-0">
                  <ArrowRight className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Go-to-Market Strategy</h3>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Clear positioning, pricing model, customer acquisition plan, and first 6 months execution roadmap.
              </p>
            </BaseCard>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <GlassCard
              paddingSize="xl"
              borderRadius="1.5rem"
              className="border-2 border-amber-400/50 shadow-2xl"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Engagement Terms</h2>
                <div className="h-1 w-24 bg-amber-400 mx-auto rounded-full"></div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-amber-400 mb-2 font-semibold uppercase tracking-wider">Duration</div>
                    <div className="text-5xl font-bold mb-4 text-white">12 Weeks</div>
                  </div>

                  <div>
                    <div className="text-xs text-amber-400 mb-3 font-semibold uppercase tracking-wider">Structure</div>
                    <div className="text-sm text-gray-300 space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>Weekly sprint planning</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>Bi-weekly stakeholder reviews</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>Dedicated Slack channel</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-xs text-amber-400 mb-3 font-semibold uppercase tracking-wider">Team</div>
                    <div className="text-sm text-gray-300 space-y-2 mb-6">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>1 Product Lead (strategy)</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>1 Technical Architect</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-amber-400 flex-shrink-0 mt-1">→</span>
                        <span>1 UI/UX Designer</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-amber-400 mb-2 font-semibold uppercase tracking-wider">Pricing</div>
                    <div className="text-sm text-gray-300">
                      Contact for custom quote based on scope
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">Ready to Dive Deeper?</h2>
          <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
            Explore detailed technical specs, week-by-week breakdown, and complete deliverables list in the full strategic roadmap.
          </p>
          <Link
            href="/clients/creait/strategic-roadmap"
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-4 md:py-5 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-amber-400/20 text-base md:text-lg"
          >
            <Presentation className="w-5 h-5 md:w-6 md:h-6" />
            View Full Strategic Roadmap
          </Link>
        </div>
      </section>
    </main>
    </ClientAuthGuard>
  );
}

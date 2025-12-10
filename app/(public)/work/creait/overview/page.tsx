/**
 * CREaiT - Quick Overview
 *
 * Scrollable one-page summary of the CREaiT consulting engagement.
 * Complements the full interactive pitch deck.
 * Password protected.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Presentation, Rocket } from 'lucide-react';
import { PasswordGate } from '@/components/sections/PasswordGate';

export default function CREaiTOverviewPage() {
  return (
    <PasswordGate
      password="123456"
      storageKey="creait-overview-access"
      title="CREaiT Overview - Protected Content"
      description="This overview contains confidential project details. Please enter the password to continue."
    >
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* HERO */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-amber-400">CREaiT</span> Product Roadmap
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-8">
              AI-Powered Commercial Real Estate Intelligence Platform
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              From working prototype to market-ready product in 12 weeks.
              Strategic roadmap + technical execution + investor positioning.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clients/creait/pitch-deck"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-amber-400/20"
            >
              <Presentation className="w-5 h-5" />
              View Full Pitch Deck
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-bold transition-all"
            >
              Back to Work
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHERE WE ARE */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Where We Are Today</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-900/50 border border-green-500/30 rounded-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4">What's Working</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Working MVP with AI-powered property analysis</li>
                <li>• Core data pipeline (parcels, zoning, demographics)</li>
                <li>• Functional UI with map + search interface</li>
                <li>• Positive early traction with CRE investors</li>
                <li>• Clear product-market fit validation</li>
              </ul>
            </div>
            <div className="p-6 bg-gray-900/50 border border-red-500/30 rounded-lg">
              <h3 className="text-xl font-bold text-red-400 mb-4">What's Missing</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• No investor-ready pitch deck</li>
                <li>• Technical architecture needs scaling strategy</li>
                <li>• UI/UX requires professional design system</li>
                <li>• Missing key features for enterprise buyers</li>
                <li>• No go-to-market positioning</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE ENGAGEMENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">12-Week Engagement</h2>
          <div className="space-y-6">
            {/* Week 1-3 */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-amber-400 font-bold text-2xl">Weeks 1-3</div>
                <div className="text-gray-400">Strategic Foundation</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Product Strategy</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Competitive analysis (CoStar, Reonomy, etc.)</li>
                    <li>• Feature prioritization for investor demo</li>
                    <li>• Technical debt assessment</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Investor Materials</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Pitch deck (problem, solution, traction)</li>
                    <li>• Financial model (unit economics)</li>
                    <li>• Product roadmap (12-month view)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 4-6 */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-amber-400 font-bold text-2xl">Weeks 4-6</div>
                <div className="text-gray-400">Technical Architecture</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">System Design</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Scalable data pipeline architecture</li>
                    <li>• API design for enterprise clients</li>
                    <li>• Performance optimization strategy</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Implementation</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Database schema refactor</li>
                    <li>• Caching layer for queries</li>
                    <li>• Background job processing</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 7-9 */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-amber-400 font-bold text-2xl">Weeks 7-9</div>
                <div className="text-gray-400">Product Polish</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Design System</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Professional UI redesign</li>
                    <li>• Component library standardization</li>
                    <li>• Responsive layout optimization</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Key Features</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Saved searches & alerts</li>
                    <li>• Portfolio comparison tools</li>
                    <li>• Export/reporting functionality</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Week 10-12 */}
            <div className="p-6 bg-gray-900/50 border border-amber-400/30 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-amber-400 font-bold text-2xl">Weeks 10-12</div>
                <div className="text-gray-400">Launch Preparation</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Go-to-Market</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Investor outreach strategy</li>
                    <li>• Beta customer onboarding plan</li>
                    <li>• Pricing model validation</li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold">Final Deliverables</div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Complete pitch deck</li>
                    <li>• Technical documentation</li>
                    <li>• 6-month product roadmap</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">What You Get</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-amber-400 mb-3">
                <Presentation className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Investor-Ready Materials</h3>
              <p className="text-gray-400 text-sm">
                Professional pitch deck, financial model, competitive analysis, and product roadmap ready for fundraising.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-amber-400 mb-3">
                <Rocket className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Scalable Technical Foundation</h3>
              <p className="text-gray-400 text-sm">
                Refactored architecture, optimized data pipeline, and documented codebase that can handle 10x growth.
              </p>
            </div>

            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-amber-400 mb-3">
                <ArrowRight className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Go-to-Market Strategy</h3>
              <p className="text-gray-400 text-sm">
                Clear positioning, pricing model, customer acquisition plan, and first 6 months execution roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INVESTMENT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">Engagement Terms</h2>
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-gray-900/50 border border-amber-400/30 rounded-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold uppercase tracking-wider">Duration</div>
                  <div className="text-3xl font-bold mb-6">12 Weeks</div>

                  <div className="text-sm text-amber-400 mb-2 font-semibold uppercase tracking-wider">Structure</div>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>• Weekly sprint planning</div>
                    <div>• Bi-weekly stakeholder reviews</div>
                    <div>• Dedicated Slack channel</div>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-amber-400 mb-2 font-semibold uppercase tracking-wider">Team</div>
                  <div className="text-gray-300 text-sm space-y-1 mb-6">
                    <div>• 1 Product Lead (strategy)</div>
                    <div>• 1 Technical Architect</div>
                    <div>• 1 UI/UX Designer</div>
                  </div>

                  <div className="text-sm text-amber-400 mb-2 font-semibold uppercase tracking-wider">Pricing</div>
                  <div className="text-gray-300 text-sm">
                    Contact for custom quote based on scope
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore detailed technical specs, week-by-week breakdown, and complete deliverables list in the full consulting proposal.
          </p>
          <Link
            href="/clients/creait/pitch-deck"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-amber-400/20"
          >
            <Presentation className="w-5 h-5" />
            View Full Consulting Proposal
          </Link>
        </div>
      </section>
    </main>
    </PasswordGate>
  );
}

/**
 * Athletes First - Quick Overview
 *
 * Scrollable one-page summary of the Athletes First pilot program.
 * Complements the full interactive pitch deck.
 * Protected by Firebase authentication - requires Athletes First login or admin access.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Presentation } from 'lucide-react';
import { ClientAuthGuard } from '@/components/auth/ClientAuthGuard';

export default function AthletesFirstOverviewPage() {
  return (
    <ClientAuthGuard requiredClient="athletes-first">
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* HERO */}
      <section className="relative py-6 md:py-8 lg:py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-3 md:mb-6 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-2xl md:text-3xl lg:text-4xl lg:text-5xl font-bold mb-3 md:mb-6">
              Athletes First <span className="text-cyan-400">Amplify</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-4 md:mb-8">
              AI-Powered NIL Platform for College Athletics
            </p>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              Digital twins + immersive pitch system + spatial computing interface.
              Built to multiply deal close rates and unlock athlete monetization at scale.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/clients/athletes-first/pitch-deck"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-cyan-400/20"
            >
              <Presentation className="w-4 h-4 md:w-5 md:h-5" />
              View Full Pitch Deck
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-bold transition-all"
            >
              Back to Work
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-8 text-center">The Agency Paradox</h2>
          <div className="grid md:grid-cols-2 gap-4 md:p-4 md:p-6 lg:p-8">
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-4">Current State</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• Athletes First reps 900+ college athletes</li>
                <li>• NIL deals fragmented across 50+ brands</li>
                <li>• Agents manually pitch via email + PDF</li>
                <li>• <span className="text-red-400 font-bold">12% close rate</span> industry standard</li>
                <li>• Brands can't visualize athlete fit</li>
              </ul>
            </div>
            <div className="p-4 md:p-6 bg-gray-900/50 border border-cyan-400/30 rounded-lg">
              <h3 className="text-lg md:text-xl font-bold text-cyan-400 mb-4">The Breakthrough</h3>
              <ul className="space-y-3 text-gray-300">
                <li>• <span className="text-cyan-400 font-bold">Digital twins</span> for every athlete</li>
                <li>• <span className="text-cyan-400 font-bold">Immersive pitch system</span> with live preview</li>
                <li>• <span className="text-cyan-400 font-bold">Vision Pro</span> spatial interface</li>
                <li>• Target: <span className="text-green-400 font-bold">35%+ close rate</span></li>
                <li>• 10x faster brand campaign rollout</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-8 text-center">Four Integrated Modules</h2>
          <div className="grid md:grid-cols-2 gap-4 md:p-6">
            {/* Module 1 */}
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-cyan-400 font-mono text-sm mb-2">MODULE 1</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Digital Twins</h3>
              <p className="text-gray-400 mb-4">
                AI-generated athlete personas with stats, social reach, brand fit scoring, and sponsorship history.
              </p>
              <div className="text-xs md:text-sm text-gray-500">
                Demo: Interactive athlete cards with real-time brand matching
              </div>
            </div>

            {/* Module 2 */}
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-cyan-400 font-mono text-sm mb-2">MODULE 2</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Immersive Pitch System</h3>
              <p className="text-gray-400 mb-4">
                Brands visualize their logo on athlete gear, social posts, and game-day content before signing.
              </p>
              <div className="text-xs md:text-sm text-gray-500">
                Demo: Live brand preview canvas with drag-and-drop
              </div>
            </div>

            {/* Module 3 */}
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-cyan-400 font-mono text-sm mb-2">MODULE 3</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">Vision Pro Interface</h3>
              <p className="text-gray-400 mb-4">
                Spatial computing environment for brands to explore entire rosters in 3D space.
              </p>
              <div className="text-xs md:text-sm text-gray-500">
                Demo: Spatial roster visualization with gesture controls
              </div>
            </div>

            {/* Module 4 */}
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="text-cyan-400 font-mono text-sm mb-2">MODULE 4</div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">RecruitAI Assistant</h3>
              <p className="text-gray-400 mb-4">
                AI agent that matches brands to athletes based on demographics, performance, and campaign goals.
              </p>
              <div className="text-xs md:text-sm text-gray-500">
                Demo: Natural language brand-to-athlete matching
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILOT TIMELINE */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-8 text-center">16-Week Pilot Program</h2>
          <div className="space-y-6">
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-cyan-400 font-bold text-2xl">Phase 1</div>
                <div className="text-gray-400">Weeks 1-4: Digital Twin Foundation</div>
              </div>
              <p className="text-gray-300">
                Import Athletes First roster (900+ athletes), build digital twin profiles, integrate social/performance data.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-cyan-400 font-bold text-2xl">Phase 2</div>
                <div className="text-gray-400">Weeks 5-8: Immersive Pitch System</div>
              </div>
              <p className="text-gray-300">
                Build brand preview canvas, develop demo campaigns with 3 pilot brands, measure engagement vs. PDF baseline.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-cyan-400 font-bold text-2xl">Phase 3</div>
                <div className="text-gray-400">Weeks 9-12: Vision Pro Experience</div>
              </div>
              <p className="text-gray-300">
                Ship spatial computing interface, demo with 2 Fortune 500 brands, validate ROI on immersive pitch vs. standard.
              </p>
            </div>

            <div className="p-4 md:p-6 bg-gray-900/50 border border-cyan-400/30 rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="text-cyan-400 font-bold text-2xl">Phase 4</div>
                <div className="text-gray-400">Weeks 13-16: Scale & Productization</div>
              </div>
              <p className="text-gray-300">
                Full rollout to Athletes First roster, launch RecruitAI assistant, establish scalable brand onboarding process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS METRICS */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-8 text-center">Success Metrics</h2>
          <div className="grid md:grid-cols-3 gap-4 md:p-6">
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-400 mb-2">35%+</div>
              <div className="text-gray-400">Close Rate</div>
              <div className="text-xs text-gray-500 mt-2">Target vs. 12% baseline</div>
            </div>
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-2">10 deals</div>
              <div className="text-gray-400">Pilot Conversions</div>
              <div className="text-xs text-gray-500 mt-2">From 3 pilot brands</div>
            </div>
            <div className="p-4 md:p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-purple-400 mb-2">$2M+</div>
              <div className="text-gray-400">Athlete Revenue</div>
              <div className="text-xs text-gray-500 mt-2">16-week pilot period</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to See the Full System?</h2>
          <p className="text-gray-400 mb-4 md:mb-8 max-w-2xl mx-auto">
            Explore 40+ interactive demos, detailed technical architecture, and complete pilot roadmap in the full pitch deck.
          </p>
          <Link
            href="/clients/athletes-first/pitch-deck"
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 md:px-8 py-4 bg-cyan-400 hover:bg-cyan-300 text-gray-900 rounded-lg font-bold transition-all shadow-lg shadow-cyan-400/20"
          >
            <Presentation className="w-4 h-4 md:w-5 md:h-5" />
            View Full Interactive Pitch Deck
          </Link>
        </div>
      </section>
    </main>
    </ClientAuthGuard>
  );
}

/**
 * CREaiT Welcome Slide
 *
 * Opening slide for consulting proposal deck
 * Shows current state + 12-week plan to market-ready
 */

'use client';

import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';

export default function CREWelcomeSlide() {
  return (
    <div className="min-h-[600px] flex flex-col items-center justify-center text-center py-12">
      {/* Logo/Badge */}
      <div className="mb-8 px-4 py-2 rounded-lg border-2"
           style={{
             borderColor: CRE_COLORS.primary,
             backgroundColor: `${CRE_COLORS.primary}10`
           }}>
        <div className="text-xs font-mono uppercase tracking-wider"
             style={{ color: CRE_COLORS.primary }}>
          Rationale × CREaiT
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 max-w-4xl">
        Rationale × CREaiT
      </h1>

      {/* Subheadline */}
      <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl">
        12-Week Plan to Get Your Product Market-Ready
      </p>

      {/* Value Proposition */}
      <div className="max-w-3xl p-6 rounded-lg border bg-gray-900/60 backdrop-blur-sm"
           style={{ borderColor: `${CRE_COLORS.primary}30` }}>
        <div className="flex items-start gap-4 text-left">
          <div className="text-3xl flex-shrink-0">🎯</div>
          <div>
            <h3 className="font-semibold text-white mb-2">
              What Rationale Will Deliver
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Rationale will build the missing components to get CREaiT market-ready: <strong className="text-white">Opportunity Scoring Engine</strong> (your competitive differentiator), <strong className="text-white">Broker Dashboard UI</strong> (production-ready frontend), and <strong className="text-white">Pilot Launch Support</strong> (onboarding, training, and success measurement). All delivered in 12 weeks.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Prompt */}
      <div className="mt-12 flex flex-col items-center">
        <div className="text-sm text-gray-500 font-mono mb-3">
          Scroll to explore assessment
        </div>
        <svg
          className="w-6 h-6 text-gray-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

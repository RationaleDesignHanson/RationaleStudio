/**
 * Staged Funding Diagram
 * Two-stage funding strategy with trigger metrics
 */

'use client';

import { useState } from 'react';

interface FundingItem {
  label: string;
  range: string;
  percentage?: number;
}

interface TriggerMetric {
  metric: string;
  target: string;
  met: boolean;
}

export default function StagedFundingDiagram() {
  const [hoveredStage, setHoveredStage] = useState<'pre-seed' | 'seed' | null>(null);

  const preSeedItems: FundingItem[] = [
    { label: 'Provisional patent + FTO clearance', range: '$8-10K', percentage: 12 },
    { label: 'Pilot manufacturing (5-10K units)', range: '$15-35K', percentage: 30 },
    { label: 'Dispenser tooling v1', range: '$8-15K', percentage: 15 },
    { label: 'Retail beta program', range: '$10-20K', percentage: 20 },
    { label: 'Certifications + compliance', range: '$5-10K', percentage: 10 },
    { label: 'Marketing + packaging', range: '$5-8K', percentage: 8 },
    { label: 'Founder runway (4 months)', range: '$20-30K', percentage: 25 },
    { label: 'Buffer', range: '$10K', percentage: 8 }
  ];

  const triggerMetrics: TriggerMetric[] = [
    { metric: 'Refill repeat rate', target: '>40%', met: false },
    { metric: 'Dispenser attach rate', target: '>60%', met: true },
    { metric: 'Net Promoter Score', target: '>50', met: true },
    { metric: 'Review keyword frequency', target: '>30%', met: true }
  ];

  const seedItems: FundingItem[] = [
    { label: 'Manufacturing scale-up', range: '$100-130K', percentage: 35 },
    { label: 'National distribution push', range: '$60-80K', percentage: 20 },
    { label: 'Brand & marketing', range: '$50-70K', percentage: 18 },
    { label: 'Team expansion (hire 2-3)', range: '$60-90K', percentage: 22 },
    { label: 'Working capital & buffer', range: '$30-40K', percentage: 10 }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">The Raise: Staged Funding Strategy</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">Metrics-driven capital deployment in two phases</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
        {/* Pre-Seed Column */}
        <div
          className={`bg-[#E85D42]/5 border-2 rounded-xl transition-all ${
            hoveredStage === 'pre-seed' ? 'border-[#E85D42] shadow-md' : 'border-[#E85D42]/30'
          }`}
          onMouseEnter={() => setHoveredStage('pre-seed')}
          onMouseLeave={() => setHoveredStage(null)}
        >
          <div className="bg-[#E85D42] text-white p-4 rounded-t-lg">
            <div className="text-sm font-bold mb-1">PRE-SEED • CURRENT RAISE</div>
            <div className="text-3xl font-bold">$100-150K</div>
            <div className="text-xs opacity-90 mt-1">Validation + retail beta + IP filing</div>
          </div>

          <div className="p-4 space-y-2">
            {preSeedItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#E85D42] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-[#2D2D2D] leading-tight flex-1">{item.label}</span>
                  <span className="text-sm font-bold text-[#E85D42] ml-2">{item.range}</span>
                </div>
                {item.percentage && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E85D42] rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-[#2D2D2D]/50">{item.percentage}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <div className="bg-[#E85D42]/10 border border-[#E85D42]/30 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-[#2D2D2D]/70 mb-1">Timeline</div>
              <div className="text-lg font-bold text-[#E85D42]">3-4 months</div>
            </div>
          </div>
        </div>

        {/* Trigger Metrics Bridge */}
        <div className="flex flex-col items-center justify-center lg:py-12">
          <div className="bg-[#F5F1E8] border-2 border-[#2A9D8F] rounded-xl p-4 space-y-3 lg:w-64">
            <div className="text-center mb-2">
              <div className="text-xs font-bold text-[#2D2D2D]/60 mb-1">SEED UNLOCKS WHEN</div>
              <div className="text-sm font-bold text-[#2A9D8F]">4 Metrics Hit Targets</div>
            </div>

            {triggerMetrics.map((trigger, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 p-2 rounded-lg transition-all ${
                  trigger.met ? 'bg-[#2A9D8F]/10' : 'bg-white'
                }`}
              >
                <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  trigger.met ? 'bg-[#2A9D8F]' : 'bg-gray-300'
                }`}>
                  {trigger.met && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-[#2D2D2D]">{trigger.metric}</div>
                  <div className="text-xs text-[#2D2D2D]/60">{trigger.target}</div>
                </div>
              </div>
            ))}

            <div className="pt-2 border-t border-gray-300 text-center">
              <div className="text-xs font-bold text-[#F4A261]">
                🔒 3 of 4 met • ~4 weeks to unlock
              </div>
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="hidden lg:block mt-4">
            <svg className="w-12 h-12 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        {/* Seed Column */}
        <div
          className={`bg-[#2A9D8F]/5 border-2 rounded-xl transition-all ${
            hoveredStage === 'seed' ? 'border-[#2A9D8F] shadow-md' : 'border-[#2A9D8F]/30'
          }`}
          onMouseEnter={() => setHoveredStage('seed')}
          onMouseLeave={() => setHoveredStage(null)}
        >
          <div className="bg-[#2A9D8F] text-white p-4 rounded-t-lg">
            <div className="text-sm font-bold mb-1">SEED • FOLLOW-ON ROUND</div>
            <div className="text-3xl font-bold">$300-400K</div>
            <div className="text-xs opacity-90 mt-1">Scale manufacturing + national distribution</div>
          </div>

          <div className="p-4 space-y-2">
            {seedItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-3 hover:border-[#2A9D8F] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-medium text-[#2D2D2D] leading-tight flex-1">{item.label}</span>
                  <span className="text-sm font-bold text-[#2A9D8F] ml-2">{item.range}</span>
                </div>
                {item.percentage && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2A9D8F] rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-bold text-[#2D2D2D]/50">{item.percentage}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="px-4 pb-4">
            <div className="bg-[#2A9D8F]/10 border border-[#2A9D8F]/30 rounded-lg p-3 text-center">
              <div className="text-xs font-bold text-[#2D2D2D]/70 mb-1">Timeline</div>
              <div className="text-lg font-bold text-[#2A9D8F]">9-12 months</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-[#F4A261]/5 border-2 border-[#F4A261]/30 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#F4A261]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Capital-Efficient, Risk-Mitigated Approach</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              Pre-seed gets us to proof of concept with real retail data. Seed only deploys after hitting hard validation metrics. This structure protects investor downside, aligns incentives around customer validation, and ensures capital isn't burned on scale before proving the model works. If metrics don't hit, we extend beta or pivot rather than forcing growth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

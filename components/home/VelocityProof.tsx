/**
 * Velocity Proof Component
 *
 * Simplified timeline comparison for homepage
 * Shows Traditional 24 weeks vs Rationale 11 weeks
 * Extracted from /overview TraditionalVsRationaleDiagram
 */

'use client';

import { GlassCard } from '@/components/visual';

interface VelocityProofProps {
  simplified?: boolean; // Mobile-friendly variant
}

export function VelocityProof({ simplified = false }: VelocityProofProps) {
  if (simplified) {
    // Mobile-optimized version
    return (
      <GlassCard className="p-6" borderRadius="0.75rem">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Velocity Proof</h2>
          <p className="text-sm text-gray-400">
            We ship faster by validating early
          </p>
        </div>

        {/* Traditional */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase">Traditional</span>
            <span className="text-xs text-gray-400">24 weeks</span>
          </div>
          <div className="h-8 bg-red-500/20 border border-red-500/30 rounded flex items-center px-3">
            <span className="text-xs text-red-600 font-medium">Specs → Build → Test</span>
          </div>
          <div className="mt-1 text-xs text-gray-400">First feedback after 20 weeks</div>
        </div>

        {/* Rationale */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-accent uppercase">Rationale</span>
            <span className="text-xs text-accent font-bold">11 weeks</span>
          </div>
          <div className="h-8 bg-accent/20 border border-accent/30 rounded flex items-center px-3">
            <span className="text-xs text-accent font-medium">7 Prototypes → Lock → Build</span>
          </div>
          <div className="mt-1 text-xs text-gray-400">Feedback from day 1</div>
        </div>

        {/* Summary */}
        <div className="mt-6 pt-4 border-t border-gray-800 text-center">
          <div className="text-3xl font-bold text-accent">54% faster</div>
          <div className="text-xs text-gray-400 mt-1">Time to validated launch</div>
        </div>
      </GlassCard>
    );
  }

  // Desktop version
  return (
    <GlassCard className="p-8" borderRadius="0.75rem">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          How We Ship Faster
        </h2>
        <p className="text-base text-gray-400">
          Traditional waterfall vs Rationale's validated development approach
        </p>
      </div>

      {/* Traditional Timeline */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide sm:min-w-[180px]">
            Traditional Approach
          </h3>
          <div className="text-xs text-gray-400">24 weeks total</div>
        </div>

        {/* Timeline bar */}
        <div className="relative h-16 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
          <div className="absolute inset-0 flex">
            {/* Specs phase */}
            <div
              className="flex items-center justify-center px-4 border-r border-gray-700/50"
              style={{
                width: '16.67%', // 4 weeks of 24
                background: 'linear-gradient(90deg, #FF4444DD, #FF4444AA)'
              }}
            >
              <span className="text-xs font-medium text-white text-center">Specs</span>
            </div>

            {/* Production phase */}
            <div
              className="flex items-center justify-center px-4 border-r border-gray-700/50"
              style={{
                width: '66.67%', // 16 weeks of 24
                background: 'linear-gradient(90deg, #CC0000DD, #CC0000AA)'
              }}
            >
              <span className="text-xs font-medium text-white text-center">
                Production (no validation)
              </span>
            </div>

            {/* Testing phase */}
            <div
              className="flex items-center justify-center px-4"
              style={{
                width: '16.67%', // 4 weeks of 24
                background: 'linear-gradient(90deg, #990000DD, #990000AA)'
              }}
            >
              <span className="text-xs font-medium text-white text-center">Testing</span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="text-xs text-gray-400 sm:min-w-[180px]">Risk accumulation:</div>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: '100%',
                background: 'linear-gradient(90deg, #FF4444, #990000)'
              }}
            />
          </div>
          <div className="text-xs font-medium text-red-500">high investment at risk</div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-800 my-6" />

      {/* Rationale Timeline */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-sm font-medium text-accent uppercase tracking-wide sm:min-w-[180px]">
            Rationale Approach
          </h3>
          <div className="text-xs text-accent font-bold">11 weeks total</div>
        </div>

        {/* Timeline bar */}
        <div className="relative h-16 bg-gray-800/50 rounded-lg overflow-hidden border border-accent/30">
          <div className="absolute inset-0 flex">
            {/* 7 Prototypes phase */}
            <div
              className="flex items-center justify-center px-4 border-r border-gray-700/50"
              style={{
                width: '18.18%', // 2 weeks of 11 (scaled to 24-week comparison)
                background: '#00FF94'
              }}
            >
              <span className="text-xs font-medium text-gray-900 text-center">
                7 Prototypes
              </span>
            </div>

            {/* Lock phase */}
            <div
              className="flex items-center justify-center px-4 border-r border-gray-700/50"
              style={{
                width: '9.09%', // 1 week of 11
                background: '#FFD700'
              }}
            >
              <span className="text-xs font-medium text-gray-900 text-center">Lock</span>
            </div>

            {/* Production phase */}
            <div
              className="flex items-center justify-center px-4"
              style={{
                width: '72.73%', // 8 weeks of 11
                background: '#00D9FF'
              }}
            >
              <span className="text-xs font-medium text-gray-900 text-center">
                Production (validated)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-3">
          <div className="text-xs text-gray-400 sm:min-w-[180px]">Risk mitigated early:</div>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{
                width: '25%',
                background: 'linear-gradient(90deg, #00FF94, #00D9FF)'
              }}
            />
          </div>
          <div className="text-xs font-medium text-accent">controlled validation</div>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent">54%</div>
            <div className="text-xs text-gray-400 mt-1">Faster time to market</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">75%</div>
            <div className="text-xs text-gray-400 mt-1">Risk reduction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">7x</div>
            <div className="text-xs text-gray-400 mt-1">More validation cycles</div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

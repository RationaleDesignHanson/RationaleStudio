'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Traditional vs Rationale Comparison - Mobile Accordion
 *
 * Shows two approaches as expandable cards
 * Each reveals timeline phases and risk metrics
 */

interface TimelinePhase {
  label: string;
  weeks: number;
  color: string;
  description?: string;
}

export default function TraditionalVsRationaleDiagramMobile() {
  const [expandedApproach, setExpandedApproach] = useState<'traditional' | 'rationale' | null>(null);

  const traditionalPhases: TimelinePhase[] = [
    { label: 'Specs', weeks: 4, color: '#FF4444', description: 'Requirements gathering, no validation' },
    { label: 'Production (no validation)', weeks: 16, color: '#CC0000', description: 'Building without user feedback' },
    { label: 'Testing', weeks: 4, color: '#990000', description: 'First real feedback after months of work' },
  ];

  const rationalePhases: TimelinePhase[] = [
    { label: 'Rapid Prototyping', weeks: 2, color: 'var(--color-zero-green)', description: 'Rapid iteration with user feedback' },
    { label: 'Lock', weeks: 1, color: 'var(--color-terminal-gold)', description: 'Architecture locked after validation' },
    { label: 'Production (validated)', weeks: 8, color: 'var(--color-zero-cyan)', description: 'Build with confidence' },
  ];

  const traditionalTotal = traditionalPhases.reduce((sum, p) => sum + p.weeks, 0);
  const rationaleTotal = rationalePhases.reduce((sum, p) => sum + p.weeks, 0);

  const renderApproach = (
    id: 'traditional' | 'rationale',
    title: string,
    phases: TimelinePhase[],
    total: number,
    riskLevel: string,
    riskColor: string,
    riskPercent: number,
    isTraditional: boolean
  ) => {
    const isExpanded = expandedApproach === id;

    return (
      <div key={id}>
        <button
          onClick={() => setExpandedApproach(isExpanded ? null : id)}
          className="w-full p-0 rounded-lg border-0 transition-all text-left"
          style={{
            backgroundColor: isExpanded ? '#1F2937' : '#111827'
          }}
        >
          {/* Title section */}
          <div className="p-3 w-full">
            <div className="text-sm font-bold text-white mb-1 whitespace-nowrap">
              {title}
            </div>
            <div className="text-xs text-gray-400 whitespace-nowrap">
              {total} weeks total
            </div>
          </div>

          {/* Risk bar with chevron (always visible) */}
          <div className="mt-3 px-3 pb-3 flex justify-end">
            <div className="w-[180px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-gray-500">Risk:</span>
                <span className="text-xs font-medium" style={{ color: riskColor }}>
                  {riskLevel.replace(' risk', '')}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-500"
                  style={{
                    width: `${riskPercent}%`,
                    background: isTraditional
                      ? 'linear-gradient(90deg, #FF4444, #990000)'
                      : 'linear-gradient(90deg, var(--color-zero-green), var(--color-zero-cyan))',
                  }}
                />
              </div>
              <div className="flex-shrink-0">
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </div>
            </div>
          </div>
        </button>

        {/* Expanded phases - Elegant bullet list */}
        {isExpanded && (
          <div className="mt-3 pl-2">
            {phases.map((phase, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 py-2 pl-2 mb-2"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5" style={{ backgroundColor: phase.color }} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-white">
                      {phase.label}
                    </span>
                    <span className="text-xs font-medium text-gray-400">
                      {phase.weeks}w
                    </span>
                  </div>
                  {phase.description && (
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {phase.description}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Key milestone for each approach */}
            {isTraditional && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <div className="text-xs text-red-400 font-medium">
                  ⚠️ First user feedback after 20 weeks
                </div>
              </div>
            )}

            {!isTraditional && (
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-xs text-green-400 font-medium">
                  ✓ User feedback starts Week 1
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-4">
        <h2 className="text-base font-medium text-white mb-2">
          Timeline Comparison
        </h2>
        <p className="text-xs text-gray-400">
          Traditional vs Rationale approach
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {renderApproach(
          'traditional',
          'Traditional Approach',
          traditionalPhases,
          traditionalTotal,
          'High risk',
          '#FF4444',
          100,
          true
        )}

        {renderApproach(
          'rationale',
          'Rationale Approach',
          rationalePhases,
          rationaleTotal,
          'Controlled risk',
          'var(--color-zero-green)',
          25,
          false
        )}
      </div>

      {/* Comparison summary */}
      <div className="pt-4 border-t border-gray-700">
        <div className="text-xs font-medium text-gray-400 mb-3">KEY DIFFERENCES</div>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-terminal-gold mt-1.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">
              <span className="font-medium text-white">54% faster:</span> 11 weeks vs 24 weeks
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-terminal-gold mt-1.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">
              <span className="font-medium text-white">75% less risk:</span> Early validation vs late testing
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-terminal-gold mt-1.5 flex-shrink-0" />
            <div className="text-xs text-gray-300">
              <span className="font-medium text-white">Week 1 feedback:</span> vs Week 20 feedback
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

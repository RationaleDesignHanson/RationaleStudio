/**
 * Traditional vs Rationale Comparison Diagram
 * Dual-track Gantt timeline showing 24 weeks vs 11 weeks with risk accumulation
 * McKinsey-style process comparison per InformationDesignAgent specs
 */

'use client';

import { useState } from 'react';

interface TimelinePhase {
  label: string;
  weeks: number;
  color: string;
  description?: string;
}

export default function TraditionalVsRationaleDiagram() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);

  // Traditional approach: 24 weeks total
  const traditionalPhases: TimelinePhase[] = [
    { label: 'Specs', weeks: 4, color: '#FF4444', description: 'Requirements gathering, no validation' },
    { label: 'Production (no validation)', weeks: 16, color: '#CC0000', description: 'Building without user feedback' },
    { label: 'Testing', weeks: 4, color: '#990000', description: 'First real feedback after months of work' },
  ];

  // Rationale approach: 11 weeks total
  const rationalePhases: TimelinePhase[] = [
    { label: '7 Prototypes', weeks: 2, color: '#00FF94', description: 'Rapid iteration with user feedback' },
    { label: 'Lock', weeks: 1, color: '#FFD700', description: 'Architecture locked after validation' },
    { label: 'Production (validated)', weeks: 8, color: '#00D9FF', description: 'Build with confidence' },
  ];

  const totalWeeks = 24; // Scale to traditional timeline
  const weekWidth = 100 / totalWeeks; // Percentage per week

  const renderTimeline = (phases: TimelinePhase[], label: string, isTraditional: boolean) => {
    let currentWeek = 0;

    return (
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <h3 className="text-sm font-medium text-gray-300 uppercase tracking-wide min-w-[180px]">
            {label}
          </h3>
          <div className="text-xs text-gray-500">
            {phases.reduce((sum, p) => sum + p.weeks, 0)} weeks total
          </div>
        </div>

        {/* Timeline bar */}
        <div className="relative h-16 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
          <div className="absolute inset-0 flex">
            {phases.map((phase, idx) => {
              const widthPercent = (phase.weeks / totalWeeks) * 100;
              const leftPercent = (currentWeek / totalWeeks) * 100;
              currentWeek += phase.weeks;

              return (
                <div
                  key={idx}
                  className="relative group cursor-pointer transition-all duration-200"
                  style={{
                    width: `${widthPercent}%`,
                    left: `${leftPercent}%`,
                    position: 'absolute',
                    height: '100%',
                  }}
                  onMouseEnter={() => setHoveredPhase(`${label}-${idx}`)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  <div
                    className="h-full flex items-center justify-center px-2 border-r border-gray-700/50 group-hover:opacity-90 transition-opacity"
                    style={{
                      background: isTraditional
                        ? `linear-gradient(90deg, ${phase.color}DD, ${phase.color}AA)`
                        : phase.color,
                    }}
                  >
                    <span className="text-xs font-medium text-white text-center leading-tight drop-shadow-md">
                      {phase.label}
                    </span>
                  </div>

                  {/* Hover tooltip */}
                  {hoveredPhase === `${label}-${idx}` && phase.description && (
                    <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-xl whitespace-nowrap">
                      <div className="text-xs text-gray-300">
                        <div className="font-medium text-white mb-1">{phase.weeks} weeks</div>
                        {phase.description}
                      </div>
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk indicator */}
        <div className="mt-2 flex items-center gap-3">
          <div className="text-xs text-gray-500 min-w-[180px]">
            {isTraditional ? 'Risk accumulation:' : 'Risk mitigated early:'}
          </div>
          <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500"
              style={{
                width: isTraditional ? '100%' : '25%',
                background: isTraditional
                  ? 'linear-gradient(90deg, #FF4444, #990000)'
                  : 'linear-gradient(90deg, #00FF94, #00D9FF)',
              }}
            />
          </div>
          <div className="text-xs font-medium" style={{
            color: isTraditional ? '#FF4444' : '#00FF94'
          }}>
            {isTraditional ? 'high investment at risk' : 'controlled validation'}
          </div>
        </div>

        {/* Key milestone annotations */}
        {isTraditional ? (
          <div className="mt-2 flex items-start">
            <div className="min-w-[180px]" />
            <div className="flex-1 relative">
              <div className="absolute left-[83%] top-0">
                <div className="flex items-center gap-1">
                  <div className="w-px h-4 bg-gray-600" />
                  <span className="text-xs text-gray-500">First user feedback ↑</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-2 flex items-start">
            <div className="min-w-[180px]" />
            <div className="flex-1 relative">
              <div className="absolute left-[8%] top-0">
                <div className="flex items-center gap-1">
                  <div className="w-px h-4 bg-gray-600" />
                  <span className="text-xs text-gray-500">User feedback ↑</span>
                </div>
              </div>
              <div className="absolute left-[20%] top-0">
                <div className="flex items-center gap-1">
                  <div className="w-px h-4 bg-gray-600" />
                  <span className="text-xs text-gray-500">Lock architecture ↑</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-2">Time to Market Comparison</h2>
        <p className="text-sm text-gray-400">
          Traditional waterfall vs Rationale's validated development approach
        </p>
      </div>

      {renderTimeline(traditionalPhases, 'TRADITIONAL APPROACH', true)}

      <div className="h-px bg-gray-700 my-8" />

      {renderTimeline(rationalePhases, 'RATIONALE APPROACH', false)}

      {/* Summary metrics */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#00FF94]">54%</div>
            <div className="text-xs text-gray-500 mt-1">Faster time to market</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-terminal-gold">75%</div>
            <div className="text-xs text-gray-500 mt-1">Risk reduction</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#00D9FF]">7x</div>
            <div className="text-xs text-gray-500 mt-1">More validation cycles</div>
          </div>
        </div>
      </div>

      {/* Week scale reference (subtle) */}
      <div className="mt-4 flex items-center gap-3">
        <div className="min-w-[180px]" />
        <div className="flex-1 flex justify-between text-xs text-gray-600">
          <span>Week 0</span>
          <span>Week 6</span>
          <span>Week 12</span>
          <span>Week 18</span>
          <span>Week 24</span>
        </div>
      </div>
    </div>
  );
}

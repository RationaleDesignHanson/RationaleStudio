/**
 * Cost Comparison Bar Chart
 * Horizontal bar chart showing cost difference between late vs early discovery
 * The Economist-style data visualization with annotations
 */

'use client';

import { useState } from 'react';

interface CostScenario {
  id: string;
  label: string;
  discoveryTime: string;
  cost: number;
  color: string;
  breakdown: string[];
  outcome: string;
}

export default function CostComparisonChart() {
  const [hoveredScenario, setHoveredScenario] = useState<string | null>(null);

  const scenarios: CostScenario[] = [
    {
      id: 'late-discovery',
      label: 'Late Discovery (Traditional)',
      discoveryTime: 'Week 16',
      cost: 80000,
      color: '#FF4444',
      breakdown: [
        '12 weeks production engineering wasted',
        '4 weeks QA testing wrong UX',
        '2 weeks rework to pivot architecture',
        'Political fallout from "failed" project'
      ],
      outcome: 'Sunk cost forces shipping subpar UX'
    },
    {
      id: 'early-discovery',
      label: 'Early Discovery (Rationale)',
      discoveryTime: 'Day 3',
      cost: 10000,
      color: '#00FF94',
      breakdown: [
        '2 days building Prototype 3',
        '1 day user testing with 15 participants',
        '4 hours pivoting prototype direction',
        'Zero production code thrown away'
      ],
      outcome: 'Validated direction before heavy investment'
    }
  ];

  const maxCost = Math.max(...scenarios.map(s => s.cost));

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">The Cost of Discovery Timing</h3>
        <p className="text-sm text-gray-400">
          Finding UX problems late means throwing away production code. Finding them early means pivoting prototypes.
        </p>
      </div>

      {/* Chart */}
      <div className="space-y-6">
        {scenarios.map((scenario) => {
          const widthPercent = (scenario.cost / maxCost) * 100;
          const isHovered = hoveredScenario === scenario.id;

          return (
            <div
              key={scenario.id}
              className="relative"
              onMouseEnter={() => setHoveredScenario(scenario.id)}
              onMouseLeave={() => setHoveredScenario(null)}
            >
              {/* Label */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="text-sm font-semibold text-white">
                    {scenario.label}
                  </div>
                  <div className="px-2 py-0.5 rounded text-xs font-mono bg-gray-800 border border-gray-700 text-gray-400">
                    {scenario.discoveryTime}
                  </div>
                </div>
                <div className="text-lg font-bold" style={{ color: scenario.color }}>
                  ${(scenario.cost / 1000).toFixed(0)}K
                </div>
              </div>

              {/* Bar */}
              <div className="relative h-12 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500 flex items-center justify-end pr-4"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: scenario.color,
                    opacity: isHovered ? 1 : 0.85
                  }}
                >
                  {widthPercent > 30 && (
                    <span className="text-xs font-mono text-white font-bold">
                      {(scenario.cost / scenarios[1].cost).toFixed(1)}x
                    </span>
                  )}
                </div>

                {/* Hover indicator */}
                {isHovered && (
                  <div className="absolute inset-0 border-2 rounded-lg pointer-events-none" style={{ borderColor: scenario.color }} />
                )}
              </div>

              {/* Outcome badge */}
              <div className="mt-2 flex items-start gap-2">
                <div className="text-xs text-gray-500">→</div>
                <div className="text-xs text-gray-400 leading-relaxed">
                  {scenario.outcome}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Breakdown Details (shown on hover) */}
      {hoveredScenario && (
        <div className="mt-8 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
          <div className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wide">
            Cost Breakdown: {scenarios.find(s => s.id === hoveredScenario)?.label}
          </div>
          <div className="space-y-2">
            {scenarios.find(s => s.id === hoveredScenario)?.breakdown.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div
                  className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                  style={{ backgroundColor: scenarios.find(s => s.id === hoveredScenario)?.color }}
                />
                <div className="text-xs text-gray-300 leading-relaxed">{item}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Insight */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-terminal-gold/20 flex items-center justify-center">
              <span className="text-terminal-gold text-sm">💡</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-1">Why Early Discovery Is 8x Cheaper</div>
            <div className="text-xs text-gray-400 leading-relaxed">
              Prototypes are low-fidelity, high-speed. Production is high-fidelity, low-speed. Finding problems in the low-speed phase means throwing away expensive work. Finding problems in the high-speed phase means pivoting cheap prototypes. Zero's 7-prototype framework caught every major UX issue before writing production code—resulting in 0 architectural pivots.
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded">
          <div className="text-xs font-mono text-[#FF4444] mb-1">TRADITIONAL</div>
          <div className="text-lg font-bold text-white mb-1">12 weeks</div>
          <div className="text-xs text-gray-400">Production waste</div>
        </div>
        <div className="p-3 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded">
          <div className="text-xs font-mono text-[#00FF94] mb-1">RATIONALE</div>
          <div className="text-lg font-bold text-white mb-1">2 days</div>
          <div className="text-xs text-gray-400">Prototype pivot</div>
        </div>
      </div>
    </div>
  );
}

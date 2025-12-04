/**
 * Decision Pressure Diagram
 * Sunk cost psychology visualization showing how investment creates pressure to ship bad UX
 * Inspired by behavioral economics decision trees
 */

'use client';

import { useState } from 'react';

interface DecisionPoint {
  week: number;
  investment: number;
  pressureLevel: number; // 0-100
  decision: string;
  consequences: {
    pivot: { cost: string; outcome: string; color: string };
    continue: { cost: string; outcome: string; color: string };
  };
}

export default function DecisionPressureDiagram() {
  const [selectedWeek, setSelectedWeek] = useState<number>(12);

  const decisionPoints: DecisionPoint[] = [
    {
      week: 4,
      investment: 40000,
      pressureLevel: 25,
      decision: 'UX issue discovered in early testing',
      consequences: {
        pivot: { cost: '2 weeks', outcome: 'Quick pivot, minimal waste', color: '#00FF94' },
        continue: { cost: 'no delay', outcome: 'Continue with known risk', color: '#FFA500' }
      }
    },
    {
      week: 8,
      investment: 80000,
      pressureLevel: 50,
      decision: 'Core interaction pattern doesn\'t test well',
      consequences: {
        pivot: { cost: '6 weeks', outcome: 'Significant rework, partial waste', color: '#FFA500' },
        continue: { cost: 'no delay', outcome: 'Hope it improves in production', color: '#FF4444' }
      }
    },
    {
      week: 12,
      investment: 120000,
      pressureLevel: 75,
      decision: 'User feedback confirms UX is wrong',
      consequences: {
        pivot: { cost: '12+ weeks', outcome: 'Major rework, political fallout', color: '#FF4444' },
        continue: { cost: 'no delay', outcome: 'Ship subpar UX to avoid admitting failure', color: '#CC0000' }
      }
    },
    {
      week: 16,
      investment: 200000,
      pressureLevel: 100,
      decision: 'Production launch with known UX problems',
      consequences: {
        pivot: { cost: '20+ weeks', outcome: 'Complete restart, career risk', color: '#990000' },
        continue: { cost: 'no delay', outcome: 'Ship anyway, blame "user education"', color: '#660000' }
      }
    }
  ];

  const selectedPoint = decisionPoints.find(p => p.week === selectedWeek) || decisionPoints[2];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">The Sunk Cost Trap</h3>
        <p className="text-sm text-gray-400">
          As investment grows, psychological pressure to ship increases—even when UX is proven wrong.
        </p>
      </div>

      {/* Timeline Selector */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-mono text-gray-400 uppercase tracking-wide">Decision Point</div>
          <div className="text-xs text-gray-500">Click a week to explore</div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {decisionPoints.map((point) => {
            const isSelected = point.week === selectedWeek;
            const pressureColor =
              point.pressureLevel <= 25 ? '#00FF94' :
              point.pressureLevel <= 50 ? '#FFA500' :
              point.pressureLevel <= 75 ? '#FF4444' : '#990000';

            return (
              <button
                key={point.week}
                onClick={() => setSelectedWeek(point.week)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'bg-gray-800/70 border-[#FFD700]'
                    : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-xs text-gray-500 mb-1">Week {point.week}</div>
                <div className="text-sm font-bold text-white mb-2">
                  ${(point.investment / 1000).toFixed(0)}K
                </div>
                {/* Pressure Bar */}
                <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${point.pressureLevel}%`,
                      backgroundColor: pressureColor
                    }}
                  />
                </div>
                <div className="text-[9px] text-gray-500 mt-1">
                  {point.pressureLevel}% pressure
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Decision Point Detail */}
      <div className="mb-8 p-6 bg-gray-800/50 border-2 border-[#FFD700] rounded-lg">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-mono text-[#FFD700] mb-1">WEEK {selectedPoint.week}</div>
            <div className="text-lg font-bold text-white mb-2">${(selectedPoint.investment / 1000).toFixed(0)}K Invested</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 mb-1">Pressure to Ship</div>
            <div className="text-2xl font-bold" style={{
              color: selectedPoint.pressureLevel <= 25 ? '#00FF94' :
                     selectedPoint.pressureLevel <= 50 ? '#FFA500' :
                     selectedPoint.pressureLevel <= 75 ? '#FF4444' : '#990000'
            }}>
              {selectedPoint.pressureLevel}%
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-900/50 border border-gray-700 rounded mb-4">
          <div className="text-xs font-medium text-gray-400 mb-2">SITUATION</div>
          <div className="text-sm text-white leading-relaxed">
            {selectedPoint.decision}
          </div>
        </div>

        {/* Fork in the Road */}
        <div className="space-y-3">
          {/* Pivot Path */}
          <div className="p-4 bg-gradient-to-r from-gray-800/50 to-transparent border-l-4 rounded"
               style={{ borderColor: selectedPoint.consequences.pivot.color }}>
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm font-bold text-white">Option A: Pivot</div>
              <div className="text-sm font-mono" style={{ color: selectedPoint.consequences.pivot.color }}>
                {selectedPoint.consequences.pivot.cost}
              </div>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              {selectedPoint.consequences.pivot.outcome}
            </div>
          </div>

          {/* Continue Path */}
          <div className="p-4 bg-gradient-to-r from-gray-800/50 to-transparent border-l-4 rounded"
               style={{ borderColor: selectedPoint.consequences.continue.color }}>
            <div className="flex items-start justify-between mb-2">
              <div className="text-sm font-bold text-white">Option B: Continue</div>
              <div className="text-sm font-mono" style={{ color: selectedPoint.consequences.continue.color }}>
                {selectedPoint.consequences.continue.cost}
              </div>
            </div>
            <div className="text-xs text-gray-400 leading-relaxed">
              {selectedPoint.consequences.continue.outcome}
            </div>
          </div>
        </div>
      </div>

      {/* Sunk Cost Psychology Explanation */}
      <div className="p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">⚠️</div>
          <div>
            <div className="text-sm font-bold text-[#FF4444] mb-2">Why Teams Double Down</div>
            <div className="text-xs text-gray-300 leading-relaxed space-y-1">
              <div>• <span className="font-semibold">Week 4:</span> Easy to pivot—minimal sunk cost</div>
              <div>• <span className="font-semibold">Week 8:</span> Starting to hurt—but still rational to pivot</div>
              <div>• <span className="font-semibold">Week 12:</span> Political pressure emerges—"we've invested so much"</div>
              <div>• <span className="font-semibold">Week 16:</span> Pivoting means admitting failure—teams ship bad UX instead</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rationale Approach */}
      <div className="p-4 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 text-2xl">✓</div>
          <div>
            <div className="text-sm font-bold text-[#00FF94] mb-2">How Rationale Eliminates This Trap</div>
            <div className="text-xs text-gray-300 leading-relaxed space-y-2">
              <div>
                <span className="font-semibold text-white">7 prototypes before production:</span> Validate every UX decision while sunk cost is near zero. Pivoting Prototype 3 costs 2 days. Pivoting Week 12 production costs months of rework.
              </div>
              <div>
                <span className="font-semibold text-white">Zero's proof:</span> 7 prototypes, 0 production pivots. Every major UX question answered before heavy investment. No sunk cost trap because validation happened early.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-gray-500 mb-2">Traditional Approach</div>
            <div className="text-2xl font-bold text-[#FF4444] mb-1">20 weeks</div>
            <div className="text-xs text-gray-400">at risk before validation</div>
            <div className="text-[10px] text-gray-500 mt-1">Sunk cost forces bad decisions</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-2">Rationale Approach</div>
            <div className="text-2xl font-bold text-[#00FF94] mb-1">2 weeks</div>
            <div className="text-xs text-gray-400">to validate with 7 prototypes</div>
            <div className="text-[10px] text-gray-500 mt-1">Pivot freely before commitment</div>
          </div>
        </div>
      </div>
    </div>
  );
}

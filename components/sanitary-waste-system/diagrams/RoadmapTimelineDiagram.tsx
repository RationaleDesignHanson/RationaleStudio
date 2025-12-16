/**
 * Roadmap Timeline Diagram
 * Interactive 4-phase timeline with funding gates
 */

'use client';

import { useState } from 'react';

interface Phase {
  id: string;
  period: string;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  milestones: string[];
  fundingGate?: {
    amount: string;
    stage: string;
    color: string;
  };
}

export default function RoadmapTimelineDiagram() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');

  const phases: Phase[] = [
    {
      id: 'phase-1',
      period: 'Weeks 1-4',
      title: 'Foundation',
      color: '#E85D42',
      bgColor: '#E85D42/5',
      borderColor: '#E85D42',
      milestones: [
        'Provisional patent filing + FTO clearance',
        'Finalize bill of materials (BOM)',
        'Secure contract manufacturer',
        'Dispenser tooling design v1',
        'Packaging design & compliance research'
      ],
      fundingGate: {
        amount: '$25-35K',
        stage: 'F&F / Pre-Seed Start',
        color: '#9CA3AF'
      }
    },
    {
      id: 'phase-2',
      period: 'Weeks 5-12',
      title: 'Validation',
      color: '#F4A261',
      bgColor: '#F4A261/5',
      borderColor: '#F4A261',
      milestones: [
        'Pilot production (5-10K units)',
        'Launch retail beta (15-25 stores)',
        'Staff training & in-store demo program',
        'Customer feedback loops & NPS surveys',
        'Iterate packaging based on shelf testing'
      ],
      fundingGate: {
        amount: '$100-150K',
        stage: 'Pre-Seed Close',
        color: '#E85D42'
      }
    },
    {
      id: 'phase-3',
      period: 'Months 4-9',
      title: 'Scale Prep',
      color: '#2A9D8F',
      bgColor: '#2A9D8F/5',
      borderColor: '#2A9D8F',
      milestones: [
        'Hit seed trigger metrics (>40% refill, >60% attach)',
        'Secure distribution partnerships',
        'Scale production to 50K+ units',
        'Build DTC subscription infrastructure',
        'Expand to 100+ retail doors'
      ]
    },
    {
      id: 'phase-4',
      period: 'Months 10-18',
      title: 'Market Expansion',
      color: '#1D7068',
      bgColor: '#1D7068/5',
      borderColor: '#1D7068',
      milestones: [
        'National retail rollout (500+ stores)',
        'Launch complementary SKUs (cat, baby)',
        'International market testing',
        'Build brand advocacy & social presence',
        'Prepare for Series A positioning'
      ],
      fundingGate: {
        amount: '$300-400K',
        stage: 'Seed Round',
        color: '#2A9D8F'
      }
    }
  ];

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#2D2D2D]">Roadmap & Milestones</h3>
        <p className="text-sm sm:text-base text-[#2D2D2D]/70">18-month path from concept to national distribution</p>
      </div>

      {/* Timeline Container */}
      <div className="space-y-4">
        {phases.map((phase, index) => (
          <div key={phase.id}>
            {/* Phase Card */}
            <div
              className={`border-2 rounded-xl transition-all duration-300 cursor-pointer ${
                expandedPhase === phase.id
                  ? `border-[${phase.borderColor}] bg-[${phase.bgColor}] shadow-md`
                  : 'border-gray-200 bg-[#F5F1E8] hover:border-gray-400'
              }`}
              onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
            >
              {/* Phase Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                    style={{ backgroundColor: phase.color }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2D2D2D]/60 mb-1">{phase.period}</div>
                    <div className="text-lg font-bold text-[#2D2D2D]">{phase.title}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-sm font-bold text-[#2D2D2D]/70`}>
                    {phase.milestones.length} milestones
                  </div>
                  <svg
                    className={`w-5 h-5 text-[#2D2D2D]/60 transition-transform duration-300 ${
                      expandedPhase === phase.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expandable Milestones */}
              {expandedPhase === phase.id && (
                <div className="border-t-2 border-gray-200 p-4 space-y-2 animate-in slide-in-from-top duration-300">
                  {phase.milestones.map((milestone, mIndex) => (
                    <div key={mIndex} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 mt-1 w-2 h-2 rounded-full"
                        style={{ backgroundColor: phase.color }}
                      ></div>
                      <p className="text-sm text-[#2D2D2D]/80 leading-relaxed">{milestone}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Funding Gate (if exists) */}
            {phase.fundingGate && (
              <div className="flex items-center justify-center py-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-0.5 bg-gray-300"></div>
                  <div
                    className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-md"
                    style={{ backgroundColor: phase.fundingGate.color }}
                  >
                    🚪 {phase.fundingGate.stage}: {phase.fundingGate.amount}
                  </div>
                  <div className="h-12 w-0.5 bg-gray-300"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Insight */}
      <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            <svg className="w-5 h-5 text-[#2A9D8F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h5 className="text-sm font-bold text-[#2D2D2D] mb-1">Metrics-Driven Funding Gates</h5>
            <p className="text-xs sm:text-sm text-[#2D2D2D]/80 leading-relaxed">
              Each funding milestone is triggered by hitting specific validation metrics. Pre-seed funds the retail beta. Seed round unlocks only after proving refill repeat rate {'>'}40%, dispenser attach {'>'}60%, and NPS {'>'}50. This de-risks capital deployment and ensures product-market fit before scaling.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

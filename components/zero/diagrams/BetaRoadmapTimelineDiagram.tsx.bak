'use client';

import { useState } from 'react';
import { Users, TrendingUp, Rocket, CheckCircle, Target } from 'lucide-react';

/**
 * BetaRoadmapTimelineDiagram: Horizontal Swimlane Timeline
 *
 * Shows 3 parallel tracks over 6 months: Product, Technical, Metrics
 * Interactive: click milestones to expand, toggle optimistic/conservative scenarios
 */

interface Milestone {
  id: string;
  phase: string;
  week: number;
  track: 'product' | 'technical' | 'metrics';
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  icon: React.ComponentType<{ className?: string }>;
  keyMetrics: string[];
}

const milestones: Milestone[] = [
  // Product Track
  {
    id: 'p1',
    phase: 'Phase 1',
    week: 1,
    track: 'product',
    title: 'Beta Launch (5-10 users)',
    description: 'Email infrastructure testing, corpus accuracy validation, edge case discovery',
    status: 'in_progress',
    icon: Users,
    keyMetrics: ['5-10 beta users', 'Email sync >99%', 'Classification accuracy >95%']
  },
  {
    id: 'p2',
    phase: 'Phase 1',
    week: 4,
    track: 'product',
    title: 'Checkpoint #1: Quality Gate',
    description: 'GO/ITERATE/PIVOT decision. All 8 criteria must pass to advance to Phase 2',
    status: 'upcoming',
    icon: CheckCircle,
    keyMetrics: ['Crash-free >99%', 'Hallucination <2%', 'Action success >99%']
  },
  {
    id: 'p3',
    phase: 'Phase 2',
    week: 8,
    track: 'product',
    title: 'Beta Expansion (100 users)',
    description: 'Cohort 2 (20-30 users), Cohort 3 (50-75 users), product-market fit validation',
    status: 'upcoming',
    icon: TrendingUp,
    keyMetrics: ['100 active users', 'Day 7 retention >70%', 'NPS >30']
  },
  {
    id: 'p4',
    phase: 'Phase 3',
    week: 12,
    track: 'product',
    title: 'Public TestFlight',
    description: 'Open beta, marketing campaign, 1,000+ waitlist, PR launch preparation',
    status: 'upcoming',
    icon: Rocket,
    keyMetrics: ['1,000+ waitlist', 'User satisfaction >4.0/5', 'Media coverage']
  },

  // Technical Track
  {
    id: 't1',
    phase: 'Phase 1',
    week: 0,
    track: 'technical',
    title: 'Clean Room Migration ✓',
    description: '1.9GB → 61MB (97% reduction), zero legacy code, all services connected',
    status: 'completed',
    icon: CheckCircle,
    keyMetrics: ['97% size reduction', '67% faster builds', '100% code utilization']
  },
  {
    id: 't2',
    phase: 'Phase 1',
    week: 4,
    track: 'technical',
    title: 'NetworkService Reliability',
    description: 'Gmail sync optimization, retry logic, offline support, rate limiting',
    status: 'in_progress',
    icon: Target,
    keyMetrics: ['Uptime >99.9%', 'Avg latency <100ms', 'Sync success >99%']
  },
  {
    id: 't3',
    phase: 'Phase 2',
    week: 8,
    track: 'technical',
    title: 'Scale Infrastructure',
    description: 'Load testing, database optimization, caching layer, CDN integration',
    status: 'upcoming',
    icon: TrendingUp,
    keyMetrics: ['Handle 100+ concurrent users', 'Cost <$0.15/user', 'API p99 <200ms']
  },
  {
    id: 't4',
    phase: 'Phase 3',
    week: 12,
    track: 'technical',
    title: 'Production Hardening',
    description: 'Monitoring, alerting, backup systems, disaster recovery, security audit',
    status: 'upcoming',
    icon: CheckCircle,
    keyMetrics: ['99.95% uptime SLA', 'SOC 2 compliance', 'Auto-scaling']
  },

  // Metrics Track
  {
    id: 'm1',
    phase: 'Phase 1',
    week: 1,
    track: 'metrics',
    title: 'Baseline Metrics',
    description: 'Email processing stats, classification accuracy, action execution success',
    status: 'in_progress',
    icon: Target,
    keyMetrics: ['0 emails processed', '0 actions executed', 'Baseline established']
  },
  {
    id: 'm2',
    phase: 'Phase 1',
    week: 4,
    track: 'metrics',
    title: '10K Emails Processed',
    description: 'Early adopters clear backlogs, AI model validation, quality thresholds met',
    status: 'upcoming',
    icon: TrendingUp,
    keyMetrics: ['10,000 emails classified', '1,000 actions executed', '95% accuracy']
  },
  {
    id: 'm3',
    phase: 'Phase 2',
    week: 8,
    track: 'metrics',
    title: '100K Emails Milestone',
    description: 'Scale validation, cost per email optimized, retention metrics proven',
    status: 'upcoming',
    icon: Rocket,
    keyMetrics: ['100,000 emails processed', '10,000 actions executed', '$0.01/email cost']
  },
  {
    id: 'm4',
    phase: 'Phase 3',
    week: 12,
    track: 'metrics',
    title: '1M Emails Processed',
    description: 'Public launch readiness, unit economics proven, viral growth coefficient >1',
    status: 'upcoming',
    icon: CheckCircle,
    keyMetrics: ['1,000,000 emails', '100,000 actions', 'K-factor >1.2']
  }
];

const trackColors = {
  product: '#4299E1',
  technical: '#9F7AEA',
  metrics: '#48BB78'
};

const trackLabels = {
  product: 'Product',
  technical: 'Technical',
  metrics: 'Metrics'
};

export default function BetaRoadmapTimelineDiagram() {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [scenario, setScenario] = useState<'conservative' | 'optimistic'>('conservative');

  const maxWeeks = 14;
  const currentWeek = 1;

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-8 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Beta to Launch: 6-Month Roadmap
        </h3>
        <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          3 parallel tracks • Phase 1 (weeks 1-4) → Phase 2 (weeks 5-8) → Phase 3 (weeks 9-12)
        </p>

        {/* Scenario Toggle */}
        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setScenario('conservative')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${scenario === 'conservative' ? 'bg-[#4299E1] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Conservative (60% probability)
          </button>
          <button
            onClick={() => setScenario('optimistic')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${scenario === 'optimistic' ? 'bg-[#48BB78] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Optimistic (30% probability)
          </button>
        </div>

        {/* Current Position Indicator */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full border border-[#D4AF37]">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs text-[#D4AF37] font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            YOU ARE HERE: Week {currentWeek}, Phase 1
          </span>
        </div>
      </div>

      {/* Timeline Visualization */}
      <div className="mb-8 overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Week markers */}
          <div className="flex mb-4 relative">
            {Array.from({ length: maxWeeks }).map((_, weekIndex) => (
              <div key={weekIndex} className="flex-1 text-center relative">
                <div
                  className={`text-xs font-bold mb-2 ${weekIndex < currentWeek ? 'text-gray-500' : weekIndex === currentWeek ? 'text-[#D4AF37]' : 'text-gray-600'}`}
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {weekIndex === 0 ? 'W0' : `W${weekIndex}`}
                </div>
                {/* Vertical line */}
                <div
                  className={`h-2 mx-auto ${weekIndex < currentWeek ? 'bg-[#48BB78]' : weekIndex === currentWeek ? 'bg-[#D4AF37]' : 'bg-gray-700'}`}
                  style={{ width: '2px' }}
                />
              </div>
            ))}
          </div>

          {/* 3 Swimlane Tracks */}
          {(['product', 'technical', 'metrics'] as const).map((track) => (
            <div key={track} className="mb-6">
              {/* Track Label */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="px-3 py-1 rounded text-xs font-bold"
                  style={{
                    backgroundColor: `${trackColors[track]}30`,
                    color: trackColors[track],
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  {trackLabels[track]}
                </div>
              </div>

              {/* Timeline Track */}
              <div className="relative h-20 bg-[#2D3748] rounded-lg border border-gray-700">
                {/* Milestones */}
                {milestones.filter(m => m.track === track).map((milestone) => {
                  const Icon = milestone.icon;
                  const isSelected = selectedMilestone === milestone.id;
                  const position = (milestone.week / maxWeeks) * 100;

                  return (
                    <div
                      key={milestone.id}
                      className="absolute cursor-pointer transition-all"
                      style={{
                        left: `${position}%`,
                        transform: 'translateX(-50%)',
                        zIndex: isSelected ? 10 : 5
                      }}
                      onClick={() => setSelectedMilestone(isSelected ? null : milestone.id)}
                    >
                      {/* Milestone Icon */}
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isSelected ? 'scale-125' : 'scale-100'}`}
                        style={{
                          backgroundColor: milestone.status === 'completed' ? '#48BB78' : milestone.status === 'in_progress' ? '#D4AF37' : trackColors[track],
                          borderColor: isSelected ? '#FFFFFF' : trackColors[track],
                          boxShadow: isSelected ? `0 0 20px ${trackColors[track]}80` : 'none'
                        }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Milestone Label (on hover/select) */}
                      {isSelected && (
                        <div
                          className="absolute top-14 left-1/2 -translate-x-1/2 w-48 p-3 rounded-lg border-2 text-left"
                          style={{
                            backgroundColor: '#1A202C',
                            borderColor: trackColors[track]
                          }}
                        >
                          <div className="text-xs font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {milestone.title}
                          </div>
                          <div className="text-[10px] text-gray-400 leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {milestone.description}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Progress Bar */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#48BB78] to-[#D4AF37] rounded"
                  style={{ width: `${(currentWeek / maxWeeks) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Milestone Details */}
      {selectedMilestone && (
        <div className="p-6 bg-[#2D3748] rounded-lg border-2" style={{ borderColor: trackColors[milestones.find(m => m.id === selectedMilestone)!.track] }}>
          <div className="flex items-start gap-4">
            <div className="text-3xl">
              {milestones.find(m => m.id === selectedMilestone)?.status === 'completed' ? '✓' :
               milestones.find(m => m.id === selectedMilestone)?.status === 'in_progress' ? '⏳' : '📅'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {milestones.find(m => m.id === selectedMilestone)?.title}
                </span>
                <span className="px-2 py-1 rounded text-[9px] font-bold" style={{
                  backgroundColor: `${trackColors[milestones.find(m => m.id === selectedMilestone)!.track]}30`,
                  color: trackColors[milestones.find(m => m.id === selectedMilestone)!.track],
                  fontFamily: 'JetBrains Mono, monospace'
                }}>
                  {milestones.find(m => m.id === selectedMilestone)?.phase}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-4 leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {milestones.find(m => m.id === selectedMilestone)?.description}
              </p>

              <div className="space-y-2">
                <div className="text-[10px] text-gray-500 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  KEY METRICS
                </div>
                {milestones.find(m => m.id === selectedMilestone)?.keyMetrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full" style={{ backgroundColor: trackColors[milestones.find(m => m.id === selectedMilestone)!.track] }} />
                    <span className="text-[10px] text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Scenario Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          {scenario === 'conservative' ? (
            <>
              <div>
                <div className="text-3xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  100
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Beta users by Week 8
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9F7AEA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  100K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Emails processed by Week 8
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  1,000
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Waitlist by Week 12
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-3xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  250
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Beta users by Week 8
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#9F7AEA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  500K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Emails processed by Week 8
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  5,000
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Waitlist by Week 12
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

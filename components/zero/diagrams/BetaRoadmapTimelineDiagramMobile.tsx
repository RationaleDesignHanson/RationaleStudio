'use client';

import { useState } from 'react';
import { Users, TrendingUp, Rocket, CheckCircle, Target, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * BetaRoadmapTimelineDiagram: Mobile Swipeable Track View
 *
 * Shows one track at a time with swipe navigation
 * Simplified phase-based timeline for mobile screens
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
  product: 'Product Track',
  technical: 'Technical Track',
  metrics: 'Metrics Track'
};

const tracks = ['product', 'technical', 'metrics'] as const;

export default function BetaRoadmapTimelineDiagramMobile() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [scenario, setScenario] = useState<'conservative' | 'optimistic'>('conservative');

  const currentTrack = tracks[currentTrackIndex];
  const trackMilestones = milestones.filter(m => m.track === currentTrack);
  const currentWeek = 1;

  const goToNextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setSelectedMilestone(null);
    }
  };

  const goToPrevTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      setSelectedMilestone(null);
    }
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-4 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Beta to Launch Roadmap
        </h3>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          6 months • 3 phases
        </p>

        {/* Current Position Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/20 rounded-full border border-[#D4AF37] mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
          <span className="text-xs text-[#D4AF37] font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Week {currentWeek}, Phase 1
          </span>
        </div>
      </div>

      {/* Track Navigation */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <button
          onClick={goToPrevTrack}
          disabled={currentTrackIndex === 0}
          className="p-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Previous track"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex-1 text-center">
          <div
            className="inline-block px-4 py-2 rounded-lg text-sm font-bold"
            style={{
              backgroundColor: `${trackColors[currentTrack]}30`,
              color: trackColors[currentTrack],
              fontFamily: 'JetBrains Mono, monospace'
            }}
          >
            {trackLabels[currentTrack]}
          </div>
        </div>

        <button
          onClick={goToNextTrack}
          disabled={currentTrackIndex === tracks.length - 1}
          className="p-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next track"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Track Progress Dots */}
      <div className="flex justify-center gap-2 mb-4">
        {tracks.map((track, index) => (
          <button
            key={track}
            onClick={() => {
              setCurrentTrackIndex(index);
              setSelectedMilestone(null);
            }}
            className="w-2 h-2 rounded-full transition-all"
            style={{
              backgroundColor: index === currentTrackIndex ? trackColors[track] : '#4A5568',
              width: index === currentTrackIndex ? '24px' : '8px'
            }}
            aria-label={`Go to ${trackLabels[track]}`}
          />
        ))}
      </div>

      {/* Milestones for Current Track */}
      <div className="space-y-3 mb-4">
        {trackMilestones.map((milestone) => {
          const Icon = milestone.icon;
          const isSelected = selectedMilestone === milestone.id;

          return (
            <div key={milestone.id}>
              <button
                onClick={() => setSelectedMilestone(isSelected ? null : milestone.id)}
                className="w-full text-left p-3 rounded-lg border-2 transition-all"
                style={{
                  backgroundColor: isSelected ? '#2D3748' : '#1A202C',
                  borderColor: isSelected ? trackColors[currentTrack] : '#4A5568'
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Milestone Icon */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: milestone.status === 'completed' ? '#48BB78' : milestone.status === 'in_progress' ? '#D4AF37' : trackColors[currentTrack]
                    }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Milestone Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {milestone.title}
                      </span>
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{
                          backgroundColor: `${trackColors[currentTrack]}30`,
                          color: trackColors[currentTrack],
                          fontFamily: 'JetBrains Mono, monospace'
                        }}
                      >
                        {milestone.phase}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {milestone.description}
                    </p>

                    {/* Expandable Key Metrics */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-gray-700 space-y-2">
                        <div className="text-xs text-gray-500 font-bold mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          KEY METRICS
                        </div>
                        {milestone.keyMetrics.map((metric, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div
                              className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                              style={{ backgroundColor: trackColors[currentTrack] }}
                            />
                            <span className="text-xs text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Scenario Toggle */}
      <div className="mb-4">
        <div className="text-xs text-gray-500 font-bold mb-2 text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          SCENARIO
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setScenario('conservative')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition ${scenario === 'conservative' ? 'bg-[#4299E1] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Conservative (60%)
          </button>
          <button
            onClick={() => setScenario('optimistic')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition ${scenario === 'optimistic' ? 'bg-[#48BB78] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Optimistic (30%)
          </button>
        </div>
      </div>

      {/* Bottom Scenario Stats */}
      <div className="pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          {scenario === 'conservative' ? (
            <>
              <div>
                <div className="text-xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  100
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Users (W8)
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#9F7AEA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  100K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Emails (W8)
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  1K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Waitlist (W12)
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  250
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Users (W8)
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#9F7AEA] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  500K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Emails (W8)
                </div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  5K
                </div>
                <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Waitlist (W12)
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

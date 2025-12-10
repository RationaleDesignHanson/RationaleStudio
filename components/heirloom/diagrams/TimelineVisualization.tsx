'use client';

import { useState } from 'react';
import { Check, Zap, Circle, Rocket } from 'lucide-react';

/**
 * TimelineVisualization: 5-Week Gantt with Velocity Metrics
 *
 * Shows development sprint timeline with progress indicators
 * and comparative velocity metrics below.
 */

interface Week {
  id: number;
  label: string;
  dateRange: string;
  tasks: string[];
  progress: number; // 0-100
  milestone?: string;
  milestoneIcon?: React.ComponentType<{ className?: string }>;
}

interface VelocityMetric {
  name: string;
  heirloomValue: string | number;
  heirloomBar: number; // 0-100 percentage for bar width
  industryValue: string | number;
  industryBar: number;
  improvement: string;
  improvementColor: string;
}

const weeks: Week[] = [
  {
    id: 1,
    label: 'Foundation',
    dateRange: 'Dec 1-7',
    tasks: [
      'SwiftData models (Recipe, RecipeStyle)',
      'CloudKit sync configuration',
      'Basic UI scaffold with SwiftUI'
    ],
    progress: 100,
    milestone: 'MVP Core'
  },
  {
    id: 2,
    label: 'Core Features',
    dateRange: 'Dec 8-14',
    tasks: [
      'Recipe import (URL → JSON-LD)',
      'Recipe card display + editing',
      'Shopping list aggregation',
      'iOS Reminders export'
    ],
    progress: 100,
    milestone: 'Feature Complete'
  },
  {
    id: 3,
    label: 'Polish & Sharing',
    dateRange: 'Dec 15-21',
    tasks: [
      'Share Extension (Safari)',
      'iCloud sync testing',
      'Search and filtering',
      'Recipe collections'
    ],
    progress: 100
  },
  {
    id: 4,
    label: 'TestFlight',
    dateRange: 'Dec 22-28',
    tasks: [
      'Beta build deployed',
      '20 testers invited',
      'Feedback loop established',
      'Bug fixes & performance'
    ],
    progress: 100,
    milestone: 'Beta Launch',
    milestoneIcon: Rocket
  },
  {
    id: 5,
    label: 'Personalization',
    dateRange: 'Dec 29-Jan 4',
    tasks: [
      'Card customization UI',
      'Sticker library (Phase 1: 20)',
      'Background selection',
      'Font options'
    ],
    progress: 40
  }
];

const velocityMetrics: VelocityMetric[] = [
  {
    name: 'MVP Development Time',
    heirloomValue: '5 weeks',
    heirloomBar: 36,
    industryValue: '14 weeks',
    industryBar: 100,
    improvement: '2.8x faster',
    improvementColor: '#48BB78'
  },
  {
    name: 'Recipe Import Coverage',
    heirloomValue: '500+ sites',
    heirloomBar: 100,
    industryValue: '150 sites',
    industryBar: 30,
    improvement: '3.3x more',
    improvementColor: '#4299E1'
  },
  {
    name: 'Core Features Shipped',
    heirloomValue: '12 features',
    heirloomBar: 100,
    industryValue: '6 features',
    industryBar: 50,
    improvement: '2x more',
    improvementColor: '#9F7AEA'
  },
  {
    name: 'Lines of Code',
    heirloomValue: '8,500 LOC',
    heirloomBar: 57,
    industryValue: '15,000 LOC',
    industryBar: 100,
    improvement: '43% leaner',
    improvementColor: '#F6AD55'
  }
];

export default function TimelineVisualization() {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  return (
    <div className="relative w-full bg-gradient-to-br from-[#FBF8F3] to-white rounded-2xl p-8 border-2 border-[#F4A460]/30 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[#2D2D2D] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Development Progress: Execution Velocity
        </h3>
        <p className="text-sm text-[#2D2D2D]/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Rapid iteration from concept to TestFlight beta
        </p>
      </div>

      {/* Timeline Section */}
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {weeks.map((week) => {
            const isInProgress = week.progress > 0 && week.progress < 100;
            const isComplete = week.progress === 100;
            const isHovered = hoveredWeek === week.id;
            const MilestoneIcon = week.milestoneIcon;

            return (
              <div
                key={week.id}
                className={`
                  p-4 rounded-2xl border-2 transition-all duration-300
                  ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
                `}
                style={{
                  backgroundColor: 'white',
                  borderColor: isComplete ? '#8B9F8D' : isInProgress ? '#E85D4D' : '#F4A460'
                }}
                onMouseEnter={() => setHoveredWeek(week.id)}
                onMouseLeave={() => setHoveredWeek(null)}
              >
                {/* Week Header */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4
                      className="text-sm font-bold text-[#2D2D2D]"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      Week {week.id}: {week.label}
                    </h4>
                    {isComplete && <Check className="w-5 h-5 text-[#8B9F8D]" />}
                    {isInProgress && <Zap className="w-5 h-5 text-[#E85D4D] animate-pulse" />}
                    {!isComplete && !isInProgress && <Circle className="w-5 h-5 text-[#F4A460]" />}
                  </div>
                  <p
                    className="text-xs text-[#2D2D2D]/70"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {week.dateRange}
                  </p>
                </div>

                {/* Tasks */}
                <div className="space-y-2 mb-3">
                  {week.tasks.map((task, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {isComplete ? (
                        <Check className="w-3 h-3 text-[#8B9F8D] mt-0.5 flex-shrink-0" />
                      ) : isInProgress && index < 2 ? (
                        <Zap className="w-3 h-3 text-[#E85D4D] mt-0.5 flex-shrink-0" />
                      ) : (
                        <Circle className="w-3 h-3 text-[#F4A460] mt-0.5 flex-shrink-0" />
                      )}
                      <span
                        className="text-[10px] text-[#2D2D2D]/70 leading-tight"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {task}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="h-2 bg-[#F4A460]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${week.progress}%`,
                        backgroundColor: isComplete ? '#8B9F8D' : '#E85D4D'
                      }}
                    />
                  </div>
                  <p
                    className="text-right text-[10px] text-[#2D2D2D]/70 mt-1"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {week.progress}%
                  </p>
                </div>

                {/* Milestone Badge */}
                {week.milestone && (
                  <div
                    className="flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-bold"
                    style={{
                      backgroundColor: isComplete ? '#8B9F8D20' : '#E85D4D20',
                      color: isComplete ? '#8B9F8D' : '#E85D4D',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {MilestoneIcon && <MilestoneIcon className="w-3 h-3" />}
                    {week.milestone}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Timeline Connector */}
        <div className="mt-4 flex justify-between px-8">
          {weeks.map((week, index) => (
            <div key={week.id} className="flex-1 flex items-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: week.progress === 100 ? '#8B9F8D' : week.progress > 0 ? '#E85D4D' : '#F4A460'
                }}
              />
              {index < weeks.length - 1 && (
                <div className="flex-1 h-0.5 bg-[#F4A460]/30 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Velocity Metrics Section */}
      <div className="pt-8 border-t-2 border-[#F4A460]/20">
        <h4
          className="text-lg font-bold text-[#2D2D2D] mb-6"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Execution Velocity
        </h4>

        <div className="space-y-6">
          {velocityMetrics.map((metric, index) => (
            <div key={index}>
              {/* Metric Name */}
              <div className="mb-2">
                <h5
                  className="text-sm font-bold text-[#2D2D2D] mb-1"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {metric.name}
                </h5>
              </div>

              {/* Heirloom Bar */}
              <div className="mb-2">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs text-[#2D2D2D]/70 w-24"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Heirloom
                  </span>
                  <div className="flex-1 h-6 bg-[#F4A460]/20 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${metric.heirloomBar}%`,
                        backgroundColor: '#E85D4D'
                      }}
                    />
                    <span
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-white"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {metric.heirloomValue}
                    </span>
                  </div>
                  <span
                    className="text-sm font-bold w-24 text-right"
                    style={{
                      color: metric.improvementColor,
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  >
                    {metric.improvement}
                  </span>
                </div>
              </div>

              {/* Industry Bar */}
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs text-[#2D2D2D]/50 w-24"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    Industry Avg
                  </span>
                  <div className="flex-1 h-6 bg-[#F4A460]/20 rounded-lg overflow-hidden relative">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${metric.industryBar}%`,
                        backgroundColor: '#8B9F8D'
                      }}
                    />
                    <span
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-[#2D2D2D]/70"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {metric.industryValue}
                    </span>
                  </div>
                  <div className="w-24" /> {/* Spacer for alignment */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-8 pt-6 border-t-2 border-[#F4A460]/20 text-center">
        <p className="text-sm text-[#2D2D2D]/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Why we're fast: Native iOS, SwiftData simplicity, Supabase backend, LLM parsing for edge cases
        </p>
      </div>
    </div>
  );
}

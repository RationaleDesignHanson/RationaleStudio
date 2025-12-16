/**
 * Pilot Timeline Slide
 *
 * Displays the 90-day pilot timeline using TimelineRoadmap component
 * with Terminal Republic styling and interactive phase details.
 */

'use client';

import { TimelineRoadmap, type TimelineItem } from '@/components/presentation';

const timelineItems: TimelineItem[] = [
  {
    id: '1',
    title: 'Kickoff & Setup',
    date: 'Week 1-2',
    description: 'Data collection, system setup, and agent training',
    status: 'upcoming',
    phase: 'Phase 1: Foundation',
    details: (
      <div className="space-y-2 text-xs">
        <p>• Capture session + data collection</p>
        <p>• Rules engine setup + compliance framework</p>
        <p>• Contract data collection + scenario modeling</p>
        <p className="text-terminal-gold font-bold mt-3">Time Investment: 8-10 hours</p>
      </div>
    )
  },
  {
    id: '2',
    title: 'Development & Training',
    date: 'Week 3-6',
    description: 'AI training, tool development, and quality validation',
    status: 'upcoming',
    phase: 'Phase 2: Build',
    details: (
      <div className="space-y-2 text-xs">
        <p>• AI training + quality validation</p>
        <p>• Agent training + deal template library</p>
        <p>• Interactive tool development</p>
        <p className="text-terminal-gold font-bold mt-3">Time Investment: 3-4 hours/week</p>
      </div>
    )
  },
  {
    id: '3',
    title: 'First Deployment',
    date: 'Week 6-8',
    description: 'Live campaigns, deal analysis, and interactive pitches',
    status: 'upcoming',
    phase: 'Phase 3: Launch',
    details: (
      <div className="space-y-2 text-xs">
        <p>✅ First regional campaign live (Week 6)</p>
        <p>✅ First deal analyzed (Week 4)</p>
        <p>✅ First interactive pitch (Week 3)</p>
        <p className="text-terminal-gold font-bold mt-3">Quick Wins Start Here</p>
      </div>
    )
  },
  {
    id: '4',
    title: 'Scale & Optimize',
    date: 'Week 9-12',
    description: 'Results analysis, optimization, and expansion planning',
    status: 'upcoming',
    phase: 'Phase 4: Results',
    details: (
      <div className="space-y-2 text-xs">
        <p>• 10+ regional campaigns deployed</p>
        <p>• 50+ deals processed with high accuracy</p>
        <p>• 20+ interactive pitches completed</p>
        <p className="text-terminal-gold font-bold mt-3">Time Investment: 2-3 hours/week</p>
      </div>
    )
  },
  {
    id: '5',
    title: 'Pilot Complete',
    date: 'Week 12',
    description: 'Final assessment and decision on full platform expansion',
    status: 'upcoming',
    phase: 'Phase 4: Results',
    details: (
      <div className="space-y-2 text-xs">
        <p className="font-bold">Success Criteria Met:</p>
        <p>• $50K-$150K in new deal revenue</p>
        <p>• 95%+ compliance accuracy rate</p>
        <p>• 15-25 point improvement in close rate</p>
        <p className="text-terminal-gold font-bold mt-3">Go/No-Go Decision Point</p>
      </div>
    )
  }
];

export default function PilotTimelineSlide() {
  return (
    <div className="relative pt-36 lg:pt-40 px-6 md:px-12 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/60" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-terminal-gold mb-4">
            90-Day Pilot Timeline
          </h2>
          <p className="text-gray-300 font-mono text-sm max-w-2xl mx-auto">
            2 modules: 8-10 weeks • 3 modules: 12 weeks • Flexible start based on your priorities
          </p>
        </div>

        {/* Timeline */}
        <TimelineRoadmap
          items={timelineItems}
          layout="vertical"
          showPhases={true}
          interactive={true}
        />

        {/* Bottom Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 rounded-lg bg-black/50 border border-terminal-gold/20">
            <div className="text-2xl font-mono font-bold text-terminal-gold mb-2">4-6 hrs/week</div>
            <div className="text-xs font-mono text-gray-400">Time Investment</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-black/50 border border-terminal-gold/20">
            <div className="text-2xl font-mono font-bold text-terminal-gold mb-2">3 Checkpoints</div>
            <div className="text-xs font-mono text-gray-400">Week 4, 8, 12</div>
          </div>
          <div className="text-center p-4 rounded-lg bg-black/50 border border-terminal-gold/20">
            <div className="text-2xl font-mono font-bold text-terminal-gold mb-2">Clear Exit Criteria</div>
            <div className="text-xs font-mono text-gray-400">Go/No-Go Decisions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

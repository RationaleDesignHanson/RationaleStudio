'use client';

import { useState } from 'react';
import { AF_COLORS } from '@/lib/athletes-first/content';

interface TimelineStep {
  number: string;
  title: string;
  duration?: string;
  timing?: string;
  content: React.ReactNode;
  color?: string;
}

interface CompactTimelineProps {
  steps: TimelineStep[];
  defaultExpanded?: number;
}

export default function CompactTimeline({ steps, defaultExpanded }: CompactTimelineProps) {
  const [expandedStep, setExpandedStep] = useState<number | null>(defaultExpanded ?? null);

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isExpanded = expandedStep === index;
        const color = step.color || AF_COLORS.primary;

        return (
          <div key={index} className="group">
            {/* Compact Header */}
            <button
              onClick={() => setExpandedStep(isExpanded ? null : index)}
              className="w-full bg-black/60 backdrop-blur-sm p-6 text-left hover:bg-black/70 transition-all shadow-xl border-l-2 flex items-center justify-between gap-6"
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-6 flex-1">
                {/* Number Badge */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-terminal font-bold text-lg flex-shrink-0"
                  style={{
                    backgroundColor: `${color}20`,
                    color: color
                  }}
                >
                  {step.number}
                </div>

                {/* Title & Duration */}
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white font-terminal mb-1 group-hover:text-[var(--af-secondary)] transition-colors">
                    {step.title}
                  </h4>
                  {(step.timing || step.duration) && (
                    <p className="text-white/50 font-terminal text-xs">
                      {step.timing && step.timing}
                      {step.timing && step.duration && ' • '}
                      {step.duration && step.duration}
                    </p>
                  )}
                </div>

                {/* Expand Icon */}
                <div
                  className="text-white/40 font-terminal text-lg transition-transform flex-shrink-0"
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                  }}
                >
                  ↓
                </div>
              </div>
            </button>

            {/* Expanded Content */}
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{
                maxHeight: isExpanded ? '5000px' : '0',
                opacity: isExpanded ? 1 : 0
              }}
            >
              <div className="bg-black/40 backdrop-blur-sm p-6 border-l-2 border-t-0" style={{ borderColor: color }}>
                {step.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * PhaseBreakdown Component
 *
 * Displays a project phase with tabbed content showing deliverables,
 * CEO responsibilities, and collaboration process. Includes collapsible
 * weekly details for granular task visibility.
 */

'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface Week {
  week: number;
  name: string;
  goal: string;
  ceoTasks: string[];
  engineeringTasks?: string[];
  deliverables: string[];
  checkpoint?: {
    name: string;
    critical: boolean;
  };
  timeEstimate?: string;
}

interface PhaseBreakdownProps {
  phaseNumber: number;
  phaseName: string;
  weeks: Week[];
  weekRange: string;
  totalTimeCommitment: string;
}

export function PhaseBreakdown({
  phaseNumber,
  phaseName,
  weeks,
  weekRange,
  totalTimeCommitment,
}: PhaseBreakdownProps) {
  const [activeTab, setActiveTab] = useState<'deliverables' | 'responsibilities' | 'process'>('deliverables');
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set());
  const theme = getSectionTheme('content');

  const toggleWeek = (weekNum: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekNum)) {
      newExpanded.delete(weekNum);
    } else {
      newExpanded.add(weekNum);
    }
    setExpandedWeeks(newExpanded);
  };

  return (
    <GlassCard theme={theme} className="p-6 sm:p-8">
      {/* Phase Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-foreground">
            Phase {phaseNumber}: {phaseName}
          </h3>
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
            {weekRange}
          </span>
        </div>
        <p className="text-sm text-muted">
          <span className="font-bold">Time Commitment:</span> {totalTimeCommitment}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border pb-4">
        <button
          onClick={() => setActiveTab('deliverables')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'deliverables'
              ? 'bg-accent text-white'
              : 'text-muted hover:text-foreground hover:bg-muted/50'
          }`}
        >
          What You'll Get
        </button>
        <button
          onClick={() => setActiveTab('responsibilities')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'responsibilities'
              ? 'bg-accent text-white'
              : 'text-muted hover:text-foreground hover:bg-muted/50'
          }`}
        >
          What We Need From You
        </button>
        <button
          onClick={() => setActiveTab('process')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'process'
              ? 'bg-accent text-white'
              : 'text-muted hover:text-foreground hover:bg-muted/50'
          }`}
        >
          How We Work
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'deliverables' && (
          <div className="space-y-4">
            {weeks.map((week) => (
              <div key={week.week} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleWeek(week.week)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">Week {week.week}</span>
                    <span className="text-foreground font-medium">{week.name}</span>
                    {week.checkpoint && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        week.checkpoint.critical
                          ? 'bg-red-500/20 text-red-600'
                          : 'bg-blue-500/20 text-blue-600'
                      }`}>
                        {week.checkpoint.critical ? 'Critical Checkpoint' : 'Checkpoint'}
                      </span>
                    )}
                  </div>
                  <span className="text-xl font-bold">{expandedWeeks.has(week.week) ? '−' : '+'}</span>
                </button>
                {expandedWeeks.has(week.week) && (
                  <div className="p-4 bg-background/50 border-t border-border">
                    <p className="text-sm text-muted mb-3"><strong>Goal:</strong> {week.goal}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-accent">Deliverables:</p>
                      <ul className="space-y-1 ml-5 list-disc">
                        {week.deliverables.map((deliverable, idx) => (
                          <li key={idx} className="text-sm text-muted">{deliverable}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'responsibilities' && (
          <div className="space-y-4">
            {weeks.map((week) => (
              <div key={week.week} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleWeek(week.week)}
                  className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-accent font-bold">Week {week.week}</span>
                    <span className="text-foreground font-medium">{week.name}</span>
                    {week.timeEstimate && (
                      <span className="text-xs text-muted">({week.timeEstimate})</span>
                    )}
                  </div>
                  <span className="text-xl font-bold">{expandedWeeks.has(week.week) ? '−' : '+'}</span>
                </button>
                {expandedWeeks.has(week.week) && (
                  <div className="p-4 bg-background/50 border-t border-border">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-accent">Your Responsibilities:</p>
                      <ul className="space-y-1 ml-5 list-disc">
                        {week.ceoTasks.map((task, idx) => (
                          <li key={idx} className="text-sm text-muted">{task}</li>
                        ))}
                      </ul>
                    </div>
                    {week.checkpoint && (
                      <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/30">
                        <p className="text-sm font-bold text-accent mb-1">
                          {week.checkpoint.name}
                        </p>
                        <p className="text-xs text-muted">
                          {week.checkpoint.critical
                            ? 'Critical decision gate - project pauses for review'
                            : 'Review checkpoint - opportunity to assess and adjust'}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted mb-4">
                Here's how we'll collaborate during this phase:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">Daily Communication</p>
                    <p className="text-xs text-muted">Async standup updates in Slack/project tool (5 min to review)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent font-bold">•</span>
                  <div>
                    <p className="text-sm font-bold text-foreground">Weekly Sync</p>
                    <p className="text-xs text-muted">60-minute meeting to review progress, demo features, and unblock decisions</p>
                  </div>
                </div>
                {weeks.some(w => w.checkpoint) && (
                  <div className="flex items-start gap-3">
                    <span className="text-accent font-bold">•</span>
                    <div>
                      <p className="text-sm font-bold text-foreground">Checkpoints</p>
                      <p className="text-xs text-muted">
                        {weeks.filter(w => w.checkpoint).map(w => `Week ${w.week}: ${w.checkpoint!.name}`).join(', ')}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-foreground">Weekly Breakdown:</p>
              {weeks.map((week) => (
                <div key={week.week} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-accent">Week {week.week}</span>
                    {week.timeEstimate && (
                      <span className="text-xs text-muted">{week.timeEstimate}</span>
                    )}
                  </div>
                  <p className="text-sm text-muted">{week.goal}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Expand/Collapse All */}
      <div className="mt-6 pt-4 border-t border-border flex justify-end">
        <button
          onClick={() => {
            if (expandedWeeks.size === weeks.length) {
              setExpandedWeeks(new Set());
            } else {
              setExpandedWeeks(new Set(weeks.map(w => w.week)));
            }
          }}
          className="text-sm text-accent hover:text-accent/80 font-medium"
        >
          {expandedWeeks.size === weeks.length ? 'Collapse All' : 'Expand All'}
        </button>
      </div>
    </GlassCard>
  );
}

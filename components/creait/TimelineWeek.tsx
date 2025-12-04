/**
 * TimelineWeek Component
 *
 * Displays a single week in the execution timeline with tasks and deliverables.
 * Shows different task lists for CEO, Engineering, Design, and Data teams.
 */

'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface Task {
  text: string;
  completed?: boolean;
}

interface TimelineWeekProps {
  week: number;
  name: string;
  goal: string;
  ceoTasks?: string[];
  engineeringTasks?: string[];
  designTasks?: string[];
  dataTasks?: string[];
  deliverables?: string[];
  isCheckpoint?: boolean;
  checkpointName?: string;
  defaultExpanded?: boolean;
}

export function TimelineWeek({
  week,
  name,
  goal,
  ceoTasks = [],
  engineeringTasks = [],
  designTasks = [],
  dataTasks = [],
  deliverables = [],
  isCheckpoint = false,
  checkpointName,
  defaultExpanded = false,
}: TimelineWeekProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const theme = getSectionTheme('default');

  const taskGroups = [
    { title: 'Product Tasks', tasks: ceoTasks, color: 'text-purple-600' },
    { title: 'Engineering', tasks: engineeringTasks, color: 'text-blue-600' },
    { title: 'Design', tasks: designTasks, color: 'text-green-600' },
    { title: 'Data', tasks: dataTasks, color: 'text-orange-600' },
  ].filter(group => group.tasks.length > 0);

  return (
    <GlassCard theme={theme} className="overflow-hidden">
      {/* Header - Clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/10 transition-colors text-left"
      >
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-lg font-bold text-accent">{week}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{name}</h3>
                <p className="text-sm text-muted">Week {week}</p>
              </div>
            </div>
            {isCheckpoint && checkpointName && (
              <span className="px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full bg-red-500/10 text-red-600 border border-red-200">
                Checkpoint: {checkpointName}
              </span>
            )}
          </div>
          <p className="text-sm text-muted">{goal}</p>
        </div>
        <svg
          className={`w-5 h-5 text-muted transition-transform flex-shrink-0 ml-4 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-border space-y-6">
          {/* Task Groups */}
          {taskGroups.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {taskGroups.map((group, idx) => (
                <div key={idx}>
                  <h4 className={`text-sm font-semibold mb-3 ${group.color}`}>
                    {group.title}
                  </h4>
                  <ul className="space-y-2">
                    {group.tasks.map((task, taskIdx) => (
                      <li key={taskIdx} className="flex items-start gap-2 text-sm">
                        <span className="text-accent mt-1 flex-shrink-0">□</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Deliverables */}
          {deliverables.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-accent mb-3">
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {deliverables.map((deliverable, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1 flex-shrink-0">→</span>
                    <span>{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}

/**
 * CheckpointCard Component
 *
 * Displays CEO checkpoint review information including critical questions,
 * red flags, success criteria, and decision frameworks.
 */

'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface CriticalQuestion {
  q: string;
  good: string;
  bad: string;
}

interface CheckpointCardProps {
  id: number;
  week: number;
  name: string;
  type: string;
  purpose: string;
  deliverables: string[];
  successCriteria: string[];
  redFlags: string[];
  criticalQuestions?: CriticalQuestion[];
  defaultExpanded?: boolean;
}

export function CheckpointCard({
  id,
  week,
  name,
  type,
  purpose,
  deliverables,
  successCriteria,
  redFlags,
  criticalQuestions = [],
  defaultExpanded = false,
}: CheckpointCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const theme = getSectionTheme('default');

  const typeColors: Record<string, string> = {
    design: 'bg-green-500/10 text-green-600 border-green-200',
    data: 'bg-orange-500/10 text-orange-600 border-orange-200',
    technical: 'bg-blue-500/10 text-blue-600 border-blue-200',
    integration: 'bg-purple-500/10 text-purple-600 border-purple-200',
    qa: 'bg-pink-500/10 text-pink-600 border-pink-200',
    launch: 'bg-red-500/10 text-red-600 border-red-200',
  };

  const colorClass = typeColors[type] || 'bg-accent/10 text-accent border-accent/20';

  return (
    <GlassCard theme={theme} className="overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 bg-muted/20">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-200">
              <span className="text-2xl font-bold text-red-600">{id}</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{name}</h3>
              <p className="text-sm text-muted">Week {week}</p>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wide rounded-full border ${colorClass}`}>
            {type}
          </span>
        </div>
        <p className="text-sm text-muted italic">{purpose}</p>
      </div>

      {/* Quick Summary */}
      <div className="px-6 py-4 grid sm:grid-cols-3 gap-4 border-b border-border">
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
            Deliverables
          </div>
          <div className="text-lg font-bold text-accent">{deliverables.length}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
            Success Criteria
          </div>
          <div className="text-lg font-bold text-accent">{successCriteria.length}</div>
        </div>
        <div>
          <div className="text-xs font-medium text-muted uppercase tracking-wide mb-1">
            Red Flags
          </div>
          <div className="text-lg font-bold text-red-600">{redFlags.length}</div>
        </div>
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-3 flex items-center justify-center gap-2 hover:bg-muted/10 transition-colors border-b border-border"
      >
        <span className="text-sm font-medium text-accent">
          {isExpanded ? 'Hide Details' : 'Show Details'}
        </span>
        <svg
          className={`w-4 h-4 text-accent transition-transform ${
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
        <div className="px-6 py-6 space-y-6">
          {/* Deliverables */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-3">
              Required Deliverables
            </h4>
            <ul className="space-y-2">
              {deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-1 flex-shrink-0">□</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Success Criteria */}
          <div>
            <h4 className="text-base font-semibold text-foreground mb-3">
              Success Criteria
            </h4>
            <ul className="space-y-2">
              {successCriteria.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Red Flags */}
          <div>
            <h4 className="text-base font-semibold text-red-600 mb-3">
              ⚠ Red Flags (No-Go Signals)
            </h4>
            <ul className="space-y-2">
              {redFlags.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <span className="text-red-600 mt-1 flex-shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Critical Questions */}
          {criticalQuestions.length > 0 && (
            <div>
              <h4 className="text-base font-semibold text-foreground mb-3">
                Critical Questions
              </h4>
              <div className="space-y-4">
                {criticalQuestions.map((question, idx) => (
                  <div key={idx} className="p-4 rounded-lg border border-border bg-muted/20">
                    <p className="text-sm font-medium text-foreground mb-3">
                      {question.q}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded bg-green-500/10 border border-green-200">
                        <div className="text-xs font-medium text-green-600 uppercase tracking-wide mb-1">
                          ✓ Good Answer
                        </div>
                        <p className="text-xs text-foreground">{question.good}</p>
                      </div>
                      <div className="p-3 rounded bg-red-500/10 border border-red-200">
                        <div className="text-xs font-medium text-red-600 uppercase tracking-wide mb-1">
                          ✗ Bad Answer
                        </div>
                        <p className="text-xs text-foreground">{question.bad}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}

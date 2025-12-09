/**
 * TimelineRoadmap Component
 *
 * Interactive timeline visualization for project roadmaps, execution plans,
 * and chronological storytelling.
 *
 * Features:
 * - Horizontal or vertical layouts
 * - Expandable milestone details
 * - Status indicators (complete, active, upcoming)
 * - Phase grouping
 * - Terminal-style aesthetics with shader integration
 */

'use client';

import { useState, ReactNode } from 'react';

export interface TimelineItem {
  id: string;
  title: string;
  date?: string;
  description?: string;
  details?: ReactNode;
  status?: 'complete' | 'active' | 'upcoming';
  phase?: string;
  icon?: ReactNode;
  color?: string;
}

export interface TimelineRoadmapProps {
  items: TimelineItem[];
  title?: string;
  layout?: 'horizontal' | 'vertical';
  showPhases?: boolean;
  interactive?: boolean;
  className?: string;
}

export function TimelineRoadmap({
  items,
  title,
  layout = 'vertical',
  showPhases = true,
  interactive = true,
  className = '',
}: TimelineRoadmapProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Group items by phase
  const itemsByPhase = items.reduce((acc, item) => {
    const phase = item.phase || 'default';
    if (!acc[phase]) acc[phase] = [];
    acc[phase].push(item);
    return acc;
  }, {} as Record<string, TimelineItem[]>);

  const phases = Object.keys(itemsByPhase);
  const shouldGroupByPhase = showPhases && phases.length > 1;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-500';
      case 'active':
        return 'bg-[#FFD700]';
      case 'upcoming':
        return 'bg-gray-600';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusBorderColor = (status?: string) => {
    switch (status) {
      case 'complete':
        return 'border-green-500/50';
      case 'active':
        return 'border-[#FFD700]';
      case 'upcoming':
        return 'border-gray-700';
      default:
        return 'border-gray-700';
    }
  };

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean) => {
    const isExpanded = expandedItem === item.id;

    return (
      <div key={item.id} className="relative">
        {/* Timeline Marker */}
        <div className="flex items-start gap-4">
          {/* Vertical Line & Dot */}
          <div className="relative flex flex-col items-center">
            {/* Dot */}
            <div
              className={`w-4 h-4 rounded-full border-2 ${getStatusColor(
                item.status
              )} ${getStatusBorderColor(item.status)} z-10`}
            >
              {item.status === 'complete' && (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Connecting Line */}
            {!isLast && (
              <div className={`w-px flex-1 ${getStatusColor(item.status)} opacity-30 mt-2`} style={{ minHeight: '40px' }} />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-8">
            {/* Card */}
            <div
              className={`rounded-lg border-2 ${getStatusBorderColor(
                item.status
              )} bg-gray-900/50 p-4 transition-all duration-200 ${
                interactive ? 'cursor-pointer hover:scale-[1.02]' : ''
              } ${
                isExpanded
                  ? 'bg-terminal-gold/10 border-terminal-gold shadow-lg shadow-[#FFD700]/20'
                  : ''
              }`}
              onClick={() =>
                interactive && setExpandedItem(isExpanded ? null : item.id)
              }
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  {item.icon && (
                    <div className="flex-shrink-0 text-terminal-gold">{item.icon}</div>
                  )}

                  {/* Title & Date */}
                  <div>
                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        isExpanded ? 'text-terminal-gold' : 'text-gray-100'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {item.date && (
                      <div className="text-xs font-mono text-gray-500 mt-1">
                        {item.date}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Badge */}
                {item.status && (
                  <div className={`px-2 py-1 rounded text-xs font-mono ${
                    item.status === 'complete'
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : item.status === 'active'
                      ? 'bg-terminal-gold/20 text-terminal-gold border border-terminal-gold/30'
                      : 'bg-gray-800 text-gray-500 border border-gray-700'
                  }`}>
                    {item.status.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-xs text-gray-400 leading-relaxed mb-2">
                  {item.description}
                </p>
              )}

              {/* Expanded Details */}
              {isExpanded && item.details && (
                <div className="mt-4 pt-4 border-t border-terminal-gold/20">
                  <div className="text-xs text-gray-300">{item.details}</div>
                </div>
              )}

              {/* Expand Indicator */}
              {interactive && item.details && (
                <div className="mt-2 flex items-center gap-1 text-xs font-mono text-gray-600">
                  <span>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
                  <svg
                    className={`w-3 h-3 transition-transform ${
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
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPhaseGroup = (phase: string, phaseItems: TimelineItem[]) => {
    return (
      <div key={phase} className="mb-12">
        {/* Phase Header */}
        {phase !== 'default' && (
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-terminal-gold" />
                <div className="w-2 h-2 rounded-full bg-terminal-gold/60" />
                <div className="w-2 h-2 rounded-full bg-terminal-gold/30" />
              </div>
              <h3 className="text-lg font-semibold text-gray-100">{phase}</h3>
            </div>
            <div className="mt-2 h-px bg-terminal-gold/20" />
          </div>
        )}

        {/* Phase Items */}
        <div>
          {phaseItems.map((item, index) =>
            renderTimelineItem(item, index, index === phaseItems.length - 1)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Title */}
      {title && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-terminal-gold" />
              <div className="w-2 h-2 rounded-full bg-terminal-gold/60" />
              <div className="w-2 h-2 rounded-full bg-terminal-gold/30" />
            </div>
            <h2 className="text-xl font-semibold text-gray-100">{title}</h2>
          </div>
          <div className="h-px bg-terminal-gold/20" />
        </div>
      )}

      {/* Timeline */}
      {shouldGroupByPhase ? (
        <div>
          {phases.map((phase) => renderPhaseGroup(phase, itemsByPhase[phase]))}
        </div>
      ) : (
        <div>
          {items.map((item, index) =>
            renderTimelineItem(item, index, index === items.length - 1)
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Compact Timeline
 *
 * Minimal timeline for simpler displays.
 */
export interface CompactTimelineItem {
  label: string;
  date?: string;
  status?: 'complete' | 'active' | 'upcoming';
}

export interface CompactTimelineProps {
  items: CompactTimelineItem[];
  className?: string;
}

export function CompactTimeline({ items, className = '' }: CompactTimelineProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {/* Dot */}
          <div
            className={`w-2 h-2 rounded-full ${
              item.status === 'complete'
                ? 'bg-green-500'
                : item.status === 'active'
                ? 'bg-terminal-gold'
                : 'bg-gray-600'
            }`}
            title={`${item.label}${item.date ? ` (${item.date})` : ''}`}
          />

          {/* Connector */}
          {index < items.length - 1 && (
            <div className="w-4 h-px bg-gray-700" />
          )}
        </div>
      ))}
    </div>
  );
}

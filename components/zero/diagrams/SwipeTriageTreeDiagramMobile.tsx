'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * SwipeTriageTreeDiagram: Mobile Accordion View
 *
 * Shows 4 swipe directions as expandable cards
 * Each direction reveals intelligent sub-actions
 */

interface SwipeAction {
  direction: 'left' | 'right' | 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  primaryAction: string;
  subActions: { name: string; condition: string; example: string }[];
  timeSaved: string;
}

const swipeActions: SwipeAction[] = [
  {
    direction: 'left',
    icon: ArrowLeft,
    color: '#4299E1',
    primaryAction: 'Mark as Read',
    subActions: [
      { name: 'Archive & Mark Read', condition: 'Newsletter/digest (read, not actionable)', example: 'Weekly product updates' },
      { name: 'Clear Notification', condition: 'FYI email needing acknowledgment', example: '"Meeting notes attached"' },
      { name: 'Quick Skim & Done', condition: 'Short updates or confirmations', example: '"Your order confirmed"' }
    ],
    timeSaved: '2 sec vs 10 sec'
  },
  {
    direction: 'right',
    icon: ArrowRight,
    color: '#48BB78',
    primaryAction: 'Take Action',
    subActions: [
      { name: 'Add to Calendar', condition: 'Meeting invite detected', example: '"Zoom call tomorrow 2pm"' },
      { name: 'Track Package', condition: 'Shipping confirmation', example: '"Your order has shipped"' },
      { name: 'Execute Smart Action', condition: 'Action detected by AI', example: '"RSVP to event" or "Buy Now"' }
    ],
    timeSaved: '10 sec vs 45 sec'
  },
  {
    direction: 'up',
    icon: ArrowUp,
    color: '#F6AD55',
    primaryAction: 'Change Action',
    subActions: [
      { name: 'Pick Different Action', condition: 'AI suggested wrong action', example: 'Change "Reply" to "Archive"' },
      { name: 'Customize Response', condition: 'Need specific reply tone', example: 'Formal vs casual response' },
      { name: 'Switch Action Type', condition: 'Multiple action options', example: 'Calendar vs Task vs Reply' }
    ],
    timeSaved: '5 sec vs 30 sec'
  },
  {
    direction: 'down',
    icon: ArrowDown,
    color: '#9F7AEA',
    primaryAction: 'Snooze (Intelligent Timing)',
    subActions: [
      { name: 'Tonight (6pm)', condition: 'Work email after hours', example: 'Project update at 8pm' },
      { name: 'Tomorrow (9am)', condition: 'Non-urgent task', example: '"Please review when you can"' },
      { name: 'Next Week', condition: 'Future event reminder', example: 'Conference registration' }
    ],
    timeSaved: '3 sec vs 20 sec'
  }
];

export default function SwipeTriageTreeDiagramMobile() {
  const [expandedDirection, setExpandedDirection] = useState<string | null>('left');

  const toggleDirection = (direction: string) => {
    setExpandedDirection(expandedDirection === direction ? null : direction);
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-4 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Swipe Triage Gestures
        </h3>
        <p className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          4 gestures replace 20+ actions
        </p>
        <p className="text-xs text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          10 emails in 30 seconds
        </p>
      </div>

      {/* Swipe Direction Cards */}
      <div className="space-y-3">
        {swipeActions.map((action) => {
          const Icon = action.icon;
          const isExpanded = expandedDirection === action.direction;

          return (
            <div key={action.direction}>
              <button
                onClick={() => toggleDirection(action.direction)}
                className="w-full p-4 rounded-lg border-2 transition-all text-left"
                style={{
                  backgroundColor: isExpanded ? '#2D3748' : '#1A202C',
                  borderColor: isExpanded ? action.color : '#4A5568',
                  boxShadow: isExpanded ? `0 0 20px ${action.color}40` : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Direction Icon */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${action.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: action.color }} />
                    </div>

                    {/* Action Info */}
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {action.primaryAction}
                      </div>
                      <div className="text-xs" style={{ color: action.color, fontFamily: 'JetBrains Mono, monospace' }}>
                        ⚡ {action.timeSaved}
                      </div>
                    </div>
                  </div>

                  {/* Expand/Collapse Icon */}
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>

                {/* Variants Count (when collapsed) */}
                {!isExpanded && (
                  <div className="mt-2 text-xs text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {action.subActions.length} intelligent variants
                  </div>
                )}
              </button>

              {/* Expanded Sub-Actions */}
              {isExpanded && (
                <div className="mt-2 space-y-2 pl-4">
                  {/* Context Description */}
                  <div className="p-3 bg-[#2D3748] rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      AI decides which action based on email context:
                    </div>
                  </div>

                  {/* Sub-Actions */}
                  {action.subActions.map((subAction, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: '#2D3748',
                        borderColor: action.color,
                        borderLeftWidth: '3px'
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                          style={{
                            backgroundColor: `${action.color}30`,
                            color: action.color,
                            fontFamily: 'JetBrains Mono, monospace'
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold text-white mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            {subAction.name}
                          </div>
                          <div className="text-xs text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                            When: {subAction.condition}
                          </div>
                          <div
                            className="text-xs italic p-2 rounded bg-[#1A202C]"
                            style={{ color: action.color, fontFamily: 'JetBrains Mono, monospace' }}
                          >
                            Example: {subAction.example}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              4
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Swipe gestures
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              10/min
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Emails triaged
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Trash2, Archive, Calendar, Reply } from 'lucide-react';

/**
 * SwipeTriageTreeDiagram: Radial Decision Tree
 *
 * Shows how 4 swipe directions trigger context-aware actions
 * Center = email card, 4 directional branches with action logic
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
    color: '#4299E1', // Blue
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
    color: '#48BB78', // Green
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
    color: '#F6AD55', // Orange
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
    color: '#9F7AEA', // Purple
    primaryAction: 'Snooze (Intelligent Timing)',
    subActions: [
      { name: 'Tonight (6pm)', condition: 'Work email after hours', example: 'Project update at 8pm' },
      { name: 'Tomorrow (9am)', condition: 'Non-urgent task', example: '"Please review when you can"' },
      { name: 'Next Week', condition: 'Future event reminder', example: 'Conference registration' }
    ],
    timeSaved: '3 sec vs 20 sec'
  }
];

export default function SwipeTriageTreeDiagram() {
  const [hoveredDirection, setHoveredDirection] = useState<string | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;
    setDragPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setDragPosition(null);
  };

  // Determine which direction is being dragged
  const getDragDirection = () => {
    if (!dragPosition) return null;
    const { x, y } = dragPosition;
    const threshold = 30;
    if (Math.abs(x) > Math.abs(y)) {
      return x < -threshold ? 'left' : x > threshold ? 'right' : null;
    } else {
      return y < -threshold ? 'up' : y > threshold ? 'down' : null;
    }
  };

  const dragDirection = getDragDirection();

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-8 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Swipe Triage: 4 Gestures Replace 20+ Actions
        </h3>
        <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Context-aware intelligence • 10 emails in 30 seconds
        </p>
        <p className="text-xs text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          ↓ Drag the email card in any direction to preview actions ↓
        </p>
      </div>

      {/* Interactive Radial Diagram */}
      <div className="relative flex justify-center mb-8">
        <div
          className="relative w-full max-w-2xl aspect-square"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Center Email Card */}
          <div
            className="absolute top-1/2 left-1/2 w-32 h-40 -mt-20 -ml-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-2xl border-2 border-[#D4AF37] cursor-move flex items-center justify-center transition-all"
            style={{
              transform: dragPosition ? `translate(${dragPosition.x * 0.2}px, ${dragPosition.y * 0.2}px)` : 'none',
              boxShadow: dragDirection ? `0 0 30px ${swipeActions.find(a => a.direction === dragDirection)?.color}80` : '0 0 20px rgba(212, 175, 55, 0.3)'
            }}
          >
            <div className="text-center p-3">
              <div className="text-xs font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Email
              </div>
              <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Swipe to triage
              </div>
            </div>
          </div>

          {/* 4 Directional Action Zones */}
          {swipeActions.map((action) => {
            const Icon = action.icon;
            const isHighlighted = hoveredDirection === action.direction || selectedDirection === action.direction || dragDirection === action.direction;

            // Position calculations for radial layout
            const positions = {
              left: 'left-0 top-1/2 -translate-y-1/2',
              right: 'right-0 top-1/2 -translate-y-1/2',
              up: 'top-0 left-1/2 -translate-x-1/2',
              down: 'bottom-0 left-1/2 -translate-x-1/2'
            };

            return (
              <div
                key={action.direction}
                className={`absolute ${positions[action.direction]} p-4 rounded-lg border-2 cursor-pointer transition-all w-48`}
                style={{
                  backgroundColor: isHighlighted ? `${action.color}20` : '#2D3748',
                  borderColor: isHighlighted ? action.color : '#4A5568',
                  boxShadow: isHighlighted ? `0 0 20px ${action.color}40` : 'none',
                  transform: isHighlighted ? 'scale(1.05)' : 'scale(1)'
                }}
                onMouseEnter={() => setHoveredDirection(action.direction)}
                onMouseLeave={() => setHoveredDirection(null)}
                onClick={() => setSelectedDirection(selectedDirection === action.direction ? null : action.direction)}
              >
                {/* Direction Icon */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-full" style={{ backgroundColor: `${action.color}30` }}>
                    <span style={{ color: action.color }}>
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                {/* Primary Action */}
                <div className="text-xs font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {action.primaryAction}
                </div>

                {/* Time Saved */}
                <div className="text-[10px] text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  ⚡ {action.timeSaved}
                </div>

                {/* Sub-actions count */}
                <div className="text-[9px] text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {action.subActions.length} intelligent variants
                </div>
              </div>
            );
          })}

          {/* Connecting Lines (subtle) */}
          <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
            {/* Left line */}
            <line x1="50%" y1="50%" x2="10%" y2="50%" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            {/* Right line */}
            <line x1="50%" y1="50%" x2="90%" y2="50%" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            {/* Up line */}
            <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
            {/* Down line */}
            <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          </svg>
        </div>
      </div>

      {/* Selected Action Details */}
      {selectedDirection && (
        <div className="p-6 bg-[#2D3748] rounded-lg border-2" style={{ borderColor: swipeActions.find(a => a.direction === selectedDirection)?.color }}>
          <div className="flex items-center gap-3 mb-4">
            <div>
              <div className="text-sm font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {swipeActions.find(a => a.direction === selectedDirection)?.primaryAction}
              </div>
              <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                AI decides which action based on email context
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {swipeActions.find(a => a.direction === selectedDirection)?.subActions.map((subAction, idx) => (
              <div key={idx} className="p-3 bg-[#1A202C] rounded border border-gray-700">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{
                    backgroundColor: `${swipeActions.find(a => a.direction === selectedDirection)?.color}30`,
                    color: swipeActions.find(a => a.direction === selectedDirection)?.color
                  }}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {subAction.name}
                    </div>
                    <div className="text-[10px] text-gray-400 mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      When: {subAction.condition}
                    </div>
                    <div className="text-[10px] text-gray-500 italic" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Example: {subAction.example}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

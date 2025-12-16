'use client';

import { useState } from 'react';
import { TrendingDown, Search, Zap, Star, Target } from 'lucide-react';

/**
 * InboxJourneyDiagram: Chaos → Zero Journey
 *
 * Emotional narrative showing user transformation with emotion curve overlay
 * 5 stages: Chaos → Discovery → Flow State → Mastery → Zero Maintained
 */

interface JourneyStage {
  id: number;
  name: string;
  emotion: string;
  emotionLevel: number; // 0-100
  inboxCount: number;
  timeSpent: string;
  icon: React.ComponentType<{ className?: string }>;
  emoji: string;
  description: string;
  keyMetric: string;
  screenshot: string;
}

const stages: JourneyStage[] = [
  {
    id: 1,
    name: 'Chaos',
    emotion: 'Overwhelmed',
    emotionLevel: 20,
    inboxCount: 1847,
    timeSpent: '45 min/day',
    icon: TrendingDown,
    emoji: '😰',
    description: '1,847 unread emails, notification anxiety, missed opportunities buried in clutter',
    keyMetric: '0 emails per day cleared',
    screenshot: 'Overflowing inbox list'
  },
  {
    id: 2,
    name: 'Discovery',
    emotion: 'Hopeful',
    emotionLevel: 45,
    inboxCount: 847,
    timeSpent: '30 min/day',
    icon: Search,
    emoji: '🤔',
    description: 'First swipe session, AI classifies backlog overnight, patterns emerge',
    keyMetric: '1,000 emails triaged',
    screenshot: 'AI classification in progress'
  },
  {
    id: 3,
    name: 'Flow State',
    emotion: 'Focused',
    emotionLevel: 75,
    inboxCount: 127,
    timeSpent: '15 min/day',
    icon: Zap,
    emoji: '😌',
    description: 'Swipe triage becomes muscle memory, 10 emails/minute processed effortlessly',
    keyMetric: '720 emails cleared',
    screenshot: 'Swipe gestures in action'
  },
  {
    id: 4,
    name: 'Mastery',
    emotion: 'Confident',
    emotionLevel: 90,
    inboxCount: 12,
    timeSpent: '8 min/day',
    icon: Star,
    emoji: '😎',
    description: 'Smart actions auto-handle 60% of emails, summaries replace full reading',
    keyMetric: '115 emails cleared',
    screenshot: 'Auto-handled actions'
  },
  {
    id: 5,
    name: 'Zero Maintained',
    emotion: 'In Control',
    emotionLevel: 95,
    inboxCount: 0,
    timeSpent: '5 min/day',
    icon: Target,
    emoji: '🎯',
    description: 'Daily 5-minute routine, proactive not reactive, inbox zero daily',
    keyMetric: '12 emails cleared',
    screenshot: 'Empty inbox screen'
  }
];

export default function InboxJourneyDiagram() {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);
  const [selectedStage, setSelectedStage] = useState<number | null>(null);

  // Generate SVG path for emotion curve
  const generateEmotionCurvePath = () => {
    const width = 1200;
    const height = 180;
    const padding = 50;
    const usableWidth = width - (padding * 2);
    const stageWidth = usableWidth / 4;

    const points = stages.map((stage, index) => {
      const x = padding + (stageWidth * index);
      const y = height - (stage.emotionLevel / 100 * (height - 40)) - 20;
      return { x, y };
    });

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const current = points[i];
      const next = points[i + 1];
      const midX = (current.x + next.x) / 2;
      path += ` Q ${midX} ${current.y}, ${midX} ${(current.y + next.y) / 2}`;
      path += ` Q ${midX} ${next.y}, ${next.x} ${next.y}`;
    }

    return { path, points, width, height };
  };

  const { path, points, width, height } = generateEmotionCurvePath();

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-8 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          From Chaos to Control: The Zero Journey
        </h3>
        <p className="text-sm text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          1,847 emails → 0 in 30 days • 45 min → 5 min per day
        </p>
      </div>

      {/* Emotion Curve Visualization */}
      <div className="mb-8">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxHeight: '180px' }}
        >
          {/* Grid lines */}
          <line x1="50" y1="40" x2="1150" y2="40" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="50" y1="105" x2="1150" y2="105" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
          <line x1="50" y1="170" x2="1150" y2="170" stroke="#4A5568" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />

          {/* Y-axis labels */}
          <text x="10" y="45" fill="#A0AEC0" fontSize="11" fontFamily="JetBrains Mono">😊</text>
          <text x="10" y="110" fill="#A0AEC0" fontSize="11" fontFamily="JetBrains Mono">😐</text>
          <text x="10" y="175" fill="#A0AEC0" fontSize="11" fontFamily="JetBrains Mono">😟</text>

          {/* Emotion curve */}
          <path
            d={path}
            stroke="#D4AF37"
            strokeWidth="3"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))'
            }}
          />

          {/* Stage milestone points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredStage === stages[index].id || selectedStage === stages[index].id ? 10 : 7}
                fill={hoveredStage === stages[index].id || selectedStage === stages[index].id ? '#D4AF37' : '#4299E1'}
                stroke="var(--color-text-charcoal)"
                strokeWidth="2"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredStage(stages[index].id)}
                onMouseLeave={() => setHoveredStage(null)}
                onClick={() => setSelectedStage(selectedStage === stages[index].id ? null : stages[index].id)}
              />
              {/* Emotion label */}
              <text
                x={point.x}
                y={point.y - 18}
                fill="#FFFFFF"
                fontSize="10"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
                fontWeight="bold"
              >
                {stages[index].emotion}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Stage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isHighlighted = hoveredStage === stage.id || selectedStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`
                p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                ${isHighlighted ? 'scale-105' : 'scale-100'}
              `}
              style={{
                backgroundColor: '#2D3748',
                borderColor: isHighlighted ? '#D4AF37' : '#4A5568',
                boxShadow: isHighlighted ? '0 0 20px rgba(212, 175, 55, 0.3)' : 'none'
              }}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setSelectedStage(selectedStage === stage.id ? null : stage.id)}
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-3">
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: '#D4AF37',
                    color: 'var(--color-text-charcoal)',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  {stage.id}
                </div>
                <span className="text-2xl">{stage.emoji}</span>
              </div>

              {/* Stage Name */}
              <h4 className="text-xs font-bold text-white mb-2 uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {stage.name}
              </h4>

              {/* Key Metrics */}
              <div className="space-y-2 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Inbox:</span>
                  <span className="text-xs font-bold text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stage.inboxCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Time:</span>
                  <span className="text-xs font-bold text-[#4299E1]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stage.timeSpent}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-600 mb-3" />

              {/* Description (expanded when selected) */}
              {selectedStage === stage.id ? (
                <div className="space-y-2">
                  <p className="text-[10px] text-gray-300 leading-relaxed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {stage.description}
                  </p>
                  <div className="pt-2 border-t border-gray-600">
                    <div className="text-[9px] text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      KEY METRIC
                    </div>
                    <div className="text-[10px] text-[#48BB78] font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {stage.keyMetric}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-500" />
                  <span className="text-[9px] text-gray-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    Click to expand
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Timeline Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              1,847 → 0
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Emails cleared in 30 days
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              89%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Time saved per day
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              60%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Emails auto-handled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

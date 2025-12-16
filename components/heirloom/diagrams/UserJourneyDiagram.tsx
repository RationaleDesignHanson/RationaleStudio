'use client';

import { useState } from 'react';
import { Compass, Wand2, Palette, Send, ShoppingBag, Info } from 'lucide-react';

/**
 * UserJourneyDiagram: 5-Stage Flow with Emotion Curve
 *
 * Shows the transformation from chaos to confidence across:
 * Discover → Import → Customize → Share → Cook
 *
 * Includes emotion curve overlay and expandable stage cards.
 */

interface Stage {
  id: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  colorAccent: string;
  emotionLabel: string;
  emotionLevel: number; // 0-100 for curve positioning
  userAction: string;
  painPoint: string;
  solution: string;
  emoji: string;
}

const stages: Stage[] = [
  {
    id: 1,
    name: 'DISCOVER',
    icon: Compass,
    colorAccent: '#F6AD55', // Orange
    emotionLabel: 'Relieved',
    emotionLevel: 30,
    userAction: 'Browsing recipe websites, scrolling Instagram, flipping through cookbooks',
    painPoint: 'Recipes scattered everywhere, no single place to save',
    solution: 'Share Extension works from Safari, Instagram, any app',
    emoji: '😌'
  },
  {
    id: 2,
    name: 'IMPORT',
    icon: Wand2,
    colorAccent: '#4299E1', // Blue
    emotionLabel: 'Delighted',
    emotionLevel: 85,
    userAction: 'Paste URL or photograph cookbook page',
    painPoint: 'Recipe sites bury ingredients, manual transcription takes forever',
    solution: 'AI strips fluff instantly, Vision OCR extracts cookbook text',
    emoji: '🤩'
  },
  {
    id: 3,
    name: 'CUSTOMIZE',
    icon: Palette,
    colorAccent: '#9F7AEA', // Purple
    emotionLabel: 'Proud',
    emotionLevel: 70,
    userAction: 'Add stickers, write notes, choose background',
    painPoint: 'Other apps treat recipes as sterile data',
    solution: 'Make it yours—personality, context, stories preserved',
    emoji: '😊'
  },
  {
    id: 4,
    name: 'SHARE',
    icon: Send,
    colorAccent: '#48BB78', // Green
    emotionLabel: 'Connected',
    emotionLevel: 75,
    userAction: 'Send recipe to friend or family member',
    painPoint: 'Sharing URLs loses your modifications, plain text is boring',
    solution: 'Your styled card travels intact—they see your version',
    emoji: '🥰'
  },
  {
    id: 5,
    name: 'COOK',
    icon: ShoppingBag,
    colorAccent: '#D4AF37', // Terminal gold
    emotionLabel: 'Confident',
    emotionLevel: 90,
    userAction: 'Build shopping list from 3 recipes, export to Reminders',
    painPoint: 'Manually copying ingredients, forgetting items at store',
    solution: 'Smart aggregation, auto-categorization, Apple Watch support',
    emoji: '👨‍🍳'
  }
];

export default function UserJourneyDiagram() {
  const [expandedStage, setExpandedStage] = useState<number | null>(null);
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  // Generate SVG path for emotion curve
  const generateEmotionCurvePath = () => {
    const width = 1200;
    const height = 200;
    const padding = 50;
    const usableWidth = width - (padding * 2);
    const stageWidth = usableWidth / 4; // 4 segments between 5 points

    // Calculate x positions for each stage
    const points = stages.map((stage, index) => {
      const x = padding + (stageWidth * index);
      const y = height - (stage.emotionLevel / 100 * (height - 40)) - 20; // Invert Y, add padding
      return { x, y };
    });

    // Create smooth curve using quadratic bezier
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
    <div className="relative w-full bg-gradient-to-br from-[#FBF8F3] to-white rounded-2xl p-8 border-2 border-[var(--color-heirloom-orange)]/30 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          User Journey: From Chaos to Confidence
        </h3>
        <p className="text-sm text-[var(--color-text-dark)]/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Five stages of transformation • Hover to explore
        </p>
      </div>

      {/* Emotion Curve (Top Section) */}
      <div className="mb-12">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          style={{ maxHeight: '200px' }}
        >
          {/* Grid lines (subtle) */}
          <line x1="50" y1="40" x2="1150" y2="40" stroke="var(--color-heirloom-orange)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          <line x1="50" y1="110" x2="1150" y2="110" stroke="var(--color-heirloom-orange)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
          <line x1="50" y1="180" x2="1150" y2="180" stroke="var(--color-heirloom-orange)" strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />

          {/* Y-axis labels */}
          <text x="10" y="45" fill="var(--color-text-dark)" fontSize="12" fontFamily="JetBrains Mono">😊</text>
          <text x="10" y="115" fill="var(--color-text-dark)" fontSize="12" fontFamily="JetBrains Mono">😐</text>
          <text x="10" y="185" fill="var(--color-text-dark)" fontSize="12" fontFamily="JetBrains Mono">😟</text>

          {/* Emotion curve path */}
          <path
            d={path}
            stroke="var(--color-heirloom-coral)"
            strokeWidth="4"
            fill="none"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(232, 93, 77, 0.3))'
            }}
          />

          {/* Stage milestone points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r={hoveredStage === stages[index].id ? 10 : 8}
                fill={stages[index].colorAccent}
                stroke="var(--color-heirloom-light-cream)"
                strokeWidth="3"
                style={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredStage(stages[index].id)}
                onMouseLeave={() => setHoveredStage(null)}
              />
              {/* Emotion label above point */}
              <text
                x={point.x}
                y={point.y - 20}
                fill="var(--color-text-dark)"
                fontSize="11"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
                fontWeight="bold"
              >
                {stages[index].emotionLabel}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Stage Cards (Bottom Section) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const isExpanded = expandedStage === stage.id;
          const isHovered = hoveredStage === stage.id;

          return (
            <div
              key={stage.id}
              className={`
                relative p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                ${isHovered || isExpanded ? 'scale-105 shadow-lg' : 'scale-100'}
              `}
              style={{
                backgroundColor: 'white',
                borderColor: isHovered || isExpanded ? stage.colorAccent : 'var(--color-heirloom-orange)'
              }}
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
              onClick={() => setExpandedStage(isExpanded ? null : stage.id)}
            >
              {/* Stage Icon */}
              <div className="flex justify-center mb-3">
                <div
                  className="p-3 rounded-full"
                  style={{ backgroundColor: `${stage.colorAccent}20` }}
                >
                  <span style={{ color: stage.colorAccent }}>
                    <Icon className="w-8 h-8" />
                  </span>
                </div>
              </div>

              {/* Stage Number & Name */}
              <div className="text-center mb-4">
                <div
                  className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-2"
                  style={{
                    backgroundColor: stage.colorAccent,
                    color: 'white',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                >
                  {stage.id}
                </div>
                <h4
                  className="text-sm font-bold text-[var(--color-text-dark)] tracking-wide"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {stage.name}
                </h4>
              </div>

              {/* Divider */}
              <div
                className="h-px mb-3"
                style={{ backgroundColor: `${stage.colorAccent}40` }}
              />

              {/* Content Sections */}
              <div className="space-y-3 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {/* User Action */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stage.colorAccent }} />
                    <span className="font-bold text-[var(--color-text-dark)]">User</span>
                  </div>
                  <p className="text-[var(--color-text-dark)]/70 text-xs leading-relaxed">
                    {isExpanded ? stage.userAction : stage.userAction.substring(0, 40) + '...'}
                  </p>
                </div>

                {/* Pain Point */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="font-bold text-[var(--color-text-dark)]">Pain</span>
                  </div>
                  <p className="text-[var(--color-text-dark)]/70 text-xs leading-relaxed">
                    {isExpanded ? stage.painPoint : stage.painPoint.substring(0, 40) + '...'}
                  </p>
                </div>

                {/* Heirloom Solution */}
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--color-heirloom-sage)' }} />
                    <span className="font-bold text-[var(--color-text-dark)]">Heirloom</span>
                  </div>
                  <p className="text-[var(--color-text-dark)]/70 text-xs leading-relaxed">
                    {isExpanded ? stage.solution : stage.solution.substring(0, 40) + '...'}
                  </p>
                </div>
              </div>

              {/* Emotion Badge */}
              <div className="mt-4 pt-3 border-t" style={{ borderColor: `${stage.colorAccent}20` }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs italic text-[var(--color-text-dark)]/60">
                    {stage.emotionLabel}
                  </span>
                  <span className="text-lg">{stage.emoji}</span>
                </div>
              </div>

              {/* Expand/Collapse Indicator */}
              {!isExpanded && (
                <div className="absolute bottom-2 right-2 opacity-50">
                  <Info className="w-4 h-4 text-[var(--color-text-dark)]/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Timeline Footer */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-[var(--color-heirloom-coral)]/30 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-[var(--color-heirloom-coral)] animate-pulse" />
          <span className="text-xs text-[var(--color-text-dark)]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            From Chaos to Confidence in 5 Steps
          </span>
        </div>
      </div>
    </div>
  );
}

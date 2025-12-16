'use client';

import { useState } from 'react';
import { TrendingDown, Search, Zap, Star, Target, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * InboxJourneyDiagram: Mobile Swipeable Journey
 *
 * Shows user transformation one stage at a time
 * 5 stages with vertical emotion progress indicator
 */

interface JourneyStage {
  id: number;
  name: string;
  emotion: string;
  emotionLevel: number;
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

export default function InboxJourneyDiagramMobile() {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);

  const currentStage = stages[currentStageIndex];
  const Icon = currentStage.icon;

  const goToNext = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-4 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Chaos → Zero Journey
        </h3>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          1,847 emails → 0 in 30 days
        </p>

        {/* Stage Progress Indicator */}
        <div className="flex justify-center gap-2 mb-4">
          {stages.map((stage, index) => (
            <button
              key={stage.id}
              onClick={() => setCurrentStageIndex(index)}
              className="flex flex-col items-center gap-1"
              aria-label={`Go to ${stage.name}`}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all border-2"
                style={{
                  backgroundColor: index === currentStageIndex ? '#D4AF37' : index < currentStageIndex ? '#4299E1' : '#2D3748',
                  borderColor: index === currentStageIndex ? '#D4AF37' : index < currentStageIndex ? '#4299E1' : '#4A5568',
                  transform: index === currentStageIndex ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                <span className="text-xs font-bold" style={{ color: index <= currentStageIndex ? 'var(--color-text-charcoal)' : '#718096' }}>
                  {stage.id}
                </span>
              </div>
              {index < stages.length - 1 && (
                <div className="w-8 h-1" style={{ backgroundColor: index < currentStageIndex ? '#4299E1' : '#4A5568' }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Current Stage Card */}
      <div
        className="p-6 rounded-lg border-2 mb-4"
        style={{
          backgroundColor: '#2D3748',
          borderColor: '#D4AF37',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)'
        }}
      >
        {/* Stage Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#D4AF37' }}
            >
              <span style={{ color: 'var(--color-text-charcoal)' }}>
                <Icon className="w-5 h-5" />
              </span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {currentStage.name}
              </h4>
              <p className="text-xs text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {currentStage.emotion}
              </p>
            </div>
          </div>
          <span className="text-3xl">{currentStage.emoji}</span>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded bg-[#1A202C]">
            <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Inbox Count
            </div>
            <div className="text-xl font-bold text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {currentStage.inboxCount.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded bg-[#1A202C]">
            <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Time Spent
            </div>
            <div className="text-xl font-bold text-[#4299E1]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {currentStage.timeSpent}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-xs text-gray-300 leading-relaxed mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {currentStage.description}
          </p>
        </div>

        {/* Key Metric */}
        <div className="pt-3 border-t border-gray-600">
          <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            KEY METRIC
          </div>
          <div className="text-sm text-[#48BB78] font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {currentStage.keyMetric}
          </div>
        </div>

        {/* Emotion Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Emotion Level
            </span>
            <span className="text-xs font-bold text-[#D4AF37]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {currentStage.emotionLevel}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
              style={{ width: `${currentStage.emotionLevel}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToPrev}
          disabled={currentStageIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          <ChevronLeft className="w-4 h-4" />
          Prev
        </button>

        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Stage {currentStageIndex + 1} of {stages.length}
        </div>

        <button
          onClick={goToNext}
          disabled={currentStageIndex === stages.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Timeline Stats */}
      <div className="pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              1,847 → 0
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              30 days
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              89%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Time saved
            </div>
          </div>
          <div>
            <div className="text-lg font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              60%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Auto-handled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

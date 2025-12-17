/**
 * 7-Prototype Framework Diagram
 * Horizontal process flow with validation gates
 * BCG-style transformation roadmap per InformationDesignAgent specs
 */

'use client';

import { useState } from 'react';

interface PrototypePhase {
  id: string;
  number: string;
  label: string;
  color: string;
  description: string;
  outcome: string;
}

export default function SevenPrototypeFramework() {
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPhaseIndex < phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
    }
    if (isRightSwipe && currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
    }
  };

  const phases: PrototypePhase[] = [
    {
      id: 'p1-2',
      number: 'P1-2',
      label: 'Core Interaction',
      color: 'var(--color-zero-green)',
      description: 'Build the absolute minimum viable interaction',
      outcome: 'Does the core concept resonate with users?'
    },
    {
      id: 'p3-4',
      number: 'P3-4',
      label: 'Information Architecture',
      color: 'var(--color-zero-cyan)',
      description: 'Validate data model and user mental models',
      outcome: 'Can users understand the information structure?'
    },
    {
      id: 'p5-6',
      number: 'P5-6',
      label: 'Edge Cases',
      color: '#9D4EDD',
      description: 'Test error states, loading, empty states',
      outcome: 'Does it handle real-world complexity?'
    },
    {
      id: 'p7',
      number: 'P7',
      label: 'Polish',
      color: 'var(--color-terminal-gold)',
      description: 'Final validation before architecture lock',
      outcome: 'Ready for production commitment?'
    },
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-white mb-2">Sample Prototype Framework</h2>
        <p className="text-sm text-gray-400">
          Systematic validation before production commitment. This is one example—not all products follow the same path. We adapt the framework to your specific needs.
        </p>
      </div>

      {/* Process flow diagram */}
      <div className="relative">
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
        {/* Timeline bar */}
        <div className="flex items-center gap-2 mb-8">
          {/* START */}
          <div className="flex items-center">
            <div className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded text-xs font-medium text-gray-400">
              START
            </div>
            <svg className="w-6 h-4" viewBox="0 0 24 16">
              <path d="M0 8 L20 8 L15 3 M20 8 L15 13" stroke="var(--color-text-gray-500)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Phases */}
          {phases.map((phase, idx) => (
            <div key={phase.id} className="flex items-center">
              {/* Phase box */}
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
                onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
              >
                <div
                  className="px-4 py-3 border-2 rounded-lg transition-all duration-200 min-w-[100px] text-center"
                  style={{
                    borderColor: phase.color,
                    background: hoveredPhase === phase.id || selectedPhase === phase.id
                      ? `${phase.color}22`
                      : 'transparent',
                  }}
                >
                  <div className="text-xs font-bold mb-0.5" style={{ color: phase.color }}>
                    {phase.number}
                  </div>
                  <div className="text-xs text-white font-medium leading-tight">
                    {phase.label}
                  </div>
                </div>

                {/* Hover tooltip */}
                {hoveredPhase === phase.id && (
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-10 px-3 py-2 bg-gray-900 border border-gray-700 rounded-md shadow-xl whitespace-nowrap max-w-xs">
                    <div className="text-xs text-gray-300">
                      <div className="font-medium text-white mb-1">{phase.label}</div>
                      <div className="text-gray-400 mb-1">{phase.description}</div>
                      <div className="text-xs" style={{ color: phase.color }}>
                        → {phase.outcome}
                      </div>
                    </div>
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-l border-t border-gray-700 rotate-45" />
                  </div>
                )}
              </div>

              {/* Decision gate (except after last phase) */}
              {idx < phases.length - 1 ? (
                <div className="flex items-center mx-1">
                  <svg className="w-6 h-4" viewBox="0 0 24 16">
                    <path d="M0 8 L10 8" stroke="var(--color-text-gray-500)" strokeWidth="2" fill="none" />
                  </svg>
                  {/* Diamond decision gate */}
                  <div className="relative group">
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        d="M12 2 L22 12 L12 22 L2 12 Z"
                        fill="rgb(255 215 0)"
                        stroke="rgb(255 215 0)"
                        strokeWidth="2"
                      />
                      <text
                        x="12"
                        y="14"
                        textAnchor="middle"
                        fill="#000"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        ✓
                      </text>
                    </svg>
                    <div className="absolute hidden group-hover:block top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-500">
                      Pass?
                    </div>
                  </div>
                  <svg className="w-6 h-4" viewBox="0 0 24 16">
                    <path d="M0 8 L10 8" stroke="var(--color-text-gray-500)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              ) : (
                <div className="flex items-center mx-1">
                  <svg className="w-6 h-4" viewBox="0 0 24 16">
                    <path d="M0 8 L20 8 L15 3 M20 8 L15 13" stroke="var(--color-text-gray-500)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* LOCK ARCH */}
          <div className="px-3 py-1.5 bg-gradient-to-r from-[var(--color-terminal-gold)] to-[#FFA500] border-2 border-terminal-gold rounded text-xs font-bold text-black">
            LOCK ARCH
          </div>
        </div>

        {/* Pivot path annotation */}
        <div className="flex items-start gap-2 mb-6">
          <svg className="w-4 h-4 mt-0.5" viewBox="0 0 16 16">
            <path
              d="M8 2 L8 10 M8 10 L5 7 M8 10 L11 7"
              stroke="#FF4444"
              strokeWidth="2"
              fill="none"
              strokeDasharray="2 2"
            />
          </svg>
          <div className="text-xs text-gray-500">
            <span className="text-[#FF4444] font-medium">Pivot path:</span> If validation fails, iterate for 2 days then resume
          </div>
        </div>
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden mb-6">
          {/* Current phase card */}
          <div className="mb-4">
            <div
              className="p-6 border-2 rounded-lg"
              style={{
                borderColor: phases[currentPhaseIndex].color,
                background: `${phases[currentPhaseIndex].color}22`,
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="text-center mb-4">
                <div className="text-sm font-bold mb-1" style={{ color: phases[currentPhaseIndex].color }}>
                  {phases[currentPhaseIndex].number}
                </div>
                <div className="text-lg text-white font-medium mb-2">
                  {phases[currentPhaseIndex].label}
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Description</div>
                  <div className="text-sm text-gray-300">{phases[currentPhaseIndex].description}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Validation Question</div>
                  <div className="text-sm text-gray-300">{phases[currentPhaseIndex].outcome}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation - centered */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => setCurrentPhaseIndex(Math.max(0, currentPhaseIndex - 1))}
              disabled={currentPhaseIndex === 0}
              className="w-11 h-11 flex items-center justify-center bg-gray-800 border border-gray-700 rounded text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm"
              aria-label="Previous"
            >
              &lt;
            </button>

            {/* Pagination dots */}
            <div className="flex gap-1 items-center">
              {phases.map((_, idx) => (
                <div
                  key={idx}
                  className="rounded-full transition-all"
                  style={{
                    backgroundColor: idx === currentPhaseIndex ? phases[idx].color : '#4B5563',
                    width: idx === currentPhaseIndex ? '8px' : '4px',
                    height: '4px',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentPhaseIndex(Math.min(phases.length - 1, currentPhaseIndex + 1))}
              disabled={currentPhaseIndex === phases.length - 1}
              className="w-11 h-11 flex items-center justify-center bg-gray-800 border border-gray-700 rounded text-white disabled:opacity-30 disabled:cursor-not-allowed text-sm"
              aria-label="Next"
            >
              &gt;
            </button>
          </div>

          {/* Pivot path annotation for mobile */}
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 mt-0.5" viewBox="0 0 16 16">
              <path
                d="M8 2 L8 10 M8 10 L5 7 M8 10 L11 7"
                stroke="#FF4444"
                strokeWidth="2"
                fill="none"
                strokeDasharray="2 2"
              />
            </svg>
            <div className="text-xs text-gray-500">
              <span className="text-[#FF4444] font-medium">Pivot path:</span> If validation fails, iterate for 2 days then resume
            </div>
          </div>
        </div>

        {/* Selected phase detail */}
        {selectedPhase && (
          <div className="mt-6 p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
            {phases.filter(p => p.id === selectedPhase).map(phase => (
              <div key={phase.id}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-sm font-bold" style={{ color: phase.color }}>
                    {phase.number}: {phase.label}
                  </div>
                </div>
                <div className="text-sm text-gray-400 mb-2">{phase.description}</div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Validation question:</span> {phase.outcome}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary metrics */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--color-zero-green)]">Flexible timelines</div>
            <div className="text-xs text-gray-500 mt-1">Adaptive to project needs</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-terminal-gold">4</div>
            <div className="text-xs text-gray-500 mt-1">Validation gates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--color-zero-cyan)]">0</div>
            <div className="text-xs text-gray-500 mt-1">False starts in production</div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 p-4 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <div className="text-sm font-medium text-white mb-1">
              Why this works
            </div>
            <div className="text-xs text-gray-400">
              Each prototype answers a specific validation question. By the time you commit to production architecture,
              you've eliminated all major risks through real user feedback—not assumptions.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

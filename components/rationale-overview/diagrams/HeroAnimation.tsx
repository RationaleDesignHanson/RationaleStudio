/**
 * Hero Animation
 * Animated opening visual synthesizing the entire Rationale pitch
 * Built LAST to incorporate insights from all previous diagrams
 * Inspired by Stripe landing page animations
 */

'use client';

import { useState, useEffect } from 'react';

interface AnimationPhase {
  id: string;
  headline: string;
  subtext: string;
  color: string;
  icon: string;
  stats?: {
    label: string;
    value: string;
    color: string;
  }[];
}

export default function HeroAnimation() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const phases: AnimationPhase[] = [
    {
      id: 'problem',
      headline: 'Most Teams Waste 6 Months',
      subtext: 'Building the wrong thing',
      color: '#FF4444',
      icon: '⚠️',
      stats: [
        { label: 'Significant investment', value: 'at risk', color: '#FF4444' },
        { label: 'Before validation', value: '20 weeks', color: '#FF4444' }
      ]
    },
    {
      id: 'trap',
      headline: 'The Sunk Cost Trap',
      subtext: '12 weeks in, wrong UX, political pressure to ship anyway',
      color: '#FFA500',
      icon: '🔒',
      stats: [
        { label: 'Weeks invested', value: '12', color: '#FFA500' },
        { label: 'Pressure to ship', value: '75%', color: '#FFA500' }
      ]
    },
    {
      id: 'solution',
      headline: '7 Prototypes First',
      subtext: 'Validate every assumption before production',
      color: '#00FF94',
      icon: '✓',
      stats: [
        { label: 'Prototypes', value: '7', color: '#00FF94' },
        { label: 'Production pivots', value: '0', color: '#00FF94' }
      ]
    },
    {
      id: 'proof',
      headline: 'Zero: 30 Days to App Store',
      subtext: '10 microservices, 0 pivots, complete strategy',
      color: '#FFD700',
      icon: '🚀',
      stats: [
        { label: 'Time to market', value: '1 month', color: '#FFD700' },
        { label: 'ROI multiple', value: '10-15x', color: '#FFD700' }
      ]
    }
  ];

  useEffect(() => {
    if (!isAnimating) return;

    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating, phases.length]);

  const phase = phases[currentPhase];

  return (
    <div className="relative p-8 sm:p-12 bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Background gradient pulse */}
      <div
        className="absolute inset-0 opacity-10 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${phase.color} 0%, transparent 70%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Phase Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {phases.map((p, idx) => (
            <div
              key={p.id}
              className="h-1 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: idx === currentPhase ? '48px' : '24px',
                backgroundColor: idx === currentPhase ? phase.color : '#374151',
                opacity: idx === currentPhase ? 1 : 0.3
              }}
              onClick={() => {
                setCurrentPhase(idx);
                setIsAnimating(false);
              }}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl transition-all duration-500"
            style={{
              backgroundColor: `${phase.color}20`,
              border: `2px solid ${phase.color}`
            }}
          >
            {phase.icon}
          </div>
        </div>

        {/* Headline */}
        <h2
          className="text-4xl sm:text-5xl font-bold mb-4 transition-all duration-500"
          style={{ color: phase.color }}
        >
          {phase.headline}
        </h2>

        {/* Subtext */}
        <p className="text-xl text-white/70 mb-8 max-w-2xl leading-relaxed">
          {phase.subtext}
        </p>

        {/* Stats */}
        {phase.stats && (
          <div className="grid grid-cols-2 gap-4 max-w-md">
            {phase.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg border transition-all duration-500"
                style={{
                  borderColor: `${stat.color}40`,
                  backgroundColor: `${stat.color}10`
                }}
              >
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phase Navigation */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={() => {
            setCurrentPhase((prev) => (prev - 1 + phases.length) % phases.length);
            setIsAnimating(false);
          }}
          className="p-2 rounded hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => {
            setCurrentPhase((prev) => (prev + 1) % phases.length);
            setIsAnimating(false);
          }}
          className="p-2 rounded hover:bg-white/10 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="ml-4 px-3 py-1 text-xs rounded border border-gray-600 hover:border-gray-500 transition-all"
        >
          {isAnimating ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Narrative Flow Summary */}
      <div className="mt-12 pt-8 border-t border-gray-700">
        <div className="text-xs font-mono text-gray-400 mb-4 uppercase tracking-wide">The Complete Story</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {phases.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setCurrentPhase(idx);
                setIsAnimating(false);
              }}
              className={`p-3 rounded-lg border transition-all text-left ${
                currentPhase === idx ? 'bg-gray-800/70' : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
              }`}
              style={{
                borderColor: currentPhase === idx ? p.color : undefined
              }}
            >
              <div className="text-lg mb-1">{p.icon}</div>
              <div className="text-xs font-semibold text-white mb-1">{p.headline}</div>
              <div className="text-[10px] text-gray-400 leading-relaxed">{p.subtext}</div>
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 flex items-center gap-4">
        <button
          className="px-6 py-3 rounded-lg font-semibold text-black transition-all hover:opacity-90"
          style={{ backgroundColor: phase.color }}
        >
          Start 3-Week Validation Sprint →
        </button>
        <button className="px-6 py-3 rounded-lg font-semibold border-2 transition-all hover:bg-white/5" style={{ borderColor: phase.color, color: phase.color }}>
          View Zero Case Study
        </button>
      </div>
    </div>
  );
}

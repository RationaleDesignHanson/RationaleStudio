/**
 * Vision Pro Spatial Computing Demo
 *
 * Emotional career milestone scenarios in Apple Vision Pro
 * Focus on visceral, career-defining moments
 */

'use client';

import { useState } from 'react';

interface VisionProScenario {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
}

const VISION_PRO_SCENARIOS: VisionProScenario[] = [
  {
    id: 'locker-room',
    title: 'In the Locker Room',
    description: 'See yourself surrounded by your future teammates. Feel the energy of pre-game rituals, hear the coach\'s voice, experience the camaraderie. This is your team. This is where you belong.',
    emoji: '🏈',
    color: '#0066FF',
  },
  {
    id: 'game-day-field',
    title: 'Walking onto the Field',
    description: 'The roar of 70,000 fans. Stadium lights blazing. Your name announced over the PA system. Step onto the turf and experience game day from the perspective that will define your career.',
    emoji: '🏟️',
    color: '#00FF94',
  },
  {
    id: 'draft-moment',
    title: 'Being Drafted',
    description: 'Your name is called. The commissioner shakes your hand. Cameras flash. Your family celebrates. Relive the moment that changes everything—before it happens.',
    emoji: '📞',
    color: 'var(--color-terminal-gold)',
  },
  {
    id: 'super-bowl-victory',
    title: 'Winning the Super Bowl',
    description: 'Confetti raining down. Trophy in your hands. Teammates mobbing you. The culmination of everything you\'ve worked for. Experience the pinnacle of your sport.',
    emoji: '🏆',
    color: '#9D4EDD',
  },
  {
    id: 'hall-of-fame',
    title: 'Hall of Fame Speech',
    description: 'Stand at the podium in Canton. See the gold jacket. Look out at legends who came before you. Practice the speech that cements your legacy forever.',
    emoji: '🎤',
    color: '#FF6B00',
  },
];

export default function VisionProSpatialDemo() {
  const [selectedScenario, setSelectedScenario] = useState<VisionProScenario>(VISION_PRO_SCENARIOS[0]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-terminal-gold font-mono mb-2">
          EXPERIENCE YOUR FUTURE
        </h2>
        <p className="text-white/60 font-mono">
          Apple Vision Pro • Immersive career milestone visualization
        </p>
      </div>

      {/* Main Scenario Display */}
      <div className="relative w-full aspect-video bg-gradient-to-br from-black via-gray-900 to-black rounded-lg border-2 overflow-hidden group"
           style={{ borderColor: selectedScenario.color }}>

        {/* Scenario info */}
        <div className="relative z-10 p-8 h-full flex flex-col justify-center items-center text-center">
          <h3 className="text-5xl font-bold font-mono mb-6" style={{ color: selectedScenario.color }}>
            {selectedScenario.title}
          </h3>
          <p className="text-2xl text-white/90 font-mono max-w-3xl leading-relaxed">
            {selectedScenario.description}
          </p>
        </div>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 215, 0, 0.1) 2px, rgba(255, 215, 0, 0.1) 4px)'
          }}
        />
      </div>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {VISION_PRO_SCENARIOS.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => setSelectedScenario(scenario)}
            className={`relative p-6 rounded-lg border-2 transition-all ${
              selectedScenario.id === scenario.id
                ? 'scale-[1.05]'
                : 'hover:scale-[1.02]'
            }`}
            style={{
              borderColor: selectedScenario.id === scenario.id ? scenario.color : 'rgba(255,255,255,0.2)',
              backgroundColor: selectedScenario.id === scenario.id ? `${scenario.color}15` : 'rgba(0,0,0,0.5)'
            }}
          >
            {/* Selected indicator */}
            {selectedScenario.id === scenario.id && (
              <div className="absolute top-2 right-2 text-xl">✓</div>
            )}

            <div className="text-center">
              <div className="text-5xl mb-3">{scenario.emoji}</div>
              <h4 className="font-mono font-bold text-sm text-white mb-1">
                {scenario.title}
              </h4>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-gradient-to-r from-[#FFD700]/10 to-[#FF6B00]/10 border-2 border-terminal-gold/30 rounded-lg">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🥽</span>
          <div>
            <h4 className="font-mono font-bold text-terminal-gold text-lg mb-2">
              VISCERAL DECISION-MAKING
            </h4>
            <p className="font-mono text-sm text-white/80 mb-3">
              Don't just imagine your future—experience it. Apple Vision Pro lets athletes step into career-defining moments before they happen.
              Feel the weight of decisions. Visualize the trajectory. Make choices with emotional clarity.
            </p>
            <p className="font-mono text-xs text-white/60">
              Spatial computing • Emotional immersion • Career milestone visualization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

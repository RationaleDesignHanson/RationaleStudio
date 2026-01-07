'use client';

import { useEffect, useState } from 'react';

interface Ember {
  id: number;
  x: number;
  y: number;
  variant: 'small' | 'medium' | 'warm';
  duration: number;
  delay: number;
  tx1: number;
  ty1: number;
  tx2: number;
  ty2: number;
  tx3: number;
  ty3: number;
}

/**
 * WarmEmberBackground - Analogue/Nostalgic particle effect
 * 
 * Like fireflies but warmer: amber dust motes, soft gold, and coral particles
 * floating gently upward like embers from a hearth or dust in afternoon sunlight.
 */
export default function WarmEmberBackground() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    // Generate embers on client-side only
    const emberCount = 35;
    const newEmbers: Ember[] = [];

    for (let i = 0; i < emberCount; i++) {
      const rand = Math.random();
      const variant = rand < 0.4 ? 'small' : rand < 0.75 ? 'medium' : 'warm';
      const duration = 12 + Math.random() * 18; // Slower than fireflies
      const moveRange = 40 + Math.random() * 60; // Gentler movement

      newEmbers.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        variant,
        duration,
        delay: Math.random() * -duration,
        tx1: (Math.random() - 0.5) * moveRange,
        ty1: -20 - Math.random() * moveRange, // Bias upward like rising embers
        tx2: (Math.random() - 0.5) * moveRange,
        ty2: -10 - Math.random() * moveRange,
        tx3: (Math.random() - 0.5) * moveRange,
        ty3: -30 - Math.random() * moveRange,
      });
    }

    setEmbers(newEmbers);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Warm gradient background - cream to amber to hint of coral */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(165deg, #FBF8F3 0%, #F5E6D3 35%, #F4A460 70%, #E8B89D 100%)'
        }}
      />
      
      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ember particles */}
      <div className="absolute inset-0">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className={`ember ember-${ember.variant}`}
            style={{
              position: 'absolute',
              left: `${ember.x}%`,
              top: `${ember.y}%`,
              borderRadius: '50%',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              animation: `ember-float ${ember.duration}s ease-in-out infinite`,
              animationDelay: `${ember.delay}s`,
              // @ts-ignore - CSS custom properties
              '--tx1': `${ember.tx1}px`,
              '--ty1': `${ember.ty1}px`,
              '--tx2': `${ember.tx2}px`,
              '--ty2': `${ember.ty2}px`,
              '--tx3': `${ember.tx3}px`,
              '--ty3': `${ember.ty3}px`,
            }}
          />
        ))}
      </div>

      {/* CSS for ember variants and animation */}
      <style jsx>{`
        .ember-small {
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(244, 164, 96, 0.9), rgba(244, 164, 96, 0.4) 40%, transparent 70%);
          box-shadow: 0 0 8px rgba(244, 164, 96, 0.6), 0 0 16px rgba(244, 164, 96, 0.3);
        }

        .ember-medium {
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(232, 93, 77, 0.8), rgba(232, 93, 77, 0.4) 40%, transparent 70%);
          box-shadow: 0 0 10px rgba(232, 93, 77, 0.6), 0 0 20px rgba(232, 93, 77, 0.3);
        }

        .ember-warm {
          width: 5px;
          height: 5px;
          background: radial-gradient(circle, rgba(255, 215, 140, 1), rgba(255, 200, 100, 0.6) 40%, transparent 70%);
          box-shadow: 0 0 12px rgba(255, 200, 100, 0.7), 0 0 24px rgba(244, 164, 96, 0.4);
        }

        @keyframes ember-float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.2;
          }
          25% {
            transform: translate3d(var(--tx1), var(--ty1), 0);
            opacity: 0.6;
          }
          50% {
            transform: translate3d(var(--tx2), var(--ty2), 0);
            opacity: 0.8;
          }
          75% {
            transform: translate3d(var(--tx3), var(--ty3), 0);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}


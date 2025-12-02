'use client';

import { useEffect, useState } from 'react';

interface Firefly {
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

export default function GalaxyBackground() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate fireflies on client-side only
    const fireflyCount = 40;
    const newFireflies: Firefly[] = [];

    for (let i = 0; i < fireflyCount; i++) {
      const rand = Math.random();
      const variant = rand < 0.33 ? 'small' : rand < 0.66 ? 'medium' : 'warm';
      const duration = 8 + Math.random() * 12;
      const moveRange = 60 + Math.random() * 80;

      newFireflies.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        variant,
        duration,
        delay: Math.random() * -duration,
        tx1: (Math.random() - 0.5) * moveRange,
        ty1: (Math.random() - 0.5) * moveRange,
        tx2: (Math.random() - 0.5) * moveRange,
        ty2: (Math.random() - 0.5) * moveRange,
        tx3: (Math.random() - 0.5) * moveRange,
        ty3: (Math.random() - 0.5) * moveRange,
      });
    }

    setFireflies(newFireflies);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Galaxy gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 30%, #4a1942 60%, #1f1f3a 100%)'
        }}
      />

      {/* Firefly particles */}
      <div className="absolute inset-0">
        {fireflies.map((firefly) => (
          <div
            key={firefly.id}
            className={`firefly firefly-${firefly.variant}`}
            style={{
              position: 'absolute',
              left: `${firefly.x}%`,
              top: `${firefly.y}%`,
              borderRadius: '50%',
              pointerEvents: 'none',
              willChange: 'transform, opacity',
              animation: `firefly-float ${firefly.duration}s ease-in-out infinite`,
              animationDelay: `${firefly.delay}s`,
              // @ts-ignore - CSS custom properties
              '--tx1': `${firefly.tx1}px`,
              '--ty1': `${firefly.ty1}px`,
              '--tx2': `${firefly.tx2}px`,
              '--ty2': `${firefly.ty2}px`,
              '--tx3': `${firefly.tx3}px`,
              '--ty3': `${firefly.ty3}px`,
            }}
          />
        ))}
      </div>

      {/* CSS for firefly variants and animation */}
      <style jsx>{`
        .firefly-small {
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(147, 197, 253, 1), rgba(147, 197, 253, 0.5) 40%, transparent 70%);
          box-shadow: 0 0 10px rgba(147, 197, 253, 0.8), 0 0 20px rgba(147, 197, 253, 0.4);
        }

        .firefly-medium {
          width: 5px;
          height: 5px;
          background: radial-gradient(circle, rgba(196, 181, 253, 1), rgba(196, 181, 253, 0.6) 40%, transparent 70%);
          box-shadow: 0 0 15px rgba(196, 181, 253, 0.9), 0 0 30px rgba(196, 181, 253, 0.5);
        }

        .firefly-warm {
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(251, 191, 36, 1), rgba(251, 191, 36, 0.7) 40%, transparent 70%);
          box-shadow: 0 0 12px rgba(251, 191, 36, 0.9), 0 0 25px rgba(251, 146, 60, 0.6);
        }

        @keyframes firefly-float {
          0%, 100% {
            transform: translate3d(0, 0, 0);
            opacity: 0.3;
          }
          25% {
            transform: translate3d(var(--tx1), var(--ty1), 0);
            opacity: 0.8;
          }
          50% {
            transform: translate3d(var(--tx2), var(--ty2), 0);
            opacity: 1;
          }
          75% {
            transform: translate3d(var(--tx3), var(--ty3), 0);
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

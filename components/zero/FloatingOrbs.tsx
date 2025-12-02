'use client';

import { useEffect, useState } from 'react';

/**
 * Floating Orbs Background
 *
 * Faithful recreation of the Zero dashboard background
 * Three large animated orbs with blur and gradients
 * Plus firefly particles
 */

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function StarfieldBackground() {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    // Generate fireflies on client-side only
    const colors = [
      'rgba(59, 130, 246, 0.9)',     // Blue
      'rgba(139, 92, 246, 0.9)',     // Purple
      'rgba(14, 165, 233, 0.9)',     // Cyan
      'rgba(236, 72, 153, 0.8)',     // Pink
      'rgba(147, 197, 253, 0.8)',    // Light blue
      'rgba(255, 255, 255, 0.95)',   // White
      'rgba(255, 255, 240, 0.9)',    // Ivory
      'rgba(255, 250, 205, 0.9)',    // Lemon chiffon
      'rgba(255, 255, 153, 0.85)',   // Light yellow
      'rgba(250, 250, 210, 0.9)',    // Light goldenrod
    ];

    const newFireflies = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 1.5, // 1.5-4px
      duration: Math.random() * 10 + 15, // 15-25s
      delay: Math.random() * 3, // 0-3s (reduced from 0-10s for faster start)
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setFireflies(newFireflies);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Linear Gradient Background - Exact from original */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b4e 30%, #4a1942 60%, #1f1f3a 100%)'
        }}
      />

      {/* Global Keyframe Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-30px, 50px) scale(0.9);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-50px, -30px) scale(1.1);
          }
          66% {
            transform: translate(30px, 50px) scale(0.9);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(50px, 30px) scale(1.1);
          }
          66% {
            transform: translate(-50px, -30px) scale(0.9);
          }
        }

        @keyframes fireflyFloat {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.7;
          }
          25% {
            transform: translate(20px, -30px);
            opacity: 1;
          }
          50% {
            transform: translate(-15px, 20px);
            opacity: 0.8;
          }
          75% {
            transform: translate(30px, 10px);
            opacity: 0.9;
          }
        }

        @keyframes fireflyPulse {
          0%, 100% {
            box-shadow: 0 0 2px currentColor, 0 0 6px currentColor, 0 0 10px currentColor;
          }
          50% {
            box-shadow: 0 0 4px currentColor, 0 0 12px currentColor, 0 0 20px currentColor;
          }
        }
      `}} />

      {/* Floating Spheres Container */}
      <div className="absolute inset-0" style={{ zIndex: 0, pointerEvents: 'none' }}>
        {/* Sphere 1 - Blue - Top Left */}
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '300px',
            height: '300px',
            top: '10%',
            left: '10%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 40%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: 0.5,
            animation: 'float1 25s ease-in-out infinite'
          }}
        />

        {/* Sphere 2 - Purple - Bottom Right */}
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '400px',
            height: '400px',
            top: '60%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.25) 40%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: 0.5,
            animation: 'float2 30s ease-in-out infinite 5s'
          }}
        />

        {/* Sphere 3 - Cyan - Bottom Left */}
        <div
          className="absolute rounded-full will-change-transform"
          style={{
            width: '350px',
            height: '350px',
            bottom: '15%',
            left: '15%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.55) 0%, rgba(14, 165, 233, 0.3) 40%, transparent 70%)',
            filter: 'blur(40px)',
            opacity: 0.5,
            animation: 'float3 28s ease-in-out infinite 10s'
          }}
        />
      </div>

      {/* Fireflies Layer */}
      <div className="absolute inset-0" style={{ zIndex: 1, pointerEvents: 'none' }}>
        {fireflies.map((firefly) => (
          <div
            key={firefly.id}
            className="absolute rounded-full will-change-transform"
            style={{
              left: `${firefly.x}%`,
              top: `${firefly.y}%`,
              width: `${firefly.size}px`,
              height: `${firefly.size}px`,
              backgroundColor: firefly.color,
              color: firefly.color,
              filter: 'blur(0.3px)',
              animation: `fireflyFloat ${firefly.duration}s ease-in-out infinite ${firefly.delay}s, fireflyPulse ${firefly.duration * 0.5}s ease-in-out infinite ${firefly.delay}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Gradient Mesh Component
 *
 * Subtle gradient overlays that shift on 15s cycles
 * Part of multi-layered computational background system
 */

'use client';

import { useEffect, useState } from 'react';

interface GradientMeshProps {
  opacity?: number;
  variant?: 'violet' | 'aqua' | 'neutral';
}

export function GradientMesh({
  opacity = 0.03,
  variant = 'violet'
}: GradientMeshProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      // 15-second breathing cycle
      const cycle = 15000;
      const progress = (elapsed % cycle) / cycle;

      setPhase(progress);
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const gradients = {
    violet: {
      from: 'rgba(106, 84, 246, 0.08)',
      to: 'rgba(106, 84, 246, 0.02)',
    },
    aqua: {
      from: 'rgba(48, 174, 193, 0.06)',
      to: 'rgba(48, 174, 193, 0.01)',
    },
    neutral: {
      from: 'rgba(48, 52, 54, 0.04)',
      to: 'rgba(48, 52, 54, 0.01)',
    },
  };

  const gradient = gradients[variant];

  // Calculate position based on phase (creates circular motion)
  const x = 50 + Math.sin(phase * Math.PI * 2) * 20;
  const y = 50 + Math.cos(phase * Math.PI * 2) * 20;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: `radial-gradient(circle at ${x}% ${y}%, ${gradient.from} 0%, ${gradient.to} 50%, transparent 100%)`,
        opacity,
        transition: 'opacity 0.3s ease',
      }}
      aria-hidden="true"
    />
  );
}

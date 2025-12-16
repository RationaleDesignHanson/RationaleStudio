/**
 * Dot Grid Background
 *
 * Subtle dot-grid pattern for Creative-Intelligent Futurism aesthetic.
 * 3-5% opacity, computational feeling.
 */

'use client';

import { useEffect, useState } from 'react';

interface DotGridProps {
  opacity?: number;
  size?: number;
  gap?: number;
  animated?: boolean;
}

export function DotGrid({
  opacity = 0.15,
  size = 1.2, // Increased for better visibility
  gap = 12,   // Keep density the same
  animated = true,
}: DotGridProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!animated) return;

    let frameId: number;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      // 12s breathing cycle (low-frequency motion)
      const cycle = 12000;
      const progress = (elapsed % cycle) / cycle;

      // Much more visible circular drift for testing (10px radius)
      const eased = Math.sin(progress * Math.PI * 2);
      const x = eased * 10; // Increased from 2.5 to 10 for visibility
      const y = Math.cos(progress * Math.PI * 2) * 10;

      setOffset({ x, y });
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [animated]);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        backgroundImage: `radial-gradient(circle, var(--accent) ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        opacity,
        color: 'var(--accent)', // Spectral Violet
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: animated ? 'transform 0.1s linear' : 'none',
      }}
      aria-hidden="true"
    />
  );
}

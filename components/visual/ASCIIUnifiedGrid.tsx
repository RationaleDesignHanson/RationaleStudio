/**
 * Unified ASCII Grid Component
 *
 * High-performance single-loop animation combining:
 * - Small dense dot grid (3D noise shaded)
 * - Large sparse cell grid (simple dots)
 *
 * Replaces ASCIIShadedDotGrid + ASCIIDotGrid with one render loop
 */

'use client';

import { useEffect, useRef } from 'react';
import { interpolateColors, type WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface ASCIIUnifiedGridProps {
  opacity?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
}

// ASCII characters for density levels
const SHADE_CHARS = [' ', '.', '·', '°', '•', '+', '×'];

// 3D Noise functions (simplified for performance)
const sphereNoise = (x: number, y: number, t: number): number => {
  const radius = 30;
  const centerX = Math.cos(t * 0.3) * 10;
  const centerY = Math.sin(t * 0.3) * 10;
  const dx = x - centerX;
  const dy = y - centerY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.max(0, 1 - Math.abs(dist - radius) / 10);
};

const NOISE_FUNCTIONS = [sphereNoise];

export function ASCIIUnifiedGrid({
  opacity = 0.08,
  animated = true,
  colorTheme
}: ASCIIUnifiedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const colorTimeRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  const noiseFnIndexRef = useRef(0);

  useEffect(() => {
    if (!animated) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Setup canvas
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Grid settings
    const smallSpacing = 12; // Dense grid
    const largeSpacing = 40; // Sparse grid
    const smallDotSize = 0.6;

    // Single animation loop
    let lastFrame = 0;
    const targetFPS = 10; // Throttle to 10 FPS
    const frameInterval = 1000 / targetFPS;

    const animate = (timestamp: number) => {
      if (timestamp - lastFrame < frameInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrame = timestamp;

      timeRef.current += 0.001;
      colorTimeRef.current += 0.0005;
      const t = timeRef.current;
      const colorT = colorTimeRef.current;
      const noiseFn = NOISE_FUNCTIONS[noiseFnIndexRef.current];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textBaseline = 'top';

      // Draw small dense grid (with noise) - Layer 1
      ctx.font = `${smallDotSize}rem monospace`;
      const smallCols = Math.ceil(canvas.width / smallSpacing) + 2;
      const smallRows = Math.ceil(canvas.height / smallSpacing) + 2;

      for (let row = 0; row < smallRows; row++) {
        for (let col = 0; col < smallCols; col++) {
          const x = col * smallSpacing;
          const y = row * smallSpacing;

          // Calculate noise value
          const noiseValue = noiseFn(col, row, t);
          const charIndex = Math.floor(noiseValue * SHADE_CHARS.length);
          const safeIndex = Math.max(0, Math.min(SHADE_CHARS.length - 1, charIndex));
          const char = SHADE_CHARS[safeIndex];

          if (char === ' ') continue;

          // Color calculation with proper opacity
          let color = 'rgba(102, 102, 102, 0.5)';
          if (colorTheme) {
            const colorNoise = Math.sin(col * 0.05 + colorT) * Math.cos(row * 0.05 + colorT * 0.7);
            const colorValue = (colorNoise + 1) / 2;
            const baseColor = interpolateColors(colorTheme.colors, colorValue);
            const r = parseInt(baseColor.slice(1, 3), 16);
            const g = parseInt(baseColor.slice(3, 5), 16);
            const b = parseInt(baseColor.slice(5, 7), 16);
            color = `rgba(${r}, ${g}, ${b}, 0.5)`;
          }

          ctx.fillStyle = color;
          ctx.fillText(char, x, y);
        }
      }

      // Draw large sparse grid (simple dots) - Layer 2
      const largeCols = Math.ceil(canvas.width / largeSpacing) + 1;
      const largeRows = Math.ceil(canvas.height / largeSpacing) + 1;

      ctx.font = '1rem monospace';

      for (let row = 0; row < largeRows; row++) {
        for (let col = 0; col < largeCols; col++) {
          const x = col * largeSpacing;
          const y = row * largeSpacing;

          // Simple wave animation
          const wave = Math.sin(col * 0.3 + t * 2) * Math.cos(row * 0.3 + t * 1.5);
          const alpha = (wave + 1) / 4 + 0.2; // 0.2 to 0.7

          // Color calculation
          let color = `rgba(102, 102, 102, ${alpha * 0.6})`;
          if (colorTheme) {
            const colorNoise = Math.sin(col * 0.1 + colorT) * Math.cos(row * 0.1 + colorT * 0.5);
            const colorValue = (colorNoise + 1) / 2;
            const baseColor = interpolateColors(colorTheme.colors, colorValue);
            const r = parseInt(baseColor.slice(1, 3), 16);
            const g = parseInt(baseColor.slice(3, 5), 16);
            const b = parseInt(baseColor.slice(5, 7), 16);
            color = `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`;
          }

          ctx.fillStyle = color;
          ctx.fillText('•', x, y);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Cycle noise functions every 8 seconds
    const fnInterval = setInterval(() => {
      noiseFnIndexRef.current = (noiseFnIndexRef.current + 1) % NOISE_FUNCTIONS.length;
    }, 8000);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(fnInterval);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [animated, colorTheme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}

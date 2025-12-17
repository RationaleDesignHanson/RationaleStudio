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

import { useEffect, useRef, useState } from 'react';
import { interpolateColors, type WatercolorTheme } from '@/lib/theme/watercolor-palette';
import { logger } from '@/lib/utils/logger';

export interface ASCIIUnifiedGridProps {
  opacity?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
  charSet?: 'default' | 'compute' | 'depth' | 'shapes';
  className?: string;
}

// ASCII character sets for different aesthetics
const CHAR_SETS = {
  default: [' ', '·', '∙', '•', '●', '+', '×', '◉'],    // Balanced mix (bolder)
  compute: [' ', '·', '+', '×', '÷', '=', '≈', '≠'],    // Mathematical/technical
  depth: [' ', '∙', '•', '●', '◉', '⦿', '◎', '⬤'],     // Visual depth (bolder progression)
  shapes: [' ', '∘', '∙', '•', '○', '●', '◉', '⦿'],    // Circle shapes (emphasized)
} as const;

// 3D Noise functions (organic, cellular automata-inspired)
type NoiseFunction = (x: number, y: number, t: number) => number;

// Perlin-like organic noise with multiple octaves
const organicNoise: NoiseFunction = (x, y, t) => {
  const freq1 = 0.05;
  const freq2 = 0.1;
  const freq3 = 0.2;

  const noise1 = Math.sin(x * freq1 + t * 0.5) * Math.cos(y * freq1 + t * 0.3);
  const noise2 = Math.sin(x * freq2 - t * 0.7) * Math.cos(y * freq2 + t * 0.5);
  const noise3 = Math.sin(x * freq3 + t) * Math.cos(y * freq3 - t * 0.8);

  return (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2);
};

// Turbulent cloud-like pattern - organic and flowing
const turbulenceNoise: NoiseFunction = (x, y, t) => {
  // Multiple layers of sine waves with different frequencies and phases
  const layer1 = Math.sin(x * 0.08 + t * 0.6) * Math.cos(y * 0.06 + t * 0.4);
  const layer2 = Math.sin(x * 0.12 - t * 0.5) * Math.cos(y * 0.15 + t * 0.7);
  const layer3 = Math.sin((x + y) * 0.05 + t * 0.3) * Math.cos((x - y) * 0.07 - t * 0.5);

  // Add some drift
  const driftX = Math.sin(t * 0.2) * 5;
  const driftY = Math.cos(t * 0.15) * 5;
  const layer4 = Math.sin((x + driftX) * 0.04) * Math.cos((y + driftY) * 0.04);

  // Combine layers with different weights for turbulence
  return (layer1 * 0.35 + layer2 * 0.25 + layer3 * 0.25 + layer4 * 0.15);
};

// Flowing plasma-like pattern
const plasmaFlow: NoiseFunction = (x, y, t) => {
  const flow1 = Math.sin(x * 0.03 + t * 0.6) * Math.cos(y * 0.04 + t * 0.4);
  const flow2 = Math.sin(Math.sqrt(x * x * 0.001 + y * y * 0.001) + t * 0.8);
  const flow3 = Math.sin((x * 0.05 + y * 0.05) * Math.sin(t * 0.3));

  return (flow1 + flow2 + flow3) / 3;
};

// Chaotic interference pattern
const chaosNoise: NoiseFunction = (x, y, t) => {
  // Multiple interfering frequencies create emergent patterns
  const chaos1 = Math.sin(x * 0.07 + Math.cos(t * 0.5) * 10);
  const chaos2 = Math.cos(y * 0.08 + Math.sin(t * 0.7) * 10);
  const chaos3 = Math.sin((x + y) * 0.06 + t * 0.9);
  const chaos4 = Math.cos((x - y) * 0.05 - t * 0.6);

  return (chaos1 * chaos2 + chaos3 * chaos4) / 2;
};

// Noise patterns mapped to character sets (creates variety)
const NOISE_PATTERNS = [
  { noise: organicNoise, charSet: 'depth' as const, name: 'Organic Flow', opacityMultiplier: 1.0 },      // Layered perlin-like
  { noise: turbulenceNoise, charSet: 'shapes' as const, name: 'Turbulent Clouds', opacityMultiplier: 1.0 },  // Cloud-like turbulence (replaced cellular)
  { noise: plasmaFlow, charSet: 'default' as const, name: 'Plasma Stream', opacityMultiplier: 1.0 },     // Flowing plasma
  { noise: chaosNoise, charSet: 'compute' as const, name: 'Chaotic Field', opacityMultiplier: 1.0 },     // Emergent interference
];

export function ASCIIUnifiedGrid({
  opacity = 0.08,
  animated = true,
  colorTheme,
  charSet = 'default',
  className = ''
}: ASCIIUnifiedGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const colorTimeRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  const noisePatternIndexRef = useRef(0);
  const nextNoisePatternIndexRef = useRef(1);
  const transitionStartRef = useRef<number | null>(null);
  const transitionDuration = 2; // 2 second crossfade
  const [currentOpacityMultiplier, setCurrentOpacityMultiplier] = useState(1.0);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!animated || !isVisible) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Optimize text rendering for clarity
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    logger.log('[ASCIIUnifiedGrid] Animation starting with theme:', colorTheme?.name, 'charSet:', charSet);

    // Setup canvas
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Grid settings - more sparse and organic
    const baseSpacing = 24; // Increased from 12 for less density
    const dotSize = 0.6; // Slightly smaller for subtlety
    const randomOffset = 6; // Random position variance to break grid pattern

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

      timeRef.current += 0.025; // Slow, subtle animation speed
      colorTimeRef.current += 0.0125; // Slow color changes
      const t = timeRef.current;
      const colorT = colorTimeRef.current;

      // Calculate transition blend factor (0 = current, 1 = next)
      let blendFactor = 0;
      if (transitionStartRef.current !== null) {
        const elapsed = t - transitionStartRef.current;
        blendFactor = Math.min(1, elapsed / transitionDuration);

        // Smooth easing (ease-in-out)
        blendFactor = blendFactor * blendFactor * (3 - 2 * blendFactor);

        // Transition complete
        if (blendFactor >= 1) {
          noisePatternIndexRef.current = nextNoisePatternIndexRef.current;
          nextNoisePatternIndexRef.current = (nextNoisePatternIndexRef.current + 1) % NOISE_PATTERNS.length;
          transitionStartRef.current = null;
          blendFactor = 0;
        }
      }

      // Get current and next noise patterns
      const currentPattern = NOISE_PATTERNS[noisePatternIndexRef.current];
      const nextPattern = NOISE_PATTERNS[nextNoisePatternIndexRef.current];
      const currentNoiseFn = currentPattern.noise;
      const nextNoiseFn = nextPattern.noise;

      // Blend opacity multipliers during transition
      const blendedOpacityMultiplier =
        currentPattern.opacityMultiplier * (1 - blendFactor) +
        nextPattern.opacityMultiplier * blendFactor;
      setCurrentOpacityMultiplier(blendedOpacityMultiplier);

      // Use blended character set during transition
      const activeCharSet = charSet === 'default'
        ? (blendFactor > 0.5 ? nextPattern.charSet : currentPattern.charSet)
        : charSet;
      const SHADE_CHARS = CHAR_SETS[activeCharSet];

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textBaseline = 'top';

      // Draw single organic grid with randomization
      ctx.font = `600 ${dotSize}rem "JetBrains Mono", var(--font-jetbrains-mono), monospace`;
      const cols = Math.ceil(canvas.width / baseSpacing) + 2;
      const rows = Math.ceil(canvas.height / baseSpacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Add random offset to break grid pattern (stable per grid cell)
          const seed = (col * 1000 + row) * 0.1;
          const offsetX = Math.sin(seed) * randomOffset;
          const offsetY = Math.cos(seed * 1.3) * randomOffset;

          const x = col * baseSpacing + offsetX;
          const y = row * baseSpacing + offsetY;

          // Calculate blended noise value
          let noiseValue;
          if (blendFactor > 0) {
            const currentNoise = currentNoiseFn(col, row, t);
            const nextNoise = nextNoiseFn(col, row, t);
            noiseValue = currentNoise * (1 - blendFactor) + nextNoise * blendFactor;
          } else {
            noiseValue = currentNoiseFn(col, row, t);
          }

          const charIndex = Math.floor(noiseValue * SHADE_CHARS.length);
          const safeIndex = Math.max(0, Math.min(SHADE_CHARS.length - 1, charIndex));
          const char = SHADE_CHARS[safeIndex];

          if (char === ' ') continue;

          // Color calculation with proper opacity
          let color = 'rgba(200, 200, 200, 1.0)';
          if (colorTheme) {
            const colorNoise = Math.sin(col * 0.05 + colorT) * Math.cos(row * 0.05 + colorT * 0.7);
            const colorValue = (colorNoise + 1) / 2;
            const baseColor = interpolateColors(colorTheme.colors, colorValue);
            // interpolateColors returns rgb(r, g, b) - convert to rgba and brighten
            const rgbMatch = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
              let r = parseInt(rgbMatch[1]);
              let g = parseInt(rgbMatch[2]);
              let b = parseInt(rgbMatch[3]);

              // Brighten dark colors for visibility on black background
              // If color is too dark (luminance < 100), lighten it
              const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
              if (luminance < 100) {
                const factor = 150 / Math.max(luminance, 1);
                r = Math.min(255, Math.round(r * factor));
                g = Math.min(255, Math.round(g * factor));
                b = Math.min(255, Math.round(b * factor));
              }

              color = `rgba(${r}, ${g}, ${b}, 1.0)`;
            }
          }

          ctx.fillStyle = color;
          ctx.fillText(char, x, y);
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    // Cycle noise patterns every 8 seconds (with smooth 2s transition)
    const fnInterval = setInterval(() => {
      if (transitionStartRef.current === null) {
        // Start transition to next pattern
        transitionStartRef.current = timeRef.current;
        logger.log('[ASCIIUnifiedGrid] Starting transition to:', NOISE_PATTERNS[nextNoisePatternIndexRef.current].name);
      }
    }, 8000);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      clearInterval(fnInterval);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [animated, isVisible, colorTheme, charSet]);

  // Scale opacity for better visibility (0.08 becomes 0.32, 0.12 becomes 0.48)
  // Apply pattern-specific opacity multiplier (cellular pattern is reduced)
  const scaledOpacity = Math.min(1, opacity * 4 * currentOpacityMultiplier);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity: scaledOpacity }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-none"
      />
    </div>
  );
}

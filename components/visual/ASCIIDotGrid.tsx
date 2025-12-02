/**
 * ASCII Dot Grid Shader
 *
 * Sophisticated grid of ASCII characters with 3D-like noise patterns
 * More intelligent than simple circles - uses monospace chars with depth
 * Now with computational watercolor color gradients
 */

'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { interpolateColors, type WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface ASCIIDotGridProps {
  opacity?: number;
  cellSize?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
}

// ASCII characters with visual "depth" - from light to heavy
const ASCII_DEPTH = ['·', '⋅', '∙', '•', '●', '◉', '⦿', '◎', '○', '◯'];
const ASCII_SHAPES = ['.', '°', '⁰', '˙', '·', '∘', '∙', '•', '○', '◌'];
const ASCII_COMPUTE = ['·', '+', '×', '÷', '=', '≈', '≠', '∞', '∫', '∂'];

// Noise functions for 3D-like patterns
type NoiseFunction = (x: number, y: number, t: number) => number;

// Rotating 3D plane simulation
const planeNoise: NoiseFunction = (x, y, t) => {
  const rotX = Math.cos(t * 0.3) * x + Math.sin(t * 0.3) * y;
  const rotY = -Math.sin(t * 0.3) * x + Math.cos(t * 0.3) * y;
  return Math.sin(rotX * 0.2) * Math.cos(rotY * 0.2);
};

// Wave interference with depth
const waveDepth: NoiseFunction = (x, y, t) => {
  const d = Math.sqrt(x * x + y * y);
  return Math.sin(d * 0.1 - t) * Math.cos(x * 0.08 + t * 0.5);
};

// Spiral pattern
const spiralNoise: NoiseFunction = (x, y, t) => {
  const angle = Math.atan2(y, x);
  const radius = Math.sqrt(x * x + y * y);
  return Math.sin(radius * 0.05 + angle * 3 - t);
};

// Ripple effect
const rippleNoise: NoiseFunction = (x, y, t) => {
  const centerX = Math.sin(t * 0.2) * 20;
  const centerY = Math.cos(t * 0.2) * 20;
  const d = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
  return Math.sin(d * 0.15 - t * 2);
};

// Terrain-like elevation
const terrainNoise: NoiseFunction = (x, y, t) => {
  return (
    Math.sin(x * 0.05 + t * 0.3) * Math.cos(y * 0.05 + t * 0.2) +
    Math.sin(x * 0.1 + y * 0.1 + t) * 0.5
  );
};

const NOISE_FUNCTIONS = [planeNoise, waveDepth, spiralNoise, rippleNoise, terrainNoise];
const CHAR_SETS = [ASCII_DEPTH, ASCII_SHAPES, ASCII_COMPUTE];

export function ASCIIDotGrid({
  opacity = 0.08,
  cellSize = 32,
  animated = true,
  colorTheme,
}: ASCIIDotGridProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [noiseFnIndex, setNoiseFnIndex] = useState(0);
  const [charSetIndex, setCharSetIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);

  // Cache color calculations - compute once per theme change
  const colorLookupTable = useMemo(() => {
    if (!colorTheme) return null;
    const table: string[] = [];
    for (let i = 0; i <= 100; i++) {
      table.push(interpolateColors(colorTheme.colors, i / 100));
    }
    return table;
  }, [colorTheme]);
  const colorTimeRef = useRef(0); // Separate time for color animation
  const frameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate grid dimensions with mobile detection
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const mobile = window.innerWidth < 768;

        setIsMobile(mobile);

        // Double cell size on mobile for 50% fewer DOM nodes
        const effectiveCellSize = mobile ? cellSize * 2 : cellSize;
        const newCols = Math.ceil(width / effectiveCellSize) + 2;
        const newRows = Math.ceil(height / effectiveCellSize) + 2;

        setCols(newCols);
        setRows(newRows);
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [cellSize]);

  // Cycle through noise functions and character sets
  useEffect(() => {
    const fnInterval = setInterval(() => {
      setNoiseFnIndex((prev) => (prev + 1) % NOISE_FUNCTIONS.length);
    }, 12000);

    const charInterval = setInterval(() => {
      setCharSetIndex((prev) => (prev + 1) % CHAR_SETS.length);
    }, 18000);

    return () => {
      clearInterval(fnInterval);
      clearInterval(charInterval);
    };
  }, []);

  // Animation loop - Throttled to 10 FPS for performance
  useEffect(() => {
    if (!animated || cols === 0 || rows === 0) return;

    let lastUpdateTime = 0;
    const updateInterval = 200; // Update every 200ms (5 FPS)

    const animate = (currentTime: number) => {
      // Throttle to 10 FPS
      if (currentTime - lastUpdateTime < updateInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTime = currentTime;

      timeRef.current += 0.008; // Slow, meditative speed
      colorTimeRef.current += 0.004; // Even slower color animation
      const t = timeRef.current;
      const colorT = colorTimeRef.current;
      const noiseFn = NOISE_FUNCTIONS[noiseFnIndex];
      const charSet = CHAR_SETS[charSetIndex];

      const newGrid: string[][] = [];

      for (let row = 0; row < rows; row++) {
        const gridRow: string[] = [];
        for (let col = 0; col < cols; col++) {
          // Center the coordinate system
          const x = col - cols / 2;
          const y = row - rows / 2;

          // Generate noise value between -1 and 1
          const noiseValue = noiseFn(x, y, t);

          // Map to character index (0 to charSet.length-1)
          const normalized = (noiseValue + 1) / 2; // 0 to 1
          const charIndex = Math.floor(normalized * charSet.length);
          const safeIndex = Math.max(0, Math.min(charSet.length - 1, charIndex));

          gridRow.push(charSet[safeIndex]);
        }
        newGrid.push(gridRow);
      }

      setGrid(newGrid);
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animated, cols, rows, noiseFnIndex, charSetIndex]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className={`font-mono select-none ${colorTheme ? '' : 'text-accent'}`}
        style={{
          fontSize: `${(isMobile ? cellSize * 2 : cellSize) * 0.45}px`,
          lineHeight: `${isMobile ? cellSize * 2 : cellSize}px`,
          letterSpacing: '0.1em',
        }}
      >
        {grid.map((row, y) => (
          <div key={y} className="whitespace-nowrap">
            {row.map((char, x) => {
              // Calculate color based on position and time (watercolor effect)
              let color = 'currentColor';
              if (colorTheme && colorLookupTable) {
                // Different color field pattern than small grid for variety
                const colorNoise = Math.sin(x * 0.08 + colorTimeRef.current * 0.8) *
                                  Math.cos(y * 0.08 + colorTimeRef.current * 0.6);
                const colorT = (colorNoise + 1) / 2; // Normalize to 0-1

                // Use pre-calculated color from lookup table
                const colorIndex = Math.floor(colorT * 100);
                color = colorLookupTable[colorIndex];
              }

              const effectiveCellSize = isMobile ? cellSize * 2 : cellSize;
              return (
                <span
                  key={`${x}-${y}`}
                  style={{
                    display: 'inline-block',
                    width: `${effectiveCellSize}px`,
                    textAlign: 'center',
                    color
                  }}
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

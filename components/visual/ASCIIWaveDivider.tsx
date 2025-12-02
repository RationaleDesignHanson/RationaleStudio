/**
 * ASCII Noise Grid Shader Component
 *
 * Full-width 6-row dot grid with various ASCII noise functions flowing through
 * Computational generative aesthetic with Perlin, simplex, and wave noise patterns
 * Slow, meditative motion for low-frequency visual rhythm
 * Now with computational watercolor color gradients
 */

'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { interpolateColors, type WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface ASCIIWaveDividerProps {
  opacity?: number;
  className?: string;
  colorTheme?: WatercolorTheme;
}

// ASCII character sets for different noise densities
const ASCII_CHARS = ['.', '·', '°', '•', '+', '×', '/', '\\', '|', '—'];

// Noise function types
type NoiseFunction = (x: number, y: number, t: number) => number;

// Simple Perlin-like noise (simplified for performance)
const perlinNoise: NoiseFunction = (x, y, t) => {
  return (Math.sin(x * 0.1 + t) + Math.sin(y * 0.1 + t * 0.8)) / 2;
};

// Wave interference pattern
const waveNoise: NoiseFunction = (x, y, t) => {
  return Math.sin(x * 0.15 + t) * Math.cos(y * 0.15 + t * 0.7);
};

// Simplex-like noise
const simplexNoise: NoiseFunction = (x, y, t) => {
  const angle = Math.atan2(y, x);
  const radius = Math.sqrt(x * x + y * y);
  return Math.sin(angle * 3 + t) * Math.cos(radius * 0.05 + t * 0.5);
};

// Turbulence noise
const turbulenceNoise: NoiseFunction = (x, y, t) => {
  return Math.sin(x * 0.08 + t) * Math.sin(y * 0.12 + t * 0.6) * Math.cos((x + y) * 0.05 + t);
};

// Cellular/Voronoi-like noise
const cellularNoise: NoiseFunction = (x, y, t) => {
  const cellX = Math.floor(x / 8);
  const cellY = Math.floor(y / 8);
  return Math.sin(cellX * cellY + t) * Math.cos((cellX + cellY) * 0.5 + t);
};

const NOISE_FUNCTIONS = [perlinNoise, waveNoise, simplexNoise, turbulenceNoise, cellularNoise];

export function ASCIIWaveDivider({
  opacity = 0.65,
  className = '',
  colorTheme
}: ASCIIWaveDividerProps) {
  const [rows, setRows] = useState(6);
  const initialCols = 200;
  const colorTimeRef = useRef(0); // Separate time for color animation

  // Initialize grid with default pattern
  const createInitialGrid = () => {
    const initialGrid: string[][] = [];
    for (let y = 0; y < rows; y++) {
      const row: string[] = [];
      for (let x = 0; x < initialCols; x++) {
        row.push('·');
      }
      initialGrid.push(row);
    }
    return initialGrid;
  };

  const [grid, setGrid] = useState<string[][]>(createInitialGrid);
  const [cols, setCols] = useState(initialCols);
  const [noiseFnIndex, setNoiseFnIndex] = useState(0);
  const timeRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cache color calculations - compute once per theme change
  const colorLookupTable = useMemo(() => {
    if (!colorTheme) return null;
    const table: string[] = [];
    for (let i = 0; i <= 100; i++) {
      table.push(interpolateColors(colorTheme.colors, i / 100));
    }
    return table;
  }, [colorTheme]);

  // Calculate columns based on viewport width and adjust rows for mobile
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;

        // Adjust rows based on screen width
        const isMobile = window.innerWidth < 640; // sm breakpoint
        setRows(isMobile ? 3 : 6);

        // Create a test span to measure actual character width
        const testSpan = document.createElement('span');
        testSpan.style.font = 'inherit';
        testSpan.style.fontSize = '0.65rem';
        testSpan.style.fontFamily = 'monospace';
        testSpan.style.letterSpacing = '0.15em';
        testSpan.style.visibility = 'hidden';
        testSpan.style.position = 'absolute';
        testSpan.textContent = '•'; // Use a test character

        document.body.appendChild(testSpan);
        const charWidth = testSpan.offsetWidth;
        document.body.removeChild(testSpan);

        // Calculate columns with generous padding to ensure full coverage
        const calculatedCols = Math.ceil(containerWidth / charWidth) + 10; // Add 10 for safety
        console.log('Container width:', containerWidth, 'Char width:', charWidth, 'Cols:', calculatedCols, 'Rows:', isMobile ? 3 : 6);
        setCols(Math.max(100, calculatedCols));
      }
    };

    // Multiple calculation attempts to ensure we get the right value
    const timer1 = setTimeout(calculateDimensions, 0);
    const timer2 = setTimeout(calculateDimensions, 100);
    const timer3 = setTimeout(calculateDimensions, 500);

    window.addEventListener('resize', calculateDimensions);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener('resize', calculateDimensions);
    };
  }, []);

  useEffect(() => {
    // Cycle noise functions every 8 seconds
    const fnInterval = setInterval(() => {
      setNoiseFnIndex((prev) => (prev + 1) % NOISE_FUNCTIONS.length);
    }, 8000);

    return () => clearInterval(fnInterval);
  }, []);

  useEffect(() => {
    const animate = () => {
      // Slow down animation by 20x: 0.02 -> 0.001
      timeRef.current += 0.001;
      colorTimeRef.current += 0.0005; // Even slower color animation
      const t = timeRef.current;
      const colorT = colorTimeRef.current;
      const noiseFn = NOISE_FUNCTIONS[noiseFnIndex];

      const newGrid: string[][] = [];

      for (let y = 0; y < rows; y++) {
        const row: string[] = [];
        for (let x = 0; x < cols; x++) {
          // Generate noise value between -1 and 1
          const noiseValue = noiseFn(x, y, t);

          // Map noise to character index (0-9)
          const normalizedValue = (noiseValue + 1) / 2; // 0 to 1
          const charIndex = Math.floor(normalizedValue * ASCII_CHARS.length);
          const safeIndex = Math.max(0, Math.min(ASCII_CHARS.length - 1, charIndex));

          row.push(ASCII_CHARS[safeIndex]);
        }
        newGrid.push(row);
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
  }, [noiseFnIndex, cols]);

  // Helper function to darken a hex color while preserving/boosting saturation
  const darkenColor = (hex: string, darkenAmount: number = 0.4, saturationBoost: number = 1.3): string => {
    const num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) / 255;
    let g = ((num >> 8) & 0x00FF) / 255;
    let b = (num & 0x0000FF) / 255;

    // Convert to HSL to manipulate saturation
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;
    }

    // Darken by reducing lightness and boost saturation
    l = l * (1 - darkenAmount);
    s = Math.min(1, s * saturationBoost);

    // Convert back to RGB
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const rInt = Math.round(r * 255);
    const gInt = Math.round(g * 255);
    const bInt = Math.round(b * 255);
    return `#${((rInt << 16) | (gInt << 8) | bInt).toString(16).padStart(6, '0')}`;
  };

  // Get darkened but saturated color for overlay
  const overlayColor = colorTheme ? darkenColor(colorTheme.primary, 0.4, 1.5) : '#000000';

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden font-mono select-none bg-background relative ${className}`}
      style={{
        opacity,
        fontSize: '0.65rem',
        lineHeight: '1.2',
        letterSpacing: '0.15em',
        zIndex: 5,
      }}
      aria-hidden="true"
    >
      {/* Dark overlay for visual separation */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: overlayColor,
          opacity: 0.1,
          mixBlendMode: 'multiply',
          zIndex: 0,
        }}
      />
      <div className={`overflow-hidden relative ${colorTheme ? '' : 'text-accent/80'}`} style={{ zIndex: 10 }}>
        {grid.map((row, y) => (
          <div key={y} className="whitespace-nowrap overflow-hidden" style={{ width: '100%' }}>
            {row.map((char, x) => {
              // Calculate color based on position and time (watercolor effect)
              if (colorTheme && colorLookupTable) {
                // Create horizontal wave of color
                const colorNoise = Math.sin(x * 0.03 + colorTimeRef.current) *
                                  Math.cos(y * 0.5 + colorTimeRef.current * 0.3);
                const colorT = (colorNoise + 1) / 2; // Normalize to 0-1

                // Use pre-calculated color from lookup table
                const colorIndex = Math.floor(colorT * 100);
                const color = colorLookupTable[colorIndex];

                return <span key={x} style={{ color }}>{char}</span>;
              }
              return char;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

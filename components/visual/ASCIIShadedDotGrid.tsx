/**
 * ASCII Shaded Dot Grid
 *
 * Dense grid of 1px dots with ASCII character shading overlay
 * Characters transform to represent 3D objects moving through space
 * Creates depth through character-based shading
 * Now with computational watercolor color gradients
 */

'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { interpolateColors, type WatercolorTheme } from '@/lib/theme/watercolor-palette';

interface ASCIIShadedDotGridProps {
  opacity?: number;
  spacing?: number;
  dotSize?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
}

// Character progression representing depth/shading (light to dark)
// Using similar characters to ASCIIWaveDivider for consistency
const SHADE_CHARS = ['·', '∙', '•', '●', '○', '◉', '⦿', '◎', '◌', '◯'];

// 3D object noise functions - represent invisible forms moving through space
type NoiseFunction = (x: number, y: number, z: number) => number;

// Moving sphere - larger, always partially visible
const sphere: NoiseFunction = (x, y, z) => {
  const radius = 25; // Increased from 15
  const distance = Math.sqrt(x * x + y * y + z * z);
  return Math.max(0, 1 - distance / radius);
};

// Rotating torus - larger
const torus: NoiseFunction = (x, y, z) => {
  const majorRadius = 30; // Increased from 20
  const minorRadius = 12; // Increased from 8
  const distanceFromCenter = Math.sqrt(x * x + y * y);
  const torusDistance = Math.sqrt(Math.pow(distanceFromCenter - majorRadius, 2) + z * z);
  return Math.max(0, 1 - torusDistance / minorRadius);
};

// Plane wave - covers more area
const plane: NoiseFunction = (x, y, z) => {
  const wave = Math.sin(x * 0.08 + z) * Math.cos(y * 0.08 + z); // Slower frequency = larger waves
  return Math.max(0, wave);
};

// Expanding/contracting blob - slower falloff
const blob: NoiseFunction = (x, y, z) => {
  const d = Math.sqrt(x * x + y * y);
  const ripple = Math.sin(d * 0.12 - z * 2) * 0.5 + 0.5; // Slower ripple
  const falloff = Math.exp(-d * 0.03); // Slower falloff = larger blob
  return ripple * falloff;
};

const FORMS = [sphere, torus, plane, blob];

// Create initial grid to prevent empty state on mount
const createInitialGrid = (rows: number, cols: number) => {
  const grid: string[][] = [];
  for (let y = 0; y < rows; y++) {
    const row: string[] = [];
    for (let x = 0; x < cols; x++) {
      // Start with lightest character
      row.push(SHADE_CHARS[0]);
    }
    grid.push(row);
  }
  return grid;
};

export function ASCIIShadedDotGrid({
  opacity = 0.06,
  spacing = 10,
  dotSize = 1,
  animated = true,
  colorTheme,
}: ASCIIShadedDotGridProps) {
  const [grid, setGrid] = useState<string[][]>([]);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [formIndex, setFormIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timeRef = useRef(0);
  const colorTimeRef = useRef(0); // Separate time for color animation
  const offsetRef = useRef({ x: 0, y: 0 });
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

  // Calculate grid dimensions with mobile detection
  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        const mobile = window.innerWidth < 768;

        setIsMobile(mobile);

        // Double spacing on mobile for 50% fewer DOM nodes
        const effectiveSpacing = mobile ? spacing * 2 : spacing;
        const newCols = Math.ceil(width / effectiveSpacing) + 2;
        const newRows = Math.ceil(height / effectiveSpacing) + 2;

        setCols(newCols);
        setRows(newRows);

        // Initialize grid immediately to prevent empty state
        setGrid(createInitialGrid(newRows, newCols));
      }
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);
    return () => window.removeEventListener('resize', calculateDimensions);
  }, [spacing]);

  // Cycle through 3D forms
  useEffect(() => {
    const interval = setInterval(() => {
      setFormIndex((prev) => (prev + 1) % FORMS.length);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Animation loop - throttled for performance
  useEffect(() => {
    if (!animated || cols === 0 || rows === 0) return;

    let startTime = Date.now();
    let lastUpdateTime = 0;
    const updateInterval = 200; // Update every 200ms (5 FPS)

    const animate = (currentTime: number) => {
      // Throttle updates
      if (currentTime - lastUpdateTime < updateInterval) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTime = currentTime;

      const elapsed = Date.now() - startTime;
      // 12s breathing cycle (matching original circular motion)
      const cycle = 12000;
      const progress = (elapsed % cycle) / cycle;

      // Circular drift motion (10px radius like original)
      const offsetX = Math.sin(progress * Math.PI * 2) * 10;
      const offsetY = Math.cos(progress * Math.PI * 2) * 10;
      offsetRef.current = { x: offsetX, y: offsetY };

      timeRef.current += 0.01; // Slow meditative speed
      colorTimeRef.current += 0.005; // Even slower color animation (20-30s cycles)
      const t = timeRef.current;
      const colorT = colorTimeRef.current;
      const form = FORMS[formIndex];

      const newGrid: string[][] = [];

      for (let row = 0; row < rows; row++) {
        const gridRow: string[] = [];
        for (let col = 0; col < cols; col++) {
          // Center the coordinate system and apply offset
          const effectiveSpacing = isMobile ? spacing * 2 : spacing;
          const x = col - cols / 2 + offsetX / effectiveSpacing;
          const y = row - rows / 2 + offsetY / effectiveSpacing;

          // 3D form evaluation (z changes over time)
          const z = t;
          const density = form(x, y, z);

          // Map density to character index (0 = empty/space, higher = darker)
          const charIndex = Math.floor(density * (SHADE_CHARS.length - 1));
          const safeIndex = Math.max(0, Math.min(SHADE_CHARS.length - 1, charIndex));

          gridRow.push(SHADE_CHARS[safeIndex]);
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
  }, [animated, cols, rows, spacing, formIndex]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* ASCII character grid - optimized rendering */}
      <div
        className={`absolute inset-0 font-mono select-none ${colorTheme ? '' : 'text-accent'}`}
        style={{
          fontSize: `${(isMobile ? spacing * 2 : spacing) * 0.8}px`,
          lineHeight: `${isMobile ? spacing * 2 : spacing}px`,
          letterSpacing: '0',
        }}
      >
        {grid.map((row, y) => {
          // Pre-process entire row for performance
          const effectiveSpacing = isMobile ? spacing * 2 : spacing;
          const rowContent = row.map((char, x) => {
            const charIndex = SHADE_CHARS.indexOf(char);
            const density = charIndex / (SHADE_CHARS.length - 1);
            const charOpacity = 0.3 + density * 0.7;

            // Calculate color based on position and time (watercolor effect)
            let color = 'currentColor';
            if (colorTheme && colorLookupTable) {
              // Create color field that moves slowly through space
              const colorNoise = Math.sin(x * 0.05 + colorTimeRef.current) *
                                Math.cos(y * 0.05 + colorTimeRef.current * 0.7);
              const colorT = (colorNoise + 1) / 2; // Normalize to 0-1

              // Use pre-calculated color from lookup table
              const colorIndex = Math.floor(colorT * 100);
              color = colorLookupTable[colorIndex];
            }

            // Return inline styles as string for better performance
            return `<span style="display:inline-block;width:${effectiveSpacing}px;text-align:center;opacity:${charOpacity};color:${color}">${char}</span>`;
          }).join('');

          return (
            <div
              key={y}
              className="whitespace-nowrap"
              style={{ height: `${effectiveSpacing}px` }}
              dangerouslySetInnerHTML={{ __html: rowContent }}
            />
          );
        })}
      </div>
    </div>
  );
}

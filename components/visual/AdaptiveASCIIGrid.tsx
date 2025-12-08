/**
 * Adaptive ASCII Grid
 *
 * Intelligent wrapper that selects the best rendering strategy
 * based on device capabilities: WebGL → Canvas → Static
 *
 * Integrates with IntersectionObserver and reduced motion preferences
 */

'use client';

import { useEffect, useState, useRef } from 'react';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';
import { useDeviceCapability, useAdaptiveGridSettings } from '@/hooks/useDeviceCapability';
import { useReducedMotion } from '@/components/athletes-first/PerformanceOptimizer';
import { ASCIIShaderGrid } from './ASCIIShaderGrid';

interface AdaptiveASCIIGridProps {
  opacity?: number;
  animated?: boolean;
  colorTheme?: WatercolorTheme;
  forceStrategy?: 'webgl' | 'canvas' | 'auto'; // Allow manual override
  // Layer-specific props
  smallSpacing?: number;
  mediumSpacing?: number;
  smallOpacity?: number;
  mediumOpacity?: number;
  smallSpeed?: number;
  mediumSpeed?: number;
}

export function AdaptiveASCIIGrid({
  opacity: customOpacity,
  animated = true,
  colorTheme,
  forceStrategy = 'auto',
  smallSpacing = 12,
  mediumSpacing = 24,
  smallOpacity = 0.45,
  mediumOpacity = 0.35,
  smallSpeed = 0.5,
  mediumSpeed = 1.5,
}: AdaptiveASCIIGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Device capability detection
  const {
    renderStrategy: detectedStrategy,
    targetFPS,
    capability,
  } = useDeviceCapability();

  // Adaptive settings
  const adaptiveSettings = useAdaptiveGridSettings(capability);

  // Reduced motion support
  const prefersReducedMotion = useReducedMotion();

  // Final render strategy - ALWAYS use WebGL (we only have the shader now!)
  const renderStrategy = 'webgl';

  // Final animation state
  const shouldAnimate = animated && !prefersReducedMotion && isVisible && isReady;

  // Final opacity (use custom or adaptive)
  const finalOpacity = customOpacity || adaptiveSettings.opacity;

  // Intersection Observer for visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Start loading slightly before visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Delay animation start until after initial paint
  // Don't set isReady to false when not visible - this prevents the grid from getting stuck
  useEffect(() => {
    if (isVisible && !isReady) {
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);

      return () => clearTimeout(timer);
    }
    // Intentionally NOT setting isReady to false when not visible
    // This allows the grid to keep rendering, just with paused animation
  }, [isVisible, isReady]);

  // Log strategy in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && isVisible) {
      console.log('[AdaptiveASCIIGrid]', {
        strategy: renderStrategy,
        capability,
        targetFPS,
        shouldAnimate,
        opacity: finalOpacity,
      });
    }
  }, [renderStrategy, capability, targetFPS, shouldAnimate, finalOpacity, isVisible]);

  // Always use our WebGL shader (we built this!)
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0">
      <ASCIIShaderGrid
        opacity={finalOpacity}
        animated={shouldAnimate}
        colorTheme={colorTheme}
        targetFPS={targetFPS}
        smallSpacing={smallSpacing}
        mediumSpacing={mediumSpacing}
        smallOpacity={smallOpacity}
        mediumOpacity={mediumOpacity}
        smallSpeed={smallSpeed}
        mediumSpeed={mediumSpeed}
      />
    </div>
  );
}

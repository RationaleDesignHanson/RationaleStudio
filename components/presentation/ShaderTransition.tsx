/**
 * ShaderTransition Component
 *
 * GPU-accelerated transition effects between slides/views with ASCII shader overlays.
 * Provides cinematic transitions with terminal aesthetics.
 *
 * Features:
 * - Multiple transition types (fade, slide, scale, glitch)
 * - Shader overlay during transitions
 * - Configurable duration and easing
 * - Boot sequence animation style
 */

'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';

export type TransitionType = 'fade' | 'slideLeft' | 'slideRight' | 'scale' | 'glitch';

export interface ShaderTransitionProps {
  children: ReactNode;
  transitionKey: string | number;
  type?: TransitionType;
  duration?: number;
  shaderTheme?: WatercolorTheme;
  shaderIntensity?: number;
  className?: string;
}

export function ShaderTransition({
  children,
  transitionKey,
  type = 'fade',
  duration = 300,
  shaderTheme = { colors: ['#1f2937', '#374151', '#FFD700'], name: 'transition-theme', primary: '#FFD700', description: 'Transition theme' },
  shaderIntensity = 0.3,
  className = '',
}: ShaderTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentKey, setCurrentKey] = useState(transitionKey);
  const [direction, setDirection] = useState<'out' | 'in'>('in');

  useEffect(() => {
    if (transitionKey !== currentKey) {
      // Start transition out
      setDirection('out');
      setIsTransitioning(true);

      // Halfway through, swap content and transition in
      const timer = setTimeout(() => {
        setCurrentKey(transitionKey);
        setDirection('in');

        // End transition
        setTimeout(() => {
          setIsTransitioning(false);
        }, duration / 2);
      }, duration / 2);

      return () => clearTimeout(timer);
    }
  }, [transitionKey, currentKey, duration]);

  const getTransitionStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    };

    if (!isTransitioning) {
      return {
        ...baseStyles,
        opacity: 1,
        transform: 'translate(0, 0) scale(1)',
      };
    }

    const isOut = direction === 'out';

    switch (type) {
      case 'fade':
        return {
          ...baseStyles,
          opacity: isOut ? 0 : 1,
        };

      case 'slideLeft':
        return {
          ...baseStyles,
          transform: isOut ? 'translateX(-100%)' : 'translateX(0)',
          opacity: isOut ? 0.5 : 1,
        };

      case 'slideRight':
        return {
          ...baseStyles,
          transform: isOut ? 'translateX(100%)' : 'translateX(0)',
          opacity: isOut ? 0.5 : 1,
        };

      case 'scale':
        return {
          ...baseStyles,
          transform: isOut ? 'scale(0.8)' : 'scale(1)',
          opacity: isOut ? 0 : 1,
        };

      case 'glitch':
        return {
          ...baseStyles,
          transform: isOut
            ? `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px) scale(0.95)`
            : 'translate(0, 0) scale(1)',
          opacity: isOut ? 0 : 1,
          filter: isOut ? 'hue-rotate(90deg)' : 'hue-rotate(0deg)',
        };

      default:
        return baseStyles;
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Shader Overlay During Transition */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={shaderIntensity}
            animated={true}
            colorTheme={shaderTheme}
            charSet="default"
          />
        </div>
      )}

      {/* Content with Transition */}
      <div style={getTransitionStyles()}>
        {currentKey === transitionKey ? children : null}
      </div>
    </div>
  );
}

/**
 * Boot Sequence Transition
 *
 * Special transition that simulates a terminal boot sequence.
 * Perfect for initial page loads or major section transitions.
 */
export interface BootSequenceProps {
  children: ReactNode;
  isBooting: boolean;
  bootMessages?: string[];
  onBootComplete?: () => void;
  className?: string;
}

export function BootSequence({
  children,
  isBooting,
  bootMessages = [
    'INITIALIZING SYSTEM...',
    'LOADING MODULES...',
    'CONNECTING TO SHADER GRID...',
    'SYSTEM READY',
  ],
  onBootComplete,
  className = '',
}: BootSequenceProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isComplete, setIsComplete] = useState(!isBooting);

  useEffect(() => {
    if (!isBooting) {
      setIsComplete(true);
      return;
    }

    if (currentMessage < bootMessages.length) {
      const timer = setTimeout(() => {
        setCurrentMessage((prev) => prev + 1);
      }, 400);

      return () => clearTimeout(timer);
    } else {
      // Boot complete
      const completeTimer = setTimeout(() => {
        setIsComplete(true);
        onBootComplete?.();
      }, 200);

      return () => clearTimeout(completeTimer);
    }
  }, [isBooting, currentMessage, bootMessages.length, onBootComplete]);

  if (isComplete) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative min-h-screen bg-black flex items-center justify-center ${className}`}>
      {/* Background Shader */}
      <div className="absolute inset-0">
        <ASCIIUnifiedGrid
          opacity={0.15}
          animated={true}
          colorTheme={{ colors: ['#1f2937', '#374151', '#FFD700'], name: 'transition-overlay', primary: '#FFD700', description: 'Transition overlay theme' }}
          charSet="default"
        />
      </div>

      {/* Boot Messages */}
      <div className="relative z-10 max-w-md w-full px-4">
        <div className="border border-[#FFD700]/30 bg-black/80 backdrop-blur-sm p-6 rounded-lg">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#FFD700]/20">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/60" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/30" />
            </div>
            <span className="text-xs font-mono text-[#FFD700]">system.boot</span>
          </div>

          {/* Messages */}
          <div className="space-y-2 font-mono text-sm">
            {bootMessages.slice(0, currentMessage + 1).map((message, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 ${
                  index === currentMessage ? 'text-[#FFD700]' : 'text-gray-500'
                }`}
              >
                <span className="text-[#FFD700]">{'>'}</span>
                <span>{message}</span>
                {index === currentMessage && (
                  <span className="animate-pulse">_</span>
                )}
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pt-4 border-t border-[#FFD700]/20">
            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD700]/50 to-[#FFD700] transition-all duration-300"
                style={{
                  width: `${((currentMessage + 1) / bootMessages.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

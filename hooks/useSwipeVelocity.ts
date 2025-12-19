'use client';

import { useRef } from 'react';

export interface SwipeVelocityResult {
  velocity: number;
  direction: 'horizontal' | 'vertical' | null;
  isIntentional: boolean;
}

/**
 * Hook for detecting swipe velocity and intentionality
 * Helps distinguish between accidental scrolls and intentional swipes
 *
 * @param horizontalThreshold - Minimum velocity in px/ms for horizontal swipes (default: 0.5)
 * @param verticalThreshold - Minimum velocity in px/ms for vertical swipes (default: same as horizontal)
 */
export function useSwipeVelocity(horizontalThreshold: number = 0.5, verticalThreshold?: number) {
  const startTimeRef = useRef<number>(0);
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // If verticalThreshold not provided, use horizontalThreshold for both
  const vThreshold = verticalThreshold ?? horizontalThreshold;

  const recordStart = (x: number, y: number) => {
    startTimeRef.current = Date.now();
    startPosRef.current = { x, y };
  };

  const calculateVelocity = (endX: number, endY: number): SwipeVelocityResult => {
    const endTime = Date.now();
    const deltaTime = endTime - startTimeRef.current;

    if (deltaTime === 0) {
      return { velocity: 0, direction: null, isIntentional: false };
    }

    const deltaX = Math.abs(endX - startPosRef.current.x);
    const deltaY = Math.abs(endY - startPosRef.current.y);

    const isHorizontal = deltaX > deltaY;
    const distance = isHorizontal ? deltaX : deltaY;
    const velocity = distance / deltaTime; // px per ms

    // Apply appropriate threshold based on direction
    const applicableThreshold = isHorizontal ? horizontalThreshold : vThreshold;

    return {
      velocity,
      direction: isHorizontal ? 'horizontal' : 'vertical',
      isIntentional: velocity >= applicableThreshold
    };
  };

  return {
    recordStart,
    calculateVelocity
  };
}

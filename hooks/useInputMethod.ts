'use client';

import { useState, useEffect } from 'react';
import { useMediaQuery } from './useMediaQuery';

export type InputMethod = 'touch' | 'mouse' | 'hybrid';

export interface InputMethodResult {
  inputMethod: InputMethod;
  hasTouchScreen: boolean;
  hasPointer: boolean;
  prefersMouse: boolean;
  prefersTouch: boolean;
  supportsHover: boolean;
}

/**
 * Hook for detecting input method capabilities
 * Determines if the device primarily uses touch or mouse input
 *
 * @example
 * const { inputMethod, prefersTouch, supportsHover } = useInputMethod();
 * if (prefersTouch) {
 *   // Show swipe gestures
 * } else {
 *   // Show button controls
 * }
 */
export function useInputMethod(): InputMethodResult {
  const [hasTouchScreen, setHasTouchScreen] = useState(false);

  // Check if device has coarse pointer (touch)
  const hasCoarsePointer = useMediaQuery('(pointer: coarse)');

  // Check if device supports hover
  const supportsHover = useMediaQuery('(hover: hover)');

  // Check if device has fine pointer (mouse/trackpad)
  const hasFinePointer = useMediaQuery('(pointer: fine)');

  useEffect(() => {
    // Check for touch support
    const touchSupported =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - Legacy API
      (navigator.msMaxTouchPoints || 0) > 0;

    setHasTouchScreen(touchSupported);
  }, []);

  // Determine input method
  let inputMethod: InputMethod = 'mouse';

  if (hasTouchScreen && !supportsHover) {
    // Pure touch device (mobile/tablet)
    inputMethod = 'touch';
  } else if (hasTouchScreen && supportsHover) {
    // Hybrid device (touchscreen laptop)
    inputMethod = 'hybrid';
  } else {
    // Desktop without touch
    inputMethod = 'mouse';
  }

  const prefersTouch = inputMethod === 'touch' || (inputMethod === 'hybrid' && hasCoarsePointer);
  const prefersMouse = inputMethod === 'mouse' || (inputMethod === 'hybrid' && !hasCoarsePointer);

  return {
    inputMethod,
    hasTouchScreen,
    hasPointer: hasFinePointer,
    prefersMouse,
    prefersTouch,
    supportsHover,
  };
}

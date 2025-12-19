'use client';

import { useEffect, useCallback } from 'react';

export interface KeyboardNavigationCallbacks {
  onRight?: () => void;
  onLeft?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  onEscape?: () => void;
  onSpace?: () => void;
  onEnter?: () => void;
}

/**
 * Hook for handling keyboard navigation in demos
 * Maps arrow keys, escape, space, and enter to callbacks
 *
 * @example
 * useKeyboardNavigation({
 *   onRight: () => executeAction('right'),
 *   onLeft: () => executeAction('left'),
 *   onEscape: () => closeModal(),
 * });
 */
export function useKeyboardNavigation(callbacks: KeyboardNavigationCallbacks, enabled: boolean = true) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Don't handle keys when typing in inputs
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement
      ) {
        return;
      }

      // Prevent default behavior for handled keys
      const shouldPreventDefault = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'Escape'].includes(
        event.key
      );

      if (shouldPreventDefault) {
        event.preventDefault();
      }

      // Map keys to callbacks
      switch (event.key) {
        case 'ArrowRight':
          callbacks.onRight?.();
          break;
        case 'ArrowLeft':
          callbacks.onLeft?.();
          break;
        case 'ArrowUp':
          callbacks.onUp?.();
          break;
        case 'ArrowDown':
          callbacks.onDown?.();
          break;
        case 'Escape':
          callbacks.onEscape?.();
          break;
        case ' ':
          callbacks.onSpace?.();
          break;
        case 'Enter':
          callbacks.onEnter?.();
          break;
      }
    },
    [callbacks]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

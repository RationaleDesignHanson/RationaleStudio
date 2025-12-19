'use client';

import { useState, useEffect } from 'react';

export interface ABTestVariant {
  id: string;
  name: string;
  weight?: number; // Optional weighting for distribution (default: equal)
}

export interface ABTestConfig {
  testId: string;
  variants: ABTestVariant[];
  persistKey?: string; // LocalStorage key for persistence across sessions
}

/**
 * useABTest Hook
 * Simple A/B testing framework for testing different component variants
 * Persists variant selection across sessions using localStorage
 *
 * @example
 * ```tsx
 * const { variant, isReady } = useABTest({
 *   testId: 'cta-button-text',
 *   variants: [
 *     { id: 'control', name: 'Join Waitlist' },
 *     { id: 'variant-a', name: 'Get Early Access' },
 *     { id: 'variant-b', name: 'Start Free Trial' }
 *   ]
 * });
 *
 * if (!isReady) return null;
 *
 * return <button>{variant.name}</button>;
 * ```
 */
export function useABTest(config: ABTestConfig) {
  const { testId, variants, persistKey = `ab-test-${testId}` } = config;

  const [variant, setVariant] = useState<ABTestVariant | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if variant is already assigned
    const storedVariantId = localStorage.getItem(persistKey);

    if (storedVariantId) {
      // Use existing variant
      const existingVariant = variants.find(v => v.id === storedVariantId);
      if (existingVariant) {
        setVariant(existingVariant);
        setIsReady(true);
        return;
      }
    }

    // Assign new variant using weighted random selection
    const selectedVariant = selectVariant(variants);
    localStorage.setItem(persistKey, selectedVariant.id);
    setVariant(selectedVariant);
    setIsReady(true);

    // Track variant assignment with analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ab_test_assigned', {
        test_id: testId,
        variant_id: selectedVariant.id,
        variant_name: selectedVariant.name
      });
    }
  }, [testId, variants, persistKey]);

  return {
    variant: variant || variants[0], // Fallback to first variant
    isReady,
    testId
  };
}

/**
 * Selects a variant based on weights (if provided) or equal distribution
 */
function selectVariant(variants: ABTestVariant[]): ABTestVariant {
  // Calculate total weight
  const totalWeight = variants.reduce((sum, v) => sum + (v.weight || 1), 0);

  // Generate random number
  let random = Math.random() * totalWeight;

  // Select variant based on weight
  for (const variant of variants) {
    random -= (variant.weight || 1);
    if (random <= 0) {
      return variant;
    }
  }

  // Fallback to first variant
  return variants[0];
}

/**
 * Hook to track conversion events for A/B tests
 * Call this when the user performs the target action (e.g., clicks CTA)
 */
export function useTrackConversion(testId: string, variantId: string) {
  const trackConversion = (eventName: string = 'conversion') => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        test_id: testId,
        variant_id: variantId
      });
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[A/B Test Conversion]', {
        testId,
        variantId,
        eventName
      });
    }
  };

  return { trackConversion };
}

/**
 * Hook to manually reset A/B test assignments (useful for testing)
 */
export function useResetABTests() {
  const resetTest = (testId: string) => {
    localStorage.removeItem(`ab-test-${testId}`);
  };

  const resetAllTests = () => {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('ab-test-')) {
        localStorage.removeItem(key);
      }
    });
  };

  return { resetTest, resetAllTests };
}

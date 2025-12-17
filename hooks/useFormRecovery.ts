/**
 * Form Recovery Hook
 *
 * Automatically saves form state to localStorage and provides recovery functionality.
 * Helps recover abandoned forms when users return to the site.
 */

'use client';

import { useEffect, useCallback, useRef } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';
import { logger } from '@/lib/utils/logger';

interface FormRecoveryOptions {
  formId: string;
  debounceMs?: number;
  expiryHours?: number;
}

interface SavedFormData {
  data: Record<string, any>;
  timestamp: number;
  url: string;
}

const STORAGE_PREFIX = 'form_recovery_';

export function useFormRecovery(options: FormRecoveryOptions) {
  const { formId, debounceMs = 1000, expiryHours = 24 } = options;
  const storageKey = `${STORAGE_PREFIX}${formId}`;
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasRestoredRef = useRef(false);

  /**
   * Save form data to localStorage
   */
  const saveFormData = useCallback((data: Record<string, any>) => {
    if (typeof window === 'undefined') return;

    // Clear any pending save
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Debounce the save
    saveTimeoutRef.current = setTimeout(() => {
      const savedData: SavedFormData = {
        data,
        timestamp: Date.now(),
        url: window.location.pathname,
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(savedData));
      } catch (error) {
        logger.error('Failed to save form data:', error);
      }
    }, debounceMs);
  }, [storageKey, debounceMs]);

  /**
   * Get saved form data from localStorage
   */
  const getSavedFormData = useCallback((): SavedFormData | null => {
    if (typeof window === 'undefined') return null;

    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return null;

      const parsed: SavedFormData = JSON.parse(saved);

      // Check if data has expired
      const expiryMs = expiryHours * 60 * 60 * 1000;
      const isExpired = Date.now() - parsed.timestamp > expiryMs;

      if (isExpired) {
        localStorage.removeItem(storageKey);
        return null;
      }

      return parsed;
    } catch (error) {
      logger.error('Failed to retrieve form data:', error);
      return null;
    }
  }, [storageKey, expiryHours]);

  /**
   * Clear saved form data
   */
  const clearSavedFormData = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      logger.error('Failed to clear form data:', error);
    }
  }, [storageKey]);

  /**
   * Check if there's restorable data
   */
  const hasRestorableData = useCallback((): boolean => {
    const saved = getSavedFormData();
    return saved !== null && Object.keys(saved.data).length > 0;
  }, [getSavedFormData]);

  /**
   * Restore form data and track analytics
   */
  const restoreFormData = useCallback((): Record<string, any> | null => {
    const saved = getSavedFormData();
    if (!saved) return null;

    hasRestoredRef.current = true;

    // Track restoration
    trackEvent(AnalyticsEvents.FORM_RECOVERY_ACCEPTED, {
      form_id: formId,
      fields_count: Object.keys(saved.data).length,
      age_hours: Math.round((Date.now() - saved.timestamp) / (1000 * 60 * 60)),
    });

    return saved.data;
  }, [getSavedFormData, formId]);

  /**
   * Track that recovery was shown but rejected
   */
  const rejectFormData = useCallback(() => {
    trackEvent(AnalyticsEvents.FORM_RECOVERY_SHOWN, {
      form_id: formId,
      action: 'rejected',
    });
    clearSavedFormData();
  }, [formId, clearSavedFormData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    saveFormData,
    getSavedFormData,
    clearSavedFormData,
    hasRestorableData,
    restoreFormData,
    rejectFormData,
    hasRestored: hasRestoredRef.current,
  };
}

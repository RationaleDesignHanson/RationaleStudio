/**
 * Zero Sequence API Client
 * Handles all API requests with retry logic and error handling
 */

import { API_CONFIG, API_TIMEOUTS, RETRY_CONFIG } from './config';
import { logger } from '@/lib/utils/logger';
import type {
  EmailData,
  ClassificationResult,
  EntityData,
  ApiResponse,
  ApiHealthStatus,
} from './types';

// Utility: delay for retry backoff
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Utility: calculate exponential backoff delay
function getBackoffDelay(attempt: number): number {
  const delay = Math.min(
    RETRY_CONFIG.initialDelay * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt),
    RETRY_CONFIG.maxDelay
  );
  return delay;
}

// Generic retry wrapper
async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries?: number;
    onRetry?: (attempt: number, error: Error) => void;
  } = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? RETRY_CONFIG.maxRetries;
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      if (attempt < maxRetries) {
        const backoffDelay = getBackoffDelay(attempt);
        options.onRetry?.(attempt + 1, lastError);
        await delay(backoffDelay);
      }
    }
  }

  throw lastError!;
}

// Fetch with timeout
async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = API_TIMEOUTS.default
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeoutMs}ms`);
    }
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Network error: Unable to reach the AI service. Please check your internet connection.');
    }
    throw error;
  }
}

/**
 * Classify email intent
 */
export async function classifyIntent(
  email: EmailData
): Promise<ClassificationResult> {
  return withRetry(
    async () => {
      const response = await fetchWithTimeout(
        API_CONFIG.classification,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(email),
        },
        API_TIMEOUTS.classification
      );

      if (!response.ok) {
        throw new Error(`Classification failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        detectedIntent: data.detectedIntent || data.intent || data.hpa || data.type || 'unknown',
        confidence: data.intentConfidence || data.confidence || 0,
        source: data._classificationSource || data.source || 'unknown',
        processingTime: data.processingTime || '0ms',
        deadline: data.deadline,
        paymentAmount: data.paymentAmount,
        suggestedActions: data.suggestedActions || [],
      };
    },
    {
      onRetry: (attempt, error) => {
        logger.warn(`Classification retry ${attempt}/${RETRY_CONFIG.maxRetries}:`, error.message);
      },
    }
  );
}

/**
 * Extract entities from email
 */
export async function extractEntities(
  email: EmailData,
  intent?: string
): Promise<EntityData> {
  return withRetry(
    async () => {
      const response = await fetchWithTimeout(
        API_CONFIG.entityExtraction,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...email, intent }),
        },
        API_TIMEOUTS.entityExtraction
      );

      if (!response.ok) {
        throw new Error(`Entity extraction failed: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        entities: data.entities || [],
        totalCount: data.entities?.length || 0,
      };
    },
    {
      onRetry: (attempt, error) => {
        logger.warn(`Entity extraction retry ${attempt}/${RETRY_CONFIG.maxRetries}:`, error.message);
      },
    }
  );
}

/**
 * Load action catalog
 */
export async function loadActionCatalog(): Promise<any> {
  return withRetry(async () => {
    const response = await fetchWithTimeout(
      API_CONFIG.actionCatalog,
      {},
      API_TIMEOUTS.default
    );

    if (!response.ok) {
      throw new Error(`Action catalog failed: ${response.statusText}`);
    }

    return response.json();
  });
}

/**
 * Load intent taxonomy
 */
export async function loadIntentTaxonomy(): Promise<any> {
  return withRetry(async () => {
    const response = await fetchWithTimeout(
      API_CONFIG.intentTaxonomy,
      {},
      API_TIMEOUTS.default
    );

    if (!response.ok) {
      throw new Error(`Intent taxonomy failed: ${response.statusText}`);
    }

    return response.json();
  });
}

/**
 * Check service health
 */
export async function checkServiceHealth(): Promise<ApiHealthStatus> {
  try {
    const healthUrl = `${API_CONFIG.classification}/health`;
    const response = await fetchWithTimeout(
      healthUrl,
      {},
      API_TIMEOUTS.healthCheck
    );

    return {
      status: response.ok ? 'online' : 'degraded',
      classificationUrl: API_CONFIG.classification,
      entityUrl: API_CONFIG.entityExtraction,
      lastChecked: new Date().toISOString(),
    };
  } catch (error) {
    logger.warn('Service health check failed:', error);
    return {
      status: 'offline',
      classificationUrl: API_CONFIG.classification,
      entityUrl: API_CONFIG.entityExtraction,
      lastChecked: new Date().toISOString(),
    };
  }
}

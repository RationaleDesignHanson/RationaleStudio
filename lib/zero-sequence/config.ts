/**
 * Zero Sequence API Configuration
 * Maps to config.js from the original HTML implementation
 */

// Use real services by default, mocks only if explicitly enabled
const USE_MOCK_APIS = process.env.NEXT_PUBLIC_USE_MOCK_ZERO_APIS === 'true';

export const API_CONFIG = {
  classification: USE_MOCK_APIS
    ? '/api/zero-sequence/classify'
    : (process.env.NEXT_PUBLIC_ZERO_CLASSIFICATION_URL || 'https://zero-classification-api.rationale.work/classify'),

  entityExtraction: USE_MOCK_APIS
    ? '/api/zero-sequence/extract-entities'
    : (process.env.NEXT_PUBLIC_ZERO_ENTITY_URL || 'https://zero-entity-api.rationale.work/extract'),

  actionCatalog: process.env.NEXT_PUBLIC_ZERO_ACTION_CATALOG_URL ||
    'https://zero-actions.rationale.work/catalog.json',

  intentTaxonomy: process.env.NEXT_PUBLIC_ZERO_INTENT_TAXONOMY_URL ||
    'https://zero-intents.rationale.work/taxonomy.json',
} as const;

export const API_TIMEOUTS = {
  classification: 10000, // 10 seconds
  entityExtraction: 8000, // 8 seconds
  healthCheck: 3000, // 3 seconds
  default: 5000, // 5 seconds
} as const;

export const RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000, // 1 second
  maxDelay: 10000, // 10 seconds
  backoffMultiplier: 2,
} as const;

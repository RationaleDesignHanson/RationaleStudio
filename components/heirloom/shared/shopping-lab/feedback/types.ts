/**
 * Feedback Collection Types
 *
 * Track user corrections and parsing accuracy to improve the system
 */

import { ParsedIngredient } from '../types';

export type FeedbackType =
  | 'correction'        // User corrected a parsing error
  | 'confirmation'      // User confirmed parsing was correct
  | 'unknown_ingredient' // Parser couldn't identify ingredient
  | 'low_confidence'    // Parser had low confidence
  | 'unit_conflict';     // Unit conversion failed

export interface FeedbackEvent {
  id: string;
  timestamp: Date;
  type: FeedbackType;

  // Original input
  originalInput: string;

  // Parser output
  parsedResult: ParsedIngredient;

  // User correction (if applicable)
  correction?: {
    quantity?: number;
    unit?: string;
    ingredient?: string;
    preparation?: string[];
  };

  // Session context
  sessionId: string;
  userId?: string;

  // Additional metadata
  metadata?: {
    userAgent?: string;
    region?: string;
    recipeSource?: string;
  };
}

export interface IngredientSuggestion {
  original: string;
  canonical: string;
  frequency: number;
  confidence: number;
  examples: string[];
  needsReview: boolean;
}

export interface ParsingAccuracyMetrics {
  totalParses: number;
  correctParses: number;
  correctedParses: number;
  lowConfidenceParses: number;
  unknownIngredients: number;
  accuracy: number;

  // Breakdown by component
  quantityAccuracy: number;
  unitAccuracy: number;
  ingredientAccuracy: number;

  // Common failure patterns
  topFailures: Array<{
    input: string;
    count: number;
    averageConfidence: number;
  }>;

  // Most corrected ingredients
  topCorrections: Array<{
    original: string;
    corrected: string;
    count: number;
  }>;
}

export interface FeedbackAnalytics {
  periodStart: Date;
  periodEnd: Date;

  // Overall metrics
  metrics: ParsingAccuracyMetrics;

  // Suggestions for improvement
  suggestions: IngredientSuggestion[];

  // Confidence distribution
  confidenceDistribution: {
    high: number;    // > 0.9
    medium: number;  // 0.7 - 0.9
    low: number;     // < 0.7
  };

  // Category breakdown
  categoryBreakdown: Record<string, {
    count: number;
    accuracy: number;
  }>;
}

export interface FeedbackCollectorOptions {
  enableAnalytics?: boolean;
  autoSuggest?: boolean;
  minSuggestionFrequency?: number;
  sessionId?: string;
}

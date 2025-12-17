/**
 * Feedback Collector
 *
 * Collects user feedback on parsing accuracy and generates analytics
 * to continuously improve the ingredient parser.
 */

import { ParsedIngredient } from '../types';
import {
  FeedbackEvent,
  FeedbackType,
  FeedbackAnalytics,
  ParsingAccuracyMetrics,
  IngredientSuggestion,
  FeedbackCollectorOptions,
} from './types';

export class FeedbackCollector {
  private events: FeedbackEvent[] = [];
  private sessionId: string;
  private options: Required<FeedbackCollectorOptions>;

  constructor(options: FeedbackCollectorOptions = {}) {
    this.sessionId = options.sessionId || this.generateSessionId();
    this.options = {
      enableAnalytics: options.enableAnalytics ?? true,
      autoSuggest: options.autoSuggest ?? true,
      minSuggestionFrequency: options.minSuggestionFrequency ?? 3,
      sessionId: this.sessionId,
    };
  }

  // ===========================================================================
  // EVENT RECORDING
  // ===========================================================================

  /**
   * Record a user correction
   */
  recordCorrection(
    originalInput: string,
    parsedResult: ParsedIngredient,
    correction: NonNullable<FeedbackEvent['correction']>
  ): void {
    this.recordEvent({
      type: 'correction',
      originalInput,
      parsedResult,
      correction,
    });
  }

  /**
   * Record a confirmation (user agreed with parsing)
   */
  recordConfirmation(originalInput: string, parsedResult: ParsedIngredient): void {
    this.recordEvent({
      type: 'confirmation',
      originalInput,
      parsedResult,
    });
  }

  /**
   * Record an unknown ingredient
   */
  recordUnknownIngredient(originalInput: string, parsedResult: ParsedIngredient): void {
    if (parsedResult.flags.needsReview || parsedResult.confidence < 0.7) {
      this.recordEvent({
        type: 'unknown_ingredient',
        originalInput,
        parsedResult,
      });
    }
  }

  /**
   * Record a low confidence parse
   */
  recordLowConfidence(originalInput: string, parsedResult: ParsedIngredient): void {
    if (parsedResult.confidence < 0.7) {
      this.recordEvent({
        type: 'low_confidence',
        originalInput,
        parsedResult,
      });
    }
  }

  /**
   * Record a unit conversion conflict
   */
  recordUnitConflict(originalInput: string, parsedResult: ParsedIngredient): void {
    this.recordEvent({
      type: 'unit_conflict',
      originalInput,
      parsedResult,
    });
  }

  /**
   * Generic event recording
   */
  private recordEvent(
    event: Omit<FeedbackEvent, 'id' | 'timestamp' | 'sessionId'>
  ): void {
    const feedbackEvent: FeedbackEvent = {
      id: this.generateEventId(),
      timestamp: new Date(),
      sessionId: this.sessionId,
      ...event,
    };

    this.events.push(feedbackEvent);

    // Auto-generate suggestions if enabled
    if (this.options.autoSuggest && event.type === 'correction') {
      // Could trigger async suggestion generation here
    }
  }

  // ===========================================================================
  // ANALYTICS
  // ===========================================================================

  /**
   * Generate analytics for a time period
   */
  generateAnalytics(startDate?: Date, endDate?: Date): FeedbackAnalytics {
    const filteredEvents = this.filterEventsByDate(startDate, endDate);

    const metrics = this.calculateMetrics(filteredEvents);
    const suggestions = this.generateSuggestions(filteredEvents);
    const confidenceDistribution = this.calculateConfidenceDistribution(filteredEvents);
    const categoryBreakdown = this.calculateCategoryBreakdown(filteredEvents);

    return {
      periodStart: startDate || new Date(Math.min(...this.events.map(e => e.timestamp.getTime()))),
      periodEnd: endDate || new Date(),
      metrics,
      suggestions,
      confidenceDistribution,
      categoryBreakdown,
    };
  }

  /**
   * Calculate accuracy metrics
   */
  private calculateMetrics(events: FeedbackEvent[]): ParsingAccuracyMetrics {
    const totalParses = events.length;
    const correctParses = events.filter(e => e.type === 'confirmation').length;
    const correctedParses = events.filter(e => e.type === 'correction').length;
    const lowConfidenceParses = events.filter(e => e.type === 'low_confidence').length;
    const unknownIngredients = events.filter(e => e.type === 'unknown_ingredient').length;

    const accuracy = totalParses > 0 ? correctParses / totalParses : 0;

    // Component accuracy
    const corrections = events.filter(e => e.type === 'correction');
    const quantityCorrections = corrections.filter(e => e.correction?.quantity).length;
    const unitCorrections = corrections.filter(e => e.correction?.unit).length;
    const ingredientCorrections = corrections.filter(e => e.correction?.ingredient).length;

    const quantityAccuracy = totalParses > 0 ? 1 - (quantityCorrections / totalParses) : 1;
    const unitAccuracy = totalParses > 0 ? 1 - (unitCorrections / totalParses) : 1;
    const ingredientAccuracy = totalParses > 0 ? 1 - (ingredientCorrections / totalParses) : 1;

    // Top failures
    const failureMap = new Map<string, { count: number; totalConfidence: number }>();
    events.filter(e => e.type !== 'confirmation').forEach(event => {
      const existing = failureMap.get(event.originalInput) || { count: 0, totalConfidence: 0 };
      failureMap.set(event.originalInput, {
        count: existing.count + 1,
        totalConfidence: existing.totalConfidence + event.parsedResult.confidence,
      });
    });

    const topFailures = Array.from(failureMap.entries())
      .map(([input, data]) => ({
        input,
        count: data.count,
        averageConfidence: data.totalConfidence / data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top corrections
    const correctionMap = new Map<string, { corrected: string; count: number }>();
    corrections.forEach(event => {
      if (event.correction?.ingredient) {
        const key = `${event.parsedResult.ingredient.canonical}->${event.correction.ingredient}`;
        const existing = correctionMap.get(key) || { corrected: event.correction.ingredient, count: 0 };
        correctionMap.set(key, { ...existing, count: existing.count + 1 });
      }
    });

    const topCorrections = Array.from(correctionMap.entries())
      .map(([key, data]) => ({
        original: key.split('->')[0],
        corrected: data.corrected,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalParses,
      correctParses,
      correctedParses,
      lowConfidenceParses,
      unknownIngredients,
      accuracy,
      quantityAccuracy,
      unitAccuracy,
      ingredientAccuracy,
      topFailures,
      topCorrections,
    };
  }

  /**
   * Generate ingredient suggestions
   */
  private generateSuggestions(events: FeedbackEvent[]): IngredientSuggestion[] {
    const suggestionMap = new Map<string, {
      canonical: string;
      frequency: number;
      confidenceSum: number;
      examples: Set<string>;
    }>();

    events.filter(e => e.type === 'correction' && e.correction?.ingredient).forEach(event => {
      const original = event.parsedResult.ingredient.canonical;
      const canonical = event.correction!.ingredient!;

      const existing = suggestionMap.get(original) || {
        canonical,
        frequency: 0,
        confidenceSum: 0,
        examples: new Set<string>(),
      };

      existing.frequency++;
      existing.confidenceSum += event.parsedResult.confidence;
      existing.examples.add(event.originalInput);

      suggestionMap.set(original, existing);
    });

    return Array.from(suggestionMap.entries())
      .filter(([, data]) => data.frequency >= this.options.minSuggestionFrequency)
      .map(([original, data]) => ({
        original,
        canonical: data.canonical,
        frequency: data.frequency,
        confidence: data.confidenceSum / data.frequency,
        examples: Array.from(data.examples).slice(0, 5),
        needsReview: data.frequency < 10 || (data.confidenceSum / data.frequency) < 0.5,
      }))
      .sort((a, b) => b.frequency - a.frequency);
  }

  /**
   * Calculate confidence distribution
   */
  private calculateConfidenceDistribution(events: FeedbackEvent[]): {
    high: number;
    medium: number;
    low: number;
  } {
    const distribution = { high: 0, medium: 0, low: 0 };

    events.forEach(event => {
      const conf = event.parsedResult.confidence;
      if (conf > 0.9) {
        distribution.high++;
      } else if (conf >= 0.7) {
        distribution.medium++;
      } else {
        distribution.low++;
      }
    });

    return distribution;
  }

  /**
   * Calculate category breakdown
   */
  private calculateCategoryBreakdown(events: FeedbackEvent[]): Record<string, {
    count: number;
    accuracy: number;
  }> {
    const categoryMap = new Map<string, { total: number; correct: number }>();

    events.forEach(event => {
      const category = event.parsedResult.ingredient.category;
      const existing = categoryMap.get(category) || { total: 0, correct: 0 };
      existing.total++;
      if (event.type === 'confirmation') {
        existing.correct++;
      }
      categoryMap.set(category, existing);
    });

    const breakdown: Record<string, { count: number; accuracy: number }> = {};
    for (const [category, data] of categoryMap) {
      breakdown[category] = {
        count: data.total,
        accuracy: data.total > 0 ? data.correct / data.total : 0,
      };
    }

    return breakdown;
  }

  // ===========================================================================
  // UTILITIES
  // ===========================================================================

  /**
   * Filter events by date range
   */
  private filterEventsByDate(startDate?: Date, endDate?: Date): FeedbackEvent[] {
    return this.events.filter(event => {
      if (startDate && event.timestamp < startDate) return false;
      if (endDate && event.timestamp > endDate) return false;
      return true;
    });
  }

  /**
   * Get all events
   */
  getAllEvents(): FeedbackEvent[] {
    return [...this.events];
  }

  /**
   * Get events by type
   */
  getEventsByType(type: FeedbackType): FeedbackEvent[] {
    return this.events.filter(e => e.type === type);
  }

  /**
   * Clear all events
   */
  clearEvents(): void {
    this.events = [];
  }

  /**
   * Export events as JSON
   */
  exportEvents(): string {
    return JSON.stringify(this.events, null, 2);
  }

  /**
   * Import events from JSON
   */
  importEvents(json: string): void {
    const events = JSON.parse(json) as FeedbackEvent[];
    // Convert timestamp strings back to Date objects
    events.forEach(event => {
      event.timestamp = new Date(event.timestamp);
    });
    this.events.push(...events);
  }

  /**
   * Generate unique session ID
   */
  private generateSessionId(): string {
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique event ID
   */
  private generateEventId(): string {
    return `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get session ID
   */
  getSessionId(): string {
    return this.sessionId;
  }
}

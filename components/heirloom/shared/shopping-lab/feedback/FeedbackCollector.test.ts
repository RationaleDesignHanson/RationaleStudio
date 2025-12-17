/**
 * Feedback Collector Tests
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { FeedbackCollector } from './FeedbackCollector';
import { ParsedIngredient } from '../types';

describe('FeedbackCollector', () => {
  let collector: FeedbackCollector;

  beforeEach(() => {
    collector = new FeedbackCollector();
  });

  // Helper to create mock parsed ingredient
  const mockParsedIngredient = (overrides: Partial<ParsedIngredient> = {}): ParsedIngredient => ({
    original: '2 cups flour',
    quantity: { type: 'exact', value: 2, display: '2' },
    unit: { canonical: 'cup', original: 'cups', type: 'volume', system: 'imperial' },
    ingredient: {
      canonical: 'all-purpose flour',
      original: 'flour',
      category: 'baking',
      metadata: null,
    },
    preparation: [],
    modifiers: [],
    confidence: 0.95,
    flags: {
      hasQuantity: true,
      hasUnit: true,
      isApproximate: false,
      isRange: false,
      needsReview: false,
      isInformalUnit: false,
      hasAmbiguity: false,
    },
    ...overrides,
  });

  // ===========================================================================
  // EVENT RECORDING
  // ===========================================================================

  describe('event recording', () => {
    test('records correction events', () => {
      const parsed = mockParsedIngredient();

      collector.recordCorrection('2 cups flour', parsed, {
        ingredient: 'whole wheat flour',
      });

      const events = collector.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('correction');
      expect(events[0].correction?.ingredient).toBe('whole wheat flour');
    });

    test('records confirmation events', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('2 cups flour', parsed);

      const events = collector.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('confirmation');
    });

    test('records unknown ingredient events', () => {
      const parsed = mockParsedIngredient({
        confidence: 0.5,
        flags: {
          hasQuantity: true,
          hasUnit: true,
          isApproximate: false,
          isRange: false,
          needsReview: true,
          isInformalUnit: false,
          hasAmbiguity: false,
        },
      });

      collector.recordUnknownIngredient('2 cups mystery-food', parsed);

      const events = collector.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('unknown_ingredient');
    });

    test('records low confidence events', () => {
      const parsed = mockParsedIngredient({
        confidence: 0.6,
      });

      collector.recordLowConfidence('2 cups unclear-ingredient', parsed);

      const events = collector.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('low_confidence');
    });

    test('records unit conflict events', () => {
      const parsed = mockParsedIngredient();

      collector.recordUnitConflict('2 cups flour', parsed);

      const events = collector.getAllEvents();
      expect(events).toHaveLength(1);
      expect(events[0].type).toBe('unit_conflict');
    });

    test('generates unique event IDs', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('2 cups flour', parsed);
      collector.recordConfirmation('1 cup sugar', parsed);

      const events = collector.getAllEvents();
      expect(events[0].id).not.toBe(events[1].id);
    });

    test('includes session ID in events', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('2 cups flour', parsed);

      const events = collector.getAllEvents();
      expect(events[0].sessionId).toBe(collector.getSessionId());
    });
  });

  // ===========================================================================
  // ANALYTICS
  // ===========================================================================

  describe('analytics generation', () => {
    test('calculates overall accuracy', () => {
      const parsed = mockParsedIngredient();

      // 3 correct, 1 incorrect
      collector.recordConfirmation('2 cups flour', parsed);
      collector.recordConfirmation('1 cup sugar', parsed);
      collector.recordConfirmation('3 eggs', parsed);
      collector.recordCorrection('2 cups butter', parsed, { ingredient: 'unsalted butter' });

      const analytics = collector.generateAnalytics();

      expect(analytics.metrics.totalParses).toBe(4);
      expect(analytics.metrics.correctParses).toBe(3);
      expect(analytics.metrics.accuracy).toBe(0.75); // 3/4
    });

    test('calculates component accuracy', () => {
      const parsed = mockParsedIngredient();

      // Quantity corrections
      collector.recordCorrection('2 cups flour', parsed, { quantity: 3 });
      collector.recordConfirmation('1 cup sugar', parsed);

      // Unit corrections
      collector.recordCorrection('2 cups milk', parsed, { unit: 'tablespoon' });

      // Ingredient corrections
      collector.recordCorrection('2 cups butter', parsed, { ingredient: 'margarine' });

      const analytics = collector.generateAnalytics();

      expect(analytics.metrics.quantityAccuracy).toBe(0.75); // 1 error / 4 total
      expect(analytics.metrics.unitAccuracy).toBe(0.75);
      expect(analytics.metrics.ingredientAccuracy).toBe(0.75);
    });

    test('identifies top failures', () => {
      const parsed = mockParsedIngredient({ confidence: 0.6 });

      // Same ingredient fails multiple times
      collector.recordLowConfidence('weird-ingredient', parsed);
      collector.recordLowConfidence('weird-ingredient', parsed);
      collector.recordLowConfidence('another-one', parsed);

      const analytics = collector.generateAnalytics();

      expect(analytics.metrics.topFailures).toHaveLength(2);
      expect(analytics.metrics.topFailures[0].input).toBe('weird-ingredient');
      expect(analytics.metrics.topFailures[0].count).toBe(2);
    });

    test('identifies top corrections', () => {
      const parsed = mockParsedIngredient({
        ingredient: {
          canonical: 'flour',
          original: 'flour',
          category: 'baking',
          metadata: null,
        },
      });

      // Same correction happens multiple times
      collector.recordCorrection('flour', parsed, { ingredient: 'whole wheat flour' });
      collector.recordCorrection('flour', parsed, { ingredient: 'whole wheat flour' });
      collector.recordCorrection('flour', parsed, { ingredient: 'whole wheat flour' });

      const analytics = collector.generateAnalytics();

      expect(analytics.metrics.topCorrections).toHaveLength(1);
      expect(analytics.metrics.topCorrections[0].original).toBe('flour');
      expect(analytics.metrics.topCorrections[0].corrected).toBe('whole wheat flour');
      expect(analytics.metrics.topCorrections[0].count).toBe(3);
    });

    test('generates ingredient suggestions', () => {
      const parsed = mockParsedIngredient({
        ingredient: {
          canonical: 'flour',
          original: 'flour',
          category: 'baking',
          metadata: null,
        },
      });

      // Record corrections above threshold (default 3)
      for (let i = 0; i < 5; i++) {
        collector.recordCorrection('2 cups flour', parsed, {
          ingredient: 'bread flour',
        });
      }

      const analytics = collector.generateAnalytics();

      expect(analytics.suggestions).toHaveLength(1);
      expect(analytics.suggestions[0].original).toBe('flour');
      expect(analytics.suggestions[0].canonical).toBe('bread flour');
      expect(analytics.suggestions[0].frequency).toBe(5);
    });

    test('filters suggestions below frequency threshold', () => {
      const parsed = mockParsedIngredient();

      // Only 2 corrections (below default threshold of 3)
      collector.recordCorrection('flour', parsed, { ingredient: 'rye flour' });
      collector.recordCorrection('flour', parsed, { ingredient: 'rye flour' });

      const analytics = collector.generateAnalytics();

      expect(analytics.suggestions).toHaveLength(0);
    });

    test('calculates confidence distribution', () => {
      collector.recordConfirmation('input1', mockParsedIngredient({ confidence: 0.95 }));
      collector.recordConfirmation('input2', mockParsedIngredient({ confidence: 0.85 }));
      collector.recordConfirmation('input3', mockParsedIngredient({ confidence: 0.6 }));

      const analytics = collector.generateAnalytics();

      expect(analytics.confidenceDistribution.high).toBe(1);
      expect(analytics.confidenceDistribution.medium).toBe(1);
      expect(analytics.confidenceDistribution.low).toBe(1);
    });

    test('calculates category breakdown', () => {
      const bakingParsed = mockParsedIngredient({
        ingredient: {
          canonical: 'flour',
          original: 'flour',
          category: 'baking',
          metadata: null,
        },
      });

      const produceParsed = mockParsedIngredient({
        ingredient: {
          canonical: 'onion',
          original: 'onion',
          category: 'produce',
          metadata: null,
        },
      });

      // 2 baking (1 correct, 1 incorrect)
      collector.recordConfirmation('flour', bakingParsed);
      collector.recordCorrection('sugar', bakingParsed, { ingredient: 'brown sugar' });

      // 1 produce (correct)
      collector.recordConfirmation('onion', produceParsed);

      const analytics = collector.generateAnalytics();

      expect(analytics.categoryBreakdown['baking'].count).toBe(2);
      expect(analytics.categoryBreakdown['baking'].accuracy).toBe(0.5);
      expect(analytics.categoryBreakdown['produce'].count).toBe(1);
      expect(analytics.categoryBreakdown['produce'].accuracy).toBe(1.0);
    });
  });

  // ===========================================================================
  // UTILITIES
  // ===========================================================================

  describe('utilities', () => {
    test('filters events by type', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('input1', parsed);
      collector.recordConfirmation('input2', parsed);
      collector.recordCorrection('input3', parsed, { ingredient: 'corrected' });

      const confirmations = collector.getEventsByType('confirmation');
      const corrections = collector.getEventsByType('correction');

      expect(confirmations).toHaveLength(2);
      expect(corrections).toHaveLength(1);
    });

    test('clears all events', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('input1', parsed);
      collector.recordConfirmation('input2', parsed);

      collector.clearEvents();

      expect(collector.getAllEvents()).toHaveLength(0);
    });

    test('exports events as JSON', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('input1', parsed);

      const json = collector.exportEvents();
      const parsed2 = JSON.parse(json);

      expect(parsed2).toHaveLength(1);
      expect(parsed2[0].type).toBe('confirmation');
    });

    test('imports events from JSON', () => {
      const parsed = mockParsedIngredient();

      collector.recordConfirmation('input1', parsed);

      const json = collector.exportEvents();
      const newCollector = new FeedbackCollector();
      newCollector.importEvents(json);

      expect(newCollector.getAllEvents()).toHaveLength(1);
      expect(newCollector.getAllEvents()[0].type).toBe('confirmation');
    });

    test('generates unique session IDs', () => {
      const collector1 = new FeedbackCollector();
      const collector2 = new FeedbackCollector();

      expect(collector1.getSessionId()).not.toBe(collector2.getSessionId());
    });

    test('uses custom session ID when provided', () => {
      const customId = 'custom-session-123';
      const collector = new FeedbackCollector({ sessionId: customId });

      expect(collector.getSessionId()).toBe(customId);
    });
  });
});

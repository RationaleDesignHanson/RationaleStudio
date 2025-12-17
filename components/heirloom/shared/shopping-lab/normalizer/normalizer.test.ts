/**
 * Ingredient Normalizer Tests
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { IngredientNormalizer } from './index';

describe('IngredientNormalizer', () => {
  let normalizer: IngredientNormalizer;

  beforeEach(() => {
    normalizer = new IngredientNormalizer('US');
  });

  // =============================================================================
  // EXACT MATCHES
  // =============================================================================

  describe('exact matches', () => {
    test('normalizes "butter" to "butter"', () => {
      const result = normalizer.normalize('butter');
      expect(result.canonical).toBe('butter');
      expect(result.matchType).toBe('exact');
      expect(result.confidence).toBe(1.0);
    });

    test('normalizes "Butter" (case insensitive)', () => {
      const result = normalizer.normalize('Butter');
      expect(result.canonical).toBe('butter');
      expect(result.matchType).toBe('exact');
    });

    test('normalizes "BUTTER" (all caps)', () => {
      const result = normalizer.normalize('BUTTER');
      expect(result.canonical).toBe('butter');
    });

    test('normalizes "olive oil"', () => {
      const result = normalizer.normalize('olive oil');
      expect(result.canonical).toBe('olive oil');
      expect(result.category).toBe('oils');
    });

    test('normalizes "all-purpose flour"', () => {
      const result = normalizer.normalize('all-purpose flour');
      expect(result.canonical).toBe('all-purpose flour');
      expect(result.category).toBe('baking');
    });
  });

  // =============================================================================
  // SYNONYM MATCHES
  // =============================================================================

  describe('synonym matches', () => {
    test('normalizes "scallions" to "green onion"', () => {
      const result = normalizer.normalize('scallions');
      expect(result.canonical).toBe('green onion');
      expect(result.matchType).toBe('synonym');
    });

    test('normalizes "spring onion" to "green onion"', () => {
      const result = normalizer.normalize('spring onion');
      expect(result.canonical).toBe('green onion');
    });

    test('normalizes "aubergine" to "eggplant"', () => {
      const result = normalizer.normalize('aubergine');
      expect(result.canonical).toBe('eggplant');
    });

    test('normalizes "courgette" to "zucchini"', () => {
      const result = normalizer.normalize('courgette');
      expect(result.canonical).toBe('zucchini');
    });

    test('normalizes "prawns" to "shrimp"', () => {
      const result = normalizer.normalize('prawns');
      expect(result.canonical).toBe('shrimp');
    });

    test('normalizes "rocket" to "arugula"', () => {
      const result = normalizer.normalize('rocket');
      expect(result.canonical).toBe('arugula');
    });

    test('normalizes "beef mince" to "ground beef"', () => {
      const result = normalizer.normalize('beef mince');
      expect(result.canonical).toBe('ground beef');
    });

    test('normalizes "double cream" to "heavy cream"', () => {
      const result = normalizer.normalize('double cream');
      expect(result.canonical).toBe('heavy cream');
    });

    test('normalizes "bicarbonate of soda" to "baking soda"', () => {
      const result = normalizer.normalize('bicarbonate of soda');
      expect(result.canonical).toBe('baking soda');
    });

    test('normalizes "parmesan" to "parmesan cheese"', () => {
      const result = normalizer.normalize('parmesan');
      expect(result.canonical).toBe('parmesan cheese');
    });

    test('normalizes "evoo" to "olive oil"', () => {
      const result = normalizer.normalize('evoo');
      expect(result.canonical).toBe('olive oil');
    });
  });

  // =============================================================================
  // FUZZY MATCHES (typos)
  // =============================================================================

  describe('fuzzy matches', () => {
    test('matches "buter" (typo) to "butter"', () => {
      const result = normalizer.normalize('buter');
      expect(result.canonical).toBe('butter');
      expect(result.matchType).toBe('fuzzy');
      expect(result.confidence).toBeGreaterThan(0.8);
    });

    test('matches "parsely" (typo) to "parsley"', () => {
      const result = normalizer.normalize('parsely');
      expect(result.canonical).toBe('parsley');
      expect(result.matchType).toBe('fuzzy');
    });

    test('matches "tomatoe" to "tomato"', () => {
      const result = normalizer.normalize('tomatoe');
      expect(result.canonical).toBe('tomato');
      expect(result.matchType).toBe('fuzzy');
    });

    test('matches "onon" to "onion"', () => {
      const result = normalizer.normalize('onon');
      expect(result.canonical).toBe('onion');
      expect(result.matchType).toBe('fuzzy');
    });
  });

  // =============================================================================
  // PREPARATION EXTRACTION
  // =============================================================================

  describe('preparation extraction', () => {
    test('extracts "chopped" from "onion, chopped"', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('onion, chopped');
      expect(ingredient).toBe('onion');
      expect(preparation).toContain('chopped');
    });

    test('extracts "finely chopped" from "garlic, finely chopped"', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('garlic, finely chopped');
      expect(ingredient).toBe('garlic');
      expect(preparation.some(p => p.includes('finely chopped'))).toBe(true);
    });

    test('extracts "diced" from "diced tomatoes"', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('diced tomatoes');
      expect(ingredient).toBe('tomatoes');
      expect(preparation).toContain('diced');
    });

    test('extracts "melted" from "melted butter"', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('melted butter');
      expect(ingredient).toBe('butter');
      expect(preparation).toContain('melted');
    });

    test('extracts "at room temperature" from "butter, at room temperature"', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('butter, at room temperature');
      expect(ingredient).toBe('butter');
      expect(preparation.some(p => p.includes('room temperature'))).toBe(true);
    });

    test('extracts multiple preparation terms', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('chicken, boneless, skinless, diced');
      expect(ingredient).toBe('chicken');
      expect(preparation.length).toBeGreaterThan(0);
    });

    test('handles no preparation terms', () => {
      const { ingredient, preparation } = normalizer.extractPreparation('butter');
      expect(ingredient).toBe('butter');
      expect(preparation).toHaveLength(0);
    });
  });

  // =============================================================================
  // MODIFIER EXTRACTION
  // =============================================================================

  describe('modifier extraction', () => {
    test('extracts "fresh" modifier', () => {
      const { ingredient, modifiers } = normalizer.extractPreparation('fresh basil');
      expect(modifiers).toContain('fresh');
    });

    test('extracts "frozen" modifier', () => {
      const { ingredient, modifiers } = normalizer.extractPreparation('frozen peas');
      expect(modifiers).toContain('frozen');
    });

    test('extracts "unsalted" modifier', () => {
      const { ingredient, modifiers } = normalizer.extractPreparation('unsalted butter');
      expect(modifiers).toContain('unsalted');
    });
  });

  // =============================================================================
  // NORMALIZATION WITH PREPARATION
  // =============================================================================

  describe('normalization with preparation', () => {
    test('normalizes "chopped onion" to "onion"', () => {
      const result = normalizer.normalize('chopped onion');
      expect(result.canonical).toBe('onion');
    });

    test('normalizes "diced tomatoes" to "tomato"', () => {
      const result = normalizer.normalize('diced tomatoes');
      // "diced tomatoes" might be exact match or normalize to "tomato"
      expect(['tomato', 'diced tomatoes']).toContain(result.canonical);
    });

    test('normalizes "melted butter" to "butter"', () => {
      const result = normalizer.normalize('melted butter');
      expect(result.canonical).toBe('butter');
    });

    test('normalizes "grated parmesan" to "parmesan cheese"', () => {
      const result = normalizer.normalize('grated parmesan');
      expect(result.canonical).toBe('parmesan cheese');
    });
  });

  // =============================================================================
  // COMBINEABLE CHECK
  // =============================================================================

  describe('areCombineable', () => {
    test('same ingredient names are combineable', () => {
      const result = normalizer.areCombineable('butter', 'butter');
      expect(result).toBe(true);
    });

    test('synonyms are combineable', () => {
      const result = normalizer.areCombineable('scallions', 'green onion');
      expect(result).toBe(true);
    });

    test('different spellings are combineable', () => {
      const result = normalizer.areCombineable('spring onion', 'scallions');
      expect(result).toBe(true);
    });

    test('different ingredients are not combineable', () => {
      const result = normalizer.areCombineable('butter', 'olive oil');
      expect(result).toBe(false);
    });
  });

  // =============================================================================
  // CATEGORY GUESSING
  // =============================================================================

  describe('category guessing', () => {
    test('unknown vegetable gets produce category', () => {
      const result = normalizer.normalize('unknown vegetable thing');
      expect(result.category).toBe('produce');
    });

    test('unknown with "chicken" gets meat category', () => {
      const result = normalizer.normalize('special chicken thing');
      expect(result.category).toBe('meat');
    });

    test('unknown with "cheese" gets dairy category', () => {
      const result = normalizer.normalize('mystery cheese');
      expect(result.category).toBe('dairy');
    });

    test('unknown with "spice" gets spices category', () => {
      const result = normalizer.normalize('exotic spice blend');
      expect(result.category).toBe('spices');
    });
  });

  // =============================================================================
  // FIND SIMILAR
  // =============================================================================

  describe('findSimilar', () => {
    test('finds similar ingredients for typo', () => {
      const matches = normalizer.findSimilar('buter', 0.8);
      expect(matches.length).toBeGreaterThan(0);
      expect(matches[0].ingredient).toBe('butter');
    });

    test('finds multiple similar matches', () => {
      const matches = normalizer.findSimilar('onion', 0.7);
      expect(matches.length).toBeGreaterThan(0);
      // Should include onion and possibly green onion
    });

    test('returns empty array for very different string', () => {
      const matches = normalizer.findSimilar('xyz123abc', 0.8);
      expect(matches.length).toBe(0);
    });

    test('sorts matches by score descending', () => {
      const matches = normalizer.findSimilar('butte', 0.7);
      if (matches.length > 1) {
        expect(matches[0].score).toBeGreaterThanOrEqual(matches[1].score);
      }
    });
  });

  // =============================================================================
  // METADATA
  // =============================================================================

  describe('getMetadata', () => {
    test('returns metadata for known ingredient', () => {
      const metadata = normalizer.getMetadata('butter');
      expect(metadata).not.toBeNull();
      expect(metadata?.canonical).toBe('butter');
      expect(metadata?.category).toBe('dairy');
    });

    test('returns null for unknown ingredient', () => {
      const metadata = normalizer.getMetadata('unknown-ingredient-xyz');
      expect(metadata).toBeNull();
    });
  });

  // =============================================================================
  // SYNONYMS
  // =============================================================================

  describe('getSynonyms', () => {
    test('returns synonyms for green onion', () => {
      const synonyms = normalizer.getSynonyms('green onion');
      expect(synonyms.length).toBeGreaterThan(0);
      expect(synonyms).toContain('scallion');
    });

    test('returns synonyms for eggplant', () => {
      const synonyms = normalizer.getSynonyms('eggplant');
      expect(synonyms).toContain('aubergine');
    });

    test('returns synonyms for zucchini', () => {
      const synonyms = normalizer.getSynonyms('zucchini');
      expect(synonyms).toContain('courgette');
    });
  });

  // =============================================================================
  // EDGE CASES
  // =============================================================================

  describe('edge cases', () => {
    test('handles empty string', () => {
      const result = normalizer.normalize('');
      expect(result.canonical).toBe('');
      expect(result.matchType).toBe('unknown');
    });

    test('handles whitespace-only string', () => {
      const result = normalizer.normalize('   ');
      expect(result.canonical).toBe('');
    });

    test('handles very long ingredient name', () => {
      const longName = 'extra super duper long ingredient name that goes on forever';
      const result = normalizer.normalize(longName);
      expect(result).toBeDefined();
    });

    test('handles special characters', () => {
      const result = normalizer.normalize('garlic & onion');
      expect(result).toBeDefined();
    });

    test('handles numbers in ingredient name', () => {
      const result = normalizer.normalize('7-spice blend');
      expect(result).toBeDefined();
    });
  });

  // =============================================================================
  // UTILITY METHODS
  // =============================================================================

  describe('utility methods', () => {
    test('getAllIngredients returns array', () => {
      const ingredients = normalizer.getAllIngredients();
      expect(Array.isArray(ingredients)).toBe(true);
      expect(ingredients.length).toBeGreaterThan(0);
    });

    test('getRegion returns current region', () => {
      normalizer.setRegion('UK');
      expect(normalizer.getRegion()).toBe('UK');
    });

    test('setRegion changes region', () => {
      normalizer.setRegion('AU');
      expect(normalizer.getRegion()).toBe('AU');
    });
  });
});

/**
 * Database Service Tests
 */

import { describe, test, expect, beforeEach } from 'vitest';
import { IngredientDatabase } from './IngredientDatabase';

describe('IngredientDatabase', () => {
  let db: IngredientDatabase;

  beforeEach(() => {
    db = new IngredientDatabase();
  });

  // ===========================================================================
  // INGREDIENT LOOKUPS
  // ===========================================================================

  describe('ingredient lookups', () => {
    test('getById returns correct ingredient', () => {
      const butter = db.getById('butter');
      expect(butter).not.toBeNull();
      expect(butter?.canonical).toBe('butter');
      expect(butter?.category).toBe('dairy');
    });

    test('getById returns null for unknown ID', () => {
      const unknown = db.getById('unknown-ingredient-xyz');
      expect(unknown).toBeNull();
    });

    test('getByCanonical returns correct ingredient', () => {
      const tomato = db.getByCanonical('tomato');
      expect(tomato).not.toBeNull();
      expect(tomato?.category).toBe('produce');
    });

    test('getByCanonical is case-insensitive', () => {
      const tomato1 = db.getByCanonical('tomato');
      const tomato2 = db.getByCanonical('TOMATO');
      const tomato3 = db.getByCanonical('Tomato');

      expect(tomato1).toEqual(tomato2);
      expect(tomato2).toEqual(tomato3);
    });

    test('getAllIngredients returns all ingredients', () => {
      const all = db.getAllIngredients();
      expect(all.length).toBeGreaterThan(100);
      expect(all.length).toBe(108);
    });

    test('getByCategory returns ingredients in category', () => {
      const dairy = db.getByCategory('dairy');
      expect(dairy.length).toBeGreaterThan(0);
      expect(dairy.every(ing => ing.category === 'dairy')).toBe(true);
    });

    test('getCategories returns all unique categories', () => {
      const categories = db.getCategories();
      expect(categories).toContain('dairy');
      expect(categories).toContain('produce');
      expect(categories).toContain('meat');
      expect(categories.length).toBeGreaterThan(10);
    });
  });

  // ===========================================================================
  // SEARCH
  // ===========================================================================

  describe('search', () => {
    test('search by text finds matching ingredients', () => {
      const results = db.search('onion');
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(ing => ing.canonical === 'onion')).toBe(true);
      expect(results.some(ing => ing.canonical === 'green onion')).toBe(true);
    });

    test('search is case-insensitive', () => {
      const lower = db.search('onion');
      const upper = db.search('ONION');
      expect(lower.length).toBe(upper.length);
    });

    test('search with category filter', () => {
      const results = db.search('', { category: 'dairy' });
      expect(results.every(ing => ing.category === 'dairy')).toBe(true);
    });

    test('search with hasDensity filter', () => {
      const withDensity = db.search('', { hasDensity: true });
      expect(withDensity.every(ing => ing.density !== null && ing.density !== undefined)).toBe(true);

      const withoutDensity = db.search('', { hasDensity: false });
      expect(withoutDensity.every(ing => !ing.density)).toBe(true);
    });

    test('search with minDensity filter', () => {
      const results = db.search('', { minDensity: 200 });
      expect(results.every(ing => ing.density && ing.density >= 200)).toBe(true);
    });

    test('search with maxDensity filter', () => {
      const results = db.search('', { maxDensity: 100 });
      expect(results.every(ing => ing.density && ing.density <= 100)).toBe(true);
    });

    test('search with multiple filters', () => {
      const results = db.search('', {
        category: 'produce',
        hasDensity: true,
        minDensity: 100,
      });

      expect(results.every(ing =>
        ing.category === 'produce' &&
        ing.density &&
        ing.density >= 100
      )).toBe(true);
    });
  });

  // ===========================================================================
  // BATCH OPERATIONS
  // ===========================================================================

  describe('batch operations', () => {
    test('batchGetByIds returns multiple ingredients', () => {
      const ids = ['butter', 'eggs', 'milk_whole'];
      const results = db.batchGetByIds(ids);

      expect(results.length).toBe(3);
      expect(results.map(r => r.id)).toEqual(ids);
    });

    test('batchGetByIds filters out unknown IDs', () => {
      const ids = ['butter', 'unknown-xyz', 'eggs'];
      const results = db.batchGetByIds(ids);

      expect(results.length).toBe(2);
      expect(results.every(r => r.id !== 'unknown-xyz')).toBe(true);
    });

    test('batchGetByCanonical returns multiple ingredients', () => {
      const canonicals = ['butter', 'tomato', 'onion'];
      const results = db.batchGetByCanonical(canonicals);

      expect(results.length).toBe(3);
      expect(results.map(r => r.canonical)).toEqual(canonicals);
    });
  });

  // ===========================================================================
  // SYNONYM LOOKUPS
  // ===========================================================================

  describe('synonym lookups', () => {
    test('getSynonyms returns mapping for canonical ingredient', () => {
      const synonyms = db.getSynonyms('green onion');
      expect(synonyms).not.toBeNull();
      expect(synonyms?.synonyms.length).toBeGreaterThan(0);
      expect(synonyms?.synonyms.some(s => s.term === 'scallion')).toBe(true);
    });

    test('getSynonyms returns null for unmapped ingredient', () => {
      const synonyms = db.getSynonyms('unknown-ingredient');
      expect(synonyms).toBeNull();
    });

    test('getAllSynonyms returns all mappings', () => {
      const all = db.getAllSynonyms();
      expect(all.length).toBeGreaterThan(60);
    });

    test('getSynonymsByRegion filters by region', () => {
      const ukTerms = db.getSynonymsByRegion('UK');
      expect(ukTerms.length).toBeGreaterThan(0);
      expect(ukTerms.every(t => t.term)).toBe(true);
      expect(ukTerms.some(t => t.term === 'aubergine')).toBe(true);
    });
  });

  // ===========================================================================
  // UNIT LOOKUPS
  // ===========================================================================

  describe('unit lookups', () => {
    test('getUnit returns correct unit', () => {
      const cup = db.getUnit('cup');
      expect(cup).not.toBeNull();
      expect(cup?.type).toBe('volume');
    });

    test('getAllUnits returns all units', () => {
      const all = db.getAllUnits();
      expect(all.length).toBeGreaterThan(30);
    });

    test('getUnitsByType filters by type', () => {
      const volume = db.getUnitsByType('volume');
      expect(volume.length).toBeGreaterThan(0);
      expect(volume.every(u => u.type === 'volume')).toBe(true);

      const weight = db.getUnitsByType('weight');
      expect(weight.every(u => u.type === 'weight')).toBe(true);
    });
  });

  // ===========================================================================
  // STATISTICS
  // ===========================================================================

  describe('statistics', () => {
    test('getStats returns complete statistics', () => {
      const stats = db.getStats();

      expect(stats.ingredientCount).toBe(108);
      expect(stats.synonymMappingCount).toBeGreaterThan(60);
      expect(stats.totalSynonymTerms).toBeGreaterThan(200);
      expect(stats.unitCount).toBeGreaterThan(30);
      expect(Object.keys(stats.categoryCounts).length).toBeGreaterThan(10);
      expect(stats.averageSynonymsPerIngredient).toBeGreaterThan(3);
    });

    test('getStats calculates density coverage', () => {
      const stats = db.getStats();

      expect(stats.densityCoverage.withDensity).toBeGreaterThan(0);
      expect(stats.densityCoverage.withoutDensity).toBeGreaterThan(0);
      expect(stats.densityCoverage.percentage).toBeGreaterThan(0);
      expect(stats.densityCoverage.percentage).toBeLessThanOrEqual(100);

      const total = stats.densityCoverage.withDensity + stats.densityCoverage.withoutDensity;
      expect(total).toBe(stats.ingredientCount);
    });

    test('getStats calculates regional term counts', () => {
      const stats = db.getStats();

      expect(stats.regionalTermCount['UK']).toBeGreaterThan(0);
      expect(stats.regionalTermCount['AU']).toBeGreaterThan(0);
    });

    test('getCategoryBreakdown returns sorted breakdown', () => {
      const breakdown = db.getCategoryBreakdown();

      expect(breakdown.length).toBeGreaterThan(10);
      expect(breakdown.every(b => b.count > 0 && b.percentage > 0)).toBe(true);

      // Check sorted descending
      for (let i = 0; i < breakdown.length - 1; i++) {
        expect(breakdown[i].count).toBeGreaterThanOrEqual(breakdown[i + 1].count);
      }

      // Check percentages sum to ~100%
      const totalPercentage = breakdown.reduce((sum, b) => sum + b.percentage, 0);
      expect(totalPercentage).toBeCloseTo(100, 0);
    });

    test('getIngredientsWithoutDensity returns correct ingredients', () => {
      const without = db.getIngredientsWithoutDensity();
      expect(without.every(ing => !ing.density)).toBe(true);
    });

    test('getTopSynonymIngredients returns top results', () => {
      const top = db.getTopSynonymIngredients(5);

      expect(top.length).toBe(5);
      expect(top.every(t => t.synonymCount > 0)).toBe(true);

      // Check sorted descending
      for (let i = 0; i < top.length - 1; i++) {
        expect(top[i].synonymCount).toBeGreaterThanOrEqual(top[i + 1].synonymCount);
      }
    });
  });

  // ===========================================================================
  // CACHE MANAGEMENT
  // ===========================================================================

  describe('cache management', () => {
    test('cache stores results', () => {
      expect(db.getCacheSize()).toBe(0);

      db.getStats(); // This caches
      expect(db.getCacheSize()).toBe(1);
    });

    test('clearCache removes cached data', () => {
      db.getStats();
      expect(db.getCacheSize()).toBeGreaterThan(0);

      db.clearCache();
      expect(db.getCacheSize()).toBe(0);
    });

    test('cached stats are returned on subsequent calls', () => {
      const stats1 = db.getStats();
      const stats2 = db.getStats();

      expect(stats1).toEqual(stats2);
      expect(db.getCacheSize()).toBe(1);
    });
  });

  // ===========================================================================
  // EXPORT UTILITIES
  // ===========================================================================

  describe('export utilities', () => {
    test('exportJSON returns complete data', () => {
      const exported = db.exportJSON();

      expect(exported.ingredients.length).toBe(108);
      expect(exported.synonyms.length).toBeGreaterThan(60);
      expect(exported.units.length).toBeGreaterThan(30);
      expect(exported.stats).toBeDefined();
      expect(exported.stats.ingredientCount).toBe(108);
    });

    test('exportFiltered returns filtered ingredients', () => {
      const dairy = db.exportFiltered({ category: 'dairy' });
      expect(dairy.every(ing => ing.category === 'dairy')).toBe(true);
    });

    test('exportCSV generates valid CSV', () => {
      const csv = db.exportCSV();

      expect(csv).toContain('ID,Canonical,Display Name');
      expect(csv).toContain('butter');
      expect(csv).toContain('tomato');

      const lines = csv.split('\n');
      expect(lines.length).toBeGreaterThan(100); // Header + data rows
    });
  });
});

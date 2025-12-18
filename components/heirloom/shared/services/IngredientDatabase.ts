/**
 * Ingredient Database Service
 *
 * Provides optimized access to ingredient data with:
 * - In-memory caching
 * - Fast lookups by ID, canonical name, category
 * - Batch operations
 * - Statistics and analytics
 * - Export utilities for Swift
 */

import ingredientsData from '../data/ingredients.json';
import synonymsData from '../data/synonyms.json';
import unitsData from '../data/units.json';

export interface IngredientRecord {
  id: string;
  canonical: string;
  displayName: string;
  category: string;
  subcategory: string;
  aisleHint: string;
  density?: number;
  densityUnit?: string;
  note?: string;
}

export interface SynonymRecord {
  canonical: string;
  synonyms: Array<{
    term: string;
    confidence: number;
    region?: string;
  }>;
}

export interface UnitRecord {
  canonical: string;
  abbreviations: string[];
  type: string;
  system: string;
  mlEquivalent?: number;
  gramEquivalent?: number;
  regional?: Record<string, number>;
}

export interface DatabaseStats {
  ingredientCount: number;
  synonymMappingCount: number;
  totalSynonymTerms: number;
  unitCount: number;
  categoryCounts: Record<string, number>;
  regionalTermCount: Record<string, number>;
  averageSynonymsPerIngredient: number;
  densityCoverage: {
    withDensity: number;
    withoutDensity: number;
    percentage: number;
  };
}

export interface SearchOptions {
  category?: string;
  subcategory?: string;
  hasNote?: boolean;
  hasDensity?: boolean;
  minDensity?: number;
  maxDensity?: number;
}

export class IngredientDatabase {
  private ingredients: Map<string, IngredientRecord>;
  private ingredientsByCategory: Map<string, IngredientRecord[]>;
  private ingredientsByCanonical: Map<string, IngredientRecord>;
  private synonyms: Map<string, SynonymRecord>;
  private units: Map<string, UnitRecord>;
  private cache: Map<string, any>;

  constructor() {
    this.ingredients = new Map();
    this.ingredientsByCategory = new Map();
    this.ingredientsByCanonical = new Map();
    this.synonyms = new Map();
    this.units = new Map();
    this.cache = new Map();

    this.loadData();
  }

  /**
   * Load and index all data
   */
  private loadData(): void {
    // Load ingredients
    for (const ing of ingredientsData.ingredients) {
      const record = ing as IngredientRecord;
      this.ingredients.set(record.id, record);
      this.ingredientsByCanonical.set(record.canonical.toLowerCase(), record);

      // Index by category
      if (!this.ingredientsByCategory.has(record.category)) {
        this.ingredientsByCategory.set(record.category, []);
      }
      this.ingredientsByCategory.get(record.category)!.push(record);
    }

    // Load synonyms
    for (const mapping of synonymsData.mappings) {
      this.synonyms.set(mapping.canonical.toLowerCase(), mapping as SynonymRecord);
    }

    // Load units
    for (const unit of unitsData.units) {
      this.units.set(unit.canonical.toLowerCase(), unit as UnitRecord);
    }
  }

  // ============================================================================
  // INGREDIENT LOOKUPS
  // ============================================================================

  /**
   * Get ingredient by ID
   */
  getById(id: string): IngredientRecord | null {
    return this.ingredients.get(id) || null;
  }

  /**
   * Get ingredient by canonical name
   */
  getByCanonical(canonical: string): IngredientRecord | null {
    return this.ingredientsByCanonical.get(canonical.toLowerCase()) || null;
  }

  /**
   * Get all ingredients
   */
  getAllIngredients(): IngredientRecord[] {
    return Array.from(this.ingredients.values());
  }

  /**
   * Get ingredients by category
   */
  getByCategory(category: string): IngredientRecord[] {
    return this.ingredientsByCategory.get(category) || [];
  }

  /**
   * Get all categories
   */
  getCategories(): string[] {
    return Array.from(this.ingredientsByCategory.keys());
  }

  /**
   * Search ingredients with filters
   */
  search(query: string, options: SearchOptions = {}): IngredientRecord[] {
    const lowerQuery = query.toLowerCase();
    let results = this.getAllIngredients();

    // Filter by category
    if (options.category) {
      results = results.filter(ing => ing.category === options.category);
    }

    // Filter by subcategory
    if (options.subcategory) {
      results = results.filter(ing => ing.subcategory === options.subcategory);
    }

    // Filter by density
    if (options.hasDensity !== undefined) {
      results = results.filter(ing =>
        options.hasDensity ? ing.density !== null && ing.density !== undefined : !ing.density
      );
    }

    if (options.minDensity !== undefined) {
      results = results.filter(ing => ing.density && ing.density >= options.minDensity!);
    }

    if (options.maxDensity !== undefined) {
      results = results.filter(ing => ing.density && ing.density <= options.maxDensity!);
    }

    // Filter by note
    if (options.hasNote !== undefined) {
      results = results.filter(ing =>
        options.hasNote ? !!ing.note : !ing.note
      );
    }

    // Text search
    if (query) {
      results = results.filter(ing =>
        ing.canonical.toLowerCase().includes(lowerQuery) ||
        ing.displayName.toLowerCase().includes(lowerQuery) ||
        ing.id.toLowerCase().includes(lowerQuery)
      );
    }

    return results;
  }

  /**
   * Batch get ingredients by IDs
   */
  batchGetByIds(ids: string[]): IngredientRecord[] {
    return ids.map(id => this.getById(id)).filter(Boolean) as IngredientRecord[];
  }

  /**
   * Batch get ingredients by canonical names
   */
  batchGetByCanonical(canonicals: string[]): IngredientRecord[] {
    return canonicals.map(c => this.getByCanonical(c)).filter(Boolean) as IngredientRecord[];
  }

  // ============================================================================
  // SYNONYM LOOKUPS
  // ============================================================================

  /**
   * Get synonyms for a canonical ingredient
   */
  getSynonyms(canonical: string): SynonymRecord | null {
    return this.synonyms.get(canonical.toLowerCase()) || null;
  }

  /**
   * Get all synonym mappings
   */
  getAllSynonyms(): SynonymRecord[] {
    return Array.from(this.synonyms.values());
  }

  /**
   * Get synonyms by region
   */
  getSynonymsByRegion(region: string): Array<{ canonical: string; term: string; confidence: number }> {
    const results: Array<{ canonical: string; term: string; confidence: number }> = [];

    for (const [canonical, mapping] of this.synonyms.entries()) {
      for (const syn of mapping.synonyms) {
        if (syn.region === region) {
          results.push({
            canonical,
            term: syn.term,
            confidence: syn.confidence,
          });
        }
      }
    }

    return results;
  }

  // ============================================================================
  // UNIT LOOKUPS
  // ============================================================================

  /**
   * Get unit by canonical name
   */
  getUnit(canonical: string): UnitRecord | null {
    return this.units.get(canonical.toLowerCase()) || null;
  }

  /**
   * Get all units
   */
  getAllUnits(): UnitRecord[] {
    return Array.from(this.units.values());
  }

  /**
   * Get units by type (volume, weight, count, etc.)
   */
  getUnitsByType(type: string): UnitRecord[] {
    return this.getAllUnits().filter(unit => unit.type === type);
  }

  // ============================================================================
  // STATISTICS & ANALYTICS
  // ============================================================================

  /**
   * Get database statistics
   */
  getStats(): DatabaseStats {
    const cacheKey = 'stats';
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    const stats: DatabaseStats = {
      ingredientCount: this.ingredients.size,
      synonymMappingCount: this.synonyms.size,
      totalSynonymTerms: 0,
      unitCount: this.units.size,
      categoryCounts: {},
      regionalTermCount: {},
      averageSynonymsPerIngredient: 0,
      densityCoverage: {
        withDensity: 0,
        withoutDensity: 0,
        percentage: 0,
      },
    };

    // Count synonyms
    for (const mapping of this.synonyms.values()) {
      stats.totalSynonymTerms += mapping.synonyms.length;

      // Count regional terms
      for (const syn of mapping.synonyms) {
        if (syn.region) {
          stats.regionalTermCount[syn.region] = (stats.regionalTermCount[syn.region] || 0) + 1;
        }
      }
    }

    stats.averageSynonymsPerIngredient = stats.totalSynonymTerms / stats.synonymMappingCount;

    // Count by category
    for (const [category, ingredients] of this.ingredientsByCategory.entries()) {
      stats.categoryCounts[category] = ingredients.length;
    }

    // Density coverage
    for (const ing of this.ingredients.values()) {
      if (ing.density) {
        stats.densityCoverage.withDensity++;
      } else {
        stats.densityCoverage.withoutDensity++;
      }
    }

    stats.densityCoverage.percentage =
      (stats.densityCoverage.withDensity / stats.ingredientCount) * 100;

    this.cache.set(cacheKey, stats);
    return stats;
  }

  /**
   * Get category breakdown
   */
  getCategoryBreakdown(): Array<{ category: string; count: number; percentage: number }> {
    const stats = this.getStats();
    const total = stats.ingredientCount;

    return Object.entries(stats.categoryCounts)
      .map(([category, count]) => ({
        category,
        count,
        percentage: (count / total) * 100,
      }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get ingredients missing density data
   */
  getIngredientsWithoutDensity(): IngredientRecord[] {
    return this.getAllIngredients().filter(ing => !ing.density);
  }

  /**
   * Get most synonym-rich ingredients
   */
  getTopSynonymIngredients(limit = 10): Array<{ canonical: string; synonymCount: number }> {
    return Array.from(this.synonyms.entries())
      .map(([canonical, mapping]) => ({
        canonical,
        synonymCount: mapping.synonyms.length,
      }))
      .sort((a, b) => b.synonymCount - a.synonymCount)
      .slice(0, limit);
  }

  // ============================================================================
  // CACHE MANAGEMENT
  // ============================================================================

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   */
  getCacheSize(): number {
    return this.cache.size;
  }

  // ============================================================================
  // EXPORT UTILITIES
  // ============================================================================

  /**
   * Export data as JSON for external use
   */
  exportJSON(): {
    ingredients: IngredientRecord[];
    synonyms: SynonymRecord[];
    units: UnitRecord[];
    stats: DatabaseStats;
  } {
    return {
      ingredients: this.getAllIngredients(),
      synonyms: this.getAllSynonyms(),
      units: this.getAllUnits(),
      stats: this.getStats(),
    };
  }

  /**
   * Export filtered data
   */
  exportFiltered(options: SearchOptions): IngredientRecord[] {
    return this.search('', options);
  }

  /**
   * Export as CSV
   */
  exportCSV(): string {
    const ingredients = this.getAllIngredients();
    const headers = ['ID', 'Canonical', 'Display Name', 'Category', 'Subcategory', 'Aisle', 'Density', 'Note'];
    const rows = ingredients.map(ing => [
      ing.id,
      ing.canonical,
      ing.displayName,
      ing.category,
      ing.subcategory,
      ing.aisleHint,
      ing.density?.toString() || '',
      ing.note || '',
    ]);

    return [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
  }
}

// Export singleton instance
export const ingredientDatabase = new IngredientDatabase();

/**
 * Ingredient Normalizer
 *
 * Normalizes ingredient names to canonical forms using:
 * - Exact matching
 * - Synonym lookup (with regional variants)
 * - Fuzzy matching (Levenshtein distance)
 * - Preparation term extraction
 */

import { IngredientInfo, NormalizationResult, IngredientMatch, IngredientCategory, Region } from '../types';
import ingredientsData from '../data/ingredients.json';
import synonymsData from '../data/synonyms.json';

// Preparation terms to extract (not part of ingredient name)
const PREPARATION_TERMS = [
  // Cutting
  'chopped', 'diced', 'minced', 'sliced', 'julienned', 'cubed',
  'quartered', 'halved', 'crushed', 'grated', 'shredded', 'torn',
  'finely chopped', 'coarsely chopped', 'roughly chopped',

  // Processing
  'sifted', 'melted', 'softened', 'room temperature', 'cold',
  'frozen', 'thawed', 'drained', 'rinsed', 'peeled', 'seeded',
  'cored', 'trimmed', 'stemmed', 'deveined', 'deboned', 'skinless',
  'boneless',

  // Size/State
  'large', 'medium', 'small', 'thin', 'thick', 'fine', 'coarse',
  'fresh', 'dried', 'ground', 'whole', 'packed', 'loosely packed',
  'firmly packed', 'lightly beaten', 'beaten', 'whisked',

  // Temperature
  'warm', 'hot', 'chilled', 'at room temperature',

  // Form
  'crumbled', 'flaked', 'powdered', 'granulated'
];

// Modifiers that describe the ingredient
const MODIFIER_TERMS = [
  'fresh', 'frozen', 'canned', 'dried', 'raw', 'cooked',
  'organic', 'unsalted', 'salted', 'sweetened', 'unsweetened',
  'low-fat', 'full-fat', 'skim', 'whole', 'reduced-fat',
  'extra virgin', 'virgin', 'refined',
  'pure', 'natural', 'homemade'
];

export class IngredientNormalizer {
  private ingredients: Map<string, any>; // canonical → ingredient data
  private synonymMap: Map<string, { canonical: string; confidence: number }>; // synonym → { canonical, confidence }
  private region: Region;

  constructor(region: Region = 'US') {
    this.region = region;
    this.ingredients = new Map();
    this.synonymMap = new Map();
    this.loadData();
  }

  /**
   * Load ingredients and synonyms from data files
   */
  private loadData(): void {
    // Load ingredients
    for (const ing of ingredientsData.ingredients) {
      this.ingredients.set(ing.canonical.toLowerCase(), ing);
    }

    // Load synonyms
    for (const mapping of synonymsData.mappings) {
      const canonical = mapping.canonical.toLowerCase();

      for (const syn of mapping.synonyms) {
        const term = syn.term.toLowerCase();

        // Store synonym with confidence
        this.synonymMap.set(term, {
          canonical,
          confidence: syn.confidence,
        });
      }

      // Also map canonical to itself with confidence 1.0
      this.synonymMap.set(canonical, { canonical, confidence: 1.0 });
    }
  }

  /**
   * Normalize an ingredient string to canonical form
   */
  normalize(input: string): NormalizationResult {
    if (!input || input.trim() === '') {
      return {
        canonical: '',
        original: input,
        confidence: 0,
        matchType: 'unknown',
        category: 'other',
        metadata: null,
      };
    }

    const trimmed = input.trim().toLowerCase();

    // FIRST: Try matching the full input without extracting preparation terms
    // This preserves multi-word ingredients like "ground beef", "cream cheese", etc.

    // Try exact match on full input
    if (this.ingredients.has(trimmed)) {
      const ing = this.ingredients.get(trimmed)!;
      return {
        canonical: ing.canonical,
        original: input,
        confidence: 1.0,
        matchType: 'exact',
        category: ing.category as IngredientCategory,
        metadata: ing,
      };
    }

    // Try synonym match on full input
    const synonymResult = this.synonymMap.get(trimmed);
    if (synonymResult) {
      const ing = this.ingredients.get(synonymResult.canonical);
      return {
        canonical: synonymResult.canonical,
        original: input,
        confidence: synonymResult.confidence,
        matchType: 'synonym',
        category: ing?.category as IngredientCategory || 'other',
        metadata: ing || null,
      };
    }

    // NOTE: We don't do fuzzy matching on the full input here because it can incorrectly match
    // ingredients with preparation terms (e.g., "chopped onions" might fuzzy match to "almonds").
    // Instead, we extract preparation terms first, then do fuzzy matching on the cleaned name.

    // SECOND: If no exact/synonym match found, extract preparation terms and try again
    const { ingredient: cleanedName, preparation, modifiers } = this.extractPreparation(trimmed);

    // Try exact match after removing preparations
    if (this.ingredients.has(cleanedName)) {
      const ing = this.ingredients.get(cleanedName)!;
      return {
        canonical: ing.canonical,
        original: input,
        confidence: 1.0,
        matchType: 'exact',
        category: ing.category as IngredientCategory,
        metadata: ing,
      };
    }

    // Try synonym match after removing preparations
    const synonymResultCleaned = this.synonymMap.get(cleanedName);
    if (synonymResultCleaned) {
      const ing = this.ingredients.get(synonymResultCleaned.canonical);
      return {
        canonical: synonymResultCleaned.canonical,
        original: input,
        confidence: synonymResultCleaned.confidence,
        matchType: 'synonym',
        category: ing?.category as IngredientCategory || 'other',
        metadata: ing || null,
      };
    }

    // Try fuzzy match after removing preparations
    const fuzzyMatch = this.findFuzzyMatch(cleanedName);
    if (fuzzyMatch) {
      const ing = this.ingredients.get(fuzzyMatch.canonical);
      return {
        canonical: fuzzyMatch.canonical,
        original: input,
        confidence: fuzzyMatch.confidence,
        matchType: 'fuzzy',
        category: ing?.category as IngredientCategory || 'other',
        metadata: ing || null,
      };
    }

    // Try removing plural 's' and match again
    if (cleanedName.endsWith('s') && cleanedName.length > 2) {
      // Try different plural forms
      const singularForms = [
        cleanedName.slice(0, -1),  // tomatoes → tomatoe, eggs → egg
      ];

      // Handle words ending in 'es' (tomatoes → tomato, potatoes → potato)
      if (cleanedName.endsWith('es') && cleanedName.length > 3) {
        singularForms.push(cleanedName.slice(0, -2));  // tomatoes → tomat
        // Also try without just the 'e' before 's' for words like "tomatoes"
        if (cleanedName.length > 4) {
          const withoutEs = cleanedName.slice(0, -2);
          // Check if removing 'es' and adding 'o' makes sense (tomatoes → tomato)
          if (cleanedName.endsWith('oes')) {
            singularForms.push(cleanedName.slice(0, -2));  // tomatoes → tomat
          }
        }
      }

      // Handle words ending in 'ies' (berries → berry)
      if (cleanedName.endsWith('ies') && cleanedName.length > 4) {
        singularForms.push(cleanedName.slice(0, -3) + 'y');  // berries → berry
      }

      for (const singular of singularForms) {
        if (this.ingredients.has(singular)) {
          const ing = this.ingredients.get(singular)!;
          return {
            canonical: ing.canonical,
            original: input,
            confidence: 0.95,
            matchType: 'fuzzy',
            category: ing.category as IngredientCategory,
            metadata: ing,
          };
        }

        // Try synonym match on singular
        const singularSynonym = this.synonymMap.get(singular);
        if (singularSynonym) {
          const ing = this.ingredients.get(singularSynonym.canonical);
          return {
            canonical: singularSynonym.canonical,
            original: input,
            confidence: singularSynonym.confidence * 0.95,
            matchType: 'fuzzy',
            category: ing?.category as IngredientCategory || 'other',
            metadata: ing || null,
          };
        }
      }
    }

    // Unknown ingredient
    return {
      canonical: cleanedName,
      original: input,
      confidence: 0.5,
      matchType: 'unknown',
      category: this.guessCategory(cleanedName),
      metadata: null,
    };
  }

  /**
   * Extract preparation terms and modifiers from ingredient string
   */
  extractPreparation(input: string): {
    ingredient: string;
    preparation: string[];
    modifiers: string[];
  } {
    let remaining = input.toLowerCase();
    const preparation: string[] = [];
    const modifiers: string[] = [];

    // Extract preparation terms (usually after comma or at end)
    // Pattern: "ingredient, preparation" or "preparation ingredient"

    // Check for comma-separated preparation
    if (remaining.includes(',')) {
      const parts = remaining.split(',');
      remaining = parts[0].trim();

      for (let i = 1; i < parts.length; i++) {
        const part = parts[i].trim();
        preparation.push(part);
      }
    }

    // Extract modifiers (usually before the main ingredient)
    for (const modifier of MODIFIER_TERMS) {
      const pattern = new RegExp(`\\b${modifier}\\b`, 'gi');
      if (pattern.test(remaining)) {
        modifiers.push(modifier);
      }
    }

    // Extract preparation terms from the ingredient name
    for (const prep of PREPARATION_TERMS) {
      const pattern = new RegExp(`\\b${prep}\\b`, 'gi');
      if (pattern.test(remaining)) {
        preparation.push(prep);
        remaining = remaining.replace(pattern, '').trim();
      }
    }

    // Clean up extra whitespace
    remaining = remaining.replace(/\s+/g, ' ').trim();

    return {
      ingredient: remaining,
      preparation,
      modifiers,
    };
  }

  /**
   * Find similar ingredients using fuzzy matching (Levenshtein distance)
   */
  findSimilar(input: string, threshold = 0.7): IngredientMatch[] {
    const cleaned = input.toLowerCase().trim();
    const matches: IngredientMatch[] = [];

    // Search through all canonical names and synonyms
    const searchTerms = new Set<string>();

    // Add all canonical names
    for (const canonical of this.ingredients.keys()) {
      searchTerms.add(canonical);
    }

    // Add all synonyms
    for (const [synonym, { canonical }] of this.synonymMap.entries()) {
      searchTerms.add(synonym);
    }

    for (const term of searchTerms) {
      const similarity = this.calculateSimilarity(cleaned, term);

      if (similarity >= threshold) {
        // Get the canonical form
        const canonicalName = this.synonymMap.get(term)?.canonical || term;

        matches.push({
          ingredient: canonicalName,
          score: similarity,
          matchType: 'fuzzy',
        });
      }
    }

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score);

    // Remove duplicates (same canonical name)
    const seen = new Set<string>();
    return matches.filter(match => {
      if (seen.has(match.ingredient)) {
        return false;
      }
      seen.add(match.ingredient);
      return true;
    });
  }

  /**
   * Find best fuzzy match above threshold
   */
  private findFuzzyMatch(input: string, threshold = 0.70): { canonical: string; confidence: number } | null {
    const matches = this.findSimilar(input, threshold);

    if (matches.length > 0) {
      return {
        canonical: matches[0].ingredient,
        confidence: matches[0].score,
      };
    }

    return null;
  }

  /**
   * Calculate similarity between two strings (Levenshtein-based)
   */
  private calculateSimilarity(a: string, b: string): number {
    const distance = this.levenshteinDistance(a, b);
    const maxLength = Math.max(a.length, b.length);

    if (maxLength === 0) return 1.0;

    return 1 - (distance / maxLength);
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,      // insertion
            matrix[i - 1][j] + 1       // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  /**
   * Guess category for unknown ingredients based on keywords
   */
  private guessCategory(name: string): IngredientCategory {
    const lower = name.toLowerCase();

    // Produce keywords
    if (lower.match(/vegetable|fruit|herb|lettuce|greens|salad|onion|pepper|tomato|carrot|celery/)) {
      return 'produce';
    }

    // Meat keywords
    if (lower.match(/chicken|beef|pork|meat|turkey|lamb|steak/)) {
      return 'meat';
    }

    // Seafood keywords
    if (lower.match(/fish|shrimp|salmon|tuna|seafood|shellfish/)) {
      return 'seafood';
    }

    // Dairy keywords
    if (lower.match(/milk|cream|cheese|butter|yogurt|dairy/)) {
      return 'dairy';
    }

    // Spices keywords
    if (lower.match(/spice|seasoning|pepper|salt|cinnamon|cumin|paprika/)) {
      return 'spices';
    }

    // Baking keywords
    if (lower.match(/flour|sugar|baking|yeast|extract|vanilla/)) {
      return 'baking';
    }

    // Oils keywords
    if (lower.match(/oil|fat|lard|shortening/)) {
      return 'oils';
    }

    // Grains keywords
    if (lower.match(/rice|pasta|grain|oat|quinoa|barley/)) {
      return 'grains';
    }

    // Condiments keywords
    if (lower.match(/sauce|ketchup|mustard|mayo|condiment/)) {
      return 'condiments';
    }

    return 'other';
  }

  /**
   * Check if two ingredient names should be combined
   */
  areCombineable(ing1: string, ing2: string): boolean {
    const norm1 = this.normalize(ing1);
    const norm2 = this.normalize(ing2);

    // Same canonical name = combineable
    if (norm1.canonical === norm2.canonical) {
      return true;
    }

    // Check if they're synonyms
    const syn1 = this.synonymMap.get(ing1.toLowerCase());
    const syn2 = this.synonymMap.get(ing2.toLowerCase());

    if (syn1 && syn2 && syn1.canonical === syn2.canonical) {
      return true;
    }

    return false;
  }

  /**
   * Get ingredient metadata
   */
  getMetadata(canonical: string): any | null {
    return this.ingredients.get(canonical.toLowerCase()) || null;
  }

  /**
   * Set region for regional variant handling
   */
  setRegion(region: Region): void {
    this.region = region;
  }

  /**
   * Get current region
   */
  getRegion(): Region {
    return this.region;
  }

  /**
   * Get all ingredients
   */
  getAllIngredients(): string[] {
    return Array.from(this.ingredients.keys());
  }

  /**
   * Get all synonyms for a canonical ingredient
   */
  getSynonyms(canonical: string): string[] {
    const synonyms: string[] = [];

    for (const [term, { canonical: termCanonical }] of this.synonymMap.entries()) {
      if (termCanonical === canonical.toLowerCase() && term !== canonical.toLowerCase()) {
        synonyms.push(term);
      }
    }

    return synonyms;
  }
}

// Export singleton instance
export const ingredientNormalizer = new IngredientNormalizer();

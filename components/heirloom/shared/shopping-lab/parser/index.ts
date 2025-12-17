/**
 * Full Ingredient Parser
 *
 * Orchestrates parsing of complete ingredient strings:
 * - Quantity (via QuantityParser)
 * - Unit (via UnitConverter)
 * - Ingredient name (via IngredientNormalizer)
 * - Preparation terms
 * - Modifiers
 *
 * Example inputs:
 * - "2 cups chopped onions"
 * - "1½ lbs ground beef"
 * - "3-4 tablespoons olive oil"
 * - "a pinch of salt"
 */

import { ParsedIngredient, QuantityValue, UnitInfo, IngredientInfo, IngredientFlags, Region } from '../types';
import { QuantityParser } from './quantity-parser';
import { UnitConverter } from '../units';
import { IngredientNormalizer } from '../normalizer';

export interface ParserConfig {
  region?: Region;
  strictMatching?: boolean;  // If true, only exact/synonym matches accepted
  extractPreparation?: boolean;  // Extract preparation terms
  normalizeUnits?: boolean;  // Normalize units to preferred forms
}

export class IngredientParser {
  private quantityParser: QuantityParser;
  private unitConverter: UnitConverter;
  private normalizer: IngredientNormalizer;
  private config: Required<ParserConfig>;

  constructor(config: ParserConfig = {}) {
    this.config = {
      region: config.region || 'US',
      strictMatching: config.strictMatching ?? false,
      extractPreparation: config.extractPreparation ?? true,
      normalizeUnits: config.normalizeUnits ?? true,
    };

    this.quantityParser = new QuantityParser();
    this.unitConverter = new UnitConverter(this.config.region);
    this.normalizer = new IngredientNormalizer(this.config.region);
  }

  /**
   * Preprocess ingredient string to clean up common patterns
   */
  private preprocess(input: string): string {
    let cleaned = input;

    // Pattern 1: Parenthetical measurement as primary
    // "1 (14.5 oz) can diced tomatoes" → "14.5 oz diced tomatoes"
    // Extract measurement from parentheses and remove container descriptor before it
    const parentheticalMeasurement = /\b\d+\s*\(\s*(\d+\.?\d*\s*(?:oz|ounce|lb|pound|g|gram|kg))\s*\)\s*(can|jar|package|container|box)\b/gi;
    cleaned = cleaned.replace(parentheticalMeasurement, '$1');

    // Pattern 2: Alternative measurements to ignore
    // "2 cups (about 300g) flour" → "2 cups flour"
    // Remove parenthetical content that contains "about" or is clearly an alternative measurement
    cleaned = cleaned.replace(/\(\s*about\s+[^)]+\)/gi, '');

    // Pattern 3: Package descriptor with embedded measurement
    // "one 8-ounce package cream cheese" → "8 ounce cream cheese"
    // Extract measurement from package/container descriptor
    const packageWithMeasurement = /\b(?:one|a|an)?\s*(\d+(?:\.\d+)?)\s*[\-\s]*(ounce|oz|pound|lb|gram|g|kg)\s*[\-\s]*(package|container|box|jar|can)\b/gi;
    cleaned = cleaned.replace(packageWithMeasurement, '$1 $2');

    // Pattern 4: "To taste" conversion
    // "salt to taste" → "1+ pinch salt"
    // Capture ingredient before "to taste" and restructure
    // The "+" indicates "or more" since "to taste" is subjective
    cleaned = cleaned.replace(/^([a-z\s]+?)\s+(to taste|as needed|or to taste)$/gi, '1+ pinch $1');

    // Pattern 5: Clean up "for serving" and similar
    cleaned = cleaned.replace(/\b(for serving|for garnish)\b/gi, '');

    // Clean up multiple spaces
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    return cleaned;
  }

  /**
   * Parse a complete ingredient string
   */
  parse(input: string): ParsedIngredient {
    if (!input || input.trim() === '') {
      return this.createEmptyResult(input);
    }

    const original = input;
    let remaining = this.preprocess(input);

    // Step 1: Parse quantity
    const { quantity, remainder: afterQuantity } = this.quantityParser.parse(remaining);
    remaining = afterQuantity;

    // Step 2: Parse unit
    let unit: UnitInfo | null = null;
    if (remaining) {
      const unitResult = this.unitConverter.extractUnit(remaining);
      if (unitResult) {
        unit = unitResult.unit;
        remaining = unitResult.remainder;
      }
    }

    // Step 3: Parse ingredient name
    const normalizationResult = this.normalizer.normalize(remaining);

    // Step 4: Extract preparation terms
    let preparation: string[] = [];
    let modifiers: string[] = [];

    if (this.config.extractPreparation) {
      const extracted = this.normalizer.extractPreparation(remaining);
      preparation = extracted.preparation;
      modifiers = extracted.modifiers;
    }

    // Step 5: Build ingredient info
    const ingredient: IngredientInfo = {
      canonical: normalizationResult.canonical,
      original: normalizationResult.original,
      category: normalizationResult.category,
      metadata: normalizationResult.metadata,
    };

    // Step 6: Calculate overall confidence
    const confidence = this.calculateConfidence(
      quantity,
      unit,
      normalizationResult.confidence,
      normalizationResult.matchType
    );

    // Step 7: Set flags
    const flags = this.determineFlags(
      quantity,
      unit,
      normalizationResult.matchType,
      normalizationResult.confidence
    );

    return {
      original,
      quantity,
      unit,
      ingredient,
      preparation,
      modifiers,
      confidence,
      flags,
    };
  }

  /**
   * Parse multiple ingredient strings
   */
  parseMany(inputs: string[]): ParsedIngredient[] {
    return inputs.map(input => this.parse(input));
  }

  /**
   * Calculate overall parsing confidence
   */
  private calculateConfidence(
    quantity: QuantityValue | null,
    unit: UnitInfo | null,
    ingredientConfidence: number,
    matchType: string
  ): number {
    // Base confidence from ingredient match
    let confidence = ingredientConfidence;

    // Boost confidence if we have quantity
    if (quantity) {
      confidence *= 1.05;
    }

    // Boost confidence if we have unit
    if (unit) {
      confidence *= 1.05;
    }

    // Penalty for unknown ingredients
    if (matchType === 'unknown') {
      confidence *= 0.8;
    }

    // Cap at 1.0
    return Math.min(confidence, 1.0);
  }

  /**
   * Determine parsing flags
   */
  private determineFlags(
    quantity: QuantityValue | null,
    unit: UnitInfo | null,
    matchType: string,
    ingredientConfidence: number
  ): IngredientFlags {
    return {
      hasQuantity: quantity !== null,
      hasUnit: unit !== null,
      isApproximate: quantity?.type === 'approximate',
      isRange: quantity?.type === 'range',
      needsReview: matchType === 'unknown' || ingredientConfidence < 0.7,
      isInformalUnit: unit?.type === 'informal',
      hasAmbiguity: matchType === 'fuzzy' && ingredientConfidence < 0.9,
    };
  }

  /**
   * Create empty result for invalid input
   */
  private createEmptyResult(original: string): ParsedIngredient {
    return {
      original,
      quantity: null,
      unit: null,
      ingredient: {
        canonical: '',
        original: '',
        category: 'other',
        metadata: null,
      },
      preparation: [],
      modifiers: [],
      confidence: 0,
      flags: {
        hasQuantity: false,
        hasUnit: false,
        isApproximate: false,
        isRange: false,
        needsReview: true,
        isInformalUnit: false,
        hasAmbiguity: false,
      },
    };
  }

  /**
   * Set region for regional variants
   */
  setRegion(region: Region): void {
    this.config.region = region;
    this.unitConverter.setRegion(region);
    this.normalizer.setRegion(region);
  }

  /**
   * Get current region
   */
  getRegion(): Region {
    return this.config.region;
  }

  /**
   * Update parser configuration
   */
  setConfig(config: Partial<ParserConfig>): void {
    this.config = { ...this.config, ...config };

    if (config.region) {
      this.unitConverter.setRegion(config.region);
      this.normalizer.setRegion(config.region);
    }
  }

  /**
   * Get current configuration
   */
  getConfig(): Required<ParserConfig> {
    return { ...this.config };
  }
}

// Export singleton instance with US defaults
export const ingredientParser = new IngredientParser();

// Re-export types for external use
export type { ParsedIngredient, QuantityValue, UnitInfo, IngredientInfo, IngredientFlags, Region } from '../types';

/**
 * Unit Conversion System
 *
 * Provides comprehensive unit conversion for recipe ingredients including:
 * - Volume ↔ Volume (tsp ↔ tbsp ↔ cup ↔ ml ↔ L)
 * - Weight ↔ Weight (oz ↔ lb ↔ g ↔ kg)
 * - Volume ↔ Weight (requires ingredient density)
 * - Regional variants (US/UK/AU)
 * - Smart display unit optimization
 */

import { UnitInfo, UnitDefinition, UnitType, UnitSystem, Region } from '../types';
import unitsData from '../data/units.json';

export class UnitConverter {
  private units: Map<string, UnitDefinition>;
  private abbreviationMap: Map<string, string>; // abbrev → canonical
  private region: Region;

  constructor(region: Region = 'US') {
    this.region = region;
    this.units = new Map();
    this.abbreviationMap = new Map();
    this.loadUnits();
  }

  /**
   * Load units from data file and build lookup maps
   */
  private loadUnits(): void {
    for (const unit of unitsData.units) {
      this.units.set(unit.canonical.toLowerCase(), unit as UnitDefinition);

      // Map all abbreviations to canonical form
      // IMPORTANT: Case-sensitive for single-letter abbreviations (T vs t)
      for (const abbrev of unit.abbreviations) {
        // For single-letter abbreviations, preserve case to distinguish T (tbsp) from t (tsp)
        if (abbrev.length === 1) {
          this.abbreviationMap.set(abbrev, unit.canonical.toLowerCase());
        } else {
          this.abbreviationMap.set(abbrev.toLowerCase(), unit.canonical.toLowerCase());
        }
      }
    }
  }

  /**
   * Parse a unit string to canonical UnitInfo
   * Handles case-insensitive matching and abbreviations
   * Case-sensitive for single-letter units (T vs t)
   */
  parseUnit(input: string): UnitInfo | null {
    if (!input || input.trim() === '') {
      return null;
    }

    const trimmed = input.trim();
    const normalized = trimmed.toLowerCase();

    // Try direct canonical match first
    // For single letters, preserve case; otherwise lowercase
    let canonical = trimmed.length === 1
      ? this.abbreviationMap.get(trimmed)
      : this.abbreviationMap.get(normalized);

    // If not found, check if input itself is canonical
    if (!canonical && this.units.has(normalized)) {
      canonical = normalized;
    }

    if (!canonical) {
      return null;
    }

    const unit = this.units.get(canonical);
    if (!unit) {
      return null;
    }

    // Get regional-specific value if available
    const mlEquivalent = this.getRegionalValue(unit, 'mlEquivalent');
    const gramEquivalent = unit.gramEquivalent;

    return {
      canonical: unit.canonical,
      original: input.trim(),
      type: unit.type,
      system: unit.system,
      mlEquivalent,
      gramEquivalent,
    };
  }

  /**
   * Extract unit from the beginning of a string
   * Returns the unit and the remaining string
   */
  extractUnit(input: string): { unit: UnitInfo; remainder: string } | null {
    if (!input || input.trim() === '') {
      return null;
    }

    const trimmed = input.trim();
    const words = trimmed.split(/\s+/);

    // Try to match units starting from the first word(s)
    // Try multi-word units first (e.g., "fl oz", "fluid ounce")
    for (let wordCount = Math.min(words.length, 3); wordCount > 0; wordCount--) {
      const potentialUnit = words.slice(0, wordCount).join(' ');
      const unit = this.parseUnit(potentialUnit);

      if (unit) {
        let remainderWords = words.slice(wordCount);

        // Strip common connecting words like "of"
        if (remainderWords.length > 0 && remainderWords[0].toLowerCase() === 'of') {
          remainderWords = remainderWords.slice(1);
        }

        const remainder = remainderWords.join(' ');
        return { unit, remainder };
      }
    }

    return null;
  }

  /**
   * Get regional-specific value for a unit (e.g., AU tablespoon = 20ml vs US 14.79ml)
   */
  private getRegionalValue(unit: UnitDefinition, key: 'mlEquivalent' | 'gramEquivalent'): number | undefined {
    if (key === 'mlEquivalent' && unit.mlEquivalent) {
      if (unit.regional && unit.regional[this.region]) {
        return unit.regional[this.region];
      }
      return unit.mlEquivalent;
    }

    if (key === 'gramEquivalent') {
      return unit.gramEquivalent;
    }

    return undefined;
  }

  /**
   * Convert quantity from one unit to another
   * Returns null if conversion is not possible
   */
  convert(
    value: number,
    from: UnitInfo,
    to: UnitInfo,
    ingredientDensity?: number
  ): number | null {
    // Same unit - no conversion needed
    if (from.canonical === to.canonical) {
      return value;
    }

    // Check if conversion is possible
    if (!this.areCompatible(from, to, ingredientDensity !== undefined)) {
      return null;
    }

    // Volume to volume
    if (from.type === 'volume' && to.type === 'volume') {
      return this.convertVolume(value, from, to);
    }

    // Weight to weight
    if (from.type === 'weight' && to.type === 'weight') {
      return this.convertWeight(value, from, to);
    }

    // Volume to weight (requires density)
    if (from.type === 'volume' && to.type === 'weight' && ingredientDensity) {
      const ml = this.toMl(value, from);
      const grams = (ml / 236.588) * ingredientDensity; // Assuming density is per cup (236.588ml)
      return this.fromGrams(grams, to);
    }

    // Weight to volume (requires density)
    if (from.type === 'weight' && to.type === 'volume' && ingredientDensity) {
      const grams = this.toGrams(value, from);
      const cups = grams / ingredientDensity;
      const ml = cups * 236.588;
      return this.fromMl(ml, to);
    }

    return null;
  }

  /**
   * Check if two units can be combined/converted
   */
  areCompatible(unit1: UnitInfo, unit2: UnitInfo, hasDensity = false): boolean {
    // Count units only compatible with exact same unit
    if (unit1.type === 'count' || unit2.type === 'count') {
      return unit1.canonical === unit2.canonical;
    }

    // Same type is always compatible (except count, handled above)
    if (unit1.type === unit2.type) {
      return true;
    }

    // Volume and weight are compatible only with density
    if ((unit1.type === 'volume' && unit2.type === 'weight') ||
        (unit1.type === 'weight' && unit2.type === 'volume')) {
      return hasDensity;
    }

    // Informal units can sometimes convert to standard
    if (unit1.type === 'informal' && unit2.type === 'volume') {
      return unit1.mlEquivalent !== undefined;
    }

    if (unit1.type === 'informal' && unit2.type === 'weight') {
      return unit1.gramEquivalent !== undefined;
    }

    return false;
  }

  /**
   * Convert volume to milliliters (base unit for volume)
   */
  private toMl(value: number, unit: UnitInfo): number {
    if (!unit.mlEquivalent) {
      throw new Error(`Cannot convert ${unit.canonical} to ml - no conversion factor`);
    }
    return value * unit.mlEquivalent;
  }

  /**
   * Convert milliliters to target volume unit
   */
  private fromMl(ml: number, unit: UnitInfo): number {
    if (!unit.mlEquivalent) {
      throw new Error(`Cannot convert ml to ${unit.canonical} - no conversion factor`);
    }
    return ml / unit.mlEquivalent;
  }

  /**
   * Convert weight to grams (base unit for weight)
   */
  private toGrams(value: number, unit: UnitInfo): number {
    if (!unit.gramEquivalent) {
      throw new Error(`Cannot convert ${unit.canonical} to grams - no conversion factor`);
    }
    return value * unit.gramEquivalent;
  }

  /**
   * Convert grams to target weight unit
   */
  private fromGrams(grams: number, unit: UnitInfo): number {
    if (!unit.gramEquivalent) {
      throw new Error(`Cannot convert grams to ${unit.canonical} - no conversion factor`);
    }
    return grams / unit.gramEquivalent;
  }

  /**
   * Convert volume units
   */
  private convertVolume(value: number, from: UnitInfo, to: UnitInfo): number {
    const ml = this.toMl(value, from);
    return this.fromMl(ml, to);
  }

  /**
   * Convert weight units
   */
  private convertWeight(value: number, from: UnitInfo, to: UnitInfo): number {
    const grams = this.toGrams(value, from);
    return this.fromGrams(grams, to);
  }

  /**
   * Get the best display unit for a quantity
   * E.g., 48 tsp → 1 cup, 0.25 cup → 4 tbsp
   */
  getBestDisplayUnit(quantity: number, unit: UnitInfo): { quantity: number; unit: UnitInfo } {
    // For count and informal units, don't optimize
    if (unit.type === 'count' || unit.type === 'informal' || unit.type === 'other') {
      return { quantity, unit };
    }

    // Volume optimization
    if (unit.type === 'volume') {
      return this.optimizeVolumeDisplay(quantity, unit);
    }

    // Weight optimization
    if (unit.type === 'weight') {
      return this.optimizeWeightDisplay(quantity, unit);
    }

    return { quantity, unit };
  }

  /**
   * Optimize volume display to use sensible units
   */
  private optimizeVolumeDisplay(quantity: number, unit: UnitInfo): { quantity: number; unit: UnitInfo } {
    const ml = this.toMl(quantity, unit);

    // US system preferences
    if (this.region === 'US') {
      // > 3 cups → use cups
      if (ml >= 709.764) { // 3 cups
        const cupUnit = this.parseUnit('cup')!;
        return { quantity: this.fromMl(ml, cupUnit), unit: cupUnit };
      }

      // 1-3 cups → use cups
      if (ml >= 236.588 && ml < 709.764) {
        const cupUnit = this.parseUnit('cup')!;
        return { quantity: this.fromMl(ml, cupUnit), unit: cupUnit };
      }

      // 1/4 cup or more → consider using cups
      if (ml >= 59.147) { // 4 tbsp = 1/4 cup
        const cups = ml / 236.588;
        // Only use cups if it's a nice fraction AND at least 1/4 cup
        if (cups >= 0.25 && this.isNiceFraction(cups)) {
          const cupUnit = this.parseUnit('cup')!;
          return { quantity: cups, unit: cupUnit };
        }
        // Otherwise use tablespoons
        const tbspUnit = this.parseUnit('tbsp')!;
        return { quantity: this.fromMl(ml, tbspUnit), unit: tbspUnit };
      }

      // 3+ tsp → use tbsp
      if (ml >= 14.787) { // 3 tsp = 1 tbsp
        const tbspUnit = this.parseUnit('tbsp')!;
        return { quantity: this.fromMl(ml, tbspUnit), unit: tbspUnit };
      }

      // < 1 tbsp → use tsp
      const tspUnit = this.parseUnit('tsp')!;
      return { quantity: this.fromMl(ml, tspUnit), unit: tspUnit };
    }

    // Metric system preferences
    if (this.region === 'metric') {
      // >= 1L → use liters
      if (ml >= 1000) {
        const literUnit = this.parseUnit('L')!;
        return { quantity: ml / 1000, unit: literUnit };
      }

      // Use ml for everything else
      const mlUnit = this.parseUnit('ml')!;
      return { quantity: ml, unit: mlUnit };
    }

    return { quantity, unit };
  }

  /**
   * Optimize weight display to use sensible units
   */
  private optimizeWeightDisplay(quantity: number, unit: UnitInfo): { quantity: number; unit: UnitInfo } {
    const grams = this.toGrams(quantity, unit);

    if (this.region === 'US') {
      // >= 16 oz → use pounds
      if (grams >= 453.592) { // 1 lb
        const lbUnit = this.parseUnit('lb')!;
        return { quantity: this.fromGrams(grams, lbUnit), unit: lbUnit };
      }

      // Use ounces
      const ozUnit = this.parseUnit('oz')!;
      return { quantity: this.fromGrams(grams, ozUnit), unit: ozUnit };
    }

    // Metric system
    if (grams >= 1000) {
      const kgUnit = this.parseUnit('kg')!;
      return { quantity: grams / 1000, unit: kgUnit };
    }

    const gramUnit = this.parseUnit('g')!;
    return { quantity: grams, unit: gramUnit };
  }

  /**
   * Check if a number is a "nice" fraction (1/4, 1/3, 1/2, 2/3, 3/4, etc.)
   * Only includes fractions commonly used in cooking
   */
  private isNiceFraction(value: number): boolean {
    const commonFractions = [
      0.25,  // 1/4
      0.333, // 1/3
      0.5,   // 1/2
      0.667, // 2/3
      0.75,  // 3/4
      1,     // 1
      1.25,  // 1 1/4
      1.33,  // 1 1/3
      1.5,   // 1 1/2
      1.67,  // 1 2/3
      1.75,  // 1 3/4
      2,     // 2
      2.25,  // 2 1/4
      2.5,   // 2 1/2
      2.75,  // 2 3/4
      3,     // 3
      3.5,   // 3 1/2
      4      // 4
    ];

    const tolerance = 0.02;
    return commonFractions.some(frac => Math.abs(value - frac) <= tolerance);
  }

  /**
   * Set the region for regional unit variations
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
   * Get all units of a specific type
   */
  getUnitsByType(type: UnitType): UnitDefinition[] {
    return Array.from(this.units.values()).filter(u => u.type === type);
  }

  /**
   * Get unit definition by canonical name
   */
  getUnit(canonical: string): UnitDefinition | undefined {
    return this.units.get(canonical.toLowerCase());
  }
}

// Export singleton instance
export const unitConverter = new UnitConverter();

// Re-export types for external use
export type { UnitInfo, UnitDefinition, UnitType, UnitSystem, Region } from '../types';

/**
 * Ingredient Consolidation Engine
 *
 * Core algorithm: Parse → Normalize → Group → Sum
 *
 * Takes ingredient strings from multiple recipes and:
 * 1. Parses each ingredient line
 * 2. Normalizes to canonical forms
 * 3. Groups by canonical ingredient
 * 4. Consolidates quantities with unit conversion
 * 5. Detects conflicts (incompatible units)
 * 6. Tracks which recipes contributed what
 */

import { IngredientParser, ParsedIngredient } from '../parser';
import { UnitConverter, UnitInfo } from '../units';
import { ingredientDatabase } from '../database/IngredientDatabase';

export interface ConsolidatedIngredient {
  canonical: string;
  displayName: string;
  category: string;
  totalQuantity: number | null;
  unit: UnitInfo | null;
  preparations: string[];
  modifiers: string[];
  recipes: string[];
  contributions: IngredientContribution[];
  hasConflict: boolean;
  conflictReason?: string;
  confidence: number;
}

export interface IngredientContribution {
  recipeId: string;
  recipeName: string;
  original: string;
  quantity: number | null;
  unit: UnitInfo | null;
  preparation: string[];
}

export interface RecipeInput {
  id: string;
  name: string;
  ingredientLines: string[];
  servings?: number;
}

export interface ConsolidationResult {
  ingredients: ConsolidatedIngredient[];
  summary: {
    totalIngredients: number;
    totalRecipes: number;
    conflictCount: number;
    averageConfidence: number;
  };
  warnings: string[];
}

export interface ConsolidationOptions {
  preferredUnit?: 'volume' | 'weight' | 'count';
  convertToMetric?: boolean;
  combinePreparations?: boolean;
  minConfidenceThreshold?: number;
}

export class ConsolidationEngine {
  private parser: IngredientParser;
  private unitConverter: UnitConverter;

  constructor() {
    this.parser = new IngredientParser();
    this.unitConverter = new UnitConverter();
  }

  /**
   * Consolidate ingredients from multiple recipes
   */
  consolidate(
    recipes: RecipeInput[],
    options: ConsolidationOptions = {}
  ): ConsolidationResult {
    const {
      preferredUnit,
      convertToMetric = false,
      combinePreparations = true,
      minConfidenceThreshold = 0.7,
    } = options;

    // Step 1: Parse all ingredient lines
    const parsed = this.parseAllIngredients(recipes);

    // Step 2: Filter low confidence
    const filtered = parsed.filter(p => p.parsed.confidence >= minConfidenceThreshold);
    const lowConfidenceWarnings = parsed
      .filter(p => p.parsed.confidence < minConfidenceThreshold)
      .map(p => `Low confidence (${(p.parsed.confidence * 100).toFixed(0)}%): "${p.original}"`);

    // Step 3: Group by canonical ingredient
    const grouped = this.groupByCanonical(filtered);

    // Step 4: Consolidate each group
    const consolidated: ConsolidatedIngredient[] = [];
    for (const [canonical, group] of grouped.entries()) {
      const result = this.consolidateGroup(
        canonical,
        group,
        { preferredUnit, convertToMetric, combinePreparations }
      );
      consolidated.push(result);
    }

    // Step 5: Sort by category and name
    consolidated.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.canonical.localeCompare(b.canonical);
    });

    // Step 6: Generate summary
    const conflictCount = consolidated.filter(c => c.hasConflict).length;
    const averageConfidence = consolidated.reduce((sum, c) => sum + c.confidence, 0) / consolidated.length;

    return {
      ingredients: consolidated,
      summary: {
        totalIngredients: consolidated.length,
        totalRecipes: recipes.length,
        conflictCount,
        averageConfidence,
      },
      warnings: [
        ...lowConfidenceWarnings,
        ...this.generateConflictWarnings(consolidated),
      ],
    };
  }

  /**
   * Parse all ingredient lines from all recipes
   */
  private parseAllIngredients(
    recipes: RecipeInput[]
  ): Array<{ recipeId: string; recipeName: string; original: string; parsed: ParsedIngredient }> {
    const results: Array<{ recipeId: string; recipeName: string; original: string; parsed: ParsedIngredient }> = [];

    for (const recipe of recipes) {
      for (const line of recipe.ingredientLines) {
        const parsed = this.parser.parse(line);
        results.push({
          recipeId: recipe.id,
          recipeName: recipe.name,
          original: line,
          parsed,
        });
      }
    }

    return results;
  }

  /**
   * Group parsed ingredients by canonical name
   */
  private groupByCanonical(
    parsed: Array<{ recipeId: string; recipeName: string; original: string; parsed: ParsedIngredient }>
  ): Map<string, typeof parsed> {
    const grouped = new Map<string, typeof parsed>();

    for (const item of parsed) {
      const canonical = item.parsed.ingredient.canonical;
      if (!grouped.has(canonical)) {
        grouped.set(canonical, []);
      }
      grouped.get(canonical)!.push(item);
    }

    return grouped;
  }

  /**
   * Consolidate a group of ingredients with the same canonical name
   */
  private consolidateGroup(
    canonical: string,
    group: Array<{ recipeId: string; recipeName: string; original: string; parsed: ParsedIngredient }>,
    options: { preferredUnit?: string; convertToMetric?: boolean; combinePreparations?: boolean }
  ): ConsolidatedIngredient {
    const first = group[0].parsed;

    // Look up ingredient in database to get displayName
    const dbIngredient = ingredientDatabase.getByCanonical(canonical);
    const displayName = dbIngredient?.displayName || first.ingredient.canonical;
    const category = dbIngredient?.category || first.ingredient.category;

    // Build contributions
    const contributions: IngredientContribution[] = group.map(item => ({
      recipeId: item.recipeId,
      recipeName: item.recipeName,
      original: item.original,
      quantity: item.parsed.quantity?.value ?? null,
      unit: item.parsed.unit,
      preparation: item.parsed.preparation,
    }));

    // Collect unique preparations and modifiers
    const preparations = options.combinePreparations
      ? Array.from(new Set(group.flatMap(g => g.parsed.preparation)))
      : group[0].parsed.preparation;

    const modifiers = Array.from(new Set(group.flatMap(g => g.parsed.modifiers)));

    // Collect unique recipe IDs and names
    const recipes = Array.from(new Set(group.map(g => g.recipeName)));

    // Try to consolidate quantities
    const { totalQuantity, unit, hasConflict, conflictReason } = this.sumQuantities(
      contributions,
      options,
      canonical
    );

    // Calculate average confidence
    const confidence = group.reduce((sum, g) => sum + g.parsed.confidence, 0) / group.length;

    return {
      canonical,
      displayName,
      category,
      totalQuantity,
      unit,
      preparations,
      modifiers,
      recipes,
      contributions,
      hasConflict,
      conflictReason,
      confidence,
    };
  }

  /**
   * Sum quantities across contributions with unit conversion
   */
  private sumQuantities(
    contributions: IngredientContribution[],
    options: { preferredUnit?: string; convertToMetric?: boolean },
    canonical?: string
  ): {
    totalQuantity: number | null;
    unit: UnitInfo | null;
    hasConflict: boolean;
    conflictReason?: string;
  } {
    // Filter out "to taste" or null quantities
    const withQuantity = contributions.filter(c => c.quantity !== null && c.quantity > 0);

    if (withQuantity.length === 0) {
      return {
        totalQuantity: null,
        unit: null,
        hasConflict: false,
      };
    }

    // Group by unit type
    const byUnitType = new Map<string, typeof withQuantity>();
    for (const contrib of withQuantity) {
      const unitType = contrib.unit?.type || 'none';
      if (!byUnitType.has(unitType)) {
        byUnitType.set(unitType, []);
      }
      byUnitType.get(unitType)!.push(contrib);
    }

    // If multiple unit types, we have a conflict
    if (byUnitType.size > 1) {
      const types = Array.from(byUnitType.keys()).join(', ');
      return {
        totalQuantity: null,
        unit: null,
        hasConflict: true,
        conflictReason: `Cannot combine different unit types: ${types}`,
      };
    }

    // All same unit type - try to convert to common unit
    const unitType = Array.from(byUnitType.keys())[0];
    const sameTypeContribs = byUnitType.get(unitType)!;

    // Find target unit (first one, or preferred if specified)
    let targetUnit = sameTypeContribs[0].unit;

    if (options.preferredUnit && unitType !== 'none') {
      // Try to find a preferred unit in the contributions
      const preferred = sameTypeContribs.find(c => c.unit?.type === options.preferredUnit);
      if (preferred?.unit) {
        targetUnit = preferred.unit;
      }
    }

    // Get ingredient density for volume ↔ weight conversion
    let density: number | undefined;
    if (canonical) {
      const dbIngredient = ingredientDatabase.getByCanonical(canonical);
      density = dbIngredient?.density ?? undefined;
    }

    // Convert all to target unit and sum
    let total = 0;
    const conversionErrors: string[] = [];

    for (const contrib of sameTypeContribs) {
      if (!contrib.unit || !targetUnit) {
        // No unit - just add quantities
        total += contrib.quantity!;
      } else if (contrib.unit.canonical === targetUnit.canonical) {
        // Same unit - add directly
        total += contrib.quantity!;
      } else {
        // Different units - try to convert
        const converted = this.unitConverter.convert(
          contrib.quantity!,
          contrib.unit,
          targetUnit,
          density
        );

        if (converted !== null) {
          total += converted;
        } else {
          conversionErrors.push(
            `${contrib.quantity} ${contrib.unit.canonical} → ${targetUnit.canonical}`
          );
        }
      }
    }

    if (conversionErrors.length > 0) {
      return {
        totalQuantity: null,
        unit: null,
        hasConflict: true,
        conflictReason: `Unit conversion failed: ${conversionErrors.join(', ')}`,
      };
    }

    return {
      totalQuantity: Math.round(total * 100) / 100, // Round to 2 decimals
      unit: targetUnit,
      hasConflict: false,
    };
  }

  /**
   * Generate conflict warnings
   */
  private generateConflictWarnings(ingredients: ConsolidatedIngredient[]): string[] {
    return ingredients
      .filter(ing => ing.hasConflict)
      .map(ing => `${ing.displayName}: ${ing.conflictReason}`);
  }

  /**
   * Get ingredients by category
   */
  getByCategory(
    result: ConsolidationResult,
    category: string
  ): ConsolidatedIngredient[] {
    return result.ingredients.filter(ing => ing.category === category);
  }

  /**
   * Get all categories in result
   */
  getCategories(result: ConsolidationResult): string[] {
    return Array.from(new Set(result.ingredients.map(ing => ing.category)));
  }

  /**
   * Format consolidated ingredient for display
   */
  formatIngredient(ingredient: ConsolidatedIngredient): string {
    const parts: string[] = [];

    // Quantity and unit
    if (ingredient.totalQuantity !== null) {
      parts.push(ingredient.totalQuantity.toString());
      if (ingredient.unit) {
        parts.push(ingredient.unit.canonical);
      }
    }

    // Ingredient name
    parts.push(ingredient.displayName);

    // Preparation (if any)
    if (ingredient.preparations.length > 0) {
      parts.push(`(${ingredient.preparations.join(', ')})`);
    }

    // Modifiers (if any)
    if (ingredient.modifiers.length > 0) {
      parts.push(`[${ingredient.modifiers.join(', ')}]`);
    }

    return parts.join(' ');
  }

  /**
   * Export consolidated list as text
   */
  exportAsText(result: ConsolidationResult, groupByCategory = true): string {
    if (!groupByCategory) {
      return result.ingredients.map(ing => {
        const marker = ing.hasConflict ? '⚠️ ' : '';
        return `${marker}${this.formatIngredient(ing)}`;
      }).join('\n');
    }

    const lines: string[] = [];
    const categories = this.getCategories(result);

    for (const category of categories) {
      lines.push(`\n## ${category.toUpperCase()}`);
      const ingredients = this.getByCategory(result, category);
      for (const ing of ingredients) {
        const marker = ing.hasConflict ? '⚠️ ' : '';
        lines.push(`${marker}${this.formatIngredient(ing)}`);
      }
    }

    return lines.join('\n');
  }
}

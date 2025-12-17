/**
 * Core type definitions for ingredient parsing and shopping list consolidation
 * These types are designed to be portable to Swift for iOS implementation
 */

// =============================================================================
// PARSED INGREDIENT
// =============================================================================

/**
 * Result of parsing a single ingredient line
 */
export interface ParsedIngredient {
  original: string;
  quantity: QuantityValue | null;
  unit: UnitInfo | null;
  ingredient: IngredientInfo;
  preparation: string[];
  modifiers: string[];
  confidence: number;
  flags: IngredientFlags;
}

// =============================================================================
// QUANTITY
// =============================================================================

/**
 * Parsed quantity value - can be exact, range, or approximate
 */
export interface QuantityValue {
  type: 'exact' | 'range' | 'approximate';
  value: number;           // Primary value (or midpoint for ranges)
  valueLow?: number;       // For ranges (e.g., "2-3" → valueLow: 2)
  valueHigh?: number;      // For ranges (e.g., "2-3" → valueHigh: 3)
  display: string;         // Human-readable: "1½", "2-3", "about 2"
}

// =============================================================================
// UNITS
// =============================================================================

/**
 * Unit information with canonical form and conversion data
 */
export interface UnitInfo {
  canonical: string;        // e.g., "tablespoon", "cup", "gram"
  original: string;         // e.g., "Tbsp", "c", "g"
  type: UnitType;
  system: UnitSystem;
  mlEquivalent?: number;    // For volume units
  gramEquivalent?: number;  // For weight units
}

export type UnitType = 'volume' | 'weight' | 'count' | 'informal' | 'other';

export type UnitSystem = 'metric' | 'imperial' | 'universal';

/**
 * Unit definition for the unit registry
 */
export interface UnitDefinition {
  canonical: string;
  type: UnitType;
  system: UnitSystem;
  abbreviations: string[];
  mlEquivalent?: number;
  gramEquivalent?: number;
  regional?: {
    US?: number;
    UK?: number;
    AU?: number;
    metric?: number;
  };
}

// =============================================================================
// INGREDIENTS
// =============================================================================

/**
 * Ingredient information after normalization
 */
export interface IngredientInfo {
  canonical: string;        // Normalized name (e.g., "all-purpose flour")
  original: string;         // As written in recipe
  category: IngredientCategory;
  subcategory?: string;
  aisleHint?: string;
  metadata: CanonicalIngredient | null;  // Full ingredient metadata
}

/**
 * Grocery categories for organization
 */
export type IngredientCategory =
  | 'produce'
  | 'dairy'
  | 'meat'
  | 'seafood'
  | 'bakery'
  | 'pantry'
  | 'spices'
  | 'condiments'
  | 'frozen'
  | 'beverages'
  | 'oils'
  | 'grains'
  | 'canned'
  | 'baking'
  | 'other';

/**
 * Full ingredient definition in database
 */
export interface CanonicalIngredient {
  id: string;
  canonical: string;
  displayName: string;
  category: IngredientCategory;
  subcategory: string;
  aisleHint: string;
  shelfLife?: ShelfLife;

  // Measurement defaults
  defaultUnit: string;
  preferredUnits: string[];

  // Density for volume/weight conversion
  density?: {
    gramsPerCup?: number;
    gramsPerTablespoon?: number;
    gramsPerTeaspoon?: number;
    source: 'usda' | 'king_arthur' | 'measured' | 'estimated';
  };

  // For count-based items
  countInfo?: {
    averageWeightGrams: number;
    typicalCount?: string;  // "1 medium"
  };

  // Variant handling
  variants: IngredientVariant[];
  variantHandling: 'combine' | 'separate' | 'annotate';

  // Parts (for eggs, citrus, etc.)
  parts?: Record<string, IngredientPart>;

  // Substitutions (future feature)
  substitutes?: string[];
}

export interface IngredientVariant {
  name: string;                  // "unsalted", "Greek", etc.
  modifiesDensity?: number;      // Multiplier if different
  notes?: string;
}

export interface IngredientPart {
  name: string;                  // "white", "yolk", "juice", "zest"
  averageWeightGrams?: number;
  averageYieldMl?: number;       // For juice
  countPer: number;              // How many per whole ingredient
}

export interface ShelfLife {
  refrigerated?: number;  // days
  frozen?: number;        // days
  pantry?: number;        // days
}

// =============================================================================
// INGREDIENT FLAGS
// =============================================================================

/**
 * Parsing flags that indicate parsing metadata
 */
export interface IngredientFlags {
  hasQuantity: boolean;
  hasUnit: boolean;
  isApproximate: boolean;
  isRange: boolean;
  needsReview: boolean;
  isInformalUnit: boolean;
  hasAmbiguity: boolean;
  // Additional flags for consolidation behavior
  optional?: boolean;
  toTaste?: boolean;
  forGarnish?: boolean;
  divided?: boolean;         // "2 eggs, divided"
  separated?: boolean;       // "2 eggs, separated"
  partialUse?: 'whites' | 'yolks' | 'juice' | 'zest' | null;
}

// =============================================================================
// SHOPPING LIST
// =============================================================================

/**
 * Complete shopping list from one or more recipes
 */
export interface ShoppingList {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  items: ShoppingListItem[];
  byAisle: Map<string, ShoppingListItem[]>;
  sourceRecipes: RecipeSummary[];
  warnings: ConsolidationWarning[];
}

/**
 * Single item on shopping list (may be aggregated from multiple recipes)
 */
export interface ShoppingListItem {
  id: string;
  displayText: string;          // "2 cups all-purpose flour"
  canonical: string;            // "all-purpose flour"
  category: IngredientCategory;
  aisle: string;

  quantity: {
    value: number;
    unit: string;
    display: string;            // "2 cups" or "3 large"
  };

  // Track sources
  sources: IngredientSource[];

  // Metadata
  isChecked: boolean;
  notes: string[];              // Prep notes, variant info
  confidence: number;
  flags: {
    hasVariants: boolean;       // "includes both salted and unsalted"
    isApproximate: boolean;     // "to taste" items
    needsReview: boolean;       // Low confidence
  };
}

export interface IngredientSource {
  recipeId: string;
  recipeName: string;
  originalText: string;
  quantity: number;
  unit: string;
}

export interface RecipeSummary {
  id: string;
  name: string;
  servings: number;
  originalServings: number;
  ingredientCount: number;
}

export interface ConsolidationWarning {
  type: 'unit_mismatch' | 'unknown_ingredient' | 'low_confidence' | 'conflict';
  message: string;
  affectedItems: string[];
  severity: 'info' | 'warning' | 'error';
}

// =============================================================================
// RECIPE INTEGRATION
// =============================================================================

export interface Recipe {
  id: string;
  name: string;
  servings: number;
  ingredients: string[];
  source?: string;
  url?: string;
  cuisine?: string;
  categories?: string[];
}

export interface RecipeIngredientInput {
  recipeId: string;
  recipeName: string;
  servingsMultiplier?: number;  // For scaling
  ingredients: string[];        // Raw ingredient lines
}

// =============================================================================
// NORMALIZATION & LOOKUP
// =============================================================================

export interface NormalizationResult {
  canonical: string;
  original: string;
  confidence: number;
  matchType: 'exact' | 'synonym' | 'fuzzy' | 'unknown';
  category: IngredientCategory;
  metadata: CanonicalIngredient | null;
}

export interface IngredientMatch {
  ingredient: string;
  score: number;
  matchType: 'exact' | 'synonym' | 'fuzzy';
}

export interface LookupResult {
  found: boolean;
  canonical: string | null;
  matchType: 'exact' | 'synonym' | 'fuzzy' | 'unknown';
  confidence: number;
  ingredient: CanonicalIngredient | null;
  suggestions?: string[];  // For unknown items
}

// =============================================================================
// CONSOLIDATION
// =============================================================================

export interface IngredientGroup {
  key: string;
  canonical: string;
  unitType: UnitType;
  items: NormalizedIngredient[];
}

export interface NormalizedIngredient {
  canonical: string;
  quantity: number;
  unit: UnitInfo;
  flags: IngredientFlags;
  variant?: string;
  preparation: string[];
  servingsMultiplier?: number;
  source: IngredientSource;
}

export interface ConsolidatedQuantity {
  value: number;
  unit: string;
  display: string;
  totalMl?: number;
  totalGrams?: number;
}

// =============================================================================
// CONFLICTS
// =============================================================================

export interface Conflict {
  type: 'unit' | 'variant' | 'preparation' | 'ambiguous';
  canonical: string;
  description: string;
  items: NormalizedIngredient[];
  resolution: 'manual' | 'separate' | 'combine' | 'choose';
  resolutionOptions?: ResolutionOption[];
}

export interface ResolutionOption {
  id: string;
  label: string;
  description: string;
  preview: string;  // What the result would look like
}

export interface Resolution {
  action: 'convert' | 'separate' | 'combine' | 'standardConvert';
  targetUnit?: string;
  density?: number;
  conversion?: any;
}

// =============================================================================
// DATABASE
// =============================================================================

export interface IngredientDatabase {
  version: string;
  lastUpdated: string;
  ingredients: CanonicalIngredient[];
  synonyms: SynonymMapping[];
  densities: DensityTable[];
  conversions: SpecialConversion[];
}

export interface SynonymMapping {
  canonical: string;
  synonyms: Array<{
    term: string;
    confidence: number;
    region?: 'US' | 'UK' | 'AU';
  }>;
}

export interface DensityTable {
  ingredient: string;
  gramsPerCup: number;
  gramsPerTablespoon?: number;
  gramsPerTeaspoon?: number;
  source: string;
}

export interface SpecialConversion {
  from: string;
  to: string;
  factor: number;
  notes?: string;
}

// =============================================================================
// USER FEEDBACK
// =============================================================================

export interface UserCorrection {
  id: string;
  original: string;
  correctedParsed: ParsedIngredient;
  timestamp: Date;
  applied: boolean;  // Whether it's been incorporated into training
}

export interface ParseAnalytics {
  totalParses: number;
  successRate: number;
  averageConfidence: number;
  commonFailures: Array<{ input: string; count: number }>;
  lowConfidencePatterns: string[];
}

// =============================================================================
// EXPORT TYPES
// =============================================================================

export type Region = 'US' | 'UK' | 'AU' | 'metric';

export interface ConsolidatorOptions {
  region: Region;
  preferMetric: boolean;
  combineVariants: boolean;
  roundToMeasurable: boolean;
  optimizeDisplayUnits: boolean;
}

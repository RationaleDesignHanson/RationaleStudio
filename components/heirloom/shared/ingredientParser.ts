// Ingredient Parser
// Extracts quantity, unit, and ingredient name from recipe ingredient strings

export interface ParsedIngredient {
  original: string;
  quantity: number;
  unit: string;
  ingredient: string;
  notes?: string; // e.g., "minced", "diced", "to taste"
  category: IngredientCategory;
}

export type IngredientCategory =
  | 'produce'
  | 'meat'
  | 'dairy'
  | 'pantry'
  | 'spices'
  | 'baking'
  | 'frozen'
  | 'other';

// ========== UNITS MAPPING ==========

const VOLUME_UNITS = [
  'cup', 'cups', 'c',
  'tablespoon', 'tablespoons', 'tbsp', 'tbs', 'T',
  'teaspoon', 'teaspoons', 'tsp', 't',
  'fluid ounce', 'fluid ounces', 'fl oz',
  'pint', 'pints', 'pt',
  'quart', 'quarts', 'qt',
  'gallon', 'gallons', 'gal',
  'milliliter', 'milliliters', 'ml',
  'liter', 'liters', 'l',
];

const WEIGHT_UNITS = [
  'pound', 'pounds', 'lb', 'lbs',
  'ounce', 'ounces', 'oz',
  'gram', 'grams', 'g',
  'kilogram', 'kilograms', 'kg',
];

const COUNT_UNITS = [
  'clove', 'cloves',
  'can', 'cans',
  'package', 'packages', 'pkg',
  'bunch', 'bunches',
  'head', 'heads',
  'stalk', 'stalks',
  'piece', 'pieces',
  'slice', 'slices',
  'whole',
  'large', 'medium', 'small',
];

const ALL_UNITS = [...VOLUME_UNITS, ...WEIGHT_UNITS, ...COUNT_UNITS];

// Normalize units to standard form
const UNIT_NORMALIZATION: Record<string, string> = {
  'cups': 'cup',
  'c': 'cup',
  'tablespoons': 'tbsp',
  'tbs': 'tbsp',
  'T': 'tbsp',
  'teaspoons': 'tsp',
  't': 'tsp',
  'pounds': 'lb',
  'lbs': 'lb',
  'ounces': 'oz',
  'grams': 'g',
  'kilograms': 'kg',
  'cloves': 'clove',
  'cans': 'can',
  'packages': 'package',
  'pkg': 'package',
};

// ========== UNIT CONVERSION ==========

// Convert volume units to teaspoons (base unit for volume conversion)
const VOLUME_TO_TSP: Record<string, number> = {
  'tsp': 1,
  'tbsp': 3,
  'cup': 48,
  'fl oz': 6,
  'pt': 96,
  'qt': 192,
  'gal': 768,
  'ml': 0.202884, // 1 ml ≈ 0.202884 tsp
  'l': 202.884,   // 1 liter ≈ 202.884 tsp
};

// Normalized volume unit names for conversion
const NORMALIZED_VOLUME_UNITS = new Set(['tsp', 'tbsp', 'cup', 'fl oz', 'pt', 'qt', 'gal', 'ml', 'l']);

/**
 * Check if a unit is a volume unit that can be converted
 */
export function isConvertibleVolume(unit: string): boolean {
  const normalized = UNIT_NORMALIZATION[unit] || unit;
  return NORMALIZED_VOLUME_UNITS.has(normalized);
}

/**
 * Convert a quantity from one volume unit to another
 */
export function convertVolume(quantity: number, fromUnit: string, toUnit: string): number {
  const normalizedFrom = UNIT_NORMALIZATION[fromUnit] || fromUnit;
  const normalizedTo = UNIT_NORMALIZATION[toUnit] || toUnit;

  // If same unit, no conversion needed
  if (normalizedFrom === normalizedTo) {
    return quantity;
  }

  // Convert to base unit (tsp), then to target unit
  const inTsp = quantity * (VOLUME_TO_TSP[normalizedFrom] || 0);
  const result = inTsp / (VOLUME_TO_TSP[normalizedTo] || 1);

  return result;
}

/**
 * Determine the best display unit for a quantity in teaspoons
 * Prefers larger units when appropriate for readability
 */
export function selectBestVolumeUnit(quantityInTsp: number): { quantity: number; unit: string } {
  // Order matters: check larger units first
  const unitPreferences: { unit: string; minTsp: number }[] = [
    { unit: 'cup', minTsp: 24 },    // Use cups for 0.5+ cups (24+ tsp)
    { unit: 'tbsp', minTsp: 1.5 },  // Use tbsp for 0.5+ tbsp (1.5+ tsp)
    { unit: 'tsp', minTsp: 0 },     // Default to tsp for small amounts
  ];

  for (const { unit, minTsp } of unitPreferences) {
    const converted = quantityInTsp / VOLUME_TO_TSP[unit];
    if (quantityInTsp >= minTsp) {
      return { quantity: converted, unit };
    }
  }

  // Fallback to tsp
  return { quantity: quantityInTsp, unit: 'tsp' };
}

// ========== CATEGORY DETECTION ==========

const CATEGORY_KEYWORDS: Record<IngredientCategory, string[]> = {
  produce: [
    'onion', 'garlic', 'tomato', 'carrot', 'celery', 'pepper', 'lettuce',
    'spinach', 'broccoli', 'cauliflower', 'potato', 'lemon', 'lime', 'apple',
    'banana', 'avocado', 'cucumber', 'zucchini', 'mushroom', 'parsley', 'cilantro',
    'basil', 'thyme', 'rosemary', 'herb', 'salad', 'greens',
  ],
  meat: [
    'chicken', 'beef', 'pork', 'turkey', 'fish', 'salmon', 'tuna', 'shrimp',
    'bacon', 'sausage', 'ham', 'lamb', 'ground', 'steak', 'chops',
  ],
  dairy: [
    'milk', 'cream', 'butter', 'cheese', 'yogurt', 'sour cream', 'mozzarella',
    'parmesan', 'cheddar', 'ricotta', 'egg', 'eggs',
  ],
  pantry: [
    'pasta', 'rice', 'beans', 'lentils', 'quinoa', 'oats', 'cereal',
    'bread', 'crackers', 'chips', 'oil', 'olive oil', 'vegetable oil',
    'vinegar', 'soy sauce', 'broth', 'stock', 'tomato paste', 'tomato sauce',
    'crushed tomatoes', 'diced tomatoes', 'noodles', 'lasagna',
  ],
  spices: [
    'salt', 'pepper', 'black pepper', 'paprika', 'cumin', 'chili', 'oregano',
    'basil', 'thyme', 'rosemary', 'cinnamon', 'nutmeg', 'ginger', 'garlic powder',
    'onion powder', 'cayenne', 'turmeric', 'curry',
  ],
  baking: [
    'flour', 'sugar', 'brown sugar', 'powdered sugar', 'baking soda',
    'baking powder', 'yeast', 'cornstarch', 'cocoa', 'chocolate',
    'chocolate chips', 'vanilla', 'vanilla extract', 'almond extract',
  ],
  frozen: [
    'frozen', 'ice cream', 'peas', 'corn',
  ],
  other: [],
};

// ========== PARSING FUNCTIONS ==========

/**
 * Parse a single ingredient string into structured data
 */
export function parseIngredient(ingredientString: string): ParsedIngredient {
  const original = ingredientString.trim();
  let remaining = original.toLowerCase();

  // Extract quantity (handles fractions like 1/2, 2 1/4, etc.)
  const quantityMatch = remaining.match(/^(\d+(?:\/\d+)?|\d+\s+\d+\/\d+)\s*/);
  let quantity = 1;

  if (quantityMatch) {
    const qtyStr = quantityMatch[1].trim();
    quantity = parseFraction(qtyStr);
    remaining = remaining.substring(quantityMatch[0].length);
  }

  // Extract unit
  let unit = '';
  const unitMatch = ALL_UNITS.find(u => {
    const regex = new RegExp(`^${u}\\s+`, 'i');
    return regex.test(remaining);
  });

  if (unitMatch) {
    unit = UNIT_NORMALIZATION[unitMatch] || unitMatch;
    remaining = remaining.replace(new RegExp(`^${unitMatch}\\s+`, 'i'), '');
  }

  // Extract notes (anything after comma)
  let notes: string | undefined;
  const commaIndex = remaining.indexOf(',');
  if (commaIndex > -1) {
    notes = remaining.substring(commaIndex + 1).trim();
    remaining = remaining.substring(0, commaIndex).trim();
  }

  // Remaining is the ingredient name
  const ingredient = remaining.trim();

  // Detect category
  const category = detectCategory(ingredient);

  return {
    original,
    quantity,
    unit,
    ingredient,
    notes,
    category,
  };
}

/**
 * Parse multiple ingredient strings
 */
export function parseIngredients(ingredientStrings: string[]): ParsedIngredient[] {
  return ingredientStrings.map(parseIngredient);
}

/**
 * Convert fraction string to decimal
 * Handles: "1/2", "2 1/4", "3", etc.
 */
function parseFraction(str: string): number {
  str = str.trim();

  // Handle mixed fractions (e.g., "2 1/4")
  if (str.includes(' ')) {
    const parts = str.split(' ');
    const whole = parseInt(parts[0], 10);
    const frac = parseFraction(parts[1]);
    return whole + frac;
  }

  // Handle simple fractions (e.g., "1/2")
  if (str.includes('/')) {
    const [num, den] = str.split('/').map(s => parseInt(s, 10));
    return num / den;
  }

  // Handle whole numbers
  return parseInt(str, 10);
}

/**
 * Detect ingredient category based on keywords
 */
function detectCategory(ingredient: string): IngredientCategory {
  const lower = ingredient.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return category as IngredientCategory;
      }
    }
  }

  return 'other';
}

// ========== AGGREGATION ==========

export interface AggregatedIngredient extends ParsedIngredient {
  fromRecipes: string[]; // Recipe names
  totalQuantity: number;
}

/**
 * Aggregate ingredients from multiple recipes
 * Combines ingredients with same name and compatible units
 */
export function aggregateIngredients(
  recipeIngredients: { recipeName: string; ingredients: ParsedIngredient[] }[]
): AggregatedIngredient[] {
  const aggregated = new Map<string, AggregatedIngredient>();

  for (const { recipeName, ingredients } of recipeIngredients) {
    for (const ing of ingredients) {
      // Create a key for grouping (ingredient name + unit)
      const key = `${ing.ingredient.toLowerCase()}::${ing.unit}`;

      if (aggregated.has(key)) {
        // Add to existing
        const existing = aggregated.get(key)!;
        existing.totalQuantity += ing.quantity;
        existing.fromRecipes.push(recipeName);
      } else {
        // Create new aggregated ingredient
        aggregated.set(key, {
          ...ing,
          fromRecipes: [recipeName],
          totalQuantity: ing.quantity,
        });
      }
    }
  }

  // Convert to array and sort by category, then name
  const result = Array.from(aggregated.values());
  result.sort((a, b) => {
    if (a.category !== b.category) {
      return CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category);
    }
    return a.ingredient.localeCompare(b.ingredient);
  });

  return result;
}

// Category order for shopping list
const CATEGORY_ORDER: IngredientCategory[] = [
  'produce',
  'meat',
  'dairy',
  'pantry',
  'baking',
  'spices',
  'frozen',
  'other',
];

// ========== FORMATTING ==========

/**
 * Format quantity for display (converts decimals to fractions)
 */
export function formatQuantity(quantity: number): string {
  // Handle whole numbers
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  }

  // Handle common fractions
  const fractions: [number, string][] = [
    [0.125, '⅛'],
    [0.25, '¼'],
    [0.333, '⅓'],
    [0.375, '⅜'],
    [0.5, '½'],
    [0.625, '⅝'],
    [0.666, '⅔'],
    [0.75, '¾'],
    [0.875, '⅞'],
  ];

  const whole = Math.floor(quantity);
  const decimal = quantity - whole;

  // Find closest fraction
  for (const [value, symbol] of fractions) {
    if (Math.abs(decimal - value) < 0.01) {
      return whole > 0 ? `${whole} ${symbol}` : symbol;
    }
  }

  // Default to decimal
  return quantity.toFixed(2);
}

/**
 * Format a parsed ingredient for display
 */
export function formatIngredient(ing: ParsedIngredient | AggregatedIngredient): string {
  const qty = formatQuantity(ing.quantity);
  const unit = ing.unit ? ` ${ing.unit}` : '';
  const notes = ing.notes ? `, ${ing.notes}` : '';
  return `${qty}${unit} ${ing.ingredient}${notes}`;
}

// ========== CATEGORY DISPLAY ==========

export const CATEGORY_LABELS: Record<IngredientCategory, string> = {
  produce: 'Produce',
  meat: 'Meat & Seafood',
  dairy: 'Dairy & Eggs',
  pantry: 'Pantry',
  baking: 'Baking',
  spices: 'Spices & Seasonings',
  frozen: 'Frozen',
  other: 'Other',
};

export const CATEGORY_ICONS: Record<IngredientCategory, string> = {
  produce: '🥬',
  meat: '🥩',
  dairy: '🥛',
  pantry: '🥫',
  baking: '🧁',
  spices: '🧂',
  frozen: '❄️',
  other: '🛒',
};

export const CATEGORY_AISLE_HINTS: Record<IngredientCategory, string> = {
  produce: 'Usually found along the perimeter',
  meat: 'Butcher counter or refrigerated section',
  dairy: 'Refrigerated section near produce',
  pantry: 'Center aisles',
  baking: 'Baking aisle (usually near flour)',
  spices: 'Spice aisle',
  frozen: 'Frozen foods section',
  other: 'Various aisles',
};

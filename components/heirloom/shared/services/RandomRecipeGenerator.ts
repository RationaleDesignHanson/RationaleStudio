/**
 * Random Recipe Generator
 *
 * Generates wacky, random recipes to stress test the parsing system
 */

import { IngredientDatabase } from './IngredientDatabase';

export interface RandomRecipeOptions {
  ingredientCount?: number;
  includeWeirdQuantities?: boolean;
  includeNoQuantity?: boolean;
  includeNoUnit?: boolean;
  includeModifiers?: boolean;
  includePreparations?: boolean;
}

export class RandomRecipeGenerator {
  private db: IngredientDatabase;

  // Unit categories for smart selection
  private volumeUnits: string[] = [
    'cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp', 'teaspoon', 'teaspoons', 'tsp',
    'fluid ounce', 'fluid ounces', 'fl oz', 'pint', 'pints', 'quart', 'quarts',
    'gallon', 'gallons', 'liter', 'liters', 'ml', 'milliliter', 'milliliters'
  ];

  private weightUnits: string[] = [
    'pound', 'pounds', 'lb', 'lbs', 'ounce', 'ounces', 'oz',
    'gram', 'grams', 'g', 'kilogram', 'kilograms', 'kg'
  ];

  private countUnits: string[] = [
    'piece', 'pieces', 'slice', 'slices', 'clove', 'cloves',
    'can', 'cans', 'package', 'packages', 'bunch', 'bunches',
    'head', 'heads', 'stalk', 'stalks', 'sprig', 'sprigs'
  ];

  private containerUnits: string[] = [
    'box', 'bag', 'jar', 'can', 'cans', 'package', 'packages'
  ];

  private seasoningUnits: string[] = [
    'pinch', 'dash', 'teaspoon', 'teaspoons', 'tsp', 'tablespoon', 'tablespoons', 'tbsp'
  ];

  // Combined for backward compatibility
  private units: string[] = [
    ...this.volumeUnits,
    ...this.weightUnits,
    ...this.countUnits,
    ...this.containerUnits
  ];

  private modifiers: string[] = [
    'fresh', 'dried', 'frozen', 'canned', 'organic', 'raw',
    'whole', 'large', 'small', 'medium', 'extra-large',
    'ripe', 'unripe', 'green', 'red', 'yellow',
    'sweet', 'spicy', 'mild', 'hot', 'cold'
  ];

  private preparations: string[] = [
    'chopped', 'diced', 'minced', 'sliced', 'julienned',
    'grated', 'shredded', 'crushed', 'pressed', 'mashed',
    'peeled', 'seeded', 'cored', 'halved', 'quartered',
    'beaten', 'whisked', 'sifted', 'melted', 'softened',
    'room temperature', 'chilled', 'thawed', 'drained', 'rinsed'
  ];

  constructor() {
    this.db = new IngredientDatabase();
  }

  /**
   * Generate a random wacky recipe
   */
  generateRecipe(options: RandomRecipeOptions = {}): {
    name: string;
    ingredients: string[];
  } {
    const {
      ingredientCount = this.randomInt(3, 15),
      includeWeirdQuantities = true,
      includeNoQuantity = true,
      includeNoUnit = true,
      includeModifiers = true,
      includePreparations = true,
    } = options;

    const ingredients: string[] = [];
    const allIngredients = this.db.getAllIngredients();
    const ingredientNames = allIngredients.map(ing => ing.displayName || ing.canonical).filter(Boolean);

    if (ingredientNames.length === 0) {
      throw new Error('No ingredients available in database');
    }

    const usedIngredients: string[] = [];
    for (let i = 0; i < ingredientCount; i++) {
      const ingredientName = this.pickRandom(ingredientNames);
      usedIngredients.push(ingredientName);
      const line = this.generateIngredientLine(ingredientName, {
        includeWeirdQuantities,
        includeNoQuantity,
        includeNoUnit,
        includeModifiers,
        includePreparations,
      });
      ingredients.push(line);
    }

    const name = this.generateWackyRecipeName(usedIngredients);

    return { name, ingredients };
  }

  /**
   * Generate multiple random recipes
   */
  generateMultipleRecipes(count: number, options: RandomRecipeOptions = {}): Array<{
    name: string;
    ingredients: string[];
  }> {
    const recipes = [];
    for (let i = 0; i < count; i++) {
      recipes.push(this.generateRecipe(options));
    }
    return recipes;
  }

  /**
   * Detect ingredient category for smart unit/modifier/preparation selection
   */
  private getIngredientCategory(ingredientName: string): 'seasoning' | 'liquid' | 'produce' | 'protein' | 'grain' | 'dairy' | 'other' {
    const lower = ingredientName.toLowerCase();

    // Seasonings/spices/powders
    const seasonings = ['salt', 'pepper', 'paprika', 'cumin', 'cinnamon', 'nutmeg', 'oregano',
                        'basil', 'thyme', 'rosemary', 'sage', 'bay leaf', 'cayenne', 'chili powder',
                        'ginger', 'garlic powder', 'turmeric', 'coriander', 'cardamom', 'clove', 'vanilla',
                        'parsley', 'dill', 'cilantro', 'mint', 'tarragon', 'fennel', 'anise',
                        'cornstarch', 'baking powder', 'baking soda', 'yeast', 'extract', 'cocoa'];
    if (seasonings.some(s => lower.includes(s))) {
      return 'seasoning';
    }

    // Liquids
    const liquids = ['milk', 'water', 'oil', 'vinegar', 'juice', 'broth', 'stock', 'wine',
                     'cream', 'sauce', 'syrup', 'honey'];
    if (liquids.some(l => lower.includes(l))) {
      return 'liquid';
    }

    // Proteins
    const proteins = ['chicken', 'beef', 'pork', 'fish', 'salmon', 'shrimp', 'turkey', 'lamb',
                     'steak', 'chop', 'cutlet', 'fillet', 'breast', 'thigh', 'drumstick', 'bacon',
                     'sausage', 'ham', 'tofu', 'tempeh'];
    if (proteins.some(p => lower.includes(p))) {
      return 'protein';
    }

    // Produce
    const produce = ['apple', 'orange', 'lemon', 'lime', 'onion', 'potato', 'tomato',
                     'avocado', 'banana', 'egg', 'carrot', 'celery', 'bell pepper', 'pepper',
                     'lettuce', 'spinach', 'kale', 'broccoli', 'cauliflower', 'zucchini',
                     'cucumber', 'garlic', 'mushroom', 'berry', 'strawberry', 'blueberry'];
    if (produce.some(p => lower.includes(p))) {
      return 'produce';
    }

    // Grains/flours
    const grainsFlours = ['flour', 'rice', 'pasta', 'oats', 'quinoa', 'sugar', 'bread', 'tortilla',
                          'noodle', 'couscous', 'barley'];
    if (grainsFlours.some(g => lower.includes(g))) {
      return 'grain';
    }

    // Dairy
    const dairy = ['cheese', 'butter', 'yogurt', 'sour cream', 'cream cheese'];
    if (dairy.some(d => lower.includes(d))) {
      return 'dairy';
    }

    return 'other';
  }

  /**
   * Select appropriate unit based on ingredient database category
   */
  private getAppropriateUnit(ingredientName: string, ingredientRecord?: any): string {
    const category = ingredientRecord?.category?.toLowerCase() || 'other';
    const subcategory = ingredientRecord?.subcategory?.toLowerCase() || '';
    const note = ingredientRecord?.note?.toLowerCase() || '';

    // Special case: Eggs and other count-based ingredients should have no unit
    if (subcategory === 'eggs' || note.includes('count-based')) {
      return '';
    }

    switch (category) {
      case 'spices':
      case 'baking':
        // Small measurements for spices and baking ingredients
        return this.pickRandom(['teaspoon', 'teaspoons', 'tsp', 'tablespoon', 'tablespoons', 'tbsp', 'pinch', 'dash', 'cup', 'cups']);

      case 'condiments':
      case 'oils':
        // Liquids use volume
        return this.pickRandom(['cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp', 'teaspoon', 'teaspoons', 'tsp',
                                'fluid ounce', 'fluid ounces', 'fl oz', 'ml', 'milliliter', 'milliliters']);

      case 'meat':
      case 'seafood':
        // Proteins use weight
        return this.pickRandom(['pound', 'pounds', 'lb', 'lbs', 'ounce', 'ounces', 'oz']);

      case 'produce':
        // Produce typically counted or by piece
        return this.pickRandom(['piece', 'pieces', 'slice', 'slices', 'cup', 'cups']);

      case 'grains':
      case 'pantry':
        // Grains and pantry items use cups/weight
        return this.pickRandom(['cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp',
                               'ounce', 'ounces', 'oz']);

      case 'dairy':
        // Dairy uses volume or weight
        if (subcategory === 'cheese') {
          return this.pickRandom(['cup', 'cups', 'ounce', 'ounces', 'oz', 'slice', 'slices']);
        }
        return this.pickRandom(['cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp',
                               'ounce', 'ounces', 'oz']);

      case 'bakery':
        // Bakery items like bread
        return this.pickRandom(['slice', 'slices', 'piece', 'pieces']);

      default:
        // Default: reasonable mix
        return this.pickRandom(['cup', 'cups', 'tablespoon', 'tablespoons', 'piece', 'pieces']);
    }
  }

  /**
   * Get appropriate modifiers for ingredient type
   */
  private getAppropriateModifiers(ingredientName: string): string[] {
    const category = this.getIngredientCategory(ingredientName);

    switch (category) {
      case 'seasoning':
        // Seasonings can be: dried, fresh (herbs), whole, ground
        return ['dried', 'fresh', 'whole', 'ground'];

      case 'liquid':
        // Liquids can be: cold, warm, hot, fresh
        return ['cold', 'hot', 'warm', 'fresh'];

      case 'produce':
        // Produce can be: fresh, frozen, organic, ripe, large, small, etc.
        return ['fresh', 'frozen', 'organic', 'ripe', 'unripe', 'large', 'small', 'medium',
                'green', 'red', 'yellow', 'sweet'];

      case 'protein':
        // Proteins can be: raw, cooked, frozen, fresh, boneless, skinless
        return ['raw', 'cooked', 'frozen', 'fresh', 'boneless', 'skinless', 'large', 'small'];

      case 'grain':
        // Grains can be: dried, cooked, uncooked, whole
        return ['dried', 'cooked', 'uncooked', 'whole'];

      case 'dairy':
        // Dairy can be: cold, shredded, softened, melted, grated
        return ['cold', 'softened', 'shredded', 'grated', 'melted', 'fresh'];

      default:
        return ['fresh', 'organic', 'whole'];
    }
  }

  /**
   * Get appropriate preparations for ingredient type
   */
  private getAppropriatePreparations(ingredientName: string): string[] {
    const category = this.getIngredientCategory(ingredientName);

    switch (category) {
      case 'seasoning':
        // Seasonings: sifted, ground, crushed
        return ['sifted', 'ground', 'crushed'];

      case 'liquid':
        // Liquids: heated, chilled, room temperature, whisked
        return ['heated', 'chilled', 'room temperature', 'whisked'];

      case 'produce':
        // Produce gets cutting preparations
        return ['chopped', 'diced', 'minced', 'sliced', 'julienned', 'grated', 'shredded',
                'peeled', 'seeded', 'cored', 'halved', 'quartered'];

      case 'protein':
        // Proteins: cooked, grilled, diced, sliced, cubed
        return ['cooked', 'diced', 'sliced', 'cubed', 'shredded'];

      case 'grain':
        // Grains: cooked, toasted
        return ['cooked', 'toasted'];

      case 'dairy':
        // Dairy: shredded, grated, melted, softened
        return ['shredded', 'grated', 'melted', 'softened', 'room temperature'];

      default:
        return ['chopped'];
    }
  }

  /**
   * Get a random proper cooking fraction
   */
  private getRandomFraction(): string {
    const fractions = ['1/4', '1/3', '1/2', '2/3', '3/4'];
    return this.pickRandom(fractions);
  }

  /**
   * Get a random mixed number with proper fraction
   */
  private getRandomMixedNumber(): string {
    const whole = this.randomInt(1, 2); // 1 or 2
    const fraction = this.getRandomFraction();
    return `${whole} ${fraction}`;
  }

  private generateIngredientLine(
    ingredientName: string,
    options: Required<Omit<RandomRecipeOptions, 'ingredientCount'>>
  ): string {
    const parts: string[] = [];

    // Look up ingredient in database to get its actual category
    const ingredientRecord = this.db.getByCanonical(ingredientName);
    const category = ingredientRecord?.category?.toLowerCase() || 'other';

    // Random chance of no quantity (5%)
    const skipQuantity = options.includeNoQuantity && Math.random() < 0.05;

    // Random chance of no unit when there's a quantity (5%)
    // This creates things like "3 eggs" instead of "3 large eggs"
    const skipUnit = options.includeNoUnit && Math.random() < 0.05;

    // Check if this is count-based (no fractions allowed)
    const subcategory = ingredientRecord?.subcategory?.toLowerCase() || '';
    const note = ingredientRecord?.note?.toLowerCase() || '';
    const isCountBased = subcategory === 'eggs' || note.includes('count-based');

    // Add quantity
    if (!skipQuantity) {
      if (isCountBased) {
        // Count-based ingredients only get whole numbers
        const maxQty = 6;
        parts.push(this.randomInt(1, maxQty).toString());
      } else if (options.includeWeirdQuantities && Math.random() < 0.3) {
        // 30% chance of slightly unusual (but valid) quantity format
        const format = Math.random();
        if (format < 0.5) {
          // Simple fraction
          parts.push(this.getRandomFraction());
        } else if (format < 0.8) {
          // Mixed number
          parts.push(this.getRandomMixedNumber());
        } else {
          // Range
          const low = this.randomInt(1, 3);
          parts.push(`${low}-${low + this.randomInt(1, 2)}`);
        }
      } else {
        // Normal quantity
        const rand = Math.random();
        if (rand < 0.3) {
          // Fraction
          parts.push(this.getRandomFraction());
        } else if (rand < 0.5) {
          // Mixed number
          parts.push(this.getRandomMixedNumber());
        } else {
          // Whole number (1-6 for most things, but adjust for category)
          const maxQty = category === 'spices' || category === 'baking' ? 3 : 6;
          parts.push(this.randomInt(1, maxQty).toString());
        }
      }
    }

    // Add unit (if not skipped) - use appropriate unit for ingredient
    if (!skipQuantity && !skipUnit) {
      const unit = this.getAppropriateUnit(ingredientName, ingredientRecord);
      // Only add unit if it's not empty (count-based ingredients have no unit)
      if (unit) {
        parts.push(unit);
      }
    }

    // Add modifiers (30% chance) - use appropriate modifiers for this ingredient type
    if (options.includeModifiers && Math.random() < 0.3) {
      const appropriateModifiers = this.getAppropriateModifiers(ingredientName);
      parts.push(this.pickRandom(appropriateModifiers));
    }

    // Add ingredient
    parts.push(ingredientName);

    // Add preparation (40% chance) - use appropriate preparations for this ingredient type
    if (options.includePreparations && Math.random() < 0.4) {
      const appropriatePreparations = this.getAppropriatePreparations(ingredientName);

      if (Math.random() < 0.7) {
        // Single preparation
        parts[parts.length - 1] += ',';
        parts.push(this.pickRandom(appropriatePreparations));
      } else {
        // Two preparations
        const prep1 = this.pickRandom(appropriatePreparations);
        let prep2 = this.pickRandom(appropriatePreparations);
        // Make sure we don't repeat the same prep
        while (prep2 === prep1 && appropriatePreparations.length > 1) {
          prep2 = this.pickRandom(appropriatePreparations);
        }
        parts[parts.length - 1] += ',';
        parts.push(`${prep1} and ${prep2}`);
      }
    }

    return parts.join(' ');
  }

  private generateWackyRecipeName(usedIngredients: string[]): string {
    const adjectives = [
      'Chaotic', 'Random', 'Bizarre', 'Wacky', 'Absurd', 'Ridiculous',
      'Impossible', 'Nonsensical', 'Crazy', 'Wild', 'Insane', 'Mad',
      'Surreal', 'Strange', 'Weird', 'Odd', 'Peculiar', 'Quirky',
      'Mysterious', 'Dubious', 'Questionable', 'Suspicious', 'Experimental',
      'Forbidden', 'Cursed', 'Blessed', 'Unholy', 'Divine', 'Cosmic',
      'Apocalyptic', 'Legendary', 'Mythical', 'Haunted', 'Enchanted',
      'Radioactive', 'Toxic', 'Volatile', 'Unstable', 'Rogue', 'Feral'
    ];

    const nouns = [
      'Casserole', 'Stew', 'Soup', 'Pie', 'Cake', 'Salad',
      'Medley', 'Mix', 'Blend', 'Fusion', 'Delight', 'Surprise',
      'Creation', 'Experiment', 'Concoction', 'Disaster', 'Mashup',
      'Combo', 'Extravaganza', 'Spectacular', 'Bonanza', 'Fiasco',
      'Catastrophe', 'Nightmare', 'Dream', 'Fantasy', 'Adventure',
      'Journey', 'Odyssey', 'Quest', 'Saga', 'Chronicle', 'Symphony',
      'Rhapsody', 'Explosion', 'Revolution', 'Renaissance', 'Apocalypse'
    ];

    const connectors = [
      'and', '&', 'meets', 'with', 'plus', 'vs', 'versus', 'kissed by'
    ];

    const prefixes = [
      "Chef's", "Grandma's", "The Infamous", "The Legendary", "The Ultimate",
      "Dr. Chaos's", "Professor Strange's", "Captain", "Admiral", "General"
    ];

    const suffixes = [
      'of Doom', 'of Wonder', 'of Mystery', 'of Chaos', 'of Glory',
      'Supreme', 'Royale', 'Deluxe', 'from Hell', 'from Beyond',
      'Gone Wrong', 'Gone Wild', 'Unleashed', 'Reborn', 'Redux',
      '2.0', 'Returns', 'Strikes Back', 'The Revenge', 'Forever'
    ];

    // Helper to pick unique ingredients
    const pickUniqueIngredients = (count: number): string[] => {
      const shuffled = [...usedIngredients].sort(() => Math.random() - 0.5);
      const unique = Array.from(new Set(shuffled)).slice(0, count);
      return unique.map(ing => this.capitalizeFirst(ing));
    };

    // Pick a random naming pattern (more variety!)
    const pattern = Math.random();

    if (pattern < 0.15 && usedIngredients.length >= 2) {
      // "Ingredient and Ingredient Noun"
      const [ing1, ing2] = pickUniqueIngredients(2);
      const connector = this.pickRandom(connectors);
      return `${ing1} ${connector} ${ing2} ${this.pickRandom(nouns)}`;
    } else if (pattern < 0.28 && usedIngredients.length >= 3) {
      // "Ingredient, Ingredient & Ingredient Noun"
      const [ing1, ing2, ing3] = pickUniqueIngredients(3);
      return `${ing1}, ${ing2} & ${ing3} ${this.pickRandom(nouns)}`;
    } else if (pattern < 0.42 && usedIngredients.length >= 1) {
      // "Adjective Ingredient Noun"
      const ing = this.capitalizeFirst(this.pickRandom(usedIngredients));
      return `${this.pickRandom(adjectives)} ${ing} ${this.pickRandom(nouns)}`;
    } else if (pattern < 0.56 && usedIngredients.length >= 1) {
      // "Ingredient Noun of/from/gone..."
      const ing = this.capitalizeFirst(this.pickRandom(usedIngredients));
      const suffix = this.pickRandom(suffixes);
      return `${ing} ${this.pickRandom(nouns)} ${suffix}`;
    } else if (pattern < 0.68 && usedIngredients.length >= 1) {
      // "Prefix Ingredient Noun"
      const ing = this.capitalizeFirst(this.pickRandom(usedIngredients));
      const prefix = this.pickRandom(prefixes);
      return `${prefix} ${ing} ${this.pickRandom(nouns)}`;
    } else if (pattern < 0.80 && usedIngredients.length >= 2) {
      // "The Ingredient-Ingredient Noun"
      const [ing1, ing2] = pickUniqueIngredients(2);
      return `The ${ing1}-${ing2} ${this.pickRandom(nouns)}`;
    } else if (pattern < 0.90 && usedIngredients.length >= 1) {
      // "Adjective Adjective Noun"
      const adj1 = this.pickRandom(adjectives);
      const adj2 = this.pickRandom(adjectives);
      return adj1 !== adj2 ? `${adj1} ${adj2} ${this.pickRandom(nouns)}` : `${adj1} ${this.pickRandom(nouns)}`;
    } else {
      // "Adjective Noun"
      return `${this.pickRandom(adjectives)} ${this.pickRandom(nouns)}`;
    }
  }

  private capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  private pickRandom<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

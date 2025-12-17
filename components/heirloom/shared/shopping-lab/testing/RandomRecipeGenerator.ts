/**
 * Random Recipe Generator
 *
 * Generates wacky, random recipes to stress test the parsing system
 */

import { IngredientDatabase } from '../database/IngredientDatabase';

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
  private units: string[] = [
    // Volume
    'cup', 'cups', 'tablespoon', 'tablespoons', 'tbsp', 'teaspoon', 'teaspoons', 'tsp',
    'fluid ounce', 'fluid ounces', 'fl oz', 'pint', 'pints', 'quart', 'quarts',
    'gallon', 'gallons', 'liter', 'liters', 'ml', 'milliliter', 'milliliters',
    // Weight
    'pound', 'pounds', 'lb', 'lbs', 'ounce', 'ounces', 'oz',
    'gram', 'grams', 'g', 'kilogram', 'kilograms', 'kg',
    // Count
    'piece', 'pieces', 'slice', 'slices', 'clove', 'cloves',
    'can', 'cans', 'package', 'packages', 'bunch', 'bunches',
    'head', 'heads', 'stalk', 'stalks', 'sprig', 'sprigs',
    // Other
    'pinch', 'dash', 'handful', 'box', 'bag', 'jar'
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

  private weirdQuantityFormats: Array<() => string> = [
    // Fractions
    () => `${this.randomInt(1, 4)}/${this.randomInt(2, 8)}`,
    () => `${this.randomInt(1, 3)} ${this.randomInt(1, 4)}/${this.randomInt(2, 8)}`,
    // Decimals
    () => (Math.random() * 10).toFixed(this.randomInt(1, 3)),
    // Ranges
    () => `${this.randomInt(1, 10)}-${this.randomInt(11, 20)}`,
    () => `${this.randomInt(1, 3)}-${this.randomInt(4, 6)}`,
    // Approximations
    () => `~${this.randomInt(1, 10)}`,
    () => `about ${this.randomInt(1, 5)}`,
    () => `around ${this.randomInt(2, 8)}`,
    () => `roughly ${this.randomInt(1, 4)} ${this.randomInt(1, 4)}/${this.randomInt(2, 4)}`,
    // Weird formats
    () => `${this.randomInt(1, 20)}.${this.randomInt(0, 99)}`,
    () => `${this.randomInt(10, 99)}/${this.randomInt(100, 999)}`,
    () => `${this.randomInt(1, 5)} to ${this.randomInt(6, 10)}`,
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

  private generateIngredientLine(
    ingredientName: string,
    options: Required<Omit<RandomRecipeOptions, 'ingredientCount'>>
  ): string {
    const parts: string[] = [];

    // Random chance of no quantity (10%)
    const skipQuantity = options.includeNoQuantity && Math.random() < 0.1;

    // Random chance of no unit (15%)
    const skipUnit = options.includeNoUnit && Math.random() < 0.15;

    // Add quantity
    if (!skipQuantity) {
      if (options.includeWeirdQuantities && Math.random() < 0.4) {
        // 40% chance of weird quantity format
        parts.push(this.pickRandom(this.weirdQuantityFormats)());
      } else {
        // Normal quantity
        if (Math.random() < 0.3) {
          // Fraction
          parts.push(`${this.randomInt(1, 3)} ${this.randomInt(1, 4)}/${this.randomInt(2, 4)}`);
        } else {
          parts.push(this.randomInt(1, 10).toString());
        }
      }
    }

    // Add unit (if not skipped)
    if (!skipQuantity && !skipUnit) {
      parts.push(this.pickRandom(this.units));
    }

    // Add modifiers (30% chance)
    if (options.includeModifiers && Math.random() < 0.3) {
      parts.push(this.pickRandom(this.modifiers));
    }

    // Add ingredient
    parts.push(ingredientName);

    // Add preparation (40% chance)
    if (options.includePreparations && Math.random() < 0.4) {
      if (Math.random() < 0.5) {
        // Comma-separated
        parts[parts.length - 1] += ',';
        parts.push(this.pickRandom(this.preparations));
      } else {
        // Multiple preparations
        const prepCount = this.randomInt(1, 3);
        const preps = [];
        for (let i = 0; i < prepCount; i++) {
          preps.push(this.pickRandom(this.preparations));
        }
        parts[parts.length - 1] += ',';
        parts.push(preps.join(' and '));
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

'use client';

import React, { useState, useMemo } from 'react';
import {
  type RecipeTime,
  calculateRecipeTimeline,
  formatTime,
  formatDuration,
} from '@/components/heirloom/shared/timeCalculator';
import { ShoppingListManager, type Recipe } from '@/components/heirloom/shared/shopping-lab/shopping';
import { ShoppingListView } from '../shopping-lab/components/ShoppingListView';
import { RandomRecipeGenerator } from '@/components/heirloom/shared/services/RandomRecipeGenerator';

// Recipe type
type DinnerPartyRecipe = RecipeTime & {
  emoji: string;
  description: string;
  ingredients: string[];
  instructions?: string[];
};

// All available recipes
const ALL_RECIPES: DinnerPartyRecipe[] = [
  {
    recipeId: 'roast',
    recipeName: 'Herb-Crusted Roast',
    prepTime: 20,
    cookTime: 90,
    canCookSimultaneously: false,
    emoji: '🥩',
    description: 'Main course - requires oven',
    ingredients: [
      '3 lbs beef roast',
      '2 tablespoons olive oil',
      '4 cloves garlic, minced',
      '2 tablespoons fresh rosemary, chopped',
      '1 tablespoon fresh thyme, chopped',
      '1 teaspoon salt',
      '½ teaspoon black pepper',
      '1 cup beef broth',
    ],
  },
  {
    recipeId: 'potatoes',
    recipeName: 'Garlic Mashed Potatoes',
    prepTime: 15,
    cookTime: 25,
    canCookSimultaneously: true,
    emoji: '🥔',
    description: 'Side dish - stovetop',
    ingredients: [
      '3 lbs russet potatoes',
      '4 cloves garlic',
      '½ cup unsalted butter',
      '¾ cup whole milk',
      '½ cup sour cream',
      '1 teaspoon salt',
      '½ teaspoon black pepper',
      '2 tablespoons fresh chives, chopped',
    ],
  },
  {
    recipeId: 'vegetables',
    recipeName: 'Roasted Vegetables',
    prepTime: 10,
    cookTime: 30,
    canCookSimultaneously: true,
    emoji: '🥕',
    description: 'Side dish - can share oven',
    ingredients: [
      '2 lbs carrots, chopped',
      '1 lb Brussels sprouts, halved',
      '1 red onion, quartered',
      '3 tablespoons olive oil',
      '1 teaspoon dried rosemary',
      '½ teaspoon salt',
      '¼ teaspoon black pepper',
    ],
  },
  {
    recipeId: 'salad',
    recipeName: 'Caesar Salad',
    prepTime: 15,
    cookTime: 0,
    canCookSimultaneously: true,
    emoji: '🥗',
    description: 'Salad - no cooking required',
    ingredients: [
      '1 large head romaine lettuce',
      '½ cup grated parmesan',
      '2 cups croutons',
      '⅓ cup olive oil',
      '3 tablespoons lemon juice',
      '2 cloves garlic, minced',
      '1 teaspoon Dijon mustard',
      '2 teaspoons Worcestershire sauce',
      '1 egg yolk',
      '¼ teaspoon salt',
      '¼ teaspoon black pepper',
    ],
  },
  {
    recipeId: 'salmon',
    recipeName: 'Honey-Glazed Salmon',
    prepTime: 10,
    cookTime: 20,
    canCookSimultaneously: false,
    emoji: '🐟',
    description: 'Main course - requires oven',
    ingredients: [
      '4 salmon fillets (6 oz each)',
      '3 tablespoons honey',
      '2 tablespoons soy sauce',
      '1 tablespoon lemon juice',
      '2 cloves garlic, minced',
      '1 teaspoon ginger, grated',
      '½ teaspoon black pepper',
    ],
  },
  {
    recipeId: 'risotto',
    recipeName: 'Mushroom Risotto',
    prepTime: 10,
    cookTime: 35,
    canCookSimultaneously: true,
    emoji: '🍚',
    description: 'Side dish - stovetop',
    ingredients: [
      '2 cups arborio rice',
      '8 oz mushrooms, sliced',
      '6 cups vegetable broth',
      '1 onion, diced',
      '3 cloves garlic, minced',
      '½ cup white wine',
      '½ cup parmesan cheese',
      '2 tablespoons butter',
      '2 tablespoons olive oil',
      '1 teaspoon thyme',
    ],
  },
  {
    recipeId: 'bread',
    recipeName: 'Garlic Bread',
    prepTime: 5,
    cookTime: 10,
    canCookSimultaneously: true,
    emoji: '🥖',
    description: 'Side - quick oven',
    ingredients: [
      '1 French baguette',
      '½ cup unsalted butter, softened',
      '4 cloves garlic, minced',
      '2 tablespoons parsley, chopped',
      '¼ teaspoon salt',
    ],
  },
];

// Themed dinner party configurations
interface DinnerPartyTheme {
  name: string;
  recipeIds: string[];
  randomRecipes?: DinnerPartyRecipe[]; // Store generated random recipes
}

// Recipe combinations
const RECIPE_COMBOS = [
  ['roast', 'potatoes', 'vegetables'],
  ['roast', 'potatoes', 'salad'],
  ['roast', 'vegetables', 'salad'],
  ['roast', 'potatoes', 'bread'],
  ['salmon', 'risotto', 'salad'],
  ['salmon', 'risotto', 'vegetables'],
  ['salmon', 'salad', 'bread'],
  ['salmon', 'vegetables', 'salad'],
  ['salmon', 'potatoes', 'vegetables'],
  ['roast', 'potatoes', 'vegetables', 'salad'],
  ['salmon', 'risotto', 'salad', 'bread'],
];

// Name generation components
const ADJECTIVES = [
  'Elegant', 'Sophisticated', 'Divine', 'Exquisite', 'Magnificent',
  'Chaotic', 'Random', 'Bizarre', 'Wacky', 'Absurd', 'Ridiculous',
  'Impossible', 'Nonsensical', 'Crazy', 'Wild', 'Insane', 'Mad',
  'Legendary', 'Epic', 'Mythical', 'Cosmic', 'Ultimate', 'Supreme',
  'Forbidden', 'Cursed', 'Blessed', 'Unholy', 'Mysterious', 'Dubious',
  'Experimental', 'Revolutionary', 'Apocalyptic', 'Radioactive', 'Volatile',
];

const NOUNS = [
  'Gathering', 'Soirée', 'Experience', 'Evening', 'Affair', 'Night',
  'Feast', 'Banquet', 'Celebration', 'Party', 'Extravaganza', 'Spectacular',
  'Adventure', 'Journey', 'Quest', 'Saga', 'Chronicle', 'Odyssey',
  'Heist', 'Reckoning', 'Protocol', 'Operation', 'Mission', 'Campaign',
  'Disaster', 'Catastrophe', 'Fiasco', 'Nightmare', 'Dream', 'Fantasy',
  'Revolution', 'Renaissance', 'Apocalypse', 'Explosion', 'Bonanza',
];

const SUFFIXES = [
  'of Doom', 'of Glory', 'of Wonder', 'of Mystery', 'of Chaos',
  'Supreme', 'Royale', 'Deluxe', 'from Hell', 'from Beyond',
  'Gone Wrong', 'Gone Wild', 'Unleashed', 'Reborn', 'Redux',
  '2.0', 'Returns', 'Strikes Back', 'The Revenge', 'Forever',
  'Episode III', 'The Final Chapter', ': Origins', 'Remastered',
];

const PREFIXES = [
  'The Great', 'The Legendary', 'The Ultimate', 'The Infamous',
  'Attack of the', 'Revenge of the', 'Return of the', 'Rise of the',
  'Mission Impossible:', 'Fast & Furious:', 'The Chronicles of',
];

// Generate a random party name
function generatePartyName(recipeIds: string[]): string {
  const dishCount = recipeIds.length;

  // Map recipe IDs to fun dish names
  const dishNames: Record<string, string[]> = {
    'roast': ['Roast', 'Beef', 'Herb Crust', 'Meat'],
    'potatoes': ['Potato', 'Mash', 'Garlic Mash', 'Spud'],
    'vegetables': ['Veggie', 'Carrot', 'Brussels Sprout', 'Garden'],
    'salad': ['Caesar', 'Salad', 'Lettuce', 'Greens'],
    'salmon': ['Salmon', 'Fish', 'Honey Glaze', 'Pink Fish'],
    'risotto': ['Risotto', 'Mushroom', 'Rice', 'Creamy Rice'],
    'bread': ['Garlic Bread', 'Bread', 'Baguette', 'Carbs'],
  };

  // Pick 1-2 random dishes from the combo
  const shuffled = [...recipeIds].sort(() => Math.random() - 0.5);
  const dish1 = pick(dishNames[shuffled[0]] || ['Dinner']);
  const dish2 = shuffled[1] ? pick(dishNames[shuffled[1]] || ['Party']) : null;

  const patterns = [
    // [Dish] [Noun] [Suffix]
    () => `${dish1} ${pick(NOUNS)} ${pick(SUFFIXES)}`,
    // [Adj] [Dish] [Noun]
    () => `${pick(ADJECTIVES)} ${dish1} ${pick(NOUNS)}`,
    // [Dish] vs [Dish] [Noun]
    () => dish2 ? `${dish1} vs ${dish2} ${pick(NOUNS)}` : `${dish1} ${pick(NOUNS)}`,
    // [Prefix] [Dish] [Noun]
    () => `${pick(PREFIXES)} ${dish1} ${pick(NOUNS)}`,
    // [Dish] & [Dish] [Suffix]
    () => dish2 ? `${dish1} & ${dish2} ${pick(SUFFIXES)}` : `${dish1} ${pick(SUFFIXES)}`,
    // The [Adj] [Dish] [Suffix]
    () => `The ${pick(ADJECTIVES)} ${dish1} ${pick(SUFFIXES)}`,
    // [Dish]-[Dish] [Noun]
    () => dish2 ? `${dish1}-${dish2} ${pick(NOUNS)}` : `${pick(ADJECTIVES)} ${dish1} ${pick(NOUNS)}`,
    // [Adj] [Adj] [Dish] [Noun]
    () => `${pick(ADJECTIVES)} ${pick(ADJECTIVES)} ${dish1} ${pick(NOUNS)}`,
    // [Dish] [Noun]: [Suffix]
    () => `${dish1} ${pick(NOUNS)}: ${pick(SUFFIXES)}`,
    // The ${dishCount}-[Dish] [Noun]
    () => `The ${dishCount}-${dish1} ${pick(NOUNS)}`,
  ];

  return pick(patterns)();
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Random emoji options for generated recipes
const RANDOM_EMOJIS = ['🎲', '🎪', '🎨', '🎭', '🎯', '🎰', '🃏', '🎳', '🎮', '🎢', '🎡', '🎠'];

// Generate silly cooking instructions for random recipes
function generateCookingInstructions(ingredients: string[], prepTime: number, cookTime: number): string[] {
  const actions = [
    'Combine', 'Mix', 'Whisk', 'Blend', 'Stir', 'Fold', 'Toss',
    'Arrange', 'Layer', 'Scatter', 'Sprinkle', 'Drizzle'
  ];

  const cookingMethods = [
    'in a large bowl', 'in a medium saucepan', 'in a skillet over medium heat',
    'in a baking dish', 'in a mixing bowl', 'on a baking sheet',
    'in a pot', 'in a pan', 'in a container'
  ];

  const enthusiasticAdverbs = [
    'vigorously', 'gently', 'carefully', 'thoroughly', 'enthusiastically',
    'aggressively', 'lovingly', 'chaotically', 'methodically', 'frantically'
  ];

  const randomDescriptors = [
    'until well combined', 'until smooth', 'until fragrant', 'until golden',
    'until it looks right', 'until you feel good about it', 'for reasons unknown',
    'with reckless abandon', 'as if your life depends on it'
  ];

  const steps: string[] = [];

  // Step 1: Prep/combine ingredients
  const firstIngredients = ingredients.slice(0, Math.min(3, ingredients.length));
  steps.push(`${pick(actions)} ${firstIngredients.join(', ')} ${pick(cookingMethods)} ${pick(enthusiasticAdverbs)}.`);

  // Step 2: Add more ingredients if we have them
  if (ingredients.length > 3) {
    const moreIngredients = ingredients.slice(3, Math.min(6, ingredients.length));
    steps.push(`Add ${moreIngredients.join(', ')} and ${pick(actions).toLowerCase()} ${pick(randomDescriptors)}.`);
  }

  // Step 3: Cook
  const cookVerbs = ['Cook', 'Bake', 'Simmer', 'Heat', 'Warm', 'Process'];
  steps.push(`${pick(cookVerbs)} for ${cookTime} minutes, stirring occasionally and questioning your life choices.`);

  // Step 4: Finish
  if (ingredients.length > 6) {
    const finalIngredients = ingredients.slice(6);
    steps.push(`Top with ${finalIngredients.join(', ')} and serve immediately to unsuspecting guests.`);
  } else {
    const endings = [
      'Serve warm and pretend this was intentional.',
      'Plate beautifully and act like you know what you\'re doing.',
      'Present with confidence. Nobody needs to know the truth.',
      'Serve immediately before anyone asks questions.',
      'Garnish creatively to hide any mistakes.'
    ];
    steps.push(pick(endings));
  }

  return steps;
}

// Generate a random recipe using RandomRecipeGenerator
function generateRandomRecipe(): DinnerPartyRecipe {
  const generator = new RandomRecipeGenerator();
  const random = generator.generateRecipe({
    ingredientCount: Math.floor(Math.random() * 5) + 4, // 4-8 ingredients
  });

  const prepTime = Math.floor(Math.random() * 15) + 5; // 5-20 minutes
  const cookTime = Math.floor(Math.random() * 30) + 10; // 10-40 minutes

  return {
    recipeId: `random-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    recipeName: random.name,
    prepTime,
    cookTime,
    canCookSimultaneously: true,
    emoji: pick(RANDOM_EMOJIS),
    description: 'Random - party crasher!',
    ingredients: random.ingredients,
    instructions: generateCookingInstructions(random.ingredients, prepTime, cookTime),
  };
}

export function DinnerPartyDemo() {
  // Generate initial theme
  const generateInitialTheme = (): DinnerPartyTheme => {
    let recipeIds = [...pick(RECIPE_COMBOS)];
    const randomRecipes: DinnerPartyRecipe[] = [];

    // 50% chance to add a random recipe
    if (Math.random() < 0.5) {
      const randomRecipe = generateRandomRecipe();
      randomRecipes.push(randomRecipe);
      recipeIds.push(randomRecipe.recipeId);
    }

    return {
      name: generatePartyName(recipeIds),
      recipeIds,
      randomRecipes,
    };
  };

  // State
  const [currentTheme, setCurrentTheme] = useState<DinnerPartyTheme>(generateInitialTheme);
  const [mealTime, setMealTime] = useState<Date>(() => {
    // Default to 7:00 PM today
    const today = new Date();
    today.setHours(19, 0, 0, 0);
    return today;
  });
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null);

  // Shopping List Manager
  const [shoppingListManager] = useState(() => new ShoppingListManager());

  // Get current recipes
  const currentRecipes = useMemo(() => {
    const normalRecipes = ALL_RECIPES.filter(r => currentTheme.recipeIds.includes(r.recipeId));
    const allRecipes = [...normalRecipes, ...(currentTheme.randomRecipes || [])];
    return allRecipes;
  }, [currentTheme]);

  // Calculate timeline
  const timelines = useMemo(() => {
    if (currentRecipes.length === 0) return [];
    return calculateRecipeTimeline(currentRecipes, mealTime);
  }, [currentRecipes, mealTime]);

  // Generate shopping list from current theme's recipes
  const shoppingList = useMemo(() => {
    // Clear existing recipes
    shoppingListManager.getRecipes().forEach(r => shoppingListManager.removeRecipe(r.id));

    // Add current theme's recipes
    currentRecipes.forEach((recipe) => {
      const formattedRecipe: Recipe = {
        id: recipe.recipeId,
        name: recipe.recipeName,
        servings: 6, // Default servings for dinner party
        ingredientLines: recipe.ingredients,
      };
      shoppingListManager.addRecipe(formattedRecipe);
    });

    // Generate and return shopping list
    if (currentRecipes.length === 0) return null;

    return shoppingListManager.generateShoppingList({
      excludePantry: false,
      groupByCategory: true,
    });
  }, [currentRecipes, shoppingListManager]);

  const generateNewParty = () => {
    let recipeIds = [...pick(RECIPE_COMBOS)];
    const randomRecipes: DinnerPartyRecipe[] = [];

    // 50% chance to add a random recipe
    if (Math.random() < 0.5) {
      const randomRecipe = generateRandomRecipe();
      randomRecipes.push(randomRecipe);
      recipeIds.push(randomRecipe.recipeId);
    }

    setCurrentTheme({
      name: generatePartyName(recipeIds),
      recipeIds,
      randomRecipes,
    });
  };

  const handleMealTimeChange = (hours: number, minutes: number) => {
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    setMealTime(newTime);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header - Full Width */}
      <div className="mb-8">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h1 className="text-3xl font-serif mb-3" style={{ color: '#2C1810' }}>
            {currentTheme.name}
          </h1>
          <button
            onClick={generateNewParty}
            className="text-sm text-heirloom-coral hover:text-heirloom-orange font-medium transition-colors"
          >
            🎲 Generate New Party
          </button>
        </div>
      </div>

      {/* Main Content: Party Menu and Cooking Timeline Side by Side */}
      <div className="grid lg:grid-cols-2 gap-6 mb-12">
        {/* Party Menu */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Party Menu
          </h3>
          <div className="space-y-2">
            {currentRecipes.map((recipe) => {
              const isRandom = recipe.recipeId.startsWith('random-');
              const isExpanded = expandedRecipe === recipe.recipeId;
              return (
                <div
                  key={recipe.recipeId}
                  className="p-3 rounded-lg border-2 border-amber-200 bg-amber-50 cursor-pointer hover:border-amber-300 transition-colors"
                  onClick={() => setExpandedRecipe(isExpanded ? null : recipe.recipeId)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{recipe.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900 text-sm">
                          {recipe.recipeName}
                        </p>
                        {isRandom && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-heirloom-coral text-white">
                            🎲 Random!
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {formatDuration(recipe.prepTime + recipe.cookTime)}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {isExpanded ? '▼' : '▶'}
                    </span>
                  </div>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-amber-300 space-y-3">
                      {/* Ingredients */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Ingredients:</h4>
                        <ul className="space-y-1">
                          {recipe.ingredients.map((ingredient, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-heirloom-coral mt-0.5">•</span>
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Instructions (for random recipes) */}
                      {recipe.instructions && recipe.instructions.length > 0 && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">Instructions:</h4>
                          <ol className="space-y-2">
                            {recipe.instructions.map((instruction, idx) => (
                              <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                                <span className="font-semibold text-heirloom-coral">{idx + 1}.</span>
                                <span>{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cooking Timeline */}
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Cooking Timeline
          </h3>

          {timelines.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-8">
              Select recipes to see the timeline
            </p>
          ) : (
            <div className="space-y-3">
              {timelines.map((timeline) => {
                const recipe = currentRecipes.find(r => r.recipeId === timeline.recipeId);
                if (!recipe) return null;

                return (
                  <div
                    key={timeline.recipeId}
                    className="border-l-4 border-heirloom-coral pl-4 py-2"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {recipe.recipeName}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      (start at {formatTime(timeline.startTime)})
                    </p>
                  </div>
                );
              })}

              {/* Final step - dinner is served */}
              {timelines.length > 0 && (
                <div className="border-l-4 border-heirloom-coral pl-4 py-2 mt-4">
                  <p className="font-medium text-gray-900 text-sm">
                    🍽️ Dinner is served!
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    (at {formatTime(mealTime)})
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Shopping List Section */}
      {currentRecipes.length > 0 && (
        <div className="max-w-4xl mx-auto">
          <ShoppingListView shoppingList={shoppingList} />
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TimelineVisualization } from './TimelineVisualization';
import { RecipeStatusCards } from './RecipeStatusCards';
import {
  type RecipeTime,
  calculateRecipeTimeline,
  updateTimelineStatus,
  createTimelineSlots,
  calculateTotalTimeSpan,
  formatTime,
  formatDuration,
} from '@/components/heirloom/shared/timeCalculator';
import { ShoppingListManager, type Recipe } from '@/components/heirloom/shared/shopping-lab/shopping';
import { ShoppingListView } from '../shopping-lab/components/ShoppingListView';

// Sample recipes for dinner party
const DINNER_PARTY_RECIPES: (RecipeTime & { emoji: string; description: string; ingredients: string[] })[] = [
  {
    recipeId: 'roast',
    recipeName: 'Herb-Crusted Roast',
    prepTime: 20,
    cookTime: 90,
    canCookSimultaneously: false, // Needs full oven
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
    canCookSimultaneously: true, // Stovetop
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
    canCookSimultaneously: true, // Can share oven
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
    canCookSimultaneously: true, // No cooking
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
];

export function DinnerPartyDemo() {
  // State
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(
    new Set(['roast', 'potatoes', 'vegetables'])
  );
  const [mealTime, setMealTime] = useState<Date>(() => {
    // Default to 7:00 PM today
    const today = new Date();
    today.setHours(19, 0, 0, 0);
    return today;
  });
  const [simulatedTime, setSimulatedTime] = useState<Date>(new Date());
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1); // 1 = real-time, 60 = 1 hour per second

  // Shopping List Manager
  const [shoppingListManager] = useState(() => new ShoppingListManager());

  // Calculate timeline
  const timelines = useMemo(() => {
    const selectedRecipeData = DINNER_PARTY_RECIPES.filter((r) =>
      selectedRecipes.has(r.recipeId)
    );

    if (selectedRecipeData.length === 0) return [];

    const baseTimelines = calculateRecipeTimeline(selectedRecipeData, mealTime);
    return updateTimelineStatus(baseTimelines, simulatedTime);
  }, [selectedRecipes, mealTime, simulatedTime]);

  const slots = useMemo(() => createTimelineSlots(timelines), [timelines]);
  const totalMinutes = useMemo(() => calculateTotalTimeSpan(timelines), [timelines]);

  // Generate shopping list from selected recipes
  const shoppingList = useMemo(() => {
    // Clear existing recipes
    shoppingListManager.getRecipes().forEach(r => shoppingListManager.removeRecipe(r.id));

    // Add selected recipes
    const selectedRecipeData = DINNER_PARTY_RECIPES.filter((r) =>
      selectedRecipes.has(r.recipeId)
    );

    selectedRecipeData.forEach((recipe) => {
      const formattedRecipe: Recipe = {
        id: recipe.recipeId,
        name: recipe.recipeName,
        servings: 6, // Default servings for dinner party
        ingredientLines: recipe.ingredients,
      };
      shoppingListManager.addRecipe(formattedRecipe);
    });

    // Generate and return shopping list
    if (selectedRecipeData.length === 0) return null;

    return shoppingListManager.generateShoppingList({
      excludePantry: false,
      groupByCategory: true,
    });
  }, [selectedRecipes, shoppingListManager]);

  // Simulation effect
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimulatedTime((prev) => {
        const next = new Date(prev.getTime() + simulationSpeed * 60000);

        // Stop if we've passed meal time
        if (next >= mealTime) {
          setIsSimulating(false);
          return mealTime;
        }

        return next;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isSimulating, simulationSpeed, mealTime]);

  // Handlers
  const toggleRecipe = (recipeId: string) => {
    const newSelected = new Set(selectedRecipes);
    if (newSelected.has(recipeId)) {
      newSelected.delete(recipeId);
    } else {
      newSelected.add(recipeId);
    }
    setSelectedRecipes(newSelected);
  };

  const handleStartSimulation = () => {
    if (timelines.length === 0) return;

    // Reset to first recipe start time
    const firstStart = timelines[0].startTime;
    setSimulatedTime(firstStart);
    setIsSimulating(true);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulatedTime(new Date());
  };

  const handleMealTimeChange = (hours: number, minutes: number) => {
    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    setMealTime(newTime);
  };

  const allCompleted = timelines.length > 0 && timelines.every((t) => t.status === 'completed');

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif mb-3" style={{ color: '#2C1810' }}>
          Dinner Party Timeline
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Heirloom calculates exactly when to start each recipe so everything finishes
          perfectly on time. Watch the magic happen with our simulation.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr,350px] gap-6">
        {/* Left: Timeline & Visualization */}
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Meal Time Picker */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meal Time
                </label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    value={`${mealTime.getHours().toString().padStart(2, '0')}:${mealTime.getMinutes().toString().padStart(2, '0')}`}
                    onChange={(e) => {
                      const [hours, minutes] = e.target.value.split(':').map(Number);
                      handleMealTimeChange(hours, minutes);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Simulation Controls */}
              <div className="flex items-center gap-2">
                {!isSimulating ? (
                  <button
                    onClick={handleStartSimulation}
                    disabled={timelines.length === 0}
                    className="px-6 py-2.5 rounded-lg font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{
                      backgroundColor: '#10B981',
                      color: 'white',
                    }}
                  >
                    <span>▶</span>
                    <span>Start Cooking</span>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => setIsSimulating(false)}
                      className="px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2"
                      style={{
                        backgroundColor: '#EF4444',
                        color: 'white',
                      }}
                    >
                      <span>⏸</span>
                      <span>Pause</span>
                    </button>
                    <select
                      value={simulationSpeed}
                      onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                      className="px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value={1}>1x Speed</option>
                      <option value={5}>5x Speed</option>
                      <option value={10}>10x Speed</option>
                      <option value={30}>30x Speed</option>
                      <option value={60}>60x Speed</option>
                    </select>
                  </>
                )}

                {simulatedTime.getTime() !== new Date().getTime() && (
                  <button
                    onClick={handleResetSimulation}
                    className="px-4 py-2.5 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>

            {/* Current Simulated Time */}
            {isSimulating && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Simulated Time:</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatTime(simulatedTime)}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {simulationSpeed}x speed
                </div>
              </motion.div>
            )}
          </div>

          {/* Timeline Visualization */}
          <TimelineVisualization
            timelines={timelines}
            slots={slots}
            totalMinutes={totalMinutes}
            currentTime={simulatedTime}
          />

          {/* Intelligence Explanation */}
          {timelines.length > 0 && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Smart Timeline Calculation
                  </h3>
                  <p className="text-sm text-blue-800 mb-3">
                    Heirloom works backwards from your meal time ({formatTime(mealTime)}) to calculate
                    exactly when to start each recipe.
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                        ✓ Reverse Timeline
                      </p>
                      <p className="text-blue-700">
                        Starts with meal time, works backwards
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                        ✓ Parallel Cooking
                      </p>
                      <p className="text-blue-700">
                        Overlaps recipes that can cook simultaneously
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                        ✓ Real-Time Status
                      </p>
                      <p className="text-blue-700">
                        Updates as you cook with progress tracking
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-medium text-blue-900 mb-1">
                        ✓ Start Time Alerts
                      </p>
                      <p className="text-blue-700">
                        Notifies when to begin each recipe
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Done Celebration */}
          {allCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-center text-white"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold mb-2">
                Perfect Timing!
              </h3>
              <p className="text-green-50">
                All recipes are complete and ready to serve at {formatTime(mealTime)}
              </p>
            </motion.div>
          )}
        </div>

        {/* Right: Recipe Selection & Status */}
        <div className="space-y-6">
          {/* Recipe Selection */}
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Select Recipes
            </h3>
            <div className="space-y-2">
              {DINNER_PARTY_RECIPES.map((recipe) => (
                <button
                  key={recipe.recipeId}
                  onClick={() => toggleRecipe(recipe.recipeId)}
                  className="w-full p-3 rounded-lg border-2 text-left transition-all"
                  style={{
                    backgroundColor: selectedRecipes.has(recipe.recipeId) ? '#FEF3C7' : 'white',
                    borderColor: selectedRecipes.has(recipe.recipeId) ? '#F59E0B' : '#E5E7EB',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{recipe.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {recipe.recipeName}
                      </p>
                      <p className="text-xs text-gray-600">
                        {formatDuration(recipe.prepTime + recipe.cookTime)}
                      </p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-md border-2 flex items-center justify-center"
                      style={{
                        backgroundColor: selectedRecipes.has(recipe.recipeId) ? '#F59E0B' : 'white',
                        borderColor: selectedRecipes.has(recipe.recipeId) ? '#F59E0B' : '#D1D5DB',
                      }}
                    >
                      {selectedRecipes.has(recipe.recipeId) && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recipe Status Cards */}
          <RecipeStatusCards
            timelines={timelines}
            currentTime={simulatedTime}
            mealTime={mealTime}
          />
        </div>
      </div>

      {/* Shopping List Section */}
      {selectedRecipes.size > 0 && (
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif mb-2" style={{ color: '#2C1810' }}>
              Shopping List
            </h2>
            <p className="text-gray-600">
              Consolidated ingredients from your selected recipes
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <ShoppingListView shoppingList={shoppingList} />
          </div>
        </div>
      )}
    </div>
  );
}

'use client'

/**
 * Heirloom Smallify Demo
 *
 * Interactive demo showing:
 * - Intelligent recipe scaling with non-linear adjustments
 * - Smart multipliers for different ingredient types
 * - Practical measurement rounding
 * - Scaling warnings and recommendations
 */

import { useState, useMemo } from 'react'

// Types
interface Ingredient {
  name: string
  quantity: number
  quantityMax?: number
  unit: string
  originalText: string
  type: IngredientType
}

type IngredientType = 'spices' | 'leavening' | 'liquids' | 'eggs' | 'seasoning' | 'bulk'

interface ScaledIngredient {
  ingredient: Ingredient
  scaledQuantity: number
  scaledQuantityMax?: number
  wasAdjusted: boolean
  adjustmentReason?: string
}

interface Warning {
  type: string
  message: string
  severity: 'caution' | 'info'
}

// Sample recipe data
const SAMPLE_RECIPE = {
  title: "Grandma's Chocolate Chip Cookies",
  originalServings: 24,
  prepTime: "15 min",
  cookTime: "12 min",
  ingredients: [
    { name: "all-purpose flour", quantity: 2.25, unit: "cups", originalText: "2¼ cups all-purpose flour", type: 'bulk' as IngredientType },
    { name: "baking soda", quantity: 1, unit: "tsp", originalText: "1 tsp baking soda", type: 'leavening' as IngredientType },
    { name: "salt", quantity: 1, unit: "tsp", originalText: "1 tsp salt", type: 'seasoning' as IngredientType },
    { name: "butter", quantity: 1, unit: "cup", originalText: "1 cup (2 sticks) butter, softened", type: 'bulk' as IngredientType },
    { name: "granulated sugar", quantity: 0.75, unit: "cup", originalText: "¾ cup granulated sugar", type: 'bulk' as IngredientType },
    { name: "brown sugar", quantity: 0.75, unit: "cup", originalText: "¾ cup packed brown sugar", type: 'bulk' as IngredientType },
    { name: "vanilla extract", quantity: 1, unit: "tsp", originalText: "1 tsp vanilla extract", type: 'spices' as IngredientType },
    { name: "eggs", quantity: 2, unit: "", originalText: "2 large eggs", type: 'eggs' as IngredientType },
    { name: "chocolate chips", quantity: 2, unit: "cups", originalText: "2 cups chocolate chips", type: 'bulk' as IngredientType },
  ]
}

// Scaling multipliers (from Swift code)
const SCALING_MULTIPLIERS = {
  spices: { up: 0.9, down: 1.05 },
  leavening: { up: 0.95, down: 1.05 },
  liquids: { up: 0.95, down: 1.05 },
  eggs: { up: 0.95, down: 1.05 },
  seasoning: { up: 0.9, down: 1.05 },
  bulk: { up: 1.0, down: 1.0 }
}

const ADJUSTMENT_NAMES: Record<IngredientType, string> = {
  spices: "Spice (scaled conservatively)",
  leavening: "Leavening agent (scaled precisely)",
  liquids: "Liquid (adjusted for evaporation)",
  eggs: "Eggs (rounded for practicality)",
  seasoning: "Seasoning (scaled to taste)",
  bulk: "Bulk ingredient"
}

export function SmallifyDemo() {
  const [targetServings, setTargetServings] = useState(SAMPLE_RECIPE.originalServings)

  // Calculate scale factor
  const scaleFactor = targetServings / SAMPLE_RECIPE.originalServings

  // Scale ingredients with non-linear adjustments
  const scaledIngredients = useMemo(() => {
    return SAMPLE_RECIPE.ingredients.map(ingredient => {
      // Calculate adjusted scale factor based on ingredient type
      let adjustedScaleFactor = scaleFactor
      if (scaleFactor > 1.0) {
        adjustedScaleFactor = scaleFactor * SCALING_MULTIPLIERS[ingredient.type].up
      } else if (scaleFactor < 1.0) {
        adjustedScaleFactor = scaleFactor * SCALING_MULTIPLIERS[ingredient.type].down
      }

      // Apply scaling
      let scaledQty = ingredient.quantity * adjustedScaleFactor
      let scaledQtyMax: number | undefined

      if (ingredient.quantityMax) {
        scaledQtyMax = ingredient.quantityMax * adjustedScaleFactor
      }

      // Round to practical measurements
      scaledQty = roundToPracticalMeasurement(scaledQty, ingredient.unit)
      if (scaledQtyMax) {
        scaledQtyMax = roundToPracticalMeasurement(scaledQtyMax, ingredient.unit)
      }

      const wasAdjusted = Math.abs(adjustedScaleFactor - scaleFactor) > 0.01
      const adjustmentReason = wasAdjusted ? ADJUSTMENT_NAMES[ingredient.type] : undefined

      return {
        ingredient,
        scaledQuantity: scaledQty,
        scaledQuantityMax: scaledQtyMax,
        wasAdjusted,
        adjustmentReason
      }
    })
  }, [targetServings, scaleFactor])

  // Generate warnings
  const warnings = useMemo(() => {
    const warns: Warning[] = []

    if (scaleFactor < 0.5) {
      warns.push({
        type: 'scalingFloor',
        message: 'Scaling below 50% may affect ingredient precision',
        severity: 'caution'
      })
    } else if (scaleFactor > 3.0) {
      warns.push({
        type: 'scalingCeiling',
        message: 'Large batch scaling may require equipment adjustments',
        severity: 'info'
      })
    }

    if (targetServings <= 6) {
      warns.push({
        type: 'categoryLimit',
        message: 'Very small batches of baked goods can be tricky - watch baking time carefully',
        severity: 'caution'
      })
    }

    return warns
  }, [scaleFactor, targetServings])

  return (
    <div className="w-full bg-gradient-to-br from-[#F5F1E8] to-white p-8 rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column: Scaled Recipe */}
        <div>
          <h3 className="text-lg font-bold text-[#2D2D2D] mb-4">Scaled Recipe</h3>

          {/* Recipe Card */}
          <div className="bg-white rounded-xl border-2 border-[#E85D4D]/20 shadow-2xl p-6">
            {/* Recipe Header */}
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-[#2D2D2D] mb-2">
                {SAMPLE_RECIPE.title}
              </h4>
              <div className="flex gap-4 text-sm text-gray-600">
                <span> Prep: {SAMPLE_RECIPE.prepTime}</span>
                <span> Cook: {SAMPLE_RECIPE.cookTime}</span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold text-[#E85D4D]">{targetServings}</span>
                <span className="text-sm text-gray-600"> cookies</span>
                <span className="text-xs text-gray-500 ml-2">({scaleFactor.toFixed(2)}x scale)</span>
              </div>
            </div>

            {/* Serving Size Selector */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-semibold text-[#2D2D2D] mb-2">
                Select Serving Size
              </label>
              <select
                value={targetServings}
                onChange={(e) => setTargetServings(Number(e.target.value))}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg bg-white focus:border-[#E85D4D] focus:outline-none"
              >
                <option value={6}>6 cookies (¼ batch)</option>
                <option value={12}>12 cookies (½ batch)</option>
                <option value={24}>24 cookies (original)</option>
                <option value={36}>36 cookies (1.5x batch)</option>
                <option value={48}>48 cookies (2x batch)</option>
                <option value={72}>72 cookies (3x batch)</option>
              </select>
            </div>

            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="mb-6 space-y-2">
                {warnings.map((warning, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg flex items-start gap-2 ${
                      warning.severity === 'caution'
                        ? 'bg-amber-50 border border-amber-200'
                        : 'bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <span className="text-lg">
                      {warning.severity === 'caution' ? '' : ''}
                    </span>
                    <p className="text-xs text-gray-700">
                      {warning.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Ingredients List */}
            <div>
              <h4 className="font-semibold text-[#2D2D2D] mb-3 flex items-center gap-2">
                <span></span>
                Ingredients
              </h4>
              <div className="space-y-2">
                {scaledIngredients.map((item, index) => {
                  const { ingredient, scaledQuantity, scaledQuantityMax, wasAdjusted, adjustmentReason } = item
                  const isSignificantChange = Math.abs(scaleFactor - 1.0) > 0.15

                  return (
                    <div
                      key={index}
                      className={`p-3 rounded-lg transition-colors ${
                        wasAdjusted && isSignificantChange
                          ? 'bg-purple-50 border-2 border-purple-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-[#2D2D2D]">
                              {formatQuantity(scaledQuantity, scaledQuantityMax)} {ingredient.unit}
                            </span>
                            <span className="text-gray-700">{ingredient.name}</span>
                            {wasAdjusted && isSignificantChange && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-200 text-purple-800">
                                Smart Scaled
                              </span>
                            )}
                          </div>
                          {wasAdjusted && isSignificantChange && adjustmentReason && (
                            <div className="text-xs text-gray-500 mt-1">
                              {adjustmentReason}
                            </div>
                          )}
                        </div>
                        <div className="text-right text-xs">
                          <div className="text-gray-400">
                            was: {formatQuantity(ingredient.quantity, ingredient.quantityMax)} {ingredient.unit}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Features & Explanations */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#2D2D2D]">Smart Features</h3>

          {/* Scaling Stats */}
          <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div className="flex-1">
                <p className="font-semibold text-[#2D2D2D] text-sm mb-3">Scaling Stats</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Recipe:</span>
                    <span className="font-semibold text-gray-900">{SAMPLE_RECIPE.originalServings} cookies</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Size:</span>
                    <span className="font-semibold text-[#E85D4D]">{targetServings} cookies</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Scale Factor:</span>
                    <span className="font-semibold text-gray-900">{scaleFactor.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-gray-600">Smart Adjusted:</span>
                    <span className="font-semibold text-purple-700">
                      {scaledIngredients.filter(i => i.wasAdjusted).length} ingredients
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How Smart Scaling Works */}
          <div className="rounded-lg bg-white border-2 border-[#E85D4D] p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-[#E85D4D] text-sm">How Smart Scaling Works</p>
                <p className="text-xs text-gray-600 mt-1">
                  When you double a recipe, you don't always need to double everything. Spices scale at 90%
                  (too much can overpower), eggs at 95% (rounded to whole numbers), and leavening agents
                  are adjusted precisely. The app analyzes each ingredient and applies the appropriate scaling factor.
                </p>
              </div>
            </div>
          </div>

          {/* Scaling Strategies */}
          <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl"></span>
              <div>
                <p className="font-semibold text-[#2D2D2D] text-sm mb-3">Scaling Strategies</p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span></span>
                    <div>
                      <div className="font-semibold text-gray-800">Spices & Seasonings</div>
                      <div className="text-gray-600">Scale at 90% to avoid overpowering flavors</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span></span>
                    <div>
                      <div className="font-semibold text-gray-800">Eggs</div>
                      <div className="text-gray-600">Scale at 95% and round to whole numbers</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span></span>
                    <div>
                      <div className="font-semibold text-gray-800">Leavening Agents</div>
                      <div className="text-gray-600">Precise scaling at 95% for chemistry</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span></span>
                    <div>
                      <div className="font-semibold text-gray-800">Liquids</div>
                      <div className="text-gray-600">Adjusted for evaporation in larger batches</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span></span>
                    <div>
                      <div className="font-semibold text-gray-800">Bulk Ingredients</div>
                      <div className="text-gray-600">Scale linearly (flour, sugar, butter)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-4 rounded-lg bg-purple-50 p-4 text-center border-2 border-purple-200">
            <p className="text-xs text-gray-700">
              <span className="font-bold text-purple-700">Non-linear scaling</span> prevents common baking failures like over-seasoned dishes or improperly risen baked goods when scaling recipes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper functions
function roundToPracticalMeasurement(value: number, unit: string): number {
  const lowerUnit = unit.toLowerCase()

  if (lowerUnit.includes('tsp') || lowerUnit.includes('teaspoon')) {
    // Round to nearest 1/8 tsp
    return Math.round(value * 8) / 8
  } else if (lowerUnit.includes('tbsp') || lowerUnit.includes('tablespoon')) {
    // Round to nearest 1/4 tbsp
    return Math.round(value * 4) / 4
  } else if (lowerUnit.includes('cup')) {
    // Round to nearest 1/8 cup
    return Math.round(value * 8) / 8
  } else if (lowerUnit.includes('oz') || lowerUnit.includes('ounce')) {
    // Round to nearest 0.5 oz
    return Math.round(value * 2) / 2
  } else if (lowerUnit.includes('lb') || lowerUnit.includes('pound')) {
    // Round to nearest 0.25 lb
    return Math.round(value * 4) / 4
  } else if (lowerUnit.includes('g') || lowerUnit.includes('gram')) {
    // Round to nearest 5g
    return Math.round(value / 5) * 5
  } else {
    // Round to 2 decimal places
    return Math.round(value * 100) / 100
  }
}

function formatQuantity(qty: number, qtyMax?: number): string {
  if (qtyMax) {
    return `${formatSingleQuantity(qty)}-${formatSingleQuantity(qtyMax)}`
  }
  return formatSingleQuantity(qty)
}

function formatSingleQuantity(qty: number): string {
  // Handle whole numbers
  if (Number.isInteger(qty)) {
    return qty.toString()
  }

  // Handle common fractions
  const fraction = getFraction(qty)
  if (fraction) {
    const whole = Math.floor(qty)
    if (whole > 0) {
      return `${whole} ${fraction}`
    }
    return fraction
  }

  // Default to decimal with 2 places
  return qty.toFixed(2)
}

function getFraction(decimal: number): string | null {
  const remainder = decimal % 1
  const tolerance = 0.01

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
  ]

  for (const [value, symbol] of fractions) {
    if (Math.abs(remainder - value) < tolerance) {
      return symbol
    }
  }

  return null
}

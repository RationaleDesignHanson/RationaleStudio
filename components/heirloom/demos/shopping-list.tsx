'use client'

/**
 * Heirloom Shopping List Demo
 *
 * Interactive demo showing:
 * - Smart ingredient aggregation
 * - iOS Reminders integration
 * - Auto-categorization by aisle
 * - Multi-recipe meal planning
 */

import { useState } from 'react'
import { isConvertibleVolume, convertVolume, selectBestVolumeUnit, formatQuantity } from '../shared/ingredientParser'

interface Ingredient {
  id: string
  name: string
  amount: string
  recipe: string
  aisle: string
  checked: boolean
}

interface ShoppingListDemoProps {
  dinnerPartyAdded?: boolean
}

export function ShoppingListDemo({ dinnerPartyAdded = false }: ShoppingListDemoProps) {
  const baseIngredients: Ingredient[] = [
    // Grandma's Apple Pie
    { id: '1', name: 'Apples', amount: '6 cups sliced', recipe: "Grandma's Apple Pie", aisle: 'Produce', checked: false },
    { id: '2', name: 'Sugar', amount: '1 cup', recipe: "Grandma's Apple Pie", aisle: 'Baking', checked: false },
    { id: '3', name: 'Butter', amount: '2 tbsp', recipe: "Grandma's Apple Pie", aisle: 'Dairy', checked: false },
    // Classic Chocolate Chip Cookies (public domain, 1930s Toll House recipe)
    { id: '4', name: 'Butter', amount: '1 cup (2 sticks)', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Dairy', checked: false },
    { id: '5', name: 'Sugar', amount: '¾ cup', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '6', name: 'Brown Sugar', amount: '¾ cup packed', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '7', name: 'Eggs', amount: '2 large', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Dairy', checked: false },
    { id: '8', name: 'Vanilla Extract', amount: '1 tsp', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '9', name: 'Flour', amount: '2¼ cups', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '10', name: 'Baking Soda', amount: '1 tsp', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '11', name: 'Salt', amount: '1 tsp', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
    { id: '12', name: 'Chocolate Chips', amount: '2 cups', recipe: 'Classic Chocolate Chip Cookies', aisle: 'Baking', checked: false },
  ]

  const dinnerPartyIngredients: Ingredient[] = [
    // Dinner Party Recipes
    { id: 'd1', name: 'Chicken', amount: '2 whole (×1.5 = 3 lbs)', recipe: 'Roasted Chicken', aisle: 'Meat', checked: false },
    { id: 'd2', name: 'Olive Oil', amount: '3 tbsp', recipe: 'Roasted Chicken', aisle: 'Pantry', checked: false },
    { id: 'd3', name: 'Potatoes', amount: '3 lbs', recipe: 'Garlic Mashed Potatoes', aisle: 'Produce', checked: false },
    { id: 'd4', name: 'Garlic', amount: '1 head', recipe: 'Garlic Mashed Potatoes', aisle: 'Produce', checked: false },
    { id: 'd5', name: 'Butter', amount: '4 tbsp', recipe: 'Garlic Mashed Potatoes', aisle: 'Dairy', checked: false },
    { id: 'd6', name: 'Green Beans', amount: '2 lbs', recipe: 'Green Bean Casserole', aisle: 'Produce', checked: false },
    { id: 'd7', name: 'Cream of Mushroom Soup', amount: '2 cans', recipe: 'Green Bean Casserole', aisle: 'Pantry', checked: false },
  ]

  const [ingredients, setIngredients] = useState<Ingredient[]>(
    dinnerPartyAdded ? [...baseIngredients, ...dinnerPartyIngredients] : baseIngredients
  )

  const toggleIngredient = (id: string) => {
    setIngredients(prev =>
      prev.map(ing => ing.id === id ? { ...ing, checked: !ing.checked } : ing)
    )
  }

  // Aggregate ingredients by name to show smart aggregation
  interface AggregatedIngredient {
    name: string
    totalAmount: string
    individualAmounts: string[]
    recipes: string[]
    aisle: string
    checked: boolean
    ids: string[]
  }

  // Helper function to parse and sum amounts
  const parseAmount = (amountStr: string): { value: number; unit: string; rest: string } | null => {
    // Match patterns like "2 tbsp", "1 cup", "¾ cup", "6 cups sliced"
    const match = amountStr.match(/^([\d.¼½¾⅓⅔⅛⅜⅝⅞]+)\s*([a-zA-Z]+)?(.*)/)
    if (!match) return null

    // Convert fractions to decimals
    const fractionMap: Record<string, number> = {
      '¼': 0.25, '½': 0.5, '¾': 0.75,
      '⅓': 0.33, '⅔': 0.67,
      '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875
    }

    let value = parseFloat(match[1])
    if (isNaN(value)) {
      value = fractionMap[match[1]] || 0
    }

    return {
      value,
      unit: match[2]?.toLowerCase() || '',
      rest: match[3]?.trim() || ''
    }
  }

  const formatAmount = (value: number, unit: string): string => {
    // Use the formatQuantity function from ingredientParser for proper fraction display
    const formattedQuantity = formatQuantity(value)
    return unit ? `${formattedQuantity} ${unit}` : formattedQuantity
  }

  const aggregateIngredients = (): Record<string, AggregatedIngredient[]> => {
    // First aggregate by name
    const aggregated: Record<string, AggregatedIngredient> = {}

    ingredients.forEach(ing => {
      const nameLower = ing.name.toLowerCase()

      if (!aggregated[nameLower]) {
        aggregated[nameLower] = {
          name: ing.name,
          totalAmount: ing.amount,
          individualAmounts: [ing.amount],
          recipes: [ing.recipe],
          aisle: ing.aisle,
          checked: ing.checked,
          ids: [ing.id]
        }
      } else {
        aggregated[nameLower].individualAmounts.push(ing.amount)
        if (!aggregated[nameLower].recipes.includes(ing.recipe)) {
          aggregated[nameLower].recipes.push(ing.recipe)
        }
        aggregated[nameLower].ids.push(ing.id)
      }
    })

    // Calculate totals for aggregated ingredients
    Object.values(aggregated).forEach(ing => {
      if (ing.recipes.length > 1) {
        // Try to sum up amounts
        const parsed = ing.individualAmounts.map(parseAmount).filter(p => p !== null) as Array<{ value: number; unit: string; rest: string }>

        if (parsed.length === ing.individualAmounts.length) {
          // Check if all have the same unit
          const units = parsed.map(p => p.unit)
          const sameUnit = units.every(u => u === units[0])

          if (sameUnit) {
            // Same unit - simple sum
            const total = parsed.reduce((sum, p) => sum + p.value, 0)
            ing.totalAmount = formatAmount(total, units[0])
          } else {
            // Different units - check if they're convertible volumes
            const allVolumes = parsed.every(p => isConvertibleVolume(p.unit))

            if (allVolumes) {
              // Convert all to teaspoons (base unit), sum, then convert to best display unit
              const totalInTsp = parsed.reduce((sum, p) => {
                return sum + convertVolume(p.value, p.unit, 'tsp')
              }, 0)

              const { quantity, unit } = selectBestVolumeUnit(totalInTsp)
              ing.totalAmount = formatAmount(quantity, unit)
            } else {
              // Can't convert (incompatible units), show breakdown
              ing.totalAmount = ing.individualAmounts.join(' + ')
            }
          }
        } else {
          // Can't parse, show breakdown
          ing.totalAmount = ing.individualAmounts.join(' + ')
        }
      }
    })

    // Then group by aisle
    const groupedByAisle: Record<string, AggregatedIngredient[]> = {}
    Object.values(aggregated).forEach(ing => {
      if (!groupedByAisle[ing.aisle]) {
        groupedByAisle[ing.aisle] = []
      }
      groupedByAisle[ing.aisle].push(ing)
    })

    return groupedByAisle
  }

  const groupedByAisle = aggregateIngredients()

  const aisleIcons: Record<string, string> = {
    'Produce': '🥬',
    'Dairy': '🥛',
    'Meat': '🥩',
    'Baking': '🧁',
    'Pantry': '🫙',
  }

  return (
    <div className="w-full bg-gradient-to-br from-[#F5F1E8] to-white p-8 rounded-2xl">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Shopping List View */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-[#2D2D2D]">Shopping List</h3>
          </div>

          <div className="bg-white rounded-xl border-2 border-[#2A9D8F] p-6 space-y-4 max-h-[500px] overflow-y-auto">
            {Object.entries(groupedByAisle).map(([aisle, items]) => (
              <div key={aisle} className="space-y-2">
                <h4 className="text-sm font-bold text-[#2A9D8F] flex items-center gap-2">
                  <span>{aisleIcons[aisle]}</span>
                  {aisle}
                </h4>
                {items.map((ing, idx) => (
                  <label
                    key={`${aisle}-${idx}`}
                    className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={ing.checked}
                      onChange={() => ing.ids.forEach(id => toggleIngredient(id))}
                      className="w-5 h-5 accent-[#2A9D8F] mt-0.5"
                    />
                    <div className="flex-1">
                      <div className={`${ing.checked ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                        <span className="font-medium">{ing.name}</span>
                        <span className="text-gray-600"> — {ing.totalAmount}</span>
                      </div>
                      {ing.recipes.length > 1 && (
                        <div className="mt-1 space-y-0.5">
                          <div className="inline-block bg-[#E85D4D]/10 text-[#E85D4D] text-xs font-semibold px-2 py-0.5 rounded mb-1">
                            From {ing.recipes.length} recipes
                          </div>
                          {ing.individualAmounts.map((amount, i) => (
                            <div key={i} className="text-xs text-gray-500 ml-1">
                              • {amount} <span className="text-gray-400">({ing.recipes[i]})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ))}
          </div>

          {/* Export Button */}
          <button className="mt-4 w-full px-4 py-3 bg-[#2A9D8F] text-white font-semibold rounded-lg hover:bg-[#238276] transition-colors flex items-center justify-center gap-2">
            <span></span>
            Export to iOS Reminders
          </button>
        </div>

        {/* Features Panel */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[#2D2D2D]">Smart Features</h3>

          <div className="space-y-3">
            <div className="rounded-lg bg-white border-2 border-[#E85D4D] p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#E85D4D] text-sm">Smart Aggregation</p>
                  <p className="text-xs text-gray-600 mt-1">
                    <strong>Notice:</strong> Butter and Sugar appear in multiple recipes. Heirloom automatically calculates the <strong>total amount</strong> you need to buy (e.g., "1.13 cups" instead of separate amounts). {dinnerPartyAdded && "With the dinner party added, Butter combines 3 recipes into one total! "}Expand to see the breakdown by recipe.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">Aisle Organization</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Auto-categorized by aisle (Produce, Dairy, etc.) for efficient shopping. No manual sorting needed.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">iOS Reminders Sync</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Exports as "Grocery" type reminders with location alerts. Cross-device sync via iCloud.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white border-2 border-gray-200 p-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl"></span>
                <div>
                  <p className="font-semibold text-[#2D2D2D] text-sm">Multi-Recipe Planning</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Select multiple recipes for dinner parties or meal prep. One unified shopping list.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 rounded-lg bg-[#2A9D8F]/10 p-4 text-center">
            <p className="text-2xl font-bold text-[#2A9D8F]">78%</p>
            <p className="text-xs text-gray-700 mt-1">
              of beta users cited smart shopping as premium conversion driver
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

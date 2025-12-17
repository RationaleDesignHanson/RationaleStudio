/**
 * Swift Export Utilities
 *
 * Generates Swift code from TypeScript types and JSON data
 * for easy iOS app integration
 */

import { ingredientDatabase } from './IngredientDatabase';

export class SwiftExporter {
  /**
   * Generate Swift parser types (ParsedIngredient, QuantityValue, etc.)
   */
  generateParserTypes(): string {
    return `
import Foundation

// MARK: - Parsed Ingredient

struct ParsedIngredient: Codable, Identifiable {
    let id: UUID
    let original: String
    let quantity: QuantityValue?
    let unit: UnitInfo?
    let ingredient: IngredientInfo
    let preparation: [String]
    let modifiers: [String]
    let confidence: Double
    let flags: IngredientFlags

    init(original: String, quantity: QuantityValue?, unit: UnitInfo?,
         ingredient: IngredientInfo, preparation: [String], modifiers: [String],
         confidence: Double, flags: IngredientFlags) {
        self.id = UUID()
        self.original = original
        self.quantity = quantity
        self.unit = unit
        self.ingredient = ingredient
        self.preparation = preparation
        self.modifiers = modifiers
        self.confidence = confidence
        self.flags = flags
    }
}

// MARK: - Quantity Value

struct QuantityValue: Codable {
    let type: QuantityType
    let value: Double
    let valueLow: Double?
    let valueHigh: Double?
    let display: String

    enum QuantityType: String, Codable {
        case exact
        case range
        case approximate
    }
}

// MARK: - Unit Info

struct UnitInfo: Codable {
    let canonical: String
    let original: String
    let type: UnitType
    let system: MeasurementSystem
    let mlEquivalent: Double?
    let gramEquivalent: Double?
}

enum UnitType: String, Codable {
    case volume
    case weight
    case count
    case informal
    case other
}

enum MeasurementSystem: String, Codable {
    case metric
    case imperial
    case universal
}

// MARK: - Ingredient Info

struct IngredientInfo: Codable {
    let canonical: String
    let original: String
    let category: IngredientCategory
    let subcategory: String?
    let aisleHint: String?
    let metadata: CanonicalIngredient?
}

// MARK: - Ingredient Flags

struct IngredientFlags: Codable {
    let hasQuantity: Bool
    let hasUnit: Bool
    let isApproximate: Bool
    let isRange: Bool
    let needsReview: Bool
    let isInformalUnit: Bool
    let hasAmbiguity: Bool

    static var empty: IngredientFlags {
        IngredientFlags(
            hasQuantity: false,
            hasUnit: false,
            isApproximate: false,
            isRange: false,
            needsReview: false,
            isInformalUnit: false,
            hasAmbiguity: false
        )
    }
}

// MARK: - Canonical Ingredient

struct CanonicalIngredient: Codable {
    let id: String
    let canonical: String
    let displayName: String
    let category: IngredientCategory
    let subcategory: String
    let aisleHint: String
    let defaultUnit: String
    let preferredUnits: [String]
    let density: DensityInfo?
    let variants: [IngredientVariant]
}

struct DensityInfo: Codable {
    let gramsPerCup: Double?
    let gramsPerTablespoon: Double?
    let gramsPerTeaspoon: Double?
    let source: DensitySource

    enum DensitySource: String, Codable {
        case usda
        case kingArthur = "king_arthur"
        case measured
        case estimated
    }
}

struct IngredientVariant: Codable {
    let name: String
    let modifiesDensity: Double?
    let notes: String?
}
`.trim();
  }

  /**
   * Generate Swift shopping list types
   */
  generateShoppingTypes(): string {
    return `
import Foundation

// MARK: - Recipe

struct Recipe: Codable, Identifiable {
    let id: String
    let name: String
    let servings: Int
    let ingredientLines: [String]
    let url: String?
    let image: String?
    let prepTime: Int?
    let cookTime: Int?
}

// MARK: - Pantry Item

struct PantryItem: Codable, Identifiable {
    let id: UUID
    let canonical: String
    let displayName: String
    let quantity: Double
    let unit: String?
    let category: String
    let addedAt: Date
    let expiresAt: Date?

    init(canonical: String, displayName: String, quantity: Double,
         unit: String?, category: String, addedAt: Date = Date(), expiresAt: Date? = nil) {
        self.id = UUID()
        self.canonical = canonical
        self.displayName = displayName
        self.quantity = quantity
        self.unit = unit
        self.category = category
        self.addedAt = addedAt
        self.expiresAt = expiresAt
    }
}

// MARK: - Shopping List

struct ShoppingList: Codable, Identifiable {
    let id: UUID
    let items: [ShoppingListItem]
    let summary: ShoppingListSummary
    let recipes: [Recipe]
    let lastUpdated: Date

    init(items: [ShoppingListItem], recipes: [Recipe]) {
        self.id = UUID()
        self.items = items
        self.summary = ShoppingListSummary(
            totalItems: items.count,
            totalRecipes: recipes.count,
            pantryItemsUsed: items.filter { $0.inPantry ?? 0 > 0 }.count
        )
        self.recipes = recipes
        self.lastUpdated = Date()
    }
}

struct ShoppingListSummary: Codable {
    let totalItems: Int
    let totalRecipes: Int
    let pantryItemsUsed: Int
    let estimatedCost: Double?

    init(totalItems: Int, totalRecipes: Int, pantryItemsUsed: Int, estimatedCost: Double? = nil) {
        self.totalItems = totalItems
        self.totalRecipes = totalRecipes
        self.pantryItemsUsed = pantryItemsUsed
        self.estimatedCost = estimatedCost
    }
}

// MARK: - Shopping List Item

struct ShoppingListItem: Codable, Identifiable {
    let id: UUID
    let canonical: String
    let displayName: String
    let quantity: Double?
    let unit: String?
    let category: String
    let recipes: [String]
    let needed: Double?
    let inPantry: Double?
    let hasConflict: Bool
    let conflictReason: String?
    var isChecked: Bool

    init(canonical: String, displayName: String, quantity: Double?, unit: String?,
         category: String, recipes: [String], needed: Double? = nil, inPantry: Double? = nil,
         hasConflict: Bool = false, conflictReason: String? = nil, isChecked: Bool = false) {
        self.id = UUID()
        self.canonical = canonical
        self.displayName = displayName
        self.quantity = quantity
        self.unit = unit
        self.category = category
        self.recipes = recipes
        self.needed = needed
        self.inPantry = inPantry
        self.hasConflict = hasConflict
        self.conflictReason = conflictReason
        self.isChecked = isChecked
    }
}
`.trim();
  }

  /**
   * Generate Swift feedback types
   */
  generateFeedbackTypes(): string {
    return `
import Foundation

// MARK: - Feedback Types

enum FeedbackType: String, Codable {
    case correction
    case confirmation
    case unknownIngredient = "unknown_ingredient"
    case lowConfidence = "low_confidence"
    case unitConflict = "unit_conflict"
}

struct FeedbackEvent: Codable, Identifiable {
    let id: UUID
    let timestamp: Date
    let type: FeedbackType
    let originalInput: String
    let parsedResult: ParsedIngredient
    let correction: FeedbackCorrection?
    let sessionId: String
    let userId: String?
    let metadata: [String: String]?

    init(type: FeedbackType, originalInput: String, parsedResult: ParsedIngredient,
         correction: FeedbackCorrection? = nil, sessionId: String, userId: String? = nil,
         metadata: [String: String]? = nil) {
        self.id = UUID()
        self.timestamp = Date()
        self.type = type
        self.originalInput = originalInput
        self.parsedResult = parsedResult
        self.correction = correction
        self.sessionId = sessionId
        self.userId = userId
        self.metadata = metadata
    }
}

struct FeedbackCorrection: Codable {
    let quantity: Double?
    let unit: String?
    let ingredient: String?
    let preparation: [String]?
}

// MARK: - Analytics

struct FeedbackAnalytics: Codable {
    let overallAccuracy: Double
    let quantityAccuracy: Double
    let unitAccuracy: Double
    let ingredientAccuracy: Double
    let totalEvents: Int
    let corrections: Int
    let confirmations: Int
    let confidenceDistribution: ConfidenceDistribution
    let categoryBreakdown: [String: CategoryMetrics]
    let topFailures: [FailureReport]
    let suggestions: [String]
}

struct ConfidenceDistribution: Codable {
    let high: Int
    let medium: Int
    let low: Int

    var total: Int {
        high + medium + low
    }
}

struct CategoryMetrics: Codable {
    let category: String
    let total: Int
    let correct: Int
    let accuracy: Double
}

struct FailureReport: Codable, Identifiable {
    let id: UUID
    let input: String
    let count: Int
    let averageConfidence: Double

    init(input: String, count: Int, averageConfidence: Double) {
        self.id = UUID()
        self.input = input
        self.count = count
        self.averageConfidence = averageConfidence
    }
}
`.trim();
  }

  /**
   * Generate Swift struct for Ingredient
   */
  generateIngredientStruct(): string {
    return `
import Foundation

struct Ingredient: Codable, Identifiable, Hashable {
    let id: String
    let canonical: String
    let displayName: String
    let category: IngredientCategory
    let subcategory: String
    let aisleHint: String
    let density: Double?
    let densityUnit: String?
    let note: String?

    enum CodingKeys: String, CodingKey {
        case id, canonical, displayName, category, subcategory, aisleHint
        case density, densityUnit, note
    }
}

enum IngredientCategory: String, Codable, CaseIterable {
    case baking
    case dairy
    case produce
    case meat
    case seafood
    case grains
    case bakery
    case pantry
    case oils
    case spices
    case condiments
    case other

    var displayName: String {
        switch self {
        case .baking: return "Baking"
        case .dairy: return "Dairy & Eggs"
        case .produce: return "Produce"
        case .meat: return "Meat & Poultry"
        case .seafood: return "Seafood"
        case .grains: return "Grains & Pasta"
        case .bakery: return "Bakery"
        case .pantry: return "Pantry"
        case .oils: return "Oils & Vinegars"
        case .spices: return "Spices & Seasonings"
        case .condiments: return "Condiments & Sauces"
        case .other: return "Other"
        }
    }

    var icon: String {
        switch self {
        case .baking: return "🍞"
        case .dairy: return "🥛"
        case .produce: return "🥕"
        case .meat: return "🍖"
        case .seafood: return "🐟"
        case .grains: return "🌾"
        case .bakery: return "🥖"
        case .pantry: return "🥫"
        case .oils: return "🛢️"
        case .spices: return "🌶️"
        case .condiments: return "🥫"
        case .other: return "📦"
        }
    }
}
`.trim();
  }

  /**
   * Generate Swift struct for Synonym
   */
  generateSynonymStruct(): string {
    return `
import Foundation

struct SynonymMapping: Codable {
    let canonical: String
    let synonyms: [SynonymTerm]
}

struct SynonymTerm: Codable {
    let term: String
    let confidence: Double
    let region: Region?
}

enum Region: String, Codable {
    case us = "US"
    case uk = "UK"
    case au = "AU"
    case ca = "CA"

    var displayName: String {
        switch self {
        case .us: return "United States"
        case .uk: return "United Kingdom"
        case .au: return "Australia"
        case .ca: return "Canada"
        }
    }
}
`.trim();
  }

  /**
   * Generate Swift struct for Unit
   */
  generateUnitStruct(): string {
    return `
import Foundation

struct Unit: Codable, Identifiable {
    let canonical: String
    let abbreviations: [String]
    let type: UnitType
    let system: MeasurementSystem
    let mlEquivalent: Double?
    let gramEquivalent: Double?
    let regional: [String: Double]?

    var id: String { canonical }
}

enum UnitType: String, Codable {
    case volume
    case weight
    case count
    case informal
    case other
}

enum MeasurementSystem: String, Codable {
    case metric
    case imperial
    case universal
}
`.trim();
  }

  /**
   * Generate Swift database manager
   */
  generateDatabaseManager(): string {
    const stats = ingredientDatabase.getStats();

    return `
import Foundation

class IngredientDatabase {
    static let shared = IngredientDatabase()

    private var ingredients: [String: Ingredient] = [:]
    private var ingredientsByCanonical: [String: Ingredient] = [:]
    private var ingredientsByCategory: [IngredientCategory: [Ingredient]] = [:]
    private var synonymMappings: [String: SynonymMapping] = [:]
    private var units: [String: Unit] = [:]

    private init() {
        loadData()
    }

    private func loadData() {
        // Load from bundled JSON files
        loadIngredients()
        loadSynonyms()
        loadUnits()
    }

    private func loadIngredients() {
        guard let url = Bundle.main.url(forResource: "ingredients", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let json = try? JSONDecoder().decode(IngredientsData.self, from: data) else {
            return
        }

        for ingredient in json.ingredients {
            ingredients[ingredient.id] = ingredient
            ingredientsByCanonical[ingredient.canonical.lowercased()] = ingredient

            // Index by category
            if ingredientsByCategory[ingredient.category] == nil {
                ingredientsByCategory[ingredient.category] = []
            }
            ingredientsByCategory[ingredient.category]?.append(ingredient)
        }
    }

    private func loadSynonyms() {
        guard let url = Bundle.main.url(forResource: "synonyms", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let json = try? JSONDecoder().decode(SynonymsData.self, from: data) else {
            return
        }

        for mapping in json.mappings {
            synonymMappings[mapping.canonical.lowercased()] = mapping
        }
    }

    private func loadUnits() {
        guard let url = Bundle.main.url(forResource: "units", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let json = try? JSONDecoder().decode(UnitsData.self, from: data) else {
            return
        }

        for unit in json.units {
            units[unit.canonical.lowercased()] = unit
        }
    }

    // MARK: - Ingredient Lookups

    func getIngredient(byId id: String) -> Ingredient? {
        return ingredients[id]
    }

    func getIngredient(byCanonical canonical: String) -> Ingredient? {
        return ingredientsByCanonical[canonical.lowercased()]
    }

    func getAllIngredients() -> [Ingredient] {
        return Array(ingredients.values)
    }

    func getIngredients(inCategory category: IngredientCategory) -> [Ingredient] {
        return ingredientsByCategory[category] ?? []
    }

    func searchIngredients(query: String) -> [Ingredient] {
        let lowercased = query.lowercased()
        return getAllIngredients().filter {
            $0.canonical.lowercased().contains(lowercased) ||
            $0.displayName.lowercased().contains(lowercased)
        }
    }

    // MARK: - Synonym Lookups

    func getSynonyms(forCanonical canonical: String) -> SynonymMapping? {
        return synonymMappings[canonical.lowercased()]
    }

    func normalize(ingredientName: String) -> String {
        let lowercased = ingredientName.lowercased()

        // Check if it's already canonical
        if ingredientsByCanonical[lowercased] != nil {
            return ingredientName
        }

        // Check synonyms
        for (canonical, mapping) in synonymMappings {
            if mapping.synonyms.contains(where: { $0.term.lowercased() == lowercased }) {
                return canonical
            }
        }

        return ingredientName
    }

    // MARK: - Unit Lookups

    func getUnit(byCanonical canonical: String) -> Unit? {
        return units[canonical.lowercased()]
    }

    func getAllUnits() -> [Unit] {
        return Array(units.values)
    }

    func getUnits(ofType type: UnitType) -> [Unit] {
        return getAllUnits().filter { $0.type == type }
    }

    // MARK: - Statistics

    func getStats() -> DatabaseStats {
        return DatabaseStats(
            ingredientCount: ingredients.count,
            synonymMappingCount: synonymMappings.count,
            totalSynonymTerms: synonymMappings.values.reduce(0) { $0 + $1.synonyms.count },
            unitCount: units.count,
            categoryCounts: Dictionary(
                grouping: getAllIngredients(),
                by: { $0.category }
            ).mapValues { $0.count }
        )
    }
}

// MARK: - Supporting Types

struct IngredientsData: Codable {
    let version: String
    let lastUpdated: String
    let ingredients: [Ingredient]
}

struct SynonymsData: Codable {
    let version: String
    let lastUpdated: String
    let mappings: [SynonymMapping]
}

struct UnitsData: Codable {
    let version: String
    let lastUpdated: String
    let units: [Unit]
}

struct DatabaseStats {
    let ingredientCount: Int
    let synonymMappingCount: Int
    let totalSynonymTerms: Int
    let unitCount: Int
    let categoryCounts: [IngredientCategory: Int]
}
`.trim();
  }

  /**
   * Generate complete Swift package
   */
  generateCompleteSwiftPackage(): {
    parserTypes: string;
    shoppingTypes: string;
    feedbackTypes: string;
    ingredientTypes: string;
    database: string;
    readme: string;
  } {
    const parserTypes = this.generateParserTypes();
    const shoppingTypes = this.generateShoppingTypes();
    const feedbackTypes = this.generateFeedbackTypes();

    const ingredientTypes = [
      this.generateIngredientStruct(),
      '',
      this.generateSynonymStruct(),
      '',
      this.generateUnitStruct(),
    ].join('\n');

    const database = this.generateDatabaseManager();
    const readme = this.generateSwiftReadme();

    return {
      parserTypes,
      shoppingTypes,
      feedbackTypes,
      ingredientTypes,
      database,
      readme,
    };
  }

  /**
   * Generate Swift integration README
   */
  private generateSwiftReadme(): string {
    const stats = ingredientDatabase.getStats();

    return `# Heirloom Shopping Lab - Swift Integration

## Overview

Complete Swift type system for the Heirloom ingredient parsing and shopping list consolidation system. This package enables you to build iOS apps that parse recipe ingredients, normalize them, and generate consolidated shopping lists.

## Features

### Parser Types
- \`ParsedIngredient\` - Complete parse result with quantity, unit, ingredient, and metadata
- \`QuantityValue\` - Exact values, ranges (2-3 cups), and approximations
- \`UnitInfo\` - Full unit information with conversion equivalents
- \`IngredientFlags\` - Parse metadata (hasQuantity, isRange, needsReview, etc.)

### Shopping List Types
- \`Recipe\` - Recipe with ingredients, servings, and metadata
- \`ShoppingList\` - Consolidated list from multiple recipes
- \`ShoppingListItem\` - Individual items with pantry subtraction
- \`PantryItem\` - Track what you already have at home

### Feedback & Analytics
- \`FeedbackEvent\` - User corrections and confirmations
- \`FeedbackAnalytics\` - Accuracy metrics and improvement suggestions
- \`ConfidenceDistribution\` - Track high/medium/low confidence parses

### Database
- **${stats.ingredientCount} ingredients** with USDA-sourced density data
- **${stats.synonymMappingCount} synonym mappings** (${stats.totalSynonymTerms} total terms)
- **${stats.unitCount} units** with regional variants (US/UK/AU)
- **${Object.keys(stats.categoryCounts).length} categories** for grocery organization

## Installation

1. Copy the generated Swift files to your Xcode project:
   - \`ParserTypes.swift\` - Core parsing structures
   - \`ShoppingTypes.swift\` - Recipe and shopping list types
   - \`FeedbackTypes.swift\` - User feedback and analytics
   - \`IngredientTypes.swift\` - Ingredient, synonym, and unit definitions
   - \`IngredientDatabase.swift\` - Database manager

2. Add the JSON data files to your bundle:
   - \`ingredients.json\`
   - \`synonyms.json\`
   - \`units.json\`

## Usage

### Basic Lookup

\`\`\`swift
let db = IngredientDatabase.shared

// Get ingredient by canonical name
if let ingredient = db.getIngredient(byCanonical: "tomato") {
    print("Found: \\(ingredient.displayName)")
    print("Category: \\(ingredient.category.displayName)")
    print("Density: \\(ingredient.density ?? 0) g/cup")
}
\`\`\`

### Normalize Ingredient Names

\`\`\`swift
// Normalize regional variants
let normalized = db.normalize(ingredientName: "aubergine")
print(normalized)  // "eggplant"

// Normalize synonyms
let canonical = db.normalize(ingredientName: "scallions")
print(canonical)  // "green onion"
\`\`\`

### Search Ingredients

\`\`\`swift
let results = db.searchIngredients(query: "onion")
for ingredient in results {
    print(ingredient.displayName)
}
// Output: Onion, Green Onion, etc.
\`\`\`

### Get by Category

\`\`\`swift
let produce = db.getIngredients(inCategory: .produce)
print("Found \\(produce.count) produce items")
\`\`\`

### Database Statistics

\`\`\`swift
let stats = db.getStats()
print("Total ingredients: \\(stats.ingredientCount)")
print("Total synonyms: \\(stats.totalSynonymTerms)")

for (category, count) in stats.categoryCounts {
    print("\\(category.displayName): \\(count) items")
}
\`\`\`

## Type Safety

All enums and structs are type-safe and conform to \`Codable\` for easy JSON serialization.

### Ingredient Categories

\`\`\`swift
enum IngredientCategory: String, Codable {
    case baking, dairy, produce, meat, seafood
    case grains, bakery, pantry, oils, spices
    case condiments, other
}
\`\`\`

### Unit Types

\`\`\`swift
enum UnitType: String, Codable {
    case volume, weight, count, informal, other
}
\`\`\`

## Performance

- **In-memory caching**: All data loaded on initialization
- **O(1) lookups**: Dictionary-based indexing
- **Lazy loading**: Data loaded only when accessed
- **Thread-safe**: Singleton pattern with immutable data

## Data Updates

To update the ingredient database:

1. Export latest JSON from the TypeScript system
2. Replace JSON files in Xcode bundle
3. Rebuild app

No code changes needed!

## License

MIT License - Part of the Heirloom project
`;
  }

  /**
   * Generate Swift test file
   */
  generateSwiftTests(): string {
    return `
import XCTest
@testable import YourAppName

// MARK: - Database Tests

class IngredientDatabaseTests: XCTestCase {
    var database: IngredientDatabase!

    override func setUp() {
        super.setUp()
        database = IngredientDatabase.shared
    }

    func testGetIngredientById() {
        let butter = database.getIngredient(byId: "butter")
        XCTAssertNotNil(butter)
        XCTAssertEqual(butter?.canonical, "butter")
        XCTAssertEqual(butter?.category, .dairy)
    }

    func testGetIngredientByCanonical() {
        let tomato = database.getIngredient(byCanonical: "tomato")
        XCTAssertNotNil(tomato)
        XCTAssertEqual(tomato?.category, .produce)
    }

    func testNormalizeSynonym() {
        let normalized = database.normalize(ingredientName: "scallions")
        XCTAssertEqual(normalized, "green onion")
    }

    func testNormalizeRegionalVariant() {
        let normalized = database.normalize(ingredientName: "aubergine")
        XCTAssertEqual(normalized, "eggplant")
    }

    func testSearchIngredients() {
        let results = database.searchIngredients(query: "onion")
        XCTAssertGreaterThan(results.count, 0)
        XCTAssertTrue(results.contains { $0.canonical == "onion" })
    }

    func testGetByCategory() {
        let dairy = database.getIngredients(inCategory: .dairy)
        XCTAssertGreaterThan(dairy.count, 0)
        XCTAssertTrue(dairy.allSatisfy { $0.category == .dairy })
    }

    func testDatabaseStats() {
        let stats = database.getStats()
        XCTAssertGreaterThan(stats.ingredientCount, 0)
        XCTAssertGreaterThan(stats.synonymMappingCount, 0)
        XCTAssertGreaterThan(stats.unitCount, 0)
    }

    func testDensityData() {
        let flour = database.getIngredient(byCanonical: "all-purpose flour")
        XCTAssertNotNil(flour?.density)
        XCTAssertEqual(flour?.density, 125.0, accuracy: 0.1)
    }

    func testUnitLookup() {
        let cup = database.getUnit(byCanonical: "cup")
        XCTAssertNotNil(cup)
        XCTAssertEqual(cup?.type, .volume)
    }

    func testGetUnitsByType() {
        let volumeUnits = database.getUnits(ofType: .volume)
        XCTAssertGreaterThan(volumeUnits.count, 0)
        XCTAssertTrue(volumeUnits.allSatisfy { $0.type == .volume })
    }
}

// MARK: - Parser Type Tests

class ParserTypeTests: XCTestCase {
    func testQuantityValueExact() {
        let quantity = QuantityValue(
            type: .exact,
            value: 2.5,
            valueLow: nil,
            valueHigh: nil,
            display: "2½"
        )
        XCTAssertEqual(quantity.type, .exact)
        XCTAssertEqual(quantity.value, 2.5)
        XCTAssertNil(quantity.valueLow)
        XCTAssertNil(quantity.valueHigh)
    }

    func testQuantityValueRange() {
        let quantity = QuantityValue(
            type: .range,
            value: 2.5,
            valueLow: 2.0,
            valueHigh: 3.0,
            display: "2-3"
        )
        XCTAssertEqual(quantity.type, .range)
        XCTAssertEqual(quantity.value, 2.5)
        XCTAssertEqual(quantity.valueLow, 2.0)
        XCTAssertEqual(quantity.valueHigh, 3.0)
    }

    func testQuantityValueApproximate() {
        let quantity = QuantityValue(
            type: .approximate,
            value: 2.0,
            valueLow: nil,
            valueHigh: nil,
            display: "about 2"
        )
        XCTAssertEqual(quantity.type, .approximate)
        XCTAssertEqual(quantity.value, 2.0)
    }

    func testUnitInfo() {
        let unit = UnitInfo(
            canonical: "cup",
            original: "c",
            type: .volume,
            system: .imperial,
            mlEquivalent: 236.588,
            gramEquivalent: nil
        )
        XCTAssertEqual(unit.canonical, "cup")
        XCTAssertEqual(unit.type, .volume)
        XCTAssertEqual(unit.system, .imperial)
        XCTAssertNotNil(unit.mlEquivalent)
    }

    func testIngredientFlags() {
        let flags = IngredientFlags(
            hasQuantity: true,
            hasUnit: true,
            isApproximate: false,
            isRange: false,
            needsReview: false,
            isInformalUnit: false,
            hasAmbiguity: false
        )
        XCTAssertTrue(flags.hasQuantity)
        XCTAssertTrue(flags.hasUnit)
        XCTAssertFalse(flags.needsReview)
    }

    func testParsedIngredient() {
        let quantity = QuantityValue(type: .exact, value: 2.0, valueLow: nil, valueHigh: nil, display: "2")
        let unit = UnitInfo(canonical: "cup", original: "cups", type: .volume, system: .imperial, mlEquivalent: 236.588, gramEquivalent: nil)
        let ingredient = IngredientInfo(canonical: "all-purpose flour", original: "flour", category: .baking, subcategory: nil, aisleHint: nil, metadata: nil)
        let flags = IngredientFlags.empty

        let parsed = ParsedIngredient(
            original: "2 cups flour",
            quantity: quantity,
            unit: unit,
            ingredient: ingredient,
            preparation: [],
            modifiers: [],
            confidence: 0.95,
            flags: flags
        )

        XCTAssertEqual(parsed.original, "2 cups flour")
        XCTAssertEqual(parsed.quantity?.value, 2.0)
        XCTAssertEqual(parsed.unit?.canonical, "cup")
        XCTAssertEqual(parsed.ingredient.canonical, "all-purpose flour")
        XCTAssertGreaterThan(parsed.confidence, 0.9)
    }
}

// MARK: - Shopping List Type Tests

class ShoppingTypeTests: XCTestCase {
    func testRecipe() {
        let recipe = Recipe(
            id: "test-recipe",
            name: "Test Cookies",
            servings: 24,
            ingredientLines: ["2 cups flour", "1 cup sugar"],
            url: nil,
            image: nil,
            prepTime: 15,
            cookTime: 12
        )

        XCTAssertEqual(recipe.id, "test-recipe")
        XCTAssertEqual(recipe.name, "Test Cookies")
        XCTAssertEqual(recipe.servings, 24)
        XCTAssertEqual(recipe.ingredientLines.count, 2)
    }

    func testPantryItem() {
        let pantryItem = PantryItem(
            canonical: "all-purpose flour",
            displayName: "All-Purpose Flour",
            quantity: 5.0,
            unit: "cup",
            category: "Baking"
        )

        XCTAssertEqual(pantryItem.canonical, "all-purpose flour")
        XCTAssertEqual(pantryItem.quantity, 5.0)
        XCTAssertEqual(pantryItem.unit, "cup")
        XCTAssertEqual(pantryItem.category, "Baking")
    }

    func testShoppingListItem() {
        let item = ShoppingListItem(
            canonical: "all-purpose flour",
            displayName: "All-Purpose Flour",
            quantity: 4.0,
            unit: "cup",
            category: "Baking",
            recipes: ["Cookies", "Cake"],
            needed: 2.0,
            inPantry: 2.0,
            hasConflict: false,
            conflictReason: nil
        )

        XCTAssertEqual(item.canonical, "all-purpose flour")
        XCTAssertEqual(item.quantity, 4.0)
        XCTAssertEqual(item.recipes.count, 2)
        XCTAssertEqual(item.needed, 2.0)
        XCTAssertEqual(item.inPantry, 2.0)
        XCTAssertFalse(item.hasConflict)
    }

    func testShoppingList() {
        let recipe = Recipe(id: "1", name: "Test", servings: 4, ingredientLines: ["2 cups flour"])
        let item = ShoppingListItem(
            canonical: "flour",
            displayName: "Flour",
            quantity: 2.0,
            unit: "cup",
            category: "Baking",
            recipes: ["Test"]
        )

        let list = ShoppingList(items: [item], recipes: [recipe])

        XCTAssertEqual(list.items.count, 1)
        XCTAssertEqual(list.recipes.count, 1)
        XCTAssertEqual(list.summary.totalItems, 1)
        XCTAssertEqual(list.summary.totalRecipes, 1)
    }
}

// MARK: - Feedback Type Tests

class FeedbackTypeTests: XCTestCase {
    func testFeedbackEvent() {
        let quantity = QuantityValue(type: .exact, value: 2.0, valueLow: nil, valueHigh: nil, display: "2")
        let unit = UnitInfo(canonical: "cup", original: "cups", type: .volume, system: .imperial, mlEquivalent: nil, gramEquivalent: nil)
        let ingredient = IngredientInfo(canonical: "flour", original: "flour", category: .baking, subcategory: nil, aisleHint: nil, metadata: nil)
        let parsed = ParsedIngredient(
            original: "2 cups flour",
            quantity: quantity,
            unit: unit,
            ingredient: ingredient,
            preparation: [],
            modifiers: [],
            confidence: 0.95,
            flags: IngredientFlags.empty
        )

        let event = FeedbackEvent(
            type: .confirmation,
            originalInput: "2 cups flour",
            parsedResult: parsed,
            sessionId: "test-session"
        )

        XCTAssertEqual(event.type, .confirmation)
        XCTAssertEqual(event.originalInput, "2 cups flour")
        XCTAssertEqual(event.sessionId, "test-session")
    }

    func testFeedbackCorrection() {
        let correction = FeedbackCorrection(
            quantity: 2.5,
            unit: "cup",
            ingredient: "all-purpose flour",
            preparation: ["sifted"]
        )

        XCTAssertEqual(correction.quantity, 2.5)
        XCTAssertEqual(correction.unit, "cup")
        XCTAssertEqual(correction.ingredient, "all-purpose flour")
        XCTAssertEqual(correction.preparation?.first, "sifted")
    }

    func testConfidenceDistribution() {
        let distribution = ConfidenceDistribution(high: 80, medium: 15, low: 5)

        XCTAssertEqual(distribution.high, 80)
        XCTAssertEqual(distribution.medium, 15)
        XCTAssertEqual(distribution.low, 5)
        XCTAssertEqual(distribution.total, 100)
    }

    func testCategoryMetrics() {
        let metrics = CategoryMetrics(
            category: "Baking",
            total: 100,
            correct: 95,
            accuracy: 0.95
        )

        XCTAssertEqual(metrics.category, "Baking")
        XCTAssertEqual(metrics.total, 100)
        XCTAssertEqual(metrics.correct, 95)
        XCTAssertEqual(metrics.accuracy, 0.95, accuracy: 0.01)
    }
}

// MARK: - Codable Tests

class CodabilityTests: XCTestCase {
    func testParsedIngredientCodable() throws {
        let quantity = QuantityValue(type: .exact, value: 2.0, valueLow: nil, valueHigh: nil, display: "2")
        let unit = UnitInfo(canonical: "cup", original: "cups", type: .volume, system: .imperial, mlEquivalent: nil, gramEquivalent: nil)
        let ingredient = IngredientInfo(canonical: "flour", original: "flour", category: .baking, subcategory: nil, aisleHint: nil, metadata: nil)
        let parsed = ParsedIngredient(
            original: "2 cups flour",
            quantity: quantity,
            unit: unit,
            ingredient: ingredient,
            preparation: [],
            modifiers: [],
            confidence: 0.95,
            flags: IngredientFlags.empty
        )

        let encoder = JSONEncoder()
        let data = try encoder.encode(parsed)

        let decoder = JSONDecoder()
        let decoded = try decoder.decode(ParsedIngredient.self, from: data)

        XCTAssertEqual(decoded.original, parsed.original)
        XCTAssertEqual(decoded.confidence, parsed.confidence, accuracy: 0.01)
    }

    func testShoppingListCodable() throws {
        let recipe = Recipe(id: "1", name: "Test", servings: 4, ingredientLines: ["2 cups flour"])
        let item = ShoppingListItem(
            canonical: "flour",
            displayName: "Flour",
            quantity: 2.0,
            unit: "cup",
            category: "Baking",
            recipes: ["Test"]
        )
        let list = ShoppingList(items: [item], recipes: [recipe])

        let encoder = JSONEncoder()
        let data = try encoder.encode(list)

        let decoder = JSONDecoder()
        let decoded = try decoder.decode(ShoppingList.self, from: data)

        XCTAssertEqual(decoded.items.count, list.items.count)
        XCTAssertEqual(decoded.recipes.count, list.recipes.count)
    }
}
`.trim();
  }
}

// Export singleton
export const swiftExporter = new SwiftExporter();

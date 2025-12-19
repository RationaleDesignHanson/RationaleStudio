# Heirloom - Code Snippets for Implementation

## 1. RecipeComment Model

```swift
import Foundation
import SwiftData
import UIKit

@Model
final class RecipeComment {
    var id: UUID = UUID()
    var recipeId: UUID
    var authorName: String
    var authorId: String? // CloudKit user record ID
    var text: String
    var createdDate: Date = Date()
    var updatedDate: Date?
    var likes: Int = 0
    
    // For threading
    var parentCommentId: UUID? // nil for root comments
    
    // Moderation
    var isModerated: Bool = false
    var reportCount: Int = 0
    
    // Relationship
    var recipe: Recipe?
    
    init(
        recipeId: UUID,
        authorName: String,
        text: String,
        authorId: String? = nil,
        parentCommentId: UUID? = nil
    ) {
        self.id = UUID()
        self.recipeId = recipeId
        self.authorName = authorName
        self.text = text
        self.authorId = authorId
        self.createdDate = Date()
        self.parentCommentId = parentCommentId
    }
    
    // Computed properties
    var timeAgo: String {
        let calendar = Calendar.current
        let components = calendar.dateComponents([.minute, .hour, .day], from: createdDate, to: Date())
        
        if let days = components.day, days > 0 {
            return "\(days)d ago"
        } else if let hours = components.hour, hours > 0 {
            return "\(hours)h ago"
        } else if let minutes = components.minute, minutes > 0 {
            return "\(minutes)m ago"
        } else {
            return "just now"
        }
    }
    
    var isEditable: Bool {
        // Allow editing within 1 hour of creation
        let oneHourAgo = Date().addingTimeInterval(-3600)
        return createdDate > oneHourAgo
    }
}
```

## 2. CardBack Model

```swift
import Foundation
import SwiftData

@Model
final class RecipeCardBack {
    var id: UUID = UUID()
    
    // Back style
    enum BackStyle: String, Codable {
        case blank = "blank"
        case memoryJournal = "memoryJournal"
        case familyTree = "familyTree"
        case variationLog = "variationLog"
    }
    
    enum LineStyle: String, Codable {
        case ruled = "ruled"
        case grid = "grid"
        case dots = "dots"
        case blank = "blank"
    }
    
    var backStyle: BackStyle = .blank
    var customContent: String? // User's story/memory
    var backgroundColorHex: String? // "#FEFDFB" etc
    var lineStyle: LineStyle = .ruled
    var showPassDownInfo: Bool = true // Show generation/author info
    
    // Optional: show all comments on back
    var showCommentsSummary: Bool = false
    
    var createdDate: Date = Date()
    var lastModified: Date = Date()
    
    // Relationship (1:1 with Recipe)
    var recipe: Recipe?
    
    init(
        backStyle: BackStyle = .blank,
        backgroundColorHex: String? = nil
    ) {
        self.id = UUID()
        self.backStyle = backStyle
        self.backgroundColorHex = backgroundColorHex
        self.createdDate = Date()
        self.lastModified = Date()
    }
}
```

## 3. Recipe Model Updates

```swift
// Add to Recipe.swift in the Social section:

// In model definition:
@Relationship(deleteRule: .cascade, inverse: \RecipeComment.recipe)
var comments: [RecipeComment]?

@Relationship(deleteRule: .cascade, inverse: \RecipeCardBack.recipe)
var cardBack: RecipeCardBack?

// Add computed property:
var commentCount: Int {
    comments?.count ?? 0
}

var hasComments: Bool {
    commentCount > 0
}
```

## 4. CommentService Skeleton

```swift
import Foundation
import SwiftData

@MainActor
class CommentService {
    static let shared = CommentService()
    
    private init() {}
    
    // MARK: - CRUD Operations
    
    func fetchComments(
        for recipe: Recipe,
        modelContext: ModelContext,
        sort: CommentSort = .newest
    ) throws -> [RecipeComment] {
        let descriptor = FetchDescriptor<RecipeComment>(
            predicate: #Predicate { $0.recipeId == recipe.id },
            sortBy: [
                sort.sortDescriptor
            ]
        )
        return try modelContext.fetch(descriptor)
    }
    
    func postComment(
        recipe: Recipe,
        text: String,
        authorName: String,
        authorId: String? = nil,
        modelContext: ModelContext
    ) throws -> RecipeComment {
        let comment = RecipeComment(
            recipeId: recipe.id,
            authorName: authorName,
            text: text,
            authorId: authorId
        )
        
        comment.recipe = recipe
        modelContext.insert(comment)
        try modelContext.save()
        
        // Track analytics
        AnalyticsService.shared.track(
            event: .recipeCommented,
            properties: ["recipe": recipe.title]
        )
        
        return comment
    }
    
    func deleteComment(_ comment: RecipeComment, modelContext: ModelContext) throws {
        modelContext.delete(comment)
        try modelContext.save()
    }
    
    func likeComment(_ comment: RecipeComment, modelContext: ModelContext) throws {
        comment.likes += 1
        comment.updatedDate = Date()
        try modelContext.save()
    }
    
    // MARK: - CloudKit Sync
    
    func syncComments(recipe: Recipe) async throws {
        // TODO: Implement CloudKit sync
        // Use CloudKitShareService as reference
    }
    
    enum CommentSort {
        case newest
        case oldest
        case mostLiked
        
        var sortDescriptor: SortDescriptor<RecipeComment> {
            switch self {
            case .newest:
                return SortDescriptor(\RecipeComment.createdDate, order: .reverse)
            case .oldest:
                return SortDescriptor(\RecipeComment.createdDate, order: .forward)
            case .mostLiked:
                return SortDescriptor(\RecipeComment.likes, order: .reverse)
            }
        }
    }
}
```

## 5. RecipeCommentView

```swift
import SwiftUI

struct RecipeCommentView: View {
    let comment: RecipeComment
    var onLike: () -> Void = {}
    var onReply: () -> Void = {}
    
    var body: some View {
        VStack(alignment: .leading, spacing: HeirloomSpacing.sm) {
            // Header
            HStack {
                // Author info
                VStack(alignment: .leading, spacing: 2) {
                    Text(comment.authorName)
                        .font(HeirloomFonts.bodyBold)
                        .foregroundStyle(HeirloomColors.primaryText)
                    
                    Text(comment.timeAgo)
                        .font(HeirloomFonts.caption2)
                        .foregroundStyle(HeirloomColors.secondaryText)
                }
                
                Spacer()
                
                // Moderation badge if needed
                if comment.isModerated {
                    Label("Moderated", systemImage: "exclamationmark.circle")
                        .font(HeirloomFonts.caption2)
                        .foregroundStyle(.orange)
                }
            }
            
            // Comment text
            Text(comment.text)
                .font(HeirloomFonts.body)
                .foregroundStyle(HeirloomColors.primaryText)
                .lineLimit(nil)
            
            // Actions
            HStack(spacing: HeirloomSpacing.lg) {
                Button {
                    onLike()
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: "heart")
                        Text("\(comment.likes)")
                    }
                    .font(HeirloomFonts.caption2)
                    .foregroundStyle(HeirloomColors.secondaryText)
                }
                .buttonStyle(.plain)
                
                Button {
                    onReply()
                } label: {
                    HStack(spacing: 4) {
                        Image(systemName: "arrowshape.turn.up.left")
                        Text("Reply")
                    }
                    .font(HeirloomFonts.caption2)
                    .foregroundStyle(HeirloomColors.secondaryText)
                }
                .buttonStyle(.plain)
                
                Spacer()
                
                Menu {
                    Button(role: .destructive) {
                        // Report comment
                    } label: {
                        Label("Report", systemImage: "flag")
                    }
                } label: {
                    Image(systemName: "ellipsis")
                        .font(.caption)
                        .foregroundStyle(HeirloomColors.secondaryText)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(HeirloomSpacing.md)
        .background(Color.gray.opacity(0.05))
        .cornerRadius(12)
    }
}

#Preview {
    let comment = RecipeComment(
        recipeId: UUID(),
        authorName: "Sarah",
        text: "This recipe turned out amazing! I added a bit more vanilla and reduced the baking time by 2 minutes."
    )
    return RecipeCommentView(comment: comment)
}
```

## 6. FlipCard Component

```swift
import SwiftUI

struct FlipCard<Front: View, Back: View>: View {
    let frontContent: Front
    let backContent: Back
    
    @State private var isFlipped = false
    @State private var animationProgress: Double = 0
    
    var body: some View {
        ZStack {
            // Front side
            if !isFlipped {
                frontContent
                    .transition(.asymmetric(
                        insertion: .opacity.animation(.easeInOut(duration: 0.3)),
                        removal: .opacity.animation(.easeInOut(duration: 0.3))
                    ))
            }
            
            // Back side
            if isFlipped {
                backContent
                    .transition(.asymmetric(
                        insertion: .opacity.animation(.easeInOut(duration: 0.3)),
                        removal: .opacity.animation(.easeInOut(duration: 0.3))
                    ))
            }
        }
        .rotation3DEffect(
            .degrees(isFlipped ? 180 : 0),
            axis: (x: 0, y: 1, z: 0)
        )
        .animation(.spring(response: 0.6, dampingFraction: 0.8), value: isFlipped)
        .onTapGesture {
            isFlipped.toggle()
            
            let generator = UIImpactFeedbackGenerator(style: .medium)
            generator.impactOccurred()
        }
        .gesture(
            DragGesture()
                .onEnded { value in
                    if abs(value.translation.width) > 50 {
                        withAnimation(.spring(response: 0.6, dampingFraction: 0.8)) {
                            isFlipped.toggle()
                        }
                        
                        let generator = UIImpactFeedbackGenerator(style: .light)
                        generator.impactOccurred()
                    }
                }
        )
    }
}

// Usage:
struct CardExample: View {
    var body: some View {
        FlipCard(
            frontContent: {
                VStack {
                    Text("Front of card")
                    Text("Tap or swipe to flip")
                }
                .frame(height: 400)
                .frame(maxWidth: .infinity)
                .background(HeirloomColors.cream)
                .cornerRadius(16)
            },
            backContent: {
                VStack {
                    Text("Back of card")
                    Text("Your custom content here")
                }
                .frame(height: 400)
                .frame(maxWidth: .infinity)
                .background(Color.white)
                .cornerRadius(16)
            }
        )
    }
}
```

## 7. CommentAnalysisService Skeleton

```swift
import Foundation

@MainActor
class CommentAnalysisService {
    static let shared = CommentAnalysisService()
    
    private init() {}
    
    enum Sentiment: String {
        case positive
        case neutral
        case negative
    }
    
    // MARK: - Analysis Methods
    
    func analyzeSentiment(text: String) -> Sentiment {
        // Simple keyword-based sentiment analysis
        let positiveKeywords = ["great", "amazing", "perfect", "love", "excellent", "wonderful"]
        let negativeKeywords = ["bad", "terrible", "failed", "awful", "hate", "disaster"]
        
        let lowercased = text.lowercased()
        
        let hasPositive = positiveKeywords.contains { lowercased.contains($0) }
        let hasNegative = negativeKeywords.contains { lowercased.contains($0) }
        
        if hasPositive && !hasNegative {
            return .positive
        } else if hasNegative && !hasPositive {
            return .negative
        } else {
            return .neutral
        }
    }
    
    func extractTopics(from comments: [RecipeComment]) -> [String: Int] {
        var topics: [String: Int] = [:]
        
        for comment in comments {
            let words = comment.text.lowercased()
                .split(separator: " ")
                .map { String($0) }
            
            // Simple extraction: look for phrases
            if words.contains("added") {
                topics["added ingredient", default: 0] += 1
            }
            if words.contains("substituted") || words.contains("replaced") {
                topics["substitution", default: 0] += 1
            }
            if words.contains("dry") || words.contains("too") {
                topics["texture issue", default: 0] += 1
            }
        }
        
        return topics.sorted { $0.value > $1.value }
    }
    
    func generateInsights(from comments: [RecipeComment]) -> RecipeInsights {
        let totalComments = comments.count
        let sentiments = comments.map { analyzeSentiment(text: $0.text) }
        let positiveSentiments = sentiments.filter { $0 == .positive }.count
        let sentimentScore = totalComments > 0 ? Double(positiveSentiments) / Double(totalComments) : 0.5
        
        let topTopics = extractTopics(from: comments)
        
        return RecipeInsights(
            totalComments: totalComments,
            avgSentiment: sentimentScore,
            topVariations: Array(topTopics.keys.prefix(3)),
            successRate: sentimentScore,
            updatedDate: Date()
        )
    }
}

struct RecipeInsights {
    let totalComments: Int
    let avgSentiment: Double
    let topVariations: [String]
    let successRate: Double
    let updatedDate: Date
}
```

## 8. Integration into RecipeDetailView

```swift
// Add to RecipeDetailView

enum DetailTab {
    case details
    case comments
    case insights
    case card
}

@State private var selectedTab: DetailTab = .details

// In body, add:
VStack {
    // Tab selector
    Picker("Details", selection: $selectedTab) {
        Text("Details").tag(DetailTab.details)
        if recipe.commentCount > 0 {
            Text("Comments (\(recipe.commentCount))").tag(DetailTab.comments)
        }
        Text("Card").tag(DetailTab.card)
    }
    .pickerStyle(.segmented)
    .padding()
    
    // Content based on selected tab
    switch selectedTab {
    case .details:
        detailsContent
    case .comments:
        commentsContent
    case .insights:
        insightsContent
    case .card:
        cardContent
    }
}

// New tab contents:
@ViewBuilder
private var commentsContent: some View {
    VStack {
        RecipeCommentListView(recipe: recipe)
        CommentInputView(recipe: recipe)
    }
}

@ViewBuilder
private var cardContent: some View {
    FlipCard(
        frontContent: { /* existing card preview */ },
        backContent: { /* card back preview */ }
    )
}
```

## 9. Schema Update

```swift
// Update SchemaV1.swift

static var models: [any PersistentModel.Type] {
    [
        Recipe.self,
        Ingredient.self,
        Tag.self,
        RecipeCollection.self,
        RecipeCardStyle.self,
        RecipeSticker.self,
        RecipeAnnotation.self,
        RecipeComment.self,        // ADD
        RecipeCardBack.self,       // ADD
        Substitution.self,
        DinnerParty.self,
        DinnerPartyRecipe.self,
        ShoppingCartRecipe.self
    ]
}
```


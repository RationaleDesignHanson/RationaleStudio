# Heirloom iOS App - Social Features Architecture Analysis

## CURRENT STATE: WHAT'S ALREADY BUILT

### 1. Recipe Model Core Fields
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/Recipe.swift`

**Key Existing Fields:**
- Identity: `id`, `title`, `dateAdded`, `lastModified`
- Source Info: `sourceType`, `sourceURL`, `sourceBookTitle`, `sourcePerson`, `sourceDate`, `sourceStory`
- Content: `imageFileName`, `ingredients[]`, `instructions[]`, `servings`, `prepTime`, `cookTime`, `notes`
- Personalization: `cardStyle` (RecipeCardStyle), `stickers[]` (RecipeSticker), `annotations[]` (RecipeAnnotation)
- Metadata: `timesCooked`, `lastCooked`, `isFavorite`, `isInShoppingList`
- **Social Fields (Already Present):**
  - `sharedBy: String?` - Username of who shared this recipe
  - `sharedDate: Date?` - When recipe was shared
  - `passedDownBy: String?` - Person who passed it down
  - `passedDownDate: Date?` - When passed down occurred
  - `passedDownMessage: String?` - Message from passer-downer
  - `generationCount: Int = 1` - Tracks how many times recipe was passed down

### 2. Personalization System (Phase 2)

#### RecipeCardStyle Model
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/CardStyle.swift`

Manages the visual appearance of recipe cards:
- Background customization (default, solid color, gradient, pattern, texture)
- Coffee stain effects (enabled, position selection)
- Worn edges intensity (0.0 to 1.0)
- Auto love marks based on times cooked
- Predefined color palette (cream, vanilla, peach, light blue, mint, tan)
- Predefined patterns and textures

#### RecipeSticker Model
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/Sticker.swift`

Position and style customization for decorative stickers:
- StickerType: food, badge, emotional, seasonal
- Position: `positionX`, `positionY` (0.0 to 1.0 normalized)
- Transform: `scale`, `rotation` (degrees)
- Visual: `colorHex`, `opacity`
- Sticker library with 20+ built-in SF Symbol stickers

#### RecipeAnnotation Model
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/Annotation.swift`

Text annotations/notes on cards:
- AnnotationStyle: handwritten, stickyNote, marker
- Position and rotation (similar to stickers)
- Font size (12-24pt), color hex
- Predefined color palette (yellow, red, turquoise, mint, coral, lavender, pink)

### 3. UI Components for Card Personalization

#### CardPersonalizationView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/CardPersonalization/CardPersonalizationView.swift`

Full card editor with:
- Live preview (3:4 aspect ratio card)
- Tab-based editor: Background, Stickers, Annotations, Love Marks
- Color swatches with visual selection
- Drag-to-position gestures for stickers/annotations
- Removal and editing capabilities
- Real-time preview updates

#### StickerPickerView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/CardPersonalization/StickerPickerView.swift`

Sticker selection and customization:
- Category tabs for sticker types
- Grid selection of sticker options
- Live preview with drag-to-move
- Scale slider (0.5x to 2.0x)
- Rotation controls (0-360°)
- Color palette selection
- Opacity slider (0.3 to 1.0)
- Position preset buttons

#### AnnotationEditorView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/CardPersonalization/AnnotationEditorView.swift`

Annotation creation/editing:
- Text input with line limits
- Style selection (sticky note, handwritten, marker)
- Color swatches
- Font size control (12-24pt)
- Rotation slider (-15° to 15° for handwritten feel)
- Live preview
- Position via drag
- Delete and reset buttons

### 4. CloudKit Sharing Infrastructure

#### CloudKitShareService
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Services/CloudKitShareService.swift`

Complete sharing system:
- `shareRecipe()` - Share with optional message
- `passDownRecipe()` - Special sharing with recipient tracking
- `acceptSharedRecipe()` - Receive and import shared recipe
- `getCurrentUserName()` - Get CloudKit user identity
- Record conversion (Recipe ↔ CKRecord)
- Image handling with CloudKit assets
- Generational metadata tracking
- Analytics integration
- Monitoring/logging integration

**Share URL Generation:**
- Creates CKShare with readOnly permissions
- Returns shareable URLs
- Track analytics on share events

#### RecipeShareService
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Services/RecipeShareService.swift`

Multi-format sharing (not CloudKit):
- Text format sharing
- PDF generation
- UIActivityViewController integration
- Email/Messages/Notes compatibility

#### UI: RecipeShareSheetView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/CloudKitSharing/RecipeShareSheetView.swift`

Share interface:
- Recipe preview card
- Optional personal message input
- Info section about how sharing works
- Success state with URL sharing
- Error handling

#### UI: PassDownView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/CloudKitSharing/PassDownView.swift`

Special "pass down" functionality for familial sharing with message preservation.

### 5. Recipe Display Views

#### RecipeDetailView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/Recipes/RecipeDetail/RecipeDetailView.swift`

Full recipe details with:
- Hero image
- Recipe title, tags, collections
- Metadata section (prep/cook/servings)
- Ingredients and instructions
- Notes section
- Source attribution
- Menu options for: Share (text/PDF/CloudKit), Edit, Personalize Card, Delete

#### RecipeListView
**Location:** `/Users/matthanson/Heirloom/Heirloom/Features/Recipes/RecipeList/RecipeListView.swift`

Recipe grid/list display:
- Search and filtering
- NavigationStack to detail view
- Grid layout with recipe cards

### 6. Design System
**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Design/`

- **Colors:** Warm palette (cream, amber, tomato, charcoal, family green)
- **Typography:** HeirloomFonts enum
- **Components:** Toast manager, loading views, button styles, empty states
- Components are reusable across features

---

## WHAT'S MISSING FOR SOCIAL FEATURES

### 1. Comment/Discussion System
**Currently MISSING:**
- No comment model
- No comment thread UI
- No nested replies
- No comment authors/timestamps
- No comment likes/reactions
- No comment moderation flags

**Needed for:**
- Users commenting on shared recipes
- Recipe variation discussions
- Feedback from recipe creators
- Social engagement

### 2. Card Flip Animation & Back Side
**Currently MISSING:**
- No flip animation mechanism
- No card back design
- No back-side content storage
- No rotation/3D transform in UI

**Existing card display has:**
- Front side designed (stickers, annotations, background)
- 3:4 aspect ratio established
- Personalization system ready

**Needed:**
- Flip animation trigger
- Back side model fields
- Back side UI rendering
- Back side content (family story, memories, variations)

### 3. Social Metadata UI Display
**Currently NOT Displayed:**
- `sharedBy` name (only stored in model)
- `passedDownMessage` (stored but not shown)
- `generationCount` (stored but not shown)
- `timesCooked` shown but not in social context
- "From [Person]'s Kitchen" attribution

**Needed:**
- Attribution line on card front
- Sharing history display
- "Pass down" lineage tracker
- Generational badges

### 4. Comment Mining & Analytics
**Not Implemented:**
- No sentiment analysis of comments
- No trending topics extraction
- No comment threading
- No notification system for replies
- No comment search/filtering

### 5. Recipe Card Display Format
**Status:** Cards displayed in personalization preview, but NOT used for:
- Recipe list display (currently grid of text)
- Recipe detail hero section
- Social feed view
- Shared recipe previews

**Needed:**
- Refactor existing card preview into reusable component
- Use in all recipe displays
- Create "compact card" variant for lists

---

## SUGGESTED ARCHITECTURE FOR SOCIAL FEATURES

### Phase 3A: Core Comment System

#### 1. New Models to Add

```
RecipeComment
├── id: UUID
├── recipeId: UUID (relationship to Recipe)
├── authorName: String
├── authorId: String? (CloudKit user ID)
├── text: String
├── createdDate: Date
├── updatedDate: Date?
├── likes: Int = 0
├── isModerated: Bool = false
├── parentCommentId: UUID? (for nested replies)
├── relationship to Recipe
└── computed properties: timeAgo, isEditable

CommentThread (optional - for grouping)
├── id: UUID
├── recipeId: UUID
├── rootCommentId: UUID
└── commentCount: Int
```

**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/Comment.swift`

#### 2. Comment Service

```
CommentService
├── fetchComments(recipeId) -> [RecipeComment]
├── postComment(recipe, text, author) -> RecipeComment
├── deleteComment(id)
├── editComment(id, newText)
├── likeComment(id)
├── reportComment(id, reason)
├── cloudKitSync()
└── analytics tracking
```

**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Services/CommentService.swift`

#### 3. Comment UI Views

**RecipeCommentView** - Single comment display:
```
┌─────────────────────────────────┐
│ 👤 Person Name      3 days ago  │
│ "Great recipe! I added......"   │
│ ❤️ 5 likes  Reply  More...      │
└─────────────────────────────────┘
```

**RecipeCommentListView** - Comments section in detail view:
```
- Tab in RecipeDetailView
- Sorted by: Newest / Most Liked
- Threaded replies with indentation
- Add Comment button
```

**CommentInputView** - Post comment UI:
```
┌─────────────────────────────────┐
│ Your Comment                    │
│ ┌───────────────────────────┐   │
│ │                           │   │
│ │ [Multi-line text input]   │   │
│ │                           │   │
│ └───────────────────────────┘   │
│                [Post Comment]    │
└─────────────────────────────────┘
```

#### 4. Integration Points

**RecipeDetailView modifications:**
- Add "Comments" tab in metadata section
- Show comment count badge
- Embed CommentListView
- Add comment input at bottom

**RecipeShareSheetView modifications:**
- Show existing comments from shared recipe
- Note about viewing comments after accepting

### Phase 3B: Card Flip & Back Side

#### 1. CardBack Model Addition

```
RecipeCardBack (new model)
├── id: UUID
├── recipeId: UUID (1-to-1 with Recipe via oneToOne relationship)
├── backStyle: BackStyle enum
│  ├── blank
│  ├── memoryJournal
│  ├── familyTree
│  └── variationLog
├── customContent: String? (user story/memory)
├── backgroundColorHex: String?
├── lineStyle: LineStyle (ruled, grid, dots, blank)
├── showPassDownInfo: Bool
└── createdDate: Date
```

**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Models/CardBack.swift`

#### 2. Recipe Model Update

```
// Add to Recipe.swift
@Relationship(deleteRule: .cascade, inverse: \CardBack.recipe)
var cardBack: CardBack?
```

#### 3. Flip Animation Component

**FlipCard View:**
```swift
struct FlipCard: View {
    let frontContent: AnyView
    let backContent: AnyView
    @State var isFlipped = false
    
    // 3D rotation with .rotation3DEffect
    // Animated by gesture or button
    // Spring animation for flip
}
```

**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Design/Components/FlipCard.swift`

#### 4. Back Side Editor

**CardBackPersonalizationView:**
- Style selector (memory journal, family tree, etc.)
- Text editor for custom story
- Font size and color selection
- Line style selector
- Show/hide pass-down info toggle
- Live preview

#### 5. Display Integration

**Card displays with flip:**
- PersonalizationView preview (already has card, add flip button)
- RecipeDetailView hero section (add flip button)
- Social feed cards (swipe or tap to flip)
- Recipe list card variant (tap to flip)

---

## COMMENT MINING & ANALYTICS

### 1. Comment Analysis Service

```
CommentAnalysisService
├── extractTrending(timeframe) -> [Topic]
│  └── Extract "I added", "I changed", "substituted"
├── sentimentAnalysis(comment) -> Sentiment enum
│  └── Positive, Neutral, Negative
├── extractTopics(comments) -> [String]
│  └── Keywords, themes
├── findVariations(recipeId) -> [Variation]
│  └── Common modifications users mention
└── generateInsights(recipe) -> RecipeInsights
   └── Popular mods, success rate, issues
```

**Location:** `/Users/matthanson/Heirloom/Heirloom/Core/Services/CommentAnalysisService.swift`

### 2. Insights Model

```
RecipeInsights
├── recipeId: UUID
├── totalComments: Int
├── avgSentiment: Double
├── topVariations: [String]
├── commonSubstitutions: [Substitution]
├── successRate: Double
├── commonIssues: [String]
└── updatedDate: Date
```

### 3. Insights UI

**RecipeInsightsView** - Show on detail screen:
```
Popular Modifications:
• "Added 1/2 tsp vanilla" (mentioned 8 times)
• "Used brown sugar instead" (mentioned 6 times)

Most Common Issue:
• Cookies too dry (mentioned 4 times)
  → Try: Reduce bake time by 1 minute

Recipe Success Rate: 92%
```

---

## CARD FLIP ANIMATION ARCHITECTURE

### Recommended Implementation

```swift
struct RecipeCard: View {
    let recipe: Recipe
    @State private var isFlipped = false
    
    var body: some View {
        ZStack {
            // Front
            if !isFlipped {
                CardFront(recipe: recipe)
                    .transition(.asymmetric(
                        insertion: .opacity,
                        removal: .opacity.animation(.easeInOut(duration: 0.3))
                    ))
            }
            
            // Back
            if isFlipped {
                CardBack(recipe: recipe)
                    .transition(.asymmetric(
                        insertion: .opacity,
                        removal: .opacity.animation(.easeInOut(duration: 0.3))
                    ))
            }
        }
        .frame(height: 400)
        .rotation3DEffect(
            .degrees(isFlipped ? 180 : 0),
            axis: (x: 0, y: 1, z: 0)
        )
        .animation(.spring(response: 0.6, dampingFraction: 0.8), value: isFlipped)
        .onTapGesture {
            isFlipped.toggle()
        }
    }
}
```

### Alternative: Swipe-based Flip

```swift
.gesture(
    DragGesture()
        .onEnded { value in
            if abs(value.translation.width) > 50 {
                withAnimation(.spring()) {
                    isFlipped.toggle()
                }
            }
        }
)
```

---

## WHERE COMMENT MINING WOULD FIT

### Architecture Integration

1. **CommentService** - Core CRUD operations
   - Calls CloudKitShareService to sync comments
   - Stores comments in local SwiftData
   - Publishes updates for UI

2. **CommentAnalysisService** - Runs periodically
   - Called by RecipeDetailView.onAppear()
   - Analyzes last 50 comments
   - Updates RecipeInsights model
   - Cached to avoid repeated analysis

3. **RecipeDetailView** - Display layer
   - Shows CommentListView
   - Shows RecipeInsightsView
   - Provides CommentInputView
   - Tabs: Details | Comments | Insights | Card

4. **CloudKit Sync**
   - New CommentRecord type
   - Share comments with recipe
   - Track CloudKit sync events

5. **Analytics**
   - Track comment posting
   - Track comment-based actions
   - Track sentiment distribution
   - Feed comment metrics to dashboard

---

## SUMMARY OF FILES TO CREATE/MODIFY

### New Files
1. `/Core/Models/RecipeComment.swift` - Comment model
2. `/Core/Models/CardBack.swift` - Card back side
3. `/Core/Services/CommentService.swift` - Comment CRUD
4. `/Core/Services/CommentAnalysisService.swift` - Mining & insights
5. `/Core/Design/Components/FlipCard.swift` - Flip animation component
6. `/Core/Design/Components/RecipeCard.swift` - Reusable card component
7. `/Features/Comments/RecipeCommentView.swift` - Single comment display
8. `/Features/Comments/RecipeCommentListView.swift` - Comments thread
9. `/Features/Comments/CommentInputView.swift` - Post comment
10. `/Features/CardPersonalization/CardBackEditorView.swift` - Back side editor
11. `/Features/RecipeDetail/RecipeInsightsView.swift` - Analytics display

### Modified Files
1. `Recipe.swift` - Add `cardBack` relationship, ensure social fields present
2. `CardStyle.swift` - Keep as-is (front only)
3. `RecipeDetailView.swift` - Add comments tab, flip button, insights tab
4. `CardPersonalizationView.swift` - Add flip preview, back editor button
5. `CloudKitShareService.swift` - Add comment syncing
6. `SchemaV1.swift` - Add new models to schema

---

## DESIGN CONSIDERATIONS

### Color System
Use existing `HeirloomColors`:
- Cards: `cream` background
- Text: `charcoal` for primary, `warmGray` for secondary
- Accents: `tomato` for actions
- Comments: Slight `cardShadow` for depth

### Typography
- Names: HeirloomFonts.bodyBold
- Comments: HeirloomFonts.body
- Timestamps: HeirloomFonts.caption2
- Metadata: HeirloomFonts.caption1

### Spacing
Use HeirloomSpacing constants throughout

### Card Dimensions
- Full card: 3:4 aspect ratio
- Width: 300-350pt (fits in detail view)
- Corner radius: 16pt (existing standard)

### Animation Preferences
- Flip duration: 0.6s spring
- Comment fade-in: 0.3s ease-in-out
- Button feedback: Light haptic impacts


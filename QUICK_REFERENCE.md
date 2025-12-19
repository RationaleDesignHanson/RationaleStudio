# Heirloom App - Quick Reference for Social Features

## Current Code Structure

### Models (SwiftData)
```
Recipe (Main model)
├── RecipeCardStyle (1:1) - Front appearance
├── RecipeSticker[] (1:many) - Decorative elements
├── RecipeAnnotation[] (1:many) - Text notes
├── Ingredient[] (1:many) - Ingredients
├── Tag[] (1:many) - Organization
├── RecipeCollection[] (1:many) - Collections
└── DinnerPartyRecipe[] (1:many) - Event planning

Social fields in Recipe (present but not UI-displayed):
- sharedBy: String?
- sharedDate: Date?
- passedDownBy: String?
- passedDownDate: Date?
- passedDownMessage: String?
- generationCount: Int
```

### Services
```
Core Services:
- CloudKitShareService - Share/receive via iCloud
- RecipeShareService - Text/PDF export
- AnalyticsService - Usage tracking
- ImageStorageService - Image persistence

Needed for Social:
- CommentService (MISSING)
- CommentAnalysisService (MISSING)
```

### Views
```
Recipe Detail Flow:
RecipeListView
├── NavigationStack
└── RecipeDetailView
    ├── Hero image
    ├── Title & metadata
    ├── Ingredients
    ├── Instructions
    ├── Notes
    └── Menu: Share | Edit | Personalize | Delete

Personalization Flow:
CardPersonalizationView (main editor)
├── Preview card (live)
├── Tab: Background colors
├── Tab: Stickers (RecipeStickerPickerView)
├── Tab: Annotations (RecipeAnnotationEditorView)
└── Tab: Love marks

Sharing Flow:
RecipeShareSheetView
├── Recipe preview
├── Message input
└── Success with CloudKit URL

PassDownView (special sharing)
```

## What's Ready to Use

### For Card Display
- 3:4 aspect ratio established
- Sticker positioning system (0.0-1.0 normalized)
- Annotation rendering
- Background styles (5 types)
- Coffee stain effects
- Love marks auto-calculation

### For Sharing
- CloudKit integration complete
- User identity retrieval
- Generation tracking
- Message passing
- Image upload support
- Analytics hooks ready

### UI Components Available
- Toast notifications
- Loading indicators
- Empty states
- Button styles
- Navigation patterns
- Design tokens (colors, fonts, spacing)

## Next Steps for Social Features

### Phase 1: Setup (1-2 days)
1. Create RecipeComment model
2. Create CommentService
3. Add schema migration

### Phase 2: UI (2-3 days)
1. Build RecipeCommentView
2. Build RecipeCommentListView
3. Build CommentInputView
4. Integrate into RecipeDetailView

### Phase 3: Analytics (1-2 days)
1. Create CommentAnalysisService
2. Build RecipeInsightsView
3. Add comment mining logic

### Phase 4: Card Flip (2-3 days)
1. Create CardBack model
2. Build FlipCard component
3. Create CardBackEditorView
4. Integrate flip into displays

## File Locations (Absolute Paths)

**Models:**
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Recipe.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/CardStyle.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Sticker.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Annotation.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/DinnerParty.swift`

**Services:**
- `/Users/matthanson/Heirloom/Heirloom/Core/Services/CloudKitShareService.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Services/RecipeShareService.swift`

**Views:**
- `/Users/matthanson/Heirloom/Heirloom/Features/Recipes/RecipeDetail/RecipeDetailView.swift`
- `/Users/matthanson/Heirloom/Heirloom/Features/CardPersonalization/CardPersonalizationView.swift`
- `/Users/matthanson/Heirloom/Heirloom/Features/CloudKitSharing/RecipeShareSheetView.swift`

**Design System:**
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Colors.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Typography.swift`
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Components/` (reusable UI)

## Key Design Decisions

**Card Dimensions:**
- Aspect ratio: 3:4 (300x400pt)
- Corner radius: 16pt
- Background: HeirloomColors.cream

**Sticker/Annotation Positioning:**
- Normalized 0.0-1.0 scale (easy to adapt to any view size)
- Stored in SwiftData with Recipe relationship
- Drag-to-move in UI

**Social Metadata Storage:**
- Already in Recipe model
- Ready for display UI
- CloudKit record conversion handles serialization

**Comments (Design):**
- Attach to Recipe (1:many relationship)
- Thread via parentCommentId
- Author name + optional CloudKit ID
- Timestamps for sorting

**Card Flip:**
- rotation3DEffect for 3D transform
- Spring animation (0.6s)
- Toggle state management
- Works with existing sticker system

## Testing Strategy

1. **Models:** Verify SwiftData relationships with ModelContainer
2. **Services:** Mock CloudKit responses
3. **UI:** Use previews with example Recipe/Comment data
4. **Integration:** Full flow testing in simulator
5. **Performance:** Monitor with Instruments (card rendering)

## Notes

- RecipeListItem DTO available for efficient list rendering
- Ingredient model has complex parsing already implemented
- Analytics service integrated throughout
- Haptic feedback built into UI patterns
- Toast notifications for user feedback
- Migration path planned to v3 schema


# Heirloom iOS App - Social Features Exploration Index

## Document Overview

This folder contains a comprehensive analysis of the Heirloom iOS recipe app and detailed architectural recommendations for implementing social features. All files are organized by use case.

## Quick Start

**Start here:** `/Users/matthanson/rationale-public/EXPLORATION_SUMMARY.md`
- 5-minute overview of findings and recommendations
- Implementation timeline (4-5 days)
- Architecture overview

## Documents by Purpose

### For Decision Makers
- **EXPLORATION_SUMMARY.md** - Executive summary with findings and timeline
  - What's already built (strengths)
  - What's missing (gaps)
  - Recommended architecture
  - Success metrics

### For Architects
- **HEIRLOOM_SOCIAL_FEATURES_ANALYSIS.md** - Complete technical analysis (18KB)
  - Current Recipe model fields
  - Personalization system deep dive
  - CloudKit sharing implementation
  - Sticker and card styling system
  - Proposed comment system architecture
  - Card flip animation design
  - Comment mining framework
  - File list for creation/modification

### For Developers
- **CODE_SNIPPETS.md** - Ready-to-use Swift code (16KB)
  1. RecipeComment model
  2. CardBack model
  3. Recipe model updates
  4. CommentService skeleton
  5. RecipeCommentView component
  6. FlipCard animation component
  7. CommentAnalysisService
  8. RecipeDetailView integration
  9. SchemaV1 updates

### For Quick Reference
- **QUICK_REFERENCE.md** - Lookup guide
  - Current code structure
  - What's ready to use
  - Next steps by phase
  - File locations (absolute paths)
  - Key design decisions
  - Testing strategy

## Key Files in Project

### Models (SwiftData)
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Recipe.swift` - Main model (social fields present)
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/CardStyle.swift` - Front personalization
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Sticker.swift` - Decorative elements
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/Annotation.swift` - Text notes on cards
- `/Users/matthanson/Heirloom/Heirloom/Core/Models/DinnerParty.swift` - Event planning (reference)

### Services
- `/Users/matthanson/Heirloom/Heirloom/Core/Services/CloudKitShareService.swift` - Sharing system
- `/Users/matthanson/Heirloom/Heirloom/Core/Services/RecipeShareService.swift` - Text/PDF export

### Views
- `/Users/matthanson/Heirloom/Heirloom/Features/Recipes/RecipeDetail/RecipeDetailView.swift` - Main detail screen
- `/Users/matthanson/Heirloom/Heirloom/Features/CardPersonalization/CardPersonalizationView.swift` - Personalization editor
- `/Users/matthanson/Heirloom/Heirloom/Features/CloudKitSharing/RecipeShareSheetView.swift` - Share UI

### Design System
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Colors.swift` - Warm color palette
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Typography.swift` - Font system
- `/Users/matthanson/Heirloom/Heirloom/Core/Design/Components/` - Reusable UI components

## Implementation Phases

### Phase 1: Models & Services (2 hours)
Create the data layer:
1. RecipeComment model (with threading)
2. RecipeCardBack model
3. CommentService (CRUD)
4. CommentAnalysisService (mining)

See: **CODE_SNIPPETS.md** sections 1-7

### Phase 2: UI Components (6 hours)
Build the user interface:
1. FlipCard (generic animation component)
2. RecipeCommentView (single comment)
3. RecipeCommentListView (threaded list)
4. CommentInputView (post interface)
5. CardBackEditorView (back customization)
6. RecipeInsightsView (analytics display)

See: **CODE_SNIPPETS.md** sections 5-7

### Phase 3: Integration (4 hours)
Connect everything:
1. Add tabs to RecipeDetailView
2. Integrate flip preview in CardPersonalizationView
3. Add comment syncing to CloudKitShareService
4. Update schema

See: **CODE_SNIPPETS.md** section 8-9

### Phase 4: Testing & Polish (1-2 days)
- Unit tests for models and services
- UI tests with previews
- Performance monitoring
- CloudKit sync verification

## Architecture Highlights

### Comments System
- RecipeComment model with threading (parentCommentId)
- CommentService with sorting (newest, oldest, mostLiked)
- Integrated with CloudKit sharing
- Sentiment analysis built-in

### Card Flip Animation
- Uses rotation3DEffect (GPU-accelerated)
- Spring animation (0.6s response)
- Tap to flip (tap gesture)
- Swipe to flip (drag gesture)
- FlipCard generic component

### Comment Mining
- Sentiment analysis (positive/neutral/negative)
- Topic extraction (added, substituted, etc.)
- Common issues identification
- Success rate calculation
- RecipeInsights model for results

### Social Metadata Display
- sharedBy/sharedDate fields exist
- passedDownMessage preserved
- generationCount tracked
- visually display generational lineage

## Design System Usage

All components should follow:

**Colors (HeirloomColors)**
- Cards: cream background
- Text: charcoal primary, warmGray secondary
- Accents: tomato for actions
- Coffee stain effect for vintage feel

**Typography (HeirloomFonts)**
- Consistent sizing
- Bold variants for emphasis
- Handwritten font for annotations

**Spacing (HeirloomSpacing)**
- 8pt base unit
- lg, md, sm, xs constants
- Consistent padding/margins

**Interactions**
- Haptic feedback (light/medium impacts)
- Spring animations (0.6s response)
- Toast notifications for feedback
- Smooth transitions

## Testing Strategy

1. **Model Tests**
   - Verify relationships work
   - Check computed properties
   - Validate cascade deletion

2. **Service Tests**
   - Mock CloudKit responses
   - Test CRUD operations
   - Verify sorting and filtering

3. **UI Tests**
   - Use SwiftUI previews
   - Test with sample data
   - Verify animation behavior

4. **Integration Tests**
   - Full flow in simulator
   - CloudKit sync verification
   - Analytics tracking

5. **Performance**
   - Monitor card rendering
   - Check comment list scrolling
   - Verify animation frame rates

## Performance Notes

- Card rendering uses ZStack (proven pattern)
- rotation3DEffect is GPU-accelerated
- Comment analysis cached to avoid repeated work
- Database queries use FetchDescriptor with predicates
- Image handling already optimized (JPEG 0.7 quality)

## CloudKit Integration

Existing infrastructure ready:
- Full CloudKit service
- User identity retrieval
- Share URL generation
- Image asset upload/download
- Monitoring and logging
- Analytics integration

To extend for comments:
1. Add CommentRecord type
2. Share comments with recipes
3. Sync on app startup
4. Track sync events

## Related Systems

- **Dinner Party Feature** - Shows reference for 1:many relationships
- **Shopping List** - Reference for recipe filtering
- **Image Storage** - Shows file system integration
- **Analytics Service** - Already tracking events

## FAQ

**Q: Why not use existing notes?**
A: Recipe.notes is for recipe metadata. Comments are social interactions with authors and timestamps.

**Q: Will flip animation impact performance?**
A: No. rotation3DEffect is GPU-accelerated and follows proven SwiftUI patterns.

**Q: Should comments be shared via CloudKit?**
A: Yes. They're part of the social experience and should sync with shared recipes.

**Q: How do we handle comment moderation?**
A: Add isModerated flag to RecipeComment. UI can show moderation badge.

**Q: Migration path for existing recipes?**
A: No migration needed. Comments and card backs are optional, added as users create them.

## Success Criteria

Implementation successful when:
1. Comments display in RecipeDetailView with threading
2. Card flip animation works smoothly (60fps)
3. Comment mining shows insights (popular mods, issues)
4. Comments sync via CloudKit
5. All integrated with design system
6. Unit tests pass
7. No performance regression

## Next Steps

1. Review EXPLORATION_SUMMARY.md
2. Read HEIRLOOM_SOCIAL_FEATURES_ANALYSIS.md for deep dive
3. Copy CODE_SNIPPETS.md into project
4. Follow implementation phases
5. Use QUICK_REFERENCE.md during development

## Files to Create

```
Core/Models/
  + RecipeComment.swift
  + RecipeCardBack.swift

Core/Services/
  + CommentService.swift
  + CommentAnalysisService.swift

Core/Design/Components/
  + FlipCard.swift

Features/Comments/
  + RecipeCommentView.swift
  + RecipeCommentListView.swift
  + CommentInputView.swift

Features/CardPersonalization/
  + CardBackEditorView.swift

Features/RecipeDetail/
  + RecipeInsightsView.swift
```

## Files to Modify

```
Core/Models/
  ~ Recipe.swift (add relationships)
  ~ SchemaV1.swift (add models)

Core/Services/
  ~ CloudKitShareService.swift (add comment sync)

Features/
  ~ RecipeDetailView.swift (add tabs)
  ~ CardPersonalizationView.swift (add flip)
```

---

**Document Generated:** 2024-12-17
**Analysis Scope:** Complete Heirloom iOS app architecture
**Recommendation:** 4-5 days to implement all social features

Start with EXPLORATION_SUMMARY.md for overview, then CODE_SNIPPETS.md for implementation.


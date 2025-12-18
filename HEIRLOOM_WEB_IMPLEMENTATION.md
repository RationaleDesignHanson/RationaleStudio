# Heirloom Web App - Implementation Guide

**Last Updated:** 2025-01-17
**Context:** Social features implementation for web-based Heirloom recipe app

---

## Quick Start for New Session

Use this document to provide context in Claude Code. We're building web-based social features for Heirloom, separate from but inspired by the native iOS app.

---

## Project Context

### What We're Building
A web-based version of Heirloom with social features:
1. **Recipe sharing** - Generate shareable links, track lineage
2. **Comment mining** - Extract tips from recipe website comments using AI
3. **Sticker personalization** - Add decorative stickers to recipe cards
4. **Attribution system** - Track sources, generations, and modifications

### Key Repositories
- **Web App:** `/Users/matthanson/rationale-public` (Next.js 16, Firestore)
- **iOS App Specs:** `/Users/matthanson/Heirloom` (Reference for data models, sticker assets)

---

## Current Infrastructure (Already Working)

### ✅ Authentication & Database
- Firebase Auth configured (`/lib/auth/firebase.ts`, `/lib/auth/firebase-admin.ts`)
- Firestore initialized (`/lib/firebase-tracker.ts`)
- User profiles with role-based access
- Collections exist: `users`, `failed_recipe_scrapes`

### ✅ Recipe Processing
- `IngredientDatabase` - 1,000+ ingredients with synonyms
- `IngredientParser` - Parses ingredient strings
- `UnitConverter` - Volume/weight conversions
- `ConsolidationEngine` - Merges ingredients across recipes
- `RecipeScraper` - Scrapes recipes from URLs

### ✅ UI Components
- Recipe cards (Shopping Lab, Dinner Party demos)
- Shopping list UI with unit conversion
- Modal patterns
- Tailwind design system

### ✅ Demos Working
- **Shopping Lab** - Add recipes, generate shopping list
- **Dinner Party** - Multi-recipe timeline planning
- Both at: `/app/(public)/work/heirloom/components/PrototypeEmbed.tsx`

---

## iOS App Reference (For Data Models)

### Location
`/Users/matthanson/Heirloom/`

### Key Files to Reference
- **Data Model:** `/Heirloom/Core/Models/Recipe.swift`
- **CloudKit Sharing:** `/Heirloom/Core/Services/CloudKitShareService.swift`
- **Sticker Assets:** `/Heirloom/stickergenerator/` (50+ stickers to port)
- **Full Spec:** `/Heirloom/heirloom-deliverables/heriloom.txt` (2,911 lines)

### iOS App Already Has
- CloudKit-based recipe sharing
- Pass-down feature with generational tracking
- Sticker personalization (CardStyle + RecipeSticker models)
- Complete attribution system
- 93 unit tests

---

## Implementation Plan

### Phase 1: Foundation (START HERE - Day 1-2)
**Goal:** Recipe storage, user ownership, basic sharing
**Estimated Time:** 8-10 hours

#### Tasks
1. **Firestore Schema** (~2 hours)
   ```typescript
   // Collections to create:
   - recipes/{recipeId}
   - users/{userId}/recipes/{recipeId}
   - shares/{shareId}
   ```

2. **API Endpoints** (~3 hours)
   - `POST /api/recipes/create` - Save recipe
   - `GET /api/recipes/[id]` - Get recipe by ID
   - `POST /api/recipes/share` - Generate share link
   - `GET /api/shares/[shareId]` - Public access

3. **Basic UI** (~3 hours)
   - "Save Recipe" button in Shopping Lab
   - Share modal with copy-to-clipboard
   - Public recipe view (`/r/[shareId]`)
   - Attribution badge component

**Deliverable:** Can save & share recipes from demos

---

### Phase 2: Recipe Forking & Personalization (Day 3-5)
**Goal:** Fork recipes, track lineage, add stickers
**Estimated Time:** 12 hours

#### Tasks
1. **Forking System** (~4 hours)
   - `recipe_versions` collection
   - `POST /api/recipes/fork` endpoint
   - Track parentVersionId and modifications
   - "Fork this recipe" UI

2. **Sticker Personalization** (~6 hours)
   - Port sticker assets from iOS `/stickergenerator/`
   - Sticker picker component
   - Store positions in recipe metadata
   - Render stickers on recipe cards
   - CardStyle options

3. **Lineage Tracking** (~2 hours)
   - Build lineage tree
   - "Forked from [User]" badges
   - Generation count display

---

### Phase 3: Comment Mining (Day 6-8)
**Goal:** Extract tips from recipe comments using AI
**Estimated Time:** 12 hours

#### Tasks
1. **Comment Scraper** (~4 hours)
   - Extend RecipeScraper for comments
   - Domain-specific selectors
   - `comments` collection

2. **AI Parsing** (~4 hours)
   - Claude Haiku integration
   - Extract suggestion types:
     - ingredient_adjustment
     - cooking_time
     - substitution
     - technique
   - Confidence scoring

3. **Suggestion UI** (~4 hours)
   - Display top suggestions
   - Upvote/downvote system
   - "Apply suggestion" → fork

---

### Phase 4: Collections (Day 9-10)
**Goal:** Organize & share recipe collections
**Estimated Time:** 8 hours

---

## Data Models (Reference)

### Recipe (Based on iOS Swift Model)
```typescript
interface Recipe {
  id: string;
  userId: string;
  title: string;
  imageUrl?: string;
  ingredients: Ingredient[];
  instructions: string[];
  servings?: number;
  prepTime?: string;
  cookTime?: string;

  // Attribution
  sourceType: 'website' | 'cookbook' | 'user' | 'family';
  sourceURL?: string;
  sourceBookTitle?: string;
  sourcePerson?: string;

  // Social (from iOS model)
  sharedBy?: string;
  sharedDate?: Date;
  passedDownBy?: string;
  passedDownMessage?: string;
  generationCount: number;

  // Personalization
  cardStyle?: CardStyle;
  stickers?: RecipeSticker[];

  // Metadata
  tags: string[];
  isFavorite: boolean;
  timesCooked: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### RecipeSticker (From iOS)
```typescript
interface RecipeSticker {
  id: string;
  stickerAssetName: string;  // Reference to asset
  x: number;  // Position (0-1 normalized)
  y: number;
  rotation: number;  // Degrees
  scale: number;     // 0.5-2.0
}
```

### CardStyle (From iOS)
```typescript
type CardStyle = 'vintage' | 'modern' | 'minimalist' | 'grandma' | 'chef';
```

### CommentSuggestion (New)
```typescript
interface CommentSuggestion {
  id: string;
  recipeUrl: string;
  type: 'ingredient_adjustment' | 'cooking_time' | 'technique' | 'substitution';
  text: string;
  confidence: number;
  upvotes: number;
  downvotes: number;
  originalComment: string;
  author?: string;
}
```

---

## Tech Stack

### Already Installed
- Next.js 16.0.10 (Turbopack)
- React 19
- TypeScript 5
- Tailwind CSS
- Firebase Admin SDK
- Firebase Client SDK

### Need to Install
```bash
npm install nanoid           # Share link generation
npm install @anthropic-ai/sdk  # Claude API for comment mining
```

---

## Key Files to Start With (Phase 1)

### 1. Create Firestore Schema
**File:** `/lib/firestore/collections.ts` (create new)
```typescript
// Define collection references and types
```

### 2. Create API Endpoints
**Files:**
- `/app/api/recipes/create/route.ts`
- `/app/api/recipes/[id]/route.ts`
- `/app/api/recipes/share/route.ts`
- `/app/api/shares/[shareId]/route.ts`

### 3. Create UI Components
**Files:**
- `/components/heirloom/SaveRecipeButton.tsx`
- `/components/heirloom/ShareModal.tsx`
- `/components/heirloom/AttributionBadge.tsx`
- `/app/r/[shareId]/page.tsx` (public recipe view)

---

## Existing Code to Leverage

### Recipe Scraping
**File:** `/components/heirloom/shared/services/RecipeScraper.ts`
- Already scrapes recipes from URLs
- Returns structured recipe data
- Logs failures to Firestore
- **Extend this** for comment scraping

### Shopping List Demo
**File:** `/components/heirloom/demos/shopping-lab/ShoppingLabDemo.tsx`
- Add "Save Recipe" button here
- Already has recipe data in state

### Firebase Integration
**Files:**
- `/lib/firebase-tracker.ts` - Client-side Firestore
- `/lib/auth/firebase-admin.ts` - Server-side Firestore
- Use these for database operations

---

## Important Considerations

### Share Link Generation
- Use `nanoid(8)` for short URLs
- Format: `/r/abc12345` or `/c/xyz98765`
- Check uniqueness before saving

### Comment Mining Cost
- Claude Haiku: $0.25 per 1M tokens
- Average comment: ~100 tokens
- Average recipe: ~50 comments = 5,000 tokens
- Cost per recipe: ~$0.00125 (very affordable!)

### Sticker Assets
- 50+ stickers available in iOS app
- Located: `/Users/matthanson/Heirloom/stickergenerator/`
- Need to port to web (convert to SVG or PNG)
- Start with subset (10-15 popular ones)

### Anonymous Viewing
- **Recommendation:** Allow non-logged-in users to view shared recipes
- Good for virality and social sharing
- Implement in Firestore security rules

---

## Firestore Security Rules (To Add)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Recipes: owner can read/write
    match /recipes/{recipeId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }

    // User recipes subcollection
    match /users/{userId}/recipes/{recipeId} {
      allow read, write: if request.auth != null
        && request.auth.uid == userId;
    }

    // Shares: anyone with link can read (even anonymous)
    match /shares/{shareId} {
      allow read: if true;  // Public access
      allow create, delete: if request.auth != null
        && request.auth.uid == request.resource.data.ownerId;
    }

    // Recipe versions: owner can read/write their version
    match /recipe_versions/{versionId} {
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
    }
  }
}
```

---

## Success Metrics

### Phase 1 Goals
- ✅ Save recipe: < 1 second
- ✅ Generate share link: < 2 seconds
- ✅ Public recipe access: < 1 second
- ✅ Attribution displays correctly

### Future Phase Goals
- Fork recipe: < 2 seconds
- Apply sticker: Instant (client-side)
- Mine comments: < 5 seconds
- Apply suggestion: < 2 seconds

---

## Common Patterns from Existing Code

### API Route Pattern
```typescript
// Example from existing codebase
export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    const decodedToken = await verifyIdToken(idToken);

    // Handle request with user context
    const userId = decodedToken.uid;

    return Response.json({ success: true, data: {} });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

### Firestore Write Pattern
```typescript
import { db } from '@/lib/firebase-tracker';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const recipeRef = await addDoc(collection(db, 'recipes'), {
  ...recipeData,
  createdAt: serverTimestamp(),
  updatedAt: serverTimestamp()
});
```

---

## Key Decisions Made

1. **Platform:** Web app in rationale-public (Next.js)
2. **Database:** Firestore (already configured)
3. **Auth:** Firebase Auth (already working)
4. **AI:** Claude Haiku for comment parsing
5. **Share Links:** 8-character nanoid
6. **Anonymous Viewing:** Yes (for virality)
7. **Default Visibility:** Private (user must explicitly share)

---

## Key Decisions Still Needed

1. **Sticker Port Strategy**
   - All 50+ stickers or subset of 10-15?
   - Convert to SVG or use PNG?

2. **Comment Mining Budget**
   - Set per-user monthly limit?
   - Recommendation: $5/user/month

3. **Share Expiration**
   - Should links expire after X days?
   - Or permanent until manually deleted?

---

## Next Steps (Day 1 - Tomorrow)

### Morning Session (4-5 hours)
1. Install dependencies: `nanoid`
2. Create Firestore collection types
3. Build API endpoint: `POST /api/recipes/create`
4. Build API endpoint: `GET /api/recipes/[id]`
5. Test: Save recipe from Shopping Lab demo

### Afternoon Session (4-5 hours)
6. Build share link generator with nanoid
7. Create `POST /api/recipes/share` endpoint
8. Create `/r/[shareId]` public view page
9. Build ShareModal component
10. Add "Save Recipe" button to Shopping Lab
11. Test full flow: Scrape → Save → Share → View

---

## Testing Strategy

### Manual Testing Flow
1. Go to Shopping Lab demo
2. Add recipe from URL or example
3. Click "Save Recipe" (should save to Firestore)
4. Click "Share" (should generate link)
5. Copy share link
6. Open in incognito window (test anonymous access)
7. Verify recipe displays with attribution

### Check Firestore
- Open Firebase Console
- Check `recipes` collection has new document
- Check `shares` collection has share record
- Verify user ownership is correct

---

## Resources

### Documentation
- iOS Spec: `/Users/matthanson/Heirloom/heirloom-deliverables/heriloom.txt`
- UX Analysis: `/Users/matthanson/Heirloom/heirloom-deliverables/UX_Analysis_Comprehensive.md`
- Roadmap: `/Users/matthanson/Heirloom/heirloom-deliverables/COMPREHENSIVE_ANALYSIS_AND_ROADMAP.md`

### Existing Code
- Shopping Lab: `/components/heirloom/demos/shopping-lab/`
- RecipeScraper: `/components/heirloom/shared/services/RecipeScraper.ts`
- IngredientDatabase: `/components/heirloom/shared/services/IngredientDatabase.ts`

### Assets
- Stickers: `/Users/matthanson/Heirloom/stickergenerator/`

---

## Questions to Ask User

If you need clarification on any of these, ask:

1. Should we port all stickers or start with a subset?
2. What's the budget for Claude API (comment mining)?
3. Should share links expire after a certain time?
4. Should we allow editing of shared recipes, or only forking?
5. Do you want real-time collaboration features (future)?

---

## Session Handoff Notes

### What Was Completed Tonight
- ✅ Added drop shadow to active demo tab
- ✅ Fixed random recipe generation (proper fractions, no missing units)
- ✅ Fixed TypeScript build errors
- ✅ Deployed to Netlify successfully
- ✅ Created NEXT_STEPS.md with roadmap
- ✅ Explored iOS app specs and found existing social features
- ✅ Defined comprehensive implementation plan for web version

### Current Build Status
- All builds passing ✅
- Latest commit: d5315c9
- Netlify deploy: Live

### Ready to Start
- Plan approved ✅
- Infrastructure exists ✅
- Data models defined ✅
- Just need to build Phase 1 features

---

## Copy This Prompt for Tomorrow

When starting a new Claude Code session, use this:

```
I'm building Phase 1 of Heirloom web social features.

Context document: /Users/matthanson/rationale-public/HEIRLOOM_WEB_IMPLEMENTATION.md

Today's goal:
- Create Firestore schema for recipes and shares
- Build API endpoints for saving and sharing recipes
- Add "Save Recipe" and "Share" UI to Shopping Lab demo
- Create public recipe view page

Please review the context document and let's start with the Firestore schema.
```

---

**End of Context Document**

Good luck tomorrow! 🚀

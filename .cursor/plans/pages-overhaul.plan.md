# Pages Overhaul Plan

## Overview

Three pages need overhaul with two distinct design languages:
1. **Case Studies** (`/work/zero`, `/work/heirloom`) → Rationale aesthetic (dark + terminal-gold)
2. **Consumer Landing** (`/heirloom`) → Analogue/nostalgic (warm cream + coral particles)

---

## PART 1: Case Study Template (Work Pages)

### Current Problems
- Too many sections (Zero: 9, Heirloom: 13)
- Inconsistent structure between products
- Too verbose - needs consolidation

### Proposed Template (6 Sections)

| # | Section | Purpose | Max Length |
|---|---------|---------|------------|
| 1 | **Hero** | Product name + 1-liner + status badge | 1 screen |
| 2 | **At a Glance** | 3 stats + challenge/solution summary | Compact card |
| 3 | **The Work** | Architecture diagram + key decisions (combined) | 1-2 cards |
| 4 | **Demo** | Interactive prototype embed | Self-contained |
| 5 | **Results** | Outcomes + learnings (2-column) | Half screen |
| 6 | **CTA** | Try product + Work with us | Minimal |

### Visual Design (Rationale Aesthetic)
- Dark background (gray-900)
- Terminal-gold accents
- Consistent card styling with gold borders
- Reduced section padding (py-12 instead of py-20)

### Sections to Remove/Merge

**Zero:**
- ❌ Remove separate "Key Decisions" section → merge into "The Work"
- ❌ Remove separate "Outcomes & Learnings" → merge into "Results"
- ✅ Keep Omnirepo Architecture → becomes "The Work"
- ✅ Keep AtAGlance (update fields: Platform=All Devices, Status=Alpha)

**Heirloom:**
- ❌ Remove "The Opportunity" → merge into AtAGlance
- ❌ Remove "Design Challenges" → merge into "The Work"
- ❌ Remove "Prototype Evolution" → mention in Results
- ❌ Remove "Technical Approach" → merge into "The Work"
- ❌ Remove "Feature Grid" → move to consumer page
- ❌ Remove "Current Status" → merge into AtAGlance stats
- ❌ Remove "What's Next" → move to consumer page
- ❌ Remove duplicate Final CTA

---

## PART 2: Heirloom Consumer Page Redesign

### Current State
- Light cream gradient with ASCII background
- Coral (#E85D4D) accents
- 9 sections, 521 lines
- Generic "recipe app" feel

### Target Aesthetic: Analogue/Nostalgic

**Inspiration:**
- Vintage recipe cards with coffee stains
- Warm amber/sepia tones
- Floating dust motes (warm particles, not cool fireflies)
- Hand-drawn or aged paper textures
- Farmhouse kitchen warmth

### Visual Changes

#### Background Component: `WarmEmberBackground`
```
- Gradient: warm cream → soft amber → hint of coral
- Particles: warm embers/dust motes (amber, soft gold, coral)
- Subtle paper texture overlay
- Slower, gentler animation than Zero's fireflies
```

#### Color Palette (Keep)
```css
--heirloom-coral: #E85D4D
--heirloom-cream: #FBF8F3
--heirloom-amber: #F4A460
--heirloom-warm-brown: #8B4513
--heirloom-text: #2D2D2D
```

#### Card Styling
- Rounded corners with subtle shadow
- Light cream/white backgrounds
- Coral accent borders
- Less boxy, more organic shapes

### Proposed Structure (Consolidated)

| # | Section | Content |
|---|---------|---------|
| 1 | **Hero** | HEIRLOOM + headline + subheadline + CTA |
| 2 | **Problem → Solution** | Combined: chaos → one place (single card) |
| 3 | **Demo** | Interactive prototype embed |
| 4 | **Features** | 4-card grid (capture, scale, shop, preserve) |
| 5 | **Proof** | Metrics + testimonial (compact) |
| 6 | **CTA** | Download + Who it's for (combined) |

### Sections to Remove/Consolidate
- ❌ Remove "How It Works" (steps 1-2-3) - too basic
- ❌ Remove "Full Feature Set" section - move key features to grid
- ❌ Remove "Secondary CTAs" - single CTA is enough
- ✅ Merge "Problem" + "Solution" into single section
- ✅ Merge "CTA" + "Who It's For" (like Zero does)

---

## PART 3: Implementation Order

### Phase 1: Case Study Template
1. Create shared components (if needed)
2. Implement `/work/zero` consolidation
3. Implement `/work/heirloom` consolidation

### Phase 2: Heirloom Consumer
1. Create `WarmEmberBackground` component
2. Redesign `/heirloom` page structure
3. Consolidate sections

---

## Files to Modify

### Case Studies
- `app/(public)/work/zero/page.tsx`
- `app/(public)/work/zero/components/AtAGlance.tsx`
- `app/(public)/work/heirloom/page.tsx`
- `app/(public)/work/heirloom/components/AtAGlance.tsx`

### Heirloom Consumer
- `app/(products)/heirloom/page.tsx`
- NEW: `components/heirloom/WarmEmberBackground.tsx`

---

## Content Updates (TBD from user)

### Zero AtAGlance Fields
- Platform: Universal → **All Devices** (Phone, Tablet, Watch, Web)
- AI Power: 43/168 (keep)
- Status: Beta → **Alpha** (Invite only)

### Heirloom AtAGlance Fields
- Platform: (TBD)
- Status: (TBD)
- Key Metrics: (TBD)


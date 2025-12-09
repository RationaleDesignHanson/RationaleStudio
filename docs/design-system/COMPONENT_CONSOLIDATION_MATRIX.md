# Component Consolidation Matrix
**Visual Decision Guide for Design System Migration**

This matrix helps you decide: Keep, Merge, or Deprecate for each component.

---

## Decision Framework

| Action | When to Use | Result |
|--------|-------------|--------|
| **KEEP** | Component is unique, well-designed, widely used | No changes needed |
| **MERGE** | Component has 80%+ overlap with another | Consolidate into base component |
| **DEPRECATE** | Component is duplicate or poorly designed | Mark for removal |
| **EXTRACT** | Project-specific component with reusable patterns | Extract patterns to base library |

---

## 1. Card Components (14 Total)

| Component | LOC | Usage | Overlap | Decision | New Component | Migration Effort |
|-----------|-----|-------|---------|----------|---------------|------------------|
| **InsightCard.tsx** | 151 | High (Insights page) | 90% with VentureCard | **MERGE** → `Card` | `InsightCard` (thin wrapper) | 2 hours |
| **InsightCardList** | - | Low | 95% with InsightCard | **MERGE** → `Card` | Use `CardCompact` layout | 1 hour |
| **VentureCard.tsx** | 185 | Medium (Ventures page) | 90% with InsightCard | **MERGE** → `Card` | `VentureCard` (thin wrapper) | 2 hours |
| **VentureCardCompact** | - | Low | 95% with VentureCard | **MERGE** → `Card` | Use `CardCompact` layout | 1 hour |
| **CaseStudyTeaser.tsx** | 156 | Medium (Work page) | 90% with InsightCard | **MERGE** → `Card` | `CaseStudyCard` (thin wrapper) | 2 hours |
| **CaseStudyTeaserGrid** | - | Low | 95% with CaseStudyTeaser | **MERGE** → `Card` | Use `CardGrid` layout | 1 hour |
| **KitCard.tsx** | ~150 | Low (Kits page) | 90% with InsightCard | **MERGE** → `Card` | `KitCard` (thin wrapper) | 2 hours |
| **KitCardCompact** | - | Very Low | 95% with KitCard | **MERGE** → `Card` | Use `CardCompact` layout | 1 hour |
| **FeaturedWorkCard.tsx** | 95 | High (Work page) | 70% with GlassCard | **MERGE** → `Card` | Use `Card variant="glass"` | 1 hour |
| **GlassCard.tsx** | 55 | Medium (Multiple) | Base component | **MERGE** → `Card` | Becomes `Card variant="glass"` | 2 hours |
| **CRECard.tsx** | 118 | High (CREaiT project) | 60% unique (glassmorphism) | **EXTRACT** patterns | Keep + extract `glassBackground` util | 1 hour |
| **ExecutiveCard.tsx** | ~80 | Medium (CREaiT) | 85% with CRECard | **MERGE** → `CRECard` | Use `CRECard variant="executive"` | 1 hour |
| **CheckpointCard.tsx** | ~70 | Medium (CREaiT) | 85% with CRECard | **MERGE** → `CRECard` | Use `CRECard variant="checkpoint"` | 1 hour |
| **InteractiveCard.tsx** | ~90 | Low (Presentations) | 80% with Card | **DEPRECATE** | Use `Card interactive={true}` | 0.5 hours |
| **StepCard.tsx** | ~100 | High (Zero Sequence) | 75% unique (timeline styling) | **KEEP** | Keep as-is (domain-specific) | 0 hours |
| **EmailCard.tsx** | ~80 | High (Zero demo) | 70% unique (inbox styling) | **KEEP** | Keep as-is (domain-specific) | 0 hours |
| **RecipeCard** | ~120 | High (Heirloom) | 60% unique (recipe styling) | **KEEP** | Keep as-is (domain-specific) | 0 hours |
| **RecipeStatusCards** | ~90 | High (Heirloom) | 100% unique | **KEEP** | Keep as-is (domain-specific) | 0 hours |

### Summary: Cards
- **Total Components:** 18 (14 files + 4 variants)
- **Target After Migration:** 8 components
  - 1 base `Card` component
  - 4 thin wrappers (`InsightCard`, `VentureCard`, `CaseStudyCard`, `KitCard`)
  - 3 domain-specific (`StepCard`, `EmailCard`, `RecipeCard` family)
- **Reduction:** 18 → 8 = **56% reduction**
- **Total Effort:** ~18 hours

---

## 2. Button Components (6 Total)

| Component | LOC | Usage | Overlap | Decision | New Component | Migration Effort |
|-----------|-----|-------|---------|----------|---------------|------------------|
| **ButtonHierarchy.tsx** | 118 | High (Global) | Base implementation | **MERGE** → `Button` | Becomes core `Button` | 3 hours (base work) |
| **ButtonPrimary** (from above) | - | High | Part of ButtonHierarchy | **MERGE** → `Button` | `Button variant="primary"` | Included above |
| **ButtonSecondary** (from above) | - | High | Part of ButtonHierarchy | **MERGE** → `Button` | `Button variant="secondary"` | Included above |
| **ButtonTertiary** (from above) | - | Medium | Part of ButtonHierarchy | **MERGE** → `Button` | `Button variant="text"` | Included above |
| **BetaSignupButton** (beta/) | 81 | Medium (Beta signups) | 70% with ButtonHierarchy | **MERGE** → `Button` | Use `Button` + `BetaSignupModal` | 2 hours |
| **BetaSignupButton** (zero/) | 179 | Medium (Zero page) | 90% duplicate of above | **DEPRECATE** | Use shared Beta button | 1 hour |

### Summary: Buttons
- **Total Components:** 6 (3 files with variants)
- **Target After Migration:** 1 base component
  - 1 `Button` component with 5 variants: `primary`, `secondary`, `outline`, `ghost`, `text`
- **Reduction:** 3 systems → 1 system = **67% reduction**
- **Total Effort:** ~6 hours

---

## 3. Badge/Status Components (7 Patterns)

| Pattern | Files | Usage | Decision | New Component | Migration Effort |
|---------|-------|-------|----------|---------------|------------------|
| Category badges (Product, AI, Design) | InsightCard.tsx | High | **EXTRACT** | `Badge variant="category"` | 1 hour |
| Status badges (Live, Beta, Building) | FeaturedWorkCard.tsx | High | **EXTRACT** | `Badge variant="status"` | Included |
| Venture status (In Dev, Active, Spinout) | VentureCard.tsx | Medium | **EXTRACT** | Merge into status variants | Included |
| Score badges (Critical, High, Medium) | CRECard.tsx | High | **KEEP** in CREaiT | Domain-specific coloring | 0 hours |
| Tag pills (generic) | Multiple | High | **EXTRACT** | `Badge variant="default"` | Included |

### Summary: Badges
- **Total Patterns:** 7 inline definitions
- **Target After Migration:** 1 `Badge` component with variant prop
- **Reduction:** 7 definitions → 1 component = **86% reduction**
- **Total Effort:** ~1 hour

---

## 4. Layout Components (8 Total)

| Component | LOC | Usage | Overlap | Decision | New Component | Migration Effort |
|-----------|-----|-------|---------|----------|---------------|------------------|
| **Container.tsx** | ~50 | High | Standard max-width container | **KEEP** | Keep as-is (well-designed) | 0 hours |
| **Section.tsx** | ~60 | Medium | Standard section wrapper | **KEEP** | Keep as-is (well-designed) | 0 hours |
| **Grid** (inline patterns) | - | High | 100+ `grid` usages | **EXTRACT** | Create `Grid` component | 2 hours |
| **Header.tsx** | ~300 | High | Site header | **KEEP** | Keep as-is (specific) | 0 hours |
| **Footer.tsx** | ~200 | High | Site footer | **KEEP** | Keep as-is (specific) | 0 hours |
| **DashboardHeader.tsx** | ~120 | Medium | Dashboard-specific | **KEEP** | Keep as-is (specific) | 0 hours |
| **PanelNavigator.tsx** | ~180 | Low | Presentation navigation | **KEEP** | Keep as-is (specific) | 0 hours |
| **ErrorBoundary.tsx** | ~80 | Low | Error handling | **KEEP** | Keep as-is (utility) | 0 hours |

### Summary: Layout
- **Total Components:** 8
- **Target After Migration:** 9 (add `Grid`)
- **Reduction:** None needed (well-organized)
- **Total Effort:** ~2 hours (create Grid)

---

## 5. Visual Effect Components (16 Total)

| Component | LOC | Usage | Overlap | Decision | Rationale | Migration Effort |
|-----------|-----|-------|---------|----------|-----------|------------------|
| **GlassCard.tsx** | 55 | Medium | Merged into Card | **MERGE** → `Card` | See Card section | - |
| **ShaderBackground.tsx** | ~200 | Low | Unique Three.js effect | **KEEP** | Domain-specific | 0 hours |
| **GradientMesh.tsx** | ~150 | Low | Unique visual | **KEEP** | Domain-specific | 0 hours |
| **DotGrid.tsx** | ~100 | Low | Background pattern | **KEEP** | Domain-specific | 0 hours |
| **ASCIIShaderGrid.tsx** | ~180 | Low | ASCII art effect | **KEEP** | Domain-specific | 0 hours |
| **TypewriterText.tsx** | ~90 | Medium | Text animation | **KEEP** | Reusable effect | 0 hours |
| **GlitchText.tsx** | ~70 | Low | Text effect | **KEEP** | Reusable effect | 0 hours |
| (Other visual components) | Various | Low | Unique effects | **KEEP** | Domain-specific | 0 hours |

### Summary: Visual Effects
- **Total Components:** 16
- **Target After Migration:** 15 (merge GlassCard only)
- **Reduction:** Minimal (effects are intentionally diverse)
- **Total Effort:** 0 hours (already handled in Card migration)

---

## 6. Loading/Skeleton Components (1 Total)

| Component | LOC | Usage | Overlap | Decision | Rationale | Migration Effort |
|-----------|-----|-------|---------|----------|-----------|------------------|
| **LoadingSkeleton.tsx** | ~80 | Medium | Well-designed base | **KEEP** | Add more variants if needed | 0 hours |

---

## 7. Project-Specific Components

### Athletes First (52 files)

| Category | Count | Decision | Action |
|----------|-------|----------|--------|
| Diagrams | ~20 | **KEEP** | Domain-specific visualizations |
| Demos | ~15 | **KEEP** | Demo-specific logic |
| Shared components | ~10 | **EXTRACT** | Extract `DemoHeader`, `StepIndicator` to patterns |
| Pitch deck | ~7 | **KEEP** | Presentation-specific |

**Effort:** 4 hours to extract reusable patterns

### CREaiT (32 files)

| Category | Count | Decision | Action |
|----------|-------|----------|--------|
| Diagrams | ~12 | **KEEP** | Domain-specific |
| UI Components (CRECard, etc) | ~5 | **EXTRACT** | Extract glassmorphism utility |
| Demos | ~8 | **KEEP** | Demo-specific |
| Navigation | ~3 | **KEEP** | Project navigation |
| Typography | ~2 | **EXTRACT** | Merge with base typography |

**Effort:** 3 hours to extract patterns

### Heirloom (14 files)

| Category | Count | Decision | Action |
|----------|-------|----------|--------|
| Demos | ~10 | **KEEP** | Demo-specific (recipe cards, etc) |
| Card components | ~4 | **KEEP** | Unique Heirloom styling |

**Effort:** 0 hours (domain-specific)

---

## Consolidated Decision Summary

### Components to MERGE (Highest Priority)

| Current | New | Files Affected | LOC Reduction | Effort |
|---------|-----|----------------|---------------|--------|
| 8 card variants | 1 `Card` base | 8 files | ~800 → ~200 | 12 hours |
| 3 button systems | 1 `Button` base | 3 files | ~380 → ~100 | 6 hours |
| 7 badge patterns | 1 `Badge` component | 7 files (inline) | ~140 → ~60 | 1 hour |

**Total Immediate Impact:**
- **Files reduced:** 18 → 3
- **LOC reduced:** 1,320 → 360 (73% reduction)
- **Effort:** 19 hours

### Components to KEEP (No Changes)

| Category | Count | Rationale |
|----------|-------|-----------|
| Layout primitives | 8 | Well-designed, widely used |
| Visual effects | 15 | Intentionally diverse |
| Domain-specific (Athletes First) | 52 | Project-specific logic |
| Domain-specific (CREaiT) | 27 | Project-specific logic |
| Domain-specific (Heirloom) | 14 | Project-specific logic |
| Loading/utility | 2 | Single-purpose, well-designed |

**Total:** 118 components

### Components to EXTRACT (Medium Priority)

| Pattern | From | To | Benefit | Effort |
|---------|------|----|---------|--------|
| Glassmorphism background | CRECard | `glassBackground()` utility | Reusable across projects | 1 hour |
| Demo header pattern | Athletes First | `DemoHeader` component | Reusable for demos | 2 hours |
| Step indicator | Athletes First | `StepIndicator` component | Reusable for flows | 2 hours |
| Typography scale | CREaiT | Merge with base tokens | Consistent typography | 1 hour |

**Total Effort:** 6 hours

---

## Migration Priority Queue

### Phase 1: Quick Wins (Week 1) - 6 hours
1. Create `.card-interactive` utility (replace 40+ duplicates) - 1 hour
2. Badge consolidation - 1 hour
3. Color token script - 2 hours
4. Border radius tokens - 1 hour
5. Validation scripts - 1 hour

### Phase 2: Core Components (Week 2-3) - 19 hours
1. Create `Card` component - 4 hours
2. Migrate 8 card variants - 12 hours
3. Create `Button` component - 3 hours

### Phase 3: Refinement (Week 4) - 6 hours
1. Extract glassmorphism utility - 1 hour
2. Extract demo patterns - 4 hours
3. Documentation - 1 hour

### Phase 4: Testing (Week 5) - 8 hours
1. Visual regression setup - 3 hours
2. Integration testing - 3 hours
3. Performance audit - 2 hours

**Total Project Effort:** ~39 hours (1 sprint @ 1 FTE)

---

## Success Metrics Tracking

| Metric | Baseline | After Phase 1 | After Phase 2 | After Phase 3 | Target |
|--------|----------|---------------|---------------|---------------|--------|
| **Total Components** | 198 | 198 | 183 | 180 | 180 |
| **Card Variants** | 18 | 18 | 8 | 8 | 8 |
| **Button Systems** | 3 | 3 | 1 | 1 | 1 |
| **Duplicate Patterns** | 40+ | 5 | 2 | 0 | <5 |
| **Token Coverage** | 35% | 55% | 75% | 90% | 95% |
| **Hardcoded Colors** | 500+ | 150 | 50 | <25 | <25 |
| **LOC (components)** | ~15,000 | ~14,500 | ~13,000 | ~12,500 | ~12,000 |

---

## Risk Matrix

| Component | Risk Level | Why | Mitigation |
|-----------|------------|-----|------------|
| Card consolidation | 🟡 Medium | High usage across site | Gradual migration, keep deprecated versions |
| Button consolidation | 🟡 Medium | 3 systems to merge | Create adapter components |
| Badge extraction | 🟢 Low | Simple inline patterns | Straightforward extraction |
| Layout changes | 🟢 Low | Well-isolated | Minimal changes needed |
| Visual effects | 🟢 Low | Independent components | No changes needed |
| Athletes First | 🟢 Low | Self-contained | Extract patterns only |
| CREaiT | 🟡 Medium | Shared with Cards | Test glassmorphism extraction |
| Heirloom | 🟢 Low | Self-contained | No changes needed |

---

## Decision Approval Checklist

Before implementing migration:

- [ ] Review component matrix with team
- [ ] Confirm base component API design
- [ ] Approve token naming conventions
- [ ] Set up testing infrastructure
- [ ] Create backup branch
- [ ] Schedule migration windows
- [ ] Assign component ownership
- [ ] Communicate to stakeholders

---

## Component Ownership Map

| Component | Primary Maintainer | Review Required |
|-----------|-------------------|-----------------|
| `Card` | Design System Team | Design Lead |
| `Button` | Design System Team | Design Lead |
| `Badge` | Design System Team | Design Lead |
| Athletes First components | Feature Team | Product Lead |
| CREaiT components | Feature Team | Product Lead |
| Heirloom components | Feature Team | Product Lead |

---

**This matrix should be reviewed weekly during migration.**

Update status and metrics after each phase completion.

**Last Updated:** Initial audit (December 9, 2025)

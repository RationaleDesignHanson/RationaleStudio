# ASCII Component Consolidation Plan

**Goal:** Reduce 18 ASCII components to 4-5 canonical implementations
**Bundle Size Reduction:** Estimated 15-20%

---

## Audit Results

### Usage Statistics (Total: 18 components)

**Grid Components (8 variants):**
- ✅ **ASCIIUnifiedGrid**: 461 uses ← **PRIMARY GRID (Keep)**
- ASCIIShaderGrid: 12 uses (Keep - shader-specific features)
- ZeroASCIIGrid: 8 uses (Keep - Zero product branding)
- InvestorASCIIGrid: 5 uses (Keep - investor dashboard branding)
- ❌ ASCIIShadedDotGrid: 4 uses (Deprecate → ASCIIUnifiedGrid)
- ❌ ASCIIDotGrid: 4 uses (Deprecate → ASCIIUnifiedGrid)
- ❌ AdaptiveASCIIGrid: 4 uses (Deprecate → ASCIIUnifiedGrid)
- ❌ ASCIIField: 3 uses (Deprecate → ASCIIUnifiedGrid)

**UI Components (3 variants):**
- ✅ **ASCIIWaveDivider**: 98 uses ← **PRIMARY DIVIDER (Keep)**
- ❌ ASCIIDivider: 3 uses (Deprecate → ASCIIWaveDivider)
- ❌ ASCIIBracket: 3 uses (Deprecate or inline)

**Background/Shader (1 variant):**
- ❌ ASCIIShaderBackground: 3 uses (Deprecate → ASCIIShaderGrid)

**Image Components (2 variants):**
- ❌ ASCIIImage: 3 uses (Deprecate or merge with ASCIIImageOptimized)
- ❌ ASCIIImageOptimized: 3 uses (Keep if needed, otherwise deprecate)

**Texture Components (3 variants - in `/ascii/` subdirectory):**
- ASCIITextureOverlay: 0 uses (Delete)
- ASCIIStaticTexture: 0 uses (Delete)
- ASCIIGlitch: 0 uses (Delete)
- ASCIIEdgeRoughness: 0 uses (Delete)

---

## Consolidation Strategy

### Phase A: Delete Unused (Immediate)
**4 components with 0 uses → Delete**

```bash
rm components/visual/ascii/ASCIITextureOverlay.tsx
rm components/visual/ascii/ASCIIStaticTexture.tsx
rm components/visual/ascii/ASCIIGlitch.tsx
rm components/visual/ascii/ASCIIEdgeRoughness.tsx
```

**Savings:** Immediate code cleanup, no migration needed

### Phase B: Deprecate Rarely Used (4 or fewer uses)
**9 components with ≤4 uses → Deprecate & Migrate**

#### Grid Components (4 to deprecate):
1. **ASCIIShadedDotGrid** (4 uses) → **ASCIIUnifiedGrid**
2. **ASCIIDotGrid** (4 uses) → **ASCIIUnifiedGrid**
3. **AdaptiveASCIIGrid** (4 uses) → **ASCIIUnifiedGrid**
4. **ASCIIField** (3 uses) → **ASCIIUnifiedGrid**

#### UI Components (2 to deprecate):
5. **ASCIIDivider** (3 uses) → **ASCIIWaveDivider**
6. **ASCIIBracket** (3 uses) → Inline or **ASCIIWaveDivider**

#### Background (1 to deprecate):
7. **ASCIIShaderBackground** (3 uses) → **ASCIIShaderGrid**

#### Image Components (2 to evaluate):
8. **ASCIIImage** (3 uses) → Evaluate if needed
9. **ASCIIImageOptimized** (3 uses) → Evaluate if needed

**Total Migrations Needed:** ~20-25 component replacements

### Phase C: Keep Canonical Implementations
**5 components to KEEP:**

1. ✅ **ASCIIUnifiedGrid** (461 uses) - Primary background grid
2. ✅ **ASCIIWaveDivider** (98 uses) - Primary section divider
3. ✅ **ASCIIShaderGrid** (12 uses) - Shader-specific effects
4. ✅ **ZeroASCIIGrid** (8 uses) - Zero product branding
5. ✅ **InvestorASCIIGrid** (5 uses) - Investor dashboard branding

**Rationale:**
- ASCIIUnifiedGrid: Dominant usage (461x), clearly canonical
- ASCIIWaveDivider: High usage (98x), distinct UI element
- Specialized grids: Low usage but serve specific branding purposes
- ASCIIShaderGrid: Unique shader functionality

---

## Migration Guide

### 1. Replace ASCIIShadedDotGrid (4 uses)

**Before:**
```tsx
import { ASCIIShadedDotGrid } from '@/components/visual/ASCIIShadedDotGrid';

<ASCIIShadedDotGrid />
```

**After:**
```tsx
import { ASCIIUnifiedGrid } from '@/components/visual/ASCIIUnifiedGrid';

<ASCIIUnifiedGrid />
```

**Find occurrences:**
```bash
grep -r "ASCIIShadedDotGrid" app/ components/ --include="*.tsx"
```

### 2. Replace ASCIIDotGrid (4 uses)

**Before:**
```tsx
import { ASCIIDotGrid } from '@/components/visual/ASCIIDotGrid';

<ASCIIDotGrid />
```

**After:**
```tsx
import { ASCIIUnifiedGrid } from '@/components/visual/ASCIIUnifiedGrid';

<ASCIIUnifiedGrid />
```

### 3. Replace ASCIIField (3 uses)

**Before:**
```tsx
import { ASCIIField } from '@/components/visual/ASCIIField';

<ASCIIField />
```

**After:**
```tsx
import { ASCIIUnifiedGrid } from '@/components/visual/ASCIIUnifiedGrid';

<ASCIIUnifiedGrid />
```

### 4. Replace ASCIIDivider (3 uses)

**Before:**
```tsx
import { ASCIIDivider } from '@/components/visual/ASCIIDivider';

<ASCIIDivider />
```

**After:**
```tsx
import { ASCIIWaveDivider } from '@/components/visual/ASCIIWaveDivider';

<ASCIIWaveDivider />
```

### 5. Replace ASCIIShaderBackground (3 uses)

**Before:**
```tsx
import { ASCIIShaderBackground } from '@/components/visual/ASCIIShaderBackground';

<ASCIIShaderBackground />
```

**After:**
```tsx
import { ASCIIShaderGrid } from '@/components/visual/ASCIIShaderGrid';

<ASCIIShaderGrid />
```

---

## Implementation Steps

### Step 1: Delete Unused Components (5 minutes)
```bash
# Delete 4 unused texture/effect components
rm components/visual/ascii/ASCIITextureOverlay.tsx
rm components/visual/ascii/ASCIIStaticTexture.tsx
rm components/visual/ascii/ASCIIGlitch.tsx
rm components/visual/ascii/ASCIIEdgeRoughness.tsx

# Check if ascii/ directory is now empty
ls components/visual/ascii/
# If only ASCIIImage*.tsx remain, that's fine
```

### Step 2: Find All Deprecated Component Uses (5 minutes)
```bash
# Create list of files to update
grep -rl "ASCIIShadedDotGrid\|ASCIIDotGrid\|ASCIIField\|AdaptiveASCIIGrid" app/ components/ --include="*.tsx" > /tmp/ascii-migrations.txt

grep -rl "ASCIIDivider\|ASCIIBracket" app/ components/ --include="*.tsx" >> /tmp/ascii-migrations.txt

grep -rl "ASCIIShaderBackground" app/ components/ --include="*.tsx" >> /tmp/ascii-migrations.txt

# Review list
cat /tmp/ascii-migrations.txt | sort | uniq
```

### Step 3: Replace Imports (15-20 minutes)
For each file in the migration list:

1. Open file
2. Find old import
3. Replace with canonical import
4. Update component usage if props differ
5. Test page still renders

### Step 4: Delete Deprecated Components (5 minutes)
```bash
# After all migrations complete and tested
rm components/visual/ASCIIShadedDotGrid.tsx
rm components/visual/ASCIIDotGrid.tsx
rm components/visual/ASCIIField.tsx
rm components/visual/AdaptiveASCIIGrid.tsx
rm components/visual/ASCIIDivider.tsx
rm components/visual/ASCIIBracket.tsx
rm components/visual/ASCIIShaderBackground.tsx
```

### Step 5: Verify Build (2 minutes)
```bash
npx tsc --noEmit
npm run build
```

---

## Expected Results

### Before Consolidation:
- **18 ASCII components**
- Confusing landscape (which one to use?)
- Duplicate functionality
- Larger bundle size

### After Consolidation:
- **5 canonical ASCII components** (13 removed)
- Clear component hierarchy
- ASCIIUnifiedGrid = default grid
- ASCIIWaveDivider = default divider
- Specialized variants for branding only
- **15-20% bundle size reduction** (estimated)

---

## Testing Checklist

After migration:
- [ ] Run TypeScript compiler (`npx tsc --noEmit`)
- [ ] Build project (`npm run build`)
- [ ] Visual regression test (check pages with ASCII grids)
- [ ] Test Zero product page (uses ZeroASCIIGrid)
- [ ] Test investor dashboard (uses InvestorASCIIGrid)
- [ ] Test public homepage (uses ASCIIUnifiedGrid)
- [ ] Check mobile rendering
- [ ] Verify no broken imports

---

## Rollback Plan

If issues arise:
1. Keep deprecated components (don't delete)
2. Mark as `@deprecated` in JSDoc
3. Add console warnings when used
4. Migrate gradually over time

Example deprecation:
```tsx
/**
 * @deprecated Use ASCIIUnifiedGrid instead
 * This component will be removed in v2.0
 */
export function ASCIIDotGrid() {
  console.warn('ASCIIDotGrid is deprecated. Use ASCIIUnifiedGrid instead.');
  return <ASCIIUnifiedGrid />;
}
```

---

## Timeline

| Phase | Task | Time | Status |
|-------|------|------|--------|
| A | Delete 4 unused components | 5 min | Ready |
| B | Find migration targets | 5 min | Ready |
| C | Migrate 20-25 usages | 20 min | Pending |
| D | Delete 9 deprecated components | 5 min | Pending |
| E | Test & verify | 10 min | Pending |
| **Total** | | **45 min** | |

---

## Summary

**From 18 → 5 components:**

**Keep:**
1. ASCIIUnifiedGrid (primary grid)
2. ASCIIWaveDivider (primary divider)
3. ASCIIShaderGrid (shader effects)
4. ZeroASCIIGrid (Zero branding)
5. InvestorASCIIGrid (Investor branding)

**Remove:**
- 4 unused (0 uses each)
- 9 deprecated (≤4 uses each)

**Result:** Cleaner codebase, smaller bundle, clear hierarchy

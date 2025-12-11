# Badge Component - API Documentation

**Location:** `components/ui/Badge.tsx`
**Status:** ✅ Production Ready
**Phase:** 4.1 - Design System Foundation

---

## Overview

The Badge component provides a unified system for displaying status indicators, categories, priorities, and other labeled metadata across the Rationale application. It replaces 5+ scattered badge implementations with a single, type-safe component using centralized color tokens.

### Key Benefits
- **Unified API** with automatic color mapping
- **Type-safe** via exported TypeScript types
- **Centralized colors** via `semantic-colors.ts`
- **Size variants** (sm, md, lg)
- **Convenience components** for common use cases
- **Eliminated 40+ lines** of duplicate badge code per component

---

## API Reference

### Badge Props

```typescript
interface BadgeProps {
  // Core Props
  variant: 'status' | 'category' | 'priority' | 'checkpoint' | 'project-status';
  value: string;                    // The key to look up in color mapping
  size?: 'sm' | 'md' | 'lg';       // Default: 'md'
  className?: string;               // Additional custom classes

  // Display
  label?: string;                   // Optional custom display text
}
```

### Size Specifications

| Size | Padding | Text Size | Use Case |
|------|---------|-----------|----------|
| `sm` | px-2 py-0.5 | text-xs | Compact lists, inline badges |
| `md` | px-2.5 py-1 | text-sm | Standard cards, default |
| `lg` | px-3 py-1.5 | text-base | Hero sections, emphasis |

---

## Convenience Components

### StatusBadge

For venture/project status indicators.

```typescript
interface StatusBadgeProps {
  status: StatusKey;  // 'active' | 'in-development' | 'spinout' | 'archived'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
import { StatusBadge } from '@/components/ui/Badge';

<StatusBadge status="active" size="md" />
<StatusBadge status="in-development" size="sm" />
<StatusBadge status="archived" size="lg" />
```

**Colors (from semantic-colors.ts):**
- `active` → Green (bg-green-500/20, text-green-400, border-green-500/30)
- `in-development` → Blue (bg-blue-500/20, text-blue-400, border-blue-500/30)
- `spinout` → Purple (bg-purple-500/20, text-purple-400, border-purple-500/30)
- `archived` → Gray (bg-gray-500/20, text-gray-400, border-gray-500/30)

---

### CategoryBadge

For content categorization.

```typescript
interface CategoryBadgeProps {
  category: CategoryKey;  // 'product' | 'research' | 'strategy' | 'engineering' | 'marketing'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
import { CategoryBadge } from '@/components/ui/Badge';

<CategoryBadge category="product" size="md" />
<CategoryBadge category="research" size="sm" />
<CategoryBadge category="strategy" size="md" />
```

**Colors:**
- `product` → Terminal Gold
- `research` → Blue
- `strategy` → Purple
- `engineering` → Cyan
- `marketing` → Pink

---

### PriorityBadge

For task/item prioritization.

```typescript
interface PriorityBadgeProps {
  priority: PriorityKey;  // 'high' | 'medium' | 'low' | 'none'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
import { PriorityBadge } from '@/components/ui/Badge';

<PriorityBadge priority="high" size="md" />
<PriorityBadge priority="medium" size="sm" />
<PriorityBadge priority="low" size="md" />
```

**Colors:**
- `high` → Red
- `medium` → Orange
- `low` → Blue
- `none` → Gray

---

### CheckpointBadge

For milestone/phase indicators.

```typescript
interface CheckpointBadgeProps {
  type: CheckpointTypeKey;  // 'design' | 'build' | 'launch'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
import { CheckpointBadge } from '@/components/ui/Badge';

<CheckpointBadge type="design" size="md" />
<CheckpointBadge type="build" size="md" />
<CheckpointBadge type="launch" size="lg" />
```

**Colors:**
- `design` → Blue
- `build` → Cyan
- `launch` → Green

---

### ProjectStatusBadge

For product/project lifecycle status.

```typescript
interface ProjectStatusBadgeProps {
  status: ProjectStatusKey;  // 'live' | 'beta' | 'delivered' | 'building'
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

**Usage:**
```tsx
import { ProjectStatusBadge } from '@/components/ui/Badge';

<ProjectStatusBadge status="live" size="md" />
<ProjectStatusBadge status="beta" size="sm" />
<ProjectStatusBadge status="building" size="md" />
```

**Colors:**
- `live` → Green (operational product)
- `beta` → Terminal Gold (testing phase)
- `delivered` → Blue (completed, handed off)
- `building` → Cyan (in development)

**Label Mapping:**
- `live` → "LIVE"
- `beta` → "BETA"
- `delivered` → "DELIVERED"
- `building` → "BUILDING"

---

## Usage Examples

### Example 1: Venture Card Status

```tsx
import { VentureCard } from '@/components/cards/VentureCard';
import { StatusBadge } from '@/components/ui/Badge';

<VentureCard>
  <div className="flex items-center justify-between">
    <h3>Zero Inbox</h3>
    <StatusBadge status="active" size="md" />
  </div>
  <p>AI email assistant in production...</p>
</VentureCard>
```

---

### Example 2: Insight Card Categories

```tsx
import { InsightCard } from '@/components/cards/InsightCard';
import { CategoryBadge } from '@/components/ui/Badge';

<InsightCard>
  <div className="flex gap-2">
    <CategoryBadge category="product" size="sm" />
    <CategoryBadge category="strategy" size="sm" />
  </div>
  <h3>Build-First Trap</h3>
  <p>Why most teams waste 6 months...</p>
</InsightCard>
```

---

### Example 3: Work Page Project Status

```tsx
import { ProjectStatusBadge } from '@/components/ui/Badge';

<div className="flex items-center justify-between mb-3">
  <h2 className="text-2xl font-bold">Zero</h2>
  <ProjectStatusBadge status="live" size="md" className="font-bold" />
</div>
```

---

### Example 4: Multiple Badges

```tsx
import { BaseCardBadgeContainer } from '@/components/ui/BaseCard';
import { StatusBadge, CategoryBadge, PriorityBadge } from '@/components/ui/Badge';

<BaseCard>
  <BaseCardHeader>
    <BaseCardTitle>Project Title</BaseCardTitle>
    <BaseCardBadgeContainer>
      <StatusBadge status="active" size="sm" />
      <CategoryBadge category="product" size="sm" />
      <PriorityBadge priority="high" size="sm" />
    </BaseCardBadgeContainer>
  </BaseCardHeader>
  <BaseCardContent>...</BaseCardContent>
</BaseCard>
```

---

### Example 5: Custom Label

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge
  variant="project-status"
  value="live"
  label="IN PRODUCTION"  // Custom display text
  size="md"
/>
```

---

## Migration Guide

### From Inline Badge Spans

**Before:**
```tsx
<span className="inline-block px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-400 font-medium">
  ACTIVE
</span>
```

**After:**
```tsx
<StatusBadge status="active" size="md" />
```

**Savings:** ~80 characters → ~35 characters (56% reduction)

---

### From Conditional Badge Logic

**Before:**
```tsx
const statusConfig = {
  active: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' },
  archived: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/30' },
  // ... more configs
};

<span className={`inline-block px-2.5 py-1 ${statusConfig[status].bg} ${statusConfig[status].text} ${statusConfig[status].border} rounded-full text-sm font-medium`}>
  {status.toUpperCase()}
</span>
```

**After:**
```tsx
<StatusBadge status={status} size="md" />
```

**Savings:** ~15 lines → 1 line (93% reduction)

---

## Color System Integration

All badge colors are centralized in `lib/design-tokens/semantic-colors.ts`:

```typescript
// STATUS_COLORS
export const STATUS_COLORS = {
  active: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
  },
  // ... more statuses
} as const;

// Helper function
export function getStatusColor(status: StatusKey): ColorSet {
  return STATUS_COLORS[status] || STATUS_COLORS.archived;
}
```

### Benefits:
- **Single source of truth** for all status colors
- **Type-safe** via exported TypeScript types
- **Easy global updates** - change once, applies everywhere
- **Consistent** across all components

---

## TypeScript Types

All badge types are exported from `semantic-colors.ts`:

```typescript
import {
  StatusKey,
  CategoryKey,
  PriorityKey,
  CheckpointTypeKey,
  ProjectStatusKey
} from '@/lib/design-tokens/semantic-colors';

// Usage in component props
interface VentureCardProps {
  status: StatusKey;  // Type-safe: only 'active' | 'in-development' | ...
}
```

---

## Best Practices

### 1. Use Convenience Components

```tsx
// ✅ Good
<StatusBadge status="active" />

// ❌ Avoid
<Badge variant="status" value="active" />
```

### 2. Consistent Sizing

Use the same size within a card:
```tsx
<BaseCard>
  <BaseCardBadgeContainer>
    <StatusBadge status="active" size="sm" />
    <CategoryBadge category="product" size="sm" />  // ✅ Matching size
  </BaseCardBadgeContainer>
</BaseCard>
```

### 3. Semantic Variants

Choose the variant that matches your data:
- **StatusBadge** for lifecycle states (active, archived, etc.)
- **CategoryBadge** for content types (product, research, etc.)
- **PriorityBadge** for urgency levels (high, medium, low)
- **ProjectStatusBadge** for product status (live, beta, building)

### 4. Type Safety

Always use the exported types:
```typescript
import { StatusKey } from '@/lib/design-tokens/semantic-colors';

interface Props {
  status: StatusKey;  // ✅ Type-safe
}

// ❌ Avoid
interface Props {
  status: string;  // Not type-safe
}
```

---

## Real-World Examples

See production usage in:

1. **VentureCard** - `components/cards/VentureCard.tsx` (line 42)
2. **InsightCard** - `components/cards/InsightCard.tsx` (line 38)
3. **CheckpointCard** - `components/cards/CheckpointCard.tsx` (line 25)
4. **FeaturedWorkCard** - `components/work/FeaturedWorkCard.tsx` (line 51)
5. **Work Page** - `app/(public)/work/page.tsx` (lines 100, 125, 151)

---

## Performance Notes

- Badge is a simple functional component (~30 lines)
- No heavy computations or side effects
- Color lookup is O(1) constant time
- Renders efficiently with React.memo optimization

---

## Related Components

- **BaseCard** - `components/ui/BaseCard.tsx` - Card container with BaseCardBadgeContainer
- **Semantic Colors** - `lib/design-tokens/semantic-colors.ts` - Centralized color system
- **ButtonHierarchy** - `components/ui/ButtonHierarchy.tsx` - CTA buttons for cards

---

## Migration Stats

### Before Badge Component
- 5+ scattered badge implementations
- 8 duplicate color object definitions
- ~40 lines of duplicate code per component
- Inconsistent styling across pages

### After Badge Component
- 1 unified Badge component
- 1 centralized color system
- ~1 line per badge instance
- **80% reduction** in badge-related code

---

**Last Updated:** December 10, 2025
**Phase:** 4.1 - Design System Foundation Complete
**Status:** ✅ Production Ready

# BaseCard Component - Usage Guide

**Location:** `components/ui/BaseCard.tsx`
**Status:** ✅ Production Ready
**Phase:** 4.2 - Card Consolidation

---

## Overview

BaseCard is the universal foundation for all card components in the Rationale design system. It provides a consistent API for creating cards with flexible variants, responsive padding, border accents, glow effects, and smart rendering.

### Key Benefits
- **Consistent API** across all card types
- **Smart rendering** (Link, button, or div based on props)
- **Responsive padding** via RESPONSIVE_PADDING tokens
- **Composable sub-components** (Header, Title, Content, Footer, etc.)
- **Type-safe** with comprehensive prop validation
- **Zero visual differences** from previous implementations

---

## API Reference

### BaseCard Props

```typescript
interface BaseCardProps {
  // Visual Variants
  variant?: 'default' | 'featured' | 'subtle' | 'interactive' | 'cta';
  size?: 'compact' | 'default' | 'large';
  paddingSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  // Styling
  borderAccent?: string;        // e.g., 'border-terminal-gold/30'
  glowEffect?: 'none' | 'subtle' | 'medium' | 'strong';
  borderRadius?: string;        // e.g., '0.75rem'
  className?: string;           // Additional custom classes

  // Interactivity
  interactive?: boolean;        // Adds hover effects
  onClick?: () => void;         // Makes card a button
  href?: string;                // Makes card a link

  // Accessibility
  ariaLabel?: string;

  // Content
  children: React.ReactNode;
}
```

### Variant Descriptions

| Variant | Use Case | Border | Shadow | Hover |
|---------|----------|--------|--------|-------|
| `default` | Standard cards | Gray 700 | None | Subtle |
| `featured` | Hero/highlighted cards | Accent color | Medium | Scale |
| `subtle` | Background/secondary cards | Transparent | None | None |
| `interactive` | Clickable cards | Gray 700 | Subtle | Border accent |
| `cta` | Call-to-action cards | Accent | Strong | Scale + glow |

### Size Options

| Size | Use Case | Typical Content |
|------|----------|-----------------|
| `compact` | List items, dense layouts | Title + 1-2 lines |
| `default` | Standard cards | Title + description + metadata |
| `large` | Feature cards, hero sections | Rich content, images, CTAs |

### Padding Size Tokens

Uses `RESPONSIVE_PADDING` from `lib/design-tokens/responsive-padding.ts`:

| Token | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| `xs` | p-2 | p-3 | p-4 |
| `sm` | p-3 | p-4 | p-5 |
| `md` | p-4 | p-5 | p-6 |
| `lg` | p-5 | p-6 | p-8 |
| `xl` | p-6 | p-8 | p-10 |

---

## Usage Examples

### Example 1: Basic Interactive Card

```tsx
import { BaseCard, BaseCardHeader, BaseCardContent } from '@/components/ui/BaseCard';

<BaseCard
  variant="interactive"
  paddingSize="md"
  href="/work/zero"
>
  <BaseCardHeader>
    <h3>Zero</h3>
    <span className="badge">Beta</span>
  </BaseCardHeader>
  <BaseCardContent>
    <p>AI email assistant that achieves Inbox Zero autonomously.</p>
  </BaseCardContent>
</BaseCard>
```

**Result:** Clickable card with hover effects, navigates to /work/zero

---

### Example 2: Featured Card with Glow

```tsx
<BaseCard
  variant="featured"
  paddingSize="lg"
  borderAccent="border-terminal-gold/30"
  glowEffect="medium"
  href="/overview"
>
  <BaseCardHeader>
    <BaseCardTitle>Rationale Methodology</BaseCardTitle>
    <BaseCardSubtitle>7-Prototype Framework</BaseCardSubtitle>
  </BaseCardHeader>
  <BaseCardContent>
    <p>Learn how we eliminate product risk in weeks, not quarters.</p>
  </BaseCardContent>
  <BaseCardFooter>
    <ButtonPrimary href="/overview">View Framework</ButtonPrimary>
  </BaseCardFooter>
</BaseCard>
```

**Result:** Hero card with terminal-gold glow, prominent CTA

---

### Example 3: Compact List Card

```tsx
<BaseCard
  variant="subtle"
  size="compact"
  paddingSize="sm"
  className="border-transparent"
>
  <BaseCardHeader>
    <BaseCardTitle>Build-First Trap</BaseCardTitle>
    <CategoryBadge category="strategy" />
  </BaseCardHeader>
  <BaseCardContent>
    <p className="text-sm text-gray-400">
      Why most teams waste 6 months building the wrong thing
    </p>
  </BaseCardContent>
</BaseCard>
```

**Result:** Minimal list item, no borders, compact spacing

---

### Example 4: CTA Card with Button

```tsx
<BaseCard
  variant="cta"
  paddingSize="lg"
  borderAccent="border-terminal-gold/50"
  glowEffect="strong"
  onClick={() => console.log('CTA clicked')}
  ariaLabel="Get started with Rationale"
>
  <div className="text-center">
    <h2 className="text-2xl font-bold mb-4">Ready to Ship Faster?</h2>
    <p className="text-gray-300 mb-6">
      From 2-week validation sprints to 18-month equity partnerships.
    </p>
    <ButtonPrimary size="lg">Schedule Intro Call</ButtonPrimary>
  </div>
</BaseCard>
```

**Result:** Eye-catching CTA with strong glow, clickable card

---

### Example 5: Work Project Card (Real-World)

```tsx
<BaseCard
  variant="interactive"
  paddingSize="md"
  borderAccent="border-terminal-gold/30"
  href="/work/zero"
  className="hover:border-terminal-gold/50"
>
  <BaseCardHeader>
    <div className="flex items-center justify-between">
      <BaseCardTitle>Zero</BaseCardTitle>
      <ProjectStatusBadge status="live" size="md" />
    </div>
  </BaseCardHeader>

  <BaseCardContent>
    <p className="text-sm text-gray-300 mb-4">
      AI email assistant. Learns preferences, handles routine responses.
    </p>

    <div className="space-y-2 text-sm">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4 text-terminal-gold" />
        <span>Used daily by team to validate workflows</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-terminal-gold" />
        <span>Investor preview available</span>
      </div>
    </div>
  </BaseCardContent>

  <BaseCardFooter>
    <ButtonTertiary href="/work/zero" className="gap-2">
      Learn More <ArrowRight className="w-4 h-4" />
    </ButtonTertiary>
  </BaseCardFooter>
</BaseCard>
```

**Result:** Full-featured project card matching homepage design

---

## Composable Sub-Components

### BaseCardHeader
Container for card titles, badges, and metadata.

```tsx
<BaseCardHeader className="border-b border-gray-700">
  <BaseCardTitle>Card Title</BaseCardTitle>
  <BaseCardSubtitle>Optional subtitle</BaseCardSubtitle>
</BaseCardHeader>
```

### BaseCardTitle
Primary heading for the card.

```tsx
<BaseCardTitle className="text-xl font-bold">
  Zero Inbox
</BaseCardTitle>
```

### BaseCardSubtitle
Secondary heading or tagline.

```tsx
<BaseCardSubtitle className="text-gray-400">
  AI Email Assistant
</BaseCardSubtitle>
```

### BaseCardContent
Main content area for descriptions, lists, etc.

```tsx
<BaseCardContent className="space-y-4">
  <p>Primary content goes here...</p>
  <ul>List items...</ul>
</BaseCardContent>
```

### BaseCardFooter
Container for actions, CTAs, metadata.

```tsx
<BaseCardFooter className="border-t border-gray-700 pt-4">
  <ButtonPrimary>Take Action</ButtonPrimary>
</BaseCardFooter>
```

### BaseCardBadgeContainer
Flex container for multiple badges.

```tsx
<BaseCardBadgeContainer>
  <StatusBadge status="active" />
  <CategoryBadge category="product" />
  <PriorityBadge priority="high" />
</BaseCardBadgeContainer>
```

---

## Migration Guide

### From ResponsiveBox

**Before:**
```tsx
<ResponsiveBox
  className="p-6 bg-gray-900/70 border border-gray-700"
  onClick={handleClick}
>
  <h3 className="text-lg font-bold">Title</h3>
  <p className="text-sm text-gray-300">Content</p>
</ResponsiveBox>
```

**After:**
```tsx
<BaseCard
  variant="default"
  paddingSize="md"
  onClick={handleClick}
>
  <BaseCardHeader>
    <BaseCardTitle>Title</BaseCardTitle>
  </BaseCardHeader>
  <BaseCardContent>
    <p>Content</p>
  </BaseCardContent>
</BaseCard>
```

### From GlassCard

**Before:**
```tsx
<GlassCard className="p-8">
  <h2>Featured Content</h2>
  <p>Description...</p>
</GlassCard>
```

**After:**
```tsx
<BaseCard
  variant="featured"
  paddingSize="lg"
  borderAccent="border-terminal-gold/30"
  glowEffect="medium"
>
  <BaseCardHeader>
    <BaseCardTitle>Featured Content</BaseCardTitle>
  </BaseCardHeader>
  <BaseCardContent>
    <p>Description...</p>
  </BaseCardContent>
</BaseCard>
```

---

## Best Practices

### 1. Use Semantic Variants
Choose the variant that matches the card's purpose:
- `default` for most cards
- `interactive` for clickable cards
- `featured` for primary/hero cards
- `cta` for conversion-focused cards

### 2. Leverage Padding Tokens
Use `paddingSize` instead of custom padding classes:
```tsx
// ✅ Good
<BaseCard paddingSize="md">

// ❌ Avoid
<BaseCard className="p-4 md:p-6">
```

### 3. Compose with Sub-Components
Use BaseCardHeader, BaseCardContent, BaseCardFooter for structure:
```tsx
// ✅ Good
<BaseCard>
  <BaseCardHeader>...</BaseCardHeader>
  <BaseCardContent>...</BaseCardContent>
  <BaseCardFooter>...</BaseCardFooter>
</BaseCard>

// ❌ Avoid
<BaseCard>
  <div className="mb-4">...</div>
  <div className="mb-6">...</div>
  <div className="pt-4">...</div>
</BaseCard>
```

### 4. Smart Rendering
Let BaseCard handle rendering logic:
```tsx
// ✅ Good - BaseCard renders as Link
<BaseCard href="/path">

// ✅ Good - BaseCard renders as button
<BaseCard onClick={handler}>

// ❌ Avoid wrapping in Link/button manually
<Link href="/path">
  <BaseCard>...</BaseCard>
</Link>
```

### 5. Border Accents
Use Tailwind classes for border colors:
```tsx
<BaseCard borderAccent="border-terminal-gold/30">   // Gold accent
<BaseCard borderAccent="border-[#00D9FF]/30">       // Cyan (Heirloom)
<BaseCard borderAccent="border-gray-700">           // Default gray
```

### 6. Glow Effects
Automatically extract color from `borderAccent`:
```tsx
<BaseCard
  borderAccent="border-terminal-gold/30"
  glowEffect="medium"
>
// Result: Golden glow extracted from border color
```

---

## Real-World Examples

See these files for production usage:

1. **VentureCard** - `components/cards/VentureCard.tsx`
2. **InsightCard** - `components/cards/InsightCard.tsx`
3. **KitCard** - `components/cards/KitCard.tsx`
4. **FeaturedWorkCard** - `components/work/FeaturedWorkCard.tsx`
5. **Homepage Cards** - `app/(public)/page.tsx` (lines 96-164)

---

## Performance Notes

- BaseCard is a lightweight wrapper (~50 lines)
- Sub-components are simple div wrappers (no overhead)
- Smart rendering avoids unnecessary elements
- Composable design allows tree-shaking

---

## Related Components

- **Badge** - `components/ui/Badge.tsx` - Status/category indicators
- **ButtonHierarchy** - `components/ui/ButtonHierarchy.tsx` - Buttons for card CTAs
- **RESPONSIVE_PADDING** - `lib/design-tokens/responsive-padding.ts` - Padding tokens

---

**Last Updated:** December 10, 2025
**Phase:** 4.2 - Card Consolidation Complete
**Status:** ✅ Production Ready

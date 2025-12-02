# Button Hierarchy System

Standardized button components for consistent CTA hierarchy across the site.

## Quick Start

```tsx
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '@/components/ui';

// As a link
<ButtonPrimary href="/contact">Start a conversation</ButtonPrimary>

// As a button
<ButtonPrimary onClick={handleSubmit}>Submit</ButtonPrimary>

// With size and width variants
<ButtonSecondary size="lg" fullWidth>View details</ButtonSecondary>

// Tertiary (text-only)
<ButtonTertiary href="/about">Learn more →</ButtonTertiary>
```

## Button Hierarchy

### 1. Primary Button
**Use for**: Main CTAs, primary actions, key conversions
- White text on accent background
- Prominent hover state
- Maximum visual weight

**Examples**:
- "Start a conversation"
- "Book a call"
- "Submit form"
- "Get started"

```tsx
<ButtonPrimary href="/contact">Start a conversation</ButtonPrimary>
<ButtonPrimary onClick={handleSubmit} disabled={!isValid}>
  Submit
</ButtonPrimary>
```

### 2. Secondary Button
**Use for**: Alternative actions, cancel buttons, secondary paths
- Foreground text with border
- Transparent background
- Medium visual weight

**Examples**:
- "View details"
- "Learn more"
- "Cancel"
- "Go back"

```tsx
<ButtonSecondary href="/services">View our services</ButtonSecondary>
<ButtonSecondary onClick={handleCancel}>Cancel</ButtonSecondary>
```

### 3. Tertiary Button
**Use for**: Low-priority actions, inline links, subtle navigation
- Accent color text
- No border or background
- Underline on hover
- Minimum visual weight

**Examples**:
- "Learn more →"
- "View all"
- "Skip for now"

```tsx
<ButtonTertiary href="/about">Learn more →</ButtonTertiary>
<ButtonTertiary onClick={handleSkip}>Skip for now</ButtonTertiary>
```

## Props

### All Buttons Support

```typescript
interface ButtonProps {
  // Content
  children: React.ReactNode;

  // Size variants
  size?: 'sm' | 'md' | 'lg';  // Default: 'md'

  // Width
  fullWidth?: boolean;  // Default: false

  // Custom styling
  className?: string;

  // Link behavior (makes it a Next.js Link)
  href?: string;

  // Button behavior (when not using href)
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';

  // All standard HTML button/anchor attributes
}
```

## Size Guide

### Small (`sm`)
- Padding: `px-4 py-2`
- Text: `text-sm`
- Use for: Compact actions, inline buttons, mobile-first designs

### Medium (`md`) - Default
- Padding: `px-6 py-3`
- Text: `text-base`
- Use for: Most CTAs, standard actions

### Large (`lg`)
- Padding: `px-8 py-4`
- Text: `text-lg`
- Use for: Hero CTAs, prominent actions, conversion-focused buttons

## Layout Patterns

### Single CTA
```tsx
<ButtonPrimary href="/contact" size="lg">
  Start a conversation
</ButtonPrimary>
```

### Primary + Secondary
```tsx
<div className="flex gap-4">
  <ButtonPrimary href="/contact">Get started</ButtonPrimary>
  <ButtonSecondary href="/services">View services</ButtonSecondary>
</div>
```

### Stacked (Mobile-Friendly)
```tsx
<div className="flex flex-col gap-3">
  <ButtonPrimary fullWidth>Submit application</ButtonPrimary>
  <ButtonSecondary fullWidth>Save as draft</ButtonSecondary>
  <ButtonTertiary>Cancel</ButtonTertiary>
</div>
```

## Accessibility

All buttons include:
- ✅ Keyboard focus ring (`focus:ring-2 focus:ring-accent`)
- ✅ Disabled state styling (`disabled:opacity-50 disabled:cursor-not-allowed`)
- ✅ Proper focus offset for visibility
- ✅ Minimum 48x48dp touch targets (when using default sizes)

## Migration Guide

### From inline styling:
```tsx
// ❌ Before
<Link
  href="/contact"
  className="px-8 py-3 text-base font-medium text-white bg-accent rounded-md hover:bg-accent/90"
>
  Start a conversation
</Link>

// ✅ After
<ButtonPrimary href="/contact">
  Start a conversation
</ButtonPrimary>
```

### From custom button components:
```tsx
// ❌ Before
<button
  onClick={handleSubmit}
  className="w-full px-6 py-3 text-base font-medium text-white bg-accent rounded-md"
  disabled={!isValid}
>
  Submit
</button>

// ✅ After
<ButtonPrimary onClick={handleSubmit} fullWidth disabled={!isValid}>
  Submit
</ButtonPrimary>
```

## Best Practices

### ✅ Do
- Use `ButtonPrimary` for one main action per section
- Use `ButtonSecondary` for alternative paths
- Use `ButtonTertiary` for low-priority actions
- Maintain 1-2 CTAs per section (avoid CTA overload)
- Use `fullWidth` on mobile for better touch targets

### ❌ Don't
- Don't use multiple `ButtonPrimary` in the same section
- Don't use `ButtonTertiary` for important conversions
- Don't mix button hierarchy with custom styled buttons
- Don't forget to add `disabled` state for loading actions

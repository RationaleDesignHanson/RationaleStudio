/**
 * CREaiT Design Tokens - Spacing
 *
 * Consistent spacing system for layouts and components
 */

export const CRE_SPACING = {
  // Component padding
  container: 'p-6 md:p-8',              // Main page containers
  card: 'p-5 md:p-6',                   // Card padding
  cardCompact: 'p-4',                   // Compact cards
  button: 'px-4 py-2',                  // Default button
  buttonLg: 'px-6 py-3',                // Large button

  // Gaps between elements
  gap: {
    xs: 'gap-2',              // 8px - Tight spacing
    sm: 'gap-4',              // 16px - Normal spacing
    md: 'gap-6',              // 24px - Comfortable spacing
    lg: 'gap-8',              // 32px - Section spacing
    xl: 'gap-12',             // 48px - Major sections
  },

  // Vertical rhythm (space-y)
  stack: {
    tight: 'space-y-2',       // 8px
    normal: 'space-y-4',      // 16px
    comfortable: 'space-y-6', // 24px
    loose: 'space-y-8',       // 32px
  },

  // Margins
  margin: {
    section: 'mb-8 md:mb-12',     // Section bottom margin
    heading: 'mb-3 md:mb-4',      // Heading bottom margin
    paragraph: 'mb-4',            // Paragraph spacing
    card: 'mb-6',                 // Card spacing
  },
} as const;

// Border radius system
export const CRE_RADIUS = {
  sm: 'rounded-lg',       // 8px - Buttons, small cards
  md: 'rounded-xl',       // 12px - Cards
  lg: 'rounded-2xl',      // 16px - Containers, panels
  xl: 'rounded-3xl',      // 24px - Page-level containers
  full: 'rounded-full',   // 9999px - Badges, avatars, dots
} as const;

// Shadow system
export const CRE_SHADOWS = {
  // Card shadows
  card: 'shadow-md hover:shadow-lg transition-shadow duration-300',
  cardHover: 'shadow-lg hover:shadow-xl transition-shadow duration-300',
  cardFloat: 'shadow-2xl',

  // Focus states (accessibility)
  focus: 'ring-2 ring-sky-500 ring-offset-2 ring-offset-slate-900',

  // Modal/overlay
  modal: 'shadow-[0_20px_50px_rgba(0,0,0,0.8)]',
} as const;

// Animation durations
export const CRE_ANIMATIONS = {
  // Transitions
  duration: {
    fast: 'duration-150',     // 150ms - Micro-interactions
    normal: 'duration-300',   // 300ms - Standard transitions
    slow: 'duration-500',     // 500ms - Page transitions
  },

  // Easing
  ease: {
    default: 'ease-in-out',
    in: 'ease-in',
    out: 'ease-out',
  },

  // Hover effects
  hover: {
    lift: 'hover:-translate-y-1 transition-transform duration-300',
    scale: 'hover:scale-105 transition-transform duration-300',
  },
} as const;

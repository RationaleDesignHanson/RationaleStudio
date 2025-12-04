/**
 * CREaiT Design Tokens - Typography
 *
 * Type scale optimized for investor presentations
 * Responsive sizing for mobile, tablet, and desktop
 */

export const CRE_TYPOGRAPHY = {
  // Display (page headers, hero statements)
  display: {
    xl: 'text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight',     // Hero: 48px → 64px → 112px
    lg: 'text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',     // Section: 40px → 48px → 80px
    md: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',     // Slide: 32px → 40px → 56px
  },

  // Headings (section titles, card headers)
  heading: {
    h1: 'text-3xl md:text-4xl font-semibold tracking-tight',             // 24px → 36px
    h2: 'text-2xl md:text-3xl font-semibold',                            // 20px → 24px
    h3: 'text-xl md:text-2xl font-semibold',                             // 18px → 20px
    h4: 'text-lg md:text-xl font-semibold',                              // 16px → 18px
  },

  // Body text
  body: {
    xl: 'text-lg md:text-xl leading-relaxed',                            // 18px → 24px (lead paragraphs)
    lg: 'text-base md:text-lg leading-relaxed',                          // 16px → 18px
    md: 'text-sm md:text-base leading-relaxed',                          // 14px → 16px
    sm: 'text-xs md:text-sm leading-normal',                             // 12px → 14px
  },

  // Labels and metadata
  label: {
    lg: 'text-sm md:text-base font-medium',                              // 14px → 16px
    md: 'text-xs md:text-sm font-medium',                                // 12px → 14px
    sm: 'text-xs font-medium uppercase tracking-wider',                  // 12px (section labels)
  },

  // Data/numbers (scores, metrics - tabular numerals)
  data: {
    xl: 'text-5xl md:text-6xl lg:text-7xl font-bold tabular-nums',      // 40px → 48px → 64px (giant metrics)
    lg: 'text-4xl md:text-5xl font-bold tabular-nums',                  // 32px → 40px
    md: 'text-3xl md:text-4xl font-semibold tabular-nums',              // 24px → 32px
    sm: 'text-2xl md:text-3xl font-semibold tabular-nums',              // 20px → 24px
  },

  // Font families
  font: {
    sans: 'font-sans',        // Inter (primary body/UI)
    display: 'font-display',  // Libre Franklin (headlines)
    mono: 'font-mono',        // IBM Plex Mono (data/code)
  },
} as const;

// Typography utilities for common patterns
export const TEXT_PATTERNS = {
  slideHeadline: `${CRE_TYPOGRAPHY.display.md} ${CRE_TYPOGRAPHY.font.display}`,
  slideContent: `${CRE_TYPOGRAPHY.body.lg} ${CRE_TYPOGRAPHY.font.sans}`,
  heroMetric: `${CRE_TYPOGRAPHY.data.xl} ${CRE_TYPOGRAPHY.font.display}`,
  cardTitle: `${CRE_TYPOGRAPHY.heading.h3} ${CRE_TYPOGRAPHY.font.display}`,
  sectionLabel: `${CRE_TYPOGRAPHY.label.sm} ${CRE_TYPOGRAPHY.font.sans}`,
  bodyText: `${CRE_TYPOGRAPHY.body.md} ${CRE_TYPOGRAPHY.font.sans}`,
  metricValue: `${CRE_TYPOGRAPHY.data.lg} ${CRE_TYPOGRAPHY.font.mono}`,
} as const;

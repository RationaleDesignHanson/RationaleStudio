/**
 * BaseCard Component
 *
 * Universal card foundation for consolidated card system.
 * Designed to replace VentureCard, InsightCard, KitCard, and FeaturedWorkCard variants.
 *
 * Phase 4.2: Card Consolidation Implementation
 *
 * Features:
 * - Flexible variants (default, featured, subtle, interactive, cta)
 * - Responsive sizing (compact, default, large)
 * - Customizable padding via responsive tokens
 * - Border accent colors
 * - Glow effects
 * - Interactive hover states
 * - Support for both Link and onClick handlers
 */

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { RESPONSIVE_PADDING } from '@/lib/styles/responsive-patterns';
import type { GlassCardPadding } from '@/components/visual/GlassCard';

export interface BaseCardProps {
  /**
   * Card children content
   */
  children: ReactNode;

  /**
   * Visual variant of the card
   */
  variant?: 'default' | 'featured' | 'subtle' | 'interactive' | 'cta';

  /**
   * Size preset
   */
  size?: 'compact' | 'default' | 'large';

  /**
   * Padding size using responsive tokens
   */
  paddingSize?: GlassCardPadding;

  /**
   * Border accent color (Tailwind class)
   * Examples: 'border-terminal-gold/30', 'border-blue-500/30'
   */
  borderAccent?: string;

  /**
   * Glow effect intensity
   */
  glowEffect?: 'none' | 'subtle' | 'medium' | 'strong';

  /**
   * Enable interactive hover states
   */
  interactive?: boolean;

  /**
   * Click handler (for buttons)
   */
  onClick?: () => void;

  /**
   * Link href (for navigation)
   */
  href?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
}

/**
 * Get variant-specific classes
 */
function getVariantClasses(variant: BaseCardProps['variant'] = 'default'): string {
  switch (variant) {
    case 'featured':
      return 'border-2 shadow-lg';
    case 'subtle':
      return 'border bg-gray-900/30';
    case 'interactive':
      return 'border hover:shadow-xl transition-shadow duration-300';
    case 'cta':
      return 'border-2 shadow-2xl hover:scale-[1.02] transition-transform duration-200';
    case 'default':
    default:
      return 'border';
  }
}

/**
 * Get size-specific classes
 */
function getSizeClasses(size: BaseCardProps['size'] = 'default'): string {
  switch (size) {
    case 'compact':
      return 'text-sm';
    case 'large':
      return 'text-lg';
    case 'default':
    default:
      return 'text-base';
  }
}

/**
 * Get glow effect classes
 */
function getGlowClasses(
  glowEffect: BaseCardProps['glowEffect'] = 'none',
  borderAccent?: string
): string {
  if (glowEffect === 'none') return '';

  // Extract color from border class (e.g., 'border-terminal-gold/30' -> 'terminal-gold')
  const colorMatch = borderAccent?.match(/border-([a-z-]+)/)?.[1];
  const color = colorMatch || 'gray';

  switch (glowEffect) {
    case 'subtle':
      return `shadow-sm shadow-${color}/10`;
    case 'medium':
      return `shadow-md shadow-${color}/20`;
    case 'strong':
      return `shadow-lg shadow-${color}/30`;
    default:
      return '';
  }
}

/**
 * Get interactive hover classes
 */
function getInteractiveClasses(interactive: boolean): string {
  if (!interactive) return '';
  return 'hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 cursor-pointer';
}

/**
 * BaseCard Component
 */
export function BaseCard({
  children,
  variant = 'default',
  size = 'default',
  paddingSize = 'md',
  borderAccent = 'border-gray-700',
  glowEffect = 'none',
  interactive = false,
  onClick,
  href,
  className = '',
  ariaLabel,
}: BaseCardProps) {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const paddingClass = RESPONSIVE_PADDING[paddingSize];
  const glowClasses = getGlowClasses(glowEffect, borderAccent);
  const interactiveClasses = getInteractiveClasses(interactive || !!onClick || !!href);

  const baseClasses = `
    rounded-lg
    bg-gray-900/70
    h-full
    ${borderAccent}
    ${variantClasses}
    ${sizeClasses}
    ${paddingClass}
    ${glowClasses}
    ${interactiveClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} aria-label={ariaLabel} className="block">
        <div className={baseClasses}>
          {children}
        </div>
      </Link>
    );
  }

  // Render as button if onClick is provided
  if (onClick) {
    return (
      <button
        onClick={onClick}
        aria-label={ariaLabel}
        className={baseClasses}
        type="button"
      >
        {children}
      </button>
    );
  }

  // Render as plain div
  return (
    <div className={baseClasses} aria-label={ariaLabel}>
      {children}
    </div>
  );
}

/**
 * Convenience Sub-Components for Common Card Patterns
 */

export function BaseCardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function BaseCardTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-xl font-bold text-white ${className}`}>
      {children}
    </h3>
  );
}

export function BaseCardSubtitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm text-gray-400 ${className}`}>
      {children}
    </p>
  );
}

export function BaseCardContent({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-gray-300 leading-relaxed ${className}`}>
      {children}
    </div>
  );
}

export function BaseCardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-700 ${className}`}>
      {children}
    </div>
  );
}

export function BaseCardBadgeContainer({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {children}
    </div>
  );
}

export default BaseCard;

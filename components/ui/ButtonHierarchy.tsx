/**
 * Button Hierarchy System
 *
 * Standardized button components for consistent CTA hierarchy:
 * - ButtonPrimary: Main CTAs (accent background, white text)
 * - ButtonSecondary: Alternative actions (border, transparent background)
 * - ButtonTertiary: Text-only links (no border, accent color)
 *
 * Works with both <button> and <Link> elements.
 */

'use client';

import Link from 'next/link';
import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends BaseButtonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseButtonProps | 'href'> {
  href: string;
}

type StandardButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Base Button component with variant support
 */
export function StandardButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  href,
  ...props
}: StandardButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'text-white bg-accent hover:bg-accent/90',
    secondary: 'text-foreground bg-transparent border border-border hover:bg-accent/10 hover:border-accent',
    tertiary: 'text-accent hover:text-accent/80 hover:underline',
  };

  // Size styles
  const sizeStyles = {
    sm: variant === 'tertiary' ? 'text-sm' : 'px-4 py-2 text-sm',
    md: variant === 'tertiary' ? 'text-base' : 'px-6 py-3 text-base',
    lg: variant === 'tertiary' ? 'text-lg' : 'px-8 py-4 text-lg',
  };

  // Width styles
  const widthStyles = fullWidth ? 'w-full' : '';

  // Combine all styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`.trim();

  // Render as Link if href is provided
  if (href) {
    return (
      <Link href={href} className={combinedStyles} {...(props as any)}>
        {children}
      </Link>
    );
  }

  // Render as button
  return (
    <button className={combinedStyles} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

// Prop types for exported button components (without variant)
type ButtonPrimaryProps = Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>;
type ButtonSecondaryProps = Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>;
type ButtonTertiaryProps = Omit<ButtonAsButton, 'variant'> | Omit<ButtonAsLink, 'variant'>;

/**
 * Primary Button - Main CTAs
 * Use for: Primary actions, main conversions, key CTAs
 */
export function ButtonPrimary(props: ButtonPrimaryProps) {
  return <StandardButton variant="primary" {...props} />;
}

/**
 * Secondary Button - Alternative actions
 * Use for: Secondary actions, cancel buttons, alternative paths
 */
export function ButtonSecondary(props: ButtonSecondaryProps) {
  return <StandardButton variant="secondary" {...props} />;
}

/**
 * Tertiary Button - Text-only links
 * Use for: Low-priority actions, inline links, subtle navigation
 */
export function ButtonTertiary(props: ButtonTertiaryProps) {
  return <StandardButton variant="tertiary" {...props} />;
}

/**
 * InteractiveCard Component
 *
 * Interactive card with hover-reactive shader backgrounds.
 * Perfect for project showcases, case studies, and portfolio items.
 *
 * Features:
 * - Hover-reactive shader intensity
 * - Smooth scale and elevation transitions
 * - Optional image/media support
 * - Terminal-style borders and accents
 * - Customizable shader themes per card
 */

'use client';

import { useState, ReactNode } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { type WatercolorTheme } from '@/lib/theme/watercolor-palette';

export interface InteractiveCardProps {
  title: string;
  description?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  shaderTheme?: WatercolorTheme;
  shaderOpacity?: number;
  shaderOpacityHover?: number;
  href?: string;
  onClick?: () => void;
  tags?: string[];
  className?: string;
  variant?: 'default' | 'featured' | 'compact';
}

export function InteractiveCard({
  title,
  description,
  children,
  image,
  imageAlt,
  shaderTheme = { colors: ['#1f2937', '#374151', '#FFD700'], name: 'default-theme', primary: '#FFD700', description: 'Default theme' },
  shaderOpacity = 0.05,
  shaderOpacityHover = 0.15,
  href,
  onClick,
  tags = [],
  className = '',
  variant = 'default',
}: InteractiveCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  const isClickable = !!(onClick || href);

  const variantStyles = {
    default: 'p-6',
    featured: 'p-8',
    compact: 'p-4',
  };

  const variantTitleStyles = {
    default: 'text-xl',
    featured: 'text-2xl',
    compact: 'text-lg',
  };

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-terminal-gold/30 bg-black transition-all duration-300 ${
        isClickable ? 'cursor-pointer' : ''
      } ${isHovered ? 'scale-[1.02] shadow-lg shadow-[#FFD700]/20' : ''} ${
        variantStyles[variant]
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
    >
      {/* Shader Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={isHovered ? shaderOpacityHover : shaderOpacity}
          animated={true}
          colorTheme={shaderTheme}
          charSet="default"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Image Section */}
        {image && (
          <div className="mb-4 -mx-6 -mt-6 overflow-hidden">
            <img
              src={image}
              alt={imageAlt || title}
              className={`w-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-105' : ''
              }`}
              style={{ height: variant === 'featured' ? '240px' : '180px' }}
            />
          </div>
        )}

        {/* Terminal-style Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-terminal-gold/60" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/40" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/20" />
          </div>
          <div className="h-px flex-1 bg-terminal-gold/20" />
        </div>

        {/* Title */}
        <h3
          className={`font-semibold text-gray-100 mb-2 transition-colors ${
            variantTitleStyles[variant]
          } ${isHovered ? 'text-terminal-gold' : ''}`}
        >
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">
            {description}
          </p>
        )}

        {/* Custom Children Content */}
        {children && <div className="mb-4">{children}</div>}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-mono rounded bg-terminal-gold/10 border border-terminal-gold/30 text-terminal-gold"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Hover Indicator */}
        {isClickable && (
          <div
            className={`mt-4 pt-4 border-t border-terminal-gold/20 flex items-center justify-between transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-xs font-mono text-terminal-gold">
              {href ? 'OPEN LINK' : 'CLICK TO INTERACT'}
            </span>
            <svg
              className="w-4 h-4 text-terminal-gold transition-transform duration-200"
              style={{
                transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
              }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

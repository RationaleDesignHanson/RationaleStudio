/**
 * ResponsiveImage Component
 *
 * Automatically serves optimized responsive images with WebP support
 * and proper fallbacks for older browsers.
 *
 * Features:
 * - Serves WebP with JPEG/PNG fallback
 * - Responsive srcset with 5 breakpoints (400w, 800w, 1200w, 1600w, 2400w)
 * - Lazy loading by default
 * - Proper alt text for accessibility
 * - Maintains aspect ratio with CSS
 *
 * Usage:
 *   <ResponsiveImage
 *     src="/images/work/zero/screenshot.png"
 *     alt="Zero Inbox Screenshot"
 *     width={1200}
 *     height={800}
 *     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
 *   />
 */

import React from 'react';

interface ResponsiveImageProps {
  /** Original image path relative to /public (e.g., "/images/work/zero/screenshot.png") */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Original image width in pixels */
  width: number;
  /** Original image height in pixels */
  height: number;
  /** Sizes attribute for responsive images (default: "100vw") */
  sizes?: string;
  /** Loading strategy (default: "lazy") */
  loading?: 'lazy' | 'eager';
  /** Additional CSS classes */
  className?: string;
  /** Priority image (disables lazy loading, useful for above-the-fold images) */
  priority?: boolean;
  /** Object fit CSS property */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const BREAKPOINTS = [400, 800, 1200, 1600, 2400];

/**
 * Generate optimized image path
 */
function getOptimizedPath(src: string, width: number, format: 'webp' | 'original'): string {
  // Remove leading slash and public prefix
  const cleanSrc = src.replace(/^\//, '');

  // Get file extension
  const ext = cleanSrc.split('.').pop();
  const basePath = cleanSrc.replace(`.${ext}`, '');

  if (format === 'webp') {
    return `/optimized/${basePath}-${width}w.webp`;
  } else {
    return `/optimized/${basePath}-${width}w.${ext}`;
  }
}

/**
 * Generate srcset string for a format
 */
function generateSrcSet(src: string, maxWidth: number, format: 'webp' | 'original'): string {
  // Only include breakpoints up to the max width
  const applicableBreakpoints = BREAKPOINTS.filter(bp => bp <= maxWidth);

  return applicableBreakpoints
    .map(width => `${getOptimizedPath(src, width, format)} ${width}w`)
    .join(', ');
}

/**
 * Check if optimized images exist
 * (In production, you'd want to pre-generate these during build)
 */
function shouldUseOptimized(): boolean {
  // For now, always return true if NODE_ENV is production
  // In dev, you can run the optimization script manually
  return process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_USE_OPTIMIZED_IMAGES === 'true';
}

export function ResponsiveImage({
  src,
  alt,
  width,
  height,
  sizes = '100vw',
  loading = 'lazy',
  className = '',
  priority = false,
  objectFit = 'cover',
}: ResponsiveImageProps) {
  const useOptimized = shouldUseOptimized();

  // Calculate aspect ratio for responsive sizing
  const aspectRatio = (height / width) * 100;

  if (!useOptimized) {
    // Fallback to original image in development
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        className={className}
        style={{
          width: '100%',
          height: 'auto',
          objectFit,
        }}
      />
    );
  }

  // Use picture element with WebP and fallback
  return (
    <picture className={className}>
      {/* WebP source */}
      <source
        type="image/webp"
        srcSet={generateSrcSet(src, width, 'webp')}
        sizes={sizes}
      />

      {/* Fallback to original format (JPEG/PNG) */}
      <source
        type={`image/${src.endsWith('.png') ? 'png' : 'jpeg'}`}
        srcSet={generateSrcSet(src, width, 'original')}
        sizes={sizes}
      />

      {/* Fallback img tag */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        style={{
          width: '100%',
          height: 'auto',
          objectFit,
        }}
      />
    </picture>
  );
}

/**
 * Convenience wrapper for background images
 */
export function ResponsiveBackgroundImage({
  src,
  alt,
  width,
  height,
  children,
  className = '',
  overlay = false,
  overlayOpacity = 0.5,
}: ResponsiveImageProps & {
  children?: React.ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
}) {
  return (
    <div className={`relative ${className}`}>
      <ResponsiveImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="absolute inset-0 w-full h-full"
        objectFit="cover"
        priority={true}
      />
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ResponsiveImage;

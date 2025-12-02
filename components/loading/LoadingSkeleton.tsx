/**
 * Loading Skeleton Components
 *
 * Reusable skeleton loaders for better perceived performance.
 * Provides visual feedback while content is loading.
 */

import React from 'react';

interface SkeletonProps {
  className?: string;
}

/**
 * Base Skeleton Component
 */
export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-muted/30 rounded ${className}`}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

/**
 * Text Skeleton - For paragraph and heading placeholders
 */
interface TextSkeletonProps {
  lines?: number;
  className?: string;
}

export function TextSkeleton({ lines = 3, className = '' }: TextSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading text...">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-muted/30 rounded animate-pulse ${
            i === lines - 1 ? 'w-3/4' : 'w-full'
          }`}
        />
      ))}
      <span className="sr-only">Loading text...</span>
    </div>
  );
}

/**
 * Card Skeleton - For card/article placeholders
 */
export function CardSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`p-6 border border-border rounded-lg ${className}`}
      role="status"
      aria-label="Loading card..."
    >
      {/* Image placeholder */}
      <div className="w-full h-48 bg-muted/30 rounded-lg mb-4 animate-pulse" />

      {/* Title placeholder */}
      <div className="h-6 bg-muted/30 rounded w-3/4 mb-3 animate-pulse" />

      {/* Text placeholders */}
      <div className="space-y-2">
        <div className="h-4 bg-muted/30 rounded w-full animate-pulse" />
        <div className="h-4 bg-muted/30 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-muted/30 rounded w-4/6 animate-pulse" />
      </div>

      {/* Button placeholder */}
      <div className="mt-4 h-10 bg-muted/30 rounded w-32 animate-pulse" />

      <span className="sr-only">Loading card...</span>
    </div>
  );
}

/**
 * Table Skeleton - For table placeholders
 */
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({ rows = 5, columns = 4, className = '' }: TableSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`} role="status" aria-label="Loading table...">
      {/* Header */}
      <div className="flex gap-4 pb-3 border-b border-border">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={`header-${i}`} className="h-5 bg-muted/40 rounded flex-1 animate-pulse" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              className="h-10 bg-muted/30 rounded flex-1 animate-pulse"
            />
          ))}
        </div>
      ))}

      <span className="sr-only">Loading table...</span>
    </div>
  );
}

/**
 * Avatar Skeleton - For profile image placeholders
 */
interface AvatarSkeletonProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarSkeleton({ size = 'md', className = '' }: AvatarSkeletonProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-muted/30 animate-pulse ${className}`}
      role="status"
      aria-label="Loading avatar..."
    >
      <span className="sr-only">Loading avatar...</span>
    </div>
  );
}

/**
 * List Skeleton - For list item placeholders
 */
interface ListSkeletonProps {
  items?: number;
  className?: string;
}

export function ListSkeleton({ items = 5, className = '' }: ListSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`} role="status" aria-label="Loading list...">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <AvatarSkeleton size="sm" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted/30 rounded w-1/3 animate-pulse" />
            <div className="h-3 bg-muted/30 rounded w-2/3 animate-pulse" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading list...</span>
    </div>
  );
}

/**
 * Form Skeleton - For form placeholders
 */
interface FormSkeletonProps {
  fields?: number;
  className?: string;
}

export function FormSkeleton({ fields = 4, className = '' }: FormSkeletonProps) {
  return (
    <div className={`space-y-6 ${className}`} role="status" aria-label="Loading form...">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          {/* Label */}
          <div className="h-4 bg-muted/30 rounded w-24 animate-pulse" />
          {/* Input */}
          <div className="h-12 bg-muted/30 rounded w-full animate-pulse" />
        </div>
      ))}

      {/* Submit button */}
      <div className="h-12 bg-muted/40 rounded w-32 animate-pulse" />

      <span className="sr-only">Loading form...</span>
    </div>
  );
}

/**
 * Dashboard Stats Skeleton - For metric cards
 */
export function DashboardStatsSkeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="p-6 border border-border rounded-lg"
          role="status"
          aria-label="Loading stat..."
        >
          <div className="h-4 bg-muted/30 rounded w-20 mb-3 animate-pulse" />
          <div className="h-8 bg-muted/30 rounded w-24 mb-2 animate-pulse" />
          <div className="h-3 bg-muted/30 rounded w-32 animate-pulse" />
        </div>
      ))}
    </div>
  );
}

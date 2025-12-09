/**
 * Badge Component
 *
 * Unified badge system with automatic color mapping based on variant and value.
 * Replaces scattered badge implementations across the codebase.
 *
 * Phase 4.1: Design System Consolidation
 *
 * Usage:
 * ```tsx
 * <Badge variant="status" value="Active" />
 * <Badge variant="category" value="AI" />
 * <Badge variant="priority" value="High" />
 * <Badge variant="checkpoint" value="design" />
 * ```
 */

import React from 'react';
import {
  STATUS_COLORS,
  CATEGORY_COLORS,
  PRIORITY_COLORS,
  CHECKPOINT_TYPE_COLORS,
  PROJECT_STATUS_COLORS,
  type StatusKey,
  type CategoryKey,
  type PriorityKey,
  type CheckpointTypeKey,
  type ProjectStatusKey,
} from '@/lib/design-tokens/semantic-colors';

export interface BadgeProps {
  /**
   * Badge variant determines the color mapping system
   */
  variant: 'status' | 'category' | 'priority' | 'checkpoint' | 'project-status';

  /**
   * The badge value (determines specific color within variant)
   */
  value: string;

  /**
   * Size variant
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Get color classes based on variant and value
 */
function getBadgeColors(variant: BadgeProps['variant'], value: string): string {
  switch (variant) {
    case 'status':
      const statusColors = STATUS_COLORS[value as StatusKey];
      if (!statusColors) return STATUS_COLORS['Archived'].bg + ' ' + STATUS_COLORS['Archived'].text + ' ' + STATUS_COLORS['Archived'].border;
      return `${statusColors.bg} ${statusColors.text} ${statusColors.border}`;

    case 'category':
      const categoryColors = CATEGORY_COLORS[value as CategoryKey];
      if (!categoryColors) return CATEGORY_COLORS['Product'].bg + ' ' + CATEGORY_COLORS['Product'].text + ' ' + CATEGORY_COLORS['Product'].border;
      return `${categoryColors.bg} ${categoryColors.text} ${categoryColors.border}`;

    case 'priority':
      const priorityColors = PRIORITY_COLORS[value as PriorityKey];
      if (!priorityColors) return PRIORITY_COLORS['None'].bg + ' ' + PRIORITY_COLORS['None'].text + ' ' + PRIORITY_COLORS['None'].border;
      return `${priorityColors.bg} ${priorityColors.text} ${priorityColors.border}`;

    case 'checkpoint':
      const checkpointColors = CHECKPOINT_TYPE_COLORS[value as CheckpointTypeKey];
      if (!checkpointColors) return CHECKPOINT_TYPE_COLORS['design'].bg + ' ' + CHECKPOINT_TYPE_COLORS['design'].text + ' ' + CHECKPOINT_TYPE_COLORS['design'].border;
      return `${checkpointColors.bg} ${checkpointColors.text} ${checkpointColors.border}`;

    case 'project-status':
      const projectColors = PROJECT_STATUS_COLORS[value as ProjectStatusKey];
      if (!projectColors) return PROJECT_STATUS_COLORS['building'].bg + ' ' + PROJECT_STATUS_COLORS['building'].text + ' ' + PROJECT_STATUS_COLORS['building'].border;
      return `${projectColors.bg} ${projectColors.text} ${projectColors.border}`;

    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
}

/**
 * Get size classes
 */
function getSizeClasses(size: BadgeProps['size'] = 'md'): string {
  switch (size) {
    case 'sm':
      return 'px-2 py-0.5 text-xs';
    case 'md':
      return 'px-2.5 py-1 text-xs';
    case 'lg':
      return 'px-3 py-1.5 text-sm';
    default:
      return 'px-2.5 py-1 text-xs';
  }
}

/**
 * Badge Component
 */
export function Badge({
  variant,
  value,
  size = 'md',
  className = '',
}: BadgeProps) {
  const colorClasses = getBadgeColors(variant, value);
  const sizeClasses = getSizeClasses(size);
  const baseClasses = 'inline-flex items-center rounded-full font-medium border';

  // For project-status variant, display the label instead of the key
  const displayValue = variant === 'project-status'
    ? (PROJECT_STATUS_COLORS[value as ProjectStatusKey]?.label || value)
    : value;

  return (
    <span className={`${baseClasses} ${sizeClasses} ${colorClasses} ${className}`}>
      {displayValue}
    </span>
  );
}

/**
 * Convenience Components
 * Type-safe badge variants for specific use cases
 */

export function StatusBadge({
  status,
  size,
  className,
}: {
  status: StatusKey;
  size?: BadgeProps['size'];
  className?: string;
}) {
  return <Badge variant="status" value={status} size={size} className={className} />;
}

export function CategoryBadge({
  category,
  size,
  className,
}: {
  category: CategoryKey;
  size?: BadgeProps['size'];
  className?: string;
}) {
  return <Badge variant="category" value={category} size={size} className={className} />;
}

export function PriorityBadge({
  priority,
  size,
  className,
}: {
  priority: PriorityKey;
  size?: BadgeProps['size'];
  className?: string;
}) {
  return <Badge variant="priority" value={priority} size={size} className={className} />;
}

export function CheckpointBadge({
  type,
  size,
  className,
}: {
  type: CheckpointTypeKey;
  size?: BadgeProps['size'];
  className?: string;
}) {
  return <Badge variant="checkpoint" value={type} size={size} className={className} />;
}

export function ProjectStatusBadge({
  status,
  size,
  className,
}: {
  status: ProjectStatusKey;
  size?: BadgeProps['size'];
  className?: string;
}) {
  return <Badge variant="project-status" value={status} size={size} className={className} />;
}

export default Badge;

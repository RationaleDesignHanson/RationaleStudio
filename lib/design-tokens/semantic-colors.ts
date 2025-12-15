/**
 * Semantic Color Definitions
 *
 * Centralized color mappings for status badges, category badges,
 * and other semantic UI elements across the application.
 *
 * Phase 4.1: Design System Consolidation
 * Eliminates duplicate color object definitions scattered across components
 */

/**
 * Status Badge Colors
 * Used for: Venture status, work status, project status
 *
 * Previously defined in:
 * - components/cards/VentureCard.tsx
 * - components/work/FeaturedWorkCard.tsx
 */
export const STATUS_COLORS = {
  'In Development': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    darkBg: 'dark:bg-blue-900/20',
    darkText: 'dark:text-blue-400',
  },
  'Active': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    darkBg: 'dark:bg-green-900/20',
    darkText: 'dark:text-green-400',
  },
  'Spinout': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    darkBg: 'dark:bg-purple-900/20',
    darkText: 'dark:text-purple-400',
  },
  'Archived': {
    bg: 'bg-gray-100',
    text: 'text-gray-700',
    border: 'border-gray-200',
    darkBg: 'dark:bg-gray-900/20',
    darkText: 'dark:text-gray-400',
  },
  'Completed': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    darkBg: 'dark:bg-emerald-900/20',
    darkText: 'dark:text-emerald-400',
  },
  'On Hold': {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
    border: 'border-yellow-200',
    darkBg: 'dark:bg-yellow-900/20',
    darkText: 'dark:text-yellow-400',
  },
} as const;

/**
 * Category Badge Colors
 * Used for: Insight categories, blog tags, content classification
 *
 * Previously defined in:
 * - components/cards/InsightCard.tsx
 */
export const CATEGORY_COLORS = {
  'Product': {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
    border: 'border-blue-200',
    darkBg: 'dark:bg-blue-900/20',
    darkText: 'dark:text-blue-400',
  },
  'AI': {
    bg: 'bg-purple-100',
    text: 'text-purple-700',
    border: 'border-purple-200',
    darkBg: 'dark:bg-purple-900/20',
    darkText: 'dark:text-purple-400',
  },
  'Design': {
    bg: 'bg-pink-100',
    text: 'text-pink-700',
    border: 'border-pink-200',
    darkBg: 'dark:bg-pink-900/20',
    darkText: 'dark:text-pink-400',
  },
  'Strategy': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
    darkBg: 'dark:bg-green-900/20',
    darkText: 'dark:text-green-400',
  },
  'Process': {
    bg: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
    darkBg: 'dark:bg-orange-900/20',
    darkText: 'dark:text-orange-400',
  },
  'Engineering': {
    bg: 'bg-cyan-100',
    text: 'text-cyan-700',
    border: 'border-cyan-200',
    darkBg: 'dark:bg-cyan-900/20',
    darkText: 'dark:text-cyan-400',
  },
} as const;

/**
 * Priority Badge Colors
 * Used for: Task priority, email priority, checkpoint types
 *
 * Previously defined inline in:
 * - components/zero/EmailCard.tsx
 * - components/creait/CheckpointCard.tsx
 */
export const PRIORITY_COLORS = {
  'Critical': {
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    border: 'border-red-200',
    darkBg: 'dark:bg-red-500/20',
    darkText: 'dark:text-red-400',
  },
  'High': {
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    border: 'border-orange-200',
    darkBg: 'dark:bg-orange-500/20',
    darkText: 'dark:text-orange-400',
  },
  'Medium': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-200',
    darkBg: 'dark:bg-blue-500/20',
    darkText: 'dark:text-blue-400',
  },
  'Low': {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-200',
    darkBg: 'dark:bg-green-500/20',
    darkText: 'dark:text-green-400',
  },
  'None': {
    bg: 'bg-gray-500/10',
    text: 'text-gray-600',
    border: 'border-gray-200',
    darkBg: 'dark:bg-gray-500/20',
    darkText: 'dark:text-gray-400',
  },
} as const;

/**
 * Checkpoint Type Colors
 * Used for: CREaiT checkpoint badges
 *
 * Previously defined in:
 * - components/creait/CheckpointCard.tsx
 */
export const CHECKPOINT_TYPE_COLORS = {
  'design': {
    bg: 'bg-green-500/10',
    text: 'text-green-600',
    border: 'border-green-200',
  },
  'data': {
    bg: 'bg-orange-500/10',
    text: 'text-orange-600',
    border: 'border-orange-200',
  },
  'technical': {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600',
    border: 'border-blue-200',
  },
  'integration': {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600',
    border: 'border-purple-200',
  },
  'qa': {
    bg: 'bg-pink-500/10',
    text: 'text-pink-600',
    border: 'border-pink-200',
  },
  'launch': {
    bg: 'bg-red-500/10',
    text: 'text-red-600',
    border: 'border-red-200',
  },
} as const;

/**
 * Project Work Status Colors
 * Used for: Project work cards showing live/beta/delivered/building status
 *
 * Previously defined in:
 * - components/work/FeaturedWorkCard.tsx
 */
export const PROJECT_STATUS_COLORS = {
  'live': {
    bg: 'bg-green-500/20',
    text: 'text-green-600',
    border: 'border-green-500/30',
    label: 'Live',
  },
  'beta': {
    bg: 'bg-blue-500/20',
    text: 'text-blue-600',
    border: 'border-blue-500/30',
    label: 'In Beta',
  },
  'beta-invite': {
    bg: 'bg-blue-500/20',
    text: 'text-blue-600',
    border: 'border-blue-500/30',
    label: 'In Beta (By Invite)',
  },
  'delivered': {
    bg: 'bg-accent/20',
    text: 'text-accent',
    border: 'border-accent/30',
    label: 'Delivered',
  },
  'pre-kickoff': {
    bg: 'bg-purple-500/20',
    text: 'text-purple-600',
    border: 'border-purple-500/30',
    label: 'Pre-Kickoff',
  },
  'shipped': {
    bg: 'bg-green-500/20',
    text: 'text-green-600',
    border: 'border-green-500/30',
    label: 'Shipped',
  },
  'building': {
    bg: 'bg-orange-500/20',
    text: 'text-orange-600',
    border: 'border-orange-500/30',
    label: 'Building',
  },
} as const;

/**
 * Helper Types
 */
export type StatusKey = keyof typeof STATUS_COLORS;
export type CategoryKey = keyof typeof CATEGORY_COLORS;
export type PriorityKey = keyof typeof PRIORITY_COLORS;
export type CheckpointTypeKey = keyof typeof CHECKPOINT_TYPE_COLORS;
export type ProjectStatusKey = keyof typeof PROJECT_STATUS_COLORS;

/**
 * Helper Functions
 */

/**
 * Get status color classes
 * Returns combined className string for status badges
 */
export function getStatusColors(status: StatusKey): string {
  const colors = STATUS_COLORS[status];
  if (!colors) return STATUS_COLORS['Archived'].bg + ' ' + STATUS_COLORS['Archived'].text;
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Get category color classes
 * Returns combined className string for category badges
 */
export function getCategoryColors(category: CategoryKey): string {
  const colors = CATEGORY_COLORS[category];
  if (!colors) return CATEGORY_COLORS['Product'].bg + ' ' + CATEGORY_COLORS['Product'].text;
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Get priority color classes
 * Returns combined className string for priority badges
 */
export function getPriorityColors(priority: PriorityKey): string {
  const colors = PRIORITY_COLORS[priority];
  if (!colors) return PRIORITY_COLORS['None'].bg + ' ' + PRIORITY_COLORS['None'].text;
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Get checkpoint type color classes
 * Returns combined className string for checkpoint type badges
 */
export function getCheckpointTypeColors(type: CheckpointTypeKey): string {
  const colors = CHECKPOINT_TYPE_COLORS[type];
  if (!colors) return CHECKPOINT_TYPE_COLORS['design'].bg + ' ' + CHECKPOINT_TYPE_COLORS['design'].text;
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Get project status color classes
 * Returns combined className string for project status badges
 */
export function getProjectStatusColors(status: ProjectStatusKey): string {
  const colors = PROJECT_STATUS_COLORS[status];
  if (!colors) return PROJECT_STATUS_COLORS['building'].bg + ' ' + PROJECT_STATUS_COLORS['building'].text;
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

/**
 * Phase Badge Component (Shared)
 * Displays phase labels with color-coded styling
 *
 * Supports: PROBLEM, SOLUTION, DEMO, IMPACT, STRATEGIC, TECHNICAL
 * Used across all Rationale presentations
 */

'use client';

import { PHASE_COLORS, RATIONALE_ACCENT } from '@/lib/presentation/design-tokens';

export type PhaseType = 'problem' | 'solution' | 'demo' | 'impact' | 'strategic' | 'technical';

interface PhaseBadgeProps {
  phase: PhaseType;
  color?: string; // Optional: override with custom color
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const PHASE_LABELS: Record<PhaseType, string> = {
  problem: 'PROBLEM',
  solution: 'SOLUTION',
  demo: 'DEMO',
  impact: 'IMPACT',
  strategic: 'STRATEGIC',
  technical: 'TECHNICAL',
};

const SIZE_CLASSES = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-xs',
  lg: 'px-4 py-2 text-sm',
};

export default function PhaseBadge({
  phase,
  color,
  className = '',
  size = 'md'
}: PhaseBadgeProps) {
  // Use provided color or fall back to phase-specific color from design tokens
  const badgeColor = color || PHASE_COLORS[phase] || RATIONALE_ACCENT;

  return (
    <div
      className={`inline-flex items-center justify-center ${SIZE_CLASSES[size]} rounded font-mono font-bold tracking-widest transition-all ${className}`}
      style={{
        border: `2px solid ${badgeColor}`,
        backgroundColor: `${badgeColor}15`,
        color: badgeColor
      }}
      role="status"
      aria-label={`Current phase: ${PHASE_LABELS[phase]}`}
    >
      {PHASE_LABELS[phase]}
    </div>
  );
}

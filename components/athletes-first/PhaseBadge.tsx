/**
 * Phase Badge Component
 * Displays phase labels (PROBLEM, SOLUTION, DEMO, IMPACT) with module-specific colors
 * Medium prominence: noticeable but not dominant
 */

'use client';

interface PhaseBadgeProps {
  phase: 'problem' | 'solution' | 'demo' | 'impact';
  color: string;
  className?: string;
}

export default function PhaseBadge({ phase, color, className = '' }: PhaseBadgeProps) {
  const labels = {
    problem: 'PROBLEM',
    solution: 'SOLUTION',
    demo: 'DEMO',
    impact: 'IMPACT'
  };

  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-1.5 rounded text-xs font-mono font-bold tracking-widest transition-all ${className}`}
      style={{
        border: `2px solid ${color}`,
        backgroundColor: `${color}15`,
        color: color
      }}
      aria-label={`Current phase: ${labels[phase]}`}
    >
      {labels[phase]}
    </div>
  );
}

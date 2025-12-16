/**
 * StepIndicator Component
 *
 * Shared step progress indicator for multi-step demos.
 * Provides consistent visualization of progress through demo flows.
 */

'use client';

import { COLORS } from '@/lib/athletes-first/design-tokens';

interface StepIndicatorProps {
  steps: string[];
  currentStep: string | number;
  color?: string;
}

export default function StepIndicator({
  steps,
  currentStep,
  color = COLORS.semantic.primary
}: StepIndicatorProps) {
  // Convert currentStep to index if it's a string
  const currentIndex = typeof currentStep === 'string'
    ? steps.indexOf(currentStep)
    : currentStep;

  return (
    <div className="flex items-center justify-center gap-1.5 mt-4">
      {steps.map((step, idx) => (
        <div
          key={typeof step === 'string' ? step : idx}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            idx === currentIndex
              ? 'scale-150'
              : 'scale-100'
          }`}
          style={{
            backgroundColor: idx === currentIndex ? color : 'rgba(255, 255, 255, 0.2)'
          }}
          aria-label={`Step ${idx + 1} of ${steps.length}${idx === currentIndex ? ' (current)' : ''}`}
        />
      ))}
    </div>
  );
}

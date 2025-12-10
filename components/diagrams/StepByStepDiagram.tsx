'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';

export interface Step {
  id: string;
  title: string;
  description: string;
  visual: React.ReactNode;  // SVG or image
  metrics?: { label: string; value: string }[];
}

interface StepByStepDiagramProps {
  steps: Step[];
  title: string;
  allowNonLinear?: boolean;  // Can jump to any step
}

/**
 * Step-by-Step Wizard Pattern
 *
 * For complex diagrams (10+ elements with sequential flow)
 * Shows one step at a time with navigation
 *
 * @example
 * <StepByStepDiagram
 *   steps={phases}
 *   title="Product Roadmap"
 *   allowNonLinear={true}
 * />
 */
export function StepByStepDiagram({
  steps,
  title,
  allowNonLinear = false
}: StepByStepDiagramProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = steps[currentStep];

  const goToPrevious = () => setCurrentStep((s) => Math.max(0, s - 1));
  const goToNext = () => setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  const goToStep = (index: number) => allowNonLinear && setCurrentStep(index);

  return (
    <div className="flex flex-col h-full min-h-[600px]">
      {/* Progress indicator */}
      <div className="sticky top-0 bg-black/90 backdrop-blur-md border-b border-gray-800 p-4 z-10">
        <h2 className="text-lg font-semibold text-center mb-3">{title}</h2>

        {/* Step dots */}
        <div className="flex justify-center gap-2">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => goToStep(i)}
              disabled={!allowNonLinear && i !== currentStep}
              className={cn(
                'h-2 rounded-full transition-all',
                i === currentStep ? 'w-8 bg-terminal-gold' : 'w-2 bg-gray-700',
                allowNonLinear &&
                  i !== currentStep &&
                  'cursor-pointer hover:bg-gray-500',
                !allowNonLinear && i !== currentStep && 'cursor-not-allowed'
              )}
              aria-label={`Go to step ${i + 1}: ${steps[i].title}`}
              aria-current={i === currentStep ? 'step' : undefined}
            />
          ))}
        </div>

        <div className="text-xs text-gray-400 text-center mt-2">
          Step {currentStep + 1} of {steps.length}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-base text-gray-300 mb-6">{step.description}</p>

          {/* Visual */}
          <div className="bg-gray-900/50 rounded-lg p-4 mb-6">{step.visual}</div>

          {/* Metrics (if any) */}
          {step.metrics && step.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {step.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-gray-900/70 border border-gray-800 rounded-lg p-4"
                >
                  <div className="text-2xl font-bold text-terminal-gold">
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky bottom-0 bg-black/90 backdrop-blur-md border-t border-gray-800 p-4">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <button
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className={cn(
              'px-6 py-3 bg-gray-800 rounded min-w-[120px] transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'enabled:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-terminal-gold'
            )}
            aria-label="Previous step"
          >
            ← Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={() => setCurrentStep(0)}
              className="px-6 py-3 bg-terminal-gold text-black rounded min-w-[120px] hover:bg-terminal-gold-hover transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-gold"
              aria-label="Start over from first step"
            >
              Start Over
            </button>
          ) : (
            <button
              onClick={goToNext}
              className="px-6 py-3 bg-terminal-gold text-black rounded min-w-[120px] hover:bg-terminal-gold-hover transition-colors focus:outline-none focus:ring-2 focus:ring-terminal-gold"
              aria-label="Next step"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

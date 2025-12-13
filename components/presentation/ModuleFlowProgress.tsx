/**
 * Module Flow Progress Component (Shared)
 * 4-dot progress indicator showing phase progression
 * Default: Problem → Solution → Demo → Impact
 * Customizable for different workflows
 */

'use client';

import { RATIONALE_ACCENT } from '@/lib/presentation/design-tokens';

interface ModuleFlowProgressProps {
  currentPhase: number; // 1-4
  moduleColor?: string;
  labels?: string[];
  totalPhases?: number;
}

export default function ModuleFlowProgress({
  currentPhase,
  moduleColor = RATIONALE_ACCENT,
  labels = ['Problem', 'Solution', 'Demo', 'Impact'],
  totalPhases = 4
}: ModuleFlowProgressProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      role="progressbar"
      aria-valuenow={currentPhase}
      aria-valuemin={1}
      aria-valuemax={totalPhases}
      aria-label={`Progress: ${labels[currentPhase - 1]} (${currentPhase} of ${totalPhases})`}
    >
      {Array.from({ length: totalPhases }).map((_, index) => {
        const phase = index + 1;
        const isComplete = phase < currentPhase;
        const isCurrent = phase === currentPhase;
        const isUpcoming = phase > currentPhase;

        return (
          <div key={phase} className="flex items-center">
            {/* Dot */}
            <div
              className="relative transition-all duration-300"
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                border: isUpcoming ? `2px solid ${moduleColor}40` : 'none',
                backgroundColor: isUpcoming ? 'transparent' : moduleColor,
                boxShadow: isCurrent ? `0 0 8px ${moduleColor}` : 'none',
              }}
              title={`${labels[index]}: ${isCurrent ? 'Current' : isComplete ? 'Complete' : 'Upcoming'}`}
              aria-label={`${labels[index]}: ${isCurrent ? 'Current' : isComplete ? 'Complete' : 'Upcoming'}`}
            />

            {/* Connector line */}
            {index < totalPhases - 1 && (
              <div
                className="transition-all duration-300"
                style={{
                  width: '20px',
                  height: '1px',
                  backgroundColor: `${moduleColor}${isComplete ? '' : '30'}`,
                  marginLeft: '4px',
                  marginRight: '4px'
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Module Flow Progress Component
 * 4-dot progress indicator showing Problem → Solution → Demo → Impact progression
 * within each module
 */

'use client';

interface ModuleFlowProgressProps {
  currentPhase: number; // 1-4
  moduleColor: string;
  labels?: string[];
}

export default function ModuleFlowProgress({
  currentPhase,
  moduleColor,
  labels = ['Problem', 'Solution', 'Demo', 'Impact']
}: ModuleFlowProgressProps) {
  return (
    <div className="flex items-center gap-0.5" role="progressbar" aria-valuenow={currentPhase} aria-valuemin={1} aria-valuemax={4}>
      {[1, 2, 3, 4].map((phase, index) => {
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
            {index < 3 && (
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

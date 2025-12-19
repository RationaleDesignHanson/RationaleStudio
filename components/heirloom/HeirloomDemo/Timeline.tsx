/**
 * Timeline Component
 * Shows generational progression through the recipe
 */

'use client';

import { GENERATIONS, COLORS } from './constants';

interface TimelineProps {
  step: string;
}

export function Timeline({ step }: TimelineProps) {
  const getNodeStatus = (generationIndex: number) => {
    if (generationIndex === 0) {
      return step === 'scanned' ? 'active' : 'complete';
    }
    if (generationIndex === 1) {
      if (step === 'fork1') return 'active';
      if (step === 'fork2' || step === 'lineage') return 'complete';
      return 'inactive';
    }
    if (generationIndex === 2) {
      if (step === 'fork2') return 'active';
      if (step === 'lineage') return 'complete';
      return 'inactive';
    }
    return 'inactive';
  };

  const getConnectorFill = (connectorIndex: number) => {
    if (connectorIndex === 0) {
      return step === 'scanned' ? '0%' : '100%';
    }
    if (connectorIndex === 1) {
      return step === 'fork2' || step === 'lineage' ? '100%' : '0%';
    }
    return '0%';
  };

  const getLabelColor = (status: string) => {
    if (status === 'active') return COLORS.primaryDarkest;
    if (status === 'complete') return COLORS.green;
    return COLORS.grayMid;
  };

  return (
    <div className="timeline flex flex-col items-center gap-0 pt-[10px] md:pt-[60px]">
      {GENERATIONS.map((gen, idx) => {
        const status = getNodeStatus(idx);
        return (
          <div key={gen.name}>
            {/* Timeline Node */}
            <div className="timeline-node flex flex-col items-center gap-1 relative z-[2]">
              <div
                className={`timeline-dot w-7 h-7 md:w-12 md:h-12 rounded-full flex items-center justify-center text-[10px] md:text-sm font-semibold transition-all duration-300 ${status}`}
                style={{
                  backgroundColor:
                    status === 'active'
                      ? COLORS.primary
                      : status === 'complete'
                      ? COLORS.green
                      : COLORS.grayLight,
                  color: status === 'inactive' ? COLORS.grayMid : 'white',
                  boxShadow: status === 'active' ? '0 2px 8px rgba(139, 90, 43, 0.4)' : 'none',
                }}
              >
                {gen.initials}
              </div>
              <div
                className="timeline-label text-xs md:text-sm font-medium whitespace-nowrap text-center"
                style={{ color: getLabelColor(status) }}
              >
                {gen.name}
              </div>
              <div className="timeline-year text-[10px] md:text-xs" style={{ color: COLORS.grayMid }}>
                {gen.year}
              </div>
            </div>

            {/* Connector (not after last node) */}
            {idx < GENERATIONS.length - 1 && (
              <div
                className="timeline-connector w-[3px] h-6 md:h-10 relative"
                style={{ backgroundColor: COLORS.grayLight }}
              >
                <div
                  className="timeline-connector-fill absolute top-0 left-0 w-full transition-[height] duration-500 ease-in-out"
                  style={{
                    backgroundColor: COLORS.green,
                    height: getConnectorFill(idx),
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

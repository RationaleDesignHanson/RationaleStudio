/**
 * Velocity Proof Component
 *
 * Unified timeline comparison: Traditional vs Rationale
 * Single split bar with risk shown as opacity gradient
 */

'use client';

interface VelocityProofProps {
  simplified?: boolean; // Mobile-friendly variant
}

export function VelocityProof({ simplified = false }: VelocityProofProps) {
  if (simplified) {
    // Mobile-optimized version - stacked compact
    return (
      <div className="p-5 rounded-lg bg-gray-900/50 border border-gray-700">
        {/* Unified timeline */}
        <div className="space-y-1">
          {/* Traditional row */}
          <div className="flex items-start gap-2">
            <div className="w-20 flex-shrink-0 pt-1">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block">
                Traditional
              </span>
              <span className="font-mono text-[9px] text-gray-600 block">
                risk compounds
              </span>
            </div>
            <div className="flex-1 h-7 flex rounded overflow-hidden border border-gray-600">
              <div className="flex-[1] flex items-center justify-center border-r border-gray-600 bg-gray-800/20">
                <span className="font-mono text-[10px] text-gray-400">Specs</span>
              </div>
              <div className="flex-[4] flex items-center justify-center border-r border-gray-600 bg-gray-800/40">
                <span className="font-mono text-[10px] text-gray-400">Build</span>
              </div>
              <div className="flex-[1] flex items-center justify-center bg-gray-800/60">
                <span className="font-mono text-[10px] text-gray-400">Test</span>
              </div>
            </div>
          </div>

          {/* Rationale row */}
          <div className="flex items-start gap-2">
            <div className="w-20 flex-shrink-0 pt-1">
              <span className="font-mono text-[10px] text-terminal-gold uppercase tracking-wider block">
                Rationale
              </span>
              <span className="font-mono text-[9px] text-terminal-gold/70 block">
                risk resolved early
              </span>
            </div>
            <div className="flex-1 h-7 flex rounded overflow-hidden border border-terminal-gold/40">
              <div className="flex-[2] flex items-center justify-center border-r border-terminal-gold/30 bg-terminal-gold/15">
                <span className="font-mono text-[10px] text-terminal-gold">Prototype</span>
              </div>
              <div className="flex-[1] flex items-center justify-center border-r border-terminal-gold/30 bg-terminal-gold/10">
                <span className="font-mono text-[10px] text-terminal-gold">Lock</span>
              </div>
              <div className="flex-[5] flex items-center justify-center bg-transparent">
                <span className="font-mono text-[10px] text-terminal-gold">Build (validated)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

  // Desktop version - unified split timeline
  return (
    <div className="p-6 rounded-lg bg-gray-900/50 border border-gray-700">
      {/* Timeline container */}
      <div className="space-y-2">
        {/* Traditional row */}
        <div className="flex items-start gap-4">
          <div className="w-32 flex-shrink-0 pt-1">
            <span className="font-mono text-xs text-gray-500 uppercase tracking-wider block">
              Traditional
            </span>
            <span className="font-mono text-[10px] text-gray-600 block mt-0.5">
              risk compounds
            </span>
          </div>
          <div className="flex-1 h-12 flex rounded-lg overflow-hidden border border-gray-600">
            {/* Specs - low risk initially */}
            <div 
              className="flex items-center justify-center px-3 border-r border-gray-600"
              style={{ width: '16.67%', background: 'rgba(75, 75, 75, 0.15)' }}
            >
              <span className="font-mono text-xs text-gray-400 text-center">Specs</span>
            </div>
            {/* Build - risk accumulating */}
            <div 
              className="flex items-center justify-center px-3 border-r border-gray-600"
              style={{ 
                width: '66.67%', 
                background: 'linear-gradient(90deg, rgba(75, 75, 75, 0.2), rgba(75, 75, 75, 0.5))' 
              }}
            >
              <span className="font-mono text-xs text-gray-400 text-center">
                Build (validate in prod)
              </span>
            </div>
            {/* Test - high risk, late feedback */}
            <div 
              className="flex items-center justify-center px-3"
              style={{ width: '16.67%', background: 'rgba(75, 75, 75, 0.6)' }}
            >
              <span className="font-mono text-xs text-gray-400 text-center">Test</span>
            </div>
          </div>
        </div>

        {/* Rationale row */}
        <div className="flex items-start gap-4">
          <div className="w-32 flex-shrink-0 pt-1">
            <span className="font-mono text-xs text-terminal-gold uppercase tracking-wider block">
              Rationale
            </span>
            <span className="font-mono text-[10px] text-terminal-gold/70 block mt-0.5">
              risk resolved early
            </span>
          </div>
          <div className="flex-1 h-12 flex rounded-lg overflow-hidden border border-terminal-gold/40">
            {/* Prototype - validation happening, some opacity */}
            <div 
              className="flex items-center justify-center px-3 border-r border-terminal-gold/30"
              style={{ width: '18.18%', background: 'rgba(212, 175, 55, 0.15)' }}
            >
              <span className="font-mono text-xs text-terminal-gold text-center">Prototype</span>
            </div>
            {/* Lock - decision point */}
            <div 
              className="flex items-center justify-center px-3 border-r border-terminal-gold/30"
              style={{ width: '9.09%', background: 'rgba(212, 175, 55, 0.1)' }}
            >
              <span className="font-mono text-xs text-terminal-gold text-center">Lock</span>
            </div>
            {/* Build - validated, clean/clear */}
            <div 
              className="flex items-center justify-center px-3"
              style={{ width: '72.73%', background: 'transparent' }}
            >
              <span className="font-mono text-xs text-terminal-gold text-center">
                Build (validated)
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

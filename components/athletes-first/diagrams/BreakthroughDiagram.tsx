'use client';

import { User } from 'lucide-react';

export default function BreakthroughDiagram() {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-8">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* BEFORE */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-white/90 text-center mb-8">
            BEFORE
          </h3>

          <div className="space-y-6">
            {/* Agent */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/50 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white/70" />
              </div>
              <div className="text-white/90 font-terminal text-sm md:text-base font-semibold">Agent</div>
            </div>

            {/* Individual Athletes */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 opacity-60">
                <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white/50" />
                </div>
                <div className="text-white/75 font-terminal text-sm md:text-base font-medium">1 Athlete</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />

        {/* AFTER */}
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-cyan-400 text-center mb-8">
            AFTER
          </h3>

          {/* AI Platform Box */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border-2 border-cyan-500/50 rounded-lg px-6 py-4">
              <div className="text-cyan-400 font-terminal font-bold text-lg md:text-xl text-center">
                AI
              </div>
              <div className="text-cyan-400/80 font-terminal text-xs text-center">
                PLATFORM
              </div>
            </div>
          </div>

          {/* Connecting line from AI to Agent */}
          <div className="flex justify-center">
            <div className="w-px h-8 bg-cyan-500/30" />
          </div>

          {/* Agent with 50+ Athletes label */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center">
              <User className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-white font-terminal text-base md:text-lg font-bold">
              50+ Athletes
            </div>
          </div>

          {/* Connecting line from Agent to tree */}
          <div className="flex justify-center">
            <div className="w-px h-6 bg-cyan-500/30" />
          </div>

          {/* Tree structure - First row (3 athletes) */}
          <div className="flex justify-center gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {/* Connecting line down */}
                <div className="w-px h-4 bg-cyan-500/20" />
                <div className="w-8 h-8 rounded-full border border-cyan-500/40 flex items-center justify-center">
                  <User className="w-4 h-4 text-cyan-400/60" />
                </div>
              </div>
            ))}
          </div>

          {/* Connecting lines to second row */}
          <div className="flex justify-center relative h-6">
            {/* Horizontal line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-cyan-500/20" />
            {/* Vertical lines down */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="absolute w-px h-full bg-cyan-500/20"
                style={{
                  left: `${20 + (i - 1) * 15}%`
                }}
              />
            ))}
          </div>

          {/* Tree structure - Second row (5 athletes) */}
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border border-cyan-500/30 flex items-center justify-center">
                <User className="w-3 h-3 text-cyan-400/40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

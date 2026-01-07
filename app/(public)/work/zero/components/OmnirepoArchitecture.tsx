'use client';

/**
 * Omnirepo Architecture Diagram
 * 
 * Visual representation of Zero's monorepo structure with Expo
 */

export default function OmnirepoArchitecture() {
  return (
    <section className="bg-black py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Omnirepo Architecture
          </h2>
          <p className="mb-8 text-lg text-gray-300 max-w-3xl">
            Single repository, shared codebase, unified deployment pipeline.
          </p>

          {/* Architecture Diagram */}
          <div className="relative">
            {/* Main Container */}
            <div className="rounded-2xl border-2 border-terminal-gold/30 bg-gray-900/50 p-6 md:p-8">
              
              {/* Top: Omnirepo Label */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-terminal-gold/10 border border-terminal-gold/30 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-terminal-gold animate-pulse" />
                  <span className="text-sm font-mono font-bold text-terminal-gold">zero-omnirepo/</span>
                </div>
              </div>

              {/* Three Column Layout */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-6">
                
                {/* Apps Column */}
                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                  <div className="text-xs font-mono text-gray-500 mb-3">apps/</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">iOS</span>
                      </div>
                      <span className="text-sm text-gray-300">mobile/</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                      <div className="w-6 h-6 rounded bg-green-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">AND</span>
                      </div>
                      <span className="text-sm text-gray-300">mobile/</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">WEB</span>
                      </div>
                      <span className="text-sm text-gray-300">web/</span>
                    </div>
                  </div>
                </div>

                {/* Packages Column */}
                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                  <div className="text-xs font-mono text-gray-500 mb-3">packages/</div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-terminal-gold/10 border border-terminal-gold/30">
                      <span className="text-sm font-semibold text-terminal-gold">@zero/ui</span>
                      <p className="text-xs text-gray-400 mt-1">Shared components</p>
                    </div>
                    <div className="p-2 rounded-lg bg-terminal-gold/10 border border-terminal-gold/30">
                      <span className="text-sm font-semibold text-terminal-gold">@zero/api</span>
                      <p className="text-xs text-gray-400 mt-1">API client & types</p>
                    </div>
                    <div className="p-2 rounded-lg bg-terminal-gold/10 border border-terminal-gold/30">
                      <span className="text-sm font-semibold text-terminal-gold">@zero/ai</span>
                      <p className="text-xs text-gray-400 mt-1">Classification engine</p>
                    </div>
                  </div>
                </div>

                {/* Services Column */}
                <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-4">
                  <div className="text-xs font-mono text-gray-500 mb-3">services/</div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <span className="text-sm font-semibold text-cyan-400">gateway</span>
                      <p className="text-xs text-gray-400 mt-1">FastAPI + OAuth</p>
                    </div>
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <span className="text-sm font-semibold text-cyan-400">classifier</span>
                      <p className="text-xs text-gray-400 mt-1">Claude 3.5 pipeline</p>
                    </div>
                    <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                      <span className="text-sm font-semibold text-cyan-400">sync</span>
                      <p className="text-xs text-gray-400 mt-1">Gmail webhook</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expo Banner */}
              <div className="rounded-xl border-2 border-dashed border-indigo-500/50 bg-indigo-500/5 p-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                      <span className="text-lg font-black text-white">E</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">Expo SDK 52</div>
                      <div className="text-xs text-gray-400">React Native + Web from single codebase</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 text-xs font-mono bg-gray-800 border border-gray-700 rounded text-gray-300">expo-router</span>
                    <span className="px-2 py-1 text-xs font-mono bg-gray-800 border border-gray-700 rounded text-gray-300">EAS Build</span>
                    <span className="px-2 py-1 text-xs font-mono bg-gray-800 border border-gray-700 rounded text-gray-300">OTA Updates</span>
                  </div>
                </div>
              </div>

              {/* Benefits Row */}
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 rounded-lg bg-gray-800/30">
                  <div className="text-2xl font-bold text-terminal-gold">1</div>
                  <div className="text-xs text-gray-400">Codebase</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-800/30">
                  <div className="text-2xl font-bold text-terminal-gold">3</div>
                  <div className="text-xs text-gray-400">Platforms</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-800/30">
                  <div className="text-2xl font-bold text-terminal-gold">85%</div>
                  <div className="text-xs text-gray-400">Code shared</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gray-800/30">
                  <div className="text-2xl font-bold text-terminal-gold">CI/CD</div>
                  <div className="text-xs text-gray-400">Unified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import Link from 'next/link';
import { OS8Window, YellowGlow } from '@/components/visual-test';

export default function ComparisonPage() {
  const variations = [
    {
      id: 'terminal-republic',
      name: 'Terminal Republic',
      subtitle: 'BOLD',
      path: '/terminal-republic',
      description: 'Maximalist TDR poster + aggressive OS 8 windows. Heavy yellow usage with overlapping constellation layout.',
      features: [
        'Large terminal command prompts',
        'Overlapping OS 8 windows',
        'Heavy yellow (rings, underlines, bands)',
        'Boot sequences & scanline flicker',
        'Aggressive animations'
      ],
      yellowUsage: 'Heavy (90%)',
      motion: 'Aggressive',
      style: 'Retro-futurist maximalism',
      backgroundColor: 'bg-black',
      textColor: 'text-white',
    },
    {
      id: 'institutional-grid',
      name: 'Institutional Grid',
      subtitle: 'RESTRAINED',
      path: '/institutional-grid',
      description: 'Corporate restraint + subtle terminal nostalgia. Yellow as accent only with clean typography.',
      features: [
        'Clean typography hierarchy',
        'Contained windows, no overlap',
        'Yellow accent only (highlights, active states)',
        'Fade-in on scroll animations',
        'Disciplined spacing'
      ],
      yellowUsage: 'Accent (20%)',
      motion: 'Subtle',
      style: 'Modern institutional',
      backgroundColor: 'bg-white',
      textColor: 'text-black',
    },
    {
      id: 'window-shrine',
      name: 'Window Shrine',
      subtitle: 'BALANCED',
      path: '/window-shrine',
      description: 'Balanced retro + professionalism. "Holy relics" presentation with window zoning.',
      features: [
        'Mixed poster typography + dialogs',
        'Window zoning (side-by-side)',
        'Medium yellow (titles, breaks, CTAs)',
        'Slide/snap animations',
        'Yellow ring pulse on hover'
      ],
      yellowUsage: 'Medium (50%)',
      motion: 'Balanced',
      style: 'Retro-professional hybrid',
      backgroundColor: 'bg-gray-900',
      textColor: 'text-white',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Visual Exploration</h1>
              <p className="text-sm text-gray-400 font-mono mt-1">
                TDR × OS 8 × Terminal Aesthetic // 3 Variations
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-mono transition-colors border border-gray-700"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </header>

      {/* Introduction */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <YellowGlow intensity="medium" pulse={true}>
            <div className="inline-block mb-8">
              <OS8Window
                title="Visual Exploration Brief"
                variant="yellow"
                animateIn={true}
                className="text-left"
              >
                <div className="space-y-3 text-black">
                  <p className="text-sm">
                    <strong>Objective:</strong> Explore 3 visual treatments for Rationale's public site that blend
                    TDR (The Designers Republic) yellow maximalism, Mac OS 8 window chrome, and terminal aesthetics.
                  </p>
                  <p className="text-sm">
                    <strong>Constraint:</strong> Yellow is a disciplined accent. OS 8 windows are functional containers.
                    Terminal prompts signal systematic execution.
                  </p>
                  <p className="text-sm">
                    <strong>Goal:</strong> Find the right balance between retro nostalgia and commercial credibility.
                  </p>
                </div>
              </OS8Window>
            </div>
          </YellowGlow>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Three Approaches to <span className="text-[#FFD700]">Systematic Execution</span>
          </h2>
          <p className="text-lg text-gray-400">
            Each variation maintains core messaging while exploring different levels of visual intensity.
          </p>
        </div>
      </section>

      {/* Comparison Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {variations.map((variation, index) => (
              <Link
                key={variation.id}
                href={variation.path}
                className="block group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-black border border-gray-800 hover:border-[#FFD700] transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Header - Clean Typography */}
                  <div className="p-8 border-b border-gray-800">
                    <div className="mb-6">
                      <p className="text-xs font-mono text-gray-500 tracking-wider mb-2">
                        VARIATION {String.fromCharCode(65 + index)}
                      </p>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-[#FFD700] transition-colors">
                        {variation.name}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {variation.description}
                      </p>
                    </div>
                  </div>

                  {/* Preview Visual - Minimal */}
                  <div className={`${variation.backgroundColor} ${variation.textColor} p-12 flex-1 flex items-center justify-center relative overflow-hidden border-b border-gray-800`}>
                    <div className="text-center z-10 relative">
                      <p className="text-xl font-bold mb-2 opacity-90">
                        {index === 0 ? '> run rationale()' : index === 1 ? 'Rationale Studio' : 'SYSTEMATIC EXECUTION'}
                      </p>
                      <p className="text-sm opacity-60">
                        {index === 0 ? 'Feel what works early' : index === 1 ? 'Velocity to Conviction' : 'Two Engines, One Flywheel'}
                      </p>
                    </div>
                    {/* Subtle background patterns */}
                    {index === 0 && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle,_#FFD700_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20" />
                    )}
                    {index === 1 && (
                      <div className="absolute inset-0 bg-[linear-gradient(0deg,_#FFD700_1px,_transparent_1px),_linear-gradient(90deg,_#FFD700_1px,_transparent_1px)] bg-[length:20px_20px] opacity-5" />
                    )}
                    {index === 2 && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle,_#FFD700_1px,_transparent_1px)] bg-[length:20px_20px] opacity-15" />
                    )}
                  </div>

                  {/* Features - Refined List */}
                  <div className="p-8 flex-1">
                    <ul className="space-y-3 text-sm text-gray-400 mb-8">
                      {variation.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start leading-relaxed">
                          <span className="text-[#FFD700] mr-3 mt-0.5 text-xs">—</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Attributes - Minimal Data Display */}
                    <div className="space-y-2 text-xs border-t border-gray-800 pt-6">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-500 font-mono">Yellow Usage</span>
                        <span className="text-gray-300">{variation.yellowUsage.replace(/\s*\(.*?\)/, '')}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-500 font-mono">Motion</span>
                        <span className="text-gray-300">{variation.motion}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-500 font-mono">Approach</span>
                        <span className="text-gray-300">{variation.subtitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer - Subtle CTA */}
                  <div className="px-8 py-6 border-t border-gray-800 bg-gray-950/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400 group-hover:text-[#FFD700] transition-colors">
                        View full variation
                      </span>
                      <span className="text-[#FFD700] group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Design Spectrum - Refined */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            Comparative Analysis
          </h2>

          {/* Comparison as Definition List */}
          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-6 text-sm">
              <div className="font-mono text-gray-500 text-xs tracking-wider">
                DIMENSION
              </div>
              <div className="text-center">
                <p className="font-mono text-xs text-gray-500 mb-1">VARIATION A</p>
                <p className="font-semibold">Terminal Republic</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-xs text-gray-500 mb-1">VARIATION B</p>
                <p className="font-semibold">Institutional Grid</p>
              </div>
              <div className="text-center">
                <p className="font-mono text-xs text-gray-500 mb-1">VARIATION C</p>
                <p className="font-semibold">Window Shrine</p>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 space-y-6">
              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3">
                <div className="text-gray-400">Visual Intensity</div>
                <div className="text-center text-gray-300">High</div>
                <div className="text-center text-gray-300">Low</div>
                <div className="text-center text-[#FFD700]">Medium</div>
              </div>

              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3 border-t border-gray-800/50">
                <div className="text-gray-400">Yellow Usage</div>
                <div className="text-center text-gray-300">Heavy</div>
                <div className="text-center text-gray-300">Accent</div>
                <div className="text-center text-[#FFD700]">Medium</div>
              </div>

              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3 border-t border-gray-800/50">
                <div className="text-gray-400">Window Layout</div>
                <div className="text-center text-gray-300">Overlapping</div>
                <div className="text-center text-gray-300">Contained</div>
                <div className="text-center text-[#FFD700]">Zoned</div>
              </div>

              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3 border-t border-gray-800/50">
                <div className="text-gray-400">Animation Style</div>
                <div className="text-center text-gray-300">Aggressive</div>
                <div className="text-center text-gray-300">Subtle</div>
                <div className="text-center text-[#FFD700]">Smooth</div>
              </div>

              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3 border-t border-gray-800/50">
                <div className="text-gray-400">Brand Feeling</div>
                <div className="text-center text-gray-300">Disruptive</div>
                <div className="text-center text-gray-300">Professional</div>
                <div className="text-center text-[#FFD700]">Confident</div>
              </div>

              <div className="grid grid-cols-4 gap-6 items-center text-sm py-3 border-t border-gray-800/50">
                <div className="text-gray-400">Retro-Futurist</div>
                <div className="text-center text-gray-300">Fully Realized</div>
                <div className="text-center text-gray-300">Minimal</div>
                <div className="text-center text-[#FFD700]">Integrated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendation */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black border border-[#FFD700] p-12">
            <p className="text-xs font-mono text-gray-500 mb-4 tracking-wider">RECOMMENDATION</p>
            <h2 className="text-2xl font-bold mb-4">Window Shrine (Variation C)</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Achieves the best balance of distinctiveness, usability, and commercial credibility.
              Works across diverse audiences while maintaining strong retro-futurist personality.
              Extensible window zoning pattern provides systematic foundation for all brand surfaces.
            </p>
            <div className="grid grid-cols-3 gap-4 text-xs border-t border-gray-800 pt-6">
              <div>
                <p className="text-gray-500 font-mono mb-2">BRAND SCORE</p>
                <p className="text-[#FFD700] text-lg font-bold">8.1/10</p>
              </div>
              <div>
                <p className="text-gray-500 font-mono mb-2">UX SCORE</p>
                <p className="text-[#FFD700] text-lg font-bold">8.2/10</p>
              </div>
              <div>
                <p className="text-gray-500 font-mono mb-2">MARKETING SCORE</p>
                <p className="text-[#FFD700] text-lg font-bold">8.4/10</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500 font-mono">
          <p>Rationale Visual Exploration // 2025</p>
          <p className="mt-2">TDR × OS 8 × Terminal Aesthetic</p>
        </div>
      </footer>
    </main>
  );
}

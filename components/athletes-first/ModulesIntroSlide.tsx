/**
 * Modules Introduction Slide
 * Color-coded overview of all 4 modules before diving into details
 */

'use client';

interface ModulesIntroSlideProps {
  onModuleClick?: (moduleId: string) => void;
}

export default function ModulesIntroSlide({ onModuleClick }: ModulesIntroSlideProps = {}) {
  const modules = [
    {
      id: 'nil-platform',
      name: 'NIL Guidance Platform',
      tagline: 'Turn compliance into trust',
      color: '#FF6B00',
      problem: 'NIL complexity creates trust deficits',
      sectionIndex: 3
    },
    {
      id: 'interactive-pitch',
      name: 'Interactive Pitch',
      tagline: 'Build confidence, not PDFs',
      color: '#9D4EDD',
      problem: 'Static pitches fail to convert',
      sectionIndex: 4
    },
    {
      id: 'video-digital-twins',
      name: 'Video & Digital Twins',
      tagline: 'One session → Infinite deployment',
      color: '#00FF94',
      problem: 'Physical availability caps revenue',
      sectionIndex: 2
    },
    {
      id: 'amplify-ai',
      name: 'AmplifyAI',
      tagline: 'Rapid brand activation',
      color: '#FF3366',
      problem: 'Manual content = slow deals',
      sectionIndex: 5
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center px-8">
      {/* Framework Explanation */}
      <div className="mb-28 max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-white/90 mb-8">
          Each Module Follows a Proven 4-Step Framework
        </h3>

        {/* Visual flow diagram - no emojis */}
        <div className="flex items-center justify-center gap-3 mb-6">
          {/* Step 1: Problem */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-lg bg-white/5 border-2 border-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-white/80">1</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-white/60 uppercase">Problem</span>
          </div>

          {/* Arrow */}
          <svg width="32" height="24" className="text-white/30 flex-shrink-0">
            <path d="M4 12h24M24 7l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Step 2: Solution */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-lg bg-white/5 border-2 border-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-white/80">2</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-white/60 uppercase">Solution</span>
          </div>

          {/* Arrow */}
          <svg width="32" height="24" className="text-white/30 flex-shrink-0">
            <path d="M4 12h24M24 7l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Step 3: Demo */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-lg bg-white/5 border-2 border-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-white/80">3</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-white/60 uppercase">Demo</span>
          </div>

          {/* Arrow */}
          <svg width="32" height="24" className="text-white/30 flex-shrink-0">
            <path d="M4 12h24M24 7l5 5-5 5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>

          {/* Step 4: Impact */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-lg bg-white/5 border-2 border-white/20 flex items-center justify-center mb-3 backdrop-blur-sm">
              <div className="text-center">
                <div className="text-3xl font-bold text-white/80">4</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold tracking-wider text-white/60 uppercase">Impact</span>
          </div>
        </div>

        <p className="text-white/50 text-sm">
          Systematic approach. Measurable results. Every module proves value.
        </p>
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full auto-rows-fr">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className="relative group flex"
            style={{
              animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
            }}
          >
            {/* Module Card */}
            <button
              onClick={() => onModuleClick?.(module.id)}
              className="relative bg-black border-2 rounded-lg p-8 transition-all duration-300 hover:scale-105 cursor-pointer w-full text-left h-full flex flex-col"
              style={{
                borderColor: module.color,
                boxShadow: `0 0 20px ${module.color}20`,
                minHeight: '240px'
              }}
            >
              {/* Module Number Badge */}
              <div
                className="absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm"
                style={{
                  backgroundColor: module.color,
                  color: '#000',
                  boxShadow: `0 0 15px ${module.color}40`
                }}
              >
                {index + 1}
              </div>

              {/* Module Name */}
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: module.color }}
              >
                {module.name}
              </h3>

              {/* Tagline */}
              <p className="text-lg font-semibold text-white mb-3">
                {module.tagline}
              </p>

              {/* Problem */}
              <p className="text-sm text-white/50">
                Solves: {module.problem}
              </p>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${module.color}, transparent 70%)`
                }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="text-white/60 text-lg">
          Each module reveals: The Problem → Our Solution → Interactive Demo → Real Impact
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

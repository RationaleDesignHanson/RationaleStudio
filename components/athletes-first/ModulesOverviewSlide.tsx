/**
 * Modules Overview Slide
 *
 * Displays the 3 core Athletes First modules using InteractiveCard components
 * with Terminal Republic styling and hover-reactive shaders.
 */

'use client';

import { InteractiveCard } from '@/components/presentation';

const modules = [
  {
    title: 'Video & Digital Twins',
    icon: '🎬',
    description: 'One 4-hour session → infinite authorized content',
    details: 'Scalable deployment from one capture session. Generate hundreds of authorized content variations with built-in rights verification.',
    tags: ['Content Generation', 'Rights Management', 'Revenue Scaling']
  },
  {
    title: 'NIL Platform',
    icon: '⚖️',
    description: '30-second compliance checks',
    details: 'Automated risk scoring with AI-powered compliance analysis. Flags risks before signing based on state-specific NIL rules.',
    tags: ['Compliance', 'Risk Management', 'Marketplace']
  },
  {
    title: 'Interactive Pitch',
    icon: '🎯',
    description: 'Show prospects their future earnings',
    details: 'Real-time contract modeling and scenario exploration. Athletes explore scenarios and see the math instantly.',
    tags: ['Sales Tool', 'Visualization', 'Close Rate']
  }
];

export default function ModulesOverviewSlide() {
  return (
    <div className="relative pt-36 lg:pt-40 px-6 md:px-12 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-terminal-gold" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/60" />
            <div className="w-2 h-2 rounded-full bg-terminal-gold/30" />
          </div>
          <h2 className="text-3xl md:text-4xl font-mono font-bold text-terminal-gold mb-4">
            Choose What to Pilot First
          </h2>
          <p className="text-gray-300 font-mono text-sm max-w-2xl mx-auto">
            Start with 2-3 modules for quick wins. Each module proves value before expanding.
          </p>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module, index) => (
            <InteractiveCard
              key={module.title}
              title={module.title}
              description={module.description}
              shaderTheme={{
                colors: ['#1f2937', '#374151', 'var(--color-terminal-gold)'],
                name: 'module-theme',
                primary: 'var(--color-terminal-gold)',
                description: 'Module overview theme'
              }}
              shaderOpacity={0.05}
              shaderOpacityHover={0.15}
              tags={module.tags}
              variant="default"
              className="h-full"
            >
              {/* Icon */}
              <div className="text-6xl mb-4 text-center">
                {module.icon}
              </div>

              {/* Details */}
              <div className="text-sm text-gray-400 font-mono leading-relaxed mt-4 pt-4 border-t border-terminal-gold/20">
                {module.details}
              </div>
            </InteractiveCard>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="inline-block px-6 py-3 rounded-lg bg-black/50 border border-terminal-gold/30">
            <p className="text-sm font-mono text-gray-300">
              <span className="text-terminal-gold font-bold">TIP:</span> Most agencies start with Video & NIL Platform for maximum impact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

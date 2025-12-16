/**
 * Zero Technical Architecture Diagram
 * 3-pillar proof visualization showing technical execution, systematic velocity, and product thinking
 * AWS-style architecture diagram meets consulting proof structure
 */

'use client';

import { useState } from 'react';

interface Pillar {
  id: string;
  title: string;
  metric: string;
  color: string;
  icon: string;
  layers: {
    title: string;
    items: string[];
  }[];
  proofPoint: string;
}

export default function ZeroArchitectureDiagram() {
  const [activePillar, setActivePillar] = useState<string>('technical');

  const pillars: Pillar[] = [
    {
      id: 'technical',
      title: 'Technical Execution',
      metric: '10 Microservices',
      color: 'var(--color-zero-cyan)',
      icon: '',
      layers: [
        {
          title: 'Backend Services (Node.js)',
          items: [
            'Gateway: Request routing & auth',
            'Email: IMAP/SMTP integration',
            'Classifier: AI categorization',
            'Summarization: AI summaries',
            'Shopping Agent: Deal detection'
          ]
        },
        {
          title: 'Agent Layer (Python)',
          items: [
            'Steel Agent: Action execution',
            'Scheduled Purchase: Recurring orders',
            'Smart Replies: AI suggestions',
            'Actions: Workflow automation',
            'Analytics: Telemetry pipeline'
          ]
        },
        {
          title: 'iOS App (Swift)',
          items: [
            '182 Swift files, MVVM pattern',
            'SwiftUI views with Combine',
            'Async/await concurrency',
            'A+ architecture (reviewed by senior iOS engineers)'
          ]
        }
      ],
      proofPoint: 'Not a toy prototype. Production-grade microservices architecture.'
    },
    {
      id: 'velocity',
      title: 'Systematic Velocity',
      metric: '0 Pivots',
      color: 'var(--color-zero-green)',
      icon: '',
      layers: [
        {
          title: 'Week 1-2: Prototyping Phase',
          items: [
            'Prototype 1-2: Core interaction validated',
            'Prototype 3: Swipe direction pivot (73% swiped opposite)',
            'Prototype 4-5: Information architecture locked',
            'Prototype 6-7: Edge cases and polish',
            'Result: 100% UX decisions validated before production'
          ]
        },
        {
          title: 'Week 3-4: Production Phase',
          items: [
            '0 architectural changes (prototypes validated everything)',
            '0 "we should have tested this" moments',
            '0 major refactors mid-development',
            'Single-pass development—no iterative guessing'
          ]
        },
        {
          title: 'Week 5: Launch',
          items: [
            'App Store submission and approval',
            'Beta rollout strategy ready',
            'Production monitoring deployed',
            'Total: 30 days concept to live product'
          ]
        }
      ],
      proofPoint: 'Prototypes eliminated all risk. Production was execution, not experimentation.'
    },
    {
      id: 'product',
      title: 'Product Thinking',
      metric: 'Complete Strategy',
      color: 'var(--color-terminal-gold)',
      icon: '',
      layers: [
        {
          title: 'Go-To-Market Strategy',
          items: [
            '4-cohort beta rollout (friends → power users → general → scale)',
            'Progressive quality scaling: 85% → 95%+ AI accuracy',
            '8-week go/no-go checkpoint with clear success metrics',
            'User feedback loop feeding into AI training pipeline'
          ]
        },
        {
          title: 'Financial Model',
          items: [
            'TAM/SAM/SOM analysis for email management market',
            'Unit economics: acquisition cost vs. LTV',
            '24-week roadmap with bootstrap and funded scenarios',
            'Pricing strategy validated with beta cohorts'
          ]
        },
        {
          title: 'Product Roadmap',
          items: [
            'Phase 1: Email triage and categorization',
            'Phase 2: Shopping agent with deal detection',
            'Phase 3: Action execution (booking, purchasing)',
            'Phase 4: Multi-inbox aggregation'
          ]
        }
      ],
      proofPoint: 'Not just engineering. Complete product strategy with validated execution plan.'
    }
  ];

  const activePillarData = pillars.find(p => p.id === activePillar) || pillars[0];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">Studio-Built Product Architecture</h3>
        <p className="text-sm text-gray-400">
          Zero Inbox as one example. Production iOS app with 10 microservices, complete strategy, and 0 architectural pivots.
        </p>
      </div>

      {/* Pillar Selector */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {pillars.map((pillar) => {
          const isActive = pillar.id === activePillar;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? 'bg-gray-800/70 border-opacity-100'
                  : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
              }`}
              style={{
                borderColor: isActive ? pillar.color : undefined
              }}
            >
              <div className="text-2xl mb-2">{pillar.icon}</div>
              <div className="text-xs text-gray-400 mb-1">{pillar.title}</div>
              <div className="text-sm font-bold text-white" style={{
                color: isActive ? pillar.color : '#fff'
              }}>
                {pillar.metric}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Pillar Detail */}
      <div className="mb-8 p-6 bg-gray-800/50 border-2 rounded-lg" style={{ borderColor: activePillarData.color }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-3xl">{activePillarData.icon}</div>
          <div>
            <div className="text-lg font-bold text-white">{activePillarData.title}</div>
            <div className="text-sm" style={{ color: activePillarData.color }}>{activePillarData.metric}</div>
          </div>
        </div>

        {/* Layers */}
        <div className="space-y-6">
          {activePillarData.layers.map((layer, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: activePillarData.color }} />
                <div className="text-sm font-semibold text-white">{layer.title}</div>
              </div>
              <div className="ml-5 space-y-2">
                {layer.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: activePillarData.color, opacity: 0.5 }} />
                    <div className="text-xs text-gray-300 leading-relaxed">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proof Point */}
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: `${activePillarData.color}20`, border: `2px solid ${activePillarData.color}` }}>
              <span className="text-xs">✓</span>
            </div>
            <div className="text-sm text-white font-medium leading-relaxed">
              {activePillarData.proofPoint}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[var(--color-zero-cyan)]/10 border border-[var(--color-zero-cyan)]/30 rounded-lg">
          <div className="text-2xl font-bold text-white mb-1">10</div>
          <div className="text-xs text-gray-400">Production microservices</div>
        </div>
        <div className="p-4 bg-[var(--color-zero-green)]/10 border border-[var(--color-zero-green)]/30 rounded-lg">
          <div className="text-2xl font-bold text-white mb-1">0</div>
          <div className="text-xs text-gray-400">Architectural pivots</div>
        </div>
        <div className="p-4 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg">
          <div className="text-2xl font-bold text-white mb-1">30</div>
          <div className="text-xs text-gray-400">Days to App Store</div>
        </div>
      </div>

      {/* What This Proves */}
      <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
        <div className="text-xs font-mono text-terminal-gold mb-3 uppercase tracking-wide">What This Architecture Demonstrates</div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-[var(--color-zero-cyan)] text-lg">⚙️</div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">Production-Grade Execution</div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Studio-built products ship with the same rigor we bring to client work. Real microservices, real users, real complexity.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-[var(--color-zero-green)] text-lg">⚡</div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">Systematic Velocity</div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Shipped in weeks, not quarters. Zero architectural pivots because prototypes validated everything first.
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 text-terminal-gold text-lg">📊</div>
            <div>
              <div className="text-sm font-semibold text-white mb-1">Strategic Product Thinking</div>
              <div className="text-xs text-gray-400 leading-relaxed">
                Not just code—complete go-to-market strategy, financial models, roadmaps. We build like operators.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

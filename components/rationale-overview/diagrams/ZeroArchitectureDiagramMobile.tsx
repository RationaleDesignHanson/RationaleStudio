'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Zero Architecture - Mobile Accordion
 *
 * Shows 3 pillars as expandable cards
 * Each pillar reveals layers with details
 */

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

export default function ZeroArchitectureDiagramMobile() {
  const [expandedPillar, setExpandedPillar] = useState<string | null>('technical');

  const pillars: Pillar[] = [
    {
      id: 'technical',
      title: 'Technical Execution',
      metric: '10 Microservices',
      color: '#00D9FF',
      icon: '⚙️',
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
      color: '#00FF94',
      icon: '⚡',
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
      color: '#FFD700',
      icon: '🎯',
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

  const togglePillar = (pillarId: string) => {
    setExpandedPillar(expandedPillar === pillarId ? null : pillarId);
  };

  return (
    <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-4">
        <h3 className="text-base font-bold text-white mb-2">
          Zero: Production-Grade Reference
        </h3>
        <p className="text-xs text-gray-400">
          Not a demo. A production iOS app with 10 microservices, complete strategy, and 0 architectural pivots.
        </p>
      </div>

      <div className="space-y-3">
        {pillars.map((pillar) => {
          const isExpanded = expandedPillar === pillar.id;

          return (
            <div key={pillar.id}>
              <button
                onClick={() => togglePillar(pillar.id)}
                className="w-full p-4 rounded-lg border-2 transition-all text-left"
                style={{
                  backgroundColor: isExpanded ? '#1F2937' : '#111827',
                  borderColor: isExpanded ? pillar.color : '#374151'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{pillar.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">
                        {pillar.title}
                      </div>
                      <div className="text-xs" style={{ color: pillar.color }}>
                        {pillar.metric}
                      </div>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </div>
              </button>

              {/* Expanded Layers */}
              {isExpanded && (
                <div className="mt-2 space-y-3 pl-4">
                  {pillar.layers.map((layer, layerIdx) => (
                    <div
                      key={layerIdx}
                      className="p-3 rounded-lg border"
                      style={{
                        backgroundColor: '#1F2937',
                        borderColor: '#374151',
                        borderLeftWidth: '3px',
                        borderLeftColor: pillar.color
                      }}
                    >
                      <div className="flex items-start gap-2 mb-2">
                        <div
                          className="w-1 h-4 rounded-full mt-0.5 flex-shrink-0"
                          style={{ backgroundColor: pillar.color }}
                        />
                        <div className="text-xs font-semibold text-white">
                          {layer.title}
                        </div>
                      </div>

                      <div className="space-y-1.5 pl-3">
                        {layer.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-2">
                            <span className="text-xs mt-0.5" style={{ color: pillar.color }}>
                              •
                            </span>
                            <span className="text-xs text-gray-400 leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* Proof Point */}
                  <div
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: `${pillar.color}10`,
                      borderColor: `${pillar.color}30`
                    }}
                  >
                    <div className="text-xs font-medium" style={{ color: pillar.color }}>
                      💡 {pillar.proofPoint}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

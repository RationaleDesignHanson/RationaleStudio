/**
 * Dual-Engine Model Diagram
 * Products + Client Work flywheel visualization
 * Shows how internal products validate methodology and compound client value
 * Harvard Business Review-style competitive moat diagram
 */

'use client';

import { useState } from 'react';

interface Engine {
  id: string;
  name: string;
  color: string;
  icon: string;
  activities: string[];
  outputs: string[];
}

interface FlywheelConnection {
  from: string;
  to: string;
  value: string;
  description: string;
}

export default function DualEngineModel() {
  const [hoveredEngine, setHoveredEngine] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [expandedActivities, setExpandedActivities] = useState<Record<string, boolean>>({});
  const [expandedOutputs, setExpandedOutputs] = useState<Record<string, boolean>>({});

  const engines: Engine[] = [
    {
      id: 'products',
      name: 'Internal Products',
      color: '#9D4EDD',
      icon: '🚀',
      activities: [
        'Build internal products to test methodologies',
        'Apply prototype framework to our own products',
        'Discover new patterns and failure modes',
        'Validate technical architecture decisions at scale'
      ],
      outputs: [
        'Proven methodologies tested in production',
        'Reusable technical patterns (Rationale Kits)',
        'Real-world case studies and proof points',
        'Deep expertise in emerging tech (AI, microservices)'
      ]
    },
    {
      id: 'clients',
      name: 'Client Partnerships',
      color: '#00D9FF',
      icon: '🤝',
      activities: [
        'Apply proven methodologies to client products',
        'Leverage Rationale Kits for systematic velocity',
        'Encounter new problem spaces and edge cases',
        'Refine processes based on diverse contexts'
      ],
      outputs: [
        'Revenue funds internal product development',
        'New insights feed back into methodology',
        'Expanded technical capabilities',
        'Case studies demonstrate versatility'
      ]
    }
  ];

  const connections: FlywheelConnection[] = [
    {
      from: 'products',
      to: 'clients',
      value: 'Proven Methodologies',
      description: 'Internal products validate prototype framework in production. Clients get de-risked process, not experimental consulting.'
    },
    {
      from: 'clients',
      to: 'products',
      value: 'Revenue & Insights',
      description: 'Client work funds product development. Edge cases discovered with clients improve our products.'
    }
  ];

  return (
    <div className="p-6 sm:p-8 bg-gray-900/50 border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-2">The Dual-Engine Flywheel</h3>
        <p className="text-sm text-gray-400">
          Why product studios have unfair advantages over agencies: Internal products validate methodology, clients fund innovation.
        </p>
      </div>

      {/* Flywheel Visualization */}
      <div className="relative mb-12 p-8 bg-gray-800/30 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          {/* Left Engine: Products */}
          <div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              hoveredEngine === 'products' ? 'bg-gray-800/70' : 'bg-gray-800/30'
            }`}
            style={{
              borderColor: hoveredEngine === 'products' ? engines[0].color : '#374151'
            }}
            onMouseEnter={() => setHoveredEngine('products')}
            onMouseLeave={() => setHoveredEngine(null)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{engines[0].icon}</div>
              <div>
                <div className="text-sm font-bold text-white">{engines[0].name}</div>
                <div className="text-xs text-gray-400">Build & Learn</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">Activities</div>
              <div className="space-y-1.5">
                {engines[0].activities.slice(0, expandedActivities['products'] ? 4 : 2).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="text-xs" style={{ color: engines[0].color }}>•</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{activity}</div>
                  </div>
                ))}
                {!expandedActivities['products'] && engines[0].activities.length > 2 && (
                  <button
                    onClick={() => setExpandedActivities({ ...expandedActivities, 'products': true })}
                    className="md:hidden text-xs text-gray-400 hover:text-terminal-gold transition-colors mt-2"
                  >
                    Show {engines[0].activities.length - 2} more
                  </button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">Outputs</div>
              <div className="space-y-1.5">
                {engines[0].outputs.slice(0, expandedOutputs['products'] ? 4 : 2).map((output, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="text-xs" style={{ color: engines[0].color }}>→</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{output}</div>
                  </div>
                ))}
                {!expandedOutputs['products'] && engines[0].outputs.length > 2 && (
                  <button
                    onClick={() => setExpandedOutputs({ ...expandedOutputs, 'products': true })}
                    className="md:hidden text-xs text-gray-400 hover:text-terminal-gold transition-colors mt-2"
                  >
                    Show {engines[0].outputs.length - 2} more
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Engine: Clients */}
          <div
            className={`p-6 rounded-lg border-2 transition-all cursor-pointer ${
              hoveredEngine === 'clients' ? 'bg-gray-800/70' : 'bg-gray-800/30'
            }`}
            style={{
              borderColor: hoveredEngine === 'clients' ? engines[1].color : '#374151'
            }}
            onMouseEnter={() => setHoveredEngine('clients')}
            onMouseLeave={() => setHoveredEngine(null)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">{engines[1].icon}</div>
              <div>
                <div className="text-sm font-bold text-white">{engines[1].name}</div>
                <div className="text-xs text-gray-400">Apply & Refine</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">Activities</div>
              <div className="space-y-1.5">
                {engines[1].activities.slice(0, expandedActivities['clients'] ? 4 : 2).map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="text-xs" style={{ color: engines[1].color }}>•</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{activity}</div>
                  </div>
                ))}
                {!expandedActivities['clients'] && engines[1].activities.length > 2 && (
                  <button
                    onClick={() => setExpandedActivities({ ...expandedActivities, 'clients': true })}
                    className="md:hidden text-xs text-gray-400 hover:text-terminal-gold transition-colors mt-2"
                  >
                    Show {engines[1].activities.length - 2} more
                  </button>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-wide">Outputs</div>
              <div className="space-y-1.5">
                {engines[1].outputs.slice(0, expandedOutputs['clients'] ? 4 : 2).map((output, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="text-xs" style={{ color: engines[1].color }}>→</div>
                    <div className="text-xs text-gray-300 leading-relaxed">{output}</div>
                  </div>
                ))}
                {!expandedOutputs['clients'] && engines[1].outputs.length > 2 && (
                  <button
                    onClick={() => setExpandedOutputs({ ...expandedOutputs, 'clients': true })}
                    className="md:hidden text-xs text-gray-400 hover:text-terminal-gold transition-colors mt-2"
                  >
                    Show {engines[1].outputs.length - 2} more
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Center Connection Arrows */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="relative w-24 h-24">
              {/* Circular arrows */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <defs>
                  <marker id="arrowhead-products" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill={engines[0].color} />
                  </marker>
                  <marker id="arrowhead-clients" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill={engines[1].color} />
                  </marker>
                </defs>

                {/* Top arc (products → clients) */}
                <path
                  d="M 20 50 Q 50 20, 80 50"
                  fill="none"
                  stroke={engines[0].color}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead-products)"
                  opacity={hoveredConnection === 'p2c' ? 1 : 0.5}
                />

                {/* Bottom arc (clients → products) */}
                <path
                  d="M 80 50 Q 50 80, 20 50"
                  fill="none"
                  stroke={engines[1].color}
                  strokeWidth="2"
                  markerEnd="url(#arrowhead-clients)"
                  opacity={hoveredConnection === 'c2p' ? 1 : 0.5}
                />
              </svg>

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-terminal-gold flex items-center justify-center text-lg animate-pulse">
                  ⚡
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flywheel Connections Detail */}
      <div className="space-y-4 mb-8">
        <div className="text-sm font-semibold text-white mb-3">How The Flywheel Works</div>
        {connections.map((connection, idx) => (
          <div
            key={idx}
            className="p-4 bg-gray-800/50 border-l-4 rounded transition-all cursor-pointer"
            style={{
              borderColor: connection.from === 'products' ? engines[0].color : engines[1].color
            }}
            onMouseEnter={() => setHoveredConnection(connection.from === 'products' ? 'p2c' : 'c2p')}
            onMouseLeave={() => setHoveredConnection(null)}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="text-xs font-mono" style={{ color: connection.from === 'products' ? engines[0].color : engines[1].color }}>
                {connection.from === 'products' ? engines[0].icon : engines[1].icon} → {connection.from === 'products' ? engines[1].icon : engines[0].icon}
              </div>
              <div className="text-sm font-semibold text-white">{connection.value}</div>
            </div>
            <div className="text-xs text-gray-300 leading-relaxed">{connection.description}</div>
          </div>
        ))}
      </div>

      {/* Why This Is Unfair */}
      <div className="p-5 bg-terminal-gold/10 border border-terminal-gold/30 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-terminal-gold/20 flex items-center justify-center">
            <span className="text-terminal-gold text-sm">⚡</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-2">Why Agencies Can't Compete</div>
            <div className="text-xs text-gray-300 leading-relaxed space-y-2">
              <div>
                <span className="font-semibold text-white">Traditional agencies:</span> Sell time, accumulate no assets. Every project starts from scratch. Methodologies are theoretical until tested with client money. Risk is fully on the client.
              </div>
              <div>
                <span className="font-semibold text-white">Rationale's advantage:</span> Internal products are substantial production assets built with our methodology. Every pattern, every microservice, every UX decision was validated in production. Clients get proven systems, not consulting PowerPoints. We de-risk with our own capital first.
              </div>
              <div>
                <span className="font-semibold text-white">The compounding effect:</span> Each client engagement refines Rationale Kits. Each internal product validates new patterns. The flywheel accelerates—agencies stay linear.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

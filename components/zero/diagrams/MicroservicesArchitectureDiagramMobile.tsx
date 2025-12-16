'use client';

import { useState } from 'react';
import { Server, Database, Zap, Mail, Brain, ShoppingCart, Clock, ChevronDown, ChevronUp } from 'lucide-react';

/**
 * MicroservicesArchitectureDiagram: Mobile Accordion View
 *
 * Shows 8 microservices organized by group (collapsible)
 * Toggle between Before (monolith) and After (microservices)
 */

interface Service {
  id: string;
  name: string;
  port: number;
  group: string;
  color: string;
  techStack: string[];
  avgLatency: string;
  endpoints: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const services: Service[] = [
  // Gateway
  {
    id: 'gateway',
    name: 'Gateway',
    port: 3001,
    group: 'gateway',
    color: '#D4AF37',
    techStack: ['Node.js', 'Express', 'JWT Auth', 'Rate Limiting'],
    avgLatency: '5ms',
    endpoints: ['/api/auth/*', '/api/proxy/*', '/health'],
    icon: Server
  },
  // Intelligence Group
  {
    id: 'classifier',
    name: 'Classifier',
    port: 8082,
    group: 'intelligence',
    color: '#4299E1',
    techStack: ['Python', 'Gemini API', '43 intents'],
    avgLatency: '80ms',
    endpoints: ['/api/classify', '/health'],
    icon: Brain
  },
  {
    id: 'summarization',
    name: 'Summarization',
    port: 8083,
    group: 'intelligence',
    color: '#4299E1',
    techStack: ['Python', 'Gemini API', 'Thread context'],
    avgLatency: '120ms',
    endpoints: ['/api/summarize', '/api/summarize/thread'],
    icon: Brain
  },
  {
    id: 'smart-replies',
    name: 'Smart Replies',
    port: 8086,
    group: 'intelligence',
    color: '#4299E1',
    techStack: ['Python', 'Gemini API', 'Tone matching'],
    avgLatency: '90ms',
    endpoints: ['/api/smart-replies/generate'],
    icon: Brain
  },
  // Email Group
  {
    id: 'email',
    name: 'Email Service',
    port: 8081,
    group: 'email',
    color: '#9F7AEA',
    techStack: ['Node.js', 'Gmail API', 'IMAP sync', 'Corpus storage'],
    avgLatency: '50ms',
    endpoints: ['/api/emails', '/api/emails/:id', '/api/corpus/store'],
    icon: Mail
  },
  // Actions Group
  {
    id: 'shopping',
    name: 'Shopping Agent',
    port: 8084,
    group: 'actions',
    color: '#48BB78',
    techStack: ['Node.js', 'Product search', 'Price tracking'],
    avgLatency: '150ms',
    endpoints: ['/api/shopping/search', '/api/shopping/track'],
    icon: ShoppingCart
  },
  {
    id: 'scheduled-purchase',
    name: 'Scheduled Purchase',
    port: 8085,
    group: 'actions',
    color: '#48BB78',
    techStack: ['Node.js', 'Automated buying', 'Calendar integration'],
    avgLatency: '60ms',
    endpoints: ['/api/scheduled-purchase/create', '/api/scheduled-purchase/list'],
    icon: Clock
  },
  {
    id: 'steel-agent',
    name: 'Steel Agent',
    port: 8087,
    group: 'actions',
    color: '#48BB78',
    techStack: ['Node.js', 'Subscription mgmt', 'Cancel flows'],
    avgLatency: '200ms',
    endpoints: ['/api/subscription/info', '/api/subscription/cancel'],
    icon: Zap
  }
];

const serviceGroups = [
  { id: 'gateway', name: 'API Gateway', description: 'Entry point for all requests', color: '#D4AF37' },
  { id: 'intelligence', name: 'Intelligence Layer', description: 'AI-powered classification & summarization', color: '#4299E1' },
  { id: 'email', name: 'Email Management', description: 'Gmail sync and corpus storage', color: '#9F7AEA' },
  { id: 'actions', name: 'Action Services', description: 'Shopping, scheduling, subscriptions', color: '#48BB78' }
];

export default function MicroservicesArchitectureDiagramMobile() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>('gateway');
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');

  const toggleGroup = (groupId: string) => {
    setExpandedGroup(expandedGroup === groupId ? null : groupId);
    setExpandedService(null);
  };

  const toggleService = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-4 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Microservices Architecture
        </h3>
        <p className="text-xs text-gray-400 mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          8 services • 97% size reduction
        </p>

        {/* Toggle View */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setViewMode('before')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition ${viewMode === 'before' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            Before (1.9GB)
          </button>
          <button
            onClick={() => setViewMode('after')}
            className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition ${viewMode === 'after' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            After (61MB)
          </button>
        </div>
      </div>

      {/* Before View (Monolith) */}
      {viewMode === 'before' && (
        <div className="mb-4 p-6 bg-[#2D3748] rounded-lg border-2 border-red-500">
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 bg-red-500/20 rounded-full">
              <Server className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h4 className="text-sm font-bold text-white text-center mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            MONOLITHIC APP
          </h4>
          <div className="space-y-2 text-xs text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            <div className="flex justify-between items-center p-2 bg-[#1A202C] rounded">
              <span>Size:</span>
              <span className="text-red-400 font-bold">1.9GB</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1A202C] rounded">
              <span>Build time:</span>
              <span className="text-red-400 font-bold">45 seconds</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-[#1A202C] rounded">
              <span>Code utilization:</span>
              <span className="text-red-400 font-bold">12%</span>
            </div>
            <div className="p-2 bg-red-500/10 rounded border border-red-500/30 mt-3">
              <div className="text-xs text-red-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                ⚠️ 88% legacy code unused
              </div>
            </div>
          </div>
        </div>
      )}

      {/* After View (Microservices Groups) */}
      {viewMode === 'after' && (
        <div className="space-y-3">
          {serviceGroups.map((group) => {
            const groupServices = services.filter(s => s.group === group.id);
            const isExpanded = expandedGroup === group.id;

            return (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full p-4 rounded-lg border-2 transition-all text-left"
                  style={{
                    backgroundColor: isExpanded ? '#2D3748' : 'var(--color-text-charcoal)',
                    borderColor: group.color
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${group.color}30` }}
                      >
                        <span className="text-xl font-bold" style={{ color: group.color }}>
                          {groupServices.length}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {group.name}
                        </div>
                        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {group.description}
                        </div>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>

                {/* Services in Group */}
                {isExpanded && (
                  <div className="mt-2 space-y-2 pl-4">
                    {groupServices.map((service) => {
                      const Icon = service.icon;
                      const isServiceExpanded = expandedService === service.id;

                      return (
                        <div key={service.id}>
                          <button
                            onClick={() => toggleService(service.id)}
                            className="w-full p-3 rounded-lg border transition-all text-left"
                            style={{
                              backgroundColor: isServiceExpanded ? '#2D3748' : 'var(--color-text-charcoal)',
                              borderColor: isServiceExpanded ? service.color : '#4A5568'
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span style={{ color: service.color }}>
                                  <Icon className="w-5 h-5" />
                                </span>
                                <div>
                                  <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                    {service.name}
                                  </div>
                                  <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                    Port {service.port} • {service.avgLatency}
                                  </div>
                                </div>
                              </div>
                              {isServiceExpanded ? (
                                <ChevronUp className="w-4 h-4 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              )}
                            </div>

                            {/* Expanded Service Details */}
                            {isServiceExpanded && (
                              <div className="mt-3 pt-3 border-t border-gray-600 space-y-3">
                                {/* Tech Stack */}
                                <div>
                                  <div className="text-xs text-gray-500 mb-2 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                    TECH STACK
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {service.techStack.map((tech, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 rounded text-xs"
                                        style={{
                                          backgroundColor: `${service.color}20`,
                                          color: service.color,
                                          fontFamily: 'JetBrains Mono, monospace'
                                        }}
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Endpoints */}
                                <div>
                                  <div className="text-xs text-gray-500 mb-2 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                    ENDPOINTS ({service.endpoints.length})
                                  </div>
                                  <div className="space-y-1">
                                    {service.endpoints.map((endpoint, idx) => (
                                      <div
                                        key={idx}
                                        className="text-xs p-2 rounded bg-[#1A202C]"
                                        style={{
                                          color: service.color,
                                          fontFamily: 'JetBrains Mono, monospace'
                                        }}
                                      >
                                        {endpoint}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              97%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Size reduced
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              67%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Faster builds
            </div>
          </div>
          <div>
            <div className="text-xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              100%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Code utilized
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

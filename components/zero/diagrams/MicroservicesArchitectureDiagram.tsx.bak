'use client';

import { useState } from 'react';
import { Server, Database, Zap, Mail, Brain, ShoppingCart, Clock } from 'lucide-react';

/**
 * MicroservicesArchitectureDiagram: Service Architecture Visualization
 *
 * Shows 8 microservices in 3 groups + Gateway + Data layer
 * Interactive: hover to see tech stack, click to expand dependencies
 * Toggle view: Before (1.9GB monolith) vs After (61MB clean services)
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

const groupColors = {
  gateway: '#D4AF37',
  intelligence: '#4299E1',
  email: '#9F7AEA',
  actions: '#48BB78'
};

export default function MicroservicesArchitectureDiagram() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'after' | 'before'>('after');
  const [animateFlow, setAnimateFlow] = useState(false);

  const triggerFlow = () => {
    setAnimateFlow(true);
    setTimeout(() => setAnimateFlow(false), 3000);
  };

  return (
    <div className="relative w-full bg-[#1A202C] rounded-lg p-8 border-2 border-[#D4AF37]/30">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Clean Microservices Architecture
        </h3>
        <p className="text-sm text-gray-400 mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          8 services • 3 logical groups • 97% size reduction
        </p>

        {/* Toggle View Button */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setViewMode('after')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${viewMode === 'after' ? 'bg-[#48BB78] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            ✓ After (61MB)
          </button>
          <button
            onClick={() => setViewMode('before')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${viewMode === 'before' ? 'bg-[#F56565] text-white' : 'bg-gray-700 text-gray-400'}`}
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            ✗ Before (1.9GB)
          </button>
          <button
            onClick={triggerFlow}
            className="px-4 py-2 bg-[#4299E1] text-white rounded-lg text-xs font-bold hover:bg-[#3182CE] transition"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            ▶ Animate Request
          </button>
        </div>
      </div>

      {/* Architecture Diagram */}
      {viewMode === 'after' ? (
        <div className="space-y-6">
          {/* Gateway Layer */}
          <div className="relative">
            <div className="text-xs font-bold text-gray-400 mb-2 text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              GATEWAY LAYER
            </div>
            <div className="flex justify-center">
              {services.filter(s => s.group === 'gateway').map((service) => {
                const Icon = service.icon;
                const isHighlighted = hoveredService === service.id || selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    className="w-64 p-4 rounded-lg border-2 cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#2D3748',
                      borderColor: isHighlighted ? service.color : '#4A5568',
                      boxShadow: isHighlighted ? `0 0 20px ${service.color}40` : 'none'
                    }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-full" style={{ backgroundColor: `${service.color}20` }}>
                        <span style={{ color: service.color }}>
                          <Icon className="w-5 h-5" />
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          Port {service.port}
                        </div>
                      </div>
                    </div>
                    {selectedService === service.id && (
                      <div className="mt-3 pt-3 border-t border-gray-600 space-y-2">
                        <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                          TECH STACK
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {service.techStack.map((tech, idx) => (
                            <span key={idx} className="text-[9px] px-2 py-1 bg-gray-700 rounded text-gray-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Animated flow indicator */}
            {animateFlow && (
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[#D4AF37] rounded-full animate-ping" />
            )}
          </div>

          {/* Service Groups */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Intelligence Group */}
            <div className="space-y-3">
              <div className="text-xs font-bold mb-2 text-center" style={{ color: groupColors.intelligence, fontFamily: 'JetBrains Mono, monospace' }}>
                INTELLIGENCE
              </div>
              {services.filter(s => s.group === 'intelligence').map((service) => {
                const Icon = service.icon;
                const isHighlighted = hoveredService === service.id || selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    className="p-3 rounded-lg border-2 cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#2D3748',
                      borderColor: isHighlighted ? service.color : '#4A5568'
                    }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: service.color }}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {service.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Port {service.port} • {service.avgLatency}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Email Group */}
            <div className="space-y-3">
              <div className="text-xs font-bold mb-2 text-center" style={{ color: groupColors.email, fontFamily: 'JetBrains Mono, monospace' }}>
                EMAIL
              </div>
              {services.filter(s => s.group === 'email').map((service) => {
                const Icon = service.icon;
                const isHighlighted = hoveredService === service.id || selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    className="p-3 rounded-lg border-2 cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#2D3748',
                      borderColor: isHighlighted ? service.color : '#4A5568'
                    }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: service.color }}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {service.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Port {service.port} • {service.avgLatency}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions Group */}
            <div className="space-y-3">
              <div className="text-xs font-bold mb-2 text-center" style={{ color: groupColors.actions, fontFamily: 'JetBrains Mono, monospace' }}>
                ACTIONS
              </div>
              {services.filter(s => s.group === 'actions').map((service) => {
                const Icon = service.icon;
                const isHighlighted = hoveredService === service.id || selectedService === service.id;
                return (
                  <div
                    key={service.id}
                    className="p-3 rounded-lg border-2 cursor-pointer transition-all"
                    style={{
                      backgroundColor: '#2D3748',
                      borderColor: isHighlighted ? service.color : '#4A5568'
                    }}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ color: service.color }}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                        {service.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      Port {service.port} • {service.avgLatency}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data Layer */}
          <div className="relative">
            <div className="text-xs font-bold text-gray-400 mb-2 text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              DATA LAYER
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-[#2D3748] rounded-lg border border-gray-600 text-center">
                <Database className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  PostgreSQL
                </div>
                <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Primary database
                </div>
              </div>
              <div className="p-3 bg-[#2D3748] rounded-lg border border-gray-600 text-center">
                <Server className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Redis
                </div>
                <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Cache layer
                </div>
              </div>
              <div className="p-3 bg-[#2D3748] rounded-lg border border-gray-600 text-center">
                <Brain className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <div className="text-xs font-bold text-white" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Vector DB
                </div>
                <div className="text-[10px] text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Embeddings
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Before View - Monolith Blob */
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="w-64 h-64 mx-auto mb-6 rounded-full bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center border-4 border-red-500">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  1.9GB
                </div>
                <div className="text-sm text-red-200" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Monolithic Blob
                </div>
                <div className="text-xs text-red-300 mt-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  11 services
                </div>
                <div className="text-xs text-red-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  63% legacy code
                </div>
                <div className="text-xs text-red-300" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Fake handshakes
                </div>
              </div>
            </div>
            <div className="text-lg text-red-400 font-bold" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              ✗ Over-engineered, bloated, unmaintainable
            </div>
          </div>
        </div>
      )}

      {/* Bottom Stats */}
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-[#48BB78] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              97%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Size reduction (1.9GB → 61MB)
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#4299E1] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              67%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Faster build times
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#D4AF37] mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              100%
            </div>
            <div className="text-xs text-gray-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              Code utilization (zero dead code)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

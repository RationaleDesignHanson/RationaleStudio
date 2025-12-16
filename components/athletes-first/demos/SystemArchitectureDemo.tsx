'use client';

import React, { useState } from 'react';
import {
  Database, Globe, Share2, Box, Video, ShieldCheck,
  Presentation, Activity, Cpu, Lock, BarChart3,
  CreditCard, X, ChevronRight, Play, Pause, ZoomIn, ZoomOut
} from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useOrientation } from '@/hooks/useOrientation';
import RotateDeviceOverlay from '../RotateDeviceOverlay';
import { SystemArchitectureOnboarding } from '../DemoOnboarding';

// ==================== TYPES ====================

interface SystemNode {
  id: string;
  label: string;
  type: 'external' | 'core' | 'service';
  layer: 'top' | 'middle' | 'bottom';
  icon: React.ComponentType<{ className?: string }>;
  position: { x: number; y: number };
  description: string;
  functions: string[];
  apiEndpoints?: string[];
  dataInputs?: string[];
  dataOutputs?: string[];
  integrationRequirements?: string[];
}

interface Connection {
  id: string;
  from: string;
  to: string;
  dataType: 'user-data' | 'content' | 'payments' | 'ai-processing';
  bidirectional: boolean;
  volume?: string;
  latency?: string;
}

// ==================== MOCK DATA ====================

const NODES: SystemNode[] = [
  // Top Layer - External Systems
  {
    id: 'crm',
    label: 'CRM (Salesforce)',
    type: 'external',
    layer: 'top',
    icon: Database,
    position: { x: 100, y: 80 },
    description: 'Existing agency CRM system',
    functions: ['Athlete roster management', 'Contact tracking', 'Deal pipeline'],
    apiEndpoints: ['GET /api/athletes', 'POST /api/deals'],
    dataOutputs: ['Athlete profiles', 'Deal data'],
    integrationRequirements: ['Salesforce API key', 'OAuth 2.0 authentication']
  },
  {
    id: 'website',
    label: 'Agency Website',
    type: 'external',
    layer: 'top',
    icon: Globe,
    position: { x: 400, y: 80 },
    description: 'Public-facing agency site',
    functions: ['Athlete showcase', 'Brand partnerships', 'Contact forms'],
    dataOutputs: ['Lead forms', 'Traffic data']
  },
  {
    id: 'social',
    label: 'Social Platforms',
    type: 'external',
    layer: 'top',
    icon: Share2,
    position: { x: 700, y: 80 },
    description: 'Instagram, Twitter, TikTok APIs',
    functions: ['Content publishing', 'Engagement tracking', 'Sentiment analysis'],
    apiEndpoints: ['POST /api/publish', 'GET /api/analytics'],
    integrationRequirements: ['Platform API tokens', 'Content approval workflows']
  },

  // Middle Layer - Core Platform
  {
    id: 'platform-core',
    label: 'AthleteOS Platform',
    type: 'core',
    layer: 'middle',
    icon: Box,
    position: { x: 400, y: 280 },
    description: 'Central platform orchestrating all modules',
    functions: ['Module coordination', 'Data routing', 'Auth & permissions', 'Event logging'],
    dataInputs: ['CRM data', 'User requests', 'Social content'],
    dataOutputs: ['Generated content', 'Analytics', 'Compliance reports']
  },
  {
    id: 'digital-twins',
    label: 'Digital Twins Engine',
    type: 'core',
    layer: 'middle',
    icon: Video,
    position: { x: 250, y: 280 },
    description: 'AI-powered video and likeness generation',
    functions: ['Likeness capture', 'Video generation', 'Rights verification'],
    apiEndpoints: ['POST /api/twins/generate', 'GET /api/twins/verify']
  },
  {
    id: 'nil-engine',
    label: 'NIL Compliance',
    type: 'core',
    layer: 'middle',
    icon: ShieldCheck,
    position: { x: 400, y: 220 },
    description: 'Automated deal analysis and risk scoring',
    functions: ['Deal analysis', 'Risk scoring', 'Compliance checks'],
    apiEndpoints: ['POST /api/nil/analyze', 'GET /api/nil/score']
  },
  {
    id: 'pitch-builder',
    label: 'Interactive Pitch',
    type: 'core',
    layer: 'middle',
    icon: Presentation,
    position: { x: 550, y: 280 },
    description: 'Real-time contract modeling for athletes',
    functions: ['Contract modeling', 'Scenario simulation', 'Visual presentations'],
    apiEndpoints: ['POST /api/pitch/create', 'GET /api/pitch/scenarios']
  },
  {
    id: 'sentiment',
    label: 'Sentiment Monitor',
    type: 'core',
    layer: 'middle',
    icon: Activity,
    position: { x: 400, y: 340 },
    description: 'Real-time brand safety monitoring',
    functions: ['Social listening', 'Sentiment analysis', 'Risk alerts'],
    apiEndpoints: ['GET /api/sentiment/score', 'POST /api/sentiment/alert']
  },

  // Bottom Layer - Services
  {
    id: 'ai-models',
    label: 'AI Models',
    type: 'service',
    layer: 'bottom',
    icon: Cpu,
    position: { x: 150, y: 480 },
    description: 'Gemini, Replicate, custom models',
    functions: ['Image generation', 'Video generation', 'Text analysis'],
    integrationRequirements: ['API keys', 'Rate limits']
  },
  {
    id: 'blockchain',
    label: 'Rights Ledger',
    type: 'service',
    layer: 'bottom',
    icon: Lock,
    position: { x: 350, y: 480 },
    description: 'Blockchain-based rights management',
    functions: ['Rights verification', 'Usage tracking', 'Consent logging']
  },
  {
    id: 'analytics',
    label: 'Analytics Engine',
    type: 'service',
    layer: 'bottom',
    icon: BarChart3,
    position: { x: 550, y: 480 },
    description: 'Data processing and insights',
    functions: ['Performance tracking', 'Revenue analytics', 'Usage reports']
  },
  {
    id: 'payments',
    label: 'Payment Processor',
    type: 'service',
    layer: 'bottom',
    icon: CreditCard,
    position: { x: 650, y: 480 },
    description: 'Stripe/Plaid integration',
    functions: ['Payment processing', 'Escrow management', 'Financial reporting'],
    integrationRequirements: ['Stripe account', 'Bank integration']
  }
];

const CONNECTIONS: Connection[] = [
  { id: 'c1', from: 'crm', to: 'platform-core', dataType: 'user-data', bidirectional: true, volume: '5K req/day', latency: '< 100ms' },
  { id: 'c2', from: 'platform-core', to: 'social', dataType: 'content', bidirectional: false, volume: '500 posts/day' },
  { id: 'c3', from: 'platform-core', to: 'ai-models', dataType: 'ai-processing', bidirectional: true, volume: '1K generations/day', latency: '2-5s' },
  { id: 'c4', from: 'platform-core', to: 'blockchain', dataType: 'user-data', bidirectional: false, volume: '200 verifications/day' },
  { id: 'c5', from: 'platform-core', to: 'analytics', dataType: 'user-data', bidirectional: false, volume: 'Real-time events' },
  { id: 'c6', from: 'platform-core', to: 'payments', dataType: 'payments', bidirectional: true, volume: '$2M/month' },
  { id: 'c7', from: 'website', to: 'platform-core', dataType: 'user-data', bidirectional: false, volume: '100 leads/week' },
  { id: 'c8', from: 'digital-twins', to: 'ai-models', dataType: 'ai-processing', bidirectional: true, volume: '500 renders/day' },
  { id: 'c9', from: 'nil-engine', to: 'blockchain', dataType: 'user-data', bidirectional: false, volume: '150 checks/day' },
  { id: 'c10', from: 'sentiment', to: 'social', dataType: 'user-data', bidirectional: false, volume: '1K posts/day' }
];

const DATA_TYPE_COLORS = {
  'user-data': 'var(--color-data-blue)',
  'content': '#8B5CF6',
  'payments': 'var(--color-success)',
  'ai-processing': 'var(--color-warning)'
};

const DATA_TYPE_LABELS = {
  'user-data': 'User Data',
  'content': 'Content',
  'payments': 'Payments',
  'ai-processing': 'AI Processing'
};

// ==================== COMPONENT ====================

export default function SystemArchitectureDemo() {
  const { shouldRotate, deviceType, width } = useOrientation();
  const initialScale = deviceType === 'mobile' ? 0.7 : deviceType === 'tablet' ? 0.85 : 1;
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  const getNodeColor = (type: SystemNode['type']) => {
    switch (type) {
      case 'external': return 'from-blue-500/30 to-blue-600/30 border-blue-500/50';
      case 'core': return 'from-purple-500/30 to-purple-600/30 border-purple-500/50';
      case 'service': return 'from-green-500/30 to-green-600/30 border-green-500/50';
    }
  };

  const selectedNodeData = selectedNode ? NODES.find(n => n.id === selectedNode) : null;

  const getConnectionPath = (conn: Connection) => {
    const fromNode = NODES.find(n => n.id === conn.from);
    const toNode = NODES.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return '';

    const fx = fromNode.position.x;
    const fy = fromNode.position.y;
    const tx = toNode.position.x;
    const ty = toNode.position.y;

    // Calculate control points for curved path
    const midY = (fy + ty) / 2;

    return `M ${fx} ${fy} Q ${fx} ${midY} ${(fx + tx) / 2} ${midY} T ${tx} ${ty}`;
  };

  const getRelevantConnections = (nodeId: string) => {
    return CONNECTIONS.filter(c => c.from === nodeId || c.to === nodeId);
  };

  return (
    <>
      <RotateDeviceOverlay show={shouldRotate} demoName="System Architecture" />
      <SystemArchitectureOnboarding />
      <div className={`w-full max-w-6xl mx-auto p-4 md:p-6 space-y-4 ${shouldRotate ? 'hidden' : 'block'}`}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">System Architecture</h2>
            <p className="text-white/60 text-xs md:text-sm">
              {deviceType === 'mobile' ? 'Pinch to zoom, tap nodes for details' : 'Interactive integration diagram'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              title={isAnimating ? 'Pause animation' : 'Play animation'}
            >
              {isAnimating ? <Pause className="w-4 h-4 text-white" /> : <Play className="w-4 h-4 text-white" />}
            </button>
          </div>
        </div>

        {/* Main Diagram Container */}
        <div className="relative bg-white/5 border border-white/10 rounded-xl p-4 md:p-8 overflow-hidden">
          <TransformWrapper
            initialScale={initialScale}
            minScale={0.5}
            maxScale={2}
            centerOnInit
            wheel={{ disabled: false }}
            pinch={{ disabled: false }}
            doubleClick={{ disabled: false }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom buttons overlay for mobile */}
                {deviceType === 'mobile' && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <button
                      onClick={() => zoomIn()}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm active:scale-95 transition-transform"
                      title="Zoom in"
                      aria-label="Zoom in"
                    >
                      <ZoomIn className="w-5 h-5 text-white" />
                    </button>
                    <button
                      onClick={() => zoomOut()}
                      className="p-3 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm active:scale-95 transition-transform"
                      title="Zoom out"
                      aria-label="Zoom out"
                    >
                      <ZoomOut className="w-5 h-5 text-white" />
                    </button>
                  </div>
                )}

                <TransformComponent>
                  <div style={{ height: deviceType === 'mobile' ? '400px' : '600px' }}>
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 800 600"
                      preserveAspectRatio="xMidYMid meet"
                    >
            {/* Connection Lines */}
            <defs>
              {Object.entries(DATA_TYPE_COLORS).map(([type, color]) => (
                <marker
                  key={`arrow-${type}`}
                  id={`arrow-${type}`}
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill={color} />
                </marker>
              ))}
            </defs>

            {CONNECTIONS.map((conn) => {
              const isHighlighted =
                hoveredConnection === conn.id ||
                (hoveredNode && (conn.from === hoveredNode || conn.to === hoveredNode));

              return (
                <g key={conn.id}>
                  <path
                    d={getConnectionPath(conn)}
                    fill="none"
                    stroke={DATA_TYPE_COLORS[conn.dataType]}
                    strokeWidth={isHighlighted ? "3" : "2"}
                    strokeDasharray="5,5"
                    opacity={isHighlighted ? 1 : 0.4}
                    markerEnd={`url(#arrow-${conn.dataType})`}
                    className="transition-all cursor-pointer"
                    onMouseEnter={() => setHoveredConnection(conn.id)}
                    onMouseLeave={() => setHoveredConnection(null)}
                  >
                    {isAnimating && (
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    )}
                  </path>

                  {/* Animated Data Flow Dot */}
                  {isAnimating && (
                    <circle r="4" fill={DATA_TYPE_COLORS[conn.dataType]}>
                      <animateMotion
                        dur="3s"
                        repeatCount="indefinite"
                        path={getConnectionPath(conn)}
                      />
                    </circle>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((node) => {
              const NodeIcon = node.icon;
              const isHighlighted = hoveredNode === node.id || selectedNode === node.id;
              const nodeSize = isHighlighted ? 90 : 80;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.position.x}, ${node.position.y})`}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer"
                >
                  {/* Node Background */}
                  <rect
                    x={-nodeSize / 2}
                    y={-nodeSize / 2}
                    width={nodeSize}
                    height={nodeSize}
                    rx="12"
                    className={`transition-all ${isHighlighted ? 'opacity-100' : 'opacity-80'}`}
                    fill="url(#gradient-${node.id})"
                  />

                  <defs>
                    <linearGradient id={`gradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop
                        offset="0%"
                        style={{
                          stopColor: node.type === 'external' ? 'var(--color-data-blue)' : node.type === 'core' ? '#8B5CF6' : 'var(--color-success)',
                          stopOpacity: 0.3
                        }}
                      />
                      <stop
                        offset="100%"
                        style={{
                          stopColor: node.type === 'external' ? '#2563EB' : node.type === 'core' ? '#7C3AED' : '#059669',
                          stopOpacity: 0.5
                        }}
                      />
                    </linearGradient>
                  </defs>

                  {/* Icon */}
                  <foreignObject
                    x={-16}
                    y={-16}
                    width="32"
                    height="32"
                  >
                    <NodeIcon className="w-8 h-8 text-white" />
                  </foreignObject>

                  {/* Label */}
                  <text
                    y={nodeSize / 2 + 16}
                    textAnchor="middle"
                    className="text-xs font-semibold fill-white"
                    style={{ fontSize: '11px' }}
                  >
                    {node.label.split(' ').map((word, i) => (
                      <tspan key={i} x="0" dy={i === 0 ? 0 : 12}>
                        {word}
                      </tspan>
                    ))}
                  </text>

                  {/* Hover/Select Ring */}
                  {isHighlighted && (
                    <rect
                      x={-nodeSize / 2 - 2}
                      y={-nodeSize / 2 - 2}
                      width={nodeSize + 4}
                      height={nodeSize + 4}
                      rx="14"
                      fill="none"
                      stroke={node.type === 'external' ? 'var(--color-data-blue)' : node.type === 'core' ? '#8B5CF6' : 'var(--color-success)'}
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
                    </svg>
                  </div>
                </TransformComponent>

                {/* Layer Labels */}
                <div className="absolute top-4 left-4 space-y-1 text-xs pointer-events-none z-10">
                  <div className="text-white/60">External Systems</div>
                  <div className="text-white/60" style={{ marginTop: '170px' }}>Core Platform</div>
                  <div className="text-white/60" style={{ marginTop: '150px' }}>Data & AI Services</div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-white/10 pointer-events-none z-10">
                  <div className="text-xs font-semibold text-white mb-2">Data Flow Types</div>
                  <div className="space-y-1.5">
                    {Object.entries(DATA_TYPE_LABELS).map(([type, label]) => (
                      <div key={type} className="flex items-center gap-2">
                        <div
                          className="w-4 h-0.5"
                          style={{ backgroundColor: DATA_TYPE_COLORS[type as keyof typeof DATA_TYPE_COLORS] }}
                        />
                        <span className="text-xs text-white/80">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </TransformWrapper>
        </div>

        {/* Node Details Panel - Responsive */}
        {selectedNodeData && (
          <>
            {deviceType === 'desktop' || deviceType === 'tablet' ? (
              /* Desktop/Tablet: Side panel */
              <div className="fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-white/10 shadow-2xl p-6 overflow-y-auto z-50 animate-in slide-in-from-right">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {React.createElement(selectedNodeData.icon, { className: 'w-8 h-8 text-cyan-400' })}
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedNodeData.label}</h3>
                  <p className="text-xs text-white/60 capitalize">{selectedNodeData.type} System</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-3 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                aria-label="Close panel"
              >
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-white/80">{selectedNodeData.description}</p>
            </div>

            {/* Functions */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Key Functions</h4>
              <ul className="space-y-1.5">
                {selectedNodeData.functions.map((func, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                    <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <span>{func}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* API Endpoints */}
            {selectedNodeData.apiEndpoints && selectedNodeData.apiEndpoints.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">API Endpoints</h4>
                <div className="space-y-1.5">
                  {selectedNodeData.apiEndpoints.map((endpoint, i) => (
                    <div key={i} className="px-3 py-2 bg-white/5 rounded-lg font-mono text-xs text-cyan-400">
                      {endpoint}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Inputs */}
            {selectedNodeData.dataInputs && selectedNodeData.dataInputs.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Data Inputs</h4>
                <div className="space-y-1">
                  {selectedNodeData.dataInputs.map((input, i) => (
                    <div key={i} className="text-sm text-white/70">• {input}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Outputs */}
            {selectedNodeData.dataOutputs && selectedNodeData.dataOutputs.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Data Outputs</h4>
                <div className="space-y-1">
                  {selectedNodeData.dataOutputs.map((output, i) => (
                    <div key={i} className="text-sm text-white/70">• {output}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Integration Requirements */}
            {selectedNodeData.integrationRequirements && selectedNodeData.integrationRequirements.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Integration Requirements</h4>
                <div className="space-y-1.5">
                  {selectedNodeData.integrationRequirements.map((req, i) => (
                    <div key={i} className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400">
                      {req}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Connected Systems */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-2">Connected Systems</h4>
              <div className="space-y-2">
                {getRelevantConnections(selectedNodeData.id).map((conn) => {
                  const connectedNodeId = conn.from === selectedNodeData.id ? conn.to : conn.from;
                  const connectedNode = NODES.find(n => n.id === connectedNodeId);
                  if (!connectedNode) return null;

                  return (
                    <div key={conn.id} className="p-3 bg-white/5 rounded-lg space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white font-medium">{connectedNode.label}</span>
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: DATA_TYPE_COLORS[conn.dataType] }}
                        />
                      </div>
                      <div className="text-xs text-white/60">
                        {conn.volume} {conn.latency && `• ${conn.latency}`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
              </div>
            </div>
          ) : (
            /* Mobile: Full-screen modal */
            <div className="fixed inset-0 bg-slate-900 z-50 overflow-y-auto animate-in slide-in-from-bottom">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {React.createElement(selectedNodeData.icon, { className: 'w-8 h-8 text-cyan-400' })}
                      <div>
                        <h3 className="text-lg font-bold text-white">{selectedNodeData.label}</h3>
                        <p className="text-xs text-white/60 capitalize">{selectedNodeData.type} System</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedNode(null)}
                      className="p-3 hover:bg-white/10 rounded-lg transition-colors active:scale-95"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5 text-white/60 hover:text-white" />
                    </button>
                  </div>

                  {/* Description */}
                  <div>
                    <p className="text-sm text-white/80">{selectedNodeData.description}</p>
                  </div>

                  {/* Functions */}
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-2">Key Functions</h4>
                    <ul className="space-y-1.5">
                      {selectedNodeData.functions.map((func, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span>{func}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* API Endpoints */}
                  {selectedNodeData.apiEndpoints && selectedNodeData.apiEndpoints.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">API Endpoints</h4>
                      <div className="space-y-1.5">
                        {selectedNodeData.apiEndpoints.map((endpoint, i) => (
                          <div key={i} className="px-3 py-2 bg-white/5 rounded-lg font-mono text-xs text-cyan-400">
                            {endpoint}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Integration Requirements */}
                  {selectedNodeData.integrationRequirements && selectedNodeData.integrationRequirements.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Integration Requirements</h4>
                      <div className="space-y-1.5">
                        {selectedNodeData.integrationRequirements.map((req, i) => (
                          <div key={i} className="px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-xs text-yellow-400">
                            {req}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          </>
        )}

        {/* Connection Tooltip */}
        {hoveredConnection && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black/90 backdrop-blur-sm rounded-lg p-3 border border-white/20 shadow-xl pointer-events-none z-40">
          {(() => {
            const conn = CONNECTIONS.find(c => c.id === hoveredConnection);
            if (!conn) return null;
            return (
              <div className="text-xs space-y-1">
                <div className="font-semibold text-white">{DATA_TYPE_LABELS[conn.dataType]}</div>
                <div className="text-white/70">{conn.volume}</div>
                {conn.latency && <div className="text-white/70">Latency: {conn.latency}</div>}
              </div>
            );
          })()}
        </div>
        )}
      </div>
    </>
  );
}

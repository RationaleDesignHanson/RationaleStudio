/**
 * ArchitectureDiagram Component
 *
 * Interactive architecture and system diagrams with node-based visualization.
 * Perfect for showing technical architecture, data flows, and system relationships.
 *
 * Features:
 * - Interactive nodes with hover states
 * - Animated connection lines
 * - Layer-based organization
 * - Terminal-style aesthetics
 * - Expandable node details
 */

'use client';

import { useState, ReactNode } from 'react';

export interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  color?: string;
  layer?: number;
  connections?: string[]; // IDs of connected nodes
}

export interface ArchitectureDiagramProps {
  nodes: DiagramNode[];
  title?: string;
  layout?: 'layered' | 'radial' | 'grid';
  showConnections?: boolean;
  interactive?: boolean;
  className?: string;
}

export function ArchitectureDiagram({
  nodes,
  title,
  layout = 'layered',
  showConnections = true,
  interactive = true,
  className = '',
}: ArchitectureDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Organize nodes by layer
  const nodesByLayer = nodes.reduce((acc, node) => {
    const layer = node.layer || 0;
    if (!acc[layer]) acc[layer] = [];
    acc[layer].push(node);
    return acc;
  }, {} as Record<number, DiagramNode[]>);

  const layers = Object.keys(nodesByLayer)
    .map(Number)
    .sort((a, b) => a - b);

  const isNodeConnected = (nodeId: string) => {
    if (!hoveredNode) return false;
    const hovered = nodes.find((n) => n.id === hoveredNode);
    return hovered?.connections?.includes(nodeId) || nodeId === hoveredNode;
  };

  const renderNode = (node: DiagramNode) => {
    const isSelected = selectedNode === node.id;
    const isHovered = hoveredNode === node.id;
    const isConnected = isNodeConnected(node.id);
    const isActive = isSelected || isHovered || isConnected;

    return (
      <div
        key={node.id}
        className={`relative group transition-all duration-200 ${
          interactive ? 'cursor-pointer' : ''
        }`}
        onMouseEnter={() => interactive && setHoveredNode(node.id)}
        onMouseLeave={() => interactive && setHoveredNode(null)}
        onClick={() => interactive && setSelectedNode(isSelected ? null : node.id)}
      >
        {/* Node */}
        <div
          className={`relative px-4 py-3 rounded-lg border-2 transition-all duration-200 ${
            isActive
              ? 'border-[#FFD700] bg-[#FFD700]/10 scale-105 shadow-lg shadow-[#FFD700]/20'
              : 'border-gray-700 bg-gray-900/50 hover:border-[#FFD700]/50'
          }`}
          style={{
            borderColor: isActive ? node.color || '#FFD700' : undefined,
          }}
        >
          {/* Icon */}
          {node.icon && (
            <div className="flex justify-center mb-2 text-[#FFD700]">
              {node.icon}
            </div>
          )}

          {/* Label */}
          <div
            className={`text-sm font-mono text-center transition-colors ${
              isActive ? 'text-[#FFD700]' : 'text-gray-300'
            }`}
          >
            {node.label}
          </div>

          {/* Connection Indicator */}
          {node.connections && node.connections.length > 0 && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD700]/60" />
            </div>
          )}
        </div>

        {/* Expanded Description */}
        {isSelected && node.description && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 z-20 w-64">
            <div className="bg-gray-900 border border-[#FFD700]/30 rounded-lg p-3 shadow-xl">
              <div className="text-xs text-gray-400 leading-relaxed">
                {node.description}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLayeredLayout = () => {
    return (
      <div className="space-y-12">
        {layers.map((layer) => (
          <div key={layer} className="relative">
            {/* Layer Label */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xs font-mono text-[#FFD700]">
                LAYER {layer}
              </span>
              <div className="flex-1 h-px bg-[#FFD700]/20" />
            </div>

            {/* Nodes in Layer */}
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {nodesByLayer[layer].map(renderNode)}
            </div>

            {/* Connection Lines */}
            {showConnections && layer < Math.max(...layers) && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
                <div className="w-px h-6 bg-gradient-to-b from-[#FFD700]/50 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderGridLayout = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {nodes.map(renderNode)}
      </div>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Title */}
      {title && (
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/60" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/30" />
            </div>
            <h3 className="text-xl font-semibold text-gray-100">{title}</h3>
          </div>
          <div className="h-px bg-[#FFD700]/20" />
        </div>
      )}

      {/* Diagram */}
      <div className="relative">
        {layout === 'layered' && renderLayeredLayout()}
        {layout === 'grid' && renderGridLayout()}
      </div>

      {/* Legend */}
      {interactive && (
        <div className="mt-8 pt-6 border-t border-[#FFD700]/20">
          <div className="text-xs font-mono text-gray-500 text-center">
            {selectedNode ? 'CLICK NODE TO DESELECT' : 'CLICK NODE FOR DETAILS • HOVER TO HIGHLIGHT CONNECTIONS'}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Simple Data Flow Diagram
 *
 * Specialized component for showing linear data flows with steps.
 */
export interface DataFlowStep {
  label: string;
  description?: string;
  icon?: ReactNode;
  status?: 'active' | 'complete' | 'pending';
}

export interface DataFlowDiagramProps {
  steps: DataFlowStep[];
  title?: string;
  className?: string;
}

export function DataFlowDiagram({
  steps,
  title,
  className = '',
}: DataFlowDiagramProps) {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className={`relative ${className}`}>
      {title && (
        <h4 className="text-lg font-semibold text-gray-100 mb-6">{title}</h4>
      )}

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isActive = activeStep === index;
          const status = step.status || 'pending';

          const statusColors = {
            active: 'border-[#FFD700] bg-[#FFD700]/10',
            complete: 'border-green-500/50 bg-green-500/5',
            pending: 'border-gray-700 bg-gray-900/50',
          };

          return (
            <div key={index}>
              {/* Step */}
              <div
                className={`relative flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                  statusColors[status]
                } ${isActive ? 'scale-[1.02]' : ''}`}
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Step Number */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono ${
                    status === 'active'
                      ? 'bg-[#FFD700] text-black'
                      : status === 'complete'
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {status === 'complete' ? '✓' : index + 1}
                </div>

                {/* Icon */}
                {step.icon && (
                  <div className="flex-shrink-0 text-[#FFD700]">{step.icon}</div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-100">
                    {step.label}
                  </div>
                  {isActive && step.description && (
                    <div className="mt-1 text-xs text-gray-400">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-px h-4 bg-gradient-to-b from-[#FFD700]/50 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

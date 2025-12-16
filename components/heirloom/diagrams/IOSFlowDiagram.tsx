'use client';

import { useState } from 'react';
import { FileText, Sparkles, Check, Send, Smartphone, Watch, Home, Volume2 } from 'lucide-react';

/**
 * IOSFlowDiagram: Horizontal Flow for iOS Reminders Integration
 *
 * Shows the magic of smart aggregation:
 * Recipes → Aggregate → Detect Duplicates → Export → Apple Ecosystem
 */

interface FlowStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  detail: string;
  colorAccent: string;
  badge?: string;
}

const flowSteps: FlowStep[] = [
  {
    id: 1,
    title: 'Select Recipes',
    icon: FileText,
    description: 'Add 3 recipes to shopping list',
    detail: 'User selects multiple recipes for meal planning',
    colorAccent: '#4299E1', // Blue
    badge: '3 recipes'
  },
  {
    id: 2,
    title: 'Smart Aggregation',
    icon: Sparkles,
    description: '1c + 2c = 3c flour',
    detail: 'Handles units, quantities, and variations automatically',
    colorAccent: '#9F7AEA', // Purple
    badge: 'AI-powered'
  },
  {
    id: 3,
    title: 'Duplicate Detection',
    icon: Check,
    description: '"1 yellow onion" + "1 onion" = 2 onions',
    detail: 'NLP detects synonyms, plurals, and similar ingredients',
    colorAccent: '#48BB78', // Green
    badge: 'Smart merge'
  },
  {
    id: 4,
    title: 'Export to Reminders',
    icon: Send,
    description: 'iOS Grocery list',
    detail: 'Creates organized shopping list with categories',
    colorAccent: '#F6AD55', // Orange
    badge: 'One tap'
  },
  {
    id: 5,
    title: 'Apple Ecosystem',
    icon: Smartphone,
    description: 'Family Sharing, Siri, Watch',
    detail: 'iOS 17 auto-sorts by grocery aisle',
    colorAccent: '#D4AF37', // Gold
    badge: 'Instant sync'
  }
];

const ecosystemDevices = [
  { name: 'iPhone', icon: Smartphone, feature: 'Check off items' },
  { name: 'Apple Watch', icon: Watch, feature: 'Hands-free shopping' },
  { name: 'HomePod', icon: Volume2, feature: '"Hey Siri, what\'s on my list?"' },
  { name: 'iPad', icon: Home, feature: 'Family collaboration' }
];

export default function IOSFlowDiagram() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [hoveredDevice, setHoveredDevice] = useState<string | null>(null);

  return (
    <div className="relative w-full bg-gradient-to-br from-[#FBF8F3] to-white rounded-2xl p-8 border-2 border-[var(--color-heirloom-orange)]/30 shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          Secret Weapon: iOS Reminders Integration
        </h3>
        <p className="text-sm text-[var(--color-text-dark)]/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          We don't build a shopping list app. Apple already made the best one.
        </p>
      </div>

      {/* Flow Steps */}
      <div className="mb-12">
        {/* Desktop View - Horizontal Flow */}
        <div className="hidden md:flex items-center justify-between gap-4">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;
            const isHovered = hoveredStep === step.id;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Card */}
                <div
                  className={`
                    flex-1 p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col
                    ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
                  `}
                  style={{
                    backgroundColor: 'white',
                    borderColor: isHovered ? step.colorAccent : 'var(--color-heirloom-orange)',
                    minHeight: '280px',
                    maxWidth: '200px'
                  }}
                  onMouseEnter={() => setHoveredStep(step.id)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  {/* Step Number */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-3"
                    style={{
                      backgroundColor: step.colorAccent,
                      color: 'white'
                    }}
                  >
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-3">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: `${step.colorAccent}20` }}
                    >
                      <span style={{ color: step.colorAccent }}>
                        <Icon className="w-6 h-6" />
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4
                    className="text-sm font-bold text-[var(--color-text-dark)] text-center mb-2"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p
                    className="text-xs text-[var(--color-text-dark)]/70 text-center leading-relaxed flex-grow"
                    style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  >
                    {step.description}
                  </p>

                  {/* Detail (on hover) */}
                  {isHovered && (
                    <p
                      className="text-[10px] text-[var(--color-text-dark)]/50 text-center italic mt-2"
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {step.detail}
                    </p>
                  )}

                  {/* Badge */}
                  {step.badge && (
                    <div className="mt-auto pt-3 border-t text-center" style={{ borderColor: `${step.colorAccent}20` }}>
                      <span
                        className="inline-block px-2 py-1 rounded text-[10px] font-bold"
                        style={{
                          backgroundColor: `${step.colorAccent}20`,
                          color: step.colorAccent
                        }}
                      >
                        {step.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* Arrow */}
                {index < flowSteps.length - 1 && (
                  <div className="flex items-center justify-center px-2">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3, 0 6" fill="var(--color-heirloom-coral)" />
                        </marker>
                      </defs>
                      <line
                        x1="0"
                        y1="20"
                        x2="35"
                        y2="20"
                        stroke="var(--color-heirloom-coral)"
                        strokeWidth="3"
                        strokeDasharray="5 3"
                        markerEnd="url(#arrowhead)"
                        style={{
                          animation: 'dash 1.5s linear infinite'
                        }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile View - Vertical Stack */}
        <div className="md:hidden space-y-4">
          {flowSteps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.id}>
                <div className="p-4 rounded-2xl border-2 border-[var(--color-heirloom-orange)] bg-white shadow-sm">
                  <div className="flex items-start gap-4">
                    {/* Step Number */}
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: step.colorAccent,
                        color: 'white'
                      }}
                    >
                      {step.id}
                    </div>

                    <div className="flex-1">
                      {/* Title */}
                      <h4
                        className="text-sm font-bold text-[var(--color-text-dark)] mb-1"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p
                        className="text-xs text-[var(--color-text-dark)]/70 mb-2"
                        style={{ fontFamily: 'JetBrains Mono, monospace' }}
                      >
                        {step.description}
                      </p>

                      {/* Badge */}
                      {step.badge && (
                        <span
                          className="inline-block px-2 py-1 rounded text-[10px] font-bold"
                          style={{
                            backgroundColor: `${step.colorAccent}20`,
                            color: step.colorAccent
                          }}
                        >
                          {step.badge}
                        </span>
                      )}
                    </div>

                    {/* Icon */}
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: `${step.colorAccent}20` }}
                    >
                      <span style={{ color: step.colorAccent }}>
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {index < flowSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="text-[var(--color-heirloom-coral)] text-2xl">↓</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Apple Ecosystem Section */}
      <div className="pt-8 border-t-2 border-[var(--color-heirloom-orange)]/20">
        <h4
          className="text-lg font-bold text-[var(--color-text-dark)] mb-6 text-center"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Works Across Your Apple Ecosystem
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ecosystemDevices.map((device) => {
            const Icon = device.icon;
            const isHovered = hoveredDevice === device.name;

            return (
              <div
                key={device.name}
                className={`
                  p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                  ${isHovered ? 'scale-105 shadow-lg' : 'scale-100'}
                `}
                style={{
                  backgroundColor: 'white',
                  borderColor: isHovered ? 'var(--color-heirloom-coral)' : 'var(--color-heirloom-orange)'
                }}
                onMouseEnter={() => setHoveredDevice(device.name)}
                onMouseLeave={() => setHoveredDevice(null)}
              >
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div
                    className="p-3 rounded-full"
                    style={{ backgroundColor: 'rgba(232, 93, 77, 0.1)' }}
                  >
                    <Icon className="w-6 h-6 text-[var(--color-heirloom-coral)]" />
                  </div>
                </div>

                {/* Device Name */}
                <h5
                  className="text-sm font-bold text-[var(--color-text-dark)] text-center mb-2"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {device.name}
                </h5>

                {/* Feature */}
                <p
                  className="text-xs text-[var(--color-text-dark)]/70 text-center"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                >
                  {device.feature}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Competitive Advantage Callout */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[var(--color-heirloom-coral)]/10 to-transparent border-l-4 border-[var(--color-heirloom-coral)] rounded-xl">
        <h5
          className="text-sm font-bold text-[var(--color-heirloom-coral)] mb-2"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          Competitive Advantage
        </h5>
        <div className="space-y-2 text-xs text-[var(--color-text-dark)]/70" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
          <div className="flex items-start gap-2">
            <span className="text-red-500">✗</span>
            <span>React Native library for Reminders: <strong>Dead</strong> (last update 2017)</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-red-500">✗</span>
            <span>Flutter package: <strong>Brand new</strong>, untested, doesn't support iOS 17 Grocery type</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[var(--color-heirloom-sage)]">✓</span>
            <span><strong>Only native iOS apps can integrate this deeply</strong> - 18-24 month head start</span>
          </div>
        </div>
      </div>

      {/* Animated Dash Keyframes */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -16;
          }
        }
      `}</style>
    </div>
  );
}

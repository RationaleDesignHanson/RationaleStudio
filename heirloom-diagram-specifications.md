# Heirloom Case Study: Diagram Specifications

**Purpose:** Technical specifications for implementing visual diagrams
**Framework:** D3.js, Mermaid.js, and SVG examples
**Date:** December 9, 2025

---

## 1. Technical Architecture Diagram

### Specification: Layered System Architecture

**Dimensions:** 800px × 600px
**Format:** SVG (scalable, accessible)
**Color Palette:** Heirloom brand colors

#### Mermaid.js Implementation (Easiest)

```tsx
// components/TechnicalArchitectureDiagram.tsx
'use client'

import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

export default function TechnicalArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mermaid.initialize({
      theme: 'neutral',
      themeVariables: {
        primaryColor: '#FBF8F3',
        primaryTextColor: '#2D2D2D',
        primaryBorderColor: '#E85D4D',
        lineColor: '#8B9F8D',
        secondaryColor: '#F4A460',
        tertiaryColor: '#FBF8F3',
      },
    })

    if (ref.current) {
      mermaid.contentLoaded()
    }
  }, [])

  return (
    <div ref={ref} className="mermaid">
      {`
        graph TB
          subgraph PRESENTATION["Presentation Layer (SwiftUI)"]
            A1[Recipe View]
            A2[Shopping List View]
            A3[Card Customization]
            A4[Settings View]
          end

          subgraph LOGIC["Business Logic (ViewModels)"]
            B1[Recipe ViewModel]
            B2[Shopping ViewModel]
            B3[Customization ViewModel]
            B4[Import Service]
            B5[Reminders Service]
          end

          subgraph DATA["Data Layer (SwiftData)"]
            C1[Recipe Model]
            C2[Ingredient Model]
            C3[Collection Model]
            C4[Style Model]
          end

          subgraph SYSTEM["System Services"]
            D1[EventKit<br/>Reminders]
            D2[CloudKit<br/>Sync]
            D3[VisionKit<br/>OCR]
          end

          A1 --> B1
          A2 --> B2
          A3 --> B3
          A1 --> B4
          A2 --> B5

          B1 --> C1
          B2 --> C2
          B3 --> C4
          B4 --> C1

          B1 --> D2
          B2 --> D1
          B4 --> D3

          C1 -.->|iCloud Sync| D2
          C2 -.->|iCloud Sync| D2
          C3 -.->|iCloud Sync| D2
          C4 -.->|iCloud Sync| D2

          classDef presentation fill:#E85D4D,stroke:#2D2D2D,color:#fff
          classDef logic fill:#F4A460,stroke:#2D2D2D,color:#2D2D2D
          classDef data fill:#8B9F8D,stroke:#2D2D2D,color:#fff
          classDef system fill:#FBF8F3,stroke:#E85D4D,color:#2D2D2D

          class A1,A2,A3,A4 presentation
          class B1,B2,B3,B4,B5 logic
          class C1,C2,C3,C4 data
          class D1,D2,D3 system
      `}
    </div>
  )
}
```

#### Custom SVG Implementation (More Control)

```tsx
// components/TechnicalArchitectureDiagram.tsx
'use client'

export default function TechnicalArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 600" className="w-full h-auto">
      {/* Presentation Layer */}
      <g id="presentation-layer">
        <rect x="50" y="50" width="700" height="100"
              fill="#E85D4D" stroke="#2D2D2D" strokeWidth="2" rx="8"/>
        <text x="400" y="80" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18">
          PRESENTATION LAYER (SwiftUI)
        </text>

        {/* View boxes */}
        <rect x="80" y="100" width="150" height="40" fill="#fff" rx="4"/>
        <text x="155" y="125" textAnchor="middle" fontSize="14">Recipe View</text>

        <rect x="250" y="100" width="150" height="40" fill="#fff" rx="4"/>
        <text x="325" y="125" textAnchor="middle" fontSize="14">Shopping List</text>

        <rect x="420" y="100" width="150" height="40" fill="#fff" rx="4"/>
        <text x="495" y="125" textAnchor="middle" fontSize="14">Card Customize</text>

        <rect x="590" y="100" width="130" height="40" fill="#fff" rx="4"/>
        <text x="655" y="125" textAnchor="middle" fontSize="14">Settings</text>
      </g>

      {/* Business Logic Layer */}
      <g id="business-logic">
        <rect x="50" y="200" width="700" height="100"
              fill="#F4A460" stroke="#2D2D2D" strokeWidth="2" rx="8"/>
        <text x="400" y="230" textAnchor="middle" fill="#2D2D2D" fontWeight="bold" fontSize="18">
          BUSINESS LOGIC (@Observable ViewModels)
        </text>

        {/* ViewModel boxes */}
        <rect x="80" y="250" width="130" height="40" fill="#fff" rx="4"/>
        <text x="145" y="275" textAnchor="middle" fontSize="13">Recipe VM</text>

        <rect x="230" y="250" width="130" height="40" fill="#fff" rx="4"/>
        <text x="295" y="275" textAnchor="middle" fontSize="13">Shopping VM</text>

        <rect x="380" y="250" width="140" height="40" fill="#fff" rx="4"/>
        <text x="450" y="275" textAnchor="middle" fontSize="13">Import Service</text>

        <rect x="540" y="250" width="180" height="40" fill="#fff" rx="4"/>
        <text x="630" y="275" textAnchor="middle" fontSize="13">Reminders Service</text>
      </g>

      {/* Data Layer */}
      <g id="data-layer">
        <rect x="50" y="350" width="350" height="100"
              fill="#8B9F8D" stroke="#2D2D2D" strokeWidth="2" rx="8"/>
        <text x="225" y="380" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="18">
          DATA LAYER (SwiftData)
        </text>

        <rect x="80" y="400" width="120" height="35" fill="#fff" rx="4"/>
        <text x="140" y="422" textAnchor="middle" fontSize="13">Recipe Model</text>

        <rect x="220" y="400" width="150" height="35" fill="#fff" rx="4"/>
        <text x="295" y="422" textAnchor="middle" fontSize="13">Ingredient Model</text>
      </g>

      {/* System Services */}
      <g id="system-services">
        <rect x="450" y="350" width="300" height="100"
              fill="#FBF8F3" stroke="#E85D4D" strokeWidth="2" rx="8"/>
        <text x="600" y="380" textAnchor="middle" fill="#2D2D2D" fontWeight="bold" fontSize="18">
          SYSTEM SERVICES
        </text>

        <rect x="480" y="400" width="90" height="35" fill="#E85D4D" rx="4"/>
        <text x="525" y="422" textAnchor="middle" fill="#fff" fontSize="12">EventKit</text>

        <rect x="590" y="400" width="90" height="35" fill="#E85D4D" rx="4"/>
        <text x="635" y="422" textAnchor="middle" fill="#fff" fontSize="12">CloudKit</text>

        <rect x="700" y="400" width="80" height="35" fill="#E85D4D" rx="4"/>
        <text x="740" y="422" textAnchor="middle" fill="#fff" fontSize="12">VisionKit</text>
      </g>

      {/* Connection arrows */}
      <g id="connections" stroke="#2D2D2D" strokeWidth="2" fill="none" markerEnd="url(#arrowhead)">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
            <polygon points="0 0, 10 3, 0 6" fill="#2D2D2D" />
          </marker>
        </defs>

        {/* Presentation to Logic */}
        <path d="M 155 140 L 145 250" />
        <path d="M 325 140 L 295 250" />
        <path d="M 495 140 L 450 250" />

        {/* Logic to Data */}
        <path d="M 145 290 L 140 400" />
        <path d="M 295 290 L 295 400" />

        {/* Logic to System Services */}
        <path d="M 630 290 L 525 400" strokeDasharray="5,5" />
        <path d="M 450 290 L 635 400" strokeDasharray="5,5" />
      </g>

      {/* iCloud sync indicator */}
      <g id="icloud-sync">
        <path d="M 225 450 L 600 450" stroke="#8B9F8D" strokeWidth="2" strokeDasharray="3,3"/>
        <text x="412" y="470" textAnchor="middle" fontSize="12" fill="#8B9F8D">
          iCloud Sync
        </text>
      </g>

      {/* Legend */}
      <g id="legend" transform="translate(50, 520)">
        <text x="0" y="0" fontSize="14" fontWeight="bold" fill="#2D2D2D">KEY:</text>

        <line x1="0" y1="15" x2="40" y2="15" stroke="#2D2D2D" strokeWidth="2"/>
        <text x="50" y="20" fontSize="12" fill="#2D2D2D">Data flow</text>

        <line x1="100" y1="15" x2="140" y2="15" stroke="#2D2D2D" strokeWidth="2" strokeDasharray="5,5"/>
        <text x="150" y="20" fontSize="12" fill="#2D2D2D">API calls</text>

        <line x1="230" y1="15" x2="270" y2="15" stroke="#8B9F8D" strokeWidth="2" strokeDasharray="3,3"/>
        <text x="280" y="20" fontSize="12" fill="#2D2D2D">iCloud sync</text>
      </g>
    </svg>
  )
}
```

---

## 2. Timeline Visualization

### Specification: Gantt-Style Development Timeline

**Dimensions:** 1000px × 400px
**Format:** SVG + CSS Grid
**Interaction:** Hover to reveal details

#### CSS Grid + SVG Implementation

```tsx
// components/TimelineVisualization.tsx
'use client'

import { useState } from 'react'

interface Week {
  number: number
  title: string
  color: string
  startDay: number
  duration: number
  deliverables: string[]
  status: 'complete' | 'in-progress' | 'upcoming'
}

const weeks: Week[] = [
  {
    number: 1,
    title: 'Foundation',
    color: '#E85D4D',
    startDay: 0,
    duration: 7,
    deliverables: ['Xcode setup', 'SwiftData models', 'Navigation structure'],
    status: 'complete',
  },
  {
    number: 2,
    title: 'Core Features',
    color: '#F4A460',
    startDay: 7,
    duration: 7,
    deliverables: ['Recipe CRUD', 'Import pipeline', 'Search & filter'],
    status: 'complete',
  },
  {
    number: 3,
    title: 'Customization',
    color: '#8B9F8D',
    startDay: 12,
    duration: 10,
    deliverables: ['Card styling', 'Sticker library', 'Annotations'],
    status: 'in-progress',
  },
  {
    number: 4,
    title: 'Reminders Integration',
    color: '#2A9D8F',
    startDay: 21,
    duration: 7,
    deliverables: ['EventKit setup', 'Shopping lists', 'Ingredient aggregation'],
    status: 'upcoming',
  },
  {
    number: 5,
    title: 'Polish & Launch',
    color: '#264653',
    startDay: 28,
    duration: 7,
    deliverables: ['Bug fixes', 'TestFlight', 'App Store submission'],
    status: 'upcoming',
  },
]

export default function TimelineVisualization() {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null)
  const totalDays = 35
  const dayWidth = 1000 / totalDays

  return (
    <div className="w-full">
      {/* Timeline bars */}
      <svg viewBox="0 0 1000 250" className="w-full h-auto">
        {/* Grid lines (days) */}
        {Array.from({ length: 8 }).map((_, i) => {
          const x = i * (1000 / 7)
          return (
            <g key={i}>
              <line
                x1={x}
                y1="50"
                x2={x}
                y2="200"
                stroke="#e5e5e5"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x={x} y="230" textAnchor="middle" fontSize="12" fill="#6b7280">
                Week {i}
              </text>
            </g>
          )
        })}

        {/* Week bars */}
        {weeks.map((week, idx) => {
          const x = (week.startDay / totalDays) * 1000
          const width = (week.duration / totalDays) * 1000
          const y = 60 + idx * 25
          const isHovered = hoveredWeek === week.number

          return (
            <g
              key={week.number}
              onMouseEnter={() => setHoveredWeek(week.number)}
              onMouseLeave={() => setHoveredWeek(null)}
              className="cursor-pointer transition-all"
            >
              {/* Bar background */}
              <rect
                x={x}
                y={y}
                width={width}
                height="20"
                fill={week.color}
                opacity={isHovered ? 1 : 0.8}
                rx="4"
              />

              {/* Status indicator */}
              {week.status === 'complete' && (
                <text x={x + width - 10} y={y + 15} fontSize="14" fill="#fff">
                  ✓
                </text>
              )}

              {/* Week label */}
              <text
                x={x + width / 2}
                y={y + 14}
                textAnchor="middle"
                fontSize="12"
                fontWeight="bold"
                fill="#fff"
              >
                W{week.number}: {week.title}
              </text>

              {/* Hover details */}
              {isHovered && (
                <foreignObject x={x} y={y + 25} width={width} height="100">
                  <div className="p-2 bg-white rounded shadow-lg text-xs">
                    <div className="font-bold mb-1">Deliverables:</div>
                    <ul className="space-y-0.5">
                      {week.deliverables.map((d, i) => (
                        <li key={i}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                </foreignObject>
              )}
            </g>
          )
        })}

        {/* Today marker (if in progress) */}
        <g>
          <line x1="500" y1="50" x2="500" y2="200" stroke="#E85D4D" strokeWidth="2" />
          <text x="505" y="45" fontSize="12" fontWeight="bold" fill="#E85D4D">
            TODAY
          </text>
        </g>
      </svg>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#E85D4D]"></div>
          <span>Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#8B9F8D]"></div>
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300"></div>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  )
}
```

---

## 3. User Journey Map

### Specification: Service Blueprint Diagram

**Dimensions:** 1200px × 600px
**Format:** Multi-lane flow diagram

```tsx
// components/UserJourneyMap.tsx
'use client'

interface JourneyStage {
  title: string
  icon: string
  userAction: string
  painPoint: string
  solution: string
}

const stages: JourneyStage[] = [
  {
    title: 'Discover',
    icon: '🌐',
    userAction: 'Find recipe online',
    painPoint: 'Copy/paste by hand, lose formatting',
    solution: 'Smart import from 500+ sites',
  },
  {
    title: 'Import',
    icon: '📱',
    userAction: 'Add to app',
    painPoint: 'Manual ingredient entry, parsing errors',
    solution: 'OCR + URL parsing with normalization',
  },
  {
    title: 'Customize',
    icon: '🎨',
    userAction: 'Personalize card',
    painPoint: 'No styling options, plain text',
    solution: 'Backgrounds, stickers, handwriting',
  },
  {
    title: 'Share',
    icon: '👨‍👩‍👧',
    userAction: 'Send to family',
    painPoint: 'Styling lost, no context',
    solution: 'CloudKit preserves styling + provenance',
  },
  {
    title: 'Cook',
    icon: '🍳',
    userAction: 'Follow recipe',
    painPoint: 'Need separate timer, lost in steps',
    solution: 'Dinner party mode with timeline',
  },
]

export default function UserJourneyMap() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1200px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-bold text-[#2D2D2D]">User Journey: From Discovery to Cooking</h3>
          <p className="text-gray-600 mt-2">How Heirloom transforms the recipe experience</p>
        </div>

        {/* Journey stages */}
        <div className="grid grid-cols-5 gap-4">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative">
              {/* Connection arrow */}
              {idx < stages.length - 1 && (
                <div className="absolute top-12 -right-4 z-10">
                  <svg width="40" height="40" viewBox="0 0 40 40">
                    <path
                      d="M 5 20 L 35 20"
                      stroke="#E85D4D"
                      strokeWidth="2"
                      markerEnd="url(#arrowRed)"
                    />
                    <defs>
                      <marker
                        id="arrowRed"
                        markerWidth="10"
                        markerHeight="10"
                        refX="8"
                        refY="3"
                        orient="auto"
                      >
                        <polygon points="0 0, 10 3, 0 6" fill="#E85D4D" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              )}

              {/* Stage card */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-[#E85D4D] transition-all">
                {/* Icon */}
                <div className="text-5xl mb-3 text-center">{stage.icon}</div>

                {/* Title */}
                <div className="text-center mb-4">
                  <div className="font-bold text-lg text-[#2D2D2D]">{stage.title}</div>
                </div>

                {/* User action */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    User Action
                  </div>
                  <div className="text-sm text-gray-700">{stage.userAction}</div>
                </div>

                {/* Pain point */}
                <div className="mb-4 pb-4 border-b border-gray-200 bg-red-50 -mx-6 px-6 py-3">
                  <div className="text-xs font-semibold text-red-600 uppercase mb-2">
                    Pain Point
                  </div>
                  <div className="text-sm text-gray-700">{stage.painPoint}</div>
                </div>

                {/* Solution */}
                <div className="bg-green-50 -mx-6 px-6 py-3 rounded-b-xl">
                  <div className="text-xs font-semibold text-green-700 uppercase mb-2">
                    Heirloom Solution
                  </div>
                  <div className="text-sm font-medium text-gray-700">{stage.solution}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emotion line (optional enhancement) */}
        <div className="mt-12">
          <div className="text-sm font-semibold text-gray-600 mb-4">
            Emotional Experience
          </div>
          <svg viewBox="0 0 1200 100" className="w-full">
            {/* Baseline */}
            <line x1="0" y1="50" x2="1200" y2="50" stroke="#e5e5e5" strokeWidth="1" />

            {/* Emotion curve */}
            <path
              d="M 0 70 Q 120 80, 240 65 T 480 30 T 720 25 T 960 20 L 1200 15"
              fill="none"
              stroke="#8B9F8D"
              strokeWidth="3"
            />

            {/* Labels */}
            <text x="0" y="95" fontSize="12" fill="#666">Frustrated</text>
            <text x="480" y="95" fontSize="12" fill="#666" textAnchor="middle">
              Neutral
            </text>
            <text x="1150" y="95" fontSize="12" fill="#666" textAnchor="end">
              Delighted
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}
```

---

## 4. Metrics Comparison Visualization

### Specification: Small Multiples for Context

```tsx
// components/MetricsComparison.tsx
'use client'

interface Metric {
  label: string
  value: string
  heirloom: number
  baseline: number
  unit: string
  improvement: string
}

const metrics: Metric[] = [
  {
    label: 'Development Time',
    value: '5 weeks',
    heirloom: 5,
    baseline: 14,
    unit: 'weeks',
    improvement: '64% faster',
  },
  {
    label: 'Import Coverage',
    value: '500+ sites',
    heirloom: 500,
    baseline: 150,
    unit: 'sites',
    improvement: '3.3x more',
  },
  {
    label: 'Pricing Model',
    value: '$4.99 one-time',
    heirloom: 4.99,
    baseline: 60,
    unit: 'USD',
    improvement: '92% cheaper',
  },
]

export default function MetricsComparison() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {metrics.map((metric, idx) => (
        <div key={idx} className="bg-white rounded-2xl border-2 border-gray-200 p-6 hover:border-[#E85D4D] transition-all">
          {/* Metric value */}
          <div className="mb-6">
            <div className="text-5xl font-bold text-[#E85D4D] mb-2">{metric.value}</div>
            <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">
              {metric.label}
            </div>
          </div>

          {/* Comparison bars */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-[#2D2D2D]">Heirloom</span>
                <span className="text-gray-600">{metric.heirloom} {metric.unit}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E85D4D] rounded-full"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-gray-600">Industry Avg</span>
                <span className="text-gray-600">{metric.baseline} {metric.unit}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-400 rounded-full"
                  style={{
                    width: `${(metric.baseline / Math.max(metric.heirloom, metric.baseline)) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Improvement badge */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-xs font-semibold text-green-700">
                {metric.improvement}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## 5. Design System Token Table

### Specification: Structured Token Documentation

```tsx
// components/DesignSystemTokens.tsx
'use client'

interface TokenCategory {
  name: string
  tokens: { name: string; value: string; usage: string }[]
}

const tokenCategories: TokenCategory[] = [
  {
    name: 'Colors',
    tokens: [
      { name: 'cream', value: '#FBF8F3', usage: 'Primary background, card backgrounds' },
      { name: 'tomato', value: '#E85D4D', usage: 'Primary CTA, accents, error states' },
      { name: 'amber', value: '#F4A460', usage: 'Secondary accent, warnings' },
      { name: 'sage', value: '#8B9F8D', usage: 'Success states, progress indicators' },
      { name: 'charcoal', value: '#2D2D2D', usage: 'Primary text, headings' },
    ],
  },
  {
    name: 'Spacing',
    tokens: [
      { name: 'xs', value: '0.25rem (4px)', usage: 'Tight spacing, icon padding' },
      { name: 'sm', value: '0.5rem (8px)', usage: 'Component internal spacing' },
      { name: 'md', value: '1rem (16px)', usage: 'Standard spacing, card padding' },
      { name: 'lg', value: '1.5rem (24px)', usage: 'Section spacing' },
      { name: 'xl', value: '2rem (32px)', usage: 'Large gaps, hero sections' },
    ],
  },
  {
    name: 'Shadows',
    tokens: [
      { name: 'sm', value: '0 1px 2px rgba(0,0,0,0.05)', usage: 'Subtle elevation' },
      { name: 'md', value: '0 4px 6px rgba(0,0,0,0.1)', usage: 'Cards, dropdowns' },
      { name: 'lg', value: '0 10px 15px rgba(0,0,0,0.1)', usage: 'Modals, popovers' },
      { name: 'xl', value: '0 20px 25px rgba(0,0,0,0.15)', usage: 'Hero elements' },
    ],
  },
  {
    name: 'Typography',
    tokens: [
      { name: 'display', value: '48/56/72pt • Bold', usage: 'Page titles, hero headlines' },
      { name: 'heading', value: '24/32pt • Bold', usage: 'Section headings' },
      { name: 'body', value: '17/21pt • Regular', usage: 'Body text, descriptions' },
      { name: 'caption', value: '13/15pt • Regular', usage: 'Labels, metadata' },
    ],
  },
  {
    name: 'Radius',
    tokens: [
      { name: 'sm', value: '0.5rem', usage: 'Buttons, inputs' },
      { name: 'md', value: '0.75rem', usage: 'Cards, containers' },
      { name: 'lg', value: '1rem', usage: 'Large cards, sections' },
      { name: 'full', value: '9999px', usage: 'Pills, avatars' },
    ],
  },
]

export default function DesignSystemTokens() {
  return (
    <div className="space-y-12">
      {tokenCategories.map((category, idx) => (
        <div key={idx}>
          <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6">{category.name}</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">
                    Token
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">
                    Value
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600 uppercase">
                    Usage
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.tokens.map((token, tokenIdx) => (
                  <tr key={tokenIdx} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                        {token.name}
                      </code>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {category.name === 'Colors' && (
                          <div
                            className="w-8 h-8 rounded border border-gray-300"
                            style={{ backgroundColor: token.value }}
                          ></div>
                        )}
                        <span className="text-sm text-gray-700">{token.value}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{token.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## Implementation Checklist

### Phase 1: Core Diagrams (Week 1)
- [ ] Install Mermaid.js: `npm install mermaid`
- [ ] Create `TechnicalArchitectureDiagram.tsx`
- [ ] Create `TimelineVisualization.tsx`
- [ ] Create `MetricsComparison.tsx`
- [ ] Test responsive behavior on mobile

### Phase 2: Journey & Tokens (Week 2)
- [ ] Create `UserJourneyMap.tsx`
- [ ] Create `DesignSystemTokens.tsx`
- [ ] Add accessibility labels (ARIA)
- [ ] Test with screen readers

### Phase 3: Integration (Week 3)
- [ ] Update `_StubComponents.tsx` to import new diagrams
- [ ] Add diagram captions and sources
- [ ] Optimize SVG file sizes
- [ ] Add print styles for diagrams

---

## Accessibility Guidelines

### SVG Best Practices
```tsx
<svg role="img" aria-labelledby="diagram-title">
  <title id="diagram-title">Technical Architecture Diagram showing system layers</title>
  <desc>
    Four-layer architecture with Presentation (SwiftUI), Business Logic (ViewModels),
    Data (SwiftData), and System Services (CloudKit, EventKit).
  </desc>
  {/* Diagram content */}
</svg>
```

### Color Contrast
- All text on backgrounds must meet WCAG AA (4.5:1 for body, 3:1 for large text)
- Diagrams should not rely on color alone (use patterns, labels, icons)
- Test with colorblind simulation tools (Stark, Color Oracle)

### Keyboard Navigation
- Make interactive diagrams keyboard-accessible
- Add focus indicators to clickable elements
- Support arrow key navigation for multi-step flows

---

## Performance Optimization

### SVG Optimization
```bash
# Use SVGO to reduce file size
npm install -g svgo
svgo diagram.svg -o diagram-optimized.svg

# Typical reduction: 30-50% file size
```

### Lazy Loading
```tsx
// Load diagrams only when in viewport
import dynamic from 'next/dynamic'

const TechnicalArchitectureDiagram = dynamic(
  () => import('./TechnicalArchitectureDiagram'),
  { ssr: false, loading: () => <div>Loading diagram...</div> }
)
```

### Canvas Fallback for Complex Diagrams
```tsx
// For very complex diagrams (>500 elements), use Canvas instead of SVG
import { useEffect, useRef } from 'react'

export default function ComplexDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Draw diagram on canvas
    ctx.fillStyle = '#E85D4D'
    ctx.fillRect(0, 0, 100, 100)
    // ... rest of drawing logic
  }, [])

  return <canvas ref={canvasRef} width={800} height={600} />
}
```

---

## Testing & Validation

### Visual Regression Testing
```bash
# Use Percy or Chromatic for screenshot diffs
npm install --save-dev @percy/cli

# Take baseline screenshots
percy snapshot ./diagrams/

# Compare after changes
percy snapshot ./diagrams/ --compare
```

### Cross-Browser Testing
- Chrome (SVG, Mermaid)
- Safari (SVG rendering quirks)
- Firefox (foreignObject support)
- Mobile Safari (viewport scaling)

### Print Testing
```css
/* Add print-specific styles */
@media print {
  svg {
    max-width: 100%;
    page-break-inside: avoid;
  }

  .diagram-container {
    background: white !important;
  }
}
```

---

**Files Generated:**
- `/Users/matthanson/rationale-public/heirloom-diagram-specifications.md` (This file)

**Next Steps:**
1. Choose implementation approach (Mermaid vs custom SVG vs D3)
2. Create new component files in `/app/(public)/work/heirloom/components/diagrams/`
3. Import and integrate into `_StubComponents.tsx`
4. Test responsive behavior and accessibility
5. Optimize performance with lazy loading

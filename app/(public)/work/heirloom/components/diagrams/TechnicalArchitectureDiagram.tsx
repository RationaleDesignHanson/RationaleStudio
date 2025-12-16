'use client'

import { useEffect, useRef, useState } from 'react'
import mermaid from 'mermaid'

export default function TechnicalArchitectureDiagram() {
  const ref = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Detailed descriptions for each node
  const nodeDetails: Record<string, { title: string; description: string; tech: string }> = {
    swiftui: {
      title: 'SwiftUI Views',
      description: 'Declarative UI components built with SwiftUI. Includes RecipeCardView, ListViews, DetailScreens, and custom card styling.',
      tech: 'SwiftUI, @ViewBuilder, custom modifiers'
    },
    nav: {
      title: 'Navigation',
      description: 'NavigationStack-based routing with TabView for main sections. Programmatic navigation for deep linking.',
      tech: 'NavigationStack, TabView, NavigationPath'
    },
    custom: {
      title: 'Custom Modifiers',
      description: 'Reusable view modifiers for card styling, animations, shadows, and vintage paper effects.',
      tech: 'ViewModifier, PreferenceKey, GeometryReader'
    },
    vm: {
      title: 'ViewModels',
      description: 'Observable view models using @Observable macro. Handle UI state, user actions, and coordinate with services.',
      tech: '@Observable, Combine, async/await'
    },
    recipes: {
      title: 'Recipe Manager',
      description: 'Core business logic for recipe CRUD operations, search, filtering, and tag management.',
      tech: 'Swift Concurrency, Result type, error handling'
    },
    shopping: {
      title: 'Shopping List Service',
      description: 'Aggregates ingredients from multiple recipes, normalizes quantities, and syncs with iOS Reminders.',
      tech: 'EventKit, Unit conversion, ingredient parsing'
    },
    import: {
      title: 'Import Pipeline',
      description: 'Parses recipes from URLs (500+ sites), OCR scanning, and manual entry. Smart ingredient extraction.',
      tech: 'SwiftSoup, VisionKit, Regex, async streaming'
    },
    swiftdata: {
      title: 'SwiftData Models',
      description: 'Data models for Recipe, Ingredient, Tag, and Customization. Relationships and queries defined with macros.',
      tech: '@Model, @Relationship, @Query, ModelContext'
    },
    storage: {
      title: 'Local Storage',
      description: 'SQLite-backed persistence managed by SwiftData. Automatic schema migration and efficient queries.',
      tech: 'SwiftData, SQLite, ModelContainer'
    },
    icloud: {
      title: 'iCloud Sync',
      description: 'Private CloudKit database for cross-device sync. Conflict resolution and offline support.',
      tech: 'CloudKit, CKRecord, NSUbiquitousKeyValueStore'
    },
    eventkit: {
      title: 'EventKit',
      description: 'iOS Reminders API integration. Creates shopping list items with aisle grouping and due dates.',
      tech: 'EKEventStore, EKReminder, authorization'
    },
    vision: {
      title: 'VisionKit',
      description: 'OCR for scanning physical recipe cards. Text recognition with confidence scoring.',
      tech: 'VNRecognizeTextRequest, Vision framework'
    },
    cloudkit: {
      title: 'CloudKit',
      description: 'Apple CloudKit private database. Handles sync, subscriptions, and push notifications.',
      tech: 'CKContainer, CKDatabase, CKSubscription'
    }
  }

  useEffect(() => {
    // Initialize mermaid with Heirloom brand colors
    mermaid.initialize({
      startOnLoad: true,
      theme: 'base',
      themeVariables: {
        primaryColor: '#E85D42', // Tomato
        primaryTextColor: 'var(--color-text-dark)',
        primaryBorderColor: '#E85D42',
        lineColor: 'var(--color-text-dark)',
        secondaryColor: 'var(--color-heirloom-orange)', // Amber
        tertiaryColor: 'var(--color-heirloom-teal)', // Sage
        background: '#F5F1E8', // Cream
        mainBkg: '#FFFFFF',
        secondBkg: '#F5F1E8',
        border1: 'var(--color-text-dark)',
        border2: '#E85D42',
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      },
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis',
        padding: 20,
        nodeSpacing: 60,
        rankSpacing: 80,
      },
    })

    const renderDiagram = async () => {
      if (!ref.current) return

      const diagramDefinition = `
        graph TB
          subgraph presentation[" Presentation Layer"]
            swiftui["SwiftUI Views<br/><small>Recipe Cards, Lists, Detail Screens</small>"]
            nav["Navigation<br/><small>TabView, NavigationStack</small>"]
            custom["Custom Modifiers<br/><small>Card Styles, Animations</small>"]
          end

          subgraph logic["⚙️ Business Logic Layer"]
            vm["ViewModels<br/><small>@Observable Pattern</small>"]
            recipes["Recipe Manager<br/><small>CRUD Operations</small>"]
            shopping["Shopping List Service<br/><small>Ingredient Aggregation</small>"]
            import["Import Pipeline<br/><small>URL Parsing</small>"]
          end

          subgraph data["💾 Data Layer"]
            swiftdata["SwiftData Models<br/><small>Recipe, Ingredient, Tag</small>"]
            storage["Local Storage<br/><small>SQLite Persistence</small>"]
            icloud["iCloud Sync<br/><small>CloudKit Integration</small>"]
          end

          subgraph services["🔌 System Services"]
            eventkit["EventKit<br/><small>iOS Reminders API</small>"]
            vision["VisionKit<br/><small>OCR for Recipe Cards</small>"]
            cloudkit["CloudKit<br/><small>Private Database</small>"]
          end

          swiftui --> vm
          nav --> vm
          custom --> swiftui

          vm --> recipes
          vm --> shopping
          vm --> import

          recipes --> swiftdata
          shopping --> swiftdata
          import --> swiftdata

          swiftdata --> storage
          storage --> icloud

          shopping --> eventkit
          import --> vision
          icloud --> cloudkit

          classDef presentation fill:#E85D42,stroke:#2D2D2D,stroke-width:2px,color:#FFFFFF
          classDef logic fill:#F4A261,stroke:#2D2D2D,stroke-width:2px,color:#2D2D2D
          classDef data fill:#2A9D8F,stroke:#2D2D2D,stroke-width:2px,color:#FFFFFF
          classDef services fill:#8B9F8D,stroke:#2D2D2D,stroke-width:2px,color:#FFFFFF

          class swiftui,nav,custom presentation
          class vm,recipes,shopping,import logic
          class swiftdata,storage,icloud data
          class eventkit,vision,cloudkit services
      `

      try {
        const { svg } = await mermaid.render('heirloom-architecture', diagramDefinition)
        if (ref.current) {
          ref.current.innerHTML = svg

          // Add hover interactions to all nodes after rendering
          const nodes = ref.current.querySelectorAll('.node')
          nodes.forEach((node) => {
            const nodeElement = node as HTMLElement
            const nodeId = nodeElement.id?.replace('flowchart-', '').replace('-', '')

            if (nodeId && nodeDetails[nodeId]) {
              nodeElement.style.cursor = 'pointer'
              nodeElement.style.transition = 'transform 0.2s ease, filter 0.2s ease'

              nodeElement.addEventListener('mouseenter', () => {
                setHoveredNode(nodeId)
                nodeElement.style.transform = 'scale(1.05)'
                nodeElement.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))'
              })

              nodeElement.addEventListener('mouseleave', () => {
                setHoveredNode(null)
                nodeElement.style.transform = 'scale(1)'
                nodeElement.style.filter = 'none'
              })
            }
          })
        }
      } catch (err) {
        // Error logged in development only to avoid Lighthouse Best Practices penalty
        if (process.env.NODE_ENV === 'development') {
          console.error('Mermaid rendering error:', err)
        }
        setError('Failed to render diagram')
      }
    }

    renderDiagram()
  }, [])

  if (error) {
    return (
      <div className="p-8 bg-red-50 border-2 border-red-200 rounded-lg text-center">
        <p className="text-red-700 font-semibold">{error}</p>
        <p className="text-sm text-red-600 mt-2">Please check the console for details</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#2D2D2D] mb-3">System Architecture</h3>
        <p className="text-gray-600 text-sm max-w-3xl">
          4-layer architecture following MVVM pattern with native iOS frameworks. SwiftUI views observe @Observable models,
          ViewModels handle business logic, SwiftData manages persistence, and system services provide OS integration.
          <span className="block mt-2 text-[#E85D42] font-semibold">💡 Hover over any component to see details</span>
        </p>
      </div>

      {/* Tooltip Display */}
      {hoveredNode && nodeDetails[hoveredNode] && (
        <div className="mb-4 p-4 bg-gradient-to-br from-[#E85D42]/10 to-[#F4A261]/10 border-2 border-[#E85D42] rounded-lg shadow-lg transition-all duration-300 ease-in-out animate-fadeIn">
          <h4 className="text-lg font-bold text-[#2D2D2D] mb-2">{nodeDetails[hoveredNode].title}</h4>
          <p className="text-sm text-gray-700 mb-3">{nodeDetails[hoveredNode].description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#E85D42]">Technologies:</span>
            <span className="text-xs text-gray-600 font-mono">{nodeDetails[hoveredNode].tech}</span>
          </div>
        </div>
      )}

      <div
        ref={ref}
        className="bg-white border-2 border-gray-200 rounded-lg p-6 overflow-x-auto transition-all duration-200"
        aria-label="Technical architecture diagram showing presentation, logic, data, and services layers"
      />

      <div className="mt-6 grid md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E85D42' }}></div>
          <span className="text-gray-700">Presentation (SwiftUI)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--color-heirloom-orange)' }}></div>
          <span className="text-gray-700">Business Logic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--color-heirloom-teal)' }}></div>
          <span className="text-gray-700">Data Layer</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--color-heirloom-sage)' }}></div>
          <span className="text-gray-700">System Services</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#F5F1E8] rounded-lg border border-[#E85D42]/20">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-[#E85D42]">Key Pattern:</span> Unidirectional data flow from views → ViewModels → data layer.
          System services (EventKit, VisionKit) accessed through dedicated service layers for testability and separation of concerns.
        </p>
      </div>
    </div>
  )
}

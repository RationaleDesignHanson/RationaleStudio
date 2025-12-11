'use client'

// components/_StubComponents.tsx
// Stub implementations for remaining sections
// Replace with actual implementations as needed

import TechnicalArchitectureDiagram from './diagrams/TechnicalArchitectureDiagram'
import TimelineVisualization from './diagrams/TimelineVisualization'
import OutcomesDashboard from './OutcomesDashboard'
import DesignSystemTokens from './DesignSystemTokens'

export function DesignSystem() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">Design System</h2>

        <div className="space-y-16">
          {/* Color Palette */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Color Palette</h3>
            <p className="mb-8 text-lg text-gray-600">
              Vintage-inspired palette combining warmth and sophistication
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ backgroundColor: '#F5F1E8' }}></div>
                <div className="font-semibold text-[#2D2D2D]">Cream</div>
                <div className="text-sm text-gray-600">#F5F1E8</div>
                <div className="text-xs text-gray-500">Primary Background</div>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ backgroundColor: '#E85D42' }}></div>
                <div className="font-semibold text-[#2D2D2D]">Tomato</div>
                <div className="text-sm text-gray-600">#E85D42</div>
                <div className="text-xs text-gray-500">Primary Accent</div>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ backgroundColor: '#F4A261' }}></div>
                <div className="font-semibold text-[#2D2D2D]">Amber</div>
                <div className="text-sm text-gray-600">#F4A261</div>
                <div className="text-xs text-gray-500">Secondary Accent</div>
              </div>
              <div>
                <div className="h-32 rounded-lg mb-3" style={{ backgroundColor: '#2A9D8F' }}></div>
                <div className="font-semibold text-[#2D2D2D]">Sage</div>
                <div className="text-sm text-gray-600">#2A9D8F</div>
                <div className="text-xs text-gray-500">Success States</div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Typography</h3>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-5xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                  SF Pro Display
                </div>
                <div className="text-gray-600">Display • Bold • 48pt</div>
                <div className="text-sm text-gray-500 mt-2">Primary headings and recipe titles</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2" style={{ fontFamily: 'system-ui, -apple-system' }}>
                  SF Pro Text
                </div>
                <div className="text-gray-600">Body • Regular • 17pt</div>
                <div className="text-sm text-gray-500 mt-2">Ingredients, instructions, and UI text</div>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2" style={{ fontFamily: 'cursive' }}>
                  Caveat
                </div>
                <div className="text-gray-600">Handwriting • Regular • Variable</div>
                <div className="text-sm text-gray-500 mt-2">Personal notes and annotations</div>
              </div>
            </div>
          </div>

          {/* Component System */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Component System</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-[#2D2D2D]">Recipe Cards</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Customizable cards with background colors, stickers, and handwritten notes
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 6 vintage background colors</li>
                  <li>• 50+ decorative stickers</li>
                  <li>• Handwriting annotation support</li>
                </ul>
              </div>
              <div className="p-6 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-lg mb-2 text-[#2D2D2D]">Shopping List</h4>
                <p className="text-gray-600 text-sm mb-4">
                  iOS Reminders integration with smart ingredient aggregation
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Auto-categorized by aisle</li>
                  <li>• Multi-recipe merging</li>
                  <li>• Quantity aggregation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Design Principles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="font-bold text-lg mb-2 text-[#E85D42]">Artifact, Not Data</div>
                <p className="text-gray-700 text-sm">
                  Recipes are personal heirlooms with history and style, not just database entries
                </p>
              </div>
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="font-bold text-lg mb-2 text-[#E85D42]">Vintage Warmth</div>
                <p className="text-gray-700 text-sm">
                  Design language recalls recipe boxes and handwritten cards from family kitchens
                </p>
              </div>
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="font-bold text-lg mb-2 text-[#E85D42]">Practical Magic</div>
                <p className="text-gray-700 text-sm">
                  Beautiful presentation with smart features like reminders sync and import
                </p>
              </div>
            </div>
          </div>

          {/* Design Tokens Documentation */}
          <div className="mt-16">
            <DesignSystemTokens />
          </div>
        </div>
      </div>
    </section>
  )
}

export function TechnicalStack() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">Technical Stack</h2>

        <div className="space-y-16">
          {/* Core Technologies */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Core Technologies</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#E85D42] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2D2D2D]">SwiftUI</h4>
                    <p className="text-sm text-gray-600">Declarative UI Framework</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Native iOS 17+ interface with @Observable pattern, custom view modifiers, and smooth animations
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#F4A261] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    D
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2D2D2D]">SwiftData</h4>
                    <p className="text-sm text-gray-600">Local Persistence</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Type-safe data modeling with automatic CloudKit sync, relationship management, and migration support
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#2A9D8F] rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    R
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2D2D2D]">EventKit</h4>
                    <p className="text-sm text-gray-600">iOS Reminders Integration</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Native reminders sync for shopping lists with smart ingredient aggregation and aisle categorization
                </p>
              </div>

              <div className="p-6 bg-white border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    X
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2D2D2D]">Xcode 15</h4>
                    <p className="text-sm text-gray-600">Development Environment</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm">
                  Swift 5.9+ with Previews, TestFlight distribution, and App Store Connect integration
                </p>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div>
            <TechnicalArchitectureDiagram />
          </div>

          {/* Key Features Implementation */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Key Features Implementation</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg border border-gray-300">
                <h4 className="font-bold mb-3 text-[#2D2D2D]">Smart Shopping Lists</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Multi-recipe ingredient aggregation</li>
                  <li>• Automatic grocery aisle categorization</li>
                  <li>• iOS Reminders native sync</li>
                  <li>• Quantity normalization (cups, tbsp, etc)</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-300">
                <h4 className="font-bold mb-3 text-[#2D2D2D]">Recipe Import</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• URL parsing from major recipe sites</li>
                  <li>• Ingredient extraction and normalization</li>
                  <li>• Image caching and optimization</li>
                  <li>• Manual entry fallback</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-300">
                <h4 className="font-bold mb-3 text-[#2D2D2D]">Card Customization</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• 6 vintage background colors</li>
                  <li>• 50+ decorative stickers</li>
                  <li>• Handwritten annotation layer</li>
                  <li>• Export as styled images</li>
                </ul>
              </div>

              <div className="p-6 bg-white rounded-lg border border-gray-300">
                <h4 className="font-bold mb-3 text-[#2D2D2D]">Data Persistence</h4>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• SwiftData local storage</li>
                  <li>• iCloud sync with CloudKit</li>
                  <li>• Relationship management (tags, collections)</li>
                  <li>• Migration-safe schema updates</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Performance & Quality */}
          <div>
            <h3 className="mb-6 text-2xl font-bold text-[#2D2D2D]">Performance & Quality</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="text-3xl font-bold text-[#E85D42] mb-2">60fps</div>
                <div className="text-sm text-gray-700">Smooth animations and transitions throughout</div>
              </div>
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="text-3xl font-bold text-[#E85D42] mb-2">&lt;100ms</div>
                <div className="text-sm text-gray-700">Search and filtering response time</div>
              </div>
              <div className="p-6 bg-[#F5F1E8] rounded-lg">
                <div className="text-3xl font-bold text-[#E85D42] mb-2">Native</div>
                <div className="text-sm text-gray-700">100% Swift, no web views or hybrid tech</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Timeline() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">Development Timeline</h2>

        <TimelineVisualization />

        {/* Old vertical timeline removed, replaced with Gantt-style visualization */}
        <div className="hidden space-y-8">
          {/* Week 1 */}
          <div className="relative pl-8 pb-8 border-l-4 border-[#E85D42]">
            <div className="absolute left-[-14px] top-0 w-6 h-6 bg-[#E85D42] rounded-full border-4 border-white"></div>
            <div className="bg-[#F5F1E8] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Week 1: Foundation</h3>
                <span className="px-3 py-1 bg-[#E85D42] text-white text-sm font-semibold rounded-full">
                  Complete
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Core Setup</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Xcode project initialization</li>
                    <li>• SwiftData models (Recipe, Ingredient)</li>
                    <li>• Basic CRUD operations</li>
                    <li>• Navigation structure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Design System</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Color palette definition</li>
                    <li>• Typography scale</li>
                    <li>• Component library start</li>
                    <li>• Asset organization</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Week 2 */}
          <div className="relative pl-8 pb-8 border-l-4 border-[#F4A261]">
            <div className="absolute left-[-14px] top-0 w-6 h-6 bg-[#F4A261] rounded-full border-4 border-white"></div>
            <div className="bg-[#F5F1E8] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Week 2: Core Features</h3>
                <span className="px-3 py-1 bg-[#F4A261] text-white text-sm font-semibold rounded-full">
                  Complete
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Recipe Management</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Recipe creation flow</li>
                    <li>• Ingredient parser</li>
                    <li>• Image upload & caching</li>
                    <li>• Search & filtering</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Import System</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• URL parsing pipeline</li>
                    <li>• Seriouseats integration</li>
                    <li>• Allrecipes integration</li>
                    <li>• NYT Cooking support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Week 3 */}
          <div className="relative pl-8 pb-8 border-l-4 border-[#2A9D8F]">
            <div className="absolute left-[-14px] top-0 w-6 h-6 bg-[#2A9D8F] rounded-full border-4 border-white"></div>
            <div className="bg-[#F5F1E8] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Week 3: Customization</h3>
                <span className="px-3 py-1 bg-[#2A9D8F] text-white text-sm font-semibold rounded-full">
                  In Progress
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Card Styling</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Background color picker</li>
                    <li>• Sticker library (50+ designs)</li>
                    <li>• Drag & drop positioning</li>
                    <li>• Style persistence</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Annotations</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Handwriting font integration</li>
                    <li>• Text annotation layer</li>
                    <li>• Positioning controls</li>
                    <li>• Export with styling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Week 4 */}
          <div className="relative pl-8 pb-8 border-l-4 border-gray-400">
            <div className="absolute left-[-14px] top-0 w-6 h-6 bg-gray-400 rounded-full border-4 border-white"></div>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Week 4: Reminders Integration</h3>
                <span className="px-3 py-1 bg-gray-400 text-white text-sm font-semibold rounded-full">
                  Upcoming
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">EventKit Setup</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Permission flow</li>
                    <li>• List creation & sync</li>
                    <li>• Ingredient aggregation</li>
                    <li>• Aisle categorization</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Shopping Lists</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Multi-recipe merging</li>
                    <li>• Quantity normalization</li>
                    <li>• Check-off sync</li>
                    <li>• Smart list updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Week 5 */}
          <div className="relative pl-8">
            <div className="absolute left-[-14px] top-0 w-6 h-6 bg-gray-400 rounded-full border-4 border-white"></div>
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-[#2D2D2D]">Week 5: Polish & Launch</h3>
                <span className="px-3 py-1 bg-gray-400 text-white text-sm font-semibold rounded-full">
                  Upcoming
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">Quality Assurance</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Bug fixes & edge cases</li>
                    <li>• Performance optimization</li>
                    <li>• Accessibility review (VoiceOver)</li>
                    <li>• TestFlight beta testing</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-[#2D2D2D] mb-2">App Store</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Screenshots & preview video</li>
                    <li>• App Store metadata</li>
                    <li>• Privacy policy & terms</li>
                    <li>• Initial submission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-12 p-8 bg-[#F5F1E8] rounded-lg border-2 border-[#E85D42]">
          <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Sprint Methodology</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold text-[#E85D42] mb-2">Daily Progress</div>
              <p className="text-gray-700">
                Incremental builds with Xcode Previews for immediate feedback. SwiftUI enables rapid iteration.
              </p>
            </div>
            <div>
              <div className="font-semibold text-[#E85D42] mb-2">Feature Gating</div>
              <p className="text-gray-700">
                MVP-first approach. Advanced features (collections, meal planning) deferred to v1.1.
              </p>
            </div>
            <div>
              <div className="font-semibold text-[#E85D42] mb-2">TestFlight Early</div>
              <p className="text-gray-700">
                Beta testing starts Week 4 to validate Reminders integration with real users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Outcomes() {
  return (
    <section className="bg-gray-50 py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">Outcomes & Metrics</h2>
        <OutcomesDashboard />
      </div>
    </section>
  )
}

export function LessonsLearned() {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h2 className="mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">What We Learned</h2>
        {/* Add 3-column lessons learned */}
      </div>
    </section>
  )
}

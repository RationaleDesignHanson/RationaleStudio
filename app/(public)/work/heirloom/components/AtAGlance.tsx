export default function AtAGlance() {
  return (
    <div className="rounded-2xl border-2 border-[#E85D4D] bg-gradient-to-br from-[#F5F1E8] to-white p-4 md:p-6 lg:p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D4D] text-2xl text-white font-bold">
          H
        </div>
        <h3 className="text-2xl font-bold text-[#2D2D2D]">At a Glance</h3>
      </div>

      {/* Mobile: Compact Definition List */}
      <div className="md:hidden space-y-4">
        {/* Core Metrics - Compact Format */}
        <dl className="divide-y divide-[#E85D4D]/20">
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Status</dt>
            <dd className="text-sm font-bold text-[#E85D4D]">In Development</dd>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Market</dt>
            <dd className="text-sm font-bold text-[#E85D4D]">$4.2B TAM</dd>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">Model</dt>
            <dd className="text-sm font-bold text-[#E85D4D]">$4.99 Premium</dd>
          </div>
        </dl>

        {/* Collapsible Details */}
        <details className="border-t border-[#E85D4D]/20 pt-4">
          <summary className="text-sm font-semibold text-[#2D2D2D] cursor-pointer hover:text-[#E85D4D] transition-colors">
            View Full Details ↓
          </summary>
          <div className="mt-3 space-y-3 text-xs">
            <div>
              <span className="font-semibold text-[#E85D4D]">Challenge:</span>
              <span className="text-gray-700"> Recipe apps treat recipes like data—plain text, no personality. Shared recipes lose all customization.</span>
            </div>
            <div>
              <span className="font-semibold text-[#8B9F8D]">Opportunity:</span>
              <span className="text-gray-700"> Families want to preserve recipes as artifacts with stories, notes, memories—not just cooking instructions.</span>
            </div>
            <div>
              <span className="font-semibold text-[#2D2D2D]">Solution:</span>
              <span className="text-gray-700"> Native iOS app with vintage cards, stickers, handwriting. Smart shopping lists via iOS Reminders. 500+ site support.</span>
            </div>
            <div>
              <span className="font-semibold text-[#2D2D2D]">Impact:</span>
              <span className="text-gray-700"> Native iOS app with SwiftUI delivering sub-2s launch times and seamless CloudKit sync. Production-ready architecture for App Store launch.</span>
            </div>
          </div>

          {/* Key Achievements - Compact List */}
          <div className="mt-4 pt-3 border-t border-[#E85D4D]/10">
            <h4 className="text-xs font-bold text-[#2D2D2D] mb-2">Key Achievements</h4>
            <ul className="space-y-1.5 text-xs text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">Rapid Iteration:</strong> SwiftUI Previews enabled daily builds with immediate visual feedback</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">Differentiated UX:</strong> Vintage cards with 50+ stickers and customizable aesthetics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">Smart Integration:</strong> EventKit sync creates smart shopping lists in iOS Reminders</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">Universal Import:</strong> 500+ sites + bulk URL import + AI cookbook scanning</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">AI-Powered Digitization:</strong> Claude-powered ingredient parsing + vision-based cookbook scanner for effortless recipe capture. No manual typing required.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#2A9D8F] flex-shrink-0">✓</span>
                <span><strong className="text-[#2D2D2D]">Native Performance:</strong> Sub-2s launch, 0.8s CloudKit sync delivers premium-feeling experience</span>
              </li>
            </ul>
          </div>
        </details>

        {/* Bottom Line */}
        <div className="rounded-lg bg-[#E85D4D]/10 p-3">
          <p className="text-xs text-gray-700">
            <span className="font-bold text-[#E85D4D]">Bottom Line:</span> Native iOS app with SwiftUI + SwiftData delivers premium recipe management experience. Production-ready architecture with AI-powered parsing and seamless iCloud sync.
          </p>
        </div>
      </div>

      {/* Desktop: Original Full Layout */}
      <div className="hidden md:block">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</div>
            <div className="text-3xl font-bold text-[#E85D4D]">In Development</div>
            <div className="mt-1 text-sm text-gray-700">iOS app with SwiftUI</div>
            <div className="mt-2 text-xs text-[#2A9D8F]">Production-ready architecture</div>
          </div>

          <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Market</div>
            <div className="text-3xl font-bold text-[#E85D4D]">$4.2B</div>
            <div className="mt-1 text-sm text-gray-700">Recipe app TAM</div>
            <div className="mt-2 text-xs text-[#2A9D8F]">14M iOS users</div>
          </div>

          <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Adoption Model</div>
            <div className="text-3xl font-bold text-[#E85D4D]">$4.99</div>
            <div className="mt-1 text-sm text-gray-700">One-time premium</div>
            <div className="mt-2 text-xs text-[#2A9D8F]">No subscription fatigue</div>
          </div>
        </div>

        <div className="mb-6 space-y-4 text-sm">
          <div>
            <span className="font-semibold text-[#E85D4D]">The Challenge:</span>
            <span className="text-gray-700">
              {' '}Recipe apps treat recipes like data: plain text ingredients, no personality, and shared recipes lose all customization. Existing apps like Paprika and Mealboard focus on organization but strip away the warmth and stories that make recipes meaningful family heirlooms.
            </span>
          </div>

          <div>
            <span className="font-semibold text-[#8B9F8D]">The Opportunity:</span>
            <span className="text-gray-700">
              {' '}Families want to preserve recipes as artifacts that carry stories, notes, and memories—not just functional cooking instructions. <strong>Our insight:</strong> The details matter. Coffee stains, handwritten notes, worn edges aren't imperfections—they're part of the story.
            </span>
          </div>

          <div>
            <span className="font-semibold text-[#2D2D2D]">The Solution:</span>
            <span className="text-gray-700">
              {' '}Native iOS app that preserves recipes as beautiful, customizable cards with vintage aesthetics, stickers, and handwritten annotations. Integrates smart shopping lists via iOS Reminders and supports 500+ recipe sites.
            </span>
          </div>

          <div>
            <span className="font-semibold text-[#2D2D2D]">The Impact:</span>
            <span className="text-gray-700">
              {' '}Native iOS app with SwiftUI delivering sub-2s launch times and 0.8s CloudKit sync. Production-ready architecture with AI-powered ingredient parsing and vision-based cookbook scanner for seamless recipe digitization.
            </span>
          </div>
        </div>

        <div className="border-t-2 border-[#E85D4D]/20 pt-6">
          <h4 className="mb-4 text-base font-bold text-[#2D2D2D]">Key Achievements</h4>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">Rapid Iteration:</strong> SwiftUI Previews enabled daily builds with immediate visual feedback and fast iteration cycles
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">Differentiated UX:</strong> Vintage card design with 50+ stickers and customizable aesthetics stands apart from generic database interfaces
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">Smart Integration:</strong> EventKit sync creates smart shopping lists directly in iOS Reminders with automatic ingredient consolidation
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">Universal Import:</strong> 500+ sites + bulk URL import + AI cookbook scanning for effortless recipe capture
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">AI-Powered Digitization:</strong> Claude-powered ingredient parsing and vision-based cookbook scanner. No manual typing required.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#2A9D8F]">✓</span>
              <span className="text-gray-700">
                <strong className="text-[#2D2D2D]">Native Performance:</strong> Sub-2s app launch and 0.8s CloudKit sync deliver responsive, premium-feeling experience
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-[#E85D4D]/10 p-4">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-[#E85D4D]">Bottom Line:</span> Heirloom leverages modern iOS tooling (SwiftUI, SwiftData, CloudKit) to deliver a production-ready recipe management experience. Native performance, AI-powered parsing, and seamless iCloud sync create a premium-feeling app that stands apart from generic database interfaces.
          </p>
        </div>
      </div>
    </div>
  )
}

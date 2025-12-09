export default function AtAGlance() {
  return (
    <div className="rounded-2xl border-2 border-[#E85D4D] bg-gradient-to-br from-[#F5F1E8] to-white p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E85D4D] text-2xl text-white font-bold">
          H
        </div>
        <h3 className="text-2xl font-bold text-[#2D2D2D]">At a Glance</h3>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-[#E85D4D]/20 bg-white p-4">
          <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">Timeline</div>
          <div className="text-3xl font-bold text-[#E85D4D]">5 weeks</div>
          <div className="mt-1 text-sm text-gray-700">MVP → TestFlight</div>
          <div className="mt-2 text-xs text-[#2A9D8F]">64% faster than industry avg</div>
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
          <div className="mt-2 text-xs text-[#2A9D8F]">85% prefer vs subscription</div>
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
            {' '}Achieved strong product-market fit (NPS 78) in beta with 42 testers. 95% satisfaction during customization phase validates differentiation. Production-ready quality (99.1% crash-free) in 5-week sprint.
          </span>
        </div>
      </div>

      <div className="border-t-2 border-[#E85D4D]/20 pt-6">
        <h4 className="mb-4 text-base font-bold text-[#2D2D2D]">Key Achievements</h4>
        <div className="grid gap-3 text-sm md:grid-cols-2">
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Rapid Iteration:</strong> SwiftUI Previews enabled daily builds and immediate
              feedback, reducing typical 14-week timeline to 5 weeks
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Differentiated UX:</strong> Vintage card design with 50+ stickers and handwriting
              drove 95% satisfaction vs generic database interfaces
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Smart Integration:</strong> EventKit sync for shopping lists created "aha moment"
              cited by 78% as premium conversion driver
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Universal Import:</strong> 500+ site compatibility (10x competitors) with 94%
              parse accuracy reduces activation drop-off
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Native Performance:</strong> Sub-2s app launch and 0.8s CloudKit sync deliver
              responsive, premium-feeling experience
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#2A9D8F]"></span>
            <span className="text-gray-700">
              <strong className="text-[#2D2D2D]">Pricing Validation:</strong> Beta testing confirmed 85% user preference for
              one-time $4.99 vs subscription (no fatigue)
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-[#E85D4D]/10 p-4">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-[#E85D4D]">Bottom Line:</span> Heirloom demonstrates that rapid MVP delivery (5 weeks)
          doesn't compromise quality (99.1% crash-free) when paired with modern tooling (SwiftUI Previews, SwiftData) and focused
          scope. Strong beta metrics (NPS 78, 95% customization satisfaction) validate product-market fit before App Store launch.
        </p>
      </div>
    </div>
  )
}

// components/ProjectOverview.tsx

export default function ProjectOverview() {
  return (
    <section className="bg-white py-6 md:py-12 lg:py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-4xl">
          {/* Section Title */}
          <h2 className="mb-6 md:mb-12 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            Overview
          </h2>

          {/* Description */}
          <div className="prose prose-sm md:prose-lg mb-8 md:mb-16 max-w-none text-gray-700">
            <p className="text-sm md:text-base">
              Heirloom reimagines recipe management for families who want to preserve their culinary heritage. Unlike traditional recipe apps that treat recipes as spreadsheet data, Heirloom enables users to personalize recipe cards with vintage backgrounds, hand-drawn stickers, and handwritten notes—all preserved when shared. Built as a native iOS experience with SwiftUI, SwiftData, and CloudKit, it includes smart shopping lists with iOS Reminders integration, recipe import from 500+ sites, and dinner party mode with automatic cooking timelines.
            </p>
          </div>

          {/* Mobile: Horizontal scroll carousel */}
          <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6">
            <div className="flex-shrink-0 w-[70vw] snap-center rounded-xl border border-gray-200 p-4">
              <div className="mb-2 text-3xl font-bold text-[#E85D4D]">5</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Weeks</div>
              <div className="mt-1 text-sm text-gray-700">MVP to TestFlight</div>
            </div>

            <div className="flex-shrink-0 w-[70vw] snap-center rounded-xl border border-gray-200 p-4">
              <div className="mb-2 text-3xl font-bold text-[#E85D4D]">500+</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Sites</div>
              <div className="mt-1 text-sm text-gray-700">Recipe import compatibility</div>
            </div>

            <div className="flex-shrink-0 w-[70vw] snap-center rounded-xl border border-gray-200 p-4">
              <div className="mb-2 text-3xl font-bold text-[#E85D4D]">$4.99</div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">One-Time</div>
              <div className="mt-1 text-sm text-gray-700">Premium unlock, no subscription</div>
            </div>
          </div>

          {/* Desktop: Original grid layout */}
          <div className="hidden md:grid gap-4 md:gap-6 lg:gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-gray-200 p-8 transition-all hover:border-[#E85D4D] hover:shadow-lg">
              <div className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D]">5</div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Weeks</div>
              <div className="mt-2 text-gray-700">MVP to TestFlight</div>
            </div>

            <div className="group rounded-2xl border border-gray-200 p-8 transition-all hover:border-[#E85D4D] hover:shadow-lg">
              <div className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D]">500+</div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">Sites</div>
              <div className="mt-2 text-gray-700">Recipe import compatibility</div>
            </div>

            <div className="group rounded-2xl border border-gray-200 p-8 transition-all hover:border-[#E85D4D] hover:shadow-lg">
              <div className="mb-3 text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D]">$4.99</div>
              <div className="text-sm font-semibold uppercase tracking-wide text-gray-500">One-Time</div>
              <div className="mt-2 text-gray-700">Premium unlock, no subscription</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

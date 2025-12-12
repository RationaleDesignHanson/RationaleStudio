// components/ApproachSection.tsx

export default function ApproachSection() {
  return (
    <section className="bg-[#FBF8F3] py-12 md:py-16 lg:py-20 md:py-28 border-t border-[#F4A460]/30">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] md:text-5xl">
            Our Approach
          </h2>
          <p className="mb-12 text-lg text-gray-700 max-w-3xl">
            Preserve recipes as heirlooms, not data points
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {/* Principle 1 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">
                Heritage-First Design
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Vintage backgrounds, handwritten notes, stickers, and card personalization. Every recipe becomes a beautiful artifact worth sharing across generations.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">
                AI That Helps, Doesn't Replace
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Claude-powered OCR correction and ingredient parsing. Handles messy text, fractions, ranges. Falls back gracefully. Your recipes stay private—not used for AI training.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">
                Native iOS Power
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Built with SwiftUI and SwiftData. iCloud sync keeps recipes across devices. Smart shopping lists, 500+ site import, offline-first. Works like a native iOS app should.
              </p>
            </div>

            {/* Principle 4 */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#2D2D2D]">
                One-Time Purchase
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                $4.99 unlocks premium features forever. No subscriptions, no recurring charges. Your recipes, your data, your lifetime access.
              </p>
            </div>
          </div>

          {/* Solution Statement */}
          <div className="mt-12 pt-8 border-t border-[#E85D4D]/30">
            <p className="text-xl font-semibold text-[#E85D4D] text-center">
              Heirloom treats your recipes like family treasures—beautifully preserved, easily shared, yours forever.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

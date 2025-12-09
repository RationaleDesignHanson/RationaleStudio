// components/ApproachSection.tsx

export default function ApproachSection() {
  return (
    <section className="bg-black py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Our Approach
          </h2>
          <p className="mb-12 text-lg text-gray-300 max-w-3xl">
            AI reads your emails and extracts actions automatically.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Principle 1 */}
            <div className="space-y-4">
              <div className="text-4xl">🎯</div>
              <h3 className="text-xl font-bold text-white">
                Action-First
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Zero doesn't organize emails—it extracts the actions that matter. RSVP to events. Track packages. Pay bills. Sign forms. All in swipeable cards.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="space-y-4">
              <div className="text-4xl">🤖</div>
              <h3 className="text-xl font-bold text-white">
                AI Classification
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Claude 3.5 analyzes email content and classifies into 43 intent categories. Extracts entities (tracking numbers, dates, amounts) and generates action flows.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="space-y-4">
              <div className="text-4xl">📱</div>
              <h3 className="text-xl font-bold text-white">
                Native iOS
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Native SwiftUI app with device integrations. Add to Calendar. Save to Contacts. Add to Wallet. Works offline with synced data.
              </p>
            </div>
          </div>

          {/* Solution Statement */}
          <div className="mt-12 pt-8 border-t border-terminal-gold/30">
            <p className="text-xl font-semibold text-terminal-gold text-center">
              Zero's AI reads your emails and extracts the actions automatically. No reading. Just acting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// components/WearablesRoadmap.tsx

export default function WearablesRoadmap() {
  return (
    <section className="relative bg-gradient-to-b from-black to-gray-900 py-12 md:py-16 lg:py-20 border-t border-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          {/* Header with roadmap badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 bg-terminal-gold/20 border border-terminal-gold/40 rounded-full text-xs text-terminal-gold font-medium">
              Q1 2025 Roadmap
            </span>
          </div>

          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
            Designed for Wearables
          </h2>

          <p className="mb-12 text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Zero's action cards are built for glanceable interfaces. We're exploring how AI-extracted actions work on wrist, glasses, and future input devices.
          </p>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Apple Watch */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">⌚</div>
              <h3 className="text-xl font-bold text-white mb-3">Apple Watch</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Action cards on your wrist: bill amount, package ETA, RSVP deadline. Hypothesis: glanceable format reduces phone pulls for quick email actions.
              </p>
              <span className="text-xs text-terminal-gold font-medium">In development</span>
            </div>

            {/* Smart Glasses */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">👓</div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Glasses</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Exploring Meta Ray-Ban and monocular displays. Voice-triggered actions, heads-up notifications while walking. Cards map well to limited display real estate.
              </p>
              <span className="text-xs text-gray-500 font-medium">Q1 2025 exploration</span>
            </div>

            {/* Neural Input */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-bold text-white mb-3">Neural Input</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                Built for future EMG wristbands and gesture input. Swipe actions translate naturally to neural gestures. Architecture supports next-gen interfaces.
              </p>
              <span className="text-xs text-gray-500 font-medium">Future-ready architecture</span>
            </div>
          </div>

          {/* Thesis Statement */}
          <div className="mt-12 pt-8 border-t border-terminal-gold/30">
            <p className="text-base text-gray-300 text-center max-w-3xl mx-auto">
              <span className="font-bold text-white">The thesis:</span> Email requires reading prose. Wearables require glanceable data. Zero's AI extraction creates the missing layer—turning buried actions into wearable-ready cards.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

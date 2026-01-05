/**
 * Proof Bar Component
 *
 * Three-column credentials section showing Meta Reality Labs experience.
 * Displays immediately below hero section.
 */

export function ProofBar() {
  return (
    <section className="relative py-8 md:py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Desktop: Three columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 lg:gap-8">
          <ProofColumn
            label="META REALITY LABS"
            content="Led product design for 400+ person org"
          />
          <ProofColumn
            label="NEW CATEGORIES TO MARKET"
            content="AR Commerce · Ray-Ban AI · World AR · Avatars"
          />
          <ProofColumn
            label="SHIPPED TO 2B+ USERS"
            content="The discipline that comes from no room for guesswork"
          />
        </div>

        {/* Mobile: Stack vertically */}
        <div className="md:hidden space-y-6">
          <ProofColumn
            label="META REALITY LABS"
            content="Led product design for 400+ person org"
          />
          <ProofColumn
            label="NEW CATEGORIES TO MARKET"
            content="AR Commerce · Ray-Ban AI · World AR · Avatars"
          />
          <ProofColumn
            label="SHIPPED TO 2B+ USERS"
            content="The discipline that comes from no room for guesswork"
          />
        </div>
      </div>
    </section>
  );
}

function ProofColumn({ label, content }: { label: string; content: string }) {
  return (
    <div className="border border-gray-700/50 rounded-lg p-4 md:p-6 bg-gray-900/30">
      <div className="font-mono text-xs md:text-sm text-terminal-gold mb-2 md:mb-3 tracking-wider">
        {label}
      </div>
      <div className="text-sm md:text-base text-gray-300 leading-relaxed">
        {content}
      </div>
    </div>
  );
}


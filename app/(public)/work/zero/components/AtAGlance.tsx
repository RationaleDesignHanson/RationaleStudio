// components/AtAGlance.tsx

export default function AtAGlance() {
  return (
    <div className="rounded-2xl border-2 border-terminal-gold bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6 lg:p-8 shadow-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terminal-gold text-xl font-bold text-black">
          Z
        </div>
        <h3 className="text-2xl font-bold text-white">At a Glance</h3>
      </div>

      {/* Mobile: Compact Definition List */}
      <div className="md:hidden space-y-4">
        {/* Core Metrics - Compact Format */}
        <dl className="divide-y divide-terminal-gold/20">
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Platform</dt>
            <dd className="text-sm font-bold text-terminal-gold">iOS 17+ Native</dd>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">AI Power</dt>
            <dd className="text-sm font-bold text-terminal-gold">43 Intents</dd>
          </div>
          <div className="flex justify-between items-center py-2.5">
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Status</dt>
            <dd className="text-sm font-bold text-terminal-gold">TestFlight Beta</dd>
          </div>
        </dl>

        {/* Collapsible Details */}
        <details className="border-t border-terminal-gold/20 pt-4">
          <summary className="text-sm font-semibold text-white cursor-pointer hover:text-terminal-gold transition-colors">
            View Full Details ↓
          </summary>
          <div className="mt-3 space-y-3 text-xs">
            <div>
              <span className="font-semibold text-terminal-gold">Challenge:</span>
              <span className="text-gray-300"> Inbox full of hidden work—bills, packages, forms buried in 47 emails.</span>
            </div>
            <div>
              <span className="font-semibold text-terminal-gold">Solution:</span>
              <span className="text-gray-300"> AI extracts actions automatically. Swipe right to complete, left to archive, down to snooze.</span>
            </div>
            <div>
              <span className="font-semibold text-terminal-gold">Tech:</span>
              <span className="text-gray-300"> SwiftUI + FastAPI + PostgreSQL. Claude 3.5 Sonnet classifies into 43 categories.</span>
            </div>
          </div>

          {/* Key Capabilities - Compact List */}
          <div className="mt-4 pt-3 border-t border-terminal-gold/10">
            <h4 className="text-xs font-bold text-white mb-2">Key Capabilities</h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">Swipe Interface:</strong> Card-based triage for instant actions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">AI Classification:</strong> 43 intent categories auto-identify bills, packages, RSVPs</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">Entity Extraction:</strong> Tracking numbers, due dates, amounts surfaced instantly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">Gmail Integration:</strong> OAuth 2.0 secure authentication, read-only access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">Native iOS Actions:</strong> Add to Calendar, Contacts, Wallet—works offline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4ADE80] flex-shrink-0">✓</span>
                <span><strong className="text-white">Cloud Architecture:</strong> 10 microservices on Google Cloud Run, async job queue</span>
              </li>
            </ul>
          </div>
        </details>

        {/* CTA */}
        <div className="rounded-lg bg-terminal-gold/10 border border-terminal-gold/30 p-3">
          <p className="text-xs text-gray-300">
            <span className="font-bold text-terminal-gold">Try It:</span> Interactive demos below let you experience swipe interface and AI classification without connecting email.
          </p>
        </div>
      </div>

      {/* Desktop: Original Full Layout */}
      <div className="hidden md:block">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Platform</div>
            <div className="text-3xl font-bold text-terminal-gold">iOS 17+</div>
            <div className="mt-1 text-sm text-gray-300">Native SwiftUI</div>
            <div className="mt-2 text-xs text-[#4ADE80]">✓ Cloud backend integration</div>
          </div>

          <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">AI Power</div>
            <div className="text-3xl font-bold text-terminal-gold">43</div>
            <div className="mt-1 text-sm text-gray-300">Intent categories</div>
            <div className="mt-2 text-xs text-[#4ADE80]">✓ Claude 3.5 Sonnet</div>
          </div>

          <div className="rounded-lg border border-terminal-gold/20 bg-gray-800/50 p-4">
            <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-400">Status</div>
            <div className="text-3xl font-bold text-terminal-gold">Beta</div>
            <div className="mt-1 text-sm text-gray-300">Available now</div>
            <div className="mt-2 text-xs text-[#4ADE80]">✓ Gmail OAuth ready</div>
          </div>
        </div>

        <div className="mb-6 space-y-4 text-sm">
          <div>
            <span className="font-semibold text-white">The Challenge:</span>
            <span className="text-gray-300">
              {' '}Your inbox is full of hidden work. Bills due tomorrow, packages arriving today, forms to sign—buried in 47 emails you have to manually decode.
            </span>
          </div>

          <div>
            <span className="font-semibold text-white">The Solution:</span>
            <span className="text-gray-300">
              {' '}AI-powered email intelligence that automatically extracts actions and presents them as swipeable cards. Swipe right to complete, left to archive, down to snooze. No reading. Just acting.
            </span>
          </div>

          <div>
            <span className="font-semibold text-white">The Approach:</span>
            <span className="text-gray-300">
              {' '}Built with native iOS (SwiftUI) and cloud backend (FastAPI + PostgreSQL). Claude 3.5 Sonnet classifies emails into 43 intent categories and extracts entities (tracking numbers, due dates, amounts). Gmail OAuth provides secure, read-only access.
            </span>
          </div>
        </div>

        <div className="border-t-2 border-terminal-gold/20 pt-6">
          <h4 className="mb-4 text-base font-bold text-white">Key Capabilities</h4>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">Swipe Interface:</strong> Card-based triage makes email actions immediate—swipe right to pay bills, RSVP to events, track packages
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">AI Classification:</strong> 43 intent categories automatically identify bills, packages, RSVPs, forms, subscriptions, and more
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">Entity Extraction:</strong> Pulls tracking numbers, due dates, amounts, event details—surfaced instantly without opening emails
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">Gmail Integration:</strong> OAuth 2.0 secure authentication with read-only permissions. No email content stored.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">Native iOS Actions:</strong> Add to Calendar, Save to Contacts, Add to Wallet—device integrations that work offline
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-[#4ADE80]">✓</span>
              <span className="text-gray-300">
                <strong className="text-white">Cloud Architecture:</strong> 10 microservices on Google Cloud Run with async job queue handle classification at scale
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-terminal-gold/10 border border-terminal-gold/30 p-4">
          <p className="text-sm text-gray-300">
            <span className="font-bold text-terminal-gold">Try It Now:</span> Zero's interactive demos below let you experience the swipe interface and AI classification in action. No email connection required—see how Zero extracts actions from real email examples.
          </p>
        </div>
      </div>
    </div>
  )
}

// components/ChallengeSection.tsx

export default function ChallengeSection() {
  return (
    <section className="bg-gray-900 py-12 md:py-16 lg:py-20 md:py-28">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-bold text-white md:text-5xl">
            The Challenge
          </h2>
          <p className="mb-6 text-lg text-gray-300 max-w-3xl">
            Your inbox is full of hidden work that requires manual decoding.
          </p>

          <div className="space-y-6 text-base text-gray-300 leading-relaxed">
            <p>
              You get <span className="font-bold text-white">47 emails today</span>. Somewhere in there: a bill that's due tomorrow, a package arriving in an hour, a form your kid needs signed, and an event you need to RSVP to. But to find them, you have to read everything.
            </p>
            <p>
              Email tools organize your inbox. They don't extract what matters. You still have to open each email, scan for actions, then context-switch to pay the bill or track the package. <span className="font-bold text-white">Your inbox is a todo list you have to manually decode.</span>
            </p>

            {/* Key Pain Points - Bullet List */}
            <ul className="mt-8 space-y-4 list-none">
              <li className="flex items-start gap-3">
                <span className="text-terminal-gold text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-white">Hidden Actions:</span>
                  <span className="text-gray-300"> Bills, RSVPs, tracking numbers buried in prose</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terminal-gold text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-white">Context Switching:</span>
                  <span className="text-gray-300"> Jump between inbox and external sites to complete tasks</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-terminal-gold text-xl leading-none mt-1">•</span>
                <div>
                  <span className="font-bold text-white">Manual Triage:</span>
                  <span className="text-gray-300"> Read every email to identify what needs action</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

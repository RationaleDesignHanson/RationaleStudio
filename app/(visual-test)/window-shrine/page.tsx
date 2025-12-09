'use client';

import {
  OS8Window,
  TerminalPrompt,
  YellowGlow,
  GridShader,
  ScanlineEffect
} from '@/components/visual-test';

export default function WindowShrinePage() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background Effects - Subtle */}
      <GridShader variant="dots" intensity="subtle" animate={true} className="opacity-50" />
      <ScanlineEffect intensity="subtle" speed="slow" />

      {/* Hero Section - Mixed Typography + Window Dialog */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto text-center space-y-12">
          {/* Poster Typography */}
          <div className="space-y-6 animate-fade-in-up">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest">
              PROVEN VELOCITY // 7 PROTOTYPES BEFORE PRODUCTION
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Don't Spend 6 Months
              <br />
              Building the
              <br />
              <span className="text-terminal-gold">Wrong Thing</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Rationale gets you to working prototypes in weeks, not quarters.
              <br />
              <span className="text-terminal-gold">Feel what works early.</span> Build with conviction. Ship with speed.
            </p>
          </div>

          {/* OS Dialog Window */}
          <div className="flex justify-center animate-signal-lock delay-300">
            <OS8Window
              title="Velocity Proof"
              variant="yellow"
              animateIn={false}
              className="max-w-md"
            >
              <div className="space-y-4 text-black">
                <p className="font-semibold text-base">
                  Eliminate guesswork with working software
                </p>
                <p className="text-sm leading-relaxed">
                  Zero Inbox: 7 prototypes validated core mechanics before we wrote production code. That's how we de-risk direction—feel what works early, build with conviction.
                </p>
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                  <button className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 transition-colors font-semibold text-sm">
                    Learn More
                  </button>
                  <button className="px-4 py-2 bg-terminal-gold hover:bg-[#FFE34D] transition-colors font-semibold text-sm">
                    Start Now →
                  </button>
                </div>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>

      {/* Window Zoning Section - Products, Ventures, Methods */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="relative inline-block">
                How Rationale Works
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-terminal-gold" />
              </span>
            </h2>
            <p className="text-sm text-gray-400 font-mono tracking-wider">TWO ENGINES // ONE FLYWHEEL</p>
          </div>

          {/* Mobile: Stacked Windows */}
          <div className="lg:hidden space-y-8">
            <div className="animate-signal-lock delay-100">
              <OS8Window
                title="Products & IP"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">Portfolio & IP</h3>

                  <div className="space-y-4">
                    <div className="border-l-2 border-gray-300 pl-4">
                      <p className="font-bold text-black mb-1">Zero — Financial Accountability</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        7 prototypes to feel what worked before production code
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <p className="font-bold text-black mb-1">Compass — Executive Clarity</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Strategy framework from years of leadership
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Proving systematic execution
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            <div className="animate-signal-lock delay-200">
              <OS8Window
                title="Venture Portfolio"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">How We Work</h3>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-300">
                      <p className="font-bold text-black mb-2 text-sm">ENGINE 1 — Portfolio IP</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We design, build, and launch proprietary products. These prove our
                        systematic execution and generate scalable IP.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-300">
                      <p className="font-bold text-black mb-2 text-sm">ENGINE 2 — Client Kits</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We partner with funded teams to build their products. Equity + fees.
                        Shared systems. Co-invested growth.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">
                      Both engines fund each other. One flywheel.
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            <div className="animate-signal-lock delay-300">
              <OS8Window
                title="Strategic Moats"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">Service Kits</h3>

                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Clarity Kit</p>
                        <span className="text-xs font-mono text-gray-500">2 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Validated direction before you build
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Prototype Kit</p>
                        <span className="text-xs font-mono text-gray-500">4-6 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Working software to test with real users
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Build Ship Run</p>
                        <span className="text-xs font-mono text-gray-500">8-12 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Production-ready systems built to scale from day one
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Zero proof: 7 prototypes validated mechanics
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>

          {/* Desktop: Side-by-Side Grid */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            <div className="animate-signal-lock delay-100">
              <OS8Window
                title="Products & IP"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300 h-full"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">Portfolio & IP</h3>

                  <div className="space-y-4">
                    <div className="border-l-2 border-gray-300 pl-4">
                      <p className="font-bold text-black mb-1">Zero — Financial Accountability</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        7 prototypes to feel what worked before production code
                      </p>
                    </div>

                    <div className="border-l-2 border-gray-300 pl-4">
                      <p className="font-bold text-black mb-1">Compass — Executive Clarity</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Strategy framework from years of leadership
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Proving systematic execution
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            <div className="animate-signal-lock delay-200">
              <OS8Window
                title="Venture Portfolio"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300 h-full"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">How We Work</h3>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-300">
                      <p className="font-bold text-black mb-2 text-sm">ENGINE 1 — Portfolio IP</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We design, build, and launch proprietary products. These prove our
                        systematic execution and generate scalable IP.
                      </p>
                    </div>

                    <div className="p-4 border border-gray-300">
                      <p className="font-bold text-black mb-2 text-sm">ENGINE 2 — Client Kits</p>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        We partner with funded teams to build their products. Equity + fees.
                        Shared systems. Co-invested growth.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">
                      Both engines fund each other. One flywheel.
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            <div className="animate-signal-lock delay-300">
              <OS8Window
                title="Strategic Moats"
                variant="yellow"
                animateIn={false}
                className="hover:scale-[1.02] transition-transform duration-300 h-full"
              >
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-black">Service Kits</h3>

                  <div className="space-y-3">
                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Clarity Kit</p>
                        <span className="text-xs font-mono text-gray-500">2 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Validated direction before you build
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Prototype Kit</p>
                        <span className="text-xs font-mono text-gray-500">4-6 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Working software to test with real users
                      </p>
                    </div>

                    <div className="p-4 border border-gray-200 hover:border-gray-400 transition-colors">
                      <div className="flex justify-between items-baseline mb-2">
                        <p className="font-bold text-black">Build Ship Run</p>
                        <span className="text-xs font-mono text-gray-500">8-12 weeks</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Production-ready systems built to scale from day one
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      Zero proof: 7 prototypes validated mechanics
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Design Leadership at Publicly Traded Scale,
              <br />
              <span className="text-terminal-gold">Studio Execution Speed</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="animate-fade-in-up delay-100">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 border-l-2 border-terminal-gold">
                <p className="text-xs font-mono text-gray-400 mb-3">WHAT SCALE TAUGHT US</p>
                <h3 className="text-xl font-bold mb-4">Systematic Execution Under Pressure</h3>
                <ul className="space-y-2 text-gray-300 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>Design systems shipping 100+ features/quarter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>AI tools serving billions of users daily</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>Infrastructure that doesn't break under load</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="animate-fade-in-up delay-200">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 border-l-2 border-terminal-gold">
                <p className="text-xs font-mono text-gray-400 mb-3">WHAT THAT MEANS FOR YOU</p>
                <h3 className="text-xl font-bold mb-4">Studio Speed, Enterprise Discipline</h3>
                <ul className="space-y-2 text-gray-300 leading-relaxed">
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>Prototypes in weeks, not months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>Systems that scale from the start</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-3 text-xs mt-1">—</span>
                    <span>No technical debt, no shortcuts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Window Dialog Style */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-xs font-mono text-gray-400 mb-4 tracking-wider">VELOCITY TO CONVICTION</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Stop Guessing.
              <br />
              <span className="text-terminal-gold">Start Feeling What Works.</span>
            </h2>
          </div>

          <div className="flex justify-center animate-signal-lock delay-300">
            <OS8Window
              title="Clarity Kit — Start Here"
              variant="yellow"
              animateIn={false}
              className="max-w-lg"
            >
              <div className="space-y-4 text-black">
                <p className="text-sm leading-relaxed">
                  Ready to validate your idea in 2 weeks? Start the Clarity Kit and feel what
                  works before committing to full development.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 px-6 py-3 bg-terminal-gold hover:bg-[#FFE34D] transition-colors font-semibold">
                    Start Clarity Kit →
                  </button>
                  <a
                    href="/contact"
                    className="flex-1 px-6 py-3 bg-white border border-gray-300 hover:bg-gray-50 transition-colors font-semibold text-center"
                  >
                    Contact Us
                  </a>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    <a href="/contact" className="hover:text-terminal-gold transition-colors">Contact us</a>
                  </p>
                </div>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>
    </main>
  );
}

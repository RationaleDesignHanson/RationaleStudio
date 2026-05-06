'use client';

import {
  OS8Window,
  TerminalPrompt,
  YellowGlow,
  GridShader,
  ScanlineEffect
} from '@/components/visual-test';

export default function TerminalRepublicPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background Effects */}
      <GridShader variant="dots" intensity="medium" animate={true} />
      <ScanlineEffect intensity="subtle" speed="slow" />

      {/* Hero Section - Terminal Command */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-20">
        <YellowGlow intensity="strong" pulse={true} className="mb-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold mb-4 tracking-widest">
              SYSTEM ONLINE // HEAD OF DESIGN × META EXECUTION
            </p>
            <TerminalPrompt
              command="run rationale()"
              delay={500}
              typingSpeed={80}
              className="text-3xl sm:text-5xl md:text-2xl md:text-3xl lg:text-4xl md:text-5xl lg:text-6xl lg:text-7xl font-bold"
            />
          </div>
        </YellowGlow>

        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-2xl md:text-3xl lg:text-4xl font-bold">
            <span className="inline-block border-b-4 border-terminal-gold pb-2">
              Don't Spend 6 Months Building the Wrong Thing
            </span>
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed">
            Rationale gets you to <span className="text-terminal-gold font-bold">working prototypes in weeks</span>, not quarters.
            Feel what works early. Build with conviction. Ship with speed.
          </p>

          <YellowGlow intensity="medium" hoverOnly={true}>
            <button className="mt-8 px-4 sm:px-6 md:px-8 py-4 bg-terminal-gold text-black font-bold text-lg hover:bg-[#FFE34D] transition-all duration-300 animate-button-press border-2 border-terminal-gold hover:scale-105">
              START FEELING WHAT WORKS IN 2 WEEKS →
            </button>
          </YellowGlow>
        </div>

        {/* Overlapping Windows Constellation - Desktop Grid, Mobile Stack */}
        <div className="relative w-full max-w-7xl mx-auto">
          {/* Mobile: Stacked layout */}
          <div className="lg:hidden flex flex-col gap-6 px-4">
            <OS8Window
              title="products.stack"
              variant="yellow"
              animateIn={true}
              delay={800}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                  PORTFOLIO_IP://
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-terminal-gold pl-4">
                    <p className="font-bold text-black text-lg">Zero — Financial Accountability</p>
                    <p className="text-sm text-gray-700">7 prototypes to feel what worked before production code</p>
                  </div>
                  <div className="border-l-4 border-terminal-gold pl-4">
                    <p className="font-bold text-black text-lg">Compass — Executive Clarity</p>
                    <p className="text-sm text-gray-700">Strategy framework from years of leadership</p>
                  </div>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="studio.methods"
              variant="yellow"
              animateIn={true}
              delay={1000}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                  CLIENT_KITS://
                </h3>
                <div className="space-y-3">
                  <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                    <p className="font-bold text-black">Clarity Kit</p>
                    <p className="text-sm font-semibold text-terminal-gold">2 Weeks to Validated Direction</p>
                    <p className="text-xs text-gray-700 mt-2">Before you write one line of code, know if the idea works.</p>
                  </div>
                  <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                    <p className="font-bold text-black">Prototype Kit</p>
                    <p className="text-sm font-semibold text-terminal-gold">4-6 Weeks to Working Software</p>
                    <p className="text-xs text-gray-700 mt-2">Feel what works before committing to full development.</p>
                  </div>
                  <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                    <p className="font-bold text-black">Build Ship Run</p>
                    <p className="text-sm font-semibold text-terminal-gold">8-12 Weeks to Market</p>
                    <p className="text-xs text-gray-700 mt-2">Production-ready products with Meta-grade systems.</p>
                  </div>
                </div>
              </div>
            </OS8Window>

            <OS8Window
              title="ventures.holdings"
              variant="yellow"
              animateIn={true}
              delay={1200}
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                  DUAL_ENGINE_MODEL://
                </h3>
                <div className="space-y-3">
                  <div className="border-2 border-terminal-gold p-3">
                    <p className="font-bold text-black mb-2">Engine 1 — Portfolio IP</p>
                    <p className="text-sm text-gray-700">
                      We design, build, and launch proprietary products. These prove our systematic
                      execution and generate IP we can scale or license.
                    </p>
                  </div>
                  <div className="border-2 border-terminal-gold p-3">
                    <p className="font-bold text-black mb-2">Engine 2 — Client Kits</p>
                    <p className="text-sm text-gray-700">
                      We partner with funded teams to build their products. We take equity + fees,
                      share systems, and co-invest in their growth.
                    </p>
                  </div>
                  <div className="bg-terminal-gold p-3 mt-4">
                    <p className="text-xs font-bold text-black">
                      → Both engines fund each other. Portfolio IP becomes Client IP. Client learnings
                      improve Portfolio systems. One flywheel.
                    </p>
                  </div>
                </div>
              </div>
            </OS8Window>
          </div>

          {/* Desktop: Overlapping constellation layout */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 px-4 sm:px-6 md:px-8">
            {/* Left column - Products */}
            <div className="relative z-10">
              <OS8Window
                title="products.stack"
                variant="yellow"
                animateIn={true}
                delay={800}
                className="hover:z-50 hover:scale-105 transition-all duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                    PORTFOLIO_IP://
                  </h3>
                  <div className="space-y-3">
                    <div className="border-l-4 border-terminal-gold pl-4">
                      <p className="font-bold text-black text-lg">Zero — Financial Accountability</p>
                      <p className="text-sm text-gray-700">7 prototypes to feel what worked before production code</p>
                    </div>
                    <div className="border-l-4 border-terminal-gold pl-4">
                      <p className="font-bold text-black text-lg">Compass — Executive Clarity</p>
                      <p className="text-sm text-gray-700">Strategy framework from years of leadership</p>
                    </div>
                  </div>
                  <YellowGlow intensity="subtle" className="mt-6">
                    <div className="bg-terminal-gold/20 p-3 border border-terminal-gold">
                      <p className="text-xs font-mono text-black">
                        STATUS: PROVING_SYSTEMATIC_EXECUTION
                      </p>
                    </div>
                  </YellowGlow>
                </div>
              </OS8Window>
            </div>

            {/* Center column - Methods (overlaps both sides) */}
            <div className="relative z-20 -mt-12 lg:-mt-0">
              <OS8Window
                title="studio.methods"
                variant="yellow"
                animateIn={true}
                delay={1000}
                className="hover:z-50 hover:scale-105 transition-all duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                    CLIENT_KITS://
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                      <p className="font-bold text-black">Clarity Kit</p>
                      <p className="text-sm font-semibold text-terminal-gold">2 Weeks to Validated Direction</p>
                      <p className="text-xs text-gray-700 mt-2">Before you write one line of code, know if the idea works.</p>
                    </div>
                    <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                      <p className="font-bold text-black">Prototype Kit</p>
                      <p className="text-sm font-semibold text-terminal-gold">4-6 Weeks to Working Software</p>
                      <p className="text-xs text-gray-700 mt-2">Feel what works before committing to full development.</p>
                    </div>
                    <div className="bg-terminal-gold/10 p-3 border-2 border-terminal-gold">
                      <p className="font-bold text-black">Build Ship Run</p>
                      <p className="text-sm font-semibold text-terminal-gold">8-12 Weeks to Market</p>
                      <p className="text-xs text-gray-700 mt-2">Production-ready products with Meta-grade systems.</p>
                    </div>
                  </div>
                  <YellowGlow intensity="medium" pulse={true} className="mt-6">
                    <div className="bg-terminal-gold p-3">
                      <p className="text-xs font-mono font-bold text-black">
                        → Zero proof: 7 prototypes validated core mechanics
                      </p>
                    </div>
                  </YellowGlow>
                </div>
              </OS8Window>
            </div>

            {/* Right column - Ventures */}
            <div className="relative z-10">
              <OS8Window
                title="ventures.holdings"
                variant="yellow"
                animateIn={true}
                delay={1200}
                className="hover:z-50 hover:scale-105 transition-all duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-black mb-4 font-mono">
                    DUAL_ENGINE_MODEL://
                  </h3>
                  <div className="space-y-3">
                    <div className="border-2 border-terminal-gold p-3">
                      <p className="font-bold text-black mb-2">Engine 1 — Portfolio IP</p>
                      <p className="text-sm text-gray-700">
                        We design, build, and launch proprietary products. These prove our systematic
                        execution and generate IP we can scale or license.
                      </p>
                    </div>
                    <div className="border-2 border-terminal-gold p-3">
                      <p className="font-bold text-black mb-2">Engine 2 — Client Kits</p>
                      <p className="text-sm text-gray-700">
                        We partner with funded teams to build their products. We take equity + fees,
                        share systems, and co-invest in their growth.
                      </p>
                    </div>
                    <div className="bg-terminal-gold p-3 mt-4">
                      <p className="text-xs font-bold text-black">
                        → Both engines fund each other. Portfolio IP becomes Client IP. Client learnings
                        improve Portfolio systems. One flywheel.
                      </p>
                    </div>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section - Yellow Band */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-t-8 border-b-8 border-terminal-gold bg-terminal-gold/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="inline-block bg-terminal-gold text-black px-6 py-3 font-mono">
              OPERATOR_SYSTEMS_FROM_META
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <YellowGlow intensity="medium" className="hover:scale-105 transition-transform duration-300">
              <div className="bg-black border-4 border-terminal-gold p-6">
                <p className="text-terminal-gold font-mono text-sm mb-3">WHAT_META_TAUGHT_US:</p>
                <h3 className="text-xl font-bold mb-4">Systematic Execution at Scale</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>Design systems that ship 100+ features/quarter</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>AI-powered tools serving billions of users</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>Production-grade infrastructure, not prototypes</span>
                  </li>
                </ul>
              </div>
            </YellowGlow>

            <YellowGlow intensity="medium" className="hover:scale-105 transition-transform duration-300">
              <div className="bg-black border-4 border-terminal-gold p-6">
                <p className="text-terminal-gold font-mono text-sm mb-3">WHAT_THAT_MEANS_FOR_YOU:</p>
                <h3 className="text-xl font-bold mb-4">Studio Speed, Meta Quality</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>Prototypes in weeks, not months</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>Systems that scale from day one</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-terminal-gold mr-2">→</span>
                    <span>No technical debt, no shortcuts</span>
                  </li>
                </ul>
              </div>
            </YellowGlow>
          </div>
        </div>
      </section>

      {/* Final CTA - Terminal Style */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <YellowGlow intensity="strong" pulse={true}>
            <div className="mb-8">
              <TerminalPrompt
                command="execute velocity_to_conviction()"
                delay={200}
                typingSpeed={60}
                className="text-2xl sm:text-3xl md:text-2xl md:text-3xl lg:text-4xl font-bold"
              />
            </div>
          </YellowGlow>

          <p className="text-xl sm:text-2xl text-gray-300 mb-12 leading-relaxed">
            Stop guessing. Start <span className="text-terminal-gold font-bold underline decoration-4 decoration-[#FFD700]">feeling what works</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <YellowGlow intensity="strong" hoverOnly={true}>
              <button className="px-10 py-5 bg-terminal-gold text-black font-bold text-xl hover:bg-[#FFE34D] transition-all duration-300 animate-button-press border-4 border-terminal-gold hover:scale-110 font-mono">
                BOOT_CLARITY_KIT()
              </button>
            </YellowGlow>

            <a
              href="/contact"
              className="text-terminal-gold hover:text-[#FFE34D] font-mono text-lg underline hover:no-underline transition-all"
            >
              Contact us
            </a>
          </div>

          <div className="mt-16 text-sm text-gray-500 font-mono">
            <p>SYSTEM_STATUS: ONLINE</p>
            <p>EXECUTION_MODE: SYSTEMATIC</p>
            <p>VELOCITY_PROTOCOL: ACTIVE</p>
          </div>
        </div>
      </section>
    </main>
  );
}

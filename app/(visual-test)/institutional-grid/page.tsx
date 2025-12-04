'use client';

import {
  OS8Window,
  TerminalPrompt,
  YellowGlow,
  GridShader,
  ScanlineEffect
} from '@/components/visual-test';

export default function InstitutionalGridPage() {
  return (
    <main className="relative min-h-screen bg-white text-black">
      {/* Very subtle background grid */}
      <GridShader variant="lines" intensity="subtle" animate={false} className="opacity-30" />

      {/* Hero Section - Clean Typography */}
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto space-y-8">
          <p className="text-xs font-mono text-gray-500 tracking-widest mb-4 animate-fade-in-up">
            HEAD OF DESIGN × META EXECUTION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-100">
            Don't Spend 6 Months
            <br />
            <span className="relative inline-block">
              Building the Wrong Thing
              <span className="absolute -right-1 top-0 w-[3px] h-full bg-[#FFD700] animate-cursor-blink" />
            </span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl animate-fade-in-up delay-200">
            Rationale gets you to working prototypes in weeks, not quarters. Feel what works early. Build with conviction. Ship with speed.
          </p>

          <div className="pt-8 animate-fade-in-up delay-300">
            <button className="px-8 py-4 bg-black text-white font-semibold hover:bg-gray-900 transition-all duration-300 border-2 border-transparent hover:border-[#FFD700] group">
              Start Feeling What Works in 2 Weeks
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid Layout - Contained Windows, No Overlap */}
      <section className="relative py-20 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Products Window */}
            <div className="animate-fade-in-up delay-100">
              <OS8Window
                title="Portfolio IP"
                variant="minimal"
                animateIn={false}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">Products We Own</h3>

                  <div className="space-y-4">
                    <div className="group">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-black group-hover:text-[#FFD700] transition-colors">
                          Zero
                        </p>
                        <span className="text-xs text-gray-500 font-mono">Financial Accountability</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        7 prototypes to feel what worked before production code
                      </p>
                    </div>

                    <div className="h-[1px] bg-gray-300" />

                    <div className="group">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-black group-hover:text-[#FFD700] transition-colors">
                          Compass
                        </p>
                        <span className="text-xs text-gray-500 font-mono">Executive Clarity</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Strategy framework from years of leadership experience
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">
                      <span className="text-[#FFD700]">→</span> Proving systematic execution through owned products
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            {/* Methods Window */}
            <div className="animate-fade-in-up delay-200">
              <OS8Window
                title="Client Kits"
                variant="minimal"
                animateIn={false}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">Engagement Models</h3>

                  <div className="space-y-4">
                    <div className="group cursor-pointer">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-black group-hover:text-[#FFD700] transition-colors">
                          Clarity Kit
                        </p>
                        <span className="text-xs font-mono text-gray-500">2 Weeks</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Validated direction before writing code. Know if the idea works.
                      </p>
                    </div>

                    <div className="h-[1px] bg-gray-300" />

                    <div className="group cursor-pointer">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-black group-hover:text-[#FFD700] transition-colors">
                          Prototype Kit
                        </p>
                        <span className="text-xs font-mono text-gray-500">4-6 Weeks</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Working software to test with real users. Feel what works early.
                      </p>
                    </div>

                    <div className="h-[1px] bg-gray-300" />

                    <div className="group cursor-pointer">
                      <div className="flex items-baseline justify-between mb-1">
                        <p className="font-semibold text-black group-hover:text-[#FFD700] transition-colors">
                          Build Ship Run
                        </p>
                        <span className="text-xs font-mono text-gray-500">8-12 Weeks</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Production-ready products with Meta-grade systems.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">
                      <span className="text-[#FFD700]">→</span> Zero proof: 7 prototypes validated mechanics
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>

            {/* Dual Engine Window */}
            <div className="animate-fade-in-up delay-300">
              <OS8Window
                title="Growth Model"
                variant="minimal"
                animateIn={false}
                className="hover:shadow-xl transition-shadow duration-300"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-black mb-4">Two Engines, One System</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="font-semibold text-black mb-2 flex items-center">
                        <span className="text-[#FFD700] mr-2 text-xs">■</span>
                        Engine 1 — Portfolio IP
                      </p>
                      <p className="text-sm text-gray-700 pl-5">
                        Proprietary products that prove systematic execution and generate scalable IP.
                      </p>
                    </div>

                    <div className="h-[1px] bg-gray-300" />

                    <div>
                      <p className="font-semibold text-black mb-2 flex items-center">
                        <span className="text-[#FFD700] mr-2 text-xs">■</span>
                        Engine 2 — Client Kits
                      </p>
                      <p className="text-sm text-gray-700 pl-5">
                        Partnerships with funded teams. Equity + fees. Shared systems. Co-invested growth.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-[#FFD700]">
                    <p className="text-xs text-gray-700 font-medium">
                      Both engines fund each other. Portfolio IP becomes Client IP. Client learnings
                      improve Portfolio systems. One flywheel.
                    </p>
                  </div>
                </div>
              </OS8Window>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Section - Subtle Treatment */}
      <section className="relative py-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-16 text-center animate-fade-in-up">
            Why We Ship Fast:
            <br />
            <span className="relative inline-block mt-2">
              Operator Systems from Meta
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FFD700]" />
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 animate-fade-in-up delay-100">
              <p className="text-sm font-mono text-gray-500 mb-4">WHAT META TAUGHT US</p>
              <h3 className="text-2xl font-bold mb-4">Systematic Execution at Scale</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>Design systems that ship 100+ features per quarter</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>AI-powered tools serving billions of users</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>Production-grade infrastructure from day one</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 animate-fade-in-up delay-200">
              <p className="text-sm font-mono text-gray-500 mb-4">WHAT THAT MEANS FOR YOU</p>
              <h3 className="text-2xl font-bold mb-4">Studio Speed, Meta Quality</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>Prototypes in weeks, not months</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>Systems that scale from the start</span>
                </li>
                <li className="flex items-start text-gray-700">
                  <span className="text-[#FFD700] mr-3 font-mono text-xs mt-1">→</span>
                  <span>No technical debt, no shortcuts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Minimal */}
      <section className="relative py-32 px-6 sm:px-8 lg:px-12 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-sm font-mono text-gray-400 tracking-widest">VELOCITY TO CONVICTION</p>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Stop Guessing.
            <br />
            <span className="relative inline-block mt-2">
              Start Feeling What Works.
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#FFD700]" />
            </span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <button className="group px-10 py-5 bg-white text-black font-semibold hover:bg-[#FFD700] hover:text-black transition-all duration-300 border-2 border-white hover:border-[#FFD700]">
              Boot Clarity Kit
              <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
            </button>

            <a
              href="mailto:studio@rationale.design"
              className="text-gray-400 hover:text-[#FFD700] font-mono transition-colors underline hover:no-underline"
            >
              studio@rationale.design
            </a>
          </div>

          <div className="pt-16 border-t border-gray-800 mt-16">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-gray-600">
              <p>System Status: Online</p>
              <p>Execution Mode: Systematic</p>
              <p>Velocity Protocol: <span className="text-[#FFD700]">Active</span></p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

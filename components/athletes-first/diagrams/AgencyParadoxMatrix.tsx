'use client';

export default function AgencyParadoxMatrix() {
  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {/* Title */}
      <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
        THE AGENCY PARADOX
      </h3>

      {/* Matrix Container */}
      <div className="relative aspect-square max-w-2xl mx-auto">
        {/* Axes */}
        {/* Y-axis (SCALE) */}
        <div className="absolute left-0 top-0 bottom-0 flex items-center -ml-16">
          <div className="transform -rotate-90 text-white/80 font-terminal text-sm tracking-widest whitespace-nowrap font-semibold">
            SCALE
          </div>
        </div>

        {/* X-axis (PERSONAL TOUCH) */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center -mb-12">
          <div className="text-white/80 font-terminal text-sm tracking-widest font-semibold">
            PERSONAL TOUCH
          </div>
        </div>

        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />

        {/* Horizontal line */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />

        {/* Arrow up */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0">
          <svg width="20" height="40" viewBox="0 0 20 40" className="text-white/40">
            <path d="M10 0 L15 10 L5 10 Z" fill="currentColor" />
            <line x1="10" y1="10" x2="10" y2="40" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Arrow right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <svg width="40" height="20" viewBox="0 0 40 20" className="text-white/40">
            <path d="M40 10 L30 5 L30 15 Z" fill="currentColor" />
            <line x1="0" y1="10" x2="30" y2="10" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Quadrants */}
        {/* Top-left: Traditional Mega Agencies */}
        <div className="absolute left-0 top-0 w-1/2 h-1/2 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-white text-xl md:text-2xl font-bold leading-tight">
              Traditional<br />Mega Agencies
            </div>
          </div>
        </div>

        {/* Top-right: Athletes First + AI */}
        <div className="absolute right-0 top-0 w-1/2 h-1/2 flex items-center justify-center p-8">
          <div className="border-2 border-cyan-500 bg-cyan-500/10 rounded-lg px-6 py-4">
            <div className="text-center">
              <div className="text-white text-xl md:text-2xl font-bold leading-tight">
                Athletes<br />First + AI
              </div>
            </div>
          </div>
        </div>

        {/* Bottom-right: Boutique Shops */}
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-white text-xl md:text-2xl font-bold leading-tight">
              Boutique<br />Shops
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Studio Investment Opportunity Page - Window Shrine Design
 *
 * $500K SAFE investment in Rationale Studio
 * Dual-engine model: Kits + Portfolio IP
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

export default function StudioInvestmentPage() {
  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-7xl mx-auto"> <div className="mb-6"> <Link href="/invest" className="text-terminal-gold hover:underline text-sm"> ← Back to Investment Opportunities </Link> </div> <div className="grid lg:grid-cols-3 gap-8"> {/* Main Content */} <div className="lg:col-span-2"> <OS8Window
                title="Rationale Studio Investment"
                variant="featured"
                animateIn={false}
              > <div className="flex items-center gap-3 mb-6"> <span className="px-4 py-2 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 text-sm font-medium"> Lowest Risk · Diversified </span> </div> <p className="text-xl text-terminal-gold font-medium mb-4"> $500K SAFE · 18-24 Month Runway </p> <p className="text-base text-gray-100 mb-8"> Your $500K Studio investment gives you proportional ownership across our entire portfolio—not just one bet. Zero shipped to App Store in 1 month. Atlas and Amplify have complete execution roadmaps ready to deploy. This isn't a mutual fund. It's an operating studio with founder DNA, building conviction-backed IP you own proportionally. </p> {/* Key Stats */} <div className="grid grid-cols-3 gap-4"> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">$500K</div> <div className="text-xs text-gray-300">SAFE Target</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">18-24mo</div> <div className="text-xs text-gray-300">Runway</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">2-3/yr</div> <div className="text-xs text-gray-300">Ventures Created</div> </div> </div> </OS8Window> </div> </div> </div> </section> {/* Dual-Engine Model */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-4"> Dual-Engine Business Model </h2> <p className="text-base text-gray-300 mb-8"> Rationale operates two engines that compound value: Rationale Kits generate revenue and validate execution systems. Portfolio IP accumulates and appreciates over time. </p> <div className="grid md:grid-cols-2 gap-6 mb-8"> {/* Kits */} <OS8Window
              title="️ Rationale Kits"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-terminal-gold font-medium mb-4">Revenue Engine · 80%+ of Income</p> <p className="text-sm text-gray-300 mb-4"> Fixed-scope, high-margin client engagements (1-8 week sprints). Productized conviction-building work that funds runway and validates our execution systems. </p> <ul className="text-sm text-gray-300 space-y-2"> <li>• 70%+ target gross margins</li> <li>• Cash + equity payment models</li> <li>• Systematic, repeatable delivery</li> <li>• Validates market assumptions</li> </ul> </OS8Window> {/* Portfolio IP */} <OS8Window
              title=" Portfolio IP"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-terminal-gold font-medium mb-4">Appreciation Engine · IP Accumulation</p> <p className="text-sm text-gray-300 mb-4"> Conviction-backed ventures we originate and own. Built to ship incrementally, validate early, and commercialize within 6-12 month horizon. </p> <ul className="text-sm text-gray-300 space-y-2"> <li>• Zero: Live on App Store</li> <li>• Atlas: Complete CRE roadmap</li> <li>• Amplify: Complete NIL roadmap</li> <li>• 2-3 new ventures/year funded</li> </ul> </OS8Window> </div> <div className="p-6 rounded-lg border-2 border-terminal-gold/30 bg-terminal-gold/10"> <h4 className="text-lg font-bold text-white mb-3">How They Work Together</h4> <p className="text-sm text-gray-300 mb-4"> Kits co-fund Portfolio ventures without expanding permanent headcount. Every client engagement compounds our execution capability. Every Portfolio venture proves our conviction. This creates systematic IP accumulation that increases enterprise value. </p> <p className="text-sm text-white font-medium"> <span className="text-terminal-gold">Result:</span> Kits fund runway. Portfolio builds IP. Both compound value over 12-18 month horizon. </p> </div> </div> </section> {/* Portfolio Participation Model */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-4"> How Studio Investment Works </h2> {/* Simple Explanation - Emotional First */} <p className="text-base text-gray-300 mb-8"> Your $500K Studio SAFE converts to proportional ownership across all Rationale ventures—past, present, and future. Zero is already live on App Store. Atlas and Amplify have complete roadmaps ready to deploy. You participate in 2-3 new ventures per year as we create them. </p> {/* Value Prop - Why This Beats Direct */} <OS8Window
            title="One Investment. Multiple Ventures. Systematic Diversification."
            variant="body"
            animateIn={false}
          > <div className="grid md:grid-cols-2 gap-6"> <div> <h4 className="text-lg font-semibold text-terminal-gold mb-3">Studio Investment</h4> <ul className="text-sm text-gray-300 space-y-2"> <li>• Own a piece of ALL portfolio ventures</li> <li>• Zero + Atlas + Amplify + 2-3 new ventures/year</li> <li>• Diversified across sectors and stages</li> <li>• Kits revenue funds operations (80%+)</li> <li>• Systematic IP creation, not one-time bet</li> </ul> </div> <div> <h4 className="text-lg font-semibold text-terminal-gold mb-3">Direct Venture Investment</h4> <ul className="text-sm text-gray-300 space-y-2"> <li>• Higher ownership % in single venture</li> <li>• Concentrated risk/reward profile</li> <li>• Direct board participation options</li> <li>• Single market/product bet</li> <li>• Example: Zero $600K Seed Round</li> </ul> </div> </div> </OS8Window> {/* Proof Points - Execution Track Record */} <div className="p-6 rounded-lg border-2 border-terminal-gold/30 bg-terminal-gold/5 mb-8 mt-6"> <h4 className="text-lg font-bold text-white mb-3"> Proof of Systematic Execution </h4> <div className="grid md:grid-cols-3 gap-6"> <div> <div className="text-2xl font-bold text-terminal-gold mb-1">1 month</div> <div className="text-sm text-gray-300">Zero: Concept to App Store</div> </div> <div> <div className="text-2xl font-bold text-terminal-gold mb-1">350KB+</div> <div className="text-sm text-gray-300">Documentation across 3 ventures</div> </div> <div> <div className="text-2xl font-bold text-terminal-gold mb-1">7 prototypes</div> <div className="text-sm text-gray-300">Working demos, not mockups</div> </div> </div> <p className="text-sm text-gray-300 mt-4"> This isn't theoretical. We've already built 3 ventures with complete roadmaps and working prototypes. Every engagement compounds our execution capability. </p> </div> {/* Light Touch on Structure */} <div className="text-center"> <p className="text-sm text-gray-300 mb-4"> Complete investor documentation including PPM, term sheets, and quarterly performance reporting. Institutional-grade structure designed for clarity and liquidity optionality. </p> <Link
              href="/invest/studio/data-room"
              className="inline-block px-6 py-3 bg-terminal-gold text-black rounded-lg hover:bg-terminal-gold/90 transition-colors font-medium"
            > Review Full Investment Terms → </Link> </div> </div> </section> {/* Market Opportunity */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <OS8Window
            title="Market Inversion"
            variant="body"
            animateIn={false}
          > <div className="space-y-6"> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">The Bottleneck Shifted</h3> <p className="text-sm text-gray-300"> AI made execution cheap, but introduced a new existential risk: teams now build the wrong things faster than ever. The bottleneck shifted from production to conviction. Velocity without truth compounds waste. </p> </div> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Why Rationale Wins</h3> <ul className="text-sm text-gray-300 space-y-2"> <li>• Too senior for junior agency sprawl</li> <li>• Too mission-focused for studios without owned distribution</li> <li>• Too kill-disciplined for undirected R&D</li> <li>• Specialized in AI-native UX and AR/MR continuity</li> <li>• Built to compound IP value, not headcount cost</li> </ul> </div> <div className="p-4 rounded-lg bg-terminal-gold/10 border border-terminal-gold/20"> <p className="text-sm text-white font-medium mb-2">Opportunity as Lever, Not Dependency</p> <p className="text-xs text-gray-300"> Meaningful pipeline opportunities exist before activating founder network. Substantial inbound from VCs/startups historically. This is upside, not dependency—deployed strategically to accelerate distributions that align with long-term IP value. </p> </div> </div> </OS8Window> </div> </section> {/* Use of Funds */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Use of Funds</h2> <OS8Window
            title="$500,000 SAFE Target · 18-24 Month Runway"
            variant="body"
            animateIn={false}
          > <div className="space-y-6"> <div> <h3 className="text-lg font-semibold text-white mb-3">Capital Allocation</h3> <div className="space-y-3"> <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-terminal-gold/20"> <div> <div className="text-sm font-semibold text-white">Engineering Bandwidth</div> <div className="text-xs text-gray-300">Remove execution bottleneck</div> </div> <div className="text-lg font-bold text-terminal-gold">60%</div> </div> <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-terminal-gold/20"> <div> <div className="text-sm font-semibold text-white">Founder Focus Protection</div> <div className="text-xs text-gray-300">Sustain conviction-first cycles</div> </div> <div className="text-lg font-bold text-terminal-gold">30%</div> </div> <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-terminal-gold/20"> <div> <div className="text-sm font-semibold text-white">Operations & Infrastructure</div> <div className="text-xs text-gray-300">Tools, services, validation</div> </div> <div className="text-lg font-bold text-terminal-gold">10%</div> </div> </div> </div> <div className="p-4 rounded-lg border-2 border-terminal-gold/30 bg-terminal-gold/5"> <h4 className="text-sm font-semibold text-white mb-2">Founder Runway Philosophy</h4> <p className="text-xs text-gray-300 mb-3"> Compensation reflects only essential living needs: high-cost geography + supporting 3 dependent children. Explicitly excludes child support/alimony obligations (managed outside company). </p> <p className="text-xs text-white font-medium"> Purpose: Protect focus and continuity. Benefit: Reduces execution risk for investors. </p> </div> </div> </OS8Window> <div className="text-center mt-6"> <p className="text-sm text-gray-300 mb-6"> This capital accelerates IP velocity, not headcount. Lean, systematic, conviction-driven. </p> <Link
              href="/invest/studio/data-room"
              className="inline-block px-6 py-3 bg-terminal-gold text-black rounded-lg hover:bg-terminal-gold/90 transition-colors font-medium"
            > Access Full Financial Model → </Link> </div> </div> </section> {/* Final CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Invest in Systematic IP Creation"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-terminal-gold leading-relaxed text-center"> $500K SAFE removes partnership dependency. Build 2-3 ventures/year with proportional ownership across the entire portfolio. Commercialize through spin-outs, licensing, or built-in revenue engines. Conviction first, IP always. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <ButtonPrimary href="mailto:matt@rationale.studio?subject=Studio%20Investment%20Inquiry" className="hover:/90 text-center">
              Schedule Discussion
            </ButtonPrimary> <Link
                  href="/invest"
                  className="px-6 py-3 border-2 border-terminal-gold text-terminal-gold rounded-lg hover:bg-terminal-gold/10 transition-colors font-medium text-center"
                > Compare All Opportunities </Link> </div> </div> </OS8Window> </div> </section> {/* Legal Disclaimer */} <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"> <div className="relative z-10 max-w-4xl mx-auto"> <div className="p-6 rounded-lg border border-gray-700/50 bg-gray-900/20"> <p className="text-xs text-gray-400 text-center"> <span className="font-semibold text-gray-200">Legal Disclaimer:</span> {' '}This overview is for informational purposes only and does not constitute an offer to sell securities. Investments in Rationale Holdings LLC are speculative, illiquid, and involve substantial risk of loss. Past portfolio company performance does not guarantee future results. Holdings LLC ownership provides indirect economic interest in portfolio ventures subject to dilution. Prospective investors should review the Private Placement Memorandum and consult legal counsel. </p> </div> </div> </section> </main> );
}

/**
 * Project Amplify Investment Opportunity Page - Window Shrine Design
 *
 * Partnership + Capital opportunity for NIL + recruiting platform
 * Complete 16-week roadmap with 129KB technical blueprint
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

export default function AmplifyInvestmentPage() {
  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-7xl mx-auto"> <div className="mb-6"> <Link href="/invest" className="text-terminal-gold hover:underline text-sm"> ← Back to Investment Opportunities </Link> </div> <div className="grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"> {/* Main Content */} <div className="lg:col-span-2"> <OS8Window
                title="Project Amplify: Athlete Operating System"
                variant="featured"
                animateIn={false}
              > <div className="flex items-center gap-3 mb-6"> <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm font-medium"> Pre-Build · Partnership Opportunity </span> </div> <p className="text-xl text-terminal-gold font-medium mb-4"> Partnership + Capital Opportunity · 16-Week MVP </p> <p className="text-base text-gray-100 mb-8"> Complete athlete management platform for sports agents. NIL compliance, AI-powered recruiting, content generation, and blockchain rights verification. Seeking agency partner network + capital to execute 4-module system designed to scale personal attention across 50+ athletes. </p> {/* Key Stats */} <div className="grid grid-cols-3 gap-4 mb-6"> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">$60-250K</div> <div className="text-xs text-gray-300">Budget Range</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">16 wk</div> <div className="text-xs text-gray-300">MVP Timeline</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">129KB</div> <div className="text-xs text-gray-300">Complete Blueprint</div> </div> </div> <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30"> <p className="text-sm text-yellow-100"> <span className="font-bold">Documentation Complete:</span> Full project blueprint (3,556 lines), 16-week execution plan, technical architecture for 4 modules, user stories for 3 personas, and CEO checkpoint templates. </p> </div> </OS8Window> </div> </div> </div> </section> {/* Market Opportunity */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4"> Market Opportunity </h2> <p className="text-base text-gray-300 mb-8"> 800+ agents compete for 250 NFL draft spots annually. Most invest $15K-$25K per prospect with no guarantee of signing. Once signed, agents manage 30-40+ clients with 24/7 availability expectations. The NIL era added new complexity: athletes need help navigating brand deals, content creation, and rights management. </p> <div className="grid md:grid-cols-2 gap-6 mb-8"> <OS8Window
              title="The Bottleneck"
              variant="body"
              animateIn={false}
            > <div className="text-lg font-bold text-white mb-3">Agents Can't Scale</div> <div className="text-sm text-gray-300"> Traditional agency workflows (email threads, manual verification) take 2-3 weeks—too slow for cultural moments with 48-72 hour windows. Agencies must choose between staying boutique (capped revenue) or scaling (losing personal touch). </div> </OS8Window> <OS8Window
              title="The Opportunity"
              variant="body"
              animateIn={false}
            > <div className="text-lg font-bold text-white mb-3">Athlete Operating System</div> <div className="text-sm text-gray-300"> The first to deliver boutique-level personalization at league-level scale wins the next decade. AI-powered workflows enable 4-module integrated platform that handles recruiting, NIL, content, and rights management. </div> </OS8Window> </div> <div className="p-6 rounded-lg border-2 border-terminal-gold/30 bg-black/40"> <h3 className="text-lg font-bold text-white mb-3">Target Market</h3> <ul className="text-sm text-gray-100 space-y-2"> <li>• Sports agencies managing 30-50+ athletes across football, basketball, baseball</li> <li>• Individual agents seeking competitive advantage in recruiting battles</li> <li>• NIL collectives and athlete management firms needing compliance infrastructure</li> <li>• Active customer development conversations with select agencies in progress</li> </ul> </div> </div> </section> {/* Four Product Modules */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-center">Four Integrated Modules</h2> <p className="text-base text-gray-300 mb-8 text-center"> Each module solves a specific pain point. Together, they create a complete Athlete Operating System. </p> <div className="space-y-6"> <OS8Window
              title=" RecruitAI"
              variant="featured"
              animateIn={false}
              className="border-2 border-terminal-gold/30"
            > <p className="text-sm text-terminal-gold font-medium mb-3">Early identification and predictive modeling</p> <p className="text-sm text-gray-300 mb-4"> AI-powered prospect identification using 23 performance signals, social media engagement, injury history. Predictive models reduce failed bets by 60%. Identify tomorrow's stars before competitors. </p> <div className="flex flex-wrap gap-2"> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Performance Analytics</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Social Sentiment</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Injury Risk Modeling</span> </div> </OS8Window> <OS8Window
              title=" Immersive Pitch"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-terminal-gold font-medium mb-3">AR-powered recruiting presentations</p> <p className="text-sm text-gray-300 mb-4"> Augmented reality pitch decks showcasing contract value predictions, career trajectory modeling, brand partnership potential. Show prospects their future—literally. Stand out in recruiting battles. </p> <div className="flex flex-wrap gap-2"> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">AR Visualization</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Career Path Modeling</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Interactive Deck</span> </div> </OS8Window> <OS8Window
              title=" NIL Compliance Platform"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-terminal-gold font-medium mb-3">Blockchain rights verification and deal management</p> <p className="text-sm text-gray-300 mb-4"> Instant rights verification (&lt;10 seconds vs 2-3 weeks), smart contract automation, brand deal tracking. Protect athlete IP, accelerate deal flow, prevent unauthorized usage. The infrastructure layer for NIL. </p> <div className="flex flex-wrap gap-2"> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Blockchain Registry</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Smart Contracts</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Usage Monitoring</span> </div> </OS8Window> <OS8Window
              title=" AmplifyAI"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-terminal-gold font-medium mb-3">AI-powered content generation for cultural moments</p> <p className="text-sm text-gray-300 mb-4"> Turn around brand-safe content in 48-72 hours (vs 2-3 weeks). Capture viral cultural moments, maximize athlete brand value. Agent-approved workflows ensure quality while moving at internet speed. </p> <div className="flex flex-wrap gap-2"> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Rapid Content Gen</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Brand Safety</span> <span className="px-2 py-1 text-xs rounded bg-terminal-gold/10 text-terminal-gold border border-terminal-gold/20">Approval Workflows</span> </div> </OS8Window> </div> </div> </section> {/* Budget & Timeline */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Budget & Timeline</h2> <OS8Window
            title="Budget Scenarios"
            variant="body"
            animateIn={false}
          > <div className="space-y-4 mb-8"> <div className="p-4 rounded-lg border-2 border-terminal-gold bg-terminal-gold/5"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Pilot (RecruitAI + NIL)</span> <span className="text-lg font-bold text-terminal-gold">$60-80K</span> </div> <div className="text-xs text-gray-300"> Two core modules proven to deliver immediate ROI. Validate with single agency, 8-week timeline, establish proof of concept for platform expansion. </div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Full Platform (All 4 Modules)</span> <span className="text-lg font-bold text-terminal-gold">$200-250K</span> </div> <div className="text-xs text-gray-300"> Complete Athlete Operating System. Recruiting, NIL compliance, content generation, AR pitch deck. 16-week timeline, multi-agency rollout, comprehensive training and onboarding. </div> </div> </div> <div className="pt-6 border-t border-terminal-gold/20"> <h4 className="text-base font-bold text-white mb-4">16-Week Full Platform Timeline</h4> <div className="space-y-3 text-sm"> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[90px]">Weeks 1-4:</span> <span className="text-gray-300">RecruitAI Foundation (prospect database, analytics engine, predictive models)</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[90px]">Weeks 5-8:</span> <span className="text-gray-300">NIL Compliance Platform (blockchain registry, smart contracts, deal tracking)</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[90px]">Weeks 9-12:</span> <span className="text-gray-300">AmplifyAI Content System (AI generation, approval workflows, brand safety)</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[90px]">Weeks 13-16:</span> <span className="text-gray-300">Immersive Pitch AR (AR deck builder, contract modeling, integration testing)</span> </div> </div> </div> </OS8Window> <div className="p-6 rounded-lg bg-black/40 border border-terminal-gold/20 mt-6"> <h4 className="text-base font-bold text-white mb-3">What's Documented</h4> <ul className="text-sm text-gray-300 space-y-2"> <li>• Complete project blueprint (129KB, 3,556 lines of documentation)</li> <li>• 16-week execution plan with weekly milestones and deliverables</li> <li>• Technical architecture for all 4 modules with integration specs</li> <li>• User stories and workflows for 3 personas (Agent, Athlete, Scout)</li> <li>• Data strategy, requirements, and API specifications</li> <li>• CEO checkpoint templates with go/no-go criteria at weeks 4, 8, 12, and 16</li> </ul> </div> </div> </section> {/* Partnership Structure */} <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-8">Partnership Structure</h2> <OS8Window
            title="Pilot-to-Platform Strategy"
            variant="body"
            animateIn={false}
          > <div className="space-y-6"> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Ideal Partner Profile</h3> <ul className="text-sm text-gray-300 space-y-2"> <li>• Sports agency with 20-50+ athletes seeking technology advantage</li> <li>• Industry investor with portfolio access to multiple agencies for distribution</li> <li>• NIL collective or athlete management firm needing compliance infrastructure</li> <li>• Strategic partner with existing sports technology relationships</li> </ul> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-terminal-gold/5"> <h4 className="text-sm font-semibold text-white mb-2">Partnership Benefits</h4> <ul className="text-xs text-gray-300 space-y-1"> <li>• Complete 129KB blueprint removes execution uncertainty</li> <li>• Pilot-to-platform strategy allows fast validation (8-week pilot → 16-week full platform)</li> <li>• RecruitAI proves immediate ROI, enables expansion to full suite</li> <li>• Partnership equity structure negotiable based on capital + agency network distribution</li> </ul> </div> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Pilot-to-Platform Strategy</h3> <p className="text-sm text-gray-300 mb-3"> <span className="font-medium text-white">Phase 1 (Pilot):</span> Start with RecruitAI + NIL Compliance ($60-80K, 8 weeks). Prove value immediately: identify prospects earlier, reduce failed bets, streamline NIL deal flow. Once agents see ROI, expand to full platform. </p> <p className="text-sm text-gray-300"> <span className="font-medium text-white">Phase 2 (Platform):</span> Add AmplifyAI and Immersive Pitch ($120-170K additional, 8 weeks). Complete Athlete Operating System enables boutique-level personalization at league-level scale. </p> </div> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Current Status</h3> <p className="text-sm text-gray-300"> In stealth mode with active customer development conversations with select agencies. Complete documentation and architecture ready for immediate execution upon partner alignment. Seeking strategic partner to co-fund development and provide agency network distribution. </p> </div> </div> </OS8Window> </div> </section> {/* Final CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Partner on Complete Athlete Platform"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-terminal-gold leading-relaxed text-center"> $60-250K budget range (pilot to full platform). 16 weeks to production-ready MVP. 129KB complete project blueprint. Active customer development with agencies in progress. Access full roadmap with technical architecture, financial projections, and partnership terms. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <ButtonPrimary href="mailto:matt@rationale.studio?subject=Amplify%20Partnership%20Inquiry" className="hover:/90 text-center">
              Discuss Partnership
            </ButtonPrimary> <Link
                  href="/ventures/project-amplify"
                  className="px-6 py-3 border-2 border-terminal-gold text-terminal-gold rounded-lg hover:bg-terminal-gold/10 transition-colors font-medium text-center"
                > View Full Project Page </Link> </div> </div> </OS8Window> </div> </section> </main> );
}

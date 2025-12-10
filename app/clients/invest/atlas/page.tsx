/**
 * Project Atlas Investment Opportunity Page - Window Shrine Design
 *
 * Partnership + Capital opportunity for CRE intelligence platform
 * Complete 12-week roadmap with 103KB technical documentation
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

export default function AtlasInvestmentPage() {
  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-7xl mx-auto"> <div className="mb-6"> <Link href="/invest" className="text-terminal-gold hover:underline text-sm"> ← Back to Investment Opportunities </Link> </div> <div className="grid lg:grid-cols-3 gap-8"> {/* Main Content */} <div className="lg:col-span-2"> <OS8Window
                title="Project Atlas: CRE Intelligence Platform"
                variant="featured"
                animateIn={false}
              > <div className="flex items-center gap-3 mb-6"> <span className="px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm font-medium"> Pre-Build · Partnership Opportunity </span> </div> <p className="text-xl text-terminal-gold font-medium mb-4"> Partnership + Capital Opportunity · 12-Week MVP </p> <p className="text-base text-gray-100 mb-8"> AI-powered intelligence layer for commercial real estate brokers. Synthesizes timing signals, relationship context, and property data to identify high-probability opportunities. Seeking strategic partner with industry distribution + execution capital. </p> {/* Key Stats */} <div className="grid grid-cols-3 gap-4 mb-6"> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">$165K</div> <div className="text-xs text-gray-300">Recommended Budget</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">12 wk</div> <div className="text-xs text-gray-300">MVP Timeline</div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-terminal-gold">103KB</div> <div className="text-xs text-gray-300">Complete Docs</div> </div> </div> <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30"> <p className="text-sm text-yellow-100"> <span className="font-bold">Documentation Complete:</span> Full technical architecture (2,634 lines), week-by-week execution plan, data requirements, ETL pipeline specs, and CEO checkpoint templates. </p> </div> </OS8Window> </div> </div> </div> </section> {/* Market Opportunity */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-4"> Market Opportunity </h2> <p className="text-base text-gray-300 mb-8"> Commercial real estate brokers spend 60-70% of their time gathering context from fragmented systems: CRM, MLS, financial feeds, public records, social media, news sources. By the time they synthesize timing signals (lease maturity, ownership changes, debt timing), the opportunity window may have closed. </p> <div className="grid md:grid-cols-2 gap-6 mb-8"> <OS8Window
              title="Problem"
              variant="body"
              animateIn={false}
            > <div className="text-lg font-bold text-white mb-3">Information Overload</div> <div className="text-sm text-gray-300"> Most CRE technology focuses on data collection, not intelligence synthesis. Brokers drown in fragmented data without actionable insights. </div> </OS8Window> <OS8Window
              title="Solution"
              variant="body"
              animateIn={false}
            > <div className="text-lg font-bold text-white mb-3">AI Synthesis Layer</div> <div className="text-sm text-gray-300"> An AI-powered intelligence layer that sits atop existing systems, identifies high-probability opportunities, and surfaces the context brokers need. </div> </OS8Window> </div> <div className="p-6 rounded-lg border-2 border-terminal-gold/30 bg-black/40"> <h3 className="text-lg font-bold text-white mb-3">Target Market</h3> <ul className="text-sm text-gray-100 space-y-2"> <li>• Mid-market CRE brokerages (50-200 brokers)</li> <li>• $15-25B annual transaction volume per firm</li> <li>• Focus on office, industrial, and multi-family sectors</li> <li>• Initial customer development with 3 firms in progress</li> </ul> </div> </div> </section> {/* Solution & Features */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Platform Features (12-Week MVP)</h2> <div className="grid md:grid-cols-2 gap-6 mb-8"> <OS8Window
              title="Daily Prioritization Dashboard"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-gray-300 mb-4"> Ranked opportunities based on timing signals: lease maturity, debt timing, ownership changes, market activity. Brokers see what deserves attention and why. </p> <div className="text-xs text-terminal-gold font-medium">Core Feature · Week 1-4</div> </OS8Window> <OS8Window
              title="Contextual Insight Views"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-gray-300 mb-4"> Relationship and asset detail views consolidating fragmented information. All context in one place—no more switching between 5 systems. </p> <div className="text-xs text-terminal-gold font-medium">Core Feature · Week 5-7</div> </OS8Window> <OS8Window
              title="AI-Assisted Outreach"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-gray-300 mb-4"> Draft guidance for communications with full human editability. AI suggests approach based on relationship history and market conditions. </p> <div className="text-xs text-terminal-gold font-medium">Core Feature · Week 8-10</div> </OS8Window> <OS8Window
              title="Review & Approval Workflow"
              variant="body"
              animateIn={false}
            > <p className="text-sm text-gray-300 mb-4"> Lightweight oversight for senior team members. Review communications before sending, with context preserved and quick edit capability. </p> <div className="text-xs text-terminal-gold font-medium">Core Feature · Week 11-12</div> </OS8Window> </div> <div className="p-6 rounded-lg border border-terminal-gold/20 bg-black/40"> <h4 className="text-base font-bold text-white mb-3">Tech Stack</h4> <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300"> <div> <p className="font-medium text-white mb-1">Data & Processing:</p> <p>PostgreSQL, Airflow, Spark, dbt, Elasticsearch</p> </div> <div> <p className="font-medium text-white mb-1">AI & Backend:</p> <p>OpenAI GPT-4, LangChain, FastAPI, Python</p> </div> </div> </div> </div> </section> {/* Budget & Timeline */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Budget & Timeline</h2> <OS8Window
            title="Budget Scenarios"
            variant="body"
            animateIn={false}
          > <div className="space-y-4 mb-8"> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Minimum Viable</span> <span className="text-lg font-bold text-terminal-gold">$92K</span> </div> <div className="text-xs text-gray-300"> Basic feature set, limited integrations, single brokerage pilot. </div> </div> <div className="p-4 rounded-lg border-2 border-terminal-gold bg-terminal-gold/5"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Recommended (Full MVP)</span> <span className="text-lg font-bold text-terminal-gold">$165K</span> </div> <div className="text-xs text-gray-300"> All 4 core features, full CRM integration, 2-3 pilot firms, production-ready infrastructure. </div> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Comprehensive</span> <span className="text-lg font-bold text-terminal-gold">$247K</span> </div> <div className="text-xs text-gray-300"> Advanced features, multi-sector support, enhanced AI capabilities, comprehensive testing. </div> </div> </div> <div className="pt-6 border-t border-terminal-gold/20"> <h4 className="text-base font-bold text-white mb-4">12-Week Timeline</h4> <div className="space-y-3 text-sm"> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[80px]">Weeks 1-4:</span> <span className="text-gray-300">Foundation & Dashboard MVP</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[80px]">Weeks 5-7:</span> <span className="text-gray-300">Contextual Views & Integration</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[80px]">Weeks 8-10:</span> <span className="text-gray-300">AI Outreach & Communication Tools</span> </div> <div className="flex gap-4"> <span className="font-semibold text-terminal-gold min-w-[80px]">Weeks 11-12:</span> <span className="text-gray-300">Workflow, Testing & Production Deploy</span> </div> </div> </div> </OS8Window> <div className="p-6 rounded-lg bg-black/40 border border-terminal-gold/20 mt-6"> <h4 className="text-base font-bold text-white mb-3">What's Documented</h4> <ul className="text-sm text-gray-300 space-y-2"> <li>• Complete technical architecture (103KB, 2,634 lines of documentation)</li> <li>• Week-by-week execution plan with checkpoints and deliverables</li> <li>• Data requirements and ETL pipeline specifications</li> <li>• User stories and workflows for 3 persona types (broker, senior broker, admin)</li> <li>• CEO checkpoint templates with go/no-go criteria at weeks 4, 8, and 12</li> </ul> </div> </div> </section> {/* Partnership Structure */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Partnership Structure</h2> <OS8Window
            title="Ideal Partnership Model"
            variant="body"
            animateIn={false}
          > <div className="space-y-6"> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Ideal Partner Profile</h3> <ul className="text-sm text-gray-300 space-y-2"> <li>• CRE brokerage with 50-200 brokers seeking competitive technology advantage</li> <li>• Industry investor with portfolio distribution across 3+ CRE firms</li> <li>• Strategic partner with existing CRM/MLS relationships</li> <li>• PropTech investor with thesis around AI-powered workflows</li> </ul> </div> <div className="p-4 rounded-lg border border-terminal-gold/20 bg-terminal-gold/5"> <h4 className="text-sm font-semibold text-white mb-2">Partnership Benefits</h4> <ul className="text-xs text-gray-300 space-y-1"> <li>• Complete technical roadmap removes execution uncertainty</li> <li>• 12-week timeline to MVP allows fast market validation</li> <li>• Active customer development in progress (3 mid-market firms)</li> <li>• Partnership equity structure negotiable based on capital + distribution contribution</li> </ul> </div> <div> <h3 className="text-lg font-semibold text-terminal-gold mb-2">Current Status</h3> <p className="text-sm text-gray-300"> In stealth mode with active customer development. Complete documentation and architecture ready for immediate execution upon partner alignment. Seeking strategic partner to co-fund development and provide industry distribution. </p> </div> </div> </OS8Window> </div> </section> {/* Final CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Partner on Complete CRE Platform"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-terminal-gold leading-relaxed text-center"> $165K recommended budget. 12 weeks to production-ready MVP. 103KB complete technical documentation. Active customer development in progress. Access full roadmap with technical architecture, financial projections, and partnership terms. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <ButtonPrimary href="mailto:matt@rationale.studio?subject=Atlas%20Partnership%20Inquiry" className="hover:/90 text-center">
              Discuss Partnership
            </ButtonPrimary> <Link
                  href="/ventures/project-atlas"
                  className="px-6 py-3 border-2 border-terminal-gold text-terminal-gold rounded-lg hover:bg-terminal-gold/10 transition-colors font-medium text-center"
                > View Full Project Page </Link> </div> </div> </OS8Window> </div> </section> </main> );
}

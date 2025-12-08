/**
 * Ventures Hub Page - Window Shrine Design
 *
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 * Showcases Zero (live), Project Atlas, Project Amplify with full investment details.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { ButtonPrimary, ButtonSecondary } from '@/components/ui';
import type { Metadata } from 'next';

export default function VenturesHubPage() {
  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 text-center animate-fade-in-up"> CONVICTION-BACKED VENTURES WE ORIGINATE AND OWN </p> <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in-up delay-100"> Portfolio IP </h1> <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto text-center mb-8 animate-fade-in-up delay-200"> IP designed to appreciate over time, not trade hours. One engine of our dual-model studio. Zero is live on App Store—1 month from concept to complete plan. Project Atlas and Project Amplify have full roadmaps. This is what conviction looks like: working software, systematic execution, IP accumulation. </p> {/* Dual-Engine Context */} <div className="max-w-4xl mx-auto mb-8"> <OS8Window
              title="Portfolio IP + Kits: How Our Dual-Engine Model Works"
              variant="body"
              animateIn={false}
            > <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-100 mb-4"> <div> <p className="mb-2"> <span className="font-bold text-[#FFD700]">Portfolio IP</span> (this page): Ventures we originate and own. Built with conviction, designed to appreciate over time. </p> </div> <div> <p className="mb-2"> <span className="font-bold text-[#FFD700]">Rationale Kits</span> <Link href="/partnerships" className="text-[#FFD700] hover:underline">(see kits)</Link>: Client engagements that fund runway, validate systems, generate market data. </p> </div> </div> <p className="text-xs text-center text-gray-300 pt-4 border-t border-[#FFD700]/20"> <span className="font-bold text-white">Result:</span> Kits fund exploration. Portfolio proves conviction. Both compound our execution capability. Systematic IP accumulation. </p> </OS8Window> </div> {/* Quick Stats */} <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4"> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center"> <div className="text-2xl font-bold text-[#FFD700]">3</div> <div className="text-xs text-gray-300">Active Ventures</div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center"> <div className="text-2xl font-bold text-[#FFD700]">1 mo</div> <div className="text-xs text-gray-300">Concept to Plan</div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center"> <div className="text-2xl font-bold text-[#FFD700]">350KB+</div> <div className="text-xs text-gray-300">Documentation</div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/60 backdrop-blur-sm text-center"> <div className="text-2xl font-bold text-[#FFD700]">7</div> <div className="text-xs text-gray-300">Working Prototypes</div> </div> </div> </div> </section> {/* Zero - Featured Venture */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <div className="text-center mb-8"> <h2 className="text-2xl sm:text-3xl font-bold mb-2">Featured Venture</h2> <p className="text-base text-gray-300">Full transparency: complete roadmap, metrics, and technical details</p> </div> <OS8Window
            title="Zero · AI Email Triage for Healthcare Providers"
            variant="featured"
            animateIn={false}
          > <div className="flex items-start gap-6 mb-6"> <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-[#FFD700]/20 flex items-center justify-center"> <span className="text-3xl"></span> </div> <div className="flex-1"> <div className="flex flex-wrap items-center gap-3 mb-3"> <span className="px-3 py-1 rounded-full bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium">Live on App Store</span> <Link
                    href="/invest/zero"
                    className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                  > Seed Round: $600K </Link> </div> <p className="text-base text-gray-100 mb-6"> Helping healthcare providers save 2-3 hours per day on email-driven documentation. From concept to complete execution plan in 1 month—97% size reduction, 67% faster builds, 7 interactive prototypes. </p> <div className="grid sm:grid-cols-4 gap-4 mb-6"> <div className="text-center"> <div className="text-2xl font-bold text-[#FFD700]">97%</div> <div className="text-xs text-gray-300">Size Reduction</div> </div> <div className="text-center"> <div className="text-2xl font-bold text-[#FFD700]">67%</div> <div className="text-xs text-gray-300">Build Speed</div> </div> <div className="text-center"> <div className="text-2xl font-bold text-[#FFD700]">7</div> <div className="text-xs text-gray-300">Prototypes</div> </div> <div className="text-center"> <div className="text-2xl font-bold text-[#FFD700]">116KB</div> <div className="text-xs text-gray-300">Roadmap Docs</div> </div> </div> <div className="flex flex-col sm:flex-row gap-4"> <ButtonPrimary href="/ventures/zero" size="md"> View Product Page → </ButtonPrimary> <ButtonSecondary href="/invest/zero" size="md"> Seed Round: $600K </ButtonSecondary> <ButtonSecondary href="/client/zero/dashboard" size="md"> Full Dashboard </ButtonSecondary> </div> </div> </div> </OS8Window> </div> </section> {/* Stealth Ventures */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto"> <div className="text-center mb-12"> <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium mb-4"> Partnership Phase Ventures </div> <h2 className="text-2xl sm:text-3xl font-bold mb-3">Two More in Active Partnership Phase</h2> <p className="text-base text-gray-300">Complete roadmaps and technical architecture. Partnership + capital opportunities available to qualified partners.</p> </div> <div className="grid md:grid-cols-2 gap-6"> {/* Project Atlas */} <OS8Window
              title="Project Atlas · CRE Intelligence Layer"
              variant="interactive"
              animateIn={false}
            > <div className="flex items-start gap-4 mb-4"> <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center"> <span className="text-2xl"></span> </div> <div className="flex-1"> <div className="flex flex-wrap items-center gap-2 mb-2"> <Link
                      href="/invest/atlas"
                      className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                    > $165K </Link> </div> </div> </div> <p className="text-sm text-gray-100 mb-4"> AI-powered synthesis layer for commercial real estate brokers. Daily prioritization, contextual insights, and outreach automation. 12-week MVP with complete technical architecture. </p> <div className="grid grid-cols-2 gap-3 mb-4 text-center"> <div> <div className="text-lg font-bold text-white">12 wk</div> <div className="text-xs text-gray-300">Timeline</div> </div> <div> <div className="text-lg font-bold text-white">103KB</div> <div className="text-xs text-gray-300">Complete Docs</div> </div> </div> <div className="flex flex-col gap-3"> <ButtonSecondary href="/ventures/project-atlas" size="sm" fullWidth> View Project Page </ButtonSecondary> <Link href="/invest/atlas" className="block w-full px-4 py-2 text-center text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> View Investment Opportunity → </Link> </div> </OS8Window> {/* Project Amplify */} <OS8Window
              title="Project Amplify · NIL + Recruiting Platform"
              variant="interactive"
              animateIn={false}
            > <div className="flex items-start gap-4 mb-4"> <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#FFD700]/10 flex items-center justify-center"> <span className="text-2xl"></span> </div> <div className="flex-1"> <div className="flex flex-wrap items-center gap-2 mb-2"> <Link
                      href="/invest/amplify"
                      className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-medium hover:bg-blue-500/30 transition-colors"
                    > $60-250K </Link> </div> </div> </div> <p className="text-sm text-gray-100 mb-4"> Four integrated modules for sports agents: RecruitAI, Immersive Pitch, NIL Compliance, and AmplifyAI content generation. Helping agents scale personal attention across 50+ athletes. </p> <div className="grid grid-cols-2 gap-3 mb-4 text-center"> <div> <div className="text-lg font-bold text-white">16 wk</div> <div className="text-xs text-gray-300">Timeline</div> </div> <div> <div className="text-lg font-bold text-white">129KB</div> <div className="text-xs text-gray-300">Complete Blueprint</div> </div> </div> <div className="flex flex-col gap-3"> <ButtonSecondary href="/ventures/project-amplify" size="sm" fullWidth> View Project Page </ButtonSecondary> <Link href="/invest/amplify" className="block w-full px-4 py-2 text-center text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"> View Investment Opportunity → </Link> </div> </OS8Window> </div> </div> </section> {/* Why We Build */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-3xl mx-auto"> <OS8Window
            title=" Why Portfolio IP: Accumulation vs Time-Trading"
            variant="body"
            animateIn={false}
          > <div className="space-y-4 text-base text-gray-100"> <p> <span className="font-bold text-white">IP appreciates. Hours don't.</span> Every Portfolio venture is designed to compound value over time. Zero is live on App Store with structured beta rollout. Project Atlas and Project Amplify have complete roadmaps ready for execution. This is systematic IP accumulation, not time-for-money trading. </p> <p> <span className="font-bold text-white">Kits fund Portfolio exploration.</span> Client engagements validate our systems and fund runway. Portfolio proves our conviction. When we take equity in your product, we're bringing the same systematic execution that built Zero in 1 month—working software, not just plans. </p> <p> <span className="font-bold text-[#FFD700]">Conviction first, IP always.</span> We're selective with equity because we know what it takes—we're doing it ourselves with Portfolio IP. Same speed, same rigor, same systematic approach for every engagement. </p> <p className="text-sm text-gray-300 italic"> 350KB+ documentation. 7 working prototypes. 1 live App Store product. This isn't proof of concept—this is proof of conviction. </p> </div> </OS8Window> </div> </section> {/* CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Invest, Partner, or Work With Us"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-[#FFD700] leading-relaxed text-center"> Review investment opportunities across different risk profiles, partner on Portfolio ventures, or work with us to build your product with the same systematic execution. Conviction first, IP always. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <ButtonPrimary href="/invest" size="lg"> View Investment Opportunities </ButtonPrimary> <ButtonSecondary href="/contact?subject=Portfolio%20Partnership" size="lg"> Discuss Partnership </ButtonSecondary> <ButtonSecondary href="/partnerships" size="lg"> View Rationale Kits </ButtonSecondary> </div> </div> </OS8Window> </div> </section> </main> );
}

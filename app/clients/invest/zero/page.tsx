/**
 * Zero Investment Opportunity Page - Window Shrine Design
 *
 * $600K Seed investment in Zero
 * AI email intelligence for busy parents - Live on App Store
 * Transformed with OS8Window components and Terminal Republic aesthetic.
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function ZeroInvestmentPage() {
  return ( <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white"> {/* Hero */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.08}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-7xl mx-auto"> <div className="mb-6"> <Link href="/invest" className="text-[#FFD700] hover:underline text-sm"> ← Back to Investment Opportunities </Link> </div> <div className="grid lg:grid-cols-3 gap-8"> {/* Main Content */} <div className="lg:col-span-2"> <OS8Window
                title="Zero: AI Email Intelligence"
                variant="featured"
                animateIn={false}
              > <div className="flex items-center gap-3 mb-6"> <span className="px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-medium"> Live Product · Beta Testing </span> </div> <p className="text-xl text-[#FFD700] font-medium mb-4"> $600K Seed Round · Live on App Store </p> <p className="text-base text-gray-100 mb-8"> AI-powered email triage for busy parents turning inbox chaos into actionable clarity. Live product with active beta rollout. Product-market fit phase with structured traction milestones. </p> {/* Key Stats */} <div className="grid grid-cols-3 gap-4 mb-6"> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-[#FFD700]">$600K</div> <div className="text-xs text-gray-300">Seed Target</div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-[#FFD700]">$12B+</div> <div className="text-xs text-gray-300">TAM</div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40 text-center"> <div className="text-2xl font-bold text-[#FFD700]">6:1</div> <div className="text-xs text-gray-300">LTV:CAC</div> </div> </div> <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-500/30"> <p className="text-sm text-blue-100"> <span className="font-bold">Live Traction:</span> Beta testing in progress with Week 8 go/no-go milestone approaching (75+ users, retention validation). </p> </div> </OS8Window> </div> </div> </div> </section> {/* Market Opportunity */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-4"> Market Opportunity </h2> <p className="text-base text-gray-300 mb-8"> Busy parents face information overload from school systems, extracurriculars, medical providers, and daily logistics. Zero uses AI to triage, categorize, and surface what matters most. </p> <div className="grid md:grid-cols-3 gap-6 mb-8"> <OS8Window
              title="TAM"
              variant="body"
              animateIn={false}
            > <div className="text-4xl font-bold text-[#FFD700] mb-3">$12B+</div> <div className="text-sm text-white mb-2">Productivity Software</div> <div className="text-xs text-gray-300"> Email clients, productivity tools, AI assistants for busy professionals and parents </div> </OS8Window> <OS8Window
              title="SAM"
              variant="body"
              animateIn={false}
            > <div className="text-4xl font-bold text-[#FFD700] mb-3">$4.2B</div> <div className="text-sm text-white mb-2">Parent Tech Market</div> <div className="text-xs text-gray-300"> AI-powered tools specifically for parent workflows and family management </div> </OS8Window> <OS8Window
              title="SOM"
              variant="body"
              animateIn={false}
            > <div className="text-4xl font-bold text-[#FFD700] mb-3">$840M</div> <div className="text-sm text-white mb-2">3-Year Target</div> <div className="text-xs text-gray-300"> Early adopter parents (ages 30-45) in US with 2+ children </div> </OS8Window> </div> <div className="p-6 rounded-lg border-2 border-[#FFD700]/30 bg-black/40"> <h3 className="text-lg font-bold text-white mb-3">Why Now?</h3> <ul className="text-sm text-gray-100 space-y-2"> <li>• AI capabilities (GPT-4) make reliable email triage possible for first time</li> <li>• Parent information overload accelerated post-2020 (remote school, digital-first workflows)</li> <li>• Productivity software market growing 14% CAGR</li> <li>• Parents willing to pay for time-saving tools ($5-15/month validated willingness)</li> </ul> </div> </div> </section> {/* Business Model */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.darkGalaxy}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Business Model & Unit Economics</h2> <OS8Window
            title="Revenue Streams"
            variant="body"
            animateIn={false}
          > <div className="space-y-4 mb-8"> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Parent Tier</span> <span className="text-lg font-bold text-[#FFD700]">$9.99/mo</span> </div> <div className="text-xs text-gray-300"> Core email triage + family calendar integration. Target: busy parents with 2+ kids. </div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Professional Tier</span> <span className="text-lg font-bold text-[#FFD700]">$14.99/mo</span> </div> <div className="text-xs text-gray-300"> Advanced features + work email accounts. Target: working parents managing dual contexts. </div> </div> <div className="p-4 rounded-lg border border-[#FFD700]/20 bg-black/40"> <div className="flex justify-between items-center mb-2"> <span className="text-sm font-semibold text-white">Power Features (Add-ons)</span> <span className="text-lg font-bold text-[#FFD700]">$2-5/mo</span> </div> <div className="text-xs text-gray-300"> Premium AI models, additional accounts, family sharing. ARPU uplift potential. </div> </div> </div> <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-[#FFD700]/20"> <div className="text-center"> <div className="text-3xl font-bold text-[#FFD700] mb-2">$720</div> <div className="text-sm font-medium text-white mb-1">Lifetime Value</div> <div className="text-xs text-gray-300">$10/mo × 6 years × 80% retention</div> </div> <div className="text-center"> <div className="text-3xl font-bold text-[#FFD700] mb-2">$120</div> <div className="text-sm font-medium text-white mb-1">CAC (Blended)</div> <div className="text-xs text-gray-300">Organic + paid acquisition</div> </div> <div className="text-center"> <div className="text-3xl font-bold text-green-400 mb-2">6:1</div> <div className="text-sm font-medium text-white mb-1">LTV:CAC Ratio</div> <div className="text-xs text-green-400">Excellent economics</div> </div> </div> </OS8Window> <div className="grid md:grid-cols-2 gap-4 mt-6"> <div className="p-4 rounded-lg bg-black/40 border border-[#FFD700]/20"> <div className="text-sm font-semibold text-white mb-1">Gross Margin</div> <div className="text-2xl font-bold text-[#FFD700]">85%</div> </div> <div className="p-4 rounded-lg bg-black/40 border border-[#FFD700]/20"> <div className="text-sm font-semibold text-white mb-1">Payback Period</div> <div className="text-2xl font-bold text-[#FFD700]">8-12 months</div> </div> </div> </div> </section> {/* Traction & Milestones */} <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={watercolorThemes.terminalSubtle}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-4xl mx-auto"> <h2 className="text-3xl sm:text-4xl font-bold mb-8">Traction & Milestones</h2> <div className="grid md:grid-cols-3 gap-6 mb-8"> <OS8Window
              title="Current Status"
              variant="body"
              animateIn={false}
            > <div className="text-center"> <div className="text-3xl font-bold text-[#FFD700] mb-2">25+</div> <div className="text-sm font-medium text-white mb-2">Beta Users</div> <div className="text-xs text-gray-300">Live on App Store</div> </div> </OS8Window> <OS8Window
              title="Week 8 Target"
              variant="featured"
              animateIn={false}
              className="border-2 border-blue-500/30"
            > <div className="text-center"> <div className="text-3xl font-bold text-blue-400 mb-2">75+</div> <div className="text-sm font-medium text-white mb-2">Users</div> <div className="text-xs text-blue-400">Go/No-Go Decision</div> </div> </OS8Window> <OS8Window
              title="Week 24 Target"
              variant="body"
              animateIn={false}
            > <div className="text-center"> <div className="text-3xl font-bold text-[#FFD700] mb-2">1,000+</div> <div className="text-sm font-medium text-white mb-2">Users</div> <div className="text-xs text-gray-300">Public Launch</div> </div> </OS8Window> </div> <OS8Window
            title="18-Month Roadmap"
            variant="body"
            animateIn={false}
          > <div className="space-y-4"> <div className="p-4 rounded-lg bg-black/40 border border-[#FFD700]/20"> <div className="text-sm font-semibold text-white mb-2">Months 0-6: Product-Market Fit</div> <div className="text-xs text-gray-300"> Beta cohorts, retention validation, feature iteration based on user feedback </div> </div> <div className="p-4 rounded-lg bg-black/40 border border-[#FFD700]/20"> <div className="text-sm font-semibold text-white mb-2">Months 6-12: Growth Engine</div> <div className="text-xs text-gray-300"> Paid acquisition scaling, content marketing, parent community building </div> </div> <div className="p-4 rounded-lg bg-black/40 border border-[#FFD700]/20"> <div className="text-sm font-semibold text-white mb-2">Months 12-18: Scale & Series A Prep</div> <div className="text-xs text-gray-300"> 1,000+ users, proven retention (60%+ at 6mo), Series A metrics achieved </div> </div> </div> </OS8Window> </div> </section> {/* Final CTA */} <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"> <div className="absolute inset-0 pointer-events-none"> <ASCIIUnifiedGrid
            opacity={0.12}
            animated={true}
            colorTheme={watercolorThemes.terminalGold}
            charSet="default"
          /> </div> <div className="relative z-10 max-w-5xl mx-auto flex justify-center"> <OS8Window
            title="Invest in Live Product Traction"
            variant="cta"
            animateIn={false}
            className="max-w-3xl"
          > <div className="space-y-6"> <p className="text-base text-[#FFD700] leading-relaxed text-center"> $600K seed round. Live on App Store. Structured beta rollout. Product-market fit validation in progress. Access full seed deck with financials, competitive analysis, and detailed milestones. </p> <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4"> <a
                  href="mailto:matt@rationale.studio?subject=Zero%20Investment%20Inquiry"
                  className="px-6 py-3 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFD700]/90 transition-colors font-medium text-center"
                > Schedule Discussion </a> <Link
                  href="/ventures/zero"
                  className="px-6 py-3 border-2 border-[#FFD700] text-[#FFD700] rounded-lg hover:bg-[#FFD700]/10 transition-colors font-medium text-center"
                > View Zero Product Page </Link> </div> </div> </OS8Window> </div> </section> </main> );
}

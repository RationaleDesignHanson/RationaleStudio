/**
 * Heirloom Investment Pitch Presentation
 *
 * Web-readable pitch deck styled with Heirloom's warm, vintage aesthetic.
 * For pre-seed investors, strategic partners, and App Store feature consideration.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Mail, Rocket, TrendingUp } from 'lucide-react';

// Import diagram components
import UserJourneyDiagram from '@/components/heirloom/diagrams/UserJourneyDiagram';
import ProblemRadialDiagram from '@/components/heirloom/diagrams/ProblemRadialDiagram';
import TechnicalArchitectureDiagram from '@/components/heirloom/diagrams/TechnicalArchitectureDiagram';
import TimelineVisualization from '@/components/heirloom/diagrams/TimelineVisualization';
import IOSFlowDiagram from '@/components/heirloom/diagrams/IOSFlowDiagram';

export default function HeirloomPitchPage() {
  return (
    <main className="min-h-screen bg-[#FBF8F3]">

      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460] py-24 md:py-32 border-b-2 border-[#E85D4D]/20">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-[#2D2D2D] mb-4">
                Heirloom
              </h1>
              <p className="text-2xl sm:text-3xl md:text-2xl md:text-3xl lg:text-4xl font-medium text-[#E85D4D]">
                Product Overview
              </p>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl text-[#2D2D2D] mb-8 leading-relaxed">
              Where family recipes live—styled, shared, and passed down exactly as you made them.
            </p>

            {/* Problem Statement */}
            <div className="max-w-3xl mx-auto mb-10 p-6 bg-white/50 rounded-2xl border-2 border-[#E85D4D]/20">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                <span className="text-[#E85D4D] font-bold text-2xl">67%</span> of family recipes are lost within one generation.
                Grandma's lasagna on a fading index card. That perfect NYT cookie bookmarked... somewhere.
                The substitution tip that saved Thanksgiving buried in comment #247.
              </p>
              <p className="text-xl sm:text-2xl text-[#2D2D2D] font-medium italic">
                Recipes aren't just instructions. They're heirlooms.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="https://testflight.apple.com/join/heirloom"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E85D4D] px-4 sm:px-6 md:px-8 py-4 font-semibold text-white transition-all hover:bg-[#D14D3D] hover:shadow-lg"
              >
                <Rocket className="w-5 h-5" />
                Join Beta on TestFlight
              </a>
              <Link
                href="/work/heirloom"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#E85D4D] px-4 sm:px-6 md:px-8 py-4 font-semibold text-[#E85D4D] transition-all hover:bg-[#E85D4D] hover:text-white"
              >
                View Case Study
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle Pattern Background */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div className="h-full w-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#2D2D2D_10px,#2D2D2D_11px)]"></div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-white border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4">
                The Problem: Recipe Fragmentation
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                The best recipes live in the worst places. Users lose 6-12 hours per month juggling apps, bookmarks, and screenshots.
              </p>
            </div>

            {/* Problem Diagram */}
            <div className="mb-8">
              <ProblemRadialDiagram />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-[#FBF8F3] border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4">
                The Solution: Three Core Capabilities
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Native iOS app combining smart recipe capture with personal expression.
              </p>
            </div>

            {/* Three Columns */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {/* Capture */}
              <div className="p-6 bg-white rounded-2xl border-2 border-[#F4A460]/30 hover:border-[#E85D4D]/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#F4A460]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">📎</span>
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">1. Capture from Anywhere</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Paste any URL</strong> → AI strips the life story</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Photograph cookbook pages</strong> → Vision OCR extracts text</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Add family recipes</strong> → Stories preserved</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>High import success rate</strong> → JSON-LD + LLM fallback handles edge cases</span>
                  </li>
                </ul>
              </div>

              {/* Personalize */}
              <div className="p-6 bg-white rounded-2xl border-2 border-[#F4A460]/30 hover:border-[#E85D4D]/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#F4A460]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">2. Personalize Your Cards</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Style with stickers, annotations</strong> (60+ library)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Choose fonts</strong> → Handwritten for family</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Love marks</strong> → Coffee stains, evidence of use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Your personality travels</strong> → Full visual preservation</span>
                  </li>
                </ul>
              </div>

              {/* Share */}
              <div className="p-6 bg-white rounded-2xl border-2 border-[#F4A460]/30 hover:border-[#E85D4D]/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-full bg-[#F4A460]/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">💌</span>
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">3. Share with Soul Intact</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Send styled cards</strong> → They see YOUR card</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Attribution preserved</strong> → "Shared by Mom, Dec 2024"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Dinner party collections</strong> → Collaborate on menus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D] mt-1">•</span>
                    <span><strong>Only app where styling survives sharing</strong></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SECRET WEAPON - iOS Reminders */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-white border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <IOSFlowDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 5: USER JOURNEY */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-[#FBF8F3] border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <UserJourneyDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 6: TECHNICAL ARCHITECTURE */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-white border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <TechnicalArchitectureDiagram />
          </div>
        </div>
      </section>

      {/* SECTION 7: TIMELINE & VELOCITY */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-[#FBF8F3] border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <TimelineVisualization />
          </div>
        </div>
      </section>

      {/* SECTION 8: MARKET & COMPETITION */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-white border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4">
                Market: Large, Validated, Growing
              </h2>
            </div>

            {/* Market Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="p-8 bg-gradient-to-br from-[#E85D4D]/10 to-[#F4A460]/10 rounded-2xl border-2 border-[#E85D4D]/30 text-center hover:shadow-lg transition-all">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D] mb-2">$2.1B</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Total Addressable Market</div>
                <p className="text-xs text-gray-500">Global recipe app market, growing 8.3% annually</p>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#E85D4D]/10 to-[#F4A460]/10 rounded-2xl border-2 border-[#E85D4D]/30 text-center hover:shadow-lg transition-all">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D] mb-2">$450M</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">Serviceable Market</div>
                <p className="text-xs text-gray-500">Premium iOS recipe apps (US + EU)</p>
              </div>

              <div className="p-8 bg-gradient-to-br from-[#E85D4D]/10 to-[#F4A460]/10 rounded-2xl border-2 border-[#E85D4D]/30 text-center hover:shadow-lg transition-all">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#E85D4D] mb-2">$15-45M</div>
                <div className="text-sm text-gray-600 uppercase tracking-wide font-semibold mb-2">3-Year Capture</div>
                <p className="text-xs text-gray-500">Realistic obtainable market with strong execution</p>
              </div>
            </div>

            {/* Competition Table */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6 text-center">
                Competition: We Fill The Gap
              </h3>

              <div className="overflow-x-auto bg-white rounded-2xl border-2 border-[#E85D4D]/20 p-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#E85D4D]/20">
                      <th className="text-left py-3 px-4 text-[#2D2D2D] font-bold">App</th>
                      <th className="text-left py-3 px-4 text-[#2D2D2D] font-bold">Price</th>
                      <th className="text-left py-3 px-4 text-[#2D2D2D] font-bold">Strengths</th>
                      <th className="text-left py-3 px-4 text-[#2D2D2D] font-bold">Weaknesses</th>
                      <th className="text-left py-3 px-4 text-[#E85D4D] font-bold">Our Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-[#2D2D2D] font-bold">Paprika</td>
                      <td className="py-3 px-4 text-gray-600">$4.99</td>
                      <td className="py-3 px-4 text-gray-600">Best parsing, mature</td>
                      <td className="py-3 px-4 text-gray-500">No Reminders, no sharing, dated UI</td>
                      <td className="py-3 px-4 text-[#E85D4D] font-medium">Reminders + personalization + sharing</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-[#2D2D2D] font-bold">AnyList</td>
                      <td className="py-3 px-4 text-gray-600">$9.99/yr</td>
                      <td className="py-3 px-4 text-gray-600">Shared lists</td>
                      <td className="py-3 px-4 text-gray-500">Subscription fatigue, weak parsing</td>
                      <td className="py-3 px-4 text-[#E85D4D] font-medium">One-time price, better parsing</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-[#2D2D2D] font-bold">Mela</td>
                      <td className="py-3 px-4 text-gray-600">$4.99</td>
                      <td className="py-3 px-4 text-gray-600">Beautiful design</td>
                      <td className="py-3 px-4 text-gray-500">Limited features, no social</td>
                      <td className="py-3 px-4 text-[#E85D4D] font-medium">Full feature set + social</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4 text-[#2D2D2D] font-bold">Samsung Food</td>
                      <td className="py-3 px-4 text-gray-600">Free</td>
                      <td className="py-3 px-4 text-gray-600">AI features, large DB</td>
                      <td className="py-3 px-4 text-gray-500">Android-first, ads, corporate feel</td>
                      <td className="py-3 px-4 text-[#E85D4D] font-medium">iOS-native, personal, ad-free</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Unique Differentiators */}
            <div className="p-8 bg-gradient-to-br from-[#E85D4D]/10 to-[#F4A460]/10 rounded-2xl border-2 border-[#E85D4D]/30">
              <h4 className="text-lg font-bold text-[#E85D4D] mb-4">Only Heirloom Offers:</h4>
              <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] font-bold mt-1">1.</span>
                  <span>iOS Reminders with Grocery auto-categorization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] font-bold mt-1">2.</span>
                  <span>Personalized, stylable recipe cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] font-bold mt-1">3.</span>
                  <span>Cards retain styling when shared (not just data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] font-bold mt-1">4.</span>
                  <span>Cookbook photo → proper attribution flow</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E85D4D] font-bold mt-1">5.</span>
                  <span>Dinner party collaboration (Phase 3)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: BUSINESS MODEL */}
      <section className="py-16 md:py-12 md:py-16 lg:py-20 bg-[#FBF8F3] border-b-2 border-[#E85D4D]/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-4">
                Business Model: Proven, Simple, Profitable
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Freemium + one-time purchase. Same model Paprika has used successfully for 10+ years.
              </p>
            </div>

            {/* Pricing Tiers */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
              {/* Free Tier */}
              <div className="p-8 bg-white rounded-2xl border-2 border-gray-300 hover:border-[#E85D4D]/50 transition-all">
                <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Free Tier</h3>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Import up to 50 recipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Basic shopping list (single recipe)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Manual entry unlimited</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Standard card style</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Share recipes (data only)</span>
                  </li>
                </ul>
              </div>

              {/* Premium Tier */}
              <div className="p-8 bg-gradient-to-br from-[#E85D4D]/20 to-[#F4A460]/20 rounded-2xl border-2 border-[#E85D4D] shadow-lg">
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className="text-2xl font-bold text-[#2D2D2D]">Heirloom Premium</h3>
                  <span className="text-3xl font-bold text-[#E85D4D]">$4.99</span>
                  <span className="text-sm text-gray-600">one-time</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>Unlimited recipes</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>Smart shopping aggregation</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>iOS Reminders export</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>Full card customization</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>Styled card sharing</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>Cookbook photo capture</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>AI substitution suggestions</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span><strong>All future features included</strong></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Unit Economics */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
              <div className="p-6 bg-white rounded-2xl border-2 border-[#E85D4D]/20">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-4">Unit Economics</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium price</span>
                    <span className="text-[#2D2D2D] font-bold">$4.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Apple cut (15%)</span>
                    <span className="text-gray-500">-$0.75</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Server costs/year</span>
                    <span className="text-gray-500">-$0.30</span>
                  </div>
                  <div className="pt-3 border-t-2 border-[#E85D4D]/20 flex justify-between">
                    <span className="text-[#2D2D2D] font-bold">Net profit per user</span>
                    <span className="text-[#E85D4D] font-bold text-lg">$3.94 (79%)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white rounded-2xl border-2 border-[#E85D4D]/20">
                <h4 className="text-lg font-bold text-[#2D2D2D] mb-4">Year 1 Revenue Projections</h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Conservative</span>
                      <span className="text-[#2D2D2D] font-bold">$25K</span>
                    </div>
                    <p className="text-xs text-gray-500">50K downloads, 10% conversion</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Moderate</span>
                      <span className="text-[#2D2D2D] font-bold">$60K</span>
                    </div>
                    <p className="text-xs text-gray-500">100K downloads, 12% conversion</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#E85D4D] font-bold">Optimistic</span>
                      <span className="text-[#E85D4D] font-bold text-lg">$150K</span>
                    </div>
                    <p className="text-xs text-gray-500">200K downloads, 15% conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: THE ASK & CALL TO ACTION */}
      <section id="ask" className="py-12 md:py-16 lg:py-20 md:py-32 bg-gradient-to-br from-[#FBF8F3] via-[#FBF8F3] to-[#F4A460]">
        <div className="container mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-5xl mx-auto">
            {/* Emotional Close */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D2D2D] mb-6">
                Every Family Has Recipes Worth Saving
              </h2>
              <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-4">
                Grandma's chicken soup. Dad's chili. That cookie recipe you finally perfected.
                These recipes carry memories, stories, identity.
              </p>
              <p className="text-2xl sm:text-3xl text-[#E85D4D] font-bold italic">
                Heirloom makes sure they're never lost.
              </p>
            </div>

            {/* The Ask - Two Options */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12">
              {/* Bootstrap Option */}
              <div className="p-8 bg-white rounded-2xl border-2 border-gray-300 hover:border-[#E85D4D]/50 transition-all hover:shadow-lg">
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-4">Option A: Bootstrap</h3>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#2D2D2D] mb-2">$0</div>
                  <p className="text-sm text-gray-600">No investment required</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>$2,300 initial + $50/month operations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Public launch in 8 weeks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Break-even at ~200 premium sales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>Sustainable indie product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#8B9F8D]">•</span>
                    <span>No dilution</span>
                  </li>
                </ul>
              </div>

              {/* Raise Option */}
              <div className="p-8 bg-gradient-to-br from-[#E85D4D]/20 to-[#F4A460]/20 rounded-2xl border-2 border-[#E85D4D] shadow-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Rocket className="w-6 h-6 text-[#E85D4D]" />
                  <h3 className="text-xl font-bold text-[#2D2D2D]">Option B: Pre-Seed Raise</h3>
                </div>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-[#E85D4D] mb-2">$150K</div>
                  <p className="text-sm text-gray-600">at $1.5M valuation (10% equity)</p>
                </div>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span>Accelerated timeline: Launch Month 2</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span>Featured by Apple: Month 3 target</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span>200K downloads by Month 6</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span>$150K revenue Year 1</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#E85D4D]">✓</span>
                    <span>Series A ready or profitable indie by Month 18</span>
                  </li>
                </ul>

                {/* Return Scenarios */}
                <div className="mt-6 pt-6 border-t-2 border-[#E85D4D]/30">
                  <h4 className="text-sm font-bold text-[#E85D4D] mb-3">18-Month Return Scenarios</h4>
                  <div className="space-y-2 text-xs text-gray-700">
                    <div className="flex justify-between">
                      <span>Conservative (60%)</span>
                      <span className="font-bold text-[#2D2D2D]">3.3x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Moderate (30%)</span>
                      <span className="font-bold text-[#2D2D2D]">8x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Optimistic (10%)</span>
                      <span className="font-bold text-[#E85D4D]">16x+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* Why Now Badge */}
            <div className="mt-12 p-6 bg-white rounded-2xl border-2 border-[#E85D4D]/30">
              <h4 className="text-lg font-bold text-[#E85D4D] mb-4 text-center flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Why Now: Technical & Cultural Convergence
              </h4>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                <div>
                  <h5 className="font-bold text-[#2D2D2D] mb-2">Technical Tailwinds</h5>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>iOS 17 Reminders (Sept 2023) with Grocery type</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>Vision Framework on-device OCR</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>LLM costs collapsed 90% (GPT-4o $2.50/1M tokens)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>SwiftData eliminates CoreData complexity</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-[#2D2D2D] mb-2">Cultural Momentum</h5>
                  <ul className="space-y-1 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>73% cook more post-COVID (sustained)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>Nostalgia for analog (cottagecore 200M+ TikTok views)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>Subscription fatigue favors one-time pricing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#8B9F8D]">•</span>
                      <span>AI as feature, not product (smart tools win)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center bg-white border-t-2 border-[#E85D4D]/20">
        <p className="text-sm text-gray-600">
          Heirloom Investment Pitch • Version 1.0 • December 2024
        </p>
        <p className="text-xs text-gray-500 mt-2">
          <Link href="/work/heirloom" className="hover:text-[#E85D4D] transition">
            View Full Case Study
          </Link>
          {' • '}
          <Link href="/contact" className="hover:text-[#E85D4D] transition">
            Contact Rationale Studios
          </Link>
        </p>
      </div>
    </main>
  );
}

/**
 * Sanitary Waste System - Comprehensive Overview
 *
 * Full-page overview for investors and partners showcasing the
 * absorbent-lined pet waste sanitary system.
 *
 * Format inspired by Zero/Athletes First with rich content sections.
 */

'use client';

import Link from 'next/link';
import { ArrowRight, ExternalLink, Package, TrendingUp, Target, DollarSign, Sparkles } from 'lucide-react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';

export default function SanitaryWasteSystemOverview() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#2D2D2D]">

      {/* SECTION 1: HERO */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <ASCIIUnifiedGrid
            opacity={0.06}
            animated={true}
            colorTheme={{
              name: 'Heirloom Warm',
              colors: ['#E85D42', '#F4A261', '#2A9D8F'],
              primary: '#E85D42',
              description: 'Warm terracotta tones'
            }}
            charSet="shapes"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-[#E85D42]/10 border-2 border-[#E85D42]/30 rounded-full">
              <span className="text-sm font-bold text-[#E85D42] uppercase tracking-wider">IP Development Project</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#2D2D2D] leading-tight mb-6">
              A New Category in Pet Care: <span className="text-[#2A9D8F]">Sanitary Waste Systems</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#2D2D2D] font-medium mb-6">
              Not "poop bags"—this is a premium hygiene system
            </p>
            <p className="text-lg sm:text-xl text-[#2D2D2D]/70 max-w-3xl mx-auto leading-relaxed">
              Absorbent-lined bags + pop-up dispensing + proprietary ecosystem. Raising pre-seed to validate retail pull and scale manufacturing.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/clients/work/sanitary-waste-system/full-overview"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#E85D42] hover:bg-[#D84A32] text-white rounded-xl font-bold transition-all shadow-lg"
            >
              <Package className="w-5 h-5" />
              View Full Pitch Deck
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#2D2D2D]/20 hover:border-[#E85D42] text-[#2D2D2D] rounded-xl font-bold transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              Contact for Investment
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              The Disgust Problem
            </h2>
            <p className="text-lg text-[#2D2D2D]/70 max-w-3xl mx-auto mb-6">
              Every dog owner knows this feeling: the visceral, unpleasant sensation of warmth and texture transmitted through thin plastic film. Standard bags solve containment—but not the sensory experience.
            </p>
          </div>

          {/* Problem Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Current Experience */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6">Current Experience</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#D84A32] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] mb-1">Heat Transfer</p>
                    <p className="text-sm text-[#2D2D2D]/70">13-20 micron film = immediate warmth transmission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#D84A32] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] mb-1">Moisture Pressure</p>
                    <p className="text-sm text-[#2D2D2D]/70">Loose stool creates smear risk and disgust</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#D84A32] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] mb-1">Odor Anxiety</p>
                    <p className="text-sm text-[#2D2D2D]/70">Gas-permeable film = carry-time embarrassment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#D84A32] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D] mb-1">Avoidance Behavior</p>
                    <p className="text-sm text-[#2D2D2D]/70">People dread walks, double-bag, avoid pickup situations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Signal */}
            <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#2D2D2D] mb-6">The Market Signal</h3>
              <div className="space-y-6">
                <div className="text-center p-6 bg-white rounded-xl border-2 border-[#2A9D8F]/20">
                  <div className="text-4xl font-bold text-[#2A9D8F] mb-2">90M</div>
                  <div className="text-sm text-[#2D2D2D]/70">US dog owners face this daily</div>
                </div>
                <div className="text-center p-6 bg-white rounded-xl border-2 border-[#2A9D8F]/20">
                  <div className="text-4xl font-bold text-[#2A9D8F] mb-2">72%</div>
                  <div className="text-sm text-[#2D2D2D]/70">Won't reduce pet spending regardless of economy</div>
                </div>
                <p className="text-sm text-[#2D2D2D]/80 italic">
                  People already hack around it: double-bagging, leaves/grass lining. This isn't convenience—it's disgust sensitivity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SOLUTION */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              The Solution: Hybrid Material Architecture
            </h2>
            <p className="text-lg text-[#2D2D2D]/70 max-w-3xl mx-auto">
              Before: "I can feel it. I hate this." → After: "It feels insulated, drier, less gross."
            </p>
          </div>

          {/* Material Innovation */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#E85D42]/10 border-2 border-[#E85D42]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Inner Liner</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• Airlaid non-woven (600-1000 microns)</li>
                <li>• Wet-strong, absorbent</li>
                <li>• 40-60x thicker than standard film</li>
                <li>• Eliminates heat transmission</li>
              </ul>
            </div>

            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#2A9D8F]/10 border-2 border-[#2A9D8F]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Outer Shell</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• PBAT/PLA compostable film</li>
                <li>• Or recycled LDPE (cost-optimized)</li>
                <li>• Flexible, durable barrier</li>
                <li>• Supports eco-positioning</li>
              </ul>
            </div>

            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6">
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#F4A261]/10 border-2 border-[#F4A261]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Interfolded Format</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• V-fold or Z-fold flat pack</li>
                <li>• Pop-up dispensing UX</li>
                <li>• Proven in tissues/wipes</li>
                <li>• Eliminates roll geometry issues</li>
              </ul>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-[#E85D42]/5 border-2 border-[#E85D42]/30 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-[#E85D42] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-3">Why This Changes Everything</h3>
                <p className="text-base text-[#2D2D2D]/80 leading-relaxed">
                  Same pickup behavior (invert + tie), vastly better experience. Zero learning curve. The airlaid liner is 600-1000 microns thick—40-60x thicker than standard film—creating genuine thermal insulation and rapid moisture uptake. This is diaper technology applied to pet waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE SYSTEM */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              The Three-SKU Ecosystem
            </h2>
            <p className="text-lg text-[#2D2D2D]/70 max-w-3xl mx-auto">
              Razor + blade economics: dispenser creates lock-in, refills drive recurring margin
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* SKU 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#E85D42] transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#2A9D8F]/10 border-2 border-[#2A9D8F]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Starter Kit</h3>
                <div className="text-3xl font-bold text-[#2A9D8F] mb-2">$24.99</div>
                <div className="text-sm text-[#2D2D2D]/60">Dispenser + 2 refills (120 bags)</div>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• Customer acquisition</li>
                <li>• Priced near CAC breakeven</li>
                <li>• Gets dispenser into hands</li>
                <li>• Creates ecosystem lock-in</li>
              </ul>
            </div>

            {/* SKU 2 */}
            <div className="bg-white border-2 border-[#E85D42] rounded-2xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#E85D42]/10 border-2 border-[#E85D42]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Refill Packs</h3>
                <div className="text-3xl font-bold text-[#E85D42] mb-2">$15-18</div>
                <div className="text-sm text-[#2D2D2D]/60">60-count box (1-month supply)</div>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• <strong>Recurring margin engine</strong></li>
                <li>• 44% gross margin</li>
                <li>• Subscription + retail</li>
                <li>• 60-day replenishment cycle</li>
              </ul>
            </div>

            {/* SKU 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-[#E85D42] transition-all">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-[#F4A261]/10 border-2 border-[#F4A261]/30 mb-4">
                </div>
                <h3 className="text-xl font-bold text-[#2D2D2D] mb-2">Accessories</h3>
                <div className="text-3xl font-bold text-[#F4A261] mb-2">$8-15</div>
                <div className="text-sm text-[#2D2D2D]/60">Leash clips, mini pouches, travel kits</div>
              </div>
              <ul className="space-y-2 text-sm text-[#2D2D2D]/80">
                <li>• Margin expansion</li>
                <li>• Ecosystem reinforcement</li>
                <li>• Gifting opportunities</li>
                <li>• Brand touchpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: UNIT ECONOMICS */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              Unit Economics: Healthy Margins at Super-Premium Positioning
            </h2>
          </div>

          {/* Economic Metrics */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#2A9D8F] mb-2">$0.053-0.076</div>
              <div className="text-sm text-[#2D2D2D]/70 mb-4">COGS per bag</div>
              <div className="text-xs text-[#2D2D2D]/60">Film + liner + adhesive + conversion</div>
            </div>
            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#E85D42] mb-2">$0.25-0.30</div>
              <div className="text-sm text-[#2D2D2D]/70 mb-4">Retail per bag</div>
              <div className="text-xs text-[#2D2D2D]/60">Super-premium positioning</div>
            </div>
            <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#F4A261] mb-2">~$0.125</div>
              <div className="text-sm text-[#2D2D2D]/70 mb-4">Wholesale price</div>
              <div className="text-xs text-[#2D2D2D]/60">50% retail margin for partners</div>
            </div>
            <div className="bg-[#2A9D8F]/10 border-2 border-[#2A9D8F] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#2A9D8F] mb-2">44%</div>
              <div className="text-sm text-[#2D2D2D]/70 mb-4">Gross margin</div>
              <div className="text-xs text-[#2D2D2D]/60">Room for marketing + retail distribution</div>
            </div>
          </div>

          {/* BOM Breakdown */}
          <div className="bg-[#F5F1E8] border-2 border-gray-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#2D2D2D] mb-6 text-center">Bill of Materials (per 1,000 bags)</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2D2D2D]/70">Outer bag film (PBAT 18µ):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$18-25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2D2D2D]/70">Inner liner (Airlaid 60gsm):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$15-20</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2D2D2D]/70">Adhesive (bio-based):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$2-4</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2D2D2D]/70">Primary packaging (pocket pack):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$8-12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[#2D2D2D]/70">Manufacturing conversion:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$10-15</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t-2 border-[#2D2D2D]/20">
                  <span className="text-sm font-bold text-[#2D2D2D]">Total COGS:</span>
                  <span className="text-lg font-bold text-[#2A9D8F]">$53-76</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: GO-TO-MARKET */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              Market Wedge: High-End Pet Stores + Urban Premium Owners
            </h2>
            <p className="text-lg text-[#2D2D2D]/70 max-w-3xl mx-auto">
              We don't need mass retail yet. 50 boutiques proving repeat purchase is more valuable than 500 PetSmarts with no pull-through.
            </p>
          </div>

          {/* Retail Beta Strategy */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-6">Retail Beta Playbook</h3>
              <ul className="space-y-4 text-sm text-[#2D2D2D]/80">
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#E85D42] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D]">25-50 flagship boutiques</p>
                    <p className="text-xs text-[#2D2D2D]/60">Design-forward, urban, premium positioning</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#E85D42] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D]">In-store demo window + tactile sample</p>
                    <p className="text-xs text-[#2D2D2D]/60">Physical product demo is the killer</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#E85D42] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D]">Staff script + "why it's different" card</p>
                    <p className="text-xs text-[#2D2D2D]/60">Staff recommendation is 3x conversion multiplier</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-[#E85D42] flex-shrink-0 mt-2"></div>
                  <div>
                    <p className="font-bold text-[#2D2D2D]">Subscription QR inside packaging</p>
                    <p className="text-xs text-[#2D2D2D]/60">Convert retail to DTC recurring revenue</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F]/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-[#2D2D2D] mb-6">Success Metrics (Seed Triggers)</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-xl border-2 border-[#2A9D8F]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#2D2D2D]">Refill Repeat Rate</span>
                    <span className="text-2xl font-bold text-[#2A9D8F]">&gt;40%</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/60">Within 60 days (proves retention)</p>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-[#2A9D8F]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#2D2D2D]">Dispenser Attach Rate</span>
                    <span className="text-2xl font-bold text-[#2A9D8F]">&gt;60%</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/60">Of bag buyers (proves ecosystem)</p>
                </div>
                <div className="p-4 bg-white rounded-xl border-2 border-[#2A9D8F]/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-[#2D2D2D]">Review Keywords</span>
                    <span className="text-2xl font-bold text-[#2A9D8F]">&gt;30%</span>
                  </div>
                  <p className="text-xs text-[#2D2D2D]/60">Mention "feel" / "gross" / "tactile" (proves we solve the problem)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: THE RAISE */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              The Raise: Staged Funding with Clear Trigger Metrics
            </h2>
            <p className="text-lg text-[#2D2D2D]/70 max-w-3xl mx-auto">
              We're not raising for scale. We're raising for proof. Seed unlocks only when beta metrics hit targets.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pre-Seed */}
            <div className="bg-[#F5F1E8] border-2 border-[#E85D42] rounded-2xl p-8">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-[#E85D42] text-white rounded-full font-bold text-sm mb-4">
                  PRE-SEED • CURRENT RAISE
                </div>
                <div className="text-5xl font-bold text-[#E85D42] mb-2">$100-150K</div>
                <p className="text-sm text-[#2D2D2D]/70">Validation + retail beta + IP filing</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-bold text-[#2D2D2D] text-sm uppercase tracking-wider mb-4">Use of Funds</h4>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Frankenstein prototypes + mustard test:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$5-10K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">5k-10k pilot run materials:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$25-35K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Dispenser iterations + soft tooling:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$15-25K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Retail beta setup (25-50 stores):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$20-30K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Provisional patent filing:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$5-10K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Certifications (BPI/TUV):</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$10-15K</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-[#2D2D2D]/70">Operations + contingency:</span>
                  <span className="text-sm font-bold text-[#2D2D2D]">$20-25K</span>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-[#2D2D2D]/20">
                <p className="text-sm font-bold text-[#2D2D2D] mb-2">Milestone:</p>
                <p className="text-sm text-[#2D2D2D]/80">Validated unit economics + retail pull signal + IP filed</p>
              </div>
            </div>

            {/* Seed */}
            <div className="bg-[#2A9D8F]/5 border-2 border-[#2A9D8F] rounded-2xl p-8">
              <div className="mb-6">
                <div className="inline-block px-4 py-2 bg-[#2A9D8F] text-white rounded-full font-bold text-sm mb-4">
                  SEED • FOLLOW-ON
                </div>
                <div className="text-5xl font-bold text-[#2A9D8F] mb-2">$300-400K</div>
                <p className="text-sm text-[#2D2D2D]/70">Triggered by retail beta validation</p>
              </div>

              <div className="mb-6">
                <h4 className="font-bold text-[#2D2D2D] text-sm uppercase tracking-wider mb-4">Seed Triggers</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-[#2D2D2D]/80">Retail beta validation: 25+ stores with 60%+ repeat purchase rate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-[#2D2D2D]/80">Unit economics confirmed: &lt;$0.08 COGS, 40%+ gross margin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-[#2D2D2D]/80">Manufacturing partner committed to scale (50K+ units)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-[#2A9D8F] flex-shrink-0 mt-2"></div>
                    <span className="text-sm text-[#2D2D2D]/80">Provisional patent filed with claims validated</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t-2 border-[#2D2D2D]/20">
                <h4 className="font-bold text-[#2D2D2D] text-sm uppercase tracking-wider mb-4">Seed Allocation</h4>
                <div className="space-y-2 text-sm text-[#2D2D2D]/80">
                  <div className="flex justify-between">
                    <span>Automated manufacturing setup:</span>
                    <span className="font-bold">35-40%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory + working capital:</span>
                    <span className="font-bold">25-30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Retail expansion (200+ doors):</span>
                    <span className="font-bold">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DTC launch + marketing:</span>
                    <span className="font-bold">15-20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Team expansion:</span>
                    <span className="font-bold">10-15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: ROADMAP & TIMELINE */}
      <section className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 border-b-2 border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-4">
              Roadmap: Each Gate Tied to Proof Points, Not Time
            </h2>
          </div>

          <div className="space-y-6">
            {/* Phase 1 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-4xl font-bold text-[#E85D42]">01</div>
                  <div className="text-sm text-[#2D2D2D]/60 mt-2">Weeks 1–4</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Frankenstein Prototypes + Mustard Test</h3>
                  <p className="text-sm text-[#2D2D2D]/70 mb-4">
                    Material sourcing finalized, dispenser v1 (3D printed), tactile validation with mustard/water tests.
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#F5F1E8] border-2 border-gray-200 rounded-lg">
                    <span className="text-sm font-bold text-[#2D2D2D]">Gate: F&F close or bootstrap ($25-35K)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="bg-white border-2 border-[#E85D42]/30 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-4xl font-bold text-[#E85D42]">02</div>
                  <div className="text-sm text-[#2D2D2D]/60 mt-2">Weeks 5–12</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Pilot Run + Retail Beta + Provisional Patent</h3>
                  <p className="text-sm text-[#2D2D2D]/70 mb-4">
                    5–10K pilot units (semi-auto), retail beta launch in 25–50 boutiques, provisional patent filed.
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#E85D42]/10 border-2 border-[#E85D42] rounded-lg">
                    <span className="text-sm font-bold text-[#E85D42]">Gate: Pre-seed close ($100-150K)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-4xl font-bold text-[#2A9D8F]">03</div>
                  <div className="text-sm text-[#2D2D2D]/60 mt-2">Months 4–9</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Automated Production + DTC Launch</h3>
                  <p className="text-sm text-[#2D2D2D]/70 mb-4">
                    Automated interfold production line, BPI certification complete, DTC subscription platform launched.
                  </p>
                  <div className="inline-block px-4 py-2 bg-[#2A9D8F]/10 border-2 border-[#2A9D8F] rounded-lg">
                    <span className="text-sm font-bold text-[#2A9D8F]">Gate: Seed close ($300-400K) — triggered by retail metrics</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="text-4xl font-bold text-[#F4A261]">04</div>
                  <div className="text-sm text-[#2D2D2D]/60 mt-2">Months 10–18</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#2D2D2D] mb-4">Channel Expansion + Series A Positioning</h3>
                  <p className="text-sm text-[#2D2D2D]/70 mb-4">
                    Vets → mass premium (Petco/PetSmart test), international pilot, Series A prep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: CTA */}
      <section id="invest" className="relative py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2D2D2D] mb-6">
              We're Turning a Hated Moment Into a Premium Hygiene System
            </h2>
            <p className="text-2xl text-[#2A9D8F] font-bold italic mb-8">
              If pets are family, cleanup should feel like it.
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-[#F5F1E8] border-2 border-[#E85D42] rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-[#E85D42]" />
              <div>
                <h3 className="text-xl font-bold text-[#2D2D2D]">Join the Pre-Seed Round</h3>
                <p className="text-sm text-[#2D2D2D]/70">$100-150K • Q1 2025</p>
              </div>
            </div>

            <ul className="space-y-2 text-sm text-[#2D2D2D]/80 mb-6">
              <li>• Early-stage IP development opportunity</li>
              <li>• Validated market pain with existing hack behavior (double-bagging)</li>
              <li>• Clear path to retail beta validation</li>
              <li>• Seed round triggers tied to hard metrics</li>
            </ul>

            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#E85D42] hover:bg-[#D84A32] text-white rounded-xl font-bold transition-all shadow-lg w-full sm:w-auto"
              >
                <ExternalLink className="w-5 h-5" />
                Contact for Investment Details
              </Link>
            </div>
          </div>

          {/* Links */}
          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <Link
                href="/clients/work/sanitary-waste-system/full-overview"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#E85D42] text-[#2D2D2D] rounded-xl font-bold transition-all"
              >
                <Package className="w-5 h-5" />
                View Full Pitch Deck
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 hover:border-[#E85D42] text-[#2D2D2D] rounded-xl font-bold transition-all"
              >
                All Projects
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="text-sm text-[#2D2D2D]/60">
              <p>Built by Rationale Studio</p>
              <p>IP Development • Product Strategy • Venture Building</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="py-8 px-4 text-center border-t-2 border-gray-200 bg-white">
        <p className="text-sm text-[#2D2D2D]/60">
          Sanitary Waste System Overview • IP Development Project • December 2024
        </p>
        <p className="text-xs text-[#2D2D2D]/40 mt-2">
          <Link href="/" className="hover:text-[#E85D42] transition">
            View All Projects
          </Link>
          {' • '}
          <Link href="/contact" className="hover:text-[#E85D42] transition">
            Contact Rationale Studio
          </Link>
        </p>
      </div>
    </main>
  );
}

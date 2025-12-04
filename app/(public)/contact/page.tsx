'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-4 animate-fade-in-up">
            START A CONVERSATION
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in-up delay-100">
            Let's Talk
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-6 animate-fade-in-up delay-200">
            Whether you need a 2-week strategy sprint or an 18-month technical co-founder, we're here to help you ship.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <OS8Window
            title="Get in Touch"
            variant="featured"
            animateIn={false}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#FFD700] mb-2">Email</h3>
                <a
                  href="mailto:studio@rationale.design"
                  className="text-[#FFD700] hover:underline text-xl font-semibold"
                >
                  studio@rationale.design
                </a>
              </div>

              <div className="border-t border-[#FFD700]/30 pt-6">
                <h3 className="text-lg font-bold text-[#FFD700] mb-3">What to Include</h3>
                <ul className="space-y-2 text-sm text-gray-100">
                  <li>• What you're building and the problem you're solving</li>
                  <li>• Your timeline (weeks? months?)</li>
                  <li>• Your preference: cash, equity, or hybrid engagement</li>
                  <li>• Any existing work (prototypes, specs, etc.)</li>
                </ul>
              </div>

              <div className="p-4 rounded border border-[#FFD700] bg-black/40">
                <p className="text-sm text-gray-100">
                  <span className="font-bold text-[#FFD700]">Response time:</span> We typically respond within 24 hours
                  with initial feedback and next steps. If we're not the right fit, we'll tell you honestly and
                  recommend alternatives.
                </p>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>

      {/* Interactive Budget Qualifier */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-mono text-[#FFD700] tracking-widest mb-2">
              FIND YOUR FIT
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Which Engagement Is Right For You?
            </h2>
            <p className="text-base text-gray-400 max-w-2xl mx-auto">
              Select the option that matches where you are today — we'll help you figure out the right structure
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* Option 1: Clarity Kit */}
            <a
              href="mailto:studio@rationale.design?subject=Clarity%20Kit%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Clarity%20Kit%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/50 border border-gray-700 hover:border-[#FFD700] rounded transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">2 WEEKS</p>
                    <p className="text-base font-semibold text-gray-100">I have an idea I want to validate</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get technical plan, market positioning, and go/no-go recommendation
                  </p>
                  <p className="text-xs text-gray-400">
                    Investment level: Comparable to 2-3 weeks of senior engineering time
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Option 2: Prototype Kit */}
            <a
              href="mailto:studio@rationale.design?subject=Prototype%20Kit%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Prototype%20Kit%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/50 border border-gray-700 hover:border-[#FFD700] rounded transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">4-6 WEEKS</p>
                    <p className="text-base font-semibold text-gray-100">I need a working prototype to test</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get interactive software to validate with real users before full build
                  </p>
                  <p className="text-xs text-gray-400">
                    Investment level: Comparable to mid-level full-stack dev for 2 months
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Option 3: Build Ship Run */}
            <a
              href="mailto:studio@rationale.design?subject=Build%20Ship%20Run%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20interested%20in%20a%20Build%20Ship%20Run%20engagement.%0A%0AWhat%20I'm%20building%3A%20%0ATimeline%3A%20%0APreference%3A%20cash%20%7C%20equity%20%7C%20hybrid%0A%0AThanks!"
              className="block p-5 bg-gray-800/50 border border-gray-700 hover:border-[#FFD700] rounded transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-xs font-mono text-[#FFD700]">6-18 MONTHS</p>
                    <p className="text-base font-semibold text-gray-100">I'm ready to build and ship a full product</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    Get full product development from concept to App Store/launch
                  </p>
                  <p className="text-xs text-gray-400">
                    Investment level: Comparable to your first technical co-founder
                  </p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>

            {/* Custom/Not Sure Option */}
            <a
              href="mailto:studio@rationale.design?subject=Custom%20Engagement%20Inquiry&body=Hi%20Rationale%20team%2C%0A%0AI'm%20not%20sure%20which%20engagement%20fits%20best.%20Here's%20what%20I'm%20looking%20for%3A%0A%0A%0A%0AThanks!"
              className="block p-5 bg-gray-900 border border-gray-700 hover:border-[#FFD700] rounded transition-all group"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-100 mb-1">Not sure which fits?</p>
                  <p className="text-xs text-gray-400">Let's talk — we'll help you figure out the right approach</p>
                </div>
                <span className="text-[#FFD700] text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          </div>

          <p className="text-center text-xs text-gray-400 mt-8">
            Each option opens a pre-filled email so you can reach out in seconds
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Link href="/how-we-work" className="block group">
              <OS8Window
                title="For Founders"
                variant="interactive"
                animateIn={false}
                className="cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Need technical execution? We offer productized Kits from 2-week sprints to 18-month builds.
                    Cash, equity, or hybrid structures available.
                  </p>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-[#FFD700] transition-colors inline-block">
                    View Rationale Kits →
                  </span>
                </div>
              </OS8Window>
            </Link>

            <Link href="/#portfolio" className="block group">
              <OS8Window
                title="For Partners"
                variant="interactive"
                animateIn={false}
                className="cursor-pointer h-full"
              >
                <div className="space-y-4">
                  <p className="text-sm text-gray-100 leading-relaxed">
                    Interested in our portfolio IP (Zero, Compass) or strategic partnerships?
                    Let's explore collaboration opportunities.
                  </p>
                  <span className="text-sm font-semibold text-gray-300 group-hover:text-[#FFD700] transition-colors inline-block">
                    View Portfolio →
                  </span>
                </div>
              </OS8Window>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex justify-center">
          <OS8Window
            title="Ready to Start?"
            variant="cta"
            animateIn={false}
            className="max-w-lg"
          >
            <div className="space-y-4 text-center">
              <p className="text-base text-[#FFD700] leading-relaxed">
                Send us an email and we'll respond within 24 hours with initial thoughts and next steps.
              </p>

              <div className="pt-4">
                <a
                  href="mailto:studio@rationale.design"
                  className="inline-block px-8 py-4 bg-[#FFD700] hover:bg-[#FFE34D] text-black font-semibold transition-colors"
                >
                  studio@rationale.design
                </a>
              </div>
            </div>
          </OS8Window>
        </div>
      </section>
    </main>
  );
}

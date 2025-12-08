/**
 * Engagement Models Page
 *
 * Deep dive into Kits methodology and payment flexibility
 */

import Link from 'next/link';
import { Clock, DollarSign, Handshake } from 'lucide-react';
import { partnerContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Engagement Models | Partner Portal',
  description: 'Rationale Kits methodology and how partners can introduce clients',
};

export default function EngagementModelsPage() {
  const { engagementModels } = partnerContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {engagementModels.hero.title}
          </h1>
          <p className="text-xl text-[#00FF94] mb-4">{engagementModels.hero.subtitle}</p>
          <p className="text-base text-gray-300">{engagementModels.hero.description}</p>
        </div>
      </section>

      {/* Six Kits */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Rationale Kits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engagementModels.kits.map((kit, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-3">{kit.name}</h3>

                <div className="flex items-center gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4 text-[#00FF94]" />
                    <span>{kit.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <DollarSign className="w-4 h-4 text-[#00FF94]" />
                    <span>{kit.price}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-300 mb-4">{kit.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-[#00FF94] mb-2">Deliverables:</p>
                  <ul className="text-xs text-gray-400 space-y-1">
                    {kit.deliverables.map((deliverable, didx) => (
                      <li key={didx}>• {deliverable}</li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-white">Ideal for:</span> {kit.idealFor}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Models */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Payment Flexibility</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {engagementModels.paymentModels.map((model, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <DollarSign className="w-6 h-6 text-[#00FF94]" />
                  <h3 className="text-lg font-bold text-white">{model.type}</h3>
                </div>

                <p className="text-sm text-gray-300 mb-4">{model.description}</p>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-1">Structure:</p>
                    <p className="text-xs text-gray-300">{model.structure}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-1">Ideal For:</p>
                    <p className="text-xs text-gray-300">{model.idealFor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-1">Terms:</p>
                    <p className="text-xs text-gray-300">{model.terms}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Partners Add Value */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            {engagementModels.partnerValue.title}
          </h2>

          <div className="space-y-6">
            {engagementModels.partnerValue.opportunities.map((opp, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <Handshake className="w-6 h-6 text-[#00FF94] flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{opp.type}</h3>
                    <p className="text-sm text-gray-300 mb-4">{opp.description}</p>
                    <div className="p-4 bg-gray-900/70 border border-gray-800 rounded">
                      <p className="text-xs font-semibold text-[#00FF94] mb-2">Example:</p>
                      <p className="text-xs text-gray-300">{opp.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to Introduce a Client?
          </h2>
          <p className="text-base text-gray-300 mb-8">
            Get 10% referral fee for successful engagements, or co-invest in equity-based deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/partners/resources"
              className="px-8 py-4 bg-[#00FF94] hover:bg-[#00FF94]/90 text-black font-semibold rounded-lg transition-colors"
            >
              Get Introduction Template
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors border border-gray-700"
            >
              Discuss Partnership
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

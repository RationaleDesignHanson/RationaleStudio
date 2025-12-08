/**
 * Governance Page
 *
 * Quarterly venture review process and partner rights
 */

import { Calendar, Vote, CheckCircle } from 'lucide-react';
import { partnerContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Governance | Partner Portal',
  description: 'Quarterly voting process and strategic partner rights',
};

export default function GovernancePage() {
  const { governance } = partnerContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {governance.hero.title}
          </h1>
          <p className="text-xl text-[#00FF94] mb-4">{governance.hero.subtitle}</p>
          <p className="text-base text-gray-300">{governance.hero.description}</p>
        </div>
      </section>

      {/* Quarterly Process */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            {governance.quarterlyProcess.title}
          </h2>

          <div className="space-y-6">
            {governance.quarterlyProcess.phases.map((phase, idx) => (
              <div
                key={idx}
                className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                {/* Phase Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#00FF94]/20 border border-[#00FF94]/40 rounded-full flex items-center justify-center text-xl font-bold text-[#00FF94]">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{phase.name}</h3>
                      <span className="text-sm text-gray-400">{phase.duration}</span>
                    </div>
                    <p className="text-base text-gray-300">{phase.description}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-3">Key Activities:</p>
                    <ul className="space-y-2">
                      {phase.details.map((detail, didx) => (
                        <li key={didx} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-[#00FF94] flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-900/70 border border-gray-800 rounded">
                    <p className="text-xs font-semibold text-[#00FF94] mb-2">Deliverables:</p>
                    <p className="text-sm text-gray-300">{phase.deliverables}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Rights */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {governance.partnerRights.title}
            </h2>
            <p className="text-base text-gray-300">{governance.partnerRights.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {governance.partnerRights.rights.map((right, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <h3 className="text-lg font-bold text-white mb-3">{right.right}</h3>
                <p className="text-sm text-gray-300 mb-4">{right.description}</p>

                <div className="space-y-3 text-sm">
                  {right.weight && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Voting Weight:</p>
                      <p className="text-xs text-gray-300">{right.weight}</p>
                    </div>
                  )}
                  {right.includes && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Includes:</p>
                      <p className="text-xs text-gray-300">{right.includes}</p>
                    </div>
                  )}
                  {right.terms && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Terms:</p>
                      <p className="text-xs text-gray-300">{right.terms}</p>
                    </div>
                  )}
                  {right.timing && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Timing:</p>
                      <p className="text-xs text-gray-300">{right.timing}</p>
                    </div>
                  )}
                  {right.commitment && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Commitment:</p>
                      <p className="text-xs text-gray-300">{right.commitment}</p>
                    </div>
                  )}
                  {right.structure && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Structure:</p>
                      <p className="text-xs text-gray-300">{right.structure}</p>
                    </div>
                  )}
                  {right.metrics && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Metrics:</p>
                      <p className="text-xs text-gray-300">{right.metrics}</p>
                    </div>
                  )}
                  {right.frequency && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Frequency:</p>
                      <p className="text-xs text-gray-300">{right.frequency}</p>
                    </div>
                  )}
                  {right.compensation && (
                    <div>
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Compensation:</p>
                      <p className="text-xs text-gray-300">{right.compensation}</p>
                    </div>
                  )}
                  {right.example && (
                    <div className="p-3 bg-gray-900/70 border border-gray-800 rounded">
                      <p className="text-xs font-semibold text-[#00FF94] mb-1">Example:</p>
                      <p className="text-xs text-gray-300">{right.example}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voting Mechanics */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {governance.votingMechanics.title}
            </h2>
            <p className="text-base text-gray-300">{governance.votingMechanics.description}</p>
          </div>

          {/* Process Steps */}
          <div className="p-8 bg-gray-900/50 border border-gray-700 rounded-lg mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Vote className="w-6 h-6 text-[#00FF94]" />
              <h3 className="text-xl font-bold text-white">Voting Process</h3>
            </div>
            <ol className="space-y-3">
              {governance.votingMechanics.process.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#00FF94]/20 border border-[#00FF94]/40 rounded-full flex items-center justify-center text-xs font-bold text-[#00FF94]">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Example Vote */}
          <div className="p-8 bg-gradient-to-r from-[#00FF94]/10 to-[#00FF94]/5 border border-[#00FF94]/30 rounded-lg">
            <h3 className="text-xl font-bold text-white mb-4">{governance.votingMechanics.example.scenario}</h3>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[#00FF94] mb-3">Concepts for Vote:</p>
                <ul className="space-y-2">
                  {governance.votingMechanics.example.concepts.map((concept, idx) => (
                    <li key={idx} className="text-sm text-gray-300">• {concept}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-[#00FF94] mb-3">Partner Votes:</p>
                <div className="space-y-3">
                  {governance.votingMechanics.example.partners.map((partner, idx) => (
                    <div key={idx} className="p-4 bg-gray-900/70 border border-gray-800 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-white">{partner.name}</span>
                        <span className="text-xs text-gray-400">{partner.weight}</span>
                      </div>
                      <div className="text-xs text-gray-300 space-y-1">
                        <div>Equity: {partner.equity}</div>
                        <div>Strategic Value: {partner.strategic}</div>
                        <div>Vote: {partner.vote}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-[#00FF94]/30">
                <p className="text-xs font-semibold text-[#00FF94] mb-2">Result:</p>
                <p className="text-sm text-gray-300">{governance.votingMechanics.example.result}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Calendar className="w-12 h-12 text-[#00FF94] mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Next Quarterly Review: Q1 2025
          </h2>
          <p className="text-base text-gray-300 mb-8">
            Review opens January 1-7. Partner feedback period: January 8-31. Decisions announced February 1-7.
          </p>
          <button className="px-8 py-4 bg-[#00FF94] hover:bg-[#00FF94]/90 text-black font-semibold rounded-lg transition-colors">
            Add Q1 Review to Calendar
          </button>
        </div>
      </section>
    </div>
  );
}

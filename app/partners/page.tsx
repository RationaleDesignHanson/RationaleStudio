/**
 * Partner Dashboard
 *
 * Overview of active collaboration opportunities and partner resources
 */

import Link from 'next/link';
import { TrendingUp, Calendar, FileText, ArrowRight } from 'lucide-react';
import { partnerContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Dashboard | Rationale',
  description: 'Active collaboration hub for Rationale strategic partners',
};

export default function PartnersDashboardPage() {
  const { dashboard } = partnerContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Welcome Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {dashboard.welcome.title}
          </h1>
          <p className="text-xl text-[#00FF94] mb-4">{dashboard.welcome.subtitle}</p>
          <p className="text-base text-gray-300 max-w-3xl">{dashboard.welcome.description}</p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {dashboard.quickStats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/70 border border-gray-800 rounded-lg hover:border-[#00FF94]/30 transition-colors"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#00FF94] mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-xs text-gray-400">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Active Collaboration Opportunities */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Active Collaboration Opportunities</h2>
            <Link
              href="/partners/portfolio"
              className="text-sm text-[#00FF94] hover:text-[#00FF94]/80 transition-colors font-medium flex items-center gap-2"
            >
              View Full Portfolio
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {dashboard.activeOpportunities.map((opp, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{opp.venture}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#00FF94]/20 text-[#00FF94] border border-[#00FF94]/30">
                    {opp.status}
                  </span>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#00FF94] mb-2">{opp.opportunity}</p>
                  <p className="text-sm text-gray-300">{opp.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <span className="text-xs text-gray-400">{opp.timeline}</span>
                  <button className="text-sm text-[#00FF94] hover:text-[#00FF94]/80 font-medium transition-colors">
                    {opp.action} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-[#00FF94]" />
              Upcoming Events
            </h2>
            <Link
              href="/partners/governance"
              className="text-sm text-[#00FF94] hover:text-[#00FF94]/80 transition-colors font-medium flex items-center gap-2"
            >
              View Full Calendar
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {dashboard.upcomingEvents.map((event, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-[#00FF94]">{event.date}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        event.type === 'deadline'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : event.type === 'review'
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{event.event}</h3>
                  <p className="text-sm text-gray-300">{event.description}</p>
                </div>
                <button className="text-sm text-[#00FF94] hover:text-[#00FF94]/80 font-medium transition-colors whitespace-nowrap">
                  Add to Calendar
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Quick Links</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/partners/engagement-models"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors group"
            >
              <FileText className="w-8 h-8 text-[#00FF94] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                Engagement Models
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Kits methodology and how to introduce clients
              </p>
              <span className="text-sm text-[#00FF94] font-medium">Learn More →</span>
            </Link>

            <Link
              href="/partners/portfolio"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors group"
            >
              <TrendingUp className="w-8 h-8 text-[#00FF94] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                Portfolio Ventures
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Zero, Atlas, Amplify status and opportunities
              </p>
              <span className="text-sm text-[#00FF94] font-medium">View Portfolio →</span>
            </Link>

            <Link
              href="/partners/governance"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors group"
            >
              <Calendar className="w-8 h-8 text-[#00FF94] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                Governance Process
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Quarterly voting and decision-making
              </p>
              <span className="text-sm text-[#00FF94] font-medium">Learn How →</span>
            </Link>

            <Link
              href="/partners/resources"
              className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors group"
            >
              <FileText className="w-8 h-8 text-[#00FF94] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF94] transition-colors">
                Partner Resources
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Templates, calendar, and contact info
              </p>
              <span className="text-sm text-[#00FF94] font-medium">Access Resources →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

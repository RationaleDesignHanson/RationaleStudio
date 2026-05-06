/**
 * Resources Page
 *
 * Templates, calendar, and contact information for partners
 */

import Link from 'next/link';
import { FileText, Calendar as CalendarIcon, Mail, Download } from 'lucide-react';
import { partnerContent } from '@/lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources | Partner Portal',
  description: 'Templates, calendar, and tools for Rationale strategic partners',
};

export default function ResourcesPage() {
  const { resources } = partnerContent;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Hero */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl md:text-5xl font-bold text-white mb-4">
            {resources.hero.title}
          </h1>
          <p className="text-xl text-[#00FF94] mb-4">{resources.hero.subtitle}</p>
          <p className="text-base text-gray-300">{resources.hero.description}</p>
        </div>
      </section>

      {/* Templates */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-6 h-6 text-[#00FF94]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Partner Templates</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.templates.map((template, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-[#00FF94]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{template.description}</p>
                    <span className="text-xs text-gray-400">{template.format}</span>
                  </div>
                </div>
                <button className="w-full px-4 py-3 bg-[#00FF94]/10 hover:bg-[#00FF94]/20 text-[#00FF94] font-medium rounded-lg transition-colors border border-[#00FF94]/30 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Template
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2025 Calendar */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <CalendarIcon className="w-6 h-6 text-[#00FF94]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {resources.calendar.title}
            </h2>
          </div>

          <div className="space-y-6">
            {resources.calendar.quarters.map((quarter, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <h3 className="text-xl font-bold text-white mb-6">{quarter.quarter}</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-2">Review Opens</p>
                    <p className="text-sm text-white">{quarter.reviewOpen}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-2">Feedback Period</p>
                    <p className="text-sm text-white">{quarter.feedbackPeriod}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-2">Announcement</p>
                    <p className="text-sm text-white">{quarter.announcement}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#00FF94] mb-2">Build Phase</p>
                    <p className="text-sm text-white">{quarter.buildPhase}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button className="px-4 sm:px-6 md:px-8 py-4 bg-[#00FF94] hover:bg-[#00FF94]/90 text-black font-semibold rounded-lg transition-colors flex items-center gap-2 mx-auto">
              <Download className="w-5 h-5" />
              Download 2025 Calendar (iCal)
            </button>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 border-b border-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Mail className="w-6 h-6 text-[#00FF94]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{resources.contact.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Founder Contact */}
            <div className="p-6 bg-gradient-to-r from-[#00FF94]/10 to-[#00FF94]/5 border border-[#00FF94]/30 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Direct to Founder</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Name</p>
                  <p className="text-base text-white">{resources.contact.founder.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Role</p>
                  <p className="text-base text-white">{resources.contact.founder.role}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Email</p>
                  <a
                    href={`mailto:${resources.contact.founder.email}`}
                    className="text-base text-white hover:text-[#00FF94] transition-colors"
                  >
                    {resources.contact.founder.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Schedule Call</p>
                  <a
                    href={`https://${resources.contact.founder.calendly}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-[#00FF94] transition-colors"
                  >
                    {resources.contact.founder.calendly}
                  </a>
                </div>
              </div>
            </div>

            {/* Team Contact */}
            <div className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Team Contacts</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">General Inquiries</p>
                  <a
                    href={`mailto:${resources.contact.support.general}`}
                    className="text-base text-white hover:text-[#00FF94] transition-colors"
                  >
                    {resources.contact.support.general}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Partnership Opportunities</p>
                  <a
                    href={`mailto:${resources.contact.support.partnerships}`}
                    className="text-base text-white hover:text-[#00FF94] transition-colors"
                  >
                    {resources.contact.support.partnerships}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#00FF94] mb-1">Technical Support</p>
                  <a
                    href={`mailto:${resources.contact.support.technical}`}
                    className="text-base text-white hover:text-[#00FF94] transition-colors"
                  >
                    {resources.contact.support.technical}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {resources.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{item.question}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

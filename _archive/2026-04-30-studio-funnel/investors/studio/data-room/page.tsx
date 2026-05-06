/**
 * Studio Data Room
 *
 * Secure data room for studio investment due diligence
 * Moved from /invest/studio/data-room as part of route consolidation (Phase 2)
 */

'use client';

import Link from 'next/link';
import { Container } from '@/components/layout';
import { Lock, FileText, TrendingUp, Code, Shield } from 'lucide-react';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

export default function StudioDataRoomPage() {
  const categories = [
    {
      name: 'Financial Documents',
      icon: TrendingUp,
      docs: [
        { title: 'P&L Statements (2024)', size: '1.2 MB', status: 'Available' },
        { title: 'Cash Flow Projections', size: '850 KB', status: 'Available' },
        { title: 'Runway Analysis', size: '640 KB', status: 'Available' },
      ]
    },
    {
      name: 'Legal & Corporate',
      icon: Shield,
      docs: [
        { title: 'Operating Agreement', size: '2.4 MB', status: 'Available' },
        { title: 'IP Assignment Docs', size: '1.1 MB', status: 'Available' },
        { title: 'Cap Table', size: '320 KB', status: 'Available' },
      ]
    },
    {
      name: 'Product & Technical',
      icon: Code,
      docs: [
        { title: 'Zero Technical Architecture', size: '3.8 MB', status: 'Available' },
        { title: 'Atlas Blueprint (103KB)', size: '103 KB', status: 'Available' },
        { title: 'Amplify Blueprint (129KB)', size: '129 KB', status: 'Available' },
      ]
    },
    {
      name: 'Business Strategy',
      icon: FileText,
      docs: [
        { title: 'Studio Business Plan', size: '2.1 MB', status: 'Available' },
        { title: 'Go-to-Market Strategy', size: '1.5 MB', status: 'Available' },
        { title: 'Competitive Analysis', size: '980 KB', status: 'Available' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <Container>
        <div className="py-12">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/investors/studio"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
            >
              ← Back to Studio Investment
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-terminal-gold" />
              <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                Studio Data Room
              </h1>
            </div>
            <p className="text-lg text-gray-400 mb-2">
              Secure access to due diligence materials for studio investment
            </p>
            <p className="text-sm text-gray-500">
              All documents are confidential and require investor status to access
            </p>
          </div>

          {/* Access Notice */}
          <div className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Protected Access</h3>
                <p className="text-sm text-gray-300 mb-4">
                  This data room contains sensitive business information. Access is granted only to verified investors
                  who have signed an NDA. If you haven't received access credentials, please contact matt@rationale.work.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 font-medium rounded-lg transition-colors border border-yellow-500/40"
                >
                  Request Access
                </Link>
              </div>
            </div>
          </div>

          {/* Document Categories */}
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.name}
                  className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-terminal-gold" />
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>

                  <div className="space-y-3">
                    {category.docs.map((doc) => (
                      <div
                        key={doc.title}
                        className="p-4 bg-gray-800/50 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white mb-1">{doc.title}</p>
                            <p className="text-xs text-gray-500">{doc.size}</p>
                          </div>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                            {doc.status}
                          </span>
                        </div>
                        <button
                          disabled
                          className="mt-3 w-full px-4 py-2 bg-gray-800 text-gray-600 text-sm font-medium rounded-lg cursor-not-allowed"
                        >
                          <Lock className="w-3 h-3 inline mr-2" />
                          Requires Access
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Footer */}
          <div className="mt-12 p-6 bg-gray-900/30 border border-gray-800 rounded-lg text-center">
            <p className="text-sm text-gray-400 mb-4">
              Questions about the data room or need additional materials?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-terminal-gold text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
            >
              Contact Investor Relations
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Case Studies Library
 *
 * Multiple formats: long, short, carousel, talk, LinkedIn
 */

'use client';

import Link from 'next/link';
import { Folder, FileText } from 'lucide-react';

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      project: 'Zero',
      formats: ['Long-form (3000w)', 'Short (800w)', 'Carousel (10 slides)', 'Talk Outline', 'LinkedIn Post'],
      status: 'Complete',
    },
    {
      project: 'Athletes First (Amplify)',
      formats: ['Long-form (3500w)', 'Short (900w)', 'Carousel (12 slides)', 'Talk Outline', 'LinkedIn Post'],
      status: 'Complete',
    },
    {
      project: 'FUBO Thumbnail Generator',
      formats: ['Long-form (2500w)', 'Short (750w)', 'Carousel (8 slides)'],
      status: 'Complete',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner/content"
          className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors mb-4 inline-block"
        >
          ← Back to Content Library
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Case Studies</h1>
        <p className="text-gray-400">
          Multiple formats for each project: long-form, short, carousel, talk outlines, LinkedIn posts
        </p>
      </div>

      <div className="grid md:grid-cols-1 gap-6">
        {caseStudies.map((study, idx) => (
          <div
            key={idx}
            className="p-6 bg-gray-900/50 border border-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Folder className="w-6 h-6 text-[#FFD700]" />
                <div>
                  <h3 className="text-xl font-bold text-white">{study.project}</h3>
                  <p className="text-sm text-gray-400">{study.formats.length} formats available</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                {study.status}
              </span>
            </div>

            <div className="space-y-2">
              {study.formats.map((format, fidx) => (
                <div
                  key={fidx}
                  className="p-3 bg-gray-800/50 border border-gray-800 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-white">{format}</span>
                  </div>
                  <button
                    disabled
                    className="px-3 py-1 bg-gray-800 text-gray-600 text-xs font-medium rounded cursor-not-allowed"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">From V01 Archive</h3>
        <p className="text-sm text-gray-400 mb-4">
          All case studies from previous version need to be migrated to this library. Each project has 5 variants:
        </p>
        <ul className="space-y-1 text-sm text-gray-400">
          <li>• Long-form blog post (2500-3500 words)</li>
          <li>• Short summary (750-900 words)</li>
          <li>• LinkedIn carousel (8-12 slides)</li>
          <li>• Conference talk outline (30-45 min)</li>
          <li>• LinkedIn post (1300 char max)</li>
        </ul>
      </div>
    </div>
  );
}

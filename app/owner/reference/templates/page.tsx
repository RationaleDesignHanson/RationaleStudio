/**
 * Templates Library
 *
 * Pitch decks, proposals, content templates, and formats
 */

'use client';

import Link from 'next/link';
import { FileCode, Download } from 'lucide-react';

export default function TemplatesPage() {
  const categories = [
    {
      name: 'Pitch Decks',
      templates: [
        { name: 'Investor Pitch Template', format: 'Figma', size: 'Slides 1-15' },
        { name: 'Partner Pitch Template', format: 'Figma', size: 'Slides 1-12' },
        { name: 'Product Demo Deck', format: 'Figma', size: 'Slides 1-20' },
      ]
    },
    {
      name: 'Proposals',
      templates: [
        { name: 'Clarity Kit Proposal', format: 'Notion', size: '8 sections' },
        { name: 'Prototype Kit Proposal', format: 'Notion', size: '10 sections' },
        { name: 'Build+Ship+Run Proposal', format: 'Notion', size: '12 sections' },
      ]
    },
    {
      name: 'Content Formats',
      templates: [
        { name: 'Long-form Blog Post', format: 'Markdown', size: '2500-3500w' },
        { name: 'Short Summary', format: 'Markdown', size: '750-900w' },
        { name: 'LinkedIn Carousel', format: 'Figma', size: '8-12 slides' },
        { name: 'Conference Talk', format: 'Notion', size: '30-45 min' },
      ]
    },
    {
      name: 'Technical Docs',
      templates: [
        { name: 'Architecture Document', format: 'Notion', size: 'Template' },
        { name: 'API Documentation', format: 'Markdown', size: 'Template' },
        { name: 'Product Spec', format: 'Notion', size: 'Template' },
      ]
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
      <div className="mb-8">
        <Link
          href="/owner/reference"
          className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
        >
          ← Back to Reference Library
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <FileCode className="w-8 h-8 text-terminal-gold" />
          <h1 className="text-3xl font-bold text-white">Templates</h1>
        </div>
        <p className="text-gray-400">
          Reusable templates for pitches, proposals, content, and documentation
        </p>
      </div>

      <div className="space-y-8">
        {categories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-white mb-4">{category.name}</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {category.templates.map((template, tidx) => (
                <div
                  key={tidx}
                  className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg hover:border-terminal-gold/30 transition-colors"
                >
                  <h3 className="text-sm font-bold text-white mb-2">{template.name}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>{template.format}</span>
                    <span>{template.size}</span>
                  </div>
                  <button
                    disabled
                    className="w-full px-3 py-2 bg-gray-800 text-gray-600 text-xs font-medium rounded cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-900/30 border border-gray-800 rounded-lg">
        <h3 className="text-lg font-bold text-white mb-3">Template System</h3>
        <p className="text-sm text-gray-400 mb-4">
          All templates are designed for rapid deployment:
        </p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Copy and customize for new opportunities</li>
          <li>• Consistent branding across all materials</li>
          <li>• Proven formats that convert</li>
          <li>• Regularly updated with latest learnings</li>
        </ul>
      </div>
    </div>
  );
}

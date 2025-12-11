/**
 * Zero App Store Optimization Guide
 *
 * Internal guide for optimizing Zero's App Store presence
 * Includes metadata, keywords, screenshots, and checklist
 */

'use client';

import { appStoreMetadata, appStoreChecklist, keywordStrategy, abTestingPlan } from '@/lib/zero/app-store-optimization';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes } from '@/lib/theme/watercolor-palette';
import { CheckCircle2, Circle, Copy, Download, Eye, Search, Smartphone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function AppStoreGuidePage() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.04}
          animated={true}
          colorTheme={watercolorThemes.terminalSubtle}
          charSet="default"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/clients/zero/dashboard"
            className="text-sm text-gray-400 hover:text-terminal-gold transition-colors mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            App Store Optimization Guide
          </h1>
          <p className="text-gray-400">
            Complete ASO strategy, metadata, and checklist for Zero's App Store presence
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
            <div className="text-2xl font-bold text-terminal-gold mb-1">30</div>
            <div className="text-xs text-gray-400">Max App Name Chars</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
            <div className="text-2xl font-bold text-terminal-gold mb-1">100</div>
            <div className="text-xs text-gray-400">Max Keyword Chars</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
            <div className="text-2xl font-bold text-terminal-gold mb-1">43</div>
            <div className="text-xs text-gray-400">Search Keywords</div>
          </div>
          <div className="p-4 bg-gray-900/50 border border-gray-700 rounded-lg text-center">
            <div className="text-2xl font-bold text-terminal-gold mb-1">6</div>
            <div className="text-xs text-gray-400">Screenshots</div>
          </div>
        </div>

        {/* Primary Metadata */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-terminal-gold" />
            Primary Metadata
          </h2>

          <div className="space-y-6">
            {/* App Name */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">App Name (30 chars max)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{appStoreMetadata.appName.length}/30</span>
                  <button
                    onClick={() => copyToClipboard(appStoreMetadata.appName, 'appName')}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedField === 'appName' ? (
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded font-mono text-sm text-gray-200">
                {appStoreMetadata.appName}
              </div>
            </div>

            {/* Subtitle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">Subtitle (30 chars max)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{appStoreMetadata.subtitle.length}/30</span>
                  <button
                    onClick={() => copyToClipboard(appStoreMetadata.subtitle, 'subtitle')}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedField === 'subtitle' ? (
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded font-mono text-sm text-gray-200">
                {appStoreMetadata.subtitle}
              </div>
            </div>

            {/* Promotional Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">Promotional Text (170 chars max)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{appStoreMetadata.promotionalText.length}/170</span>
                  <button
                    onClick={() => copyToClipboard(appStoreMetadata.promotionalText, 'promo')}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedField === 'promo' ? (
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded font-mono text-sm text-gray-200">
                {appStoreMetadata.promotionalText}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-white">Keywords (100 chars max)</label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {appStoreMetadata.keywords.join(',').length}/100
                  </span>
                  <button
                    onClick={() => copyToClipboard(appStoreMetadata.keywords.join(','), 'keywords')}
                    className="p-1 hover:bg-gray-800 rounded transition-colors"
                  >
                    {copiedField === 'keywords' ? (
                      <CheckCircle2 className="w-4 h-4 text-terminal-gold" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded font-mono text-sm text-gray-200">
                {appStoreMetadata.keywords.join(', ')}
              </div>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Eye className="w-6 h-6 text-terminal-gold" />
              App Description
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">{appStoreMetadata.description.length}/4000</span>
              <button
                onClick={() => copyToClipboard(appStoreMetadata.description, 'description')}
                className="px-3 py-1 bg-terminal-gold hover:bg-[#FFE34D] text-black text-sm font-medium rounded transition-colors"
              >
                Copy Full Description
              </button>
            </div>
          </div>
          <div className="p-4 bg-gray-800/50 border border-gray-700 rounded max-h-96 overflow-y-auto">
            <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">
              {appStoreMetadata.description}
            </pre>
          </div>
        </section>

        {/* Screenshot Specifications */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-terminal-gold" />
            Screenshot Specifications
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appStoreMetadata.screenshots.map((screenshot, index) => (
              <div key={index} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                <div className="text-sm font-semibold text-terminal-gold mb-2">
                  Screenshot {index + 1}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{screenshot.title}</h3>
                <p className="text-sm text-gray-300 mb-2">{screenshot.description}</p>
                <div className="text-xs text-gray-400 bg-gray-900/50 px-2 py-1 rounded inline-block">
                  {screenshot.callout}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-gray-800/50 border border-terminal-gold/30 rounded-lg">
            <h3 className="text-sm font-semibold text-white mb-2">Technical Requirements:</h3>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• 6.7" iPhone Pro Max: 1290 x 2796 pixels</li>
              <li>• 5.5" iPhone 8 Plus: 1242 x 2208 pixels (backwards compatibility)</li>
              <li>• Format: PNG or JPEG (no alpha channel)</li>
              <li>• Max 6 screenshots per device size</li>
              <li>• Portrait orientation only</li>
            </ul>
          </div>
        </section>

        {/* Keyword Strategy */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Search className="w-6 h-6 text-terminal-gold" />
            Keyword Strategy
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Primary Keywords</h3>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywordStrategy.primary.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-terminal-gold/20 border border-terminal-gold/40 rounded text-xs text-terminal-gold">
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{keywordStrategy.primary.rationale}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Secondary Keywords</h3>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywordStrategy.secondary.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-blue-500/20 border border-blue-500/40 rounded text-xs text-blue-400">
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{keywordStrategy.secondary.rationale}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Long-Tail Keywords</h3>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywordStrategy.longTail.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 border border-green-500/40 rounded text-xs text-green-400">
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{keywordStrategy.longTail.rationale}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Competitor Keywords</h3>
              <div className="p-3 bg-gray-800/50 border border-gray-700 rounded mb-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  {keywordStrategy.competitor.keywords.map((keyword, i) => (
                    <span key={i} className="px-2 py-1 bg-purple-500/20 border border-purple-500/40 rounded text-xs text-purple-400">
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-400">{keywordStrategy.competitor.rationale}</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Store Connect Checklist */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-terminal-gold" />
            App Store Connect Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Metadata</h3>
              <ul className="space-y-2">
                {appStoreChecklist.metadata.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Circle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Visuals</h3>
              <ul className="space-y-2">
                {appStoreChecklist.visuals.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Circle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">App Info</h3>
              <ul className="space-y-2">
                {appStoreChecklist.appInfo.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Circle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Beta Testing</h3>
              <ul className="space-y-2">
                {appStoreChecklist.betaTesting.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                    <Circle className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* A/B Testing Plan */}
        <section className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-terminal-gold" />
            A/B Testing Recommendations
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Screenshot Variants</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {abTestingPlan.screenshotVariants.map((variant, i) => (
                  <div key={i} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                    <div className="text-sm font-semibold text-terminal-gold mb-2">Variant {variant.variant}</div>
                    <p className="text-sm text-white mb-2">{variant.approach}</p>
                    <p className="text-xs text-gray-400">{variant.hypothesis}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Title Variants</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {abTestingPlan.titleVariants.map((variant, i) => (
                  <div key={i} className="p-4 bg-gray-800/50 border border-gray-700 rounded-lg">
                    <div className="text-sm font-semibold text-terminal-gold mb-2">{variant.variant}</div>
                    <p className="text-sm text-white mb-2 font-mono">{variant.title}</p>
                    <p className="text-xs text-gray-400">{variant.hypothesis}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Export Actions */}
        <section className="p-6 bg-gradient-to-r from-[#FFD700]/10 to-transparent border border-terminal-gold/30 rounded-lg">
          <h2 className="text-xl font-bold text-white mb-4">Export & Resources</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => copyToClipboard(JSON.stringify(appStoreMetadata, null, 2), 'json')}
              className="px-4 py-2 bg-terminal-gold hover:bg-[#FFE34D] text-black font-medium rounded transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as JSON
            </button>
            <Link
              href="/work/zero"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors"
            >
              View Public Zero Page
            </Link>
            <Link
              href="/clients/zero/dashboard"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
          {copiedField === 'json' && (
            <p className="text-sm text-terminal-gold mt-2">Metadata copied to clipboard</p>
          )}
        </section>
      </div>
    </main>
  );
}

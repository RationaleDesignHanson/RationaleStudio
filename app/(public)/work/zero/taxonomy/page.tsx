/**
 * Intent Taxonomy Tree - Standalone Test Page
 *
 * Visual classification tree showing 43 intent categories organized by domain
 * Replaces text list with hierarchical diagram (75% text reduction)
 */

'use client';

import Link from 'next/link';
import { OS8Window } from '@/components/visual-test';
import { useState } from 'react';

export default function TaxonomyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <section className="py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Link
              href="/work/zero"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors"
            >
              ← Back to Zero
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-12 text-center">
            <p className="text-xs sm:text-sm font-mono text-terminal-gold tracking-widest mb-4">
              INFOGRAPHIC TEST // INTENT TAXONOMY
            </p>
            <h1 className="text-2xl md:text-3xl lg:text-4xl sm:text-5xl font-bold mb-4">
              Zero Intent Taxonomy
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Interactive classification tree showing how Zero organizes 43 intent categories into 7 domains.
              This infographic reduces text by ~75% while making the taxonomy instantly comprehensible.
            </p>
          </div>

          {/* Taxonomy Tree */}
          <OS8Window
            title="43 Intent Categories, 7 Domains"
            variant="minimal"
            animateIn={false}
          >
            <IntentTaxonomy />
          </OS8Window>

          {/* Usage Notes */}
          <div className="mt-12 max-w-2xl mx-auto">
            <OS8Window
              title="Implementation Notes"
              variant="yellow"
              animateIn={false}
            >
              <div className="space-y-4 text-gray-700 text-sm">
                <p>
                  <strong>Replaces:</strong> Long bulleted list of all 43 intent categories with descriptions
                </p>
                <p>
                  <strong>Benefits:</strong> Shows hierarchical organization, reveals classification logic,
                  interactive expansion for details, scannable at multiple depth levels
                </p>
                <p>
                  <strong>Accessibility:</strong> Keyboard navigable, clear parent-child relationships,
                  expandable/collapsible for progressive disclosure
                </p>
              </div>
            </OS8Window>
          </div>
        </div>
      </section>
    </main>
  );
}

/**
 * Intent Taxonomy Component
 * Hierarchical tree with 7 domains and 43 intents
 */
function IntentTaxonomy() {
  const [expandedDomains, setExpandedDomains] = useState<string[]>(['Financial']);

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(d => d !== domain)
        : [...prev, domain]
    );
  };

  const taxonomy = [
    {
      domain: "Financial",
      color: "#4ADE80",
      count: 8,
      intents: [
        "Billing inquiry",
        "Payment confirmation",
        "Invoice request",
        "Subscription management",
        "Refund request",
        "Budget approval",
        "Expense report",
        "Tax documentation"
      ]
    },
    {
      domain: "Scheduling",
      color: "#60A5FA",
      count: 6,
      intents: [
        "Meeting request",
        "Calendar invite",
        "Reschedule request",
        "Availability query",
        "Event reminder",
        "Appointment confirmation"
      ]
    },
    {
      domain: "Logistics",
      color: "#F59E0B",
      count: 7,
      intents: [
        "Shipping notification",
        "Delivery update",
        "Order confirmation",
        "Return request",
        "Tracking inquiry",
        "Address update",
        "Package pickup"
      ]
    },
    {
      domain: "Healthcare",
      color: "#EC4899",
      count: 5,
      intents: [
        "Appointment reminder",
        "Test results",
        "Prescription refill",
        "Insurance claim",
        "Medical records request"
      ]
    },
    {
      domain: "Travel",
      color: "#8B5CF6",
      count: 6,
      intents: [
        "Booking confirmation",
        "Itinerary update",
        "Check-in reminder",
        "Flight change",
        "Hotel reservation",
        "Travel advisory"
      ]
    },
    {
      domain: "Legal",
      color: "#EF4444",
      count: 5,
      intents: [
        "Contract review",
        "Compliance notice",
        "Legal document",
        "NDA request",
        "Terms update"
      ]
    },
    {
      domain: "General",
      color: "#FFD700",
      count: 6,
      intents: [
        "Information request",
        "Newsletter",
        "Notification",
        "Feedback request",
        "Survey invitation",
        "General inquiry"
      ]
    }
  ];

  return (
    <div className="py-8">
      {/* Domain Tree */}
      <div className="space-y-4">
        {taxonomy.map((item, i) => (
          <DomainNode
            key={i}
            {...item}
            isExpanded={expandedDomains.includes(item.domain)}
            onToggle={() => toggleDomain(item.domain)}
          />
        ))}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-8 border-t border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SummaryStat label="Total Domains" value="7" />
          <SummaryStat label="Total Intents" value="43" />
          <SummaryStat label="Avg per Domain" value="6.1" />
          <SummaryStat label="Coverage" value="91.7%" />
        </div>
      </div>
    </div>
  );
}

/**
 * Domain Node (Expandable)
 */
function DomainNode({
  domain,
  color,
  count,
  intents,
  isExpanded,
  onToggle
}: {
  domain: string;
  color: string;
  count: number;
  intents: string[];
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden">
      {/* Domain Header (Clickable) */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-800/70 transition-colors"
      >
        <div className="flex items-center gap-3">
          {/* Domain Name */}
          <div className="text-left">
            <h3 className="text-lg font-bold text-white">{domain}</h3>
            <div className="text-xs text-gray-400">
              {count} intent{count !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="flex items-center gap-3">
          {/* Color Bar */}
          <div
            className="w-12 h-1 rounded-full"
            style={{ backgroundColor: color }}
          />

          {/* Arrow */}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Intent List (Expandable) */}
      {isExpanded && (
        <div className="border-t border-gray-700 bg-gray-900/50 p-4">
          <div className="grid md:grid-cols-2 gap-2">
            {intents.map((intent, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-100 p-2 rounded hover:bg-gray-800/50 transition-colors"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                {intent}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Summary Stat Card
 */
function SummaryStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center p-3 bg-gray-900/50 border border-gray-700 rounded">
      <div className="text-2xl font-bold text-terminal-gold mb-1">{value}</div>
      <div className="text-xs text-gray-400">{label}</div>
    </div>
  );
}

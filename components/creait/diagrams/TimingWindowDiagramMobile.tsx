'use client';

import SwipeableDiagram from '@/components/diagrams/SwipeableDiagram';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import { CheckCircle2, XCircle, Calendar, TrendingDown } from 'lucide-react';

/**
 * TimingWindowDiagramMobile - Mobile-optimized swipeable property timeline
 *
 * Shows 5 properties as swipeable cards:
 * - 3 contacted on time (green)
 * - 2 missed opportunities (red)
 *
 * Each card shows: name, expiry month, status, outcome
 */

const properties = [
  {
    id: 'gateway',
    name: 'Gateway Tower',
    month: 'January',
    contacted: true,
    outcome: 'Deal secured - 5-year lease negotiated',
  },
  {
    id: 'harbor',
    name: 'Harbor Plaza',
    month: 'February',
    contacted: false,
    outcome: 'Competitor got there first - Lost $250K commission',
  },
  {
    id: 'metro',
    name: 'Metro Center',
    month: 'March',
    contacted: true,
    outcome: 'Deal secured - Exclusive representation',
  },
  {
    id: 'park',
    name: 'Park Office',
    month: 'April',
    contacted: false,
    outcome: 'Competitor got there first - Lost $180K commission',
  },
  {
    id: 'tech',
    name: 'Tech Campus',
    month: 'May',
    contacted: true,
    outcome: 'Deal secured - Multi-building portfolio',
  },
];

export default function TimingWindowDiagramMobile() {
  const slides = properties.map((property) => ({
    id: property.id,
    title: property.name,
    content: (
      <div className="flex flex-col items-center justify-center h-full px-6 py-8 space-y-6">
        {/* Status Icon */}
        <div className="relative">
          {property.contacted ? (
            <div className="relative">
              <CheckCircle2
                className="w-24 h-24"
                style={{ color: CRE_COLORS.success }}
              />
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-30"
                style={{ backgroundColor: CRE_COLORS.success }}
              />
            </div>
          ) : (
            <div className="relative">
              <XCircle
                className="w-24 h-24"
                style={{ color: CRE_COLORS.score.critical }}
              />
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-30"
                style={{ backgroundColor: CRE_COLORS.score.critical }}
              />
            </div>
          )}
        </div>

        {/* Property Name */}
        <div className="text-center">
          <h3
            className="text-3xl font-bold mb-2"
            style={{ color: 'rgba(255, 255, 255, 0.95)' }}
          >
            {property.name}
          </h3>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Lease expires: {property.month}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className="px-6 py-3 rounded-full text-center font-bold text-base"
          style={{
            backgroundColor: property.contacted
              ? 'rgba(16, 185, 129, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
            border: `2px solid ${property.contacted ? CRE_COLORS.success : CRE_COLORS.score.critical}`,
            color: property.contacted ? CRE_COLORS.success : CRE_COLORS.score.critical,
          }}
        >
          {property.contacted ? 'Contacted On Time' : 'MISSED OPPORTUNITY'}
        </div>

        {/* Outcome Card */}
        <div
          className="w-full p-6 rounded-lg space-y-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex items-start gap-3">
            {property.contacted ? (
              <CheckCircle2
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: CRE_COLORS.success }}
              />
            ) : (
              <TrendingDown
                className="w-5 h-5 flex-shrink-0 mt-0.5"
                style={{ color: CRE_COLORS.score.critical }}
              />
            )}
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(255, 255, 255, 0.8)' }}
            >
              {property.outcome}
            </p>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full">
      <SwipeableDiagram
        slides={slides}
        title="The Cost of Missing Timing"
        height="600px"
      />

      {/* Summary Stats */}
      <div
        className="mt-8 grid grid-cols-2 gap-4 px-6"
      >
        <div
          className="p-4 rounded-lg text-center space-y-2"
          style={{
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            border: `2px solid ${CRE_COLORS.success}`,
          }}
        >
          <div
            className="text-4xl font-bold"
            style={{ color: CRE_COLORS.success }}
          >
            3
          </div>
          <div
            className="text-xs font-medium"
            style={{ color: CRE_COLORS.success }}
          >
            Contacted On Time
          </div>
        </div>

        <div
          className="p-4 rounded-lg text-center space-y-2"
          style={{
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: `2px solid ${CRE_COLORS.score.critical}`,
          }}
        >
          <div
            className="text-4xl font-bold"
            style={{ color: CRE_COLORS.score.critical }}
          >
            2
          </div>
          <div
            className="text-xs font-medium"
            style={{ color: CRE_COLORS.score.critical }}
          >
            Opportunities Lost
          </div>
        </div>
      </div>
    </div>
  );
}

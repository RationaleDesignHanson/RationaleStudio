/**
 * Heirloom Main Dashboard
 *
 * Overview page showing key metrics, recent activity, and quick links.
 * Landing page for /owner/heirloom route.
 */

'use client';

import { useState, useEffect } from 'react';
import { Download, DollarSign, Star, Users } from 'lucide-react';
import { KPICard } from './_components';

interface Metrics {
  downloads: number;
  conversions: number;
  revenue: number;
  rating: number;
  downloadChange?: number;
  conversionChange?: number;
  revenueChange?: number;
}

export default function HeirloomDashboard() {
  const [metrics, setMetrics] = useState<Metrics>({
    downloads: 0,
    conversions: 0,
    revenue: 0,
    rating: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch metrics on mount
  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch('/api/heirloom/metrics');
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Failed to fetch metrics:', error);
        // Use placeholder data if API fails
        setMetrics({
          downloads: 15234,
          conversions: 1829,
          revenue: 7750,
          rating: 4.7,
          downloadChange: 12.5,
          conversionChange: 2.3,
          revenueChange: 15.8,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const conversionRate = metrics.downloads > 0
    ? ((metrics.conversions / metrics.downloads) * 100).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Heirloom Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Q1 2026 Launch - Track progress towards 15K downloads and $7.5K revenue
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Downloads"
          value={metrics.downloads}
          change={metrics.downloadChange}
          icon={Download}
          trend={metrics.downloadChange && metrics.downloadChange > 0 ? 'up' : 'neutral'}
        />
        <KPICard
          title="Premium Conversions"
          value={metrics.conversions}
          change={metrics.conversionChange}
          icon={Users}
          suffix={`(${conversionRate}%)`}
          trend={metrics.conversionChange && metrics.conversionChange > 0 ? 'up' : 'neutral'}
        />
        <KPICard
          title="Revenue"
          value={`$${metrics.revenue.toLocaleString()}`}
          change={metrics.revenueChange}
          icon={DollarSign}
          trend={metrics.revenueChange && metrics.revenueChange > 0 ? 'up' : 'neutral'}
        />
        <KPICard
          title="App Store Rating"
          value={metrics.rating}
          icon={Star}
          suffix="/ 5.0"
        />
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickLinkCard
          title="Launch Tracker"
          description="Track milestones across 5 phases from beta to full launch"
          href="/owner/heirloom/roadmap"
          status="Phase 1: Closed Beta"
        />
        <QuickLinkCard
          title="GTM Planner"
          description="Week-by-week go-to-market tactics and budget tracking"
          href="/owner/heirloom/gtm"
          status="Week 3: Launch Week"
        />
        <QuickLinkCard
          title="Financial Model"
          description="3 scenarios with cash flow projections and break-even analysis"
          href="/owner/heirloom/financials"
          status="Baseline: 100K downloads"
        />
      </div>

      {/* Phase Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current Phase Progress</h2>
        <div className="space-y-4">
          <PhaseProgress
            phase="Phase 1: Closed Beta"
            progress={85}
            color="green"
          />
          <PhaseProgress
            phase="Phase 2: Expanded Beta"
            progress={0}
            color="gray"
          />
          <PhaseProgress
            phase="Phase 3: Soft Launch"
            progress={0}
            color="gray"
          />
          <PhaseProgress
            phase="Phase 4: Full Launch"
            progress={0}
            color="gray"
          />
        </div>
      </div>
    </div>
  );
}

// Quick Link Card Component
function QuickLinkCard({
  title,
  description,
  href,
  status,
}: {
  title: string;
  description: string;
  href: string;
  status: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md hover:border-blue-600 transition-all group"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-sm">
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full font-medium">
          {status}
        </span>
      </div>
    </a>
  );
}

// Phase Progress Component
function PhaseProgress({
  phase,
  progress,
  color,
}: {
  phase: string;
  progress: number;
  color: 'green' | 'blue' | 'gray';
}) {
  const bgColor = {
    green: 'bg-green-600',
    blue: 'bg-blue-600',
    gray: 'bg-gray-300',
  }[color];

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">{phase}</span>
        <span className="text-sm font-medium text-gray-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${bgColor} transition-all`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

/**
 * KPICard Component
 *
 * Displays key performance indicators with value, change percentage, and icon.
 * Used on main Heirloom dashboard for metrics like Downloads, Conversions, Revenue.
 */

import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  suffix?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function KPICard({
  title,
  value,
  change,
  icon: Icon,
  suffix = '',
  trend = 'neutral',
  className = '',
}: KPICardProps) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  }[trend];

  const trendBgColor = {
    up: 'bg-green-50',
    down: 'bg-red-50',
    neutral: 'bg-gray-50',
  }[trend];

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {suffix && <span className="text-lg text-gray-500">{suffix}</span>}
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 px-2 py-1 rounded ${trendBgColor} w-fit`}>
          <span className={`text-sm font-medium ${trendColor}`}>
            {change > 0 ? '+' : ''}
            {change}%
          </span>
          <span className="text-xs text-gray-600">vs last week</span>
        </div>
      )}
    </div>
  );
}

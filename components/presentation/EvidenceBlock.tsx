/**
 * Evidence Block Component (Shared)
 * Displays evidence items with status indicators
 *
 * Supports: exists (green), missing (red), broken (yellow), info (blue)
 * Used across all Rationale presentations for diagnostic data
 */

'use client';

import { SEMANTIC_COLORS } from '@/lib/presentation/design-tokens';

export type EvidenceStatus = 'exists' | 'missing' | 'broken' | 'info';

export interface EvidenceItem {
  label: string;
  value: string;
  status?: EvidenceStatus;
}

interface EvidenceBlockProps {
  evidence: EvidenceItem[];
  title?: string;
  columns?: 1 | 2;
  className?: string;
}

const STATUS_COLORS = {
  exists: SEMANTIC_COLORS.success,    // Green
  missing: SEMANTIC_COLORS.error,      // Red
  broken: SEMANTIC_COLORS.warning,     // Amber
  info: SEMANTIC_COLORS.info,          // Blue
};

export default function EvidenceBlock({
  evidence,
  title = 'Evidence',
  columns = 2,
  className = ''
}: EvidenceBlockProps) {
  if (!evidence || evidence.length === 0) return null;

  const gridClass = columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1';

  return (
    <div className={`mt-6 p-6 bg-gray-900/40 rounded-lg border border-gray-700 ${className}`}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
        {title}
      </h3>
      <div className={`grid ${gridClass} gap-4`}>
        {evidence.map((item, index) => {
          const statusColor = item.status
            ? STATUS_COLORS[item.status]
            : STATUS_COLORS.info;

          return (
            <div key={index} className="flex items-start gap-3">
              {/* Status indicator dot */}
              <div className="flex-shrink-0 mt-0.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusColor }}
                  title={item.status || 'info'}
                  aria-label={`Status: ${item.status || 'info'}`}
                />
              </div>

              {/* Evidence content */}
              <div className="flex-1">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-gray-200 font-mono break-all">
                  {item.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

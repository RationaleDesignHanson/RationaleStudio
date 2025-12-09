/**
 * IntentClassification Component (Step 1)
 * Displays intent classification results
 * Rationale design system
 */

'use client';

import type { ClassificationResult } from '@/lib/zero-sequence/types';
import { formatCurrency } from '@/lib/zero-sequence/utils';

interface IntentClassificationProps {
  data: ClassificationResult;
}

export default function IntentClassification({ data }: IntentClassificationProps) {
  const confidencePercent = Math.round(data.confidence * 100);

  return (
    <div className="space-y-6">
      {/* Main Intent Display */}
      <div className="p-6 bg-gray-900 border-2 border-[#FFD700] rounded-lg">
        <div className="text-sm text-gray-400 mb-3">Detected Intent</div>
        <div className="text-2xl font-bold text-white">
          {data.detectedIntent.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Confidence Score */}
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded">
          <div className="text-xs font-semibold text-gray-400 mb-2">Confidence</div>
          <div className="text-xl font-bold text-white">
            {confidencePercent}%
          </div>
          <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#FFD700] transition-all duration-500"
              style={{ width: `${confidencePercent}%` }}
            />
          </div>
        </div>

        {/* Source */}
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded">
          <div className="text-xs font-semibold text-gray-400 mb-2">Source</div>
          <div className="text-sm text-white">
            {data.source}
          </div>
        </div>

        {/* Processing Time */}
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded">
          <div className="text-xs font-semibold text-gray-400 mb-2">Processing Time</div>
          <div className="text-sm text-white">
            {data.processingTime}
          </div>
        </div>
      </div>

      {/* Deadline & Payment (if present) */}
      {(data.deadline || data.paymentAmount) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.deadline && (
            <div className="p-4 bg-gray-800 border border-[#FFD700] rounded-lg">
              <div className="text-sm text-[#FFD700] mb-2">Deadline Detected</div>
              <div className="text-lg font-semibold text-white">
                {data.deadline}
              </div>
            </div>
          )}

          {data.paymentAmount && (
            <div className="p-4 bg-gray-800 border border-[#FFD700] rounded-lg">
              <div className="text-sm text-[#FFD700] mb-2">Payment Detected</div>
              <div className="text-lg font-semibold text-white">
                {formatCurrency(data.paymentAmount)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Suggested Actions */}
      {data.suggestedActions.length > 0 && (
        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded">
          <div className="text-xs font-semibold text-gray-400 mb-3">Suggested Actions</div>
          <ul className="space-y-2">
            {data.suggestedActions.map((action, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-[#FFD700] text-sm mt-1">›</span>
                <span className="text-sm text-white">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

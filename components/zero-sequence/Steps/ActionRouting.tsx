/**
 * ActionRouting Component (Step 3)
 * Displays matched actions with primary action highlighted
 * Terminal Republic styling
 */

'use client';

import type { ActionData } from '@/lib/zero-sequence/types';

interface ActionRoutingProps {
  data: ActionData;
}

export default function ActionRouting({ data }: ActionRoutingProps) {
  return (
    <div className="space-y-6">
      {/* Action Count */}
      <div className="p-6 bg-gray-900 border-2 border-terminal-gold rounded-lg">
        <div className="text-sm text-gray-400 mb-3">Matched Actions</div>
        <div className="text-3xl font-bold text-white">
          {data.actions.length}
        </div>
      </div>

      {/* Primary Action (if present) */}
      {data.primaryAction && (
        <div className="p-5 bg-gray-800 border-2 border-terminal-gold rounded-lg">
          <div className="text-sm text-terminal-gold font-semibold mb-3">
            Primary Action
          </div>

          <div className="space-y-3">
            <h4 className="text-xl font-bold text-white">
              {data.primaryAction.title}
            </h4>

            <p className="text-sm text-gray-300">
              {data.primaryAction.description}
            </p>

            <div className="flex items-center gap-6 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-400">Modal Steps:</span>
                <span className="text-sm font-bold text-terminal-gold">
                  {data.primaryAction.modalCount}
                </span>
              </div>

              {data.primaryAction.confidence !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-400">Confidence:</span>
                  <span className="text-sm font-bold text-terminal-gold">
                    {Math.round(data.primaryAction.confidence * 100)}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* All Actions */}
      {data.actions.length > 0 && (
        <div className="space-y-3">
          <div className="text-xs font-semibold text-gray-400 mb-2">
            All Actions
          </div>

          {data.actions.map((action) => {
            const isPrimary = data.primaryAction?.actionId === action.actionId;

            return (
              <div
                key={action.actionId}
                className={`
                  p-4
                  ${isPrimary ? 'bg-gray-800/30' : 'bg-gray-800/50'}
                  border ${isPrimary ? 'border-[#FFD700]/30' : 'border-gray-700'}
                  rounded-lg
                  transition-all
                  hover:border-terminal-gold/50
                `}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <h5 className="text-base font-bold text-white">
                      {action.title}
                    </h5>

                    {isPrimary && (
                      <span className="text-xs text-terminal-gold font-semibold">
                        Primary
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-400">
                    {action.description}
                  </p>

                  <div className="flex items-center gap-4 pt-1">
                    <div className="text-xs text-gray-500">
                      {action.modalCount} modal{action.modalCount !== 1 ? 's' : ''}
                    </div>

                    {action.confidence !== undefined && (
                      <div className="text-xs text-gray-500">
                        {Math.round(action.confidence * 100)}% confidence
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* No actions found */}
      {data.actions.length === 0 && (
        <div className="p-8 text-center bg-gray-800/30 border border-gray-700 rounded">
          <div className="text-gray-500 text-sm">
            No actions matched
          </div>
        </div>
      )}
    </div>
  );
}

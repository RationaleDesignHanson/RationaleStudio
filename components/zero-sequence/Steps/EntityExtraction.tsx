/**
 * EntityExtraction Component (Step 2)
 * Displays extracted entities grouped by type
 * Rationale design system
 */

'use client';

import type { EntityData, Entity } from '@/lib/zero-sequence/types';

interface EntityExtractionProps {
  data: EntityData;
}

const ENTITY_TYPE_CONFIG: Record<Entity['type'], {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  amount: {
    label: 'Amount',
    color: 'text-[#FFD700]',
    bgColor: 'bg-[#FFD700]/10',
    borderColor: 'border-[#FFD700]',
  },
  date: {
    label: 'Date',
    color: 'text-[#FFD700]',
    bgColor: 'bg-[#FFD700]/10',
    borderColor: 'border-[#FFD700]',
  },
  location: {
    label: 'Location',
    color: 'text-gray-300',
    bgColor: 'bg-gray-700/30',
    borderColor: 'border-gray-600',
  },
  person: {
    label: 'Person',
    color: 'text-gray-300',
    bgColor: 'bg-gray-700/30',
    borderColor: 'border-gray-600',
  },
  organization: {
    label: 'Organization',
    color: 'text-gray-300',
    bgColor: 'bg-gray-700/30',
    borderColor: 'border-gray-600',
  },
  other: {
    label: 'Other',
    color: 'text-gray-400',
    bgColor: 'bg-gray-700/30',
    borderColor: 'border-gray-700',
  },
};

export default function EntityExtraction({ data }: EntityExtractionProps) {
  // Group entities by type
  const groupedEntities = data.entities.reduce((acc, entity) => {
    if (!acc[entity.type]) {
      acc[entity.type] = [];
    }
    acc[entity.type].push(entity);
    return acc;
  }, {} as Record<Entity['type'], Entity[]>);

  return (
    <div className="space-y-6">
      {/* Entity Count Summary */}
      <div className="p-6 bg-gray-900 border-2 border-[#FFD700] rounded-lg">
        <div className="text-sm text-gray-400 mb-3">Total Entities</div>
        <div className="text-3xl font-bold text-white">
          {data.totalCount}
        </div>
      </div>

      {/* Grouped Entities */}
      {Object.entries(groupedEntities).map(([type, entities]) => {
        const config = ENTITY_TYPE_CONFIG[type as Entity['type']];

        return (
          <div key={type} className="p-4 bg-gray-800/50 border border-gray-700 rounded">
            {/* Type Header */}
            <div className="flex items-center justify-between mb-3">
              <div className={`text-xs font-semibold ${config.color}`}>
                {config.label}
              </div>
              <div className="text-xs text-gray-500">
                {entities.length} found
              </div>
            </div>

            {/* Entity Chips */}
            <div className="flex flex-wrap gap-2">
              {entities.map((entity, index) => (
                <div
                  key={`${type}-${index}`}
                  className={`
                    inline-flex items-center gap-2
                    px-3 py-2
                    ${config.bgColor}
                    border ${config.borderColor}
                    rounded-full
                    transition-all
                  `}
                >
                  <span className="text-sm text-white">
                    {entity.text}
                  </span>
                  {entity.confidence !== undefined && (
                    <span className={`text-xs ${config.color}`}>
                      {Math.round(entity.confidence * 100)}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* No entities found */}
      {data.totalCount === 0 && (
        <div className="p-8 text-center bg-gray-800/30 border border-gray-700 rounded">
          <div className="text-gray-500 text-sm">
            No entities detected
          </div>
        </div>
      )}
    </div>
  );
}

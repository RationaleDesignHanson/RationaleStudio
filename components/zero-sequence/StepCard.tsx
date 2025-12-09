/**
 * StepCard Component
 * Reusable wrapper for Zero Sequence step displays
 * Progressive disclosure with Terminal Republic styling
 */

'use client';

import { ReactNode } from 'react';

export type StepStatus = 'pending' | 'processing' | 'complete' | 'error';

interface StepCardProps {
  title: string;
  status: StepStatus;
  children?: ReactNode;
  stepNumber?: number;
}

const STATUS_CONFIG: Record<StepStatus, {
  borderColor: string;
  bgColor: string;
  labelColor: string;
  label: string;
}> = {
  pending: {
    borderColor: 'border-gray-700',
    bgColor: 'bg-gray-900/50',
    labelColor: 'text-gray-500',
    label: 'Pending',
  },
  processing: {
    borderColor: 'border-[#FFD700]',
    bgColor: 'bg-gray-900',
    labelColor: 'text-[#FFD700]',
    label: 'Processing',
  },
  complete: {
    borderColor: 'border-[#FFD700]',
    bgColor: 'bg-gray-900',
    labelColor: 'text-[#FFD700]',
    label: 'Complete',
  },
  error: {
    borderColor: 'border-red-500',
    bgColor: 'bg-gray-900',
    labelColor: 'text-red-500',
    label: 'Error',
  },
};

export default function StepCard({
  title,
  status,
  children,
  stepNumber,
}: StepCardProps) {
  const config = STATUS_CONFIG[status];
  const isExpanded = status === 'processing' || status === 'complete' || status === 'error';

  return (
    <div
      className={`
        border-2 ${config.borderColor}
        ${config.bgColor}
        rounded-lg
        transition-all duration-500 ease-in-out
      `}
      role="region"
      aria-label={`${title} - ${status}`}
      aria-expanded={isExpanded}
    >
      {/* Header */}
      <div className="p-4 flex items-center gap-4">
        {/* Step Number (optional) */}
        {stepNumber !== undefined && (
          <div
            className={`
              flex items-center justify-center
              w-8 h-8
              border-2 ${config.borderColor}
              ${status === 'complete' || status === 'processing' ? config.bgColor : 'bg-black'}
              rounded-full
              font-mono text-sm font-bold ${config.labelColor}
              transition-all duration-300
            `}
          >
            {stepNumber}
          </div>
        )}

        {/* Title */}
        <h3 className="flex-1 text-lg font-semibold text-white">
          {title}
        </h3>

        {/* Status Label */}
        <span className={`text-xs font-semibold ${config.labelColor}`}>
          {config.label}
        </span>
      </div>

      {/* Content (Progressive Disclosure) */}
      <div
        className={`
          overflow-hidden
          transition-all duration-500 ease-in-out
          ${isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="px-4 pb-4 pt-2 border-t border-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}

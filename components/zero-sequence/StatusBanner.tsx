/**
 * Status Banner Component
 * Displays status messages for the Zero Sequence demo
 * Terminal Republic styling: gold borders, monospace labels
 */

'use client';

import { useEffect, useState } from 'react';

export type StatusType = 'success' | 'error' | 'loading' | 'info';

interface StatusBannerProps {
  message: string;
  type: StatusType;
  autoHide?: boolean;
  autoHideDelay?: number;
  onClose?: () => void;
}

const STATUS_CONFIG: Record<StatusType, {
  borderColor: string;
  bgColor: string;
  textColor: string;
  label: string;
}> = {
  success: {
    borderColor: 'border-[#FFD700]',
    bgColor: 'bg-[#FFD700]/10',
    textColor: 'text-[#FFD700]',
    label: '[COMPLETE]',
  },
  error: {
    borderColor: 'border-red-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-500',
    label: '[ERROR]',
  },
  loading: {
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-400/10',
    textColor: 'text-gray-400',
    label: '[PROCESSING]',
  },
  info: {
    borderColor: 'border-gray-500',
    bgColor: 'bg-gray-500/10',
    textColor: 'text-gray-300',
    label: '[INFO]',
  },
};

export default function StatusBanner({
  message,
  type,
  autoHide = false,
  autoHideDelay = 5000,
  onClose,
}: StatusBannerProps) {
  const [visible, setVisible] = useState(true);
  const config = STATUS_CONFIG[type];

  useEffect(() => {
    if (autoHide && type === 'success') {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, autoHideDelay);
      return () => clearTimeout(timer);
    }
  }, [autoHide, autoHideDelay, type, onClose]);

  if (!visible) return null;

  return (
    <div
      className={`
        flex items-center gap-4 p-4
        border-l-4 ${config.borderColor}
        ${config.bgColor}
        rounded-r
        transition-all duration-300
      `}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Status Label (monospace, Terminal Republic style) */}
      <span className={`font-mono text-xs font-bold ${config.textColor}`}>
        {config.label}
      </span>

      {/* Message */}
      <span className="flex-1 text-sm text-white">
        {message}
      </span>

      {/* Close button (optional) */}
      {onClose && (
        <button
          onClick={() => {
            setVisible(false);
            onClose();
          }}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Close status message"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

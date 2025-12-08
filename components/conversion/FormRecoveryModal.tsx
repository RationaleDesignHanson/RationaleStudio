/**
 * Form Recovery Modal Component
 *
 * Prompts users to restore previously abandoned form data.
 * Shows when returning user has saved form state in localStorage.
 */

'use client';

import { useEffect, useState } from 'react';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface FormRecoveryModalProps {
  formId: string;
  title?: string;
  message?: string;
  onRestore: (data: Record<string, any>) => void;
  onReject: () => void;
  getSavedData: () => Record<string, any> | null;
}

export function FormRecoveryModal({
  formId,
  title = "Continue where you left off?",
  message = "We noticed you started filling out this form. Would you like to restore your previous input?",
  onRestore,
  onReject,
  getSavedData,
}: FormRecoveryModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [savedData, setSavedData] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Check for saved form data on mount
    const data = getSavedData();
    if (data && Object.keys(data).length > 0) {
      setSavedData(data);
      setIsVisible(true);

      // Track that recovery was shown
      trackEvent(AnalyticsEvents.FORM_RECOVERY_SHOWN, {
        form_id: formId,
        fields_count: Object.keys(data).length,
      });
    }
  }, [formId, getSavedData]);

  const handleRestore = () => {
    if (savedData) {
      onRestore(savedData);
    }
    setIsVisible(false);
  };

  const handleReject = () => {
    onReject();
    setIsVisible(false);
  };

  if (!isVisible || !savedData) return null;

  const fieldCount = Object.keys(savedData).length;

  // Format field names for display (convert camelCase to Title Case)
  const formatFieldName = (key: string): string => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .trim();
  };

  // Truncate value for preview
  const truncateValue = (value: any): string => {
    if (!value) return '(empty)';
    const strValue = String(value);
    return strValue.length > 50 ? `${strValue.substring(0, 50)}...` : strValue;
  };

  // Get preview fields (first 4 fields, excluding sensitive data)
  const sensitiveFields = ['password', 'creditCard', 'ssn', 'cvv'];
  const previewFields = Object.entries(savedData)
    .filter(([key]) => !sensitiveFields.some(sf => key.toLowerCase().includes(sf.toLowerCase())))
    .slice(0, 4);
  const remainingCount = fieldCount - previewFields.length;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={handleReject}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
        <div
          className="bg-background border border-accent/20 rounded-lg shadow-2xl max-w-lg w-full p-6 sm:p-8 pointer-events-auto animate-in zoom-in-95 duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              {title}
            </h2>
            <p className="text-sm sm:text-base text-muted mb-4 leading-relaxed">
              {message}
            </p>

            {/* Data Preview */}
            {previewFields.length > 0 && (
              <div className="mb-6 text-left">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">
                  Saved Information:
                </p>
                <div className="bg-accent/5 border border-accent/10 rounded-md p-4 space-y-2">
                  {previewFields.map(([key, value]) => (
                    <div key={key} className="flex items-start gap-2">
                      <svg
                        className="w-4 h-4 text-accent mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground">
                          {formatFieldName(key)}
                        </p>
                        <p className="text-xs text-muted truncate">
                          {truncateValue(value)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {remainingCount > 0 && (
                    <p className="text-xs text-muted italic pt-1">
                      + {remainingCount} more field{remainingCount !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleRestore}
                className="w-full px-6 py-3 text-base font-medium text-white bg-accent rounded-md hover:bg-accent/90 transition-colors"
              >
                Restore my input
              </button>
              <button
                onClick={handleReject}
                className="w-full px-6 py-3 text-base font-medium text-muted border border-border rounded-md hover:bg-accent/5 hover:border-accent transition-colors"
              >
                Start fresh
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

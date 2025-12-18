/**
 * ShareModal Component
 *
 * Modal for sharing a recipe with copy-to-clipboard functionality
 * Generates share link and displays QR code (future)
 */

'use client';

import React, { useState, useEffect } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipeId: string;
  recipeTitle: string;
}

export function ShareModal({ isOpen, onClose, recipeId, recipeTitle }: ShareModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Generate share link when modal opens
  useEffect(() => {
    if (isOpen && !shareUrl) {
      generateShareLink();
    }
  }, [isOpen, recipeId]);

  const generateShareLink = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/recipes/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeId }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate share link');
      }

      // Get full URL
      const fullUrl = `${window.location.origin}${data.shareUrl}`;
      setShareUrl(fullUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      // Reset copied state after 3 seconds
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      // Fallback: select text for manual copy
      const input = document.getElementById('share-url-input') as HTMLInputElement;
      if (input) {
        input.select();
      }
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setShareUrl(null);
    setCopied(false);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 m-4"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
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

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#2D2D2D] mb-2">
            Share Recipe
          </h2>
          <p className="text-gray-600">
            {recipeTitle}
          </p>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-[#E85D4D] border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <span className="text-red-600 text-xl">⚠</span>
                <div>
                  <p className="text-red-800 font-medium">Failed to generate share link</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
              </div>
              <button
                onClick={generateShareLink}
                className="mt-3 text-sm text-red-700 hover:text-red-900 font-medium"
              >
                Try again
              </button>
            </div>
          )}

          {shareUrl && !loading && (
            <>
              {/* Share link input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Share Link
                </label>
                <div className="flex gap-2">
                  <input
                    id="share-url-input"
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${copied
                        ? 'bg-green-500 text-white'
                        : 'bg-[#E85D4D] text-white hover:bg-[#D94D3D]'
                      }
                    `}
                  >
                    {copied ? (
                      <span className="flex items-center gap-1">
                        <span>✓</span>
                        <span>Copied</span>
                      </span>
                    ) : (
                      'Copy'
                    )}
                  </button>
                </div>
              </div>

              {/* Info message */}
              <div className="bg-[#FBF8F3] border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Anyone with this link</span> can view this recipe, even if they don't have an account.
                </p>
              </div>

              {/* Share methods (future) */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Share via
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {/* Email */}
                  <a
                    href={`mailto:?subject=${encodeURIComponent(`Check out this recipe: ${recipeTitle}`)}&body=${encodeURIComponent(`I thought you might like this recipe:\n\n${recipeTitle}\n\n${shareUrl}`)}`}
                    className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">📧</span>
                    <span className="text-xs text-gray-600">Email</span>
                  </a>

                  {/* SMS */}
                  <a
                    href={`sms:?&body=${encodeURIComponent(`Check out this recipe: ${recipeTitle}\n${shareUrl}`)}`}
                    className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">💬</span>
                    <span className="text-xs text-gray-600">SMS</span>
                  </a>

                  {/* More options */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: recipeTitle,
                          text: `Check out this recipe: ${recipeTitle}`,
                          url: shareUrl,
                        }).catch(err => console.log('Share cancelled', err));
                      }
                    }}
                    className="flex flex-col items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">⋯</span>
                    <span className="text-xs text-gray-600">More</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to manage ShareModal state
 * Usage:
 *   const shareModal = useShareModal();
 *   shareModal.open(recipeId, recipeTitle);
 *   <ShareModal {...shareModal.props} />
 */
export function useShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [recipeId, setRecipeId] = useState('');
  const [recipeTitle, setRecipeTitle] = useState('');

  const open = (id: string, title: string) => {
    setRecipeId(id);
    setRecipeTitle(title);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return {
    open,
    close,
    props: {
      isOpen,
      onClose: close,
      recipeId,
      recipeTitle,
    },
  };
}

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExitIntentModalProps {
  enabled?: boolean;
  onCapture?: (email: string) => void;
}

/**
 * Exit Intent Modal Component
 * Captures users before they leave the demo (mobile-optimized)
 * Shows compelling offer to join waitlist
 */
export default function ExitIntentModal({ enabled = true, onCapture }: ExitIntentModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!enabled || hasTriggered) return;

    // Mobile exit detection: monitor scroll to top (common exit behavior)
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      // If user scrolls to very top quickly, they might be exiting
      if (window.scrollY < 50) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          if (window.scrollY < 50 && !hasTriggered) {
            triggerModal();
          }
        }, 500);
      }
    };

    // Desktop exit detection: mouse leaving viewport
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        triggerModal();
      }
    };

    // Time-based trigger: after 30 seconds of engagement
    const timeoutId = setTimeout(() => {
      if (!hasTriggered) {
        triggerModal();
      }
    }, 30000);

    const triggerModal = () => {
      setIsVisible(true);
      setHasTriggered(true);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(scrollTimeout);
      clearTimeout(timeoutId);
    };
  }, [enabled, hasTriggered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (onCapture) {
      onCapture(email);
    }

    setIsSubmitting(false);
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[1000]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md md:w-full z-[1001]"
          >
            <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-6 md:p-8 border-2 border-purple-500/30 shadow-2xl h-full md:h-auto flex flex-col">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close modal"
              >
                ×
              </button>

              {/* Emoji Hero */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-4xl mb-4 shadow-2xl">
                  ⚡
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
                  Wait! Before You Go...
                </h2>
                <p className="text-base text-white/80">
                  Get early access to Zero and never drown in your inbox again
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-sm text-white/90">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Save 2+ hours daily</div>
                    <div className="text-xs text-white/60">AI handles email triage automatically</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/90">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Never miss important emails</div>
                    <div className="text-xs text-white/60">Smart AI prioritization</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-sm text-white/90">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-green-400">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">One-tap actions</div>
                    <div className="text-xs text-white/60">Pay, sign, track, schedule instantly</div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 mt-auto">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Joining...
                    </div>
                  ) : (
                    'Get Early Access'
                  )}
                </button>
              </form>

              {/* Trust Badge */}
              <div className="mt-4 text-center">
                <div className="text-xs text-white/50">
                  🔒 We respect your privacy. Unsubscribe anytime.
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

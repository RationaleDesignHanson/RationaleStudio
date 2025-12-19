'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import { SuggestedAction } from './types';

interface ActionFlowModalProps {
  action: SuggestedAction;
  onClose: () => void;
}

interface ModalFlow {
  title: string;
  steps: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}

const getModalFlow = (actionId: string, context: any): ModalFlow | null => {
  switch (actionId) {
    case 'track_package':
      return {
        title: 'Track Package',
        steps: [
          {
            label: '1. Shipping Email',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">Your order has shipped</div>
                <div className="text-sm opacity-80 mb-3">
                  {context.carrier} • Arrives {context.estimatedDelivery || 'Tomorrow'}
                </div>
                <div className="inline-flex px-4 py-2 bg-orange-500/30 rounded-lg text-sm">
                  <span className="mr-2">📦</span> Track
                </div>
              </div>
            )
          },
          {
            label: '2. Tracking Details',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">📦 Package Tracking</div>
                <div className="bg-white/10 p-3 rounded-lg mb-3">
                  <div className="text-xs opacity-70">Status</div>
                  <div className="font-semibold text-yellow-400">Out for Delivery</div>
                </div>
                <div className="flex gap-2 mt-3">
                  <div className="flex-1 h-1 bg-green-500/80 rounded" />
                  <div className="flex-1 h-1 bg-green-500/80 rounded" />
                  <div className="flex-1 h-1 bg-white/20 rounded" />
                </div>
              </div>
            )
          },
          {
            label: '3. Live Updates',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Tracking Active</div>
                <div className="opacity-80">Push notifications enabled</div>
              </div>
            )
          }
        ]
      };

    case 'sign_form':
      return {
        title: 'Sign Form',
        steps: [
          {
            label: '1. Form Email',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">Permission Form</div>
                <div className="text-sm opacity-80 mb-3">Signature required</div>
                <div className="inline-flex px-4 py-2 bg-purple-500/30 rounded-lg text-sm">
                  <span className="mr-2">✍️</span> Sign
                </div>
              </div>
            )
          },
          {
            label: '2. Draw Signature',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">✍️ Sign Form</div>
                <div className="bg-white/95 h-20 rounded-lg flex items-center justify-center text-gray-500 italic">
                  Draw your signature
                </div>
              </div>
            )
          },
          {
            label: '3. Confirm',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">✍️ Confirm Signature</div>
                <div className="bg-purple-500/15 border-2 border-purple-500/40 p-4 rounded-xl mb-4">
                  <div className="font-semibold mb-2">{context.event || 'Permission Form'}</div>
                  <div className="text-sm opacity-80">Ready to send with your signature</div>
                </div>
                <div className="bg-purple-500/30 p-3 rounded-lg text-center font-semibold">
                  ✓ Send Signed Form
                </div>
              </div>
            )
          },
          {
            label: '4. Signed',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Form Signed!</div>
                <div className="opacity-80">Reply sent with signature</div>
              </div>
            )
          }
        ]
      };

    case 'pay_invoice':
    case 'pay_field_trip_fee':
      const amount = context.amount || context.paymentAmount || 0;
      return {
        title: 'Pay Invoice',
        steps: [
          {
            label: '1. Invoice Email',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">
                  {context.invoiceId || 'Payment Required'}
                </div>
                <div className="text-2xl font-bold text-yellow-400 my-2">${amount.toFixed(2)}</div>
                <div className="text-sm opacity-80 mb-3">
                  {context.dueDate ? `Due: ${context.dueDate}` : 'Payment required'}
                </div>
                <div className="inline-flex px-4 py-2 bg-green-500/30 rounded-lg text-sm">
                  <span className="mr-2">💳</span> Pay Now
                </div>
              </div>
            )
          },
          {
            label: '2. Payment Method',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">💳 Pay Invoice</div>
                <div className="bg-white/10 p-4 rounded-lg mb-3">
                  <div className="opacity-70 text-xs">Amount Due</div>
                  <div className="text-3xl font-bold text-yellow-400">${amount.toFixed(2)}</div>
                </div>
                <div className="bg-green-500/30 p-3 rounded-lg text-center font-semibold">
                   Pay with Apple Pay
                </div>
              </div>
            )
          },
          {
            label: '3. Processing',
            content: (
              <div className="bg-blue-500/15 border-2 border-blue-500/40 p-8 rounded-xl text-center">
                <div className="w-10 h-10 border-4 border-white/20 border-t-blue-500 rounded-full mx-auto mb-4 animate-spin" />
                <div className="font-semibold">Processing Payment...</div>
              </div>
            )
          },
          {
            label: '4. Complete',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Payment Sent!</div>
                <div className="opacity-80">
                  ${amount.toFixed(2)} paid to {context.recipient || 'recipient'}
                </div>
              </div>
            )
          }
        ]
      };

    case 'schedule_purchase':
      return {
        title: 'Schedule Purchase',
        steps: [
          {
            label: '1. Product',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">{context.productName || 'Product'}</div>
                <div className="text-sm opacity-80 mb-3">
                  Launches {context.launchDate || 'Soon'} at {context.launchTime || '10:00 AM'}
                </div>
                <div className="text-2xl font-bold text-yellow-400 mb-3">
                  ${context.estimatedPrice || 0}
                </div>
                <div className="bg-purple-500/30 px-4 py-2 rounded-lg text-sm inline-flex">
                  📅 Schedule
                </div>
              </div>
            )
          },
          {
            label: '2. Set Reminder',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">📅 Schedule Purchase</div>
                <div className="bg-white/10 p-3 rounded-lg mb-3">
                  <div className="font-semibold">{context.productName || 'Product'}</div>
                  <div className="text-sm opacity-70 mt-1">
                    {context.launchDate} at {context.launchTime}
                  </div>
                </div>
                <div className="bg-blue-500/30 p-3 rounded-lg text-center font-semibold">
                  Set Calendar Reminder
                </div>
              </div>
            )
          },
          {
            label: '3. Confirmed',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Reminder Set!</div>
                <div className="opacity-80">You'll be notified 15 minutes before</div>
              </div>
            )
          }
        ]
      };

    case 'copy_promo_code':
      return {
        title: 'Copy Promo Code',
        steps: [
          {
            label: '1. Promo Email',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">Flash Sale!</div>
                <div className="text-sm opacity-80 mb-3">{context.discount}% off everything</div>
                <div className="bg-pink-500/30 px-4 py-2 rounded-lg text-sm inline-flex">
                  <span className="mr-2">🎟️</span> Copy Code
                </div>
              </div>
            )
          },
          {
            label: '2. Code Copied',
            content: (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎟️</div>
                <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  {context.promoCode}
                </div>
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Code Copied!</div>
                <div className="opacity-80">Ready to paste at checkout</div>
              </div>
            )
          }
        ]
      };

    default:
      // Generic modal for unknown actions
      return {
        title: 'Action',
        steps: [
          {
            label: 'Complete',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">Action Complete!</div>
                <div className="opacity-80">{actionId}</div>
              </div>
            )
          }
        ]
      };
  }
};

const STEP_DURATION = 3000; // 3 seconds per step

export default function ActionFlowModal({ action, onClose }: ActionFlowModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Memoize flow to prevent recreation on every render
  const flow = useMemo(
    () => getModalFlow(action.actionId, action.context),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [action.actionId, JSON.stringify(action.context)]
  );

  // Manual navigation handlers
  const handleNext = () => {
    if (flow && currentStep < flow.steps.length - 1) {
      setIsAutoPlaying(false);
      setCurrentStep(currentStep + 1);
    } else if (currentStep === flow!.steps.length - 1) {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setIsAutoPlaying(false);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (flow) {
      setIsAutoPlaying(false);
      setCurrentStep(flow.steps.length - 1);
    }
  };

  useEffect(() => {
    // Reset progress when step changes
    setProgress(0);

    // Auto-advance through steps only if auto-playing
    if (isAutoPlaying && flow && currentStep < flow.steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, STEP_DURATION);
      return () => clearTimeout(timer);
    }
  }, [currentStep, flow, isAutoPlaying]);

  useEffect(() => {
    // Animate progress bar only when auto-playing
    if (isAutoPlaying && flow && currentStep < flow.steps.length - 1) {
      const startTime = Date.now();
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const newProgress = Math.min((elapsed / STEP_DURATION) * 100, 100);
        setProgress(newProgress);
      }, 16); // ~60fps
      return () => clearInterval(interval);
    } else if (currentStep === flow!.steps.length - 1) {
      // Last step - fill to 100%
      setProgress(100);
    }
  }, [currentStep, flow, isAutoPlaying]);

  if (!flow) return null;

  const currentStepData = flow.steps[currentStep];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 z-[700] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] rounded-3xl p-5 w-full max-h-[85%] border border-white/10 shadow-2xl overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-extrabold text-white">{flow.title}</h2>
              <span className="text-xs text-white/50 px-2 py-1 bg-white/10 rounded-full">
                {currentStep + 1} of {flow.steps.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Skip button - only show if not on last step */}
              {currentStep < flow.steps.length - 1 && (
                <button
                  onClick={handleSkip}
                  className="px-3 py-1.5 text-xs font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  Skip
                </button>
              )}
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white text-lg flex items-center justify-center hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
          </div>

          {/* Progress Steps - Instagram style */}
          <div className="flex items-center gap-1.5 mb-4">
            {flow.steps.map((step, index) => (
              <div key={index} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all"
                  style={{
                    width:
                      index < currentStep
                        ? '100%'
                        : index === currentStep
                        ? `${progress}%`
                        : '0%',
                    transition: index === currentStep ? 'width 0.016s linear' : 'width 0.3s ease'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Step Label */}
          <div className="text-xs font-bold text-white/60 mb-3 uppercase tracking-wider">
            {currentStepData.label}
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              {currentStepData.content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Previous step"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
              Prev
            </button>

            {/* Auto-play indicator */}
            {isAutoPlaying && currentStep < flow.steps.length - 1 && (
              <div className="text-xs text-white/50 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                Auto-playing
              </div>
            )}

            {/* Next/Done Button */}
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label={currentStep === flow.steps.length - 1 ? 'Done' : 'Next step'}
            >
              {currentStep === flow.steps.length - 1 ? (
                <>
                  Done
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </>
              ) : (
                <>
                  Next
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

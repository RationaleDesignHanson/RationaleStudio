/**
 * ModalStepContent Component
 * Reusable modal step content renderer adapted from ActionFlowModal
 * Displays step content inline without overlay/auto-play
 */

'use client';

import { motion } from 'framer-motion';

interface ModalStepContentProps {
  actionId: string;
  actionTitle: string;
  stepIndex: number;
  totalSteps: number;
  context?: Record<string, any>;
}

interface ModalFlow {
  title: string;
  steps: Array<{
    label: string;
    content: React.ReactNode;
  }>;
}

/**
 * Get modal flow with hardcoded JSX content from main demo
 * Adapted from components/zero/ActionFlowModal.tsx
 */
const getModalFlow = (actionId: string, actionTitle: string, context: any = {}): ModalFlow | null => {
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
                  {context.carrier || 'UPS'} • Arrives {context.estimatedDelivery || 'Tomorrow'}
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
                  💳 Pay with Apple Pay
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
                <div className="text-sm opacity-80 mb-3">{context.discount || 20}% off everything</div>
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
                  {context.promoCode || 'SAVE20'}
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

    case 'add_to_calendar':
    case 'check_in_flight':
      return {
        title: actionId === 'add_to_calendar' ? 'Add to Calendar' : 'Check In Flight',
        steps: [
          {
            label: '1. Email',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-base font-semibold mb-2">
                  {actionId === 'add_to_calendar' ? 'Appointment Reminder' : 'Flight Check-In'}
                </div>
                <div className="text-sm opacity-80 mb-3">
                  {actionId === 'add_to_calendar'
                    ? context.dateTime || 'Tomorrow at 2:00 PM'
                    : context.flightNumber || 'UA 1234'
                  }
                </div>
                <div className="inline-flex px-4 py-2 bg-blue-500/30 rounded-lg text-sm">
                  <span className="mr-2">{actionId === 'add_to_calendar' ? '📅' : '✈️'}</span>
                  {actionId === 'add_to_calendar' ? 'Add to Calendar' : 'Check In'}
                </div>
              </div>
            )
          },
          {
            label: '2. Confirm',
            content: (
              <div className="bg-white/5 p-4 rounded-xl">
                <div className="text-lg font-bold mb-4">
                  {actionId === 'add_to_calendar' ? '📅 Add Event' : '✈️ Check In'}
                </div>
                <div className="bg-white/10 p-3 rounded-lg mb-3">
                  <div className="font-semibold">
                    {actionId === 'add_to_calendar'
                      ? context.provider || 'Dr. Smith'
                      : context.flightNumber || 'UA 1234'
                    }
                  </div>
                  <div className="text-sm opacity-70 mt-1">
                    {actionId === 'add_to_calendar'
                      ? context.dateTime || 'Tomorrow at 2:00 PM'
                      : context.departureTime || 'Departs 10:30 AM'
                    }
                  </div>
                </div>
                <div className="bg-blue-500/30 p-3 rounded-lg text-center font-semibold">
                  ✓ Confirm
                </div>
              </div>
            )
          },
          {
            label: '3. Complete',
            content: (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-3xl mx-auto mb-4">
                  ✓
                </div>
                <div className="text-xl font-bold mb-2">
                  {actionId === 'add_to_calendar' ? 'Added to Calendar!' : 'Checked In!'}
                </div>
                <div className="opacity-80">
                  {actionId === 'add_to_calendar' ? 'Reminder set' : 'Boarding pass ready'}
                </div>
              </div>
            )
          }
        ]
      };

    default:
      // Generic modal for unknown actions
      return {
        title: actionTitle || 'Action',
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

export default function ModalStepContent({
  actionId,
  actionTitle,
  stepIndex,
  totalSteps,
  context = {},
}: ModalStepContentProps) {
  const flow = getModalFlow(actionId, actionTitle, context);

  if (!flow || !flow.steps[stepIndex]) {
    return (
      <div className="text-center py-8 text-gray-400">
        No content available for this step
      </div>
    );
  }

  const currentStepData = flow.steps[stepIndex];

  return (
    <div className="relative">
      {/* Step Content with Phone Mockup Frame */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] rounded-2xl p-4 border border-white/10">
        {/* Step Label */}
        <div className="text-xs font-bold text-white/60 mb-3 uppercase tracking-wider">
          {currentStepData.label}
        </div>

        {/* Content with animation */}
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="text-white"
        >
          {currentStepData.content}
        </motion.div>
      </div>
    </div>
  );
}

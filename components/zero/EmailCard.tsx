'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Email, SuggestedAction } from './types';
import { getIntentColor, getIntentIcon } from './emailData';

interface EmailCardProps {
  email: Email;
  isAdsCard?: boolean;
  selectedAction?: SuggestedAction | null;
}

export default function EmailCard({ email, isAdsCard = false, selectedAction = null }: EmailCardProps) {
  const [isFullEmailOpen, setIsFullEmailOpen] = useState(false);
  const [isThreadExpanded, setIsThreadExpanded] = useState(false);

  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Truncate content for mobile to prevent scrolling
  const truncatedActions = truncateText(email.aiSummary?.actions, isAdsCard ? 60 : 80);
  const truncatedWhy = truncateText(email.aiSummary?.why, isAdsCard ? 70 : 90);
  const truncatedContext = isAdsCard ? '' : truncateText(email.aiSummary?.context, 80);

  // Use selectedAction if provided, otherwise fall back to primary action from email.actions
  // Convert SuggestedAction to EmailAction format for display
  const displayAction = selectedAction
    ? { name: selectedAction.displayName, isPrimary: selectedAction.isPrimary, priority: selectedAction.priority }
    : email.actions.find(a => a.isPrimary) || email.actions[0];

  const intentColor = getIntentColor(email.intent);

  // Format recipient list for display
  const formatRecipients = () => {
    if (!email.recipients || email.recipients.length === 0) {
      return 'to me';
    }

    const recipients = email.recipients;
    if (recipients.length === 1) {
      return `to ${recipients[0]}`;
    } else if (recipients.length === 2) {
      return `to ${recipients[0]}, ${recipients[1]}`;
    } else {
      // Show first recipient + count of others
      const othersCount = recipients.length - 1;
      return `to ${recipients[0]}, +${othersCount} other${othersCount > 1 ? 's' : ''}`;
    }
  };

  // Format intent tag for display
  const formatIntentTag = (intent: string): string => {
    const parts = intent.split('.');
    return parts.map(part => part.replace(/_/g, ' ').replace(/-/g, ' ')).join(' • ');
  };

  // Generate realistic thread messages based on email type
  const getThreadMessages = () => {
    if (!email.threadCount || email.threadCount <= 1) return [];

    const threadMessages = [];
    const intent = email.intent;

    // Generate contextually relevant thread history
    if (intent.includes('shipping')) {
      if (email.threadCount >= 2) {
        threadMessages.push({
          from: email.from,
          subject: 'Order Confirmation',
          date: '3 days ago',
          body: `Thank you for your order!

Order #1234567 has been confirmed and is being prepared for shipment.

Order Total: $89.99
Estimated Delivery: 3-5 business days

We'll send you a tracking number once your order ships.

Thank you for shopping with us!`
        });
      }
      if (email.threadCount >= 3) {
        threadMessages.push({
          from: 'You',
          subject: 'Re: Order Confirmation',
          date: '2 days ago',
          body: 'Thanks! Looking forward to receiving it.'
        });
      }
    } else if (intent.includes('permission')) {
      if (email.threadCount >= 2) {
        threadMessages.push({
          from: email.from,
          subject: 'Upcoming Field Trip - Permission Form',
          date: '5 days ago',
          body: `Dear Parents,

We're planning an exciting field trip to the Science Museum on October 28th!

Please sign the attached permission form and submit payment by October 24th.

Details will follow in a reminder email.

Best regards,
Mrs. Johnson`
        });
      }
      if (email.threadCount >= 3) {
        threadMessages.push({
          from: 'You',
          subject: 'Re: Upcoming Field Trip',
          date: '4 days ago',
          body: 'Hi Mrs. Johnson, Emma is very excited about this! Quick question - can she bring her camera?'
        });
      }
      if (email.threadCount >= 4) {
        threadMessages.push({
          from: email.from,
          subject: 'Re: Upcoming Field Trip',
          date: '4 days ago',
          body: 'Absolutely! Cameras are welcome. Just make sure it has a strap so it doesn\'t get lost.'
        });
      }
      if (email.threadCount >= 5) {
        threadMessages.push({
          from: 'You',
          subject: 'Re: Upcoming Field Trip',
          date: '3 days ago',
          body: 'Perfect, thank you!'
        });
      }
    } else if (intent.includes('homework')) {
      if (email.threadCount >= 2) {
        threadMessages.push({
          from: email.from,
          subject: 'Chapter 5 Homework Assigned',
          date: '1 week ago',
          body: `Students,

Chapter 5 homework (problems 1-24) has been assigned. This covers fractions, decimals, and word problems.

Due date: Last Monday
Submit via the school portal.

Mr. Thompson`
        });
      }
    } else {
      // Generic thread messages for other email types
      if (email.threadCount >= 2) {
        threadMessages.push({
          from: email.from,
          subject: email.subject.replace('Re: ', ''),
          date: '3 days ago',
          body: 'This is an earlier message in the conversation thread.'
        });
      }
      if (email.threadCount >= 3) {
        threadMessages.push({
          from: 'You',
          subject: `Re: ${email.subject}`,
          date: '2 days ago',
          body: 'Thanks for the update!'
        });
      }
    }

    return threadMessages;
  };

  const threadMessages = getThreadMessages();

  return (
    <div className="relative w-full flex flex-col pb-6">
      {/* Card Header - with background bar */}
      <div className="-mx-6 -mt-6 px-6 pt-6 pb-3 mb-2 bg-black/20 border-b border-white/10">
        {/* Subject - vertically centered between top and avatar */}
        <div className="mb-3">
          <div className="text-lg font-bold text-white leading-tight text-left" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            {email.subject}
          </div>
        </div>

        {/* Avatar, Sender, and View Button Row */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
            style={{ backgroundColor: intentColor }}
          >
            {email.initial}
          </div>

          {/* Sender and Recipient block */}
          <div className="flex-1 min-w-0">
            {/* Sender and Time */}
            <div className="flex items-baseline gap-2 mb-0.5">
              <span className="text-sm font-semibold text-white/90">
                {email.from}
              </span>
              <span className="text-xs text-white/70">{email.timeAgo}</span>
            </div>

            {/* Recipient */}
            <div className="text-xs text-white/70 text-left">
              {formatRecipients()}
            </div>
          </div>

          {/* View Button - Right side */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFullEmailOpen(true);
            }}
            className="min-w-[48px] min-h-[48px] bg-white/25 hover:bg-white/35 active:bg-white/40 rounded-lg flex flex-col items-center justify-center gap-1 flex-shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            aria-label="View original email"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="white"
              opacity="0.8"
              className="flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M0 2a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4.414a1 1 0 00-.707.293L.854 15.146A.5.5 0 010 14.793V2zm2-1a1 1 0 00-1 1v10.586l2.293-2.293A2 2 0 014.414 10H14a1 1 0 001-1V2a1 1 0 00-1-1H2z"/>
            </svg>
            <span className="text-xs font-semibold text-white/90">View</span>
          </button>
        </div>
      </div>

      {/* Product/Content Image - For emails with images */}
      {email.productImageUrl && (
        <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-white/5 border border-white/10">
          <img
            src={email.productImageUrl}
            alt={isAdsCard ? "Product preview" : "Email content preview"}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* AI Analysis Section - ENHANCED AND PROMINENT */}
      {email.aiSummary && (
        <div
          className="relative my-4 p-4 bg-gradient-to-br from-purple-600/30 to-purple-500/20 border-3 border-purple-400/60 rounded-2xl overflow-hidden shadow-xl"
          role="region"
          aria-label="AI analysis"
          style={{
            boxShadow: '0 0 30px rgba(139, 92, 246, 0.3), inset 0 0 20px rgba(139, 92, 246, 0.1)'
          }}
        >
          {/* Enhanced shimmer animation */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), rgba(255, 255, 255, 0.1), rgba(139, 92, 246, 0.2), transparent)',
              animation: 'ai-shimmer 3s linear infinite'
            }}
            aria-hidden="true"
          />

          {/* AI Header - More Prominent */}
          <div className="relative z-10 flex items-center gap-2 mb-3 pb-3 border-b border-white/20">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="white"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13.5 3 16l1-5.5-4-4 5.5-1L8 0z" />
              </svg>
            </div>
            <span className="text-sm font-extrabold text-white uppercase tracking-wider">
              AI Analysis
            </span>
          </div>

          {/* AI Content - Larger, More Readable */}
          <div className="relative z-10 space-y-3">
            {truncatedActions && (
              <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Suggested Actions
                </div>
                <div className="text-base text-white leading-relaxed font-semibold">
                  {truncatedActions}
                </div>
              </div>
            )}
            {truncatedWhy && (
              <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Why This Matters
                </div>
                <div className="text-sm text-white/95 italic leading-relaxed">{truncatedWhy}</div>
              </div>
            )}
            {truncatedContext && (
              <div>
                <div className="text-[10px] font-bold text-white/60 uppercase tracking-wider mb-1">
                  Context
                </div>
                <div className="text-sm text-white/90 leading-relaxed">
                  {truncatedContext}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Swipe CTA Track - Improved accessibility */}
      <div
        className="relative mt-auto min-h-[56px] flex items-center justify-between px-4 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden"
        role="button"
        aria-label={`Swipe right to ${displayAction?.name || 'take action'}`}
        tabIndex={0}
      >
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3))',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
          aria-hidden="true"
        />

        {/* Shimmer animation */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.15), rgba(255, 255, 255, 0.1), transparent)',
            animation: 'cta-shimmer 1.875s linear infinite'
          }}
          aria-hidden="true"
        />

        {/* Chevron Group */}
        <div className="relative z-10 flex gap-1 text-xl font-bold text-white/70" aria-hidden="true">
          <span>›</span>
          <span>›</span>
          <span>›</span>
        </div>

        {/* CTA Label */}
        <span className="relative z-10 text-base font-semibold text-white">
          {displayAction?.name || 'Take Action'}
        </span>
      </div>

      {/* CSS Keyframes */}
      <style jsx>{`
        @keyframes ai-shimmer {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes cta-shimmer {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      {/* Full Email View Modal - Rendered via Portal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isFullEmailOpen && (
            <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
          onClick={() => setIsFullEmailOpen(false)}
        >
          <div className="min-h-screen flex justify-center p-4 py-4">
            <div className="relative max-w-4xl w-full h-fit my-auto">
              {/* Close Button - On Container */}
              <button
                onClick={() => setIsFullEmailOpen(false)}
                className="absolute -top-2 -right-2 z-50 p-2 hover:bg-gray-200 rounded-full transition-colors group bg-white shadow-lg border border-gray-200"
                aria-label="Close"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-700 group-hover:text-gray-900">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-2xl w-full"
              >
                {/* Email Header - Gmail/Outlook style */}
                <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{email.subject}</h2>

              <div className="flex items-start gap-3">
                {/* Sender Avatar/Initial */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: intentColor }}
                >
                  {email.initial}
                </div>

                {/* Sender Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{email.from}</span>
                    <span className="text-sm text-gray-500">{email.timeAgo}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    to me
                  </div>
                </div>
              </div>

              {/* Thread Indicator */}
              {threadMessages.length > 0 && (
                <button
                  onClick={() => setIsThreadExpanded(!isThreadExpanded)}
                  className="mt-4 flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transform transition-transform ${isThreadExpanded ? 'rotate-90' : ''}`}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {isThreadExpanded ? 'Hide' : 'Show'} {threadMessages.length} earlier {threadMessages.length === 1 ? 'message' : 'messages'}
                </button>
              )}
            </div>

            {/* Email Body */}
            <div className="bg-gray-50">
              {/* Thread Messages (if expanded) */}
              {isThreadExpanded && threadMessages.length > 0 && (
                <div className="bg-white border-b-4 border-gray-200">
                  {threadMessages.map((msg, idx) => (
                    <div key={idx} className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                          style={{ backgroundColor: msg.from === 'You' ? '#6B7280' : intentColor }}
                        >
                          {msg.from === 'You' ? 'Y' : email.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-semibold text-gray-900 text-sm">{msg.from}</span>
                            <span className="text-xs text-gray-500">{msg.date}</span>
                          </div>
                          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {msg.body}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Current Email Body */}
              <div className="bg-white p-6 rounded-b-lg">
                <div className="prose prose-sm max-w-none">
                  {/* Main email content */}
                  <div className="text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {email.preview}
                  </div>
                </div>
              </div>
            </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}

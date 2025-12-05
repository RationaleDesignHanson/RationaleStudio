'use client';

import { Email } from './types';
import { getIntentColor } from './emailData';

interface EmailCardProps {
  email: Email;
  onViewClick: () => void;
  isAdsCard?: boolean;
}

export default function EmailCard({ email, onViewClick, isAdsCard = false }: EmailCardProps) {
  const truncateText = (text: string | undefined, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Truncate content for ads cards to match mail card heights
  const truncatedActions = isAdsCard
    ? truncateText(email.aiSummary?.actions, 35)
    : email.aiSummary?.actions;
  const truncatedWhy = isAdsCard ? truncateText(email.aiSummary?.why, 50) : email.aiSummary?.why;
  const truncatedContext = isAdsCard ? '' : email.aiSummary?.context;

  const primaryAction = email.actions.find(a => a.isPrimary) || email.actions[0];
  const intentColor = getIntentColor(email.intent);

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Card Header */}
      <div className="flex items-start gap-3 mb-3">
        {/* Square View Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onViewClick();
          }}
          className="w-14 h-14 bg-white/25 hover:bg-white/35 rounded-lg flex flex-col items-center justify-center gap-1 flex-shrink-0 transition-all"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="white"
            opacity="0.7"
            className="flex-shrink-0"
          >
            <path d="M0 2.5A2.5 2.5 0 012.5 0h11A2.5 2.5 0 0116 2.5v11a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 010 13.5v-11zM2.5 1A1.5 1.5 0 001 2.5v11A1.5 1.5 0 002.5 15h11a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0013.5 1h-11z" />
            <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
          </svg>
          <span className="text-xs font-semibold text-white/85">View</span>
        </button>

        {/* Sender Block */}
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-white mb-0.5">{email.from}</div>
          <div className="text-sm text-white/80">{email.timeAgo}</div>
        </div>

        {/* Header Right - Priority Badge & Status Dots */}
        <div className="flex items-center gap-2">
          {/* Priority Badge */}
          <span
            className={`text-xs font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${
              email.metadata.priority === 'high'
                ? 'bg-orange-500/90 text-white'
                : email.metadata.priority === 'medium'
                ? 'bg-yellow-500/90 text-black'
                : 'bg-green-500/90 text-white'
            }`}
          >
            {email.metadata.priority}
          </span>

          {/* Status Dots */}
          <div className="flex gap-1.5 items-center">
            {email.metadata.discount && (
              <span
                className="w-3 h-3 rounded-full bg-green-500/90 flex-shrink-0"
                style={{ boxShadow: '0 0 8px rgba(34, 197, 94, 0.5)' }}
                title="Shopping"
              />
            )}
            {email.metadata.urgent && (
              <span
                className="w-3 h-3 rounded-full bg-red-500/90 flex-shrink-0"
                style={{ boxShadow: '0 0 8px rgba(239, 68, 68, 0.5)' }}
                title="Deadline"
              />
            )}
            {email.metadata.paymentAmount && (
              <span
                className="w-3 h-3 rounded-full bg-blue-500/90 flex-shrink-0"
                style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.5)' }}
                title="Payment Required"
              />
            )}
          </div>
        </div>
      </div>

      {/* Urgency Bar */}
      {email.metadata.urgent && email.metadata.expiresIn && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 rounded-lg mb-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="white">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 14.4A6.4 6.4 0 1114.4 8 6.407 6.407 0 018 14.4z" />
            <path d="M8.8 4H7.2v5.6l4 2.4.8-1.2-3.2-1.92V4z" />
          </svg>
          <span className="text-sm font-semibold text-white">
            Expires in {email.metadata.expiresIn}
          </span>
        </div>
      )}

      {/* Email Title with Thread Badge */}
      <div className="text-[19px] font-bold text-white mb-3 leading-tight flex items-center gap-2 flex-wrap">
        <span style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>{email.subject}</span>
        {email.threadCount && email.threadCount > 1 && (
          <span className="inline-flex items-center gap-1 bg-blue-500/25 border border-blue-500/40 rounded-xl px-2.5 py-1 text-[11px] font-bold text-blue-300 backdrop-blur-sm">
            <span className="text-xs">💬</span>
            <span>{email.threadCount}</span>
          </span>
        )}
      </div>

      {/* Product Image - For ADS cards */}
      {isAdsCard && email.productImageUrl && (
        <div className="w-full h-12 rounded-xl overflow-hidden mb-2 bg-white/5">
          <img
            src={email.productImageUrl}
            alt="Product"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Email Preview */}
      <div className="text-[15px] text-white/85 leading-relaxed mb-3">{email.preview}</div>

      {/* AI Analysis Section */}
      {email.aiSummary && (
        <div className="relative my-3 p-3 bg-gradient-to-br from-purple-500/20 to-purple-400/15 border-[1.5px] border-purple-500/40 rounded-xl overflow-hidden">
          {/* Shimmer animation */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent)',
              animation: 'ai-shimmer 3s linear infinite'
            }}
          />

          {/* AI Header with Progress Bar */}
          <div className="relative z-10 flex flex-col gap-1.5 mb-3">
            <div className="flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="white"
                opacity="0.8"
                className="flex-shrink-0"
              >
                <path d="M8 0l2.5 5.5L16 6.5l-4 4 1 5.5L8 13.5 3 16l1-5.5-4-4 5.5-1L8 0z" />
              </svg>
              <span className="text-[11px] font-medium text-white/80 flex-1">
                Analysis Confidence
              </span>
              <span className="text-[11px] font-semibold text-white/90">
                {Math.round(email.intentConfidence * 100)}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-300"
                style={{ width: `${Math.round(email.intentConfidence * 100)}%` }}
              />
            </div>
          </div>

          {/* AI Content */}
          <div className="relative z-10 space-y-2.5">
            {truncatedActions && (
              <div className="text-[15px] text-white leading-relaxed whitespace-pre-line">
                {truncatedActions}
              </div>
            )}
            {truncatedWhy && (
              <div className="text-sm text-white/80 italic">{truncatedWhy}</div>
            )}
            {truncatedContext && (
              <div className="text-[13px] text-white/70 whitespace-pre-line leading-relaxed">
                {truncatedContext}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pricing Section - For shopping/ads cards */}
      {email.metadata.salePrice && (
        <div className="flex items-center gap-3 my-4">
          <span className="text-[34px] font-bold text-white">
            ${email.metadata.salePrice.toFixed(0)}
          </span>
          {email.metadata.originalPrice && (
            <span className="text-xl text-white/50 line-through">
              ${email.metadata.originalPrice.toFixed(0)}
            </span>
          )}
          {email.metadata.discount && (
            <span className="text-[11px] font-bold text-white px-3 py-1.5 bg-green-500/90 rounded-lg uppercase">
              {email.metadata.discount}% OFF
            </span>
          )}
        </div>
      )}

      {/* Swipe CTA Track */}
      <div className="relative mt-auto h-12 flex items-center justify-between px-4 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden">
        {/* Animated gradient border */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, rgba(6, 182, 212, 0.4), rgba(59, 130, 246, 0.5), rgba(139, 92, 246, 0.4), rgba(236, 72, 153, 0.3))',
            padding: '1.5px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Shimmer animation */}
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.15), rgba(255, 255, 255, 0.1), transparent)',
            animation: 'cta-shimmer 1.875s linear infinite'
          }}
        />

        {/* Chevron Group */}
        <div className="relative z-10 flex gap-0.5 text-lg font-bold text-white/60">
          <span>›</span>
          <span>›</span>
          <span>›</span>
        </div>

        {/* CTA Label */}
        <span className="relative z-10 text-base font-semibold text-white">
          {primaryAction?.name || 'Take Action'}
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
      `}</style>
    </div>
  );
}

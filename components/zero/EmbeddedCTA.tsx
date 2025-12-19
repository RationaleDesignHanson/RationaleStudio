'use client';

import { motion } from 'framer-motion';

interface EmbeddedCTAProps {
  variant?: 'primary' | 'secondary' | 'minimal';
  position?: 'top' | 'bottom' | 'inline';
  message?: string;
  ctaText?: string;
  onCTAClick?: () => void;
}

/**
 * Embedded CTA Component
 * Conversion-focused call-to-action that can be embedded throughout the demo
 * Encourages users to sign up for Zero or join waitlist
 */
export default function EmbeddedCTA({
  variant = 'primary',
  position = 'inline',
  message = 'Want Zero to handle your inbox?',
  ctaText = 'Join Waitlist',
  onCTAClick
}: EmbeddedCTAProps) {
  const handleClick = () => {
    if (onCTAClick) {
      onCTAClick();
    } else {
      // Default action: open waitlist form (placeholder)
      window.open('https://zero.rationale.work', '_blank');
    }
  };

  // Position-specific styling
  const positionClass = {
    top: 'mb-6',
    bottom: 'mt-6',
    inline: 'my-6'
  }[position];

  // Variant-specific styling
  if (variant === 'minimal') {
    return (
      <div className={`${positionClass} text-center`}>
        <button
          onClick={handleClick}
          className="text-sm text-white/70 hover:text-white underline decoration-white/30 hover:decoration-white transition-all"
        >
          {ctaText} →
        </button>
      </div>
    );
  }

  if (variant === 'secondary') {
    return (
      <div className={positionClass}>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">{message}</div>
          </div>
          <button
            onClick={handleClick}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            {ctaText}
          </button>
        </div>
      </div>
    );
  }

  // Primary variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={positionClass}
    >
      <div className="relative bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-xl border-2 border-purple-500/50 rounded-2xl p-6 overflow-hidden shadow-2xl">
        {/* Animated background gradient */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2), rgba(139, 92, 246, 0.2))',
            backgroundSize: '200% 200%',
            animation: 'gradient-shift 6s ease infinite'
          }}
        />

        {/* Shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            animation: 'shimmer 3s linear infinite'
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center">
          <div className="text-xl font-extrabold text-white mb-2">
            {message}
          </div>
          <div className="text-sm text-white/80 mb-4">
            Join thousands of people reclaiming their time with AI-powered email management
          </div>
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            {ctaText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}

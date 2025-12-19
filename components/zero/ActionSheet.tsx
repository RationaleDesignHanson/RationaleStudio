'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Email, SuggestedAction } from './types';
import { logger } from '@/lib/utils/logger';

interface ActionSheetProps {
  email: Email;
  onClose: () => void;
  onSelectAction: (action: SuggestedAction) => void;
}

// Get icon and color for action types
const getActionVisuals = (actionType: string): { icon: string; color: string; preview: string } => {
  switch (actionType) {
    case 'PAY':
      return { icon: '$', color: 'from-green-500 to-emerald-500', preview: 'Opens payment flow' };
    case 'SIGN':
      return { icon: '✎', color: 'from-purple-500 to-violet-500', preview: 'Opens signature pad' };
    case 'TRACK':
      return { icon: '□', color: 'from-orange-500 to-amber-500', preview: 'Opens tracking details' };
    case 'SCHEDULE':
      return { icon: '+', color: 'from-blue-500 to-cyan-500', preview: 'Adds to calendar' };
    case 'COPY':
      return { icon: '⌘', color: 'from-pink-500 to-rose-500', preview: 'Copies to clipboard' };
    case 'GO_TO':
      return { icon: '→', color: 'from-indigo-500 to-purple-500', preview: 'Opens in browser' };
    case 'REPLY':
      return { icon: '↵', color: 'from-blue-500 to-indigo-500', preview: 'Opens reply composer' };
    default:
      return { icon: '•', color: 'from-gray-500 to-slate-500', preview: 'Quick action' };
  }
};

export default function ActionSheet({ email, onClose, onSelectAction }: ActionSheetProps) {
  const [selectedActionId, setSelectedActionId] = useState<string>(
    email.suggestedActions.find(a => a.isPrimary)?.actionId || email.suggestedActions[0]?.actionId
  );
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  // Group actions by type
  const groupedActions = useMemo(() => {
    const smartActions = email.suggestedActions.filter(a =>
      ['PAY', 'SIGN', 'TRACK', 'SCHEDULE', 'COPY', 'GO_TO', 'REPLY'].includes(a.actionType)
    );
    const manualActions = email.suggestedActions.filter(a =>
      !['PAY', 'SIGN', 'TRACK', 'SCHEDULE', 'COPY', 'GO_TO', 'REPLY'].includes(a.actionType)
    );

    return { smartActions, manualActions };
  }, [email.suggestedActions]);

  const handleActionSelect = (action: SuggestedAction) => {
    setSelectedActionId(action.actionId);
    // Update primary action and close sheet
    setTimeout(() => {
      onSelectAction(action);
      onClose();
    }, 200);
  };

  const handleQuickAction = (type: 'share' | 'copy' | 'link') => {
    const textToCopy = `${email.subject}\n\n${email.preview}`;

    switch (type) {
      case 'copy':
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            alert('✓ Copied to clipboard');
            setTimeout(() => onClose(), 300);
          })
          .catch((err) => {
            logger.error('Copy failed:', err);
            alert('❌ Copy failed');
          });
        break;

      case 'share':
        if (navigator.share) {
          navigator
            .share({
              title: email.subject,
              text: email.preview
            })
            .then(() => {
              alert('✓ Shared successfully');
              onClose();
            })
            .catch((err) => logger.log('Share cancelled'));
        } else {
          alert('ℹ️ Share not available in demo');
        }
        break;

      case 'link':
        // Extract URL from action context
        const urlAction = email.suggestedActions.find(a => a.actionType === 'GO_TO');
        if (urlAction?.context.url) {
          window.open(urlAction.context.url as string, '_blank');
          alert('✓ Opening link in new tab');
          setTimeout(() => onClose(), 500);
        } else {
          alert('ℹ️ No links available');
        }
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 z-[500]"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-br from-[#1a1a2e] to-[#2d1b4e] rounded-t-3xl p-5 max-h-[60%] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle */}
          <div className="w-10 h-1 bg-white/30 rounded-full mx-auto mb-5" />

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[22px] font-extrabold text-white mb-1">Choose Action</h2>
              <p className="text-xs text-white/60">
                Swipe right to execute selected action
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Close action sheet"
            >
              ×
            </button>
          </div>

          {/* Quick Actions */}
          <div className="pb-4 border-b border-white/20 mb-4">
            <div className="text-[10px] font-bold text-white/50 tracking-wider mb-3">
              QUICK ACTIONS
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleQuickAction('share')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold">
                  ↗
                </div>
                <span className="text-[11px] text-white/70">Share</span>
              </button>

              <button
                onClick={() => handleQuickAction('copy')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold">
                  ⎘
                </div>
                <span className="text-[11px] text-white/70">Copy</span>
              </button>

              <button
                onClick={() => handleQuickAction('link')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl font-bold">
                  →
                </div>
                <span className="text-[11px] text-white/70">Safari</span>
              </button>
            </div>
          </div>

          {/* Smart AI Actions */}
          {groupedActions.smartActions.length > 0 && (
            <div className="mb-5">
              <div className="text-[10px] font-bold text-white/50 tracking-wider mb-3 flex items-center gap-2">
                SMART ACTIONS
                <span className="text-[9px] px-2 py-0.5 bg-purple-500/30 text-purple-300 rounded-full">AI-SUGGESTED</span>
              </div>
              <div className="flex flex-col gap-2.5">
                {groupedActions.smartActions.map((action) => {
                  const visuals = getActionVisuals(action.actionType);
                  const isPrimary = action.isPrimary;
                  const isSelected = action.actionId === selectedActionId;
                  const isHovered = action.actionId === hoveredAction;

                  return (
                    <button
                      key={action.actionId}
                      onClick={() => handleActionSelect(action)}
                      onMouseEnter={() => setHoveredAction(action.actionId)}
                      onMouseLeave={() => setHoveredAction(null)}
                      className={`relative bg-white/5 border-2 rounded-2xl p-4 transition-all flex items-start gap-3 group ${
                        isSelected
                          ? `border-purple-500/70 bg-gradient-to-br ${visuals.color} bg-opacity-20`
                          : 'border-white/10 hover:bg-white/10 hover:border-purple-500/40 hover:scale-[1.02]'
                      } ${isPrimary ? 'ring-2 ring-purple-500/40' : ''}`}
                    >
                      {/* Primary badge */}
                      {isPrimary && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] font-bold rounded-full shadow-lg">
                          PRIMARY
                        </div>
                      )}

                      {/* Icon */}
                      <div className={`min-w-[48px] h-12 rounded-xl bg-gradient-to-br ${visuals.color} flex items-center justify-center text-2xl shadow-lg`}>
                        {visuals.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-left">
                        <div className="text-base font-bold text-white mb-0.5">
                          {action.displayName}
                        </div>
                        <div className="text-[11px] text-white/50 uppercase tracking-wide mb-1">
                          {action.actionType}
                        </div>

                        {/* Preview on hover or selection */}
                        <AnimatePresence>
                          {(isHovered || isSelected) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="text-xs text-white/70 mt-1.5 pt-1.5 border-t border-white/10"
                            >
                              {visuals.preview}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Checkmark */}
                      <div
                        className={`min-w-[24px] h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? 'border-white bg-white'
                            : 'border-white/30'
                        }`}
                      >
                        {isSelected && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-purple-600">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Manual Actions (if any exist) */}
          {groupedActions.manualActions.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-white/50 tracking-wider mb-3">
                MANUAL ACTIONS
              </div>
              <div className="flex flex-col gap-2">
                {groupedActions.manualActions.map((action) => (
                  <button
                    key={action.actionId}
                    onClick={() => handleActionSelect(action)}
                    className={`bg-white/5 border-2 rounded-xl p-3 transition-all flex items-center justify-between text-sm ${
                      action.actionId === selectedActionId
                        ? 'border-purple-500/60 bg-purple-500/20'
                        : 'border-white/10 hover:bg-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">
                        {action.displayName}
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        action.actionId === selectedActionId
                          ? 'border-purple-500 bg-purple-500'
                          : 'border-white/30'
                      }`}
                    >
                      {action.actionId === selectedActionId && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

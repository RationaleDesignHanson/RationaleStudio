'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Email, SuggestedAction } from './types';

interface ActionSheetProps {
  email: Email;
  onClose: () => void;
  onSelectAction: (action: SuggestedAction) => void;
}

export default function ActionSheet({ email, onClose, onSelectAction }: ActionSheetProps) {
  const [selectedActionId, setSelectedActionId] = useState<string>(
    email.suggestedActions.find(a => a.isPrimary)?.actionId || email.suggestedActions[0]?.actionId
  );

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
            console.error('Copy failed:', err);
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
            .catch((err) => console.log('Share cancelled'));
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
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[22px] font-extrabold text-white">Choose Action</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-white text-xl flex items-center justify-center hover:bg-white/20 transition-all"
            >
              ×
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-white/70 mb-5">
            Swipe right to execute the selected action
          </p>

          {/* Quick Actions */}
          <div className="pb-4 border-b border-white/20 mb-4">
            <div className="text-xs font-bold text-white/50 tracking-wider mb-3">
              QUICK ACTIONS
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => handleQuickAction('share')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl">
                  📤
                </div>
                <span className="text-[11px] text-white/70">Share</span>
              </button>

              <button
                onClick={() => handleQuickAction('copy')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl">
                  📋
                </div>
                <span className="text-[11px] text-white/70">Copy</span>
              </button>

              <button
                onClick={() => handleQuickAction('link')}
                className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xl">
                  🌐
                </div>
                <span className="text-[11px] text-white/70">Safari</span>
              </button>
            </div>
          </div>

          {/* Action Options */}
          <div className="flex flex-col gap-3">
            {email.suggestedActions.map((action) => (
              <button
                key={action.actionId}
                onClick={() => handleActionSelect(action)}
                className={`bg-white/5 border-2 rounded-2xl p-4 transition-all flex items-center justify-between ${
                  action.actionId === selectedActionId
                    ? 'border-purple-500/60 bg-gradient-to-br from-purple-500/30 to-purple-400/20'
                    : 'border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:translate-x-1'
                }`}
              >
                <div className="flex-1 text-left">
                  <div className="text-base font-bold text-white mb-1">
                    {action.displayName}
                  </div>
                  <div className="text-xs text-white/60 uppercase tracking-wider">
                    {action.actionType}
                  </div>
                </div>

                {/* Checkmark */}
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    action.actionId === selectedActionId
                      ? 'border-purple-500 bg-gradient-to-br from-purple-500 to-purple-400'
                      : 'border-white/30'
                  }`}
                >
                  {action.actionId === selectedActionId && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Email, EmailType, SuggestedAction } from '../types';
import { sampleEmails, getIntentColor } from '../emailData';
import EmailCard from '../EmailCard';
import ActionSheet from '../ActionSheet';
import ActionFlowModal from '../ActionFlowModal';
import Confetti from '../Confetti';
import ToastUndo from '../ToastUndo';
import { useSwipeVelocity } from '@/hooks/useSwipeVelocity';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useDemoAnalytics } from '@/hooks/useDemoAnalytics';

/**
 * Mobile Native Demo - Optimized for actual mobile devices
 * Removes phone frame, uses full viewport, optimized touch targets
 * Includes velocity detection and undo functionality
 */
export default function MobileNativeDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archetype, setArchetype] = useState<EmailType>('mail');
  const [dismissed, setDismissed] = useState({ mail: 0, ads: 0 });
  const [showInstruction, setShowInstruction] = useState(true);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SuggestedAction | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<SuggestedAction | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<{ type: 'mini' | 'major'; message: string } | null>(null);
  const [undoState, setUndoState] = useState<{ email: Email; index: number; direction: string } | null>(null);
  const controls = useAnimation();
  const { recordStart, calculateVelocity } = useSwipeVelocity(0.3, 0.7);

  // Analytics tracking
  const analytics = useDemoAnalytics();
  const emailViewStartTimeRef = useRef<number>(Date.now());

  // Filter emails by current archetype
  const filteredEmails = sampleEmails.filter(email => email.metadata.type === archetype);
  const totalEmails = sampleEmails.filter(email => email.metadata.type === archetype).length;
  const remaining = totalEmails - dismissed[archetype];
  const currentEmail = filteredEmails[currentIndex];

  useEffect(() => {
    // Hide instruction after 4 seconds on mobile (longer than desktop)
    const timer = setTimeout(() => setShowInstruction(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset index when switching archetype
    setCurrentIndex(0);
    setShowInstruction(true);
    setTimeout(() => setShowInstruction(false), 4000);
  }, [archetype]);

  // Track email views
  useEffect(() => {
    if (currentEmail) {
      emailViewStartTimeRef.current = Date.now();
      analytics.trackEmailViewStart(
        currentEmail.from + currentEmail.subject,
        currentEmail.metadata.type,
        currentEmail.intent
      );
    }
  }, [currentEmail, analytics]);

  // Keyboard navigation
  useKeyboardNavigation({
    onRight: () => currentEmail && !showActionModal && executeSwipeAction('right'),
    onLeft: () => currentEmail && !showActionModal && executeSwipeAction('left'),
    onDown: () => currentEmail && !showActionModal && executeSwipeAction('down'),
    onUp: () => {
      if (currentEmail && !showActionModal && !showActionSheet) {
        analytics.trackActionSheetOpen(currentEmail.intent);
        setShowActionSheet(true);
      }
    },
    onEscape: () => {
      if (showActionSheet) {
        analytics.trackActionSheetClose();
        setShowActionSheet(false);
      } else if (showActionModal) {
        setShowActionModal(false);
      }
    },
  }, !showActionModal && !showActionSheet);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Hide instruction after first interaction
    if (showInstruction) {
      setShowInstruction(false);
    }

    // Calculate velocity
    const velocityResult = calculateVelocity(info.point.x, info.point.y);

    const threshold = 80;
    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    let swipeDirection: 'left' | 'right' | 'up' | 'down' | null = null;

    // Determine swipe direction with velocity check
    if (absX > threshold && absX > absY && velocityResult.isIntentional) {
      swipeDirection = info.offset.x > 0 ? 'right' : 'left';
    } else if (absY > threshold && absY > absX && velocityResult.isIntentional) {
      swipeDirection = info.offset.y > 0 ? 'down' : 'up';
    }

    if (swipeDirection) {
      if (swipeDirection === 'up') {
        // Swipe up - show action sheet (don't dismiss card)
        await controls.start({
          x: 0,
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 500, damping: 30 }
        });
        if (currentEmail) {
          analytics.trackActionSheetOpen(currentEmail.intent);
        }
        setShowActionSheet(true);
      } else {
        // All other swipes - fly card off screen
        // Use only the primary direction to avoid diagonal animations
        const finalX =
          swipeDirection === 'right' ? 800 : swipeDirection === 'left' ? -800 : 0;
        const finalY = swipeDirection === 'down' ? 800 : 0;

        await controls.start({
          x: finalX,
          y: finalY,
          opacity: 0,
          rotate: swipeDirection === 'right' || swipeDirection === 'left' ? info.offset.x * 0.5 : 0,
          transition: { duration: 0.4 }
        });

        // Store state for undo before executing (except for 'right' which shows modal instead)
        if (currentEmail && swipeDirection !== 'right') {
          setUndoState({
            email: currentEmail,
            index: currentIndex,
            direction: swipeDirection
          });
        }

        // Execute action based on direction
        executeSwipeAction(swipeDirection);
      }
    } else {
      // Return to center
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      });
    }
  };

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    recordStart(info.point.x, info.point.y);
  };

  const executeSwipeAction = (direction: 'left' | 'right' | 'down') => {
    if (!currentEmail) return;

    const primaryAction =
      selectedAction || currentEmail.suggestedActions.find(a => a.isPrimary) || currentEmail.suggestedActions[0];

    // Track swipe analytics
    const timeToDecision = Date.now() - emailViewStartTimeRef.current;
    analytics.trackSwipe({
      direction: direction === 'down' ? 'down' : direction,
      emailType: currentEmail.metadata.type,
      emailIntent: currentEmail.intent,
      wasAccidental: false,
      timeToDecision
    });

    switch (direction) {
      case 'right':
        // Execute primary action - show modal workflow
        analytics.trackEmailViewEnd(currentEmail.from + currentEmail.subject, 'execute_action');
        setCurrentAction(primaryAction);
        setShowActionModal(true);
        // Clear any existing undo state to prevent toast from showing
        setUndoState(null);
        handleDismiss();
        break;

      case 'left':
        // Archive/Dismiss
        analytics.trackEmailViewEnd(currentEmail.from + currentEmail.subject, 'archive');
        showToast(`Archived: ${currentEmail.subject}`);
        handleDismiss();
        break;

      case 'down':
        // Snooze
        showToast(`Snoozed until tomorrow: ${currentEmail.subject}`);
        handleDismiss();
        break;
    }

    // Reset selected action after use
    setSelectedAction(null);
  };

  const handleDismiss = () => {
    const newDismissedCount = dismissed[archetype] + 1;

    setDismissed(prev => ({
      ...prev,
      [archetype]: newDismissedCount
    }));

    // Check for celebration milestones
    setTimeout(() => {
      // Major celebration - Inbox Zero
      if (newDismissedCount === totalEmails) {
        // Track demo completion
        analytics.trackDemoComplete({
          totalEmails,
          emailsProcessed: newDismissedCount,
          timeSpent: Math.round((Date.now() - emailViewStartTimeRef.current) / 1000),
          completionRate: 100,
          averageTimePerEmail: Math.round((Date.now() - emailViewStartTimeRef.current) / 1000 / totalEmails)
        });
        setCelebration({
          type: 'major',
          message: 'Inbox Zero Achieved!'
        });
        setTimeout(() => setCelebration(null), 3000);
      }
      // Mini celebration - Every 3 emails
      else if (newDismissedCount % 3 === 0 && newDismissedCount > 0) {
        setCelebration({
          type: 'mini',
          message: `${newDismissedCount} down! Keep going!`
        });
        setTimeout(() => setCelebration(null), 2000);
      }
    }, 100);

    setTimeout(() => {
      if (currentIndex < filteredEmails.length - 1) {
        setCurrentIndex(currentIndex + 1);
        // Reset animation controls completely
        controls.set({ x: 0, y: 0, opacity: 1, rotate: 0 });
      } else {
        // All emails processed - reset for empty state
        controls.set({ x: 0, y: 0, opacity: 1, rotate: 0 });
      }
    }, 400);
  };

  const switchArchetype = (type: 'mail' | 'ads') => {
    setArchetype(type);
  };

  const handleUndo = () => {
    if (!undoState) return;

    // Restore the dismissed count
    setDismissed(prev => ({
      ...prev,
      [archetype]: Math.max(0, prev[archetype] - 1)
    }));

    // Go back to the previous email
    setCurrentIndex(undoState.index);

    // Reset animation
    controls.set({ x: 0, y: 0, opacity: 1, rotate: 0 });

    // Clear undo state
    setUndoState(null);

    showToast('Action undone');
  };

  const progress = totalEmails > 0 ? (dismissed[archetype] / totalEmails) * 100 : 0;

  if (!currentEmail) {
    return (
      <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite'
          }}
        />

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center h-screen text-white/80 px-8">
          <div className="text-4xl mb-6 font-bold text-white">✓</div>
          <div className="text-3xl font-bold mb-3">Inbox Zero!</div>
          <div className="text-lg text-white/60">All emails processed</div>
        </div>

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10">
          <div className="flex items-center justify-around px-6 py-6">
            <div className="flex gap-3">
              <div className="relative">
                <button
                  onClick={() => switchArchetype('mail')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    archetype === 'mail'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  Mail
                </button>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center pointer-events-none">
                  {sampleEmails.filter(e => e.metadata.type === 'mail').length - dismissed.mail}
                </span>
              </div>

              <div className="relative">
                <button
                  onClick={() => switchArchetype('ads')}
                  className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    archetype === 'ads'
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  Ads
                </button>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center pointer-events-none">
                  {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
                </span>
              </div>
            </div>

            <div className="flex gap-6">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setDismissed({ mail: 0, ads: 0 });
                }}
                className="text-3xl hover:scale-110 active:scale-95 transition-transform"
                aria-label="Reset demo"
              >
                ↻
              </button>
              <div className="relative">
                <button className="text-2xl" aria-label="Shopping cart">
                  🛒
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-visible">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />

      {/* Instruction Banner */}
      {showInstruction && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-safe-area-inset-top left-0 right-0 text-center bg-black/60 backdrop-blur-xl text-white/80 text-sm font-medium px-6 py-4 z-50 border-b border-white/10"
        >
          Swipe right to take action, left to dismiss
        </motion.div>
      )}

      {/* Email Feed */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-4 pb-28">
        {/* Background cards */}
        {filteredEmails.slice(currentIndex + 1, currentIndex + 3).map((email, i) => (
          <div
            key={`bg-${currentIndex}-${i}`}
            className="absolute left-4 right-4 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"
            style={{
              top: '16px',
              height: 'calc(100vh - 144px)',
              transform: `scale(${1 - (i + 1) * 0.04}) translateY(${(i + 1) * -12}px)`,
              opacity: 0.4 - i * 0.15,
              zIndex: 10 - i,
              boxShadow: `0 0 40px rgba(139, 92, 246, ${0.08 - i * 0.03}), 0 20px 50px rgba(0, 0, 0, 0.3)`
            }}
          />
        ))}

        {/* Active Card */}
        <motion.div
          key={`card-${archetype}-${currentIndex}`}
          drag
          dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
          dragElastic={0.7}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          animate={controls}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          className="w-full max-w-md z-20 cursor-grab active:cursor-grabbing"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3)) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))',
            touchAction: 'none'
          }}
        >
          <div
            className="w-full rounded-3xl p-4 flex flex-col backdrop-blur-2xl border border-white/30 relative"
            style={{
              background: `linear-gradient(135deg, ${getIntentColor(currentEmail.intent)}25 0%, ${getIntentColor(currentEmail.intent)}10 50%, rgba(0, 0, 0, 0.15) 100%)`,
              boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.03), 0 0 60px rgba(139, 92, 246, 0.3)'
            }}
          >
            {/* Subtle shimmer overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
              style={{
                background: 'linear-gradient(110deg, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.03) 50%, transparent 60%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 4s ease-in-out infinite',
                opacity: 0.6
              }}
            />

            <div className="relative z-10">
              <EmailCard
                email={currentEmail}
                isAdsCard={currentEmail.metadata.type === 'ads'}
                selectedAction={selectedAction}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      {progress >= 0 && (
        <div className="absolute bottom-24 left-4 right-4 z-30">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-3 border border-white/10">
            <div className="flex items-center justify-between text-white text-sm font-semibold mb-2 px-1">
              <span className="text-white/60 text-xs tracking-wider">INBOX PROGRESS</span>
              <span className="text-base">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Absolute within demo container */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-xl border-t border-white/10 z-40">
        <div className="flex items-center justify-around px-6 py-6">
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => switchArchetype('mail')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  archetype === 'mail'
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/10 text-white/60'
                }`}
                aria-label={`Switch to Mail (${remaining} remaining)`}
              >
                Mail
              </button>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center pointer-events-none">
                {remaining}
              </span>
            </div>

            <div className="relative">
              <button
                onClick={() => switchArchetype('ads')}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  archetype === 'ads'
                    ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                    : 'bg-white/10 text-white/60'
                }`}
                aria-label={`Switch to Ads (${sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads} remaining)`}
              >
                Ads
              </button>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[24px] h-6 px-1.5 flex items-center justify-center pointer-events-none">
                {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
              </span>
            </div>
          </div>

          <div className="flex gap-6 text-white">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setDismissed({ mail: 0, ads: 0 });
              }}
              className="text-3xl hover:scale-110 active:scale-95 transition-transform"
              aria-label="Reset demo"
            >
              ↻
            </button>
            <div className="relative">
              <button className="text-2xl" aria-label="Shopping cart">
                🛒
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
                0
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Sheet */}
      {showActionSheet && currentEmail && (
        <ActionSheet
          email={currentEmail}
          onClose={() => setShowActionSheet(false)}
          onSelectAction={(action) => {
            setSelectedAction(action);
            setShowActionSheet(false);
          }}
        />
      )}

      {/* Toast Notification - Bottom position for mobile */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 bg-black/90 text-white px-6 py-4 rounded-2xl text-base font-medium backdrop-blur-xl z-[600] shadow-2xl border border-white/20 max-w-[90%]"
        >
          {toast}
        </motion.div>
      )}

      {/* Undo Toast */}
      {undoState && (
        <ToastUndo
          message={`${
            undoState.direction === 'right'
              ? 'Action executed'
              : undoState.direction === 'left'
                ? 'Archived'
                : undoState.direction === 'down'
                  ? 'Snoozed'
                  : 'Processed'
          }: ${undoState.email.subject}`}
          onUndo={handleUndo}
          onExpire={() => setUndoState(null)}
          duration={4000}
        />
      )}

      {/* Action Flow Modal */}
      {showActionModal && currentAction && (
        <ActionFlowModal
          action={currentAction}
          onClose={() => setShowActionModal(false)}
        />
      )}

      {/* Celebration System */}
      {celebration && (
        <>
          <Confetti
            type={celebration.type}
            onComplete={() => setCelebration(null)}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[900] pointer-events-none px-4"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white/30 max-w-[90vw]">
              <div className="text-2xl md:text-3xl font-extrabold text-center">
                {celebration.message}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }

        /* Safe area support for notched devices */
        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }

        .top-safe-area-inset-top {
          top: env(safe-area-inset-top);
        }
      `}</style>
    </div>
  );
}

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
 * Tablet Full Width Demo - Optimized for tablets (768px - 1024px)
 * No phone frame, larger cards, persistent instruction bar
 */
export default function TabletFullWidthDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archetype, setArchetype] = useState<EmailType>('mail');
  const [dismissed, setDismissed] = useState({ mail: 0, ads: 0 });
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SuggestedAction | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<SuggestedAction | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<{ type: 'mini' | 'major'; message: string } | null>(null);
  const [undoState, setUndoState] = useState<{ email: Email; index: number; direction: string } | null>(null);
  const controls = useAnimation();

  // Velocity detection for intentional swipes
  const { recordStart, calculateVelocity } = useSwipeVelocity(0.5);

  // Analytics tracking
  const analytics = useDemoAnalytics();
  const emailViewStartTimeRef = useRef<number>(Date.now());

  // Filter emails by current archetype
  const filteredEmails = sampleEmails.filter(email => email.metadata.type === archetype);
  const totalEmails = sampleEmails.filter(email => email.metadata.type === archetype).length;
  const remaining = totalEmails - dismissed[archetype];
  const currentEmail = filteredEmails[currentIndex];

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
    onUp: () => currentEmail && !showActionModal && !showActionSheet && setShowActionSheet(true),
    onEscape: () => {
      if (showActionSheet) setShowActionSheet(false);
      else if (showActionModal) setShowActionModal(false);
    },
  }, !showActionModal && !showActionSheet);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    recordStart(info.point.x, info.point.y);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 140;
    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    // Calculate swipe velocity to detect intentional vs accidental swipes
    const velocityResult = calculateVelocity(info.point.x, info.point.y);

    let swipeDirection: 'left' | 'right' | 'up' | 'down' | null = null;

    // Determine swipe direction (only process if intentional swipe)
    if (absX > threshold && absX > absY && velocityResult.isIntentional) {
      swipeDirection = info.offset.x > 0 ? 'right' : 'left';
    } else if (absY > threshold && absY > absX && velocityResult.isIntentional) {
      swipeDirection = info.offset.y > 0 ? 'down' : 'up';
    }

    if (swipeDirection) {
      if (swipeDirection === 'up') {
        await controls.start({
          x: 0,
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 500, damping: 30 }
        });
        setShowActionSheet(true);
      } else {
        const finalX =
          swipeDirection === 'right' ? 1000 : swipeDirection === 'left' ? -1000 : info.offset.x * 5;
        const finalY = swipeDirection === 'down' ? 800 : info.offset.y * 5;

        await controls.start({
          x: finalX,
          y: finalY,
          opacity: 0,
          rotate: info.offset.x * 0.4,
          transition: { duration: 0.4 }
        });

        executeSwipeAction(swipeDirection);
      }
    } else {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { type: 'spring', stiffness: 500, damping: 30 }
      });
    }
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

    // Store for undo before dismissing
    setUndoState({
      email: currentEmail,
      index: currentIndex,
      direction: direction === 'right' ? 'Action executed' : direction === 'left' ? 'Archived' : 'Snoozed'
    });

    switch (direction) {
      case 'right':
        analytics.trackEmailViewEnd(currentEmail.from + currentEmail.subject, 'execute_action');
        setCurrentAction(primaryAction);
        setShowActionModal(true);
        handleDismiss();
        break;
      case 'left':
        analytics.trackEmailViewEnd(currentEmail.from + currentEmail.subject, 'archive');
        showToast(`📥 Archived: ${currentEmail.subject}`);
        handleDismiss();
        break;
      case 'down':
        showToast(`😴 Snoozed until tomorrow: ${currentEmail.subject}`);
        handleDismiss();
        break;
    }

    setSelectedAction(null);
  };

  const handleDismiss = () => {
    const newDismissedCount = dismissed[archetype] + 1;

    setDismissed(prev => ({
      ...prev,
      [archetype]: newDismissedCount
    }));

    setTimeout(() => {
      if (newDismissedCount === totalEmails) {
        setCelebration({
          type: 'major',
          message: '🎉 Inbox Zero Achieved!'
        });
        setTimeout(() => setCelebration(null), 3000);
      } else if (newDismissedCount % 3 === 0 && newDismissedCount > 0) {
        setCelebration({
          type: 'mini',
          message: `🔥 ${newDismissedCount} down! Keep going!`
        });
        setTimeout(() => setCelebration(null), 2000);
      }
    }, 100);

    setTimeout(() => {
      if (currentIndex < filteredEmails.length - 1) {
        setCurrentIndex(currentIndex + 1);
        controls.set({ x: 0, y: 0, opacity: 1, rotate: 0 });
      } else {
        controls.set({ x: 0, y: 0, opacity: 1, rotate: 0 });
      }
    }, 400);
  };

  const switchArchetype = (type: 'mail' | 'ads') => {
    setArchetype(type);
    setCurrentIndex(0);
  };

  const handleUndo = () => {
    if (!undoState) return;

    // Restore the dismissed count
    setDismissed(prev => ({
      ...prev,
      [archetype]: Math.max(0, prev[archetype] - 1)
    }));

    // Restore the email position
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

        {/* Persistent instruction bar */}
        <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-white/80 text-base">
              <span className="font-semibold text-white">Zero Demo</span>
              <span className="mx-3 text-white/40">•</span>
              <span className="text-sm">Swipe right to act, left to dismiss</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => switchArchetype('mail')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  archetype === 'mail'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Mail
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                  {sampleEmails.filter(e => e.metadata.type === 'mail').length - dismissed.mail}
                </span>
              </button>
              <button
                onClick={() => switchArchetype('ads')}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
                  archetype === 'ads'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60 hover:bg-white/20'
                }`}
              >
                Ads
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                  {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-white/80 px-8">
          <div className="text-9xl mb-8">🎉</div>
          <div className="text-4xl font-bold mb-4">Inbox Zero!</div>
          <div className="text-xl text-white/60 mb-8">All emails processed</div>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setDismissed({ mail: 0, ads: 0 });
            }}
            className="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-full transition-colors"
          >
            Reset Demo
          </button>
        </div>
      </div>
    );
  }

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

      {/* Persistent instruction bar */}
      <div className="sticky top-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="text-white/80 text-base">
            <span className="font-semibold text-white">Zero Demo</span>
            <span className="mx-3 text-white/40">•</span>
            <span className="text-sm">Swipe right → Act • Left → Dismiss • Up → More actions</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => switchArchetype('mail')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
                archetype === 'mail'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              aria-label={`Switch to Mail (${remaining} remaining)`}
            >
              Mail
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                {remaining}
              </span>
            </button>
            <button
              onClick={() => switchArchetype('ads')}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all relative ${
                archetype === 'ads'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
              aria-label={`Switch to Ads (${sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads} remaining)`}
            >
              Ads
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Email Feed */}
      <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-6">
        <div className="max-w-3xl w-full mx-auto">
          {/* Background cards */}
          {filteredEmails.slice(currentIndex + 1, currentIndex + 3).map((email, i) => (
            <div
              key={`bg-${currentIndex}-${i}`}
              className="absolute left-6 right-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"
              style={{
                top: `${60 + (i + 1) * 10}px`,
                height: 'calc(100vh - 280px)',
                transform: `scale(${1 - (i + 1) * 0.03}) translateY(${(i + 1) * -15}px)`,
                opacity: 0.5 - i * 0.2,
                zIndex: 10 - i,
                boxShadow: `0 0 50px rgba(139, 92, 246, ${0.1 - i * 0.04}), 0 25px 60px rgba(0, 0, 0, 0.3)`
              }}
            />
          ))}

          {/* Active Card */}
          <motion.div
            key={`card-${archetype}-${currentIndex}`}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            className="relative z-20 cursor-grab active:cursor-grabbing"
            style={{
              height: 'calc(100vh - 250px)',
              maxHeight: '700px',
              filter: 'drop-shadow(0 0 40px rgba(139, 92, 246, 0.4)) drop-shadow(0 30px 60px rgba(0, 0, 0, 0.5))'
            }}
          >
            <div
              className="w-full h-full rounded-3xl p-6 flex flex-col backdrop-blur-2xl border border-white/30 overflow-y-auto relative"
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
                />
              </div>
            </div>
          </motion.div>

          {/* Action hints below card */}
          <div className="mt-6 flex items-center justify-center gap-6 text-white/50 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">←</span>
              <span>Archive</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">↓</span>
              <span>Snooze</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Action</span>
              <span className="text-lg">→</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">↑</span>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-6">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between text-white text-base font-semibold mb-2">
              <span className="text-white/60 text-sm tracking-wider">INBOX PROGRESS</span>
              <span className="text-lg">{Math.round(progress)}%</span>
            </div>
            <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
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

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 bg-black/90 text-white px-8 py-4 rounded-2xl text-base font-medium backdrop-blur-xl z-[600] shadow-2xl border border-white/20"
        >
          {toast}
        </motion.div>
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[900] pointer-events-none"
          >
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-10 py-8 rounded-3xl shadow-2xl border-4 border-white/30">
              <div className="text-4xl font-extrabold text-center whitespace-nowrap">
                {celebration.message}
              </div>
            </div>
          </motion.div>
        </>
      )}

      {/* Undo Toast */}
      {undoState && (
        <ToastUndo
          message={`${undoState.direction}: ${undoState.email.subject}`}
          onUndo={handleUndo}
          onExpire={() => setUndoState(null)}
          duration={4000}
        />
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
      `}</style>
    </div>
  );
}

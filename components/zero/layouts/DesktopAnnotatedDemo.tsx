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
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { useSwipeVelocity } from '@/hooks/useSwipeVelocity';
import { useDemoAnalytics } from '@/hooks/useDemoAnalytics';

/**
 * Desktop Annotated Demo - Two-column layout with live annotations
 * Left: Interactive demo | Right: Context and explanations
 *
 * Keyboard controls:
 * - Arrow Right: Execute primary action
 * - Arrow Left: Archive email
 * - Arrow Down: Snooze email
 * - Arrow Up: Show action sheet
 * - Escape: Close modals
 */
export default function DesktopAnnotatedDemo() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [archetype, setArchetype] = useState<EmailType>('mail');
  const [dismissed, setDismissed] = useState({ mail: 0, ads: 0 });
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [selectedAction, setSelectedAction] = useState<SuggestedAction | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<SuggestedAction | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [celebration, setCelebration] = useState<{ type: 'mini' | 'major'; message: string } | null>(null);
  const [showHint, setShowHint] = useState(false);
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

  // Keyboard navigation support
  useKeyboardNavigation({
    onRight: () => {
      if (currentEmail && !showActionModal) {
        executeSwipeAction('right');
      }
    },
    onLeft: () => {
      if (currentEmail && !showActionModal) {
        executeSwipeAction('left');
      }
    },
    onDown: () => {
      if (currentEmail && !showActionModal) {
        executeSwipeAction('down');
      }
    },
    onUp: () => {
      if (currentEmail && !showActionModal && !showActionSheet) {
        setShowActionSheet(true);
      }
    },
    onEscape: () => {
      if (showActionSheet) {
        setShowActionSheet(false);
      } else if (showActionModal) {
        setShowActionModal(false);
      }
    },
  }, !showActionModal && !showActionSheet); // Only enable when modals are closed

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

  // Show hint after inactivity
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    recordStart(info.point.x, info.point.y);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setShowHint(false);

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
          swipeDirection === 'right' ? 1200 : swipeDirection === 'left' ? -1200 : info.offset.x * 5;
        const finalY = swipeDirection === 'down' ? 900 : info.offset.y * 5;

        await controls.start({
          x: finalX,
          y: finalY,
          opacity: 0,
          rotate: info.offset.x * 0.3,
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
        showToast(`Archived: ${currentEmail.subject}`);
        handleDismiss();
        break;
      case 'down':
        showToast(`Snoozed until tomorrow: ${currentEmail.subject}`);
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
          message: 'Inbox Zero Achieved!'
        });
        setTimeout(() => setCelebration(null), 3000);
      } else if (newDismissedCount % 3 === 0 && newDismissedCount > 0) {
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
  const timePerEmail = 8; // seconds
  const timeSaved = dismissed[archetype] * timePerEmail;

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite'
        }}
      />

      {/* New layout: Demo on top, analysis panels below */}
      <div className="px-8 py-12 max-w-7xl mx-auto">
        {/* MAIN DEMO SECTION - Full width */}
        <div className="relative flex flex-col mb-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-3">Try it yourself</h2>
            <p className="text-white/60 text-lg">Drag cards or use keyboard arrows</p>
          </div>

          {/* Demo Area */}
          <div className="relative flex-1 flex items-center justify-center">
            {!currentEmail ? (
              /* Empty State */
              <div className="text-center text-white/80">
                <div className="text-4xl mb-6 font-bold text-white">✓</div>
                <div className="text-3xl font-bold mb-3">Inbox Zero!</div>
                <div className="text-lg text-white/60 mb-6">All emails processed</div>
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
            ) : (
              <div className="w-full max-w-2xl">
                {/* Background cards */}
                {filteredEmails.slice(currentIndex + 1, currentIndex + 3).map((email, i) => (
                  <div
                    key={`bg-${currentIndex}-${i}`}
                    className="absolute left-0 right-0 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"
                    style={{
                      top: `${40 + (i + 1) * 12}px`,
                      height: 'calc(100% - 120px)',
                      transform: `scale(${1 - (i + 1) * 0.04}) translateY(${(i + 1) * -18}px)`,
                      opacity: 0.5 - i * 0.2,
                      zIndex: 10 - i,
                      boxShadow: `0 0 50px rgba(139, 92, 246, ${0.12 - i * 0.05}), 0 30px 70px rgba(0, 0, 0, 0.4)`
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
                  className="relative z-20 cursor-grab active:cursor-grabbing hover:shadow-2xl transition-shadow"
                  style={{
                    height: 'calc(100vh - 250px)',
                    maxHeight: '720px',
                    filter: 'drop-shadow(0 0 45px rgba(139, 92, 246, 0.5)) drop-shadow(0 35px 70px rgba(0, 0, 0, 0.6))'
                  }}
                >
                  <div
                    className="w-full rounded-3xl p-6 flex flex-col backdrop-blur-2xl border border-white/30 relative group"
                    style={{
                      background: `linear-gradient(135deg, ${getIntentColor(currentEmail.intent)}25 0%, ${getIntentColor(currentEmail.intent)}10 50%, rgba(0, 0, 0, 0.15) 100%)`,
                      boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 0 60px rgba(255, 255, 255, 0.03), 0 0 60px rgba(139, 92, 246, 0.4)'
                    }}
                  >
                    {/* Shimmer overlay */}
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

                    {/* Hover hint arrows */}
                    {showHint && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-1/2 -translate-y-1/2 right-6 text-white/40 text-4xl z-30 pointer-events-none"
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Action hints */}
                <div className="mt-6 flex items-center justify-center gap-6 text-white/40 text-sm">
                  <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">←</kbd>
                    <span>Archive</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">→</kbd>
                    <span>Execute</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">↑</kbd>
                    <span>More Actions</span>
                  </div>
                  <div className="flex items-center gap-2 hover:text-white/70 transition-colors">
                    <kbd className="px-2 py-1 bg-white/10 rounded text-xs">↓</kbd>
                    <span>Snooze</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => switchArchetype('mail')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all relative ${
                archetype === 'mail'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Mail
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                {remaining}
              </span>
            </button>
            <button
              onClick={() => switchArchetype('ads')}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all relative ${
                archetype === 'ads'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Ads
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[22px] h-5.5 px-1.5 flex items-center justify-center">
                {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
              </span>
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setDismissed({ mail: 0, ads: 0 });
              }}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-white/10 text-white/60 hover:bg-white/20 transition-all"
            >
              ↻ Reset
            </button>
          </div>
        </div>

        {/* TWO-COLUMN PANELS BELOW - AI Analysis and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT PANEL - AI Analysis */}
          <div>
            {currentEmail && (
              <motion.div
                key={`annotation-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{currentEmail.metadata.icon}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-white">AI Analysis</h3>
                    <p className="text-sm text-white/60">Processing email #{currentIndex + 1}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-white/60 mb-2">Intent Tag</div>
                    <div
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg font-bold text-xs shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${(() => {
                          const getIntentColor = (intent: string) => {
                            if (intent.includes('shipping')) return '#f59e0b';
                            if (intent.includes('permission')) return '#10b981';
                            if (intent.includes('billing') || intent.includes('invoice')) return '#ef4444';
                            if (intent.includes('discount') || intent.includes('promo')) return '#8b5cf6';
                            return '#6366f1';
                          };
                          return getIntentColor(currentEmail.intent);
                        })()}dd 0%, ${(() => {
                          const getIntentColor = (intent: string) => {
                            if (intent.includes('shipping')) return '#f59e0b';
                            if (intent.includes('permission')) return '#10b981';
                            if (intent.includes('billing') || intent.includes('invoice')) return '#ef4444';
                            if (intent.includes('discount') || intent.includes('promo')) return '#8b5cf6';
                            return '#6366f1';
                          };
                          return getIntentColor(currentEmail.intent);
                        })()}aa 100%)`,
                        color: 'white',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)'
                      }}
                    >
                      <span className="uppercase tracking-wide text-[10px] font-extrabold">
                        {currentEmail.intent.split('.').slice(-2).join(' - ').replace(/-/g, ' - ').toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-1">Intent Classification</div>
                    <div className="text-white font-medium">{currentEmail.intent}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${(currentEmail.intentConfidence || 0.95) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-white/80">{Math.round((currentEmail.intentConfidence || 0.95) * 100)}%</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-1">Suggested Action</div>
                    <div className="text-white">{currentEmail.suggestedActions.find(a => a.isPrimary)?.displayName || 'Take Action'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-white/60 mb-1">Why it matters</div>
                    <div className="text-white/80 text-sm">{currentEmail.aiSummary?.why || 'Time-sensitive action required'}</div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Progress below AI Analysis */}
            {progress > 0 && currentEmail && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-white">Progress</h3>
                  <span className="text-xl font-bold text-white">{Math.round(progress)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* RIGHT PANEL - Stats and CTA */}
          <div className="space-y-6">
            {/* Stats panel */}
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What You're Saving</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">Time per email</div>
                  <div className="text-white font-semibold">{timePerEmail}s</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">Emails processed</div>
                  <div className="text-white font-semibold">{dismissed[archetype]} of {totalEmails}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white/60 text-sm">Time saved</div>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {timeSaved}s
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            {dismissed[archetype] >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 text-center"
              >
                <div className="text-2xl mb-2">✨</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  You just saved {timeSaved} seconds
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Imagine this for your entire inbox
                </p>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-full transition-all shadow-lg shadow-purple-500/30">
                  Get Early Access →
                </button>
              </motion.div>
            )}
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

      {/* Toast Notification */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/90 text-white px-8 py-4 rounded-2xl text-base font-medium backdrop-blur-xl z-[600] shadow-2xl border border-white/20"
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
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-12 py-8 rounded-3xl shadow-2xl border-4 border-white/30">
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

        kbd {
          font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, PanInfo } from 'framer-motion';
import { Email, EmailType, SuggestedAction } from './types';
import { sampleEmails, getIntentColor, getIntentIcon } from './emailData';
import EmailCard from './EmailCard';
import ActionSheet from './ActionSheet';
import ActionFlowModal from './ActionFlowModal';
import Confetti from './Confetti';

export default function InteractiveDemo() {
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
  const controls = useAnimation();
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Filter emails by current archetype
  const filteredEmails = sampleEmails.filter(email => email.metadata.type === archetype);
  const totalEmails = sampleEmails.filter(email => email.metadata.type === archetype).length;
  const remaining = totalEmails - dismissed[archetype];
  const currentEmail = filteredEmails[currentIndex];

  useEffect(() => {
    // Hide instruction after 3 seconds
    const timer = setTimeout(() => setShowInstruction(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Reset index when switching archetype
    setCurrentIndex(0);
    setShowInstruction(true);
    setTimeout(() => setShowInstruction(false), 3000);
  }, [archetype]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 2000);
  };

  const handleDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Hide instruction after first interaction
    if (showInstruction) {
      setShowInstruction(false);
    }

    const threshold = 100;
    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    let swipeDirection: 'left' | 'right' | 'up' | 'down' | null = null;

    // Determine swipe direction
    if (absX > threshold && absX > absY) {
      // Horizontal swipe
      swipeDirection = info.offset.x > 0 ? 'right' : 'left';
    } else if (absY > threshold && absY > absX) {
      // Vertical swipe
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
        setShowActionSheet(true);
      } else {
        // All other swipes - fly card off screen
        const finalX =
          swipeDirection === 'right' ? 800 : swipeDirection === 'left' ? -800 : info.offset.x * 5;
        const finalY = swipeDirection === 'down' ? 800 : info.offset.y * 5;

        await controls.start({
          x: finalX,
          y: finalY,
          opacity: 0,
          rotate: info.offset.x * 0.5,
          transition: { duration: 0.4 }
        });

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

  const executeSwipeAction = (direction: 'left' | 'right' | 'down') => {
    if (!currentEmail) return;

    const primaryAction =
      selectedAction || currentEmail.suggestedActions.find(a => a.isPrimary) || currentEmail.suggestedActions[0];

    switch (direction) {
      case 'right':
        // Execute primary action - show modal workflow
        setCurrentAction(primaryAction);
        setShowActionModal(true);
        handleDismiss();
        break;

      case 'left':
        // Archive/Dismiss
        showToast(`📥 Archived: ${currentEmail.subject}`);
        handleDismiss();
        break;

      case 'down':
        // Snooze
        showToast(`😴 Snoozed until tomorrow: ${currentEmail.subject}`);
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
        setCelebration({
          type: 'major',
          message: '🎉 Inbox Zero Achieved!'
        });
        setTimeout(() => setCelebration(null), 3000);
      }
      // Mini celebration - Every 3 emails
      else if (newDismissedCount % 3 === 0 && newDismissedCount > 0) {
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

  const progress = totalEmails > 0 ? (dismissed[archetype] / totalEmails) * 100 : 0;

  if (!currentEmail) {
    return (
      <div className="relative w-full max-w-[400px] mx-auto">
        <div
          className="relative w-full aspect-[9/19] rounded-[50px] shadow-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 25%, #1f1f1f 50%, #2a2a2a 75%, #1a1a1a 100%)',
            border: '12px solid transparent',
            backgroundImage: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 25%, #1f1f1f 50%, #2a2a2a 75%, #1a1a1a 100%), linear-gradient(135deg, #3d3d3d, #1a1a1a, #2d2d2d)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.35), 0 0 90px rgba(6, 182, 212, 0.25), 0 0 120px rgba(236, 72, 153, 0.15)',
            animation: 'phoneGlow 4.5s ease-in-out infinite'
          }}
        >
          {/* iPhone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] bg-gray-800 rounded-b-[20px] z-20" />

          {/* Status Bar */}
          <div className="relative h-12 flex items-center justify-between px-8 pt-1 text-white text-sm font-medium z-10">
            <span>9:41</span>
            <span></span>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center h-[calc(100%-8rem)] text-white/80">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-xl font-bold">Inbox Zero!</div>
            <div className="text-sm mt-2">All emails processed</div>
          </div>

          {/* Bottom Nav */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/20 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-10">
            <div className="flex gap-2">
              <button
                onClick={() => switchArchetype('mail')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                  archetype === 'mail'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                Mail
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {sampleEmails.filter(e => e.metadata.type === 'mail').length - dismissed.mail}
                </span>
              </button>
              <button
                onClick={() => switchArchetype('ads')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                  archetype === 'ads'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/60'
                }`}
              >
                Ads
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
                </span>
              </button>
            </div>
            <div className="flex gap-4">
              <button className="text-2xl">↻</button>
              <button className="text-xl relative">
                🛒
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[400px] mx-auto">
      {/* iPhone Mockup */}
      <div
        className="relative w-full aspect-[9/19] rounded-[50px] shadow-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 25%, #1f1f1f 50%, #2a2a2a 75%, #1a1a1a 100%)',
          border: '12px solid transparent',
          backgroundImage: 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 25%, #1f1f1f 50%, #2a2a2a 75%, #1a1a1a 100%), linear-gradient(135deg, #3d3d3d, #1a1a1a, #2d2d2d)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.5), 0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.35), 0 0 90px rgba(6, 182, 212, 0.25), 0 0 120px rgba(236, 72, 153, 0.15)',
          animation: 'phoneGlow 4.5s ease-in-out infinite'
        }}
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.15), rgba(59, 130, 246, 0.15), rgba(236, 72, 153, 0.15), rgba(139, 92, 246, 0.15))',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite'
          }}
        />

        {/* iPhone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-[28px] bg-gray-800 rounded-b-[20px] z-20" />

        {/* Status Bar */}
        <div className="relative h-12 flex items-center justify-between px-8 pt-1 text-white text-sm font-medium z-10">
          <span>9:41</span>
          <span></span>
        </div>

        {/* Instruction */}
        {showInstruction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-16 left-0 right-0 text-center text-white/70 text-xs font-medium px-4 z-10"
          >
            Swipe right to take action
          </motion.div>
        )}

        {/* Email Feed */}
        <div className="relative h-[calc(100%-8rem)] flex items-center justify-center px-6 pt-6 pb-2 overflow-hidden">
          {/* Background cards */}
          {filteredEmails.slice(currentIndex + 1, currentIndex + 3).map((email, i) => (
            <div
              key={`bg-${currentIndex}-${i}`}
              className="absolute top-6 left-6 right-6 bottom-[3.25rem] bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md rounded-3xl border border-white/10 shadow-xl"
              style={{
                transform: `scale(${1 - (i + 1) * 0.05}) translateY(${(i + 1) * -10}px)`,
                opacity: 0.3 - i * 0.15,
                zIndex: 10 - i,
                boxShadow: `0 0 40px rgba(139, 92, 246, ${0.05 - i * 0.03}), 0 20px 50px rgba(0, 0, 0, 0.2)`
              }}
            />
          ))}

          {/* Active Card */}
          <motion.div
            key={`card-${archetype}-${currentIndex}`}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            animate={controls}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
            className="absolute top-6 left-6 right-6 bottom-[3.25rem] z-20 cursor-grab active:cursor-grabbing"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(139, 92, 246, 0.3)) drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5))'
            }}
          >
            <div
              className="w-full h-full rounded-3xl p-4 flex flex-col backdrop-blur-2xl border border-white/30 overflow-y-auto relative"
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
                  onViewClick={() => showToast('Full email view coming soon!')}
                  isAdsCard={currentEmail.metadata.type === 'ads'}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="absolute bottom-20 left-4 right-4 z-10">
            <div className="bg-black/20 backdrop-blur-xl rounded-full p-2 border border-white/10">
              <div className="flex items-center justify-between text-white text-xs font-semibold mb-1 px-2">
                <span className="text-white/60 text-[9px] tracking-wider">INBOX PROGRESS</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
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

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-black/20 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-4 z-10">
          <div className="flex gap-2">
            <button
              onClick={() => switchArchetype('mail')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                archetype === 'mail'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Mail
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {remaining}
              </span>
            </button>
            <button
              onClick={() => switchArchetype('ads')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all relative ${
                archetype === 'ads'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/60'
              }`}
            >
              Ads
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {sampleEmails.filter(e => e.metadata.type === 'ads').length - dismissed.ads}
              </span>
            </button>
          </div>
          <div className="flex gap-4 text-white">
            <button
              onClick={() => {
                setCurrentIndex(0);
                setDismissed({ mail: 0, ads: 0 });
              }}
              className="text-2xl hover:scale-110 transition-transform"
            >
              ↻
            </button>
            <button className="text-xl relative">
              🛒
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                0
              </span>
            </button>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/90 text-white px-6 py-3 rounded-2xl text-sm font-medium backdrop-blur-xl z-[600] shadow-2xl border border-white/20"
          >
            {toast}
          </motion.div>
        )}

        {/* Action Flow Modal - Inside iPhone frame */}
        {showActionModal && currentAction && (
          <ActionFlowModal
            action={currentAction}
            onClose={() => setShowActionModal(false)}
          />
        )}
      </div>

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
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-8 py-6 rounded-3xl shadow-2xl border-4 border-white/30">
              <div className="text-3xl font-extrabold text-center whitespace-nowrap">
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

        @keyframes phoneGlow {
          0%, 100% {
            box-shadow:
              inset 0 1px 2px rgba(255,255,255,0.1),
              inset 0 -1px 2px rgba(0,0,0,0.5),
              0 0 30px rgba(139, 92, 246, 0.5),
              0 0 60px rgba(139, 92, 246, 0.35),
              0 0 90px rgba(6, 182, 212, 0.25),
              0 0 120px rgba(236, 72, 153, 0.15);
          }
          50% {
            box-shadow:
              inset 0 1px 2px rgba(255,255,255,0.15),
              inset 0 -1px 2px rgba(0,0,0,0.6),
              0 0 40px rgba(139, 92, 246, 0.8),
              0 0 80px rgba(139, 92, 246, 0.6),
              0 0 120px rgba(6, 182, 212, 0.4),
              0 0 160px rgba(236, 72, 153, 0.3);
          }
        }
      `}</style>
    </div>
  );
}

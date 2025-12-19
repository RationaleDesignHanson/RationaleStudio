'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface ToastUndoProps {
  message: string;
  onUndo: () => void;
  onExpire: () => void;
  duration?: number; // milliseconds
}

/**
 * Undo Toast Notification
 * Shows a message with an undo button for 4 seconds
 * Allows users to reverse accidental swipe actions
 */
export default function ToastUndo({ message, onUndo, onExpire, duration = 4000 }: ToastUndoProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onExpire();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onExpire]);

  const handleUndo = () => {
    onUndo();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[600] max-w-[95%] md:max-w-2xl"
    >
      <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress bar */}
        <motion.div
          className="h-1 bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
        />

        {/* Content */}
        <div className="flex flex-col gap-3 p-4">
          <div className="text-white text-sm font-medium leading-snug">
            {message}
          </div>
          <button
            onClick={handleUndo}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-semibold rounded-lg transition-colors border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            Undo
          </button>
        </div>
      </div>
    </motion.div>
  );
}

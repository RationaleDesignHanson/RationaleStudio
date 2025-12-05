'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'lucide-react';

interface KeyboardHintsProps {
  // Context for customizing hints based on component
  context?: 'presentation' | 'demo' | 'stepper';
  // Custom hints to show
  hints?: { key: string; description: string }[];
}

export default function KeyboardHints({ context = 'presentation', hints }: KeyboardHintsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // Check if on desktop (not mobile/tablet)
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;

    // Detect Mac for ⌘ vs Ctrl
    const isMacOS = typeof navigator !== 'undefined' && /Mac|iPhone|iPod|iPad/.test(navigator.platform);
    setIsMac(isMacOS);

    if (!isDesktop) {
      return; // Don't show on mobile/tablet
    }

    // Check if user has already seen hints (localStorage)
    const hasSeenHints = localStorage.getItem('athletes-first-keyboard-hints-seen') === 'true';

    if (hasSeenHints) {
      return; // Don't show again
    }

    // Show hints after 2 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Auto-hide after 8 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('athletes-first-keyboard-hints-seen', 'true');
    }, 10000);

    // Hide on any keyboard interaction
    const handleKeyDown = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsVisible(false);
        localStorage.setItem('athletes-first-keyboard-hints-seen', 'true');
      }
    };

    // Hide on any mouse click
    const handleClick = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsVisible(false);
        localStorage.setItem('athletes-first-keyboard-hints-seen', 'true');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleClick);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleClick);
    };
  }, [hasInteracted]);

  // Default hints based on context
  const getDefaultHints = () => {
    switch (context) {
      case 'presentation':
        return [
          { key: '←→', description: 'Navigate slides', icon: <ArrowLeft className="w-3 h-3" /> },
          { key: '↑↓', description: 'Change sections', icon: <ArrowUp className="w-3 h-3" /> },
        ];
      case 'stepper':
        return [
          { key: '←→', description: 'Navigate stages', icon: <ArrowLeft className="w-3 h-3" /> },
        ];
      case 'demo':
      default:
        return [
          { key: 'Tab', description: 'Navigate elements' },
          { key: 'Enter', description: 'Select' },
        ];
    }
  };

  const displayHints = hints || getDefaultHints();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 right-6 z-30 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-black/90 backdrop-blur-md border border-cyan-500/30 rounded-lg px-4 py-3 shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-terminal text-cyan-400 tracking-wider">
            KEYBOARD SHORTCUTS
          </span>
        </div>

        {/* Hints */}
        <div className="space-y-2">
          {context === 'presentation' && (
            <>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                    ←
                  </kbd>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                    →
                  </kbd>
                </div>
                <span className="text-xs text-white/60">Navigate slides</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                    ↑
                  </kbd>
                  <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                    ↓
                  </kbd>
                </div>
                <span className="text-xs text-white/60">Change sections</span>
              </div>
            </>
          )}

          {context === 'stepper' && (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                  ←
                </kbd>
                <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                  →
                </kbd>
              </div>
              <span className="text-xs text-white/60">Navigate stages</span>
            </div>
          )}

          {context === 'demo' && (
            <>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                  Tab
                </kbd>
                <span className="text-xs text-white/60">Navigate elements</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-mono text-white/80">
                  Enter
                </kbd>
                <span className="text-xs text-white/60">Select</span>
              </div>
            </>
          )}
        </div>

        {/* Subtle dismiss hint */}
        <div className="mt-3 pt-2 border-t border-white/10">
          <p className="text-xs text-white/70 text-center font-medium">
            Tap any key to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}

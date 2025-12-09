/**
 * Spec vs Prototype Comparison Diagram
 * Side-by-side comparison showing information loss in spec translation
 * Nielsen Norman Group-style predicted vs actual behavior
 */

'use client';

import { useState } from 'react';

export default function SpecVsPrototypeDiagram() {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {/* Spec Side */}
      <div className="p-6 bg-gray-800/30 border-2 border-gray-700 rounded-lg">
        <div className="text-xs font-bold text-gray-400 mb-4 uppercase tracking-wide">
          20-Page Spec
        </div>

        <div className="bg-gray-900/50 border border-gray-700 rounded p-4 font-mono text-xs text-gray-400 space-y-3">
          <div>
            <div className="text-white font-semibold mb-1">User Story 47:</div>
            <div>"As a user, I want to swipe left to archive emails..."</div>
          </div>

          <div>
            <div className="text-white font-semibold mb-1">Acceptance Criteria:</div>
            <ul className="space-y-1 ml-4">
              <li>• Swipe gesture detected</li>
              <li>• Card animates left</li>
              <li>• Item marked archived</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded">
          <div className="text-xs font-medium text-[#FF4444] mb-1">PROBLEM:</div>
          <div className="text-xs text-gray-400">
            Describes interaction but can't predict actual user behavior
          </div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500 mb-1">↓</div>
          <div className="text-xs text-[#FF4444]">Discovery: Week 16</div>
          <div className="text-xs text-gray-500">4 weeks into production</div>
        </div>
      </div>

      {/* Prototype Side */}
      <div className="p-6 bg-gray-800/30 border-2 border-terminal-gold rounded-lg relative">
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-terminal-gold rounded-full animate-pulse" />

        <div className="text-xs font-bold text-terminal-gold mb-4 uppercase tracking-wide">
          Interactive Prototype
        </div>

        {/* Interactive Card Demo */}
        <div className="bg-gray-900/70 border border-gray-600 rounded-lg p-4">
          <div
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all duration-200"
            style={{
              transform: swipeDirection === 'left' ? 'translateX(-20px)' : swipeDirection === 'right' ? 'translateX(20px)' : 'translateX(0)',
              opacity: swipeDirection ? 0.7 : 1
            }}
            onMouseDown={(e) => {
              const startX = e.clientX;
              const handleMove = (moveEvent: MouseEvent) => {
                const diff = moveEvent.clientX - startX;
                if (Math.abs(diff) > 30) {
                  setSwipeDirection(diff < 0 ? 'left' : 'right');
                }
              };
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
                setTimeout(() => setSwipeDirection(null), 500);
              };
              document.addEventListener('mousemove', handleMove);
              document.addEventListener('mouseup', handleUp);
            }}
          >
            <div className="text-sm font-semibold text-white mb-2">Subject Line</div>
            <div className="text-xs text-gray-400">Email content preview...</div>
            <div className="mt-3 flex justify-between text-xs text-gray-500">
              <span>← swipe</span>
              <span>swipe →</span>
            </div>
          </div>

          <div className="mt-3 text-xs text-gray-400 text-center">
            Try swiping the card above
          </div>
        </div>

        <div className="mt-4 p-3 bg-[#00FF94]/10 border border-[#00FF94]/30 rounded">
          <div className="text-xs font-medium text-[#00FF94] mb-1">USER DISCOVERY:</div>
          <div className="text-xs text-white font-bold mb-1">73% swiped RIGHT instead!</div>
          <div className="text-xs text-gray-400">✓ Pivot in 2 days (not 2 months)</div>
        </div>

        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500 mb-1">↓</div>
          <div className="text-xs text-[#00FF94]">Discovery: Day 3</div>
          <div className="text-xs text-gray-500">Before production commitment</div>
        </div>
      </div>

      {/* Bottom Comparison */}
      <div className="md:col-span-2 mt-4 p-4 bg-gray-800/20 border border-gray-700 rounded-lg">
        <div className="grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-[#FF4444] mb-1">12+ weeks</div>
            <div className="text-xs text-gray-400">Wasted on wrong UX pattern</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#00FF94] mb-1">2 days</div>
            <div className="text-xs text-gray-400">Validated correct pattern early</div>
          </div>
        </div>
      </div>
    </div>
  );
}

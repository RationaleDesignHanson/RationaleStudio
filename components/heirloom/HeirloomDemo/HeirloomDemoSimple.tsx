/**
 * Heirloom Demo - Simplified MVP Version
 * Full version will be in index.tsx after testing
 */

'use client';

import { useState } from 'react';

export function HeirloomDemoSimple() {
  const [step, setStep] = useState<'upload' | 'complete'>('upload');

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-[#faf8f5] to-[#f4f0e8] rounded-xl p-8 flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-[#3d2914] mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
          Interactive Recipe Demo
        </h2>
        <p className="text-lg text-[#5c4033] mb-8">
          Experience how Heirloom transforms handwritten recipe cards into living family heirlooms.
        </p>

        {step === 'upload' ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-[#c9a66b] rounded-lg p-12 bg-white/50">
              <div className="text-6xl mb-4">📸</div>
              <p className="text-[#8b5a2b] mb-4">Upload a recipe card to begin</p>
              <button
                onClick={() => setStep('complete')}
                className="px-6 py-3 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6b4a1b] transition-colors"
              >
                Try Demo
              </button>
            </div>
            <p className="text-sm text-[#a89880]">
              Full interactive demo coming soon...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl mb-4">✅</div>
            <p className="text-xl text-[#2d5a27] font-semibold">Demo Complete!</p>
            <button
              onClick={() => setStep('upload')}
              className="px-6 py-3 bg-[#8b5a2b] text-white rounded-lg hover:bg-[#6b4a1b] transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

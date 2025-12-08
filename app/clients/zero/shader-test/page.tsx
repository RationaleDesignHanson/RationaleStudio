'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ASCIIShaderGrid } from '@/components/visual/ASCIIShaderGrid';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';
import type { CharacterSetName } from '@/components/visual/ASCIIShaderGrid';

export default function ShaderTestPage() {
  const [characterSet, setCharacterSet] = useState<CharacterSetName>('minimal');
  const [opacity, setOpacity] = useState(0.35);

  // Use hero theme for purple/pink colors
  const colorTheme = getSectionTheme('hero');

  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* ASCII Shader Background with Firefly Effects */}
      <div className="absolute inset-0">
        <ASCIIShaderGrid
          opacity={opacity}
          animated={true}
          colorTheme={colorTheme}
          characterSet={characterSet}
          targetFPS={60}
        />
      </div>

      {/* Controls Overlay */}
      <div className="relative z-10 p-8">
        <div className="max-w-md bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-white">Shader Test</h1>
            <Link
              href="/zero"
              className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Back to Demo
            </Link>
          </div>

          <div className="space-y-6">
            {/* Character Set */}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Character Set
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['minimal', 'typography', 'symbols', 'geometric', 'dense'] as const).map((set) => (
                  <button
                    key={set}
                    onClick={() => setCharacterSet(set)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      characterSet === set
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {set.charAt(0).toUpperCase() + set.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-3">
                Opacity: {Math.round(opacity * 100)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>Subtle</span>
                <span>Intense</span>
              </div>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                The shader automatically cycles through 4 different noise patterns (sphere, torus, wave, terrain) every 10 seconds.{' '}
                <strong className="text-white/80">Minimal character set</strong> is cleanest for backgrounds.{' '}
                <strong className="text-white/80">35% opacity</strong> recommended for phone demo.
              </p>
            </div>
          </div>
        </div>

        {/* Preview Note */}
        <div className="mt-4 max-w-md bg-purple-500/20 border border-purple-500/40 rounded-xl p-4">
          <p className="text-sm text-white/90">
            <strong>Preview Mode:</strong> This is how the shader will look behind the phone mockup.
            Adjust settings above, then click "Back to Demo" to see final integration.
          </p>
        </div>
      </div>
    </div>
  );
}

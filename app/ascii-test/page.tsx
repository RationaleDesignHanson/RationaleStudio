/**
 * ASCII Grid Test Page
 *
 * Interactive playground for experimenting with ASCIIUnifiedGrid parameters
 * for Terminal Republic aesthetic
 */

'use client';

import { useState } from 'react';
import { ASCIIUnifiedGrid } from '@/components/visual';
import { watercolorThemes, type WatercolorThemeName } from '@/lib/theme/watercolor-palette';

export default function ASCIITestPage() {
  // Control states
  const [opacity, setOpacity] = useState(0.11);
  const [animated, setAnimated] = useState(true);
  const [themeName, setThemeName] = useState<WatercolorThemeName>('terminalAccent');
  const [charSet, setCharSet] = useState<'default' | 'compute' | 'depth' | 'shapes'>('default');

  const theme = watercolorThemes[themeName];

  // Terminal Republic theme options
  const terminalThemes: WatercolorThemeName[] = [
    'terminalGold',
    'terminalDark',
    'terminalSubtle',
    'terminalAccent',
    'terminalMonochrome',
  ];

  return (
    <div className="min-h-screen bg-black text-gray-50 relative">
      {/* ASCII Grid Background - Behind everything */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ASCIIUnifiedGrid
          opacity={opacity}
          animated={animated}
          colorTheme={theme}
          charSet={charSet}
        />
      </div>

      {/* Control Panel */}
      <div className="relative z-10 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-[#FFD700]">
              ASCII Grid Test Lab
            </h1>
            <p className="text-gray-400">
              Experiment with ASCIIUnifiedGrid parameters for Terminal Republic aesthetic
            </p>
          </div>

          {/* Control Panel Card */}
          <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">Controls</h2>

            {/* Opacity Control */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Opacity: <span className="text-[#FFD700]">{opacity.toFixed(2)}</span>
              </label>
              <input
                type="range"
                min="0"
                max="0.3"
                step="0.01"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.00 (invisible)</span>
                <span>0.30 (max)</span>
              </div>
              {/* Recommended ranges */}
              <div className="mt-2 text-xs text-gray-400">
                <span className="mr-4">Hero: 0.10-0.12</span>
                <span className="mr-4">Products: 0.12-0.14</span>
                <span className="mr-4">Services: 0.08-0.10</span>
                <span>Footer: 0.05-0.07</span>
              </div>
            </div>

            {/* Animation Toggle */}
            <div className="mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  className="w-5 h-5 mr-3 accent-[#FFD700]"
                />
                <span className="text-sm font-medium">
                  Enable Animation (3D noise patterns)
                </span>
              </label>
            </div>

            {/* Character Set Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                ASCII Character Set
                <span className="ml-2 text-xs text-gray-500">(auto-cycles with noise patterns when set to "Auto")</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'default', name: 'Auto', chars: 'varies', desc: 'Matches noise pattern' },
                  { id: 'compute', name: 'Compute', chars: ' · + × ÷ = ≈ ≠', desc: 'Mathematical/technical' },
                  { id: 'depth', name: 'Depth', chars: ' ∙ • ● ◉ ⦿ ◎ ⬤', desc: 'Bolder depth progression' },
                  { id: 'shapes', name: 'Shapes', chars: ' ∘ ∙ • ○ ● ◉ ⦿', desc: 'Emphasized circles' },
                ].map((set) => (
                  <button
                    key={set.id}
                    onClick={() => setCharSet(set.id as any)}
                    className={`p-3 rounded border transition-all ${
                      charSet === set.id
                        ? 'border-[#FFD700] bg-[#FFD700]/10'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm mb-1">{set.name}</div>
                      <div className="text-xs text-gray-400 mb-1 font-mono">{set.chars}</div>
                      <div className="text-[10px] text-gray-500">{set.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Terminal Republic Theme
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {terminalThemes.map((name) => {
                  const t = watercolorThemes[name];
                  return (
                    <button
                      key={name}
                      onClick={() => setThemeName(name)}
                      className={`p-3 rounded border transition-all ${
                        themeName === name
                          ? 'border-[#FFD700] bg-[#FFD700]/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm mb-1">{t.name}</div>
                        <div className="text-xs text-gray-400">{t.description}</div>
                        <div className="flex gap-1 mt-2">
                          {t.colors.map((color, i) => (
                            <div
                              key={i}
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Config Display */}
            <div className="border-t border-gray-800 pt-4">
              <div className="text-xs font-mono text-gray-400">
                <div className="mb-1">Current Configuration:</div>
                <pre className="text-[10px] leading-relaxed">
{`<ASCIIUnifiedGrid
  opacity={${opacity.toFixed(2)}}
  animated={${animated}}
  colorTheme={${themeName}}
  charSet="${charSet}"
/>`}
                </pre>
              </div>
            </div>
          </div>

          {/* Section Previews */}
          <div className="space-y-8">
            <SectionPreview
              title="Hero Section"
              subtitle="First impression - confidence signal"
              recommendedOpacity="0.10-0.12"
              theme={theme}
              charSet={charSet}
              glowIntensity="medium"
            />

            <SectionPreview
              title="Products Showcase"
              subtitle="Stage for working software"
              recommendedOpacity="0.12-0.14"
              theme={theme}
              charSet={charSet}
              glowIntensity="high"
            />

            <SectionPreview
              title="Services / Process"
              subtitle="Structured blueprint feel"
              recommendedOpacity="0.08-0.10"
              theme={theme}
              charSet={charSet}
              glowIntensity="low"
            />

            <SectionPreview
              title="Footer"
              subtitle="Aesthetic completion"
              recommendedOpacity="0.05-0.07"
              theme={theme}
              charSet={charSet}
              glowIntensity="none"
            />
          </div>

          {/* Noise Pattern Info */}
          <div className="mt-8 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              Noise Patterns (cycles every 8s)
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm mb-6">
              <div className="p-3 bg-gray-800/50 rounded">
                <div className="font-medium text-gray-50 mb-1">Organic Flow</div>
                <div className="text-xs text-gray-400">Layered perlin-like → depth characters (∙ • ● ◉ ⦿)</div>
              </div>
              <div className="p-3 bg-gray-800/50 rounded">
                <div className="font-medium text-gray-50 mb-1">Turbulent Clouds</div>
                <div className="text-xs text-gray-400">Cloud-like drifting → circle variants (∘ ∙ • ○ ● ◉)</div>
              </div>
              <div className="p-3 bg-gray-800/50 rounded">
                <div className="font-medium text-gray-50 mb-1">Plasma Stream</div>
                <div className="text-xs text-gray-400">Flowing plasma → balanced mix (∙ • ● + × ◉)</div>
              </div>
              <div className="p-3 bg-gray-800/50 rounded">
                <div className="font-medium text-gray-50 mb-1">Chaotic Field</div>
                <div className="text-xs text-gray-400">Emergent interference → math symbols (÷ = ≈)</div>
              </div>
            </div>
          </div>

          {/* Brand Guidelines */}
          <div className="mt-8 bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#FFD700]">
              Brand Guidelines
            </h2>
            <div className="space-y-3 text-sm text-gray-300">
              <p>
                <strong className="text-gray-50">Restraint = Credibility:</strong> ASCII grids should enhance, not distract.
                If a visitor remembers the grid instead of Zero Inbox, we've failed.
              </p>
              <p>
                <strong className="text-gray-50">Performance Matters:</strong> Canvas-based, 10 FPS throttled.
                Organic randomization breaks grid pattern for continuous feel.
              </p>
              <p>
                <strong className="text-gray-50">Proof Dominates:</strong> Never apply ASCII to forms, pricing, or proof sections.
                Clarity over aesthetic.
              </p>
              <p>
                <strong className="text-gray-50">Accessibility First:</strong> Animation respects prefers-reduced-motion.
                Mobile gets reduced or static grids.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionPreview({
  title,
  subtitle,
  recommendedOpacity,
  theme,
  charSet,
  glowIntensity = 'none',
}: {
  title: string;
  subtitle: string;
  recommendedOpacity: string;
  theme: any;
  charSet: 'default' | 'compute' | 'depth' | 'shapes';
  glowIntensity?: 'none' | 'low' | 'medium' | 'high';
}) {
  // Parse opacity range and use midpoint
  const [min, max] = recommendedOpacity.split('-').map(s => parseFloat(s));
  const previewOpacity = (min + max) / 2;

  // Glow styles based on intensity (reduced by ~1/3)
  const glowStyles = {
    none: '',
    low: 'shadow-[0_0_10px_rgba(255,215,0,0.10)]',
    medium: 'shadow-[0_0_17px_rgba(255,215,0,0.17)]',
    high: 'shadow-[0_0_23px_rgba(255,215,0,0.23)]',
  };

  const glowLabels = {
    none: '',
    low: ' + low glow',
    medium: ' + medium glow',
    high: ' + high glow',
  };

  return (
    <div className={`bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-lg p-6 relative overflow-hidden min-h-[120px] ${glowStyles[glowIntensity]}`}>
      {/* ASCII Grid Preview at recommended opacity */}
      <div className="absolute inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={previewOpacity}
          animated={true}
          colorTheme={theme}
          charSet={charSet}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-gray-50 mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-2">{subtitle}</p>
        <div className="text-xs text-gray-500">
          Recommended opacity: <span className="text-[#FFD700]">{recommendedOpacity}</span>
          {' '}(showing {previewOpacity.toFixed(2)}{glowLabels[glowIntensity]})
        </div>
      </div>
    </div>
  );
}

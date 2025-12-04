'use client';

import { RotateCw } from 'lucide-react';

interface RotateDeviceOverlayProps {
  show: boolean;
  demoName?: string;
}

export default function RotateDeviceOverlay({ show, demoName }: RotateDeviceOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-white p-8 animate-in fade-in duration-300">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
        <RotateCw className="w-32 h-32 text-cyan-400 relative z-10" style={{ animation: 'spin 4s linear infinite' }} />
      </div>

      <h2 className="text-3xl font-bold mb-4 text-center">
        Rotate Your Device
      </h2>

      <p className="text-center text-white/80 text-lg max-w-md mb-2">
        {demoName ? `${demoName} works best in landscape mode` : 'This demo works best in landscape mode'}
      </p>

      <p className="text-center text-white/60 text-sm">
        Turn your device sideways for the best experience
      </p>

      <div className="mt-8 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse" />
        <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.2s' }} />
        <div className="w-3 h-3 rounded-full bg-white/40 animate-pulse" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );
}

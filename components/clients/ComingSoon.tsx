import Link from 'next/link';
import { ClientConfig } from '@/lib/clients-config';

interface ComingSoonProps {
  client: ClientConfig;
}

export default function ComingSoon({ client }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      {/* Background effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 scanline" />
      </div>

      {/* Content */}
      <div className="relative w-full max-w-2xl text-center">
        {/* Terminal header */}
        <div className="text-white/50 font-terminal text-sm mb-4">
          $ STATUS_CHECK {client.id.toUpperCase()}
        </div>

        {/* Client name */}
        <h1
          className="text-6xl font-bold mb-6"
          style={{ color: client.brandColor }}
        >
          {client.name}
        </h1>

        {/* Coming soon message */}
        <div className="mb-8">
          <div className="inline-block px-6 py-3 border-2 bg-black/60 backdrop-blur-sm mb-4"
            style={{ borderColor: client.brandColor }}
          >
            <p className="text-2xl font-terminal font-bold text-white">
              COMING_SOON
            </p>
          </div>

          {client.description && (
            <p className="text-white/70 text-lg font-terminal max-w-xl mx-auto">
              {client.description}
            </p>
          )}
        </div>

        {/* Loading animation */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: client.brandColor,
              animationDelay: '0ms'
            }}
          />
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: client.brandColor,
              animationDelay: '150ms'
            }}
          />
          <div
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: client.brandColor,
              animationDelay: '300ms'
            }}
          />
        </div>

        {/* Status message */}
        <div className="bg-black/40 backdrop-blur-sm border border-white/10 p-6 mb-8 font-terminal text-sm text-white/60">
          <p className="mb-2">{'>'} Initializing pitch presentation...</p>
          <p className="mb-2">{'>'} Loading client assets...</p>
          <p>{'>'} Status: IN_DEVELOPMENT</p>
        </div>

        {/* Back button */}
        <Link
          href="/clients"
          className="inline-block px-8 py-4 font-terminal font-bold text-white transition-all hover:scale-105"
          style={{ backgroundColor: client.brandColor }}
        >
          ← BACK TO CLIENTS
        </Link>

        {/* Glow effect */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${client.brandColor}, transparent 70%)`
          }}
        />
      </div>
    </div>
  );
}

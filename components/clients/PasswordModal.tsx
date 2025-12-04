'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ClientConfig } from '@/lib/clients-config';
import {
  hashPassword,
  createSession,
  hasValidSession,
  isRateLimited,
  recordFailedAttempt,
  resetRateLimit,
  getLockoutTimeRemaining
} from '@/lib/auth/client-auth';
import { ASCIIUnifiedGrid } from '@/components/visual';

interface PasswordModalProps {
  client: ClientConfig;
  onSuccess?: () => void;
}

export default function PasswordModal({ client, onSuccess }: PasswordModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  // Update lockout timer
  useEffect(() => {
    if (isRateLimited(client.id)) {
      setLockoutTime(getLockoutTimeRemaining(client.id));

      const timer = setInterval(() => {
        const remaining = getLockoutTimeRemaining(client.id);
        setLockoutTime(remaining);

        if (remaining === 0) {
          clearInterval(timer);
          setError('');
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [client.id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Check rate limiting
    if (isRateLimited(client.id)) {
      const remaining = getLockoutTimeRemaining(client.id);
      setError(`Too many attempts. Please wait ${remaining} seconds.`);
      setLockoutTime(remaining);
      return;
    }

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    try {
      // Verify username and password with API (with cache-busting)
      const response = await fetch('/api/clients/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        // Failed attempt
        recordFailedAttempt(client.id);

        if (isRateLimited(client.id)) {
          const remaining = getLockoutTimeRemaining(client.id);
          setError(`Too many attempts. Locked for ${remaining} seconds.`);
          setLockoutTime(remaining);
        } else {
          setError('Invalid credentials. Please try again.');
        }
        setUsername('');
        setPassword('');
        return;
      }

      // Success - create session and trigger callback
      resetRateLimit(client.id);
      createSession(client.id);

      // Small delay to ensure sessionStorage is written before triggering callback
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 100);
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const primaryColor = '#FFD700'; // Terminal Republic Gold

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Terminal Republic Shader Background */}
      <div className="fixed inset-0 pointer-events-none">
        <ASCIIUnifiedGrid
          opacity={0.08}
          animated={true}
          colorTheme={['#1f2937', '#374151', '#FFD700']}
          charSet="minimal"
        />
      </div>

      {/* Modal */}
      <div className="relative w-full max-w-md z-10">
        {/* Terminal Republic Container */}
        <div
          className="relative bg-black/90 p-8 shadow-2xl backdrop-blur-md rounded-lg transition-all border-2"
          style={{
            borderColor: `${primaryColor}30`,
            boxShadow: `0 0 30px rgba(255, 215, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.5)`
          }}
        >
          {/* Header */}
          <div className="mb-8 text-center relative">
            {/* Terminal dots */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[#FFD700]" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/60" />
              <div className="w-2 h-2 rounded-full bg-[#FFD700]/30" />
            </div>

            <div className="text-[#FFD700]/70 font-mono text-xs tracking-widest mb-3 uppercase">
              Access Required
            </div>
            <h1
              className="text-3xl font-bold mb-2 font-mono tracking-wide text-[#FFD700]"
              style={{
                textShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
              }}
            >
              {client.name}
            </h1>
            <p className="text-gray-300 text-sm font-mono">
              Enter password to view pitch presentation
            </p>
          </div>

          {/* Thank you message */}
          <div className="mb-6 p-4 relative bg-[#FFD700]/5 border border-[#FFD700]/20 rounded-lg">
            <p className="text-gray-300 text-sm font-mono leading-relaxed relative z-10">
              "Thank you for inviting us to present this work. We're honored by the opportunity and eager to support the athletes and vision of {client.name}."
            </p>
          </div>

          {/* Navigation Instructions */}
          <div className="mb-6 p-4 relative bg-black/50 border border-[#FFD700]/20 rounded-lg">
            <div className="text-[#FFD700] font-mono text-xs tracking-widest mb-2 relative z-10">
              HOW TO NAVIGATE
            </div>
            <div className="space-y-2 relative z-10">
              {/* Mobile Instructions */}
              <div className="flex items-start gap-2 lg:hidden">
                <div className="text-[#FFD700] text-lg mt-0.5">👆</div>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                  <span className="text-gray-200 font-semibold">On mobile:</span> Swipe the top navigation bar left or right to move between sections
                </p>
              </div>
              {/* Desktop Instructions */}
              <div className="hidden lg:flex items-start gap-2">
                <div className="text-[#FFD700] text-lg mt-0.5">🖱️</div>
                <p className="text-gray-400 text-xs font-mono leading-relaxed">
                  <span className="text-gray-200 font-semibold">On desktop:</span> Use keyboard arrow keys to navigate between sections
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-mono text-gray-400 mb-2 tracking-wide uppercase"
              >
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading || lockoutTime > 0}
                  className="w-full px-4 py-4 bg-black/70 border-2 border-[#FFD700]/20 text-white text-lg font-mono focus:outline-none focus:border-[#FFD700] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10 rounded-lg"
                  style={{
                    borderColor: username ? primaryColor : undefined,
                    boxShadow: username ? `0 0 20px rgba(255, 215, 0, 0.3)` : undefined
                  }}
                  placeholder="Enter username"
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-mono text-gray-400 mb-2 tracking-wide uppercase"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading || lockoutTime > 0}
                  className="w-full px-4 py-4 bg-black/70 border-2 border-[#FFD700]/20 text-white text-lg font-mono focus:outline-none focus:border-[#FFD700] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative z-10 rounded-lg"
                  style={{
                    borderColor: password ? primaryColor : undefined,
                    boxShadow: password ? `0 0 20px rgba(255, 215, 0, 0.3)` : undefined
                  }}
                  placeholder="Enter password"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 border-2 border-red-500/50 bg-red-500/10 relative rounded-lg">
                <p className="text-red-400 text-sm font-mono relative z-10">
                  ✗ {error}
                </p>
              </div>
            )}

            {/* Lockout Timer */}
            {lockoutTime > 0 && (
              <div className="p-3 border border-[#FFD700]/50 bg-[#FFD700]/10 rounded-lg">
                <p className="text-[#FFD700] text-sm font-mono">
                  ⏱ Locked: {lockoutTime}s remaining
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || lockoutTime > 0 || !username.trim() || !password.trim()}
              className="w-full px-6 py-4 font-mono font-bold text-black text-lg uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group rounded-lg bg-[#FFD700] hover:bg-[#FFD700]/90"
              style={{
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.4), 0 4px 6px rgba(0, 0, 0, 0.5)'
              }}
            >
              <span className="relative z-10">
                {isLoading ? 'VERIFYING...' : 'ACCESS PITCH'}
              </span>
            </button>
          </form>

          {/* Footer hint */}
          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs tracking-widest uppercase mb-4 font-mono">
              Protected Access
            </p>
            <a
              href="/"
              className="text-white/50 hover:text-[#FFD700] text-sm font-mono transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>

        {/* Outer glow */}
        <div
          className="absolute inset-0 -z-10 blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${primaryColor}, transparent 70%)`
          }}
        />
      </div>

    </div>
  );
}

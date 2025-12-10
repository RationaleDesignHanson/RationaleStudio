/**
 * PasswordGate Component
 *
 * Simple password protection for case studies and investor content.
 * Stores access in session storage for duration of session.
 *
 * Phase 4.2: Migrated to BaseCard universal foundation
 */

'use client';

import { useState, useEffect, ReactNode } from 'react';
import { ResponsiveText } from '@/lib/ui/responsive';
import { BaseCard } from '@/components/ui/BaseCard';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';

interface PasswordGateProps {
  children: ReactNode;
  password: string;
  storageKey: string; // Unique key for this protected content
  title?: string;
  description?: string;
  className?: string;
}

export function PasswordGate({
  children,
  password,
  storageKey,
  title = 'Protected Content',
  description = 'This content is password protected. Please enter the password to continue.',
  className = ''
}: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already unlocked in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem(storageKey);
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }
      setIsLoading(false);
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (inputPassword === password) {
      setIsUnlocked(true);
      sessionStorage.setItem(storageKey, 'true');
    } else {
      setError('Incorrect password. Please try again.');
      setInputPassword('');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-muted">Loading...</div>
      </div>
    );
  }

  // Show protected content if unlocked
  if (isUnlocked) {
    return <>{children}</>;
  }

  // Show password form
  return (
    <div className={`min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 ${className}`}>
      <div className="max-w-md w-full p-8 bg-gray-900/90 border border-gray-700 rounded-lg shadow-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">{description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter password"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!inputPassword}
            className="w-full px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            Access Content
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-700 text-center">
          <p className="text-xs sm:text-sm text-gray-400">
            Need access?{' '}
            <a href="/contact" className="text-purple-400 hover:text-purple-300 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Minimal Password Gate (Inline variant)
 * Smaller form that can be embedded in page content
 */
export function PasswordGateInline({
  children,
  password,
  storageKey,
  className = ''
}: Omit<PasswordGateProps, 'title' | 'description'>) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem(storageKey);
      if (unlocked === 'true') {
        setIsUnlocked(true);
      }
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      setIsUnlocked(true);
      sessionStorage.setItem(storageKey, 'true');
    } else {
      setError('Incorrect password');
      setInputPassword('');
    }
  };

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className={`p-6 rounded-lg border border-border bg-accent/5 ${className}`}>
      <p className="text-sm text-muted mb-4">
        = This content is password protected
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="flex-1 px-3 py-2 text-sm rounded border border-border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Password"
        />
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium bg-accent text-white rounded hover:bg-accent/90 transition-colors"
        >
          Unlock
        </button>
      </form>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}

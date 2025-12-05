'use client';

import { useState, useEffect, ReactNode } from 'react';
import { GlassCard } from '@/components/visual';
import { getSectionTheme } from '@/lib/theme/watercolor-palette';

interface PasswordProtectedProps {
  children: ReactNode;
  password: string;
  hint?: string;
}

export function PasswordProtected({ children, password, hint }: PasswordProtectedProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const theme = getSectionTheme('content');

  useEffect(() => {
    // Check if already authenticated in session
    const authenticated = sessionStorage.getItem('canvas_authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === password) {
      sessionStorage.setItem('canvas_authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
      setInputPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-gray-900 via-black to-gray-900">
        <GlassCard theme={theme} className="p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-2">Protected Content</h2>
          <p className="text-sm text-gray-400 mb-6">
            This case study is password protected. {hint && `Hint: ${hint}`}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-900/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50"
                placeholder="Enter password"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Unlock
            </button>
          </form>
        </GlassCard>
      </div>
    );
  }

  return <>{children}</>;
}

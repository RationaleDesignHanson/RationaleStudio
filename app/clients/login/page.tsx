/**
 * Client Login Page
 *
 * Password-protected gate for client presentations
 * Credentials: af1 / halloffame → Athletes First deck
 */

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout/Container';

// Client credentials mapping
const CLIENT_CREDENTIALS: Record<string, { password: string; redirectPath: string }> = {
  'A1': {
    password: 'halloffame',
    redirectPath: '/clients/athletes-first/pitch-deck'
  },
  'CREAIT': {
    password: 'realestate',
    redirectPath: '/clients/creait/pitch-deck'
  }
};

export default function ClientLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple client-side authentication
    const normalizedUsername = username.toUpperCase().trim();
    const client = CLIENT_CREDENTIALS[normalizedUsername];

    if (!client) {
      setError('Invalid credentials');
      setIsLoading(false);
      return;
    }

    if (client.password !== password) {
      setError('Invalid credentials');
      setIsLoading(false);
      return;
    }

    // Store authentication in session storage
    sessionStorage.setItem('client-auth', normalizedUsername);

    // Redirect to client's presentation
    router.push(client.redirectPath);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
            {/* Logo/Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Rationale Client Portal
              </h1>
              <p className="text-gray-400 text-sm">
                Enter your credentials to access your presentation
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#FFD700] text-black font-medium py-3 px-4 rounded-md hover:bg-[#FFD700]/90 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Authenticating...' : 'Access Presentation'}
              </button>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Need access?{' '}
                <a
                  href="/contact"
                  className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors"
                >
                  Contact us
                </a>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-gray-400 hover:text-[#FFD700] transition-colors"
            >
              ← Back to Rationale.studio
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}

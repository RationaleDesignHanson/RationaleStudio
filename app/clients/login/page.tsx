/**
 * Client Login Page
 *
 * Firebase Authentication for client portal access
 * Redirects to client-specific dashboards based on custom claims
 */

'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/layout/Container';
import { useAuth } from '@/lib/auth/AuthContext';

// Client redirect mapping based on clientId custom claim
const CLIENT_REDIRECTS: Record<string, string> = {
  'athletes-first': '/clients/athletes-first/pitch-deck',
  'creait': '/clients/creait/pitch-deck',
  'zero': '/clients/zero/investor',
  'global': '/clients', // For owner/team with global access
};

function ClientLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirect = searchParams.get('redirect');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const profile = await signIn(email, password);

      // Determine redirect based on role and clientId custom claim
      let destination = '/clients';

      if (profile.role === 'client' && profile.clientId) {
        // Client user - redirect to their specific portal
        destination = CLIENT_REDIRECTS[profile.clientId] || '/clients';
      } else if (['owner', 'team'].includes(profile.role)) {
        // Owner/team can access all clients
        destination = redirect || '/clients';
      } else {
        // Other roles don't have client access
        setError('You do not have access to the client portal');
        setIsLoading(false);
        return;
      }

      router.push(destination);
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
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
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                  placeholder="Enter your email"
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
{isLoading ? 'Signing in...' : 'Sign In'}
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

export default function ClientLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFD700]">Loading...</div>
      </div>
    }>
      <ClientLoginForm />
    </Suspense>
  );
}

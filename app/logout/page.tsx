/**
 * Logout Page
 *
 * Signs out user and clears session
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { Container } from '@/components/layout';
import { ButtonPrimary } from '@/components/ui/ButtonHierarchy';
import { logger } from '@/lib/utils/logger';

export default function LogoutPage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(true);

  useEffect(() => {
    async function performLogout() {
      try {
        await signOut();
        // Wait a moment before redirecting
        setTimeout(() => {
          router.push('/login');
        }, 1000);
      } catch (error) {
        logger.error('Logout error:', error);
        setIsLoggingOut(false);
      }
    }

    performLogout();
  }, [signOut, router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <div className="p-8">
            {isLoggingOut ? (
              <>
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terminal-gold mx-auto mb-6"></div>
                <h1 className="text-2xl font-semibold text-white mb-2">
                  Signing Out
                </h1>
                <p className="text-gray-400 text-sm">
                  Please wait while we log you out...
                </p>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold text-white mb-2">
                  Logout Failed
                </h1>
                <p className="text-gray-400 text-sm mb-6">
                  There was an error signing you out. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-terminal-gold text-black font-medium rounded-lg hover:bg-terminal-gold/90 transition-colors"
                >
                  Retry
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

/**
 * Client Auth Guard
 *
 * Protects client pages by checking for valid session authentication
 * Redirects to login if not authenticated
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClientAuthGuardProps {
  children: React.ReactNode;
  requiredClient: string;
}

export function ClientAuthGuard({ children, requiredClient }: ClientAuthGuardProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication from session storage
    const clientAuth = sessionStorage.getItem('client-auth');

    // Allow GLOBAL auth token to access all pages
    if (!clientAuth || (clientAuth !== requiredClient && clientAuth !== 'GLOBAL')) {
      // Not authenticated or wrong client - redirect to login
      router.push('/clients/login');
    } else {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, [requiredClient, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#FFD700] text-lg">Loading...</div>
      </div>
    );
  }

  // Only render children if authenticated
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Creait Strategic Roadmap Pitch Component
 *
 * Redirects to the full strategic roadmap presentation
 * This is used when accessing via secure pitch link
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/layout';
import { Loader2 } from 'lucide-react';

export function CreaitRoadmap() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the strategic roadmap after a brief moment
    const timer = setTimeout(() => {
      router.push('/clients/creait/strategic-roadmap');
    }, 1000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container>
        <div className="max-w-md mx-auto text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#FFD700] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">
            Loading Strategic Roadmap
          </h1>
          <p className="text-gray-400">
            Redirecting you to the presentation...
          </p>
        </div>
      </Container>
    </div>
  );
}

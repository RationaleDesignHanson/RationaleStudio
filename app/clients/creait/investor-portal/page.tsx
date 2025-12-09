/**
 * CREaiT Internal Portal - Password Gate
 *
 * Second layer of authentication for detailed product documentation
 * Password: 123456
 */

'use client';

import { useState, useEffect } from 'react';
import { CRESection, CRECard } from '@/components/creait/ui';
import { H2, H3, BodyLG, BodyMD, LabelSM } from '@/components/creait/typography';
import { CRE_COLORS } from '@/lib/creait/design-tokens/colors';
import InvestorPortalContent from './InvestorPortalContent';

const INVESTOR_PASSWORD = '123456';

export default function InvestorPortalPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('creait-internal-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === INVESTOR_PASSWORD) {
      sessionStorage.setItem('creait-internal-auth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  if (isLoading) {
    return ( <div className="min-h-screen bg-black flex items-center justify-center"> <div className="text-gray-400">Loading...</div> </div> );
  }

  if (isAuthenticated) {
    return <InvestorPortalContent />;
  }

  return ( <div className="min-h-screen bg-black flex items-center justify-center p-4"> <div className="max-w-md w-full"> <CRECard variant="primary"> {/* Header */} <div className="text-center mb-6"> <div className="text-4xl mb-4"></div> <H2 className="mb-2">Internal Portal</H2> <BodyMD color={CRE_COLORS.text.secondary}> Access detailed product documentation, technical specifications, and development roadmap </BodyMD> </div> {/* Password Form */} <form onSubmit={handleSubmit} className="space-y-4"> {error && ( <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm"> {error} </div> )} <div> <label htmlFor="internal-password" className="block text-sm font-medium text-gray-300 mb-2"> Access Password </label> <input
                id="internal-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent transition-colors"
                placeholder="Enter access password"
              /> </div> <button
              type="submit"
              className="w-full bg-[#FFD700] text-black font-medium py-3 px-4 rounded-md hover:bg-terminal-gold/90 focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            > Access Portal </button> </form> {/* Back Link */} <div className="mt-6 text-center"> <a
              href="/clients/creait/pitch-deck/12-why-we-win"
              className="text-sm text-gray-400 hover:text-terminal-gold transition-colors"
            > ← Back to Pitch Deck </a> </div> </CRECard> </div> </div> );
}

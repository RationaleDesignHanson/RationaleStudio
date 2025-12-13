/**
 * Unified Pitch Experience
 *
 * Combines contract modeling and full interactive experience
 * - Shows 3-team contract comparison by default (responsive)
 * - Desktop: Side-by-side canvas view
 * - Mobile: Swipeable carousel
 * - Clicking a team opens full experience with that contract
 * - Back button returns to contract comparison
 */

'use client';

import { useState, useEffect } from 'react';
import ContractModelingCanvas from './ContractModelingCanvas';
import ContractModelingMobile from './ContractModelingMobile';
import ImmersivePitchDemo from './ImmersivePitchDemo';

export default function UnifiedPitchExperience() {
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (selectedContract) {
    return (
      <div className="space-y-4">
        {/* Back button */}
        <button
          onClick={() => setSelectedContract(null)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-mono rounded-lg transition-all flex items-center gap-2"
        >
          ← Back to Contracts
        </button>

        {/* Full experience */}
        <ImmersivePitchDemo selectedContract={selectedContract} />
      </div>
    );
  }

  return isMobile ? (
    <ContractModelingMobile
      onContractClick={(contract) => setSelectedContract(contract)}
    />
  ) : (
    <ContractModelingCanvas
      onContractClick={(contract) => setSelectedContract(contract)}
    />
  );
}

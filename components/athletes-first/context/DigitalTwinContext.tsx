'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ConsentScope {
  campaignType: string;
  territories: string[];
  startDate: string;
  endDate: string;
  transformations: string[];
}

interface DigitalTwinContextType {
  consentScope: ConsentScope;
  setConsentScope: (scope: ConsentScope) => void;
  hasConfiguredConsent: boolean;
  setHasConfiguredConsent: (configured: boolean) => void;
}

const defaultConsentScope: ConsentScope = {
  campaignType: 'Regional Endorsement',
  territories: ['United States'],
  startDate: '2025-01',
  endDate: '2025-12',
  transformations: ['Voice Generation', 'Image Compositing']
};

const DigitalTwinContext = createContext<DigitalTwinContextType | undefined>(undefined);

export function DigitalTwinProvider({ children }: { children: ReactNode }) {
  const [consentScope, setConsentScope] = useState<ConsentScope>(defaultConsentScope);
  const [hasConfiguredConsent, setHasConfiguredConsent] = useState(false);

  return (
    <DigitalTwinContext.Provider
      value={{
        consentScope,
        setConsentScope,
        hasConfiguredConsent,
        setHasConfiguredConsent
      }}
    >
      {children}
    </DigitalTwinContext.Provider>
  );
}

export function useDigitalTwin() {
  const context = useContext(DigitalTwinContext);
  if (context === undefined) {
    throw new Error('useDigitalTwin must be used within a DigitalTwinProvider');
  }
  return context;
}

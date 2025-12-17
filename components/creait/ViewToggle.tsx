/**
 * ViewToggle Component
 *
 * Allows users to switch between Executive and Technical views.
 * Executive view shows simplified, business-focused content.
 * Technical view shows complete specifications with code examples.
 */

'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import { logger } from '@/lib/utils/logger';

type View = 'executive' | 'technical';

interface ViewContextType {
  view: View;
  setView: (view: View) => void;
}

const ViewContext = createContext<ViewContextType>({
  view: 'executive',
  setView: () => {},
});

export function useView() {
  return useContext(ViewContext);
}

interface ViewProviderProps {
  children: ReactNode;
  defaultView?: View;
}

export function ViewProvider({ children, defaultView = 'executive' }: ViewProviderProps) {
  const [view, setView] = useState<View>(defaultView);

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}

interface ViewToggleProps {
  executiveLabel?: string;
  technicalLabel?: string;
}

export function ViewToggle({ executiveLabel = 'Executive View', technicalLabel = 'Technical View' }: ViewToggleProps = {}) {
  const { view, setView } = useView();

  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-lg bg-muted/30 border border-border">
      <button
        onClick={() => {
          logger.log('Switching to executive view');
          setView('executive');
        }}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
          view === 'executive'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
      >
        {executiveLabel}
      </button>
      <button
        onClick={() => {
          logger.log('Switching to technical view');
          setView('technical');
        }}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-all cursor-pointer ${
          view === 'technical'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted hover:text-foreground'
        }`}
      >
        {technicalLabel}
      </button>
    </div>
  );
}

interface ViewContentProps {
  executive?: ReactNode;
  technical?: ReactNode;
  both?: ReactNode;
}

/**
 * Conditionally render content based on current view
 */
export function ViewContent({ executive, technical, both }: ViewContentProps) {
  const { view } = useView();

  logger.log('ViewContent rendering with view:', view);

  if (both) return <>{both}</>;

  return (
    <>
      {view === 'executive' && executive}
      {view === 'technical' && technical}
    </>
  );
}

'use client';

import { useEffect } from 'react';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { useDemoAnalytics } from '@/hooks/useDemoAnalytics';
import MobileNativeDemo from './layouts/MobileNativeDemo';
import TabletFullWidthDemo from './layouts/TabletFullWidthDemo';
import DesktopAnnotatedDemo from './layouts/DesktopAnnotatedDemo';
import GuidedTutorial from './GuidedTutorial';

/**
 * Interactive Demo - Responsive Layout Switcher
 * Automatically switches between mobile, tablet, and desktop layouts
 * based on viewport size
 *
 * Breakpoints:
 * - Mobile (<768px): Full-bleed cards, no phone frame
 * - Tablet (768-1024px): Full-width cards with persistent instructions
 * - Desktop (>1024px): Two-column with live annotations
 */
export default function InteractiveDemo() {
  const { layout } = useResponsiveLayout();
  const { trackDemoStart, trackTutorialComplete, trackTutorialSkip } = useDemoAnalytics();

  // Track demo start
  useEffect(() => {
    trackDemoStart(layout);
  }, [layout, trackDemoStart]);

  const handleTutorialComplete = () => {
    trackTutorialComplete();
  };

  const handleTutorialSkip = () => {
    trackTutorialSkip(0);
  };

  // Render appropriate layout based on viewport
  let LayoutComponent;
  switch (layout) {
    case 'mobile':
      LayoutComponent = MobileNativeDemo;
      break;
    case 'tablet':
      LayoutComponent = TabletFullWidthDemo;
      break;
    case 'desktop':
      LayoutComponent = DesktopAnnotatedDemo;
      break;
    default:
      LayoutComponent = DesktopAnnotatedDemo;
  }

  return (
    <div className="relative overflow-visible">
      <LayoutComponent />

      {/* Guided Tutorial - shows on first visit */}
      <GuidedTutorial
        enabled={true}
        onComplete={handleTutorialComplete}
        onSkip={handleTutorialSkip}
      />
    </div>
  );
}

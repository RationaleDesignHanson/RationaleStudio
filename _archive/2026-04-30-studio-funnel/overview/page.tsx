/**
 * Rationale Overview Pitch Deck Page
 *
 * Interactive, linear pitch deck for Rationale methodology.
 * Slide-by-slide format for self-guided navigation.
 *
 * Route: /overview
 */

import RationalePitchDeck from '@/components/rationale-overview/RationalePitchDeck';

export const metadata = {
  title: 'Rationale Methodology Overview',
  description: 'Interactive pitch deck: Why Most Teams Waste 6 Months Building the Wrong Thing. Learn Rationale\'s 7-prototype framework that eliminates risk.',
};

export default function RationaleOverviewPage() {
  return <RationalePitchDeck />;
}

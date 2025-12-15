/**
 * Sanitary Waste System - Full Overview
 * Protected investor deck - requires auth (admin/investor/friend)
 * IP Development Partnership Project
 */

import SanitaryWasteDeck from '@/components/sanitary-waste-system/SanitaryWasteDeck';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanitary Waste System — Full Deck | Rationale',
  description: 'IP Development investor presentation',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SanitaryWasteFullOverviewPage() {
  return <SanitaryWasteDeck />;
}

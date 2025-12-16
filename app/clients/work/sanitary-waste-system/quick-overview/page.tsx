/**
 * Sanitary Waste System - Quick Overview
 * Comprehensive overview page for investors and partners
 * IP Development Partnership Project
 */

import SanitaryWasteSystemOverview from '@/components/sanitary-waste-system/SanitaryWasteSystemOverview';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanitary Waste System — Overview | Rationale',
  description: 'Absorbent-lined pet waste sanitary system - Creating a new category in premium pet care',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SanitaryWasteQuickOverviewPage() {
  return <SanitaryWasteSystemOverview />;
}

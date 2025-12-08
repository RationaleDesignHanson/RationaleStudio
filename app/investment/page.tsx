/**
 * Investment Landing - Redirect to Investors Portal
 *
 * This route redirects /investment to /investors
 * Used by 6 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestmentPage() {
  redirect('/investors');
}

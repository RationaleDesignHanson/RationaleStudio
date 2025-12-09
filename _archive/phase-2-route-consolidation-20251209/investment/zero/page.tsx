/**
 * Zero Investment (Alternate Route) - Redirect to Investors Portal
 *
 * This route redirects /investment/zero to /investors/zero
 * Used by 6 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestmentZeroPage() {
  redirect('/investors/zero');
}

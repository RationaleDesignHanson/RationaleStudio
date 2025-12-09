/**
 * Investment Overview - Redirect to Investors Portal
 *
 * This route redirects /invest to /investors
 * Used by 12 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestPage() {
  redirect('/investors');
}

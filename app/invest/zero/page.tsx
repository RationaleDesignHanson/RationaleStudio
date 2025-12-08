/**
 * Zero Investment - Redirect to Investors Portal
 *
 * This route redirects /invest/zero to /investors/zero
 * Used by 20 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestZeroPage() {
  redirect('/investors/zero');
}

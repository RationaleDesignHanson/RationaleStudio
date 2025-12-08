/**
 * Studio Investment - Redirect to Investors Portal
 *
 * This route redirects /invest/studio to /investors/studio
 * Used by 4 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestStudioPage() {
  redirect('/investors/studio');
}

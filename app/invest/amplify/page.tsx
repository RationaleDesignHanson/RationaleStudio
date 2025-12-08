/**
 * Amplify Investment - Redirect to Investors Portal
 *
 * This route redirects /invest/amplify to /investors/amplify
 * Used by 10 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestAmplifyPage() {
  redirect('/investors/amplify');
}

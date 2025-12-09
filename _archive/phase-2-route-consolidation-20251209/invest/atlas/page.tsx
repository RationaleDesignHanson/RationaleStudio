/**
 * Atlas Investment - Redirect to Investors Portal
 *
 * This route redirects /invest/atlas to /investors/atlas
 * Used by 10 links across the site
 */

import { redirect } from 'next/navigation';

export default function InvestAtlasPage() {
  redirect('/investors/atlas');
}

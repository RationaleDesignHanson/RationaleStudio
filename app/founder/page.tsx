/**
 * Founder Page - Redirect to About
 *
 * This route redirects /founder to /about
 * Used by 2 links across the site
 */

import { redirect } from 'next/navigation';

export default function FounderPage() {
  redirect('/about');
}

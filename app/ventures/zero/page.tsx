/**
 * Zero Venture Detail - Redirect to Product Page
 *
 * This route redirects /ventures/zero to /zero
 * Used by 14 links across the site
 */

import { redirect } from 'next/navigation';

export default function VenturesZeroPage() {
  redirect('/zero');
}

/**
 * Zero Venture Detail - Redirect to Work Page
 *
 * This route redirects /ventures/zero to /work/zero
 * Used by 14 links across the site
 */

import { redirect } from 'next/navigation';

export default function VenturesZeroPage() {
  redirect('/work/zero');
}

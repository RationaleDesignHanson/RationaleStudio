/**
 * Zero Client Dashboard - Redirect to Clients Portal
 *
 * This route redirects /client/zero/dashboard to /clients/zero/dashboard
 * Used by 7 links across the site
 */

import { redirect } from 'next/navigation';

export default function ClientZeroDashboardPage() {
  redirect('/clients/zero/dashboard');
}

/**
 * Creait Client Dashboard - Redirect to Clients Portal
 *
 * This route redirects /client/creait/dashboard to /clients/creait/investor-portal
 * Used by 2 links across the site
 */

import { redirect } from 'next/navigation';

export default function ClientCreaitDashboardPage() {
  redirect('/clients/creait/investor-portal');
}

/**
 * Athletes First Client Dashboard - Redirect to Clients Portal
 *
 * This route redirects /client/athletes-first/dashboard to /clients/athletes-first/dashboard
 * Used by 2 links across the site
 */

import { redirect } from 'next/navigation';

export default function ClientAthletesFirstDashboardPage() {
  // For now, redirect to work page since clients portal may not have athletes-first
  redirect('/work/athletes-first');
}

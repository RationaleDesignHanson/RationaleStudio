/**
 * Zero Dashboard - Redirect (typo fix)
 *
 * This route redirects /client/zero/dashboard (singular) to /clients/zero/dashboard (plural)
 * Fixes typo in route naming
 */

import { redirect } from 'next/navigation';

export default function ClientZeroDashboardRedirect() {
  redirect('/clients/zero/dashboard');
}

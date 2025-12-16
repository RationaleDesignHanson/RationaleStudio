/**
 * Zero Investment Route - Redirect
 *
 * This route redirects /clients/invest/zero to /investors/zero
 * Consolidates investment opportunity pages
 */

import { redirect } from 'next/navigation';

export default function ClientsInvestZeroRedirect() {
  redirect('/investors/zero');
}

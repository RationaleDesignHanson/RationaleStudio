/**
 * Zero Investment Route - Redirect
 *
 * This route redirects /clients/investment/zero to /investors/zero
 * Consolidates investment opportunity pages
 */

import { redirect } from 'next/navigation';

export default function ClientsInvestmentZeroRedirect() {
  redirect('/investors/zero');
}

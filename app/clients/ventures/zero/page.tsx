/**
 * Zero Ventures Route - Redirect
 *
 * This route redirects /clients/ventures/zero to /clients/zero
 * Consolidates duplicate marketing pages
 */

import { redirect } from 'next/navigation';

export default function ClientsVenturesZeroRedirect() {
  redirect('/clients/zero');
}

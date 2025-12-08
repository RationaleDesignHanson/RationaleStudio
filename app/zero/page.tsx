/**
 * Zero Shortlink - Redirect to Zero Work Page
 *
 * This route redirects /zero to /work/zero
 * Used by 1 link
 */

import { redirect } from 'next/navigation';

export default function ZeroShortlinkPage() {
  redirect('/work/zero');
}

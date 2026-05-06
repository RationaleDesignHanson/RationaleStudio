/**
 * Amplify Venture Detail - Redirect to Work Page
 *
 * This route redirects /ventures/project-amplify to /work/athletes-first
 * (Amplify is represented by Athletes First in the work section)
 * Used by 6 links across the site
 */

import { redirect } from 'next/navigation';

export default function VenturesAmplifyPage() {
  redirect('/work/athletes-first');
}

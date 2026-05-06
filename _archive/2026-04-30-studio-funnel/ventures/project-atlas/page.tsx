/**
 * Atlas Venture Detail - Redirect to Work Page
 *
 * This route redirects /ventures/project-atlas to /work/compass
 * (Atlas is represented by Compass in the work section)
 * Used by 6 links across the site
 */

import { redirect } from 'next/navigation';

export default function VenturesAtlasPage() {
  redirect('/work/compass');
}

/**
 * Clara's Sweet 16 Quiz Page
 * 
 * Interactive quiz to help choose a birthday trip destination
 */

import { Metadata } from 'next';
import Sweet16Quiz from '@/components/clara/Sweet16Quiz';

export const metadata: Metadata = {
  title: "Clara's Sweet 16 Trip Quiz",
  description: "Find the perfect destination for Clara's Sweet 16 birthday trip!",
  robots: {
    index: false, // Keep this private
    follow: false,
  },
};

export default function ClaraPage() {
  return <Sweet16Quiz />;
}


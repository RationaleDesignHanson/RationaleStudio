import type { Metadata } from 'next';

import BirthdayRestaurantQuiz from '@/components/charlie/BirthdayRestaurantQuiz';

export const metadata: Metadata = {
  title: 'Charlie · Birthday Restaurant Quiz',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CharliePage() {
  return <BirthdayRestaurantQuiz />;
}


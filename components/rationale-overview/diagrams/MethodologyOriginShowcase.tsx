/**
 * Methodology Origin Showcase
 * Visual timeline of career background showing where the methodology comes from
 * Displays comprehensive background timeline image
 */

'use client';

import Image from 'next/image';

export default function MethodologyOriginShowcase() {
  return (
    <div className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden border-2 border-[#FFD700]">
      <Image
        src="/images/background-timeline.png"
        alt="Career Background Timeline: 2000-2024"
        fill
        className="object-contain"
        priority
        unoptimized
      />
    </div>
  );
}

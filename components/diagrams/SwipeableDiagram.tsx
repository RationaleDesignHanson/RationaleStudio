'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export interface DiagramSlide {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface SwipeableDiagramProps {
  slides: DiagramSlide[];
  title: string;
  subtitle?: string;
}

/**
 * Swipeable Carousel Pattern
 *
 * For multi-module diagrams where each item is self-contained
 * Touch-friendly swipe navigation
 *
 * @example
 * <SwipeableDiagram
 *   slides={modules}
 *   title="4 Integrated Modules"
 *   subtitle="Swipe or use arrows to navigate"
 * />
 */
export function SwipeableDiagram({
  slides,
  title,
  subtitle
}: SwipeableDiagramProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      </div>

      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="rounded-lg mobile-diagram-swiper"
        style={{
          '--swiper-pagination-color': 'var(--color-terminal-gold)',
          '--swiper-navigation-color': 'var(--color-terminal-gold)',
        } as React.CSSProperties}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="bg-gray-900/70 border border-gray-700 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-2xl font-bold mb-4 text-center">
                {slide.title}
              </h3>
              {slide.content}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {!subtitle && (
        <p className="text-sm text-gray-400 text-center">
          Swipe or use arrows to navigate
        </p>
      )}

      <style jsx global>{`
        .mobile-diagram-swiper .swiper-button-next,
        .mobile-diagram-swiper .swiper-button-prev {
          color: var(--color-terminal-gold);
          width: 40px;
          height: 40px;
        }

        .mobile-diagram-swiper .swiper-button-next::after,
        .mobile-diagram-swiper .swiper-button-prev::after {
          font-size: 20px;
        }

        .mobile-diagram-swiper .swiper-pagination-bullet {
          background: #666;
        }

        .mobile-diagram-swiper .swiper-pagination-bullet-active {
          background: var(--color-terminal-gold);
        }

        .mobile-diagram-swiper {
          padding-bottom: 40px;
        }

        @media (max-width: 640px) {
          .mobile-diagram-swiper .swiper-button-next,
          .mobile-diagram-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}

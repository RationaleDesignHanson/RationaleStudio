/**
 * Processing Section Component
 * Shows scanning animation while OCR processes the image
 */

'use client';

interface ProcessingSectionProps {
  imagePreview: string;
}

export function ProcessingSection({ imagePreview }: ProcessingSectionProps) {
  return (
    <div className="fade-in flex flex-col items-center">
      <div className="relative rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(92,64,51,0.2)] p-6 bg-[#faf8f5]">
        <img
          src={imagePreview}
          alt="Uploaded recipe"
          className="max-w-[360px] max-h-[480px] block brightness-95 mx-auto"
        />
        {/* Scanning line animation */}
        <div
          className="absolute left-[8%] right-[8%] h-1 bg-[rgba(139,90,43,0.8)] rounded-full shadow-[0_0_20px_rgba(139,90,43,0.6)]"
          style={{
            animation: 'scan 2s ease-in-out infinite',
          }}
        />
        {/* Animated gradient pill overlay */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div
            className="px-6 py-3 rounded-full text-white text-sm font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.3)] backdrop-blur-sm"
            style={{
              background: 'linear-gradient(90deg, #8b5a2b 0%, #b8825f 50%, #8b5a2b 100%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 2.5s ease-in-out infinite',
            }}
          >
            Extracting recipe fields...
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% {
            top: 10%;
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            top: 85%;
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}

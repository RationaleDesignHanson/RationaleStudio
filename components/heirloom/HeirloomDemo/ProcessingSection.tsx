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
    <div className="fade-in flex flex-col items-center gap-8">
      <div className="relative rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(92,64,51,0.2)]">
        <img
          src={imagePreview}
          alt="Uploaded recipe"
          className="max-w-[400px] max-h-[500px] block brightness-95"
        />
        {/* Scanning line animation */}
        <div
          className="absolute left-[5%] right-[5%] h-1 bg-[rgba(139,90,43,0.8)] rounded-full shadow-[0_0_20px_rgba(139,90,43,0.6)]"
          style={{
            animation: 'scan 2s ease-in-out infinite',
          }}
        />
      </div>
      <p className="text-base text-[#5c4033]" style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
        Extracting recipe fields...
      </p>

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
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Upload Section Component
 * Handles initial recipe card upload with drag & drop
 */

'use client';

interface UploadSectionProps {
  isDragging: boolean;
  error: string | null;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onFileSelect: (file: File | null) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
}

export function UploadSection({
  isDragging,
  error,
  onDrop,
  onDragOver,
  onDragLeave,
  onFileSelect,
  fileInputRef,
}: UploadSectionProps) {
  return (
    <div className="fade-in flex flex-col items-center gap-6">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          w-full max-w-[500px] min-h-[300px] rounded-2xl p-4 sm:p-6 md:p-10
          flex flex-col items-center justify-center gap-4
          cursor-pointer transition-all duration-200
          ${isDragging
            ? 'border-3 border-[#8b5a2b] bg-[rgba(139,90,43,0.05)]'
            : 'border-3 border-dashed border-[#d4c4a8] bg-transparent'
          }
        `}
        style={{ borderWidth: '3px' }}
      >
        <div className="w-20 h-20 rounded-full bg-[rgba(139,90,43,0.1)] flex items-center justify-center text-2xl text-[#8b7355] font-light">
          +
        </div>
        <div className="text-center">
          <p className="text-lg text-[#3d2914] font-medium mb-1">
            Drop a recipe card image here
          </p>
          <p className="text-sm text-[#8b7355]">or click to browse</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => onFileSelect(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>

      {error && (
        <div className="bg-[rgba(180,80,60,0.1)] border border-[rgba(180,80,60,0.3)] rounded-lg px-5 py-3 text-[#8b4a2b] text-sm">
          {error}
        </div>
      )}

      <p className="text-xs text-[#a89880] text-center max-w-[400px]">
        Works best with clear photos of handwritten or printed recipe cards.
      </p>
    </div>
  );
}

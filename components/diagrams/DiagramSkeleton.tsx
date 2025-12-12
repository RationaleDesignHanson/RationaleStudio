/**
 * DiagramSkeleton - Loading skeleton for diagrams
 *
 * Simple loading state shown while diagram components are being dynamically imported
 */
export default function DiagramSkeleton() {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400 mb-4"></div>
        <p className="text-white/60 text-sm">Loading diagram...</p>
      </div>
    </div>
  );
}

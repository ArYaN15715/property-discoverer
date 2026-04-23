export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-card shadow-card">
      {/* Image placeholder */}
      <div className="aspect-video shimmer" />

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title bar */}
        <div className="h-5 rounded-md shimmer w-3/4" />

        {/* Location */}
        <div className="h-4 rounded-md shimmer w-1/2" />

        {/* Details row */}
        <div className="flex gap-3">
          <div className="h-4 rounded-md shimmer w-16" />
          <div className="h-4 rounded-md shimmer w-20" />
        </div>

        {/* Tags row */}
        <div className="flex gap-2">
          <div className="h-6 rounded-full shimmer w-24" />
          <div className="h-6 rounded-full shimmer w-20" />
        </div>

        {/* Bottom row */}
        <div className="flex justify-between items-center pt-1">
          <div className="h-4 rounded-md shimmer w-24" />
          <div className="h-4 rounded-md shimmer w-16" />
        </div>
      </div>
    </div>
  );
}

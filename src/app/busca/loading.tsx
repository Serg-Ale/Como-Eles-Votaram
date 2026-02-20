import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-10 w-48" /> {/* Title */}
        
        <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr,auto]">
          <Skeleton className="h-10 w-full" /> {/* Search Input */}
          <Skeleton className="h-10 w-full" /> {/* Select Partido */}
          <Skeleton className="h-10 w-full" /> {/* Select UF */}
          <Skeleton className="h-10 w-full md:w-[200px]" /> {/* Tabs */}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-testid="loading-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-[280px] w-full rounded-lg" data-testid="skeleton" />
          </div>
        ))}
      </div>
    </div>
  );
}

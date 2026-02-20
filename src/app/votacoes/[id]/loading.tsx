import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full max-w-3xl">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-8 w-1/2" />
          </div>
          <Skeleton className="h-6 w-32" />
        </div>

        {/* Proposicao Card */}
        <div className="bg-muted/50 p-4 rounded-lg border space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>

      {/* Votes Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="space-y-2">
          {/* Table Header */}
          <Skeleton className="h-10 w-full rounded-md" />
          {/* Table Rows */}
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded-md" />
          ))}
        </div>
      </div>
    </div>
  );
}

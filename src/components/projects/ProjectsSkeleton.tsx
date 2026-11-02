import { Skeleton } from "@/components/ui/Skeleton";

export function ProjectsSkeleton() {
  const skeletonCards = ["project-1", "project-2", "project-3", "project-4"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 rounded-xl border border-foreground/10 p-4 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-full rounded-md sm:w-36" />
      </div>

      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {skeletonCards.map((card) => (
          <li key={card}>
            <article className="flex h-full flex-col overflow-hidden rounded-xl border border-foreground/10 bg-background shadow-sm">
              <Skeleton className="aspect-video w-full rounded-none" />

              <div className="flex flex-1 flex-col gap-5 p-5">
                <div>
                  <Skeleton className="h-6 w-3/4" />
                  <div className="mt-3 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </div>

                <ul className="flex flex-wrap gap-2" aria-hidden="true">
                  <li>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </li>
                  <li>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </li>
                  <li>
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </li>
                </ul>

                <ul className="space-y-2" aria-hidden="true">
                  <li>
                    <Skeleton className="h-4 w-4/5" />
                  </li>
                  <li>
                    <Skeleton className="h-4 w-3/5" />
                  </li>
                  <li>
                    <Skeleton className="h-4 w-2/3" />
                  </li>
                </ul>

                <div className="mt-auto flex gap-3 border-t border-foreground/10 pt-4">
                  <Skeleton className="h-9 w-24 rounded-md" />
                  <Skeleton className="h-9 w-32 rounded-md" />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

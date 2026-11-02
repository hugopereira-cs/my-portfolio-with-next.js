import { Skeleton } from "@/components/ui/Skeleton";
import { PageContainer } from "@/components/ui/PageContainer";

export default function Loading() {
  return (
    <PageContainer className="py-8">
      <div role="status" aria-busy="true" aria-label="Carregando apresentação">
        <section className="w-full pb-8 sm:pb-12">
          <Skeleton className="mb-3 aspect-video w-full rounded-t-2xl border border-foreground/10 shadow-sm sm:mb-6" />

          <div className="flex flex-col justify-between sm:flex-row">
            <div className="flex flex-col gap-3 px-2 sm:px-4">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-9 w-56 sm:h-10 sm:w-72" />
                <Skeleton className="h-6 w-48 sm:w-60" />
              </div>
              <Skeleton className="h-5 w-full max-w-xl" />
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="mt-4 px-2 sm:mt-0 sm:px-4">
              <Skeleton className="h-7 w-40 rounded-full" />
            </div>
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

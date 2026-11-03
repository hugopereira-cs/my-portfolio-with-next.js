import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AboutLoading() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div role="status" aria-busy="true" aria-label="Carregando sobre">
        <header className="mb-8">
          <Skeleton className="mb-2 h-9 w-40 sm:h-10 sm:w-48" />
          <Skeleton className="h-5 w-full max-w-64" />
        </header>

        <section className="flex flex-col items-center justify-evenly gap-6 rounded-xl border border-foreground/10 px-5 py-8 sm:flex-row">
          <Skeleton className="h-48 w-48 shrink-0 rounded-full" />
          <div className="flex w-full flex-col items-start gap-4 sm:w-[60%]">
            <div className="space-y-2">
              <Skeleton className="h-4 w-44" />
              <Skeleton className="h-4 w-36" />
            </div>
            <div className="w-full space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </section>

        <section
          aria-label="Carregando competências, idiomas, educação e experiência"
          className="mt-10 overflow-hidden rounded-xl border border-foreground/10 bg-background"
        >
          <div className="grid grid-cols-2 border-b border-foreground/10 sm:grid-cols-4">
            {["tab-1", "tab-2", "tab-3", "tab-4"].map((tab) => (
              <div
                key={tab}
                className="flex min-h-12 items-center justify-center border-b-2 border-transparent px-3 py-3"
              >
                <Skeleton className="h-4 w-24 max-w-full" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 sm:p-6 xl:grid-cols-3">
            {["category-1", "category-2", "category-3", "category-4", "category-5"].map(
              (category) => (
                <div
                  key={category}
                  className="rounded-lg border border-foreground/10 bg-foreground/3 p-4"
                >
                  <Skeleton className="mb-3 h-4 w-36 max-w-full" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              )
            )}
          </div>
        </section>
      </div>
    </PageContainer>
  );
}

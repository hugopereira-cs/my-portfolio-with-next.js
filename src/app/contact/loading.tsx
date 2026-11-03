import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContactLoading() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div role="status" aria-busy="true" aria-label="Carregando contatos">
        <header className="mb-8">
          <Skeleton className="h-9 w-40 sm:h-10 sm:w-48" />
          <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
          <Skeleton className="mt-2 h-5 w-4/5 max-w-xl" />
        </header>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {["contact-1", "contact-2", "contact-3"].map((contact) => (
            <li key={contact}>
              <div className="flex min-h-36 flex-col justify-between rounded-xl border border-foreground/10 bg-foreground/3 p-5">
                <div className="flex items-start justify-between">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <div className="mt-5 space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-4 w-36 max-w-full" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageContainer>
  );
}

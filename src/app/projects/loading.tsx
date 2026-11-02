import { ProjectsSkeleton } from "@/components/projects/ProjectsSkeleton";
import { PageContainer } from "@/components/ui/PageContainer";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <PageContainer className="py-10 sm:py-14">
      <div role="status" aria-busy="true" aria-label="Carregando projetos">
        <header className="mb-8">
          <SkeletonHeading />
        </header>
        <ProjectsSkeleton />
      </div>
    </PageContainer>
  );
}

function SkeletonHeading() {
  return (
    <>
      <Skeleton className="h-9 w-48 sm:h-10 sm:w-56" />
      <Skeleton className="mt-3 h-5 w-full max-w-2xl" />
    </>
  );
}

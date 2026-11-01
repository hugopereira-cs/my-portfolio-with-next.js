import { Suspense } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { TechnologyFilter } from "@/components/projects/TechnologyFilter";
import { PageContainer } from "@/components/ui/PageContainer";
import { getProjects, getTechnologies } from "@/lib/data";

export const metadata = {
  title: "Projetos",
};

type ProjectsPageProps = {
  searchParams: Promise<{ tech?: string | string[] }>;
};

function ProjectsLoading() {
  return <p role="status">Carregando projetos...</p>;
}

async function ProjectsContent({ searchParams }: ProjectsPageProps) {
  const { tech } = await searchParams;
  const projects = getProjects();
  const technologies = getTechnologies();
  const selectedTech = typeof tech === "string" ? tech : "";
  const filteredProjects = selectedTech
    ? projects.filter((project) =>
        project.technologies.some((technology) => technology.slug === selectedTech)
      )
    : projects;

  return (
    <>
      <TechnologyFilter
        key={selectedTech}
        technologies={technologies}
        selectedTech={selectedTech}
      />

      {filteredProjects.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <li key={project.slug}>
              <ProjectCard project={project} loadImageEagerly={index === 0} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-foreground/10 px-5 py-8 text-center text-foreground/70">
          Nenhum projeto encontrado para essa tecnologia.
        </p>
      )}
    </>
  );
}

export default function ProjectsPage({ searchParams }: ProjectsPageProps) {
  return (
    <PageContainer className="py-10 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projetos</h1>
        <p className="mt-3 max-w-2xl text-foreground/70">
          Projetos desenvolvidos e as tecnologias utilizadas em cada um.
        </p>
      </header>
      <Suspense fallback={<ProjectsLoading />}>
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}

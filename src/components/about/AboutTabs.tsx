"use client";

import { useState } from "react";
import { BriefcaseBusiness, CalendarDays, Clock3, GraduationCap, Languages } from "lucide-react";
import type { KeyboardEvent } from "react";
import {
  SiCss,
  SiExpress,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import type { Experience, Language, Profile, Technology } from "@/types";

const tabs = [
  { id: "skills", label: "Skills" },
  { id: "languages", label: "Idiomas" },
  { id: "education", label: "Educação" },
  { id: "experience", label: "Experiência Profissional" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type AboutTabsProps = {
  technologies: Technology[];
  languages: Language[];
  education: Profile["education"];
  experience: Experience[];
};

const technologyCategories = [
  { id: "language", label: "Linguagens e fundamentos" },
  { id: "frontend", label: "Front-end" },
  { id: "backend", label: "Back-end" },
  { id: "database", label: "Bancos de dados" },
  { id: "tools", label: "Ferramentas" },
] as const;

const technologyIcons: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  python: SiPython,
  html5: SiHtml5,
  css3: SiCss,
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  nodejs: SiNodedotjs,
  express: SiExpress,
  mongodb: SiMongodb,
  postgresql: SiPostgresql,
  git: SiGit,
  github: SiGithub,
};

function TechnologyLogo({ technology }: { technology: Technology }) {
  const TechnologyIcon = technologyIcons[technology.slug];

  if (!TechnologyIcon) {
    throw new Error(`Não há logo configurada para "${technology.slug}".`);
  }

  return (
    <span
      role="img"
      aria-label={technology.name}
      className="inline-flex rounded-sm p-1 text-foreground/70 transition-colors hover:text-foreground"
    >
      <TechnologyIcon aria-hidden="true" className="h-6 w-6" />
    </span>
  );
}

function AboutTabPanel({
  activeTab,
  technologies,
  languages,
  education,
  experience,
}: AboutTabsProps & { activeTab: TabId }) {
  if (activeTab === "skills") {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technologyCategories.map((category) => {
          const categoryTechnologies = technologies.filter(
            (technology) => technology.category === category.id
          );

          if (categoryTechnologies.length === 0) {
            return null;
          }

          return (
            <section
              key={category.id}
              aria-labelledby={`skills-${category.id}`}
              className="rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4"
            >
              <h3
                id={`skills-${category.id}`}
                className="mb-3 text-sm font-semibold text-foreground/70"
              >
                {category.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {categoryTechnologies.map((technology) => (
                  <li key={technology.slug}>
                    <TechnologyLogo technology={technology} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  }

  if (activeTab === "languages") {
    return (
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {languages.map((language) => (
          <li
            key={language.code}
            className="rounded-lg border border-foreground/10 bg-foreground/3 p-4"
          >
            <div className="flex items-center gap-2 font-semibold">
              <Languages aria-hidden="true" className="h-4 w-4 text-foreground/50" />
              {language.name}
            </div>
            <p className="mt-2 text-sm text-foreground/65">{language.levelLabel}</p>
          </li>
        ))}
      </ul>
    );
  }

  if (activeTab === "education") {
    return (
      <div className="space-y-6">
        <section aria-labelledby="education-degrees">
          <h3
            id="education-degrees"
            className="mb-3 flex items-center gap-2 text-base font-semibold"
          >
            <GraduationCap aria-hidden="true" className="h-5 w-5 text-foreground/60" />
            Formação
          </h3>
          <ul className="space-y-3">
            {education.degrees.map((degree) => (
              <li
                key={`${degree.institution}-${degree.course}`}
                className="rounded-lg border border-foreground/10 bg-foreground/3 p-4"
              >
                <h4 className="font-medium">{degree.course}</h4>
                <p className="mt-1 text-sm text-foreground/65">{degree.institution}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-foreground/60">
                  <CalendarDays aria-hidden="true" className="h-4 w-4" />
                  {degree.startYear}
                  {degree.expectedEndYear ? ` — previsão ${degree.expectedEndYear}` : ""}
                  {degree.status === "in_progress" ? " · Em andamento" : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {education.courses.length > 0 && (
          <section aria-labelledby="education-courses">
            <h3 id="education-courses" className="mb-3 text-base font-semibold">
              Cursos e formações complementares
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {education.courses.map((course) => (
                <li
                  key={`${course.platform}-${course.name}`}
                  className="rounded-lg border border-foreground/10 bg-foreground/3 p-4"
                >
                  <h4 className="font-medium">{course.name}</h4>
                  <p className="mt-2 flex items-center justify-between gap-2 text-sm text-foreground/60">
                    <span>{course.platform}</span>
                    <span className="inline-flex shrink-0 items-center gap-1">
                      <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                      {course.hours}h
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    );
  }

  return experience.length > 0 ? (
    <ol className="space-y-4">
      {experience.map((item) => (
        <li
          key={`${item.company}-${item.role}`}
          className="rounded-lg border border-foreground/10 bg-foreground/3 p-4"
        >
          <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
            <div>
              <h3 className="font-semibold">{item.role}</h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-foreground/65">
                <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                {item.company}
              </p>
            </div>
            <p className="text-sm text-foreground/60">
              {item.start} — {item.end ?? "Atual"}
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">{item.description}</p>
        </li>
      ))}
    </ol>
  ) : (
    <div className="rounded-lg border border-dashed border-foreground/15 px-5 py-8 text-center">
      <BriefcaseBusiness aria-hidden="true" className="mx-auto h-6 w-6 text-foreground/45" />
      <p className="mt-3 font-medium">Buscando minha primeira vaga na área.</p>
      <p className="mt-1 text-sm text-foreground/65">
        Meus projetos pessoais e acadêmicos mostram um pouco do que venho aprendendo.
      </p>
    </div>
  );
}

export function AboutTabs({ technologies, languages, education, experience }: AboutTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("skills");

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (activeIndex + 1) % tabs.length;
        break;
      case "ArrowLeft":
        nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];

    if (!nextTab) {
      return;
    }

    setActiveTab(nextTab.id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  }

  return (
    <div className="overflow-hidden rounded-xl border border-foreground/10 bg-background">
      <div
        role="tablist"
        aria-label="Informações sobre o perfil"
        className="grid grid-cols-2 border-b border-foreground/10 sm:grid-cols-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`about-tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls="about-tabpanel"
            tabIndex={activeTab === tab.id ? 0 : -1}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={handleTabKeyDown}
            className={`min-h-12 border-b-2 px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/50 ${
              activeTab === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-foreground/60 hover:bg-foreground/3 hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        id="about-tabpanel"
        role="tabpanel"
        aria-labelledby={`about-tab-${activeTab}`}
        className="p-4 sm:p-6"
      >
        <AboutTabPanel
          activeTab={activeTab}
          technologies={technologies}
          languages={languages}
          education={education}
          experience={experience}
        />
      </div>
    </div>
  );
}

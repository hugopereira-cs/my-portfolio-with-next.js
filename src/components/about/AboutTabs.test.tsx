// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { AboutTabs } from "@/components/about/AboutTabs";
import type { Experience, Profile, Technology } from "@/types";

const technologies: Technology[] = [
  {
    slug: "react",
    name: "React",
    category: "frontend",
    showInSkills: true,
  },
];

const languages: Profile["languages"] = [
  {
    code: "en",
    name: "Inglês",
    level: "intermediate",
    levelLabel: "Intermediário",
  },
];

const education: Profile["education"] = {
  degrees: [
    {
      institution: "Instituto de Ensino",
      course: "Análise e Desenvolvimento de Sistemas",
      status: "in_progress",
      startYear: 2024,
      expectedEndYear: 2026,
    },
  ],
  courses: [
    {
      name: "Fundamentos de teste",
      platform: "Plataforma de estudos",
      hours: 10,
    },
  ],
};

function renderAboutTabs(experience: Experience[] = []) {
  return render(
    <AboutTabs
      technologies={technologies}
      languages={languages}
      education={education}
      experience={experience}
    />
  );
}

afterEach(cleanup);

describe("AboutTabs", () => {
  it("starts with Skills selected and displays its technologies", () => {
    renderAboutTabs();

    const skillsTab = screen.getByRole("tab", { name: "Skills" });

    expect(skillsTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByRole("img", { name: "React" })).toBeTruthy();
  });

  it("changes the selected tab and panel content when clicked", async () => {
    const user = userEvent.setup();
    renderAboutTabs();

    const languagesTab = screen.getByRole("tab", { name: "Idiomas" });
    await user.click(languagesTab);

    expect(languagesTab.getAttribute("aria-selected")).toBe("true");
    expect(screen.getByText("Inglês")).toBeTruthy();
    expect(screen.getByText("Intermediário")).toBeTruthy();
    expect(screen.queryByRole("img", { name: "React" })).toBeNull();
  });

  it("displays the education information when its tab is selected", async () => {
    const user = userEvent.setup();
    renderAboutTabs();

    await user.click(screen.getByRole("tab", { name: "Educação" }));

    expect(screen.getByText("Análise e Desenvolvimento de Sistemas")).toBeTruthy();
    expect(screen.getByText("Fundamentos de teste")).toBeTruthy();
  });

  it("shows the first-job message when there is no experience", async () => {
    const user = userEvent.setup();
    renderAboutTabs();

    await user.click(screen.getByRole("tab", { name: "Experiência Profissional" }));

    expect(screen.getByText("Buscando minha primeira vaga na área.")).toBeTruthy();
  });

  it("displays experience details when experience is provided", async () => {
    const user = userEvent.setup();
    renderAboutTabs([
      {
        company: "Empresa de exemplo",
        role: "Desenvolvedor",
        start: "2025",
        end: "2026",
        description: "Desenvolvimento de aplicações web.",
      },
    ]);

    await user.click(screen.getByRole("tab", { name: "Experiência Profissional" }));

    expect(screen.getByText("Desenvolvedor")).toBeTruthy();
    expect(screen.getByText("Empresa de exemplo")).toBeTruthy();
    expect(screen.getByText("Desenvolvimento de aplicações web.")).toBeTruthy();
  });

  it("supports arrow, Home, and End keyboard navigation", async () => {
    const user = userEvent.setup();
    renderAboutTabs();

    const skillsTab = screen.getByRole("tab", { name: "Skills" });
    skillsTab.focus();

    await user.keyboard("{ArrowRight}");
    const languagesTab = screen.getByRole("tab", { name: "Idiomas" });
    expect(languagesTab.getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(languagesTab);

    await user.keyboard("{ArrowLeft}");
    expect(skillsTab.getAttribute("aria-selected")).toBe("true");

    await user.keyboard("{ArrowLeft}");
    const experienceTab = screen.getByRole("tab", { name: "Experiência Profissional" });
    expect(experienceTab.getAttribute("aria-selected")).toBe("true");

    await user.keyboard("{Home}");
    expect(skillsTab.getAttribute("aria-selected")).toBe("true");

    await user.keyboard("{End}");
    expect(experienceTab.getAttribute("aria-selected")).toBe("true");
  });
});

import { describe, expect, it } from "vitest";
import { getPortfolio, getProfile, getProjects, getTechnologies } from "@/lib/data";

describe("getProfile", () => {
  it("returns the local profile with its main sections", () => {
    const profile = getProfile();

    expect(profile.name).toBeTruthy();
    expect(profile.role).toBeTruthy();
    expect(profile.photos.hero).toBeTruthy();
    expect(profile.photos.about).toBeTruthy();
    expect(profile.languages.length).toBeGreaterThan(0);
    expect(profile.contacts.length).toBeGreaterThan(0);
  });
});

describe("getTechnologies", () => {
  it("returns all technologies when no filter is provided", () => {
    const technologies = getTechnologies();

    expect(technologies.length).toBeGreaterThan(0);
    expect(technologies.some((technology) => technology.showInSkills)).toBe(true);
    expect(technologies.some((technology) => !technology.showInSkills)).toBe(true);
  });

  it("filters technologies by their skills visibility", () => {
    const skills = getTechnologies({ skills: true });
    const hiddenFromSkills = getTechnologies({ skills: false });

    expect(skills.length).toBeGreaterThan(0);
    expect(skills.every((technology) => technology.showInSkills)).toBe(true);
    expect(hiddenFromSkills.length).toBeGreaterThan(0);
    expect(hiddenFromSkills.every((technology) => !technology.showInSkills)).toBe(true);
    expect(skills.length + hiddenFromSkills.length).toBe(getTechnologies().length);
  });
});

describe("getProjects", () => {
  it("returns projects ordered by the configured order", () => {
    const projects = getProjects();
    const orderValues = projects.map((project) => project.order);

    expect(projects.length).toBeGreaterThan(0);
    expect(orderValues).toEqual([...orderValues].sort((a, b) => a - b));
  });

  it("resolves technology slugs to technology objects", () => {
    const knownTechnologies = new Map(
      getTechnologies().map((technology) => [technology.slug, technology])
    );

    for (const project of getProjects()) {
      expect(project.technologies.length).toBeGreaterThan(0);

      for (const technology of project.technologies) {
        expect(knownTechnologies.get(technology.slug)).toEqual(technology);
      }
    }
  });

  it("filters projects by featured status", () => {
    const featuredProjects = getProjects({ featured: true });
    const nonFeaturedProjects = getProjects({ featured: false });

    expect(featuredProjects.every((project) => project.featured)).toBe(true);
    expect(nonFeaturedProjects.every((project) => !project.featured)).toBe(true);
    expect(featuredProjects.length + nonFeaturedProjects.length).toBe(getProjects().length);
  });
});

describe("getPortfolio", () => {
  it("combines the profile, projects, and technologies", () => {
    const portfolio = getPortfolio();

    expect(portfolio.profile).toEqual(getProfile());
    expect(portfolio.projects).toEqual(getProjects());
    expect(portfolio.technologies).toEqual(getTechnologies());
  });
});

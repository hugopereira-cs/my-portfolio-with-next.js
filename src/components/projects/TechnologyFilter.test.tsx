// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

import { TechnologyFilter } from "@/components/projects/TechnologyFilter";
import type { Technology } from "@/types";

const technologies: Technology[] = [
  {
    slug: "react",
    name: "React",
    category: "frontend",
    showInSkills: true,
  },
  {
    slug: "typescript",
    name: "TypeScript",
    category: "language",
    showInSkills: true,
  },
];

afterEach(cleanup);

beforeEach(() => {
  push.mockReset();
});

describe("TechnologyFilter", () => {
  it("renders the technology options and keeps the selected technology", () => {
    render(<TechnologyFilter technologies={technologies} selectedTech="react" />);

    const select = screen.getByRole<HTMLSelectElement>("combobox", {
      name: "Filtrar por tecnologia",
    });

    expect(select.value).toBe("react");
    expect(screen.getByRole("option", { name: "Todas as tecnologias" })).toBeTruthy();
    expect(screen.getByRole("option", { name: "TypeScript" })).toBeTruthy();
  });

  it("navigates with the chosen technology only after applying the filter", async () => {
    const user = userEvent.setup();
    render(<TechnologyFilter technologies={technologies} selectedTech="" />);

    const select = screen.getByRole("combobox", { name: "Filtrar por tecnologia" });
    await user.selectOptions(select, "react");

    expect(push).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Aplicar filtro" }));

    expect(push).toHaveBeenCalledWith("/projects?tech=react", { scroll: false });
  });

  it("navigates to all projects when applying the empty selection", async () => {
    const user = userEvent.setup();
    render(<TechnologyFilter technologies={technologies} selectedTech="" />);

    await user.click(screen.getByRole("button", { name: "Aplicar filtro" }));

    expect(push).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("shows the clear button for an active filter and clears it", async () => {
    const user = userEvent.setup();
    render(<TechnologyFilter technologies={technologies} selectedTech="react" />);

    await user.click(screen.getByRole("button", { name: "Limpar" }));

    expect(push).toHaveBeenCalledWith("/projects", { scroll: false });
  });

  it("does not show the clear button when no filter is active", () => {
    render(<TechnologyFilter technologies={technologies} selectedTech="" />);

    expect(screen.queryByRole("button", { name: "Limpar" })).toBeNull();
  });
});

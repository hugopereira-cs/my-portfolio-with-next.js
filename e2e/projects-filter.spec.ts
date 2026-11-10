import { expect, test } from "@playwright/test";

test.describe("filtro de projetos", () => {
  test("filtra projetos pela tecnologia escolhida", async ({ page }) => {
    await page.goto("/projects");

    await page.getByLabel("Filtrar por tecnologia").selectOption("javascript");
    await page.getByRole("button", { name: "Aplicar filtro" }).click();

    await expect(page).toHaveURL(/\/projects\?tech=javascript$/);
    await expect(page.getByRole("heading", { name: "Calculadora React" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Site Países da Copa" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Login com React e TypeScript" })
    ).toHaveCount(0);
    await expect(page.getByRole("article")).toHaveCount(2);
  });

  test("limpa o filtro e volta a exibir todos os projetos", async ({ page }) => {
    await page.goto("/projects?tech=javascript");

    await expect(page.getByRole("article")).toHaveCount(2);
    await page.getByRole("button", { name: "Limpar" }).click();

    await expect(page).toHaveURL(/\/projects$/);
    await expect(page.getByLabel("Filtrar por tecnologia")).toHaveValue("");
    await expect(page.getByRole("article")).toHaveCount(6);
    await expect(
      page.getByRole("heading", { name: "Login com React e TypeScript" })
    ).toBeVisible();
  });

  test("mostra o estado vazio para uma tecnologia sem projetos", async ({ page }) => {
    await page.goto("/projects?tech=tecnologia-inexistente");

    await expect(
      page.getByText("Nenhum projeto encontrado para essa tecnologia.")
    ).toBeVisible();
    await expect(page.getByRole("article")).toHaveCount(0);
  });
});

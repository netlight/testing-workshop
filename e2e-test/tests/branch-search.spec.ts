import { test, expect } from "@playwright/test";

test("shows search results", async ({ page }) => {
  await page.route(
    "https://kontakte.polizei.bayern.de/es/search",
    async (route, request) => {
      if (request.method() === "POST") {
        return route.fulfill({
          status: 200,
          json: {
            hits: {
              hits: [
                {
                  _source: {
                    dsts: 2,
                    dst: [],
                    plz: "20144",
                    gmd: "Hamburg",
                  },
                },
                {
                  _source: {
                    dsts: 2,
                    dst: [],
                    plz: "20145",
                    gmd: "Hamburg Altona",
                  },
                },
              ],
            },
          },
        });
      }
    }
  );

  await page.goto("https://kontakte.polizei.bayern.de/suche/dst/index.html");
  await page.getByRole("button", { name: "Alle ablehnen" }).click();
  await page.getByPlaceholder("Gemeinde, Gemeindeteil, Stadt").click();
  await page.getByPlaceholder("Gemeinde, Gemeindeteil, Stadt").fill("Hamburg");
  await expect(page.getByText("20144 Hamburg")).toBeVisible();
  await expect(page.getByText("20145 Hamburg Altona")).toBeVisible();
});

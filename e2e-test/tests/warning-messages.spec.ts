import { test, expect, Page } from "@playwright/test";

test("has detail page for warning message", async ({ page }) => {
  await navigateToWarningMessageOverview(page);
  await page
    .getByRole("link", { name: "Vorsicht: Betrüger am Telefon!" })
    .scrollIntoViewIfNeeded();

  await page
    .getByRole("link", { name: "Vorsicht: Betrüger am Telefon!" })
    .click();
  await expect(page.getByText("Vorsicht: Betrüger am Telefon!")).toBeVisible();
});

test("has at least five warning messages", async ({ page }) => {
  await navigateToWarningMessageOverview(page);
  await page.mouse.wheel(0, 500);

  await expect((await getAllMessages(page)).length).toBeGreaterThan(5);
});

const navigateToWarningMessageOverview = async (page: Page) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Auswahl speichern" }).click();
  await page.getByRole("link", { name: "Aktuelles" }).click();
  await page.getByRole("link", { name: "Warnmeldungen" }).click();
  await expect(page).toHaveURL(
    "https://www.polizei.bayern.de/aktuelles/warnmeldungen/index.html"
  );
};

const getAllMessages = (page: Page) =>
  page.locator("#montage-container .row > div").all();

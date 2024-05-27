import { test } from "@playwright/test";

test("should successfully login", async ({ page }) => {
  await page.goto("/");

  const loginButton = await page.locator(`a[href=\\/\\login]`);
  await loginButton.click();
  await page.waitForSelector(".modal");

  await page.locator("[name='email']").fill("user1@example.com");
  await page.locator("[name='password']").fill("123123");
  await page.locator(".login-action").click();

  // Add expectation ...
});

// TODO: add more end to end tests to verify other flows

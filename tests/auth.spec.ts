// Spec: specs/saucedemo-test-plan.md - Section 1 (Authentication)

import { test, expect, USERS } from './fixtures';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('successful login with standard user redirects to the inventory', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    await loginPage.login(USERS.standard.username, USERS.standard.password);

    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(inventoryPage.title).toHaveText('Products');
    await expect(inventoryPage.items).toHaveCount(6);
    await expect(inventoryPage.sortDropdown).toBeVisible();
    await expect(inventoryPage.cartLink).toBeVisible();
  });

  test('locked out user cannot log in', async ({ loginPage, page }) => {
    await loginPage.login(USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
    await expect(page).not.toHaveURL(/inventory\.html$/);
  });

  test('login with empty credentials shows a required-field error', async ({ loginPage, page }) => {
    await loginPage.loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });
});

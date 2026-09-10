// Spec: specs/saucedemo-test-plan.md - Section 4 (Session Navigation)

import { test, expect } from './fixtures';
import { completeOrder } from './helpers';

test.describe('Session navigation', () => {
  test('logout ends the authenticated session', async ({ loggedInPage, loginPage, page }) => {
    await expect(page).toHaveURL(/inventory\.html$/);

    await loggedInPage.logout();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();

    await page.goto('/inventory.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('back home clears the completed order state', async ({
    loggedInPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await completeOrder(
      { inventoryPage: loggedInPage, cartPage, checkoutInfoPage, checkoutOverviewPage },
      ['Sauce Labs Backpack'],
    );
    await expect(checkoutCompletePage.header).toBeVisible();

    await checkoutCompletePage.backHome();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(loggedInPage.title).toHaveText('Products');
    await expect(loggedInPage.cartBadge).toHaveCount(0);
  });
});

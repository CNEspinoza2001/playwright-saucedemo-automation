// Spec: specs/saucedemo-test-plan.md - Section 3 (Checkout And Order Completion)

import { test, expect } from './fixtures';
import { completeOrder } from './helpers';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Checkout and order completion', () => {
  test('checkout rejects missing customer information', async ({
    loggedInPage,
    cartPage,
    checkoutInfoPage,
    page,
  }) => {
    await loggedInPage.addToCart(BACKPACK);
    await loggedInPage.openCart();
    await cartPage.checkout();
    await expect(page).toHaveURL(/checkout-step-one\.html$/);

    await checkoutInfoPage.continue();
    await expect(checkoutInfoPage.errorMessage).toContainText('First Name is required');

    await checkoutInfoPage.firstNameInput.fill('Test');
    await checkoutInfoPage.continue();
    await expect(checkoutInfoPage.errorMessage).toContainText('Last Name is required');

    await checkoutInfoPage.lastNameInput.fill('User');
    await checkoutInfoPage.continue();
    await expect(checkoutInfoPage.errorMessage).toContainText('Postal Code is required');
  });

  test('complete an order and verify the totals', async ({
    loggedInPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await loggedInPage.addToCart(BACKPACK);
    await loggedInPage.addToCart(BIKE_LIGHT);
    await loggedInPage.openCart();
    await cartPage.checkout();
    await checkoutInfoPage.fillInformation('Test', 'User', '28001');
    await checkoutInfoPage.continue();

    await expect(page).toHaveURL(/checkout-step-two\.html$/);
    await expect(checkoutOverviewPage.items).toHaveCount(2);
    await expect(checkoutOverviewPage.itemTotal).toHaveText('Item total: $39.98');
    await expect(checkoutOverviewPage.tax).toHaveText('Tax: $3.20');
    await expect(checkoutOverviewPage.total).toHaveText('Total: $43.18');

    await checkoutOverviewPage.finish();
    await expect(page).toHaveURL(/checkout-complete\.html$/);
    await expect(checkoutCompletePage.header).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });

  test('generate an order PDF from the confirmation page', async ({
    loggedInPage,
    cartPage,
    checkoutInfoPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await completeOrder(
      { inventoryPage: loggedInPage, cartPage, checkoutInfoPage, checkoutOverviewPage },
      [BACKPACK],
    );
    await expect(checkoutCompletePage.header).toBeVisible();

    const downloadPromise = page.waitForEvent('download');
    await checkoutCompletePage.generatePdfButton.click();
    const download = await downloadPromise;

    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    await expect(checkoutCompletePage.header).toBeVisible();
  });
});

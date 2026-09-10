// Spec: specs/saucedemo-test-plan.md - Section 2 (Catalog And Cart)

import { test, expect } from './fixtures';

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

test.describe('Catalog and cart', () => {
  test('browse products and sort by price and name', async ({ loggedInPage, page }) => {
    await expect(loggedInPage.items).toHaveCount(6);
    await expect(loggedInPage.itemPrices).toHaveCount(6);

    await loggedInPage.sortBy('lohi');
    await expect(loggedInPage.sortDropdown).toHaveValue('lohi');
    await expect(loggedInPage.itemPrices.first()).toHaveText('$7.99');

    await loggedInPage.sortBy('za');
    await expect(loggedInPage.sortDropdown).toHaveValue('za');
    await expect(loggedInPage.itemNames.first()).toHaveText('Test.allTheThings() T-Shirt (Red)');

    await loggedInPage.openProductImage(5);
    await expect(page).toHaveURL(/inventory-item\.html\?id=5$/);
    await expect(page.getByText('Sauce Labs Fleece Jacket', { exact: true })).toBeVisible();
  });

  test('add and remove products in the cart', async ({ loggedInPage, cartPage, page }) => {
    await loggedInPage.addToCart(BACKPACK);
    await loggedInPage.addToCart(BIKE_LIGHT);
    await expect(loggedInPage.cartBadge).toHaveText('2');

    await loggedInPage.openCart();
    await expect(page).toHaveURL(/cart\.html$/);
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemByName(BACKPACK)).toContainText('1');

    await cartPage.removeFromCart(BIKE_LIGHT);
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.cartBadge).toHaveText('1');

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html$/);
    await expect(loggedInPage.cartBadge).toHaveText('1');
  });
});

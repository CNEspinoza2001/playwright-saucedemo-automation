import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutInfoPage } from '../pages/CheckoutInfoPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

export const CUSTOMER = { firstName: 'Test', lastName: 'User', postalCode: '28001' };

/**
 * Drives a logged-in session from the inventory page all the way to the
 * "Checkout: Complete!" page, buying the given products.
 */
export async function completeOrder(
  pages: {
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutInfoPage: CheckoutInfoPage;
    checkoutOverviewPage: CheckoutOverviewPage;
  },
  products: string[],
): Promise<void> {
  const { inventoryPage, cartPage, checkoutInfoPage, checkoutOverviewPage } = pages;

  for (const product of products) {
    await inventoryPage.addToCart(product);
  }
  await inventoryPage.openCart();
  await cartPage.checkout();
  await checkoutInfoPage.fillInformation(CUSTOMER.firstName, CUSTOMER.lastName, CUSTOMER.postalCode);
  await checkoutInfoPage.continue();
  await checkoutOverviewPage.finish();
}

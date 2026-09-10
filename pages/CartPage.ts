import { Page, Locator } from '@playwright/test';
import { productSlug } from './productSlug';

/**
 * Shopping cart page (`/cart.html`).
 */
export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  itemByName(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug(productName)}"]`).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}

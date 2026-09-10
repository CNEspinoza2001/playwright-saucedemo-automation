import { Page, Locator } from '@playwright/test';

/**
 * Checkout step two - "Overview" (`/checkout-step-two.html`).
 */
export class CheckoutOverviewPage {
  readonly page: Page;
  readonly items: Locator;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart_item');
    this.itemTotal = page.locator('[data-test="subtotal-label"]');
    this.tax = page.locator('[data-test="tax-label"]');
    this.total = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}

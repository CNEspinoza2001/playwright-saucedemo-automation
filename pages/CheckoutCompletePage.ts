import { Page, Locator } from '@playwright/test';

/**
 * Checkout complete - "Thank you for your order!" (`/checkout-complete.html`).
 */
export class CheckoutCompletePage {
  readonly page: Page;
  readonly header: Locator;
  readonly backHomeButton: Locator;
  readonly generatePdfButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'Thank you for your order!' });
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.generatePdfButton = page.locator('[data-test="generate-pdf-order"]');
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}

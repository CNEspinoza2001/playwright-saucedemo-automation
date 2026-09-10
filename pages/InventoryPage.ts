import { Page, Locator } from '@playwright/test';
import { productSlug } from './productSlug';

type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

/**
 * Inventory (products) page shown after a successful login.
 */
export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.menuButton = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async addToCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="add-to-cart-${productSlug(productName)}"]`).click();
  }

  async removeFromCart(productName: string): Promise<void> {
    await this.page.locator(`[data-test="remove-${productSlug(productName)}"]`).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openProductImage(index: number): Promise<void> {
    await this.page.locator(`[data-test="item-${index}-img-link"]`).click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}

/**
 * Converts a product display name into the slug SauceDemo uses in its
 * `data-test` attributes, e.g. "Sauce Labs Bike Light" -> "sauce-labs-bike-light".
 */
export function productSlug(productName: string): string {
  return productName
    .toLowerCase()
    .replace(/[().]/g, '')
    .replace(/\s+/g, '-');
}

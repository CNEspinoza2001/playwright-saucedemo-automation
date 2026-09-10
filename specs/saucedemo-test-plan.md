# SauceDemo Test Plan

## Overview

Functional and negative test plan for [SauceDemo (Swag Labs)](https://www.saucedemo.com/),
covering authentication, product catalog, sorting, cart management, checkout
validation, order completion, PDF generation and session navigation, plus a small
API suite against the public `reqres.in` sample service.

Every scenario starts from a fresh browser state and is independent.
Primary valid credentials: `standard_user` / `secret_sauce`.

## Test Scenarios

### 1. Authentication - `tests/auth.spec.ts`

| # | Scenario | Expected result |
|---|----------|-----------------|
| 1.1 | Successful login with `standard_user` | Redirect to `/inventory.html`; products, sort control and cart are visible |
| 1.2 | Locked out user (`locked_out_user`) | Stays on login page; "this user has been locked out" error |
| 1.3 | Login with empty credentials | Stays on login page; "Username is required" error |

### 2. Catalog And Cart - `tests/catalog.spec.ts`

| # | Scenario | Expected result |
|---|----------|-----------------|
| 2.1 | Browse products and sort by price / name | Sorting reorders the six products; product detail page opens |
| 2.2 | Add and remove products in the cart | Cart badge and cart contents track the selection; state survives "Continue Shopping" |

### 3. Checkout And Order Completion - `tests/checkout.spec.ts`

| # | Scenario | Expected result |
|---|----------|-----------------|
| 3.1 | Checkout with missing customer information | Required-field error for first name, last name and postal code in turn |
| 3.2 | Complete an order and verify totals | Item total `$39.98`, tax `$3.20`, total `$43.18`; "Thank you for your order!" |
| 3.3 | Generate an order PDF from the confirmation page | A `.pdf` download starts; confirmation page stays usable |

### 4. Session Navigation - `tests/session.spec.ts`

| # | Scenario | Expected result |
|---|----------|-----------------|
| 4.1 | Logout ends the authenticated session | Redirect to login page; `/inventory.html` is no longer reachable |
| 4.2 | "Back Home" clears the completed order state | Inventory page opens with an empty cart |

### 5. API - `tests/api.spec.ts`

| # | Scenario | Expected result |
|---|----------|-----------------|
| 5.1 | `GET /users/2` | `200` with a well-formed user object |
| 5.2 | `POST /users` | `201` echoing the payload plus a generated `id` and `createdAt` |

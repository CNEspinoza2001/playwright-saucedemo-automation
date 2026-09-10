# Playwright SauceDemo Automation

Automatización de pruebas end-to-end y de API para [SauceDemo (Swag Labs)](https://www.saucedemo.com/),
construida con **Playwright**, **TypeScript** y el patrón **Page Object Model**.

<!-- Reemplaza OWNER/REPO por tu ruta de GitHub cuando subas el repo. -->
[![Playwright Tests](https://github.com/OWNER/REPO/actions/workflows/playwright.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/playwright.yml)

## Puntos clave

- **Page Object Model** – cada página vive en [`pages/`](pages/) con locators y acciones tipadas.
- **Fixtures propios** – [`tests/fixtures.ts`](tests/fixtures.ts) inyecta los page objects y un
  fixture `loggedInPage`, para que los specs se centren en las aserciones.
- **Cobertura UI + API** – 10 escenarios web y 2 de API, mapeados a un
  [test plan](specs/saucedemo-test-plan.md) escrito.
- **Cross-browser** – se ejecuta en Chromium, Firefox y WebKit.
- **Listo para CI** – el workflow de GitHub Actions corre la suite completa en cada push y
  pull request, y publica el reporte HTML como artifact.

## Estructura del proyecto

```
.
├── .github/workflows/playwright.yml   # pipeline de CI
├── pages/                             # Page Object Model
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   ├── CheckoutInfoPage.ts
│   ├── CheckoutOverviewPage.ts
│   └── CheckoutCompletePage.ts
├── tests/
│   ├── fixtures.ts                    # fixtures de Playwright + usuarios de prueba
│   ├── helpers.ts                     # flujo compartido "completar una orden"
│   ├── auth.spec.ts
│   ├── catalog.spec.ts
│   ├── checkout.spec.ts
│   ├── session.spec.ts
│   └── api.spec.ts
├── specs/saucedemo-test-plan.md       # test plan que implementan los specs
└── playwright.config.ts
```

## Requisitos e instalación

Requiere Node.js 20+.

```bash
npm ci
npx playwright install --with-deps
```

## Ejecutar las pruebas

```bash
npm test              # todos los navegadores
npm run test:chromium # solo Chromium
npm run test:headed   # ver el navegador
npm run test:ui       # modo UI de Playwright
npm run report        # abrir el último reporte HTML
```

## Cobertura de pruebas

| Área | Spec | Escenarios |
|------|------|-----------|
| Autenticación | `tests/auth.spec.ts` | login válido, usuario bloqueado, credenciales vacías |
| Catálogo y carrito | `tests/catalog.spec.ts` | ordenamiento, detalle de producto, agregar / quitar del carrito |
| Checkout | `tests/checkout.spec.ts` | validación de campos, totales de la orden, generación de PDF |
| Sesión | `tests/session.spec.ts` | logout, reseteo de estado tras la orden |
| API | `tests/api.spec.ts` | `GET` y `POST` contra `reqres.in` |

Ver [`specs/saucedemo-test-plan.md`](specs/saucedemo-test-plan.md) para el plan detallado.

## Licencia

[MIT](LICENSE)

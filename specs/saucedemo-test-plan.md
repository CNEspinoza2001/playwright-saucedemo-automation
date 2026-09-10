# Plan de Pruebas - SauceDemo

## Descripción general

Plan de pruebas funcionales y negativas para [SauceDemo (Swag Labs)](https://www.saucedemo.com/),
que cubre autenticación, catálogo de productos, ordenamiento, gestión del carrito, validación
del checkout, finalización de la orden, generación de PDF y navegación de sesión, además de una
pequeña suite de API contra el servicio público de ejemplo `reqres.in`.

Cada escenario parte de un estado de navegador limpio y es independiente.
Credenciales válidas principales: `standard_user` / `secret_sauce`.

## Escenarios de prueba

### 1. Autenticación - `tests/auth.spec.ts`

| # | Escenario | Resultado esperado |
|---|-----------|--------------------|
| 1.1 | Inicio de sesión exitoso con `standard_user` | Redirección a `/inventory.html`; se muestran productos, control de ordenamiento y carrito |
| 1.2 | Usuario bloqueado (`locked_out_user`) | Permanece en la página de login; error "this user has been locked out" |
| 1.3 | Inicio de sesión con credenciales vacías | Permanece en la página de login; error "Username is required" |

### 2. Catálogo y carrito - `tests/catalog.spec.ts`

| # | Escenario | Resultado esperado |
|---|-----------|--------------------|
| 2.1 | Explorar productos y ordenar por precio / nombre | El ordenamiento reordena los seis productos; se abre la página de detalle del producto |
| 2.2 | Agregar y quitar productos del carrito | El contador y el contenido del carrito reflejan la selección; el estado se conserva al usar "Continue Shopping" |

### 3. Checkout y finalización de la orden - `tests/checkout.spec.ts`

| # | Escenario | Resultado esperado |
|---|-----------|--------------------|
| 3.1 | Checkout con información del cliente faltante | Error de campo obligatorio para nombre, apellido y código postal, en orden |
| 3.2 | Completar una orden y verificar los totales | Subtotal de ítems `$39.98`, impuesto `$3.20`, total `$43.18`; "Thank you for your order!" |
| 3.3 | Generar un PDF de la orden desde la página de confirmación | Se inicia una descarga `.pdf`; la página de confirmación sigue utilizable |

### 4. Navegación de sesión - `tests/session.spec.ts`

| # | Escenario | Resultado esperado |
|---|-----------|--------------------|
| 4.1 | Cerrar sesión termina la sesión autenticada | Redirección a la página de login; `/inventory.html` deja de ser accesible |
| 4.2 | "Back Home" limpia el estado de la orden completada | Se abre la página de inventario con el carrito vacío |

### 5. API - `tests/api.spec.ts`

| # | Escenario | Resultado esperado |
|---|-----------|--------------------|
| 5.1 | `GET /users/2` | `200` con un objeto de usuario bien formado |
| 5.2 | `POST /users` | `201` que devuelve el payload más un `id` generado y `createdAt` |

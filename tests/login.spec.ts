import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Pruebas de login en Sauce Demo', () => {

  // Prueba 1: login válido
  test('login con credenciales válidas redirige al inventario', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    // Verificamos que llegamos a la página de productos
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');
  });

  // Prueba 2: login inválido
  test('login con credenciales inválidas muestra error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('usuario_falso', 'clave_mala');
    const error = await loginPage.getErrorText();
    expect(error).toContain('Username and password do not match');
  });

  // Prueba 3: usuario bloqueado
  test('usuario bloqueado no puede ingresar', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    const error = await loginPage.getErrorText();
    expect(error).toContain('locked out');
  });

});
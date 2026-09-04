import { test, expect } from '@playwright/test';

test.describe('Pruebas de API', () => {

  // GET: obtener un usuario y validar la respuesta
  test('GET usuario devuelve 200 y los datos correctos', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    // Validamos el código de estado (contrato básico)
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Validamos la estructura de la respuesta
    expect(body.data).toHaveProperty('id', 2);
    expect(body.data).toHaveProperty('email');
    expect(body.data.email).toContain('@');
  });

  // POST: crear un usuario y validar la respuesta
  test('POST crea un usuario y devuelve 201', async ({ request }) => {
    const response = await request.post('https://reqres.in/api/users', {
      data: { name: 'Cristhofer', job: 'QA Automation' }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toHaveProperty('name', 'Cristhofer');
    expect(body).toHaveProperty('id');
  });

});
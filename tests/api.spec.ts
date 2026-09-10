// Spec: specs/saucedemo-test-plan.md - Section 5 (API)
// Public sample API: https://reqres.in/

import { test, expect } from '@playwright/test';

const BASE_URL = 'https://reqres.in/api';

test.describe('API - reqres.in', () => {
  test('GET /users/:id returns 200 and a well-formed user', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.data).toMatchObject({ id: 2 });
    expect(body.data).toHaveProperty('email');
    expect(body.data.email).toContain('@');
  });

  test('POST /users creates a resource and returns 201', async ({ request }) => {
    const payload = { name: 'Cristhofer', job: 'QA Automation Engineer' };
    const response = await request.post(`${BASE_URL}/users`, { data: payload });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(payload);
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('createdAt');
  });
});

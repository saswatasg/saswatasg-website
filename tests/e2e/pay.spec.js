import { test, expect } from '@playwright/test';

test('pay locked disables input', async ({ page }) => {
  await page.goto('/pay?amount=25000&locked=1');
  const input = page.locator('#pay-amount');
  await expect(input).toBeDisabled();
  await expect(input).toHaveValue('25000');
  await expect(page.getByText('Amount locked at ₹25000')).toBeVisible();
  await expect(page.getByRole('button', { name: /Pay ₹25000/ })).toBeEnabled();
});

test('pay editable allows change', async ({ page }) => {
  await page.goto('/pay?amount=500');
  const input = page.locator('#pay-amount');
  await expect(input).toBeEnabled();
  await input.fill('1000');
  await expect(page.getByRole('button', { name: /Pay ₹1000/ })).toBeVisible();
});

test('pay confirmation after success is mocked via UI', async ({ page }) => {
  await page.goto('/pay');
  await expect(page.getByText('Complete your payment')).toBeVisible();
});

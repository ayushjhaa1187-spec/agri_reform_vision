import { test, expect } from '@playwright/test';

test('landing page loads and displays title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Agri-Intelligence/);
  await expect(page.locator('h1')).toContainText('Agri-Intelligence');
  await expect(page.locator('#hero').getByText('Autonomous Multi-Agent')).toBeVisible();
});

test('dashboard is accessible', async ({ page }) => {
  await page.goto('/');
  // The connect screen button is likely visible
  const connectButton = page.locator('button:has-text("Connect")').first();
  if (await connectButton.isVisible()) {
    await connectButton.click();
  }
  
  // Wait for some dashboard element
  await expect(page.locator('text=Yield Forecast')).toBeVisible({ timeout: 15000 });
});

test('multi-agent system view loads', async ({ page }) => {
  await page.goto('/');
  // MultiAgentSystem component has id="agents"
  const agentsSection = page.locator('#agents');
  await expect(agentsSection).toBeVisible();
});

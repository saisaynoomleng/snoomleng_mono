import { test } from '@playwright/test';

test('capture typography page', async ({ page }) => {
  await page.goto(
    'http://localhost:6006/?path=/story/designsystem-typography--default',
  );

  await page.screenshot({
    path: 'typography.png',
    fullPage: true,
  });
});

import { test, expect } from '@playwright/test';

test('simple agent task test', async ({ page }) => {
  const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY!;
  const TEST_USER_ID = process.env.TEST_USER_ID!;
  const TEST_APP_URL = process.env.TEST_APP_URL!;

  console.log('Creating agent task...');
  console.log('User ID:', TEST_USER_ID);
  console.log('App URL:', TEST_APP_URL);

  // Create task directly with fetch
  const response = await fetch('https://api.clerk.com/v1/agents/tasks', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLERK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      on_behalf_of: { user_id: TEST_USER_ID },
      permissions: '*',
      agent_name: 'playwright-simple',
      task_description: 'Simple test',
      redirect_url: `${TEST_APP_URL}/dashboard`,
      session_max_duration_in_seconds: 3600,
    }),
  });

  const data = await response.json();
  console.log('API Response status:', response.status);
  console.log('API Response:', data);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${JSON.stringify(data)}`);
  }

  const taskUrl = data.url;
  expect(taskUrl).toBeTruthy();

  // Navigate to the task URL
  await page.goto(taskUrl);

  // Wait for redirect
  await page.waitForURL(`${TEST_APP_URL}/**`, { timeout: 15000 });

  console.log('Redirected to:', page.url());

  // Wait for page to settle
  await page.waitForTimeout(3000);

  // Check cookies
  const cookies = await page.context().cookies();
  const sessionCookie = cookies.find(c => c.name === '__session');
  const clientUatCookie = cookies.find(c => c.name === '__client_uat');

  console.log('Session cookie:', sessionCookie ? 'found' : 'not found');
  console.log('Client UAT:', clientUatCookie?.value);

  // Check if Clerk is loaded
  const clerkLoaded = await page.evaluate(() => {
    return typeof (window as any).Clerk !== 'undefined';
  });
  console.log('Clerk loaded:', clerkLoaded);

  // Check Clerk.user
  const clerkUser = await page.evaluate(() => {
    const clerk = (window as any).Clerk;
    return clerk?.user;
  });

  console.log('Clerk.user:', clerkUser ? clerkUser.id : 'null');

  // Take screenshot
  await page.screenshot({ path: 'test-results/playwright-test.png', fullPage: true });

  expect(sessionCookie).toBeTruthy();
});

import { test, expect } from '@playwright/test';

test('Login Test @ID-001 @reg', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');

    await page.fill('#userEmail', 'sachinknsachi@gmail.com');
    await page.fill('#userPassword', 'SachinKn@123');
    await page.click('[value="Login"]');

    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/dashboard/dash');

    await page.pause();
});

test('Login Test @ID-002 @sanity', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client');

    await page.fill('#userEmail', 'sachinknsachi@gmail.com');
    await page.fill('#userPassword', 'SachinKn@123');
    await page.click('[value="Login"]');

    await page.waitForLoadState('networkidle');

    const context = page.context();
    await context.storageState({path: 'state.json'});
});

test('Get Login details @ID-003 @reg @sanity', async ({page}) => {

    const context = await browser.newContext({storageState: './sachin-tests/03.API_and_WEB/state.json'});
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');

    await page.pause();
});

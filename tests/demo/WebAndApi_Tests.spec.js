import { test } from '@playwright/test';

test('Api and Web mix testing', async ({request, page}) => {

    // get the token to bypass the login to application using API
    const loginResponse = await request.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
        data: {
            userEmail: "sachinknsachi@gmail.com",
            userPassword: "Sachin@123"
        }
    })
    const body = await loginResponse.json();
    const token = body.token;

    // set the token to bypass the login to application into browser.
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    // Open url and it will skip the login page and directly land you to home page.
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.pause();
})


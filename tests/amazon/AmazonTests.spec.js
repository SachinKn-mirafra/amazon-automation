const { test, expect} = require('../../libs/BaseTest');

test('ID-01 - Amazon automation @sanity', async ({page, packageObject, homePage, cartPage, checkoutPage}) => {
    // Launch URL
    await page.goto('https://www.amazon.in');

    // HomePage Actions
    await homePage.searchProduct('iPhone 15');
    await homePage.addProductToCartAndSetPrice(['iPhone 15', '256 GB', 'Blue'], packageObject);
    await homePage.openCart();

    // CartPage Actions
    await cartPage.verifyAddedProduct(['iPhone 15', '256 GB', 'Blue'], packageObject);
    await cartPage.verifyCartSum(packageObject);

    // CheckoutPage Actions
    await checkoutPage.verifyTotalPrice(packageObject);
})

test('ID-02 - Amazon automation @regression', async ({page, packageObject, homePage, cartPage, checkoutPage}) => {
    // Launch URL
    await page.goto('https://www.amazon.in');

    // HomePage Actions
    await homePage.searchProduct('iPhone 15');
    await homePage.addProductToCartAndSetPrice(['iPhone 15', '128 GB', 'Green'], packageObject);
    await homePage.openCart();

    // CartPage Actions
    await cartPage.verifyAddedProduct(['iPhone 15', '128 GB', 'Green'], packageObject);
    await cartPage.verifyCartSum(packageObject);

    // CheckoutPage Actions
    await checkoutPage.verifyTotalPrice(packageObject);
})

test('ID-03 - Amazon automation @sanity @regression', async ({page, packageObject, homePage, cartPage, checkoutPage}) => {
    // Launch URL
    await page.goto('https://www.amazon.in');

    // HomePage Actions
    await homePage.searchProduct('iPhone 15');
    await homePage.addProductToCartAndSetPrice(['iPhone 15', '128 GB', 'Green'], packageObject);
    await homePage.addProductToCartAndSetPrice(['iPhone 15', '256 GB', 'Blue'], packageObject);
    await homePage.openCart();

    // CartPage Actions
    await page.screenshot({path: 'cart.png', fullPage: true});
    await cartPage.verifyAddedProduct(['iPhone 15', '128 GB', 'Green'], packageObject);
    await cartPage.verifyAddedProduct(['iPhone 15', '256 GB', 'Blue'], packageObject);
    await cartPage.verifyCartSum(packageObject);

    // CheckoutPage Actions
    await checkoutPage.verifyTotalPrice(packageObject);
})
const base = require('@playwright/test');
const { InstaLoginModule } = require('../modules/InstaLoginModule');
const { PackageObject } = require('../objects/PackageObject');
const { HomePage } = require('../modules/HomePage');
const { CartPage } = require('../modules/CartPage');
const { CheckoutPage } = require('../modules/CheckoutPage');

let test = base.test.extend({
    instaLoginModule: async ({page}, use) => {
        use(new InstaLoginModule(page, base.expect));
    },
    packageObject: async ({page}, use) => {
        use(new PackageObject(page));
    },
    homePage: async ({page}, use) => {
        use(new HomePage(page, base.expect));
    },
    cartPage: async ({page}, use) => {
        use(new CartPage(page, base.expect));
    },
    checkoutPage: async ({page}, use) => {
        use(new CheckoutPage(page, base.expect));
    },
})

exports.test = test;
exports.expect = base.expect;
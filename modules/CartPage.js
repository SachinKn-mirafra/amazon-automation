const { StringUtils } = require('../libs/utils/StringUtils');

exports.CartPage = class CartPage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    static #productName = '//*[@data-csa-c-owner="CartX"][.//*[contains(@class, "sc-item-product-title-cont") {description}]]';
    static #productPrice = '//*[@data-csa-c-owner="CartX"][.//*[contains(@class, "sc-item-product-title-cont") {description}]]//*[@class="sc-item-price-block"]//*[@class="sc-badge-price-to-pay"]';
    static #cartSum_1 = '(//*[@data-name="Subtotals"])[1]//*[@id="sc-subtotal-amount-buybox"]';
    static #cartSum_2 = '(//*[@data-name="Subtotals"])[2]//*[@id="sc-subtotal-amount-activecart"]';

    async verifyAddedProduct(productDescription, packageObject) {
        let description = '';
        for (let i=0; i<productDescription.length; i++) {
            description += ` and contains(., "${productDescription[i]}")`;
        }

        await this.expect(await this.page.locator(CartPage.#productName.replace('{description}', `${description}`))).toBeVisible();

        const expectedPrice = packageObject.getProductsPrice(productDescription);
        const actualPrice = (await this.page.textContent(CartPage.#productPrice.replace('{description}', `${description}`))).trim();

        console.log(expectedPrice, actualPrice);

        this.expect(StringUtils.compareTwoCurrencyStrings('₹', expectedPrice, actualPrice)).toBeTruthy();
    }

    async verifyCartSum(packageObject) {
        const expectedCartSum = StringUtils.getSumOfPrices('₹', packageObject.getProductsPriceList());
        const actualCartSum_1 = (await this.page.textContent(CartPage.#cartSum_1)).trim();
        const actualCartSum_2 = (await this.page.textContent(CartPage.#cartSum_2)).trim();

        console.log(expectedCartSum, actualCartSum_1, actualCartSum_2);

        this.expect(StringUtils.compareTwoCurrencyStrings('₹', expectedCartSum, actualCartSum_1)).toBeTruthy();
        this.expect(StringUtils.compareTwoCurrencyStrings('₹', expectedCartSum, actualCartSum_2)).toBeTruthy();
    }

}
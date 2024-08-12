exports.HomePage = class HomePage {

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    static #searchTextfield = '[id="twotabsearchtextbox"]';
    static #searchButton = '[id="nav-search-submit-text"]';
    static #addToCartButton = '//*[@data-cy="title-recipe" {description}]/following-sibling::*//*[contains(@class, "puis-atcb-add-container")]';
    static #productPrice = '//*[@data-cy="title-recipe" {description}]/following-sibling::*//*[@data-cy="price-recipe"]//*[@class="a-price"]/*[@class="a-offscreen"]';
    static #cartIcon = '[id="nav-cart-count-container"]';

    async searchProduct(productName) {
        await this.page.fill(HomePage.#searchTextfield, productName);
        await this.page.click(HomePage.#searchButton);
    }

    async addProductToCartAndSetPrice(productDescription, packageObject) {
        let description = '';
        for (let i=0; i<productDescription.length; i++) {
            description += ` and contains(., "${productDescription[i]}")`;
        }

        await this.page.waitForSelector(HomePage.#addToCartButton.replace('{description}', `${description}`), {state: 'visible'})
        await this.page.click(HomePage.#addToCartButton.replace('{description}', `${description}`));

        packageObject.setProductPrice(productDescription, await this.page.textContent(HomePage.#productPrice.replace('{description}', `${description}`)));
    }

    async openCart() {
        await this.page.waitForSelector(HomePage.#cartIcon, {state: 'visible'})
        await this.page.click(HomePage.#cartIcon);
    }

}
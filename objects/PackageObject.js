exports.PackageObject = class PackageObject {

    constructor(page) {
        this.page = page;
    }

    #productPriceList = [];
    #addedProducts = {};

    getProductsPriceList() {
        return this.#productPriceList;
    }

    getProductsPrice(product) {
        return this.#addedProducts[product.join(', ')];
    }

    setProductPrice(product, productPrice) {
        this.#productPriceList.push(productPrice);
        this.#addedProducts[product.join(', ')] = productPrice;
    }

}
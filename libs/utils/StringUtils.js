exports.StringUtils = class StringUtils {

    static getSumOfPrices(currencyChar, priceList) {
        let sum = 0;
        for (let i=0; i<priceList.length; i++) {
            sum += parseInt(priceList[i].replace(currencyChar, '').replace(/,/g, ''))
        }
        return currencyChar + sum;
    }

    static compareTwoCurrencyStrings(currencyChar, price1, price2) {
        price1 = parseInt(price1.replace(currencyChar, '').replace(/\s/g, '').replace(/,/g, '').trim());
        price2 = parseInt(price2.replace(currencyChar, '').replace(/\s/g, '').replace(/,/g, '').trim());
        return price1 === price2;
    }

}
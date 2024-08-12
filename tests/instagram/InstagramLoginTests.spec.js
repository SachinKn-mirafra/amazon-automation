const {test, expect} = require('../../libs/BaseTest');
const { readIniFile, readYamlFile } = require('../../libs/utils/FileUtils');


test('Instagram login test', async ({page, instaLoginModule}) => {

    const testData = readIniFile('TestData/TestData.ini');

    let expectedErrorMessage = 'There was a problem logging you into Instagram. Please try again soon.';

    await instaLoginModule.openUrl(testData.urls.testUrl);
    await instaLoginModule.fillLoginDetails(testData.loginCredentials.username, testData.loginCredentials.password);
    // verification or takescreenshot
    await instaLoginModule.clickOnLogin();

    await expect(page.locator(`//div[normalize-space()='${expectedErrorMessage}']`)).toBeVisible();

    await page.close();

})
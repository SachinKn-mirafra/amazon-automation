exports.InstaLoginModule = class InstaLoginModule {

    static #usernameInputLocator = 'input[name="username"]';
    static #passwordInputLocator = 'input[name="password"]';
    static #loginButton = 'button[type="submit"]';

    constructor(page, expect) {
        this.page = page;
        this.expect = expect;
    }

    async openUrl(url) {
        await this.page.goto(url);
    }

    async fillLoginDetails(username, password) {
        await this.page.fill(InstaLoginModule.#usernameInputLocator, username);
        await this.page.fill(InstaLoginModule.#passwordInputLocator, password);
    }

    
    async clickOnLogin() {
        await this.page.click(InstaLoginModule.#loginButton);
    }

}
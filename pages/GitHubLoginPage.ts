import { type Locator, type Page } from "@playwright/test";
import { GitHubHomePage } from "./GitHubHomePage";

export class GitHubLoginPage extends GitHubHomePage {
    readonly formHeader: Locator
    readonly userAndPassLabel: Locator
    readonly userAndPassInput: Locator
    readonly forgotPasswordLink: Locator
    readonly loginSignInButton: Locator
    readonly passkeySignInLink: Locator
    readonly createAccountLink: Locator
    readonly footerLinks: Locator
    readonly errorMsg: Locator

    constructor(page: Page) {
        super(page);
        this.formHeader = page.locator('#login h1')
        this.userAndPassLabel = page.locator('.auth-form label')
        this.userAndPassInput = page.locator('.auth-form input.input-block')
        this.forgotPasswordLink = page.locator('#forgot-password')
        this.loginSignInButton = page.locator('.js-sign-in-button')
        this.passkeySignInLink = page.locator('.Button--link')
        this.createAccountLink = page.locator('.login-callout a')
        this.footerLinks = page.locator('.footer ul li')
        this.errorMsg = page.locator('.js-flash-alert')
    }

    async userLogin(username: string, password: string) {
        await this.userAndPassInput.first().fill(username)
        await this.userAndPassInput.last().fill(password)
        await this.loginSignInButton.click()
    }
}
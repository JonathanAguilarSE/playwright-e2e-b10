import { test, expect } from "../../fixtures/github-fixtures";
import { GitHubHomePage } from "../../pages/GitHubHomePage";
import { GitHubLoginPage } from "../../pages/GitHubLoginPage";

test.describe('Practice04 GitHub HomePage', () => {

    test('TASK-1: Validate the GitHub Home Page Logo and Header Menu Items', async({ gitHubHomePage }) => {
        
        await test.step('2. Validate that the logo is displayed', async() => {
            await expect(gitHubHomePage.logo).toBeVisible();
        });

        await test.step('3. Validate that the header menu items are displayed with their expected texts', async() => {
            const menuHeaderItemsArr = [ 'Product', 'Solutions', 'Resources', 'Open Source', 'Enterprise', 'Pricing' ];
            
            await expect(gitHubHomePage.headerMenuItems).toContainText(menuHeaderItemsArr); // What could be a better assertion???
        });
    });

    test('TASK-2: Validate the GitHub Home Page Search and Signing Header Items', async({ gitHubHomePage }) => {
        
        await test.step('2. Validate that the search input is displayed with the placeholder "Search or jump to..."', async() => {
            await expect(gitHubHomePage.searchInput).toBeVisible();
            await expect(gitHubHomePage.searchInput).toHaveAttribute('placeholder', 'Search or jump to...')
        });

        await test.step('3. Validate that the sign in button is displayed with the text "Sign in"', async() => {
            await expect(gitHubHomePage.signInButton).toBeVisible();
            await expect(gitHubHomePage.signInButton).toContainText(' Sign in ');
        });

        await test.step('3. Validate that the sign up button is displayed with the text "Sign in"', async() => {
            await expect(gitHubHomePage.signUpButton).toBeVisible();
            await expect(gitHubHomePage.signUpButton).toContainText(' Sign up ');
        });
    });

    test('TASK-3: Validate the GitHub Login Page Sign in Form', async({ gitHubHomePage, gitHubLoginPage }) => {
        
        await test.step('2.	Click on "Sign in" button', async() => {
            await gitHubHomePage.clickSignIn()
        });

        await test.step('3.	Validate that the header logo is displayed', async() => {
            await expect(gitHubHomePage.logo).toBeVisible();
        });

        await test.step('4.	Validate that the form header is displayed with the text "Sign in to GitHub"', async() => {
            await expect(gitHubLoginPage.formHeader).toBeVisible();
            await expect(gitHubLoginPage.formHeader).toContainText('Sign in to GitHub');
        });

        await test.step(`
            5.	Validate that the username or email address label is displayed with the text "Username or email address",
            6.	Validate that the username or email address input is displayed and enabled,
            7.	Validate that the password label is displayed with the text "Password",
            8.	Validate that the password input is displayed and enabled`, async() => {
            const inputLabelsArr = [ 'Username or email address', 'Password' ]
            const labelsArr = await gitHubLoginPage.userAndPassLabel.all()
            // console.log(labelsArr)
            for (let i = 0; i < labelsArr.length; i++) {
                const label = gitHubLoginPage.userAndPassLabel.nth(i)
                await expect(label).toBeVisible()
                await expect(label).toContainText(inputLabelsArr[i])
            }
            
            const inputsArr = await gitHubLoginPage.userAndPassInput.all()
            for (const input of inputsArr){
                await expect(input).toBeVisible()
                await expect(input).toBeEnabled()
            }
        });

        await test.step('9.	Validate that the forgot password link is displayed with the text "Forgot password?"', async() => {
            await expect(gitHubLoginPage.forgotPasswordLink).toHaveText('Forgot password?')
        });

        await test.step('10. Validate that the sign in button is displayed with the text "Sign in"', async() => {
            await expect(gitHubLoginPage.loginSignInButton).toBeVisible()
            await expect(gitHubLoginPage.loginSignInButton).toHaveText('Sign in')
        });

        await test.step('11. Validate that the sign in with a passkey button is displayed with the text "Sign in with a passkey"', async() => {
            await expect(gitHubLoginPage.passkeySignInLink).toBeVisible()
            await expect(gitHubLoginPage.passkeySignInLink).toHaveText('Sign in with a passkey')
        });

        await test.step('12. Validate that the create an account link is displayed with the text "Create an account"', async() => {
            await expect(gitHubLoginPage.createAccountLink).toBeVisible()
            await expect(gitHubLoginPage.createAccountLink).toHaveText('Create an account')
        });
    });

    test('TASK-4: Validate the GitHub Login Page Footer Links', async({ gitHubHomePage, gitHubLoginPage }) => {
        
        await test.step('2.	Click on "Sign in" button', async() => {
            await gitHubHomePage.clickSignIn()
        });

        await test.step('3.	Validate that there are 6 links are displayed in the footer', async() => {
            const footerLinkCount = await gitHubLoginPage.footerLinks.count()
            // console.log(footerLinkCount)
            expect(footerLinkCount).toEqual(6) // we do not need await before expect because footerLinks returns an integer and then this assertion becomes synchronous
        });

        await test.step('4.	Validate that the footer links are displayed with their expected texts', async() => {
            const footerLabelsArr = [ 'Terms', 'Privacy', 'Docs', 'Contact GitHub Support', 'Manage cookies', 'Do not share my personal information' ]
            const footerLinksArr = await gitHubLoginPage.footerLinks.all()
            for (let i = 0; i < footerLinksArr.length; i++) {
                const link = gitHubLoginPage.footerLinks.nth(i)
                await expect(link).toBeVisible();
                await expect(link).toContainText(footerLabelsArr[i]);
            }
        });
    });

    test('TASK-5: Validate the GitHub Login Page Invalid Login Attempt', async({ gitHubHomePage, gitHubLoginPage }) => {
        
        await test.step('2.	Click on "Sign in" button', async() => {
            await gitHubHomePage.clickSignIn()
        });

        await test.step(`
            3. Enter "johndoe" to the username or email address input,
            4. Enter "test1234" to the password input,
            5. Click on "Sign in" button`, async() => {
            await gitHubLoginPage.userLogin('johndoe', 'test1234')
        });

        await test.step('6.	Validate that the error message is displayed with the text "Incorrect username or password."', async() => {
            await expect(gitHubLoginPage.errorMsg).toBeVisible()
            await expect(gitHubLoginPage.errorMsg).toHaveText('Incorrect username or password.')
        });
    });
});
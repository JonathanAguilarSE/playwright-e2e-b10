import { test as base } from "@playwright/test";
import { GitHubHomePage } from "../pages/GitHubHomePage";
import { GitHubLoginPage } from "../pages/GitHubLoginPage";

type MyFixtures = {
    gitHubHomePage: GitHubHomePage
    gitHubLoginPage: GitHubLoginPage
}

export const test = base.extend<MyFixtures>({


    gitHubHomePage: async({ page }, use) => {
      const gitHubHomePage = new GitHubHomePage(page)
      await gitHubHomePage.goto()
      // beforeEach here
      await use(gitHubHomePage)
      // afterEach here
    },
    gitHubLoginPage: async({ page }, use) => {
      const gitHubLoginPage = new GitHubLoginPage(page)
      await use(gitHubLoginPage)
    },
  })
  
  export { expect } from '@playwright/test'
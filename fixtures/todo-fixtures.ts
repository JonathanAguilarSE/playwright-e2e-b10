import { test as base } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";
import { LoginPage } from "../pages/LoginPage";

// Declare the types for out fixture
type MyFixtures = { 
  todoPage: TodoPage,
  loginPage: LoginPage
};

// Extend the Playwright test runner to create your custom fixtures
export const test = base.extend<MyFixtures>({

  // Now, we will define the fixture, and proivde the fixture function in it
  todoPage: async({ page }, use) => {

    // Create the instance for the fixture to access the objects in it
    const todoPage = new TodoPage(page)
    await todoPage.goto()
    console.log('BEFORE EACH TRIGGERED')

    // Setup phase: It will navigate to the app, and add items to todo list
    // since its before the 'use()' method, this setup will be treated as beforeEach()
    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')
    
    // Playwright pauses the tests here, allowing test to perform your actions in the test file
    // the 'use()' call here seperates the beforeEach, and afterEach process
    await use(todoPage)


    // When you provide a code after 'use()' method, it will be treated as afterEach() phase
    console.log('AFTER EACH TRIGGERED')
    await todoPage.removeAll()
  },
})

export { expect } from '@playwright/test'
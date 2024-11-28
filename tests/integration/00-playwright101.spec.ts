import { chromium, test } from "@playwright/test";

test.describe("Playwright 101", async () => {
  // This below 'test' function will trigger the test runner
  test("Playwright 101", () => {
    // Tests to be executed
    console.log("TechGlobal");
  });

  // 'page' fixture here is the main component that triggers the browser
  // test('Playwright 101 - Test Case 2', ({ page }) => {
  // const users = [
  //   {
  //     id: 1,
  //     name: "Maria",
  //     age: 32,
  //   },
  //   {
  //     id: 2,
  //     name: "Tugba",
  //     age: 26,
  //   },
  //   {
  //     id: 1,
  //     name: "Bermet",
  //     age: 27,
  //   },
  // ];

  // const [{id, name, age}] = users

  // // Object destructure in the callback
  // users.forEach(({ id, name, age }) => {
  //   console.log(id);
  //   console.log(name);
  //   console.log(age);
  // });
  // })

  // Marks a function as asynchronous using 'async' keyword
  // meaning it might take some time to complete
  test("Playwright 101 - Test Case 3", async ({ page }) => {
    // The await keyword pauses function exectuon untill a Promise is resolved,
    // making sure code runs only after the Promise is fulfilled or rejected
    await page.goto("https://www.techglobal-training.com/");
  });

  test("Playwright 101 - Cucumber Syntax", async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.techglobal-training.com/frontend");

    await page.close();
  });

  test("Playwright 101 - Browser Fixture", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://www.techglobal-training.com/frontend");

    await page.close();
  });

  test("Playwright 101 - Context Fixture", async ({ context }) => {
    const page = await context.newPage();

    await page.goto("https://www.techglobal-training.com/frontend");

    await page.close();
  });
});
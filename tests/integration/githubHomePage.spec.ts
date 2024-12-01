import test, { expect } from "@playwright/test";

test('Github main page', async({ page }) => {
  await page.goto('https://github.com/')

  const $locator = await page.locator('.HeaderMenu-item .HeaderMenu-link')

  const arr = ['Product', 'Solutions','Resources', 'Open Source','Enterprise', 'Pricing']

  for(let i = 0; i < arr.length; i++) {
    const eachEl = await $locator.nth(i).textContent()

    expect(eachEl?.trim()).toBe(arr[i])
  }

})
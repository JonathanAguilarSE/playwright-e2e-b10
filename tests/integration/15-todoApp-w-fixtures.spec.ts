import test from "@playwright/test";
import { TodoPage } from "../../pages/TodoPage";

test.describe('todo tests', () => {
  let todoPage: TodoPage

  test.beforeEach(async({ page }) => {
    todoPage = new TodoPage(page)
    await todoPage.goto()

    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')
  })

  test('Should add an item', async () => {
    await todoPage.addTodo('My Item')
  })

  test('Should remove an item', async () => {
    await todoPage.remove('item1')
  })

  test.afterEach(async() => {
    await todoPage.removeAll()
  })
})
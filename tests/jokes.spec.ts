import { test, expect } from "@playwright/test"

test.describe("Chuck Norris Jokes Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000")

    await page.waitForFunction(() => {
      const jokeElement = document.querySelector("h6")
      return jokeElement && jokeElement.textContent !== "Loading joke..."
    })
  })

  test("Displays a joke on page load", async ({ page }) => {
    const jokeText = await page.locator("h6").textContent()
    expect(jokeText).not.toBeNull()
    expect(jokeText).not.toBe("Loading joke...")
  })

  test("Fetches joke by category", async ({ page }) => {
    await page.getByLabel("Categories").click()
    await page.locator("li:has-text('animal')").click()
    await page.locator("text=Search by category").click()

    await page.waitForTimeout(500)
    const statusMessage = await page.locator('[data-testid="status-message"]').textContent()
    expect(statusMessage).toContain("Joke from category: animal")
  })

  test("Fetches joke by phrase", async ({ page }) => {
    await page.getByLabel("Phrase").fill("Machine")
    await page.waitForTimeout(500)
    await page.locator("text=Search by phrase").click()
    await page.waitForTimeout(500)

    const statusMessageExists = await page.locator('[data-testid="status-message"]').count()
    if (statusMessageExists) {
      const statusMessage = await page.locator('[data-testid="status-message"]').textContent()
      expect(statusMessage).not.toContain("No jokes found for this phrase")
    } else {
      const jokeText = await page.locator("h6").textContent()
      expect(jokeText).not.toBe("Loading joke...")
    }
  })

  test("Handles no jokes found for phrase", async ({ page }) => {
    await page.getByLabel("Phrase").fill("nonexistentphrase")
    await page.locator("text=Search by phrase").click()

    await page.waitForTimeout(500)
    const statusMessage = await page.locator('[data-testid="status-message"]').textContent()
    expect(statusMessage).toContain("No jokes found for this phrase")
  })
})

import { test, expect } from '@playwright/test'

test('redirects to sign-in when unauthenticated', async ({ page }) => {
  // Go to the home page
  await page.goto('/')

  // Expect to be redirected to the sign-in page
  // The URL should contain 'sign-in' as per our middleware and Clerk setup
  await expect(page).toHaveURL(/.*sign-in.*/)
})

test('can view the sign-up page', async ({ page }) => {
  await page.goto('/sign-up')
  
  // Verify sign-up content or Clerk components are visible
  // Depending on how Clerk renders, we might look for specific text
  await expect(page).toHaveTitle(/.*Sign Up.*/i)
})

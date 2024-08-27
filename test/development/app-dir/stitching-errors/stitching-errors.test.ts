import { nextTestSetup } from 'e2e-utils'
import { waitFor } from 'next-test-utils'

describe('stitching errors', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should work using cheerio', async () => {
    const browser = await next.browser('/')
    await browser.waitForElementByCss('button')

    await waitFor(60 * 1000)
  })
})

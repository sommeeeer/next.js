import { nextTestSetup } from 'e2e-utils'
import { assertHasRedbox, retry } from 'next-test-utils'

describe('stitching errors', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('should log stitched error for browser uncaught errors', async () => {
    const browser = await next.browser('/uncaught')
    const logs = await browser.log()

    await retry(() => {
      expect(logs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            // Original error stack
            message: expect.stringContaining('at useThrowError'),
          }),
          expect.objectContaining({
            // Stitched error stack
            message: expect.stringContaining('at AppRouter'),
          }),
          expect.objectContaining({
            // Extra info of original component
            message: expect.stringContaining(
              'The above error occurred in the <Page> component. It was handled by the <ReactDevOverlay> error boundary.'
            ),
          }),
        ])
      )
    })
  })

  it('should log stitched error for browser caught errors', async () => {
    const browser = await next.browser('/caught')
    const logs = await browser.log()

    await retry(() => {
      expect(logs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            // Original error stack
            message: expect.stringContaining('at useThrowError'),
          }),
          expect.objectContaining({
            // Stitched error stack
            message: expect.stringContaining('at ClientPageRoot'),
          }),
          expect.objectContaining({
            // Extra info of caught boundary
            message: expect.stringContaining(
              'The above error occurred in the <Thrower> component. It was handled by the <MyErrorBoundary> error boundary.'
            ),
          }),
        ])
      )
    })
  })

  it('should log stitched error for SSR errors', async () => {
    const browser = await next.browser('/ssr')
    const logs = await browser.log()

    await retry(async () => {
      await assertHasRedbox(browser)

      expect(logs).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            // Original error stack
            message: expect.stringContaining('at useThrowError'),
          }),
          expect.objectContaining({
            // Extra info of original component
            message: expect.stringContaining(
              'The above error occurred in the <Page> component. It was handled by the <ReactDevOverlay> error boundary.'
            ),
          }),
        ])
      )
    })
  })
})

import type { HydrationOptions } from 'react-dom/client'
import { isBailoutToCSRError } from '../shared/lib/lazy-dynamic/bailout-to-csr'
import { getReactStitchedError } from './components/react-dev-overlay/internal/helpers/stitched-error'

const reportGlobalError =
  typeof reportError === 'function'
    ? // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    : (error: any) => {
        window.console.error(error)
      }

export const onRecoverableError: HydrationOptions['onRecoverableError'] = (
  err,
  errorInfo
) => {
  const error = getReactStitchedError(err)
  // In development mode, pass along the component stack to the error
  if (process.env.NODE_ENV === 'development' && errorInfo.componentStack) {
    ;(error as any)._componentStack = errorInfo.componentStack
  }
  // Using default react onRecoverableError

  // Skip certain custom errors which are not expected to be reported on client
  if (isBailoutToCSRError(error)) return

  reportGlobalError(error)
}

export const onCaughtError: HydrationOptions['onCaughtError'] = (
  err,
  errorInfo
) => {
  const stack = getReactStitchedError(err)
  // console.log('onCaughtError', err, errorInfo)
  if (process.env.NODE_ENV === 'development') {
    const errorBoundaryComponent = errorInfo?.errorBoundary?.constructor
    const errorBoundaryName =
      // read react component displayName
      (errorBoundaryComponent as any)?.displayName ||
      errorBoundaryComponent?.name ||
      'Unknown'

    const componentThatErroredFrame = errorInfo?.componentStack?.split('\n')[1]

    // Match chrome or safari stack trace
    const matches =
      componentThatErroredFrame?.match(/\s+at (\w+)\s+|(\w+)@/) ?? []
    const componentThatErroredName = matches[1] || matches[2] || 'Unknown'

    const log =
      stack +
      '\n\n' +
      `The above error occurred in the <${componentThatErroredName}> component. It was handled by the <${errorBoundaryName}> error boundary.`

    console.error(log)
  } else {
    console.error(err)
  }
}

import type { HydrationOptions } from 'react-dom/client'
import { isBailoutToCSRError } from '../shared/lib/lazy-dynamic/bailout-to-csr'
import { getReactStitchedError } from './components/react-dev-overlay/internal/helpers/stitched-error'

const reportErrorHandler =
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

  reportErrorHandler(error)
}

export const onCaughtError: HydrationOptions['onCaughtError'] = (
  err,
  _errorInfo
) => {
  const error = getReactStitchedError(err)
  console.error(error)
}

export const onUncaughtError: HydrationOptions['onUncaughtError'] = (
  err,
  _errorInfo
) => {
  const error = getReactStitchedError(err)
  if (process.env.NODE_ENV === 'development') {
    console.error('Uncaught Error', error)
  }
  reportErrorHandler(error)
}

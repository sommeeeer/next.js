import React from 'react'

const captureOwnerStack = (React as any).captureOwnerStack ?? (() => '')

const REACT_ERROR_STACK_BOTTOM_FRAME = 'react-stack-bottom-frame'
const REACT_ERROR_STACK_BOTTOM_FRAME_REGEX = new RegExp(
  `(at ${REACT_ERROR_STACK_BOTTOM_FRAME} )|(${REACT_ERROR_STACK_BOTTOM_FRAME}\\@)`
)

export function getReactStitchedError<T = unknown>(err: T): T {
  const error = err instanceof Error ? err : new Error(err + '')
  const stackLines = (error.stack || '').split('\n')
  const indexOfSplit = stackLines.findIndex((line) =>
    REACT_ERROR_STACK_BOTTOM_FRAME_REGEX.test(line)
  )
  const isOriginalReactError = indexOfSplit >= 0 // has the react-stack-bottom-frame
  let newStack = isOriginalReactError
    ? stackLines.slice(0, indexOfSplit).join('\n')
    : error.stack || ''

  // Avoid duplicate overriding stack frames

  const ownerStack = captureOwnerStack()
  console.log(
    'ownerStack',
    ownerStack,
    'newStack.endsWith(ownerStack) === false',
    newStack.endsWith(ownerStack) === false
  )
  if (ownerStack && newStack.endsWith(ownerStack) === false) {
    newStack += ownerStack
    // Override stack
    ;(err as any).stack = newStack
  }

  return err
}

'use client'

function useThrowError() {
  // throw new Error('inner error')
  Promise.resolve().then(() => {
    throw new Error('async ssr error')
  })
}

function useErrorHook() {
  useThrowError()
}

export default function Page() {
  useErrorHook()
  return <p>hello world</p>
}

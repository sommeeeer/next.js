'use client'

function useThrowError() {
  if (typeof window !== 'undefined') {
    // throw new Error('browser error')
    Promise.resolve().then(() => {
      throw new Error('async browser error')
    })
  }
}

function useErrorHook() {
  useThrowError()
}

export default function Page() {
  useErrorHook()
  return <p>hello world</p>
}

'use client'

function useThrowError() {
  throw new Error('inner error')
}

function useErrorHook() {
  useThrowError()
}

export default function Page() {
  useErrorHook()
  return <p>hello world</p>
}

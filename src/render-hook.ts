import {renderHook as tlRenderHook} from '@testing-library/react-hooks/dom'

export function renderHook<T = unknown>(
  callbackFn: () => T,
  options: Parameters<typeof tlRenderHook>[1],
) {
  let error = null

  const component = tlRenderHook(() => {
    try {
      return callbackFn()
    } catch (e) {
      error = e
    }
  }, options)

  if (error) {
    component.unmount()
    throw error
  }

  return component
}

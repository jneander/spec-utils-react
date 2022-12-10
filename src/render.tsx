import type {ReactNode} from 'react'
import {render as rtlRender} from '@testing-library/react'

import {ErrorBoundary} from './components/error-boundary'

export interface RenderOptions extends Omit<Parameters<typeof rtlRender>[1], 'container'> {
  $container: HTMLElement
}

export async function render(element: ReactNode, options: RenderOptions) {
  const wrappedElement = <ErrorBoundary>{element}</ErrorBoundary>

  const {$container, ...rest} = options
  const {container, ...component} = rtlRender(wrappedElement, {
    container: $container,
    ...rest,
  })

  return {
    $container: container,
    ...component,
  }
}

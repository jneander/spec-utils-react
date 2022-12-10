import sinon, {SinonStub} from 'sinon'

import {createContainer} from '@jneander/spec-utils-dom'

import {render} from '../render'
import {ErrorBoundary} from './error-boundary'

describe('Spec Utils React > Components > ErrorBoundary', () => {
  let $container: HTMLElement
  let component: Awaited<ReturnType<typeof render>>
  let originalOnError: typeof window.onerror
  let consoleErrorStub: SinonStub

  beforeEach(() => {
    consoleErrorStub = sinon.stub(console, 'error')
    originalOnError = window.onerror
    window.onerror = () => {
      // noop
    }

    $container = createContainer()
  })

  afterEach(() => {
    component.unmount()
    $container.remove()

    window.onerror = originalOnError
    consoleErrorStub.restore()
  })

  function OkayComponent() {
    return <span>Okay</span>
  }

  const BrokenComponent = () => {
    throw new Error('BROKEN')
  }

  function SpecComponent({broken}: {broken?: boolean}) {
    return <ErrorBoundary>{broken ? <BrokenComponent /> : <OkayComponent />}</ErrorBoundary>
  }

  describe('when an error is thrown during render', () => {
    it('includes the error content in the render', async () => {
      component = await render(<SpecComponent broken />, {$container})
      expect($container.textContent.trim()).to.include('BROKEN')
    })
  })

  describe('when the render succeeds', () => {
    it('renders the child component', async () => {
      component = await render(<SpecComponent />, {$container})
      expect($container.textContent.trim()).to.equal('Okay')
    })
  })
})

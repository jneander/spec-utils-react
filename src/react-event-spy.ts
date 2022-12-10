import sinon, {SinonStub} from 'sinon'

export function reactEventSpy(): SinonStub {
  return sinon.stub().callsFake(event => {
    event.persist()
  })
}

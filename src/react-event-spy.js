import sinon from 'sinon'

export function reactEventSpy() {
  return sinon.stub().callsFake(event => {
    event.persist()
  })
}

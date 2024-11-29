import { SimpleComponent } from './simple.component'

describe('SimpleComponent', () => {
  it('should mount', () => {
    cy.mount(SimpleComponent)
  })
})
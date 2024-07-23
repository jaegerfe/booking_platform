import React from 'react'
import { Rating } from '../../src/components/properties/Rating'

describe('<Rating />', () => {
  it('renders 1 stars', () => {
    cy.mount(<Rating rate={1}/>)
    cy.get('[data-cy=filledStar]').should('have.length', 1)
    cy.get('[data-cy=outlineStar]').should('have.length', 4)
  })

  it('renders 2 stars', () => {
    cy.mount(<Rating rate={2}/>)
    cy.get('[data-cy=filledStar]').should('have.length', 2)
    cy.get('[data-cy=outlineStar]').should('have.length', 3)
  })

  it('renders 3 stars', () => {
    cy.mount(<Rating rate={3}/>)
    cy.get('[data-cy=filledStar]').should('have.length', 3)
    cy.get('[data-cy=outlineStar]').should('have.length', 2)
  })

  it('renders 4 stars', () => {
    cy.mount(<Rating rate={4}/>)
    cy.get('[data-cy=filledStar]').should('have.length', 4)
    cy.get('[data-cy=outlineStar]').should('have.length', 1)
  })

  it('renders 5 stars', () => {
    cy.mount(<Rating rate={5}/>)
    cy.get('[data-cy=filledStar]').should('have.length', 5)
    cy.get('[data-cy=outlineStar]').should('have.length', 0)
  })
})

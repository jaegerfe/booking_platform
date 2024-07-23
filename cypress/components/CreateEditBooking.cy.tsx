import React from 'react'
import { CreateEditBooking } from '../../src/components/bookings/CreateEditBooking'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import Property from '@/types/Property'
import { Booking } from '@/types/Booking'
import moment from 'moment'

describe('<CreateEditBooking />', () => {
  it('renders empty booking', () => {
    const property = {
      id: 1,
      name: "My Property",
      imgUrl: "http://",
      price: 120,
      rating: 3,
      description: "A good property",
    } as Property

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateEditBooking property={property}/>
        </BrowserRouter>
      </Provider>
    )
  
    cy.get('[data-cy=property-title]').should('have.text', property.name)
    cy.get('[data-cy=filledStar]').should('have.length', 3)
    cy.get('[data-cy=outlineStar]').should('have.length', 2)
    cy.get('[data-cy=label-price]').should('include.text', property.price.toFixed(2))
    cy.get('[data-cy=label-total-price]').should('include.text', 0)
    cy.get('input[placeholder="Select your dates"]').invoke('val').should('equal', '')
    cy.get('[data-cy=submit-book]').should('be.disabled')
    cy.get('[data-cy=submit-book]').should('have.text', 'Book Now')
    cy.get('[data-cy=property-description]').should('have.text', property.description)
  })

  it('create booking', () => {
    const property = {
      id: 1,
      name: "My Property",
      imgUrl: "http://",
      price: 120,
      rating: 3,
      description: "A good property",
    } as Property

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateEditBooking property={property}/>
        </BrowserRouter>
      </Provider>
    )

    const currentDate = new Date();
    const startDate = moment(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()))
    const endDate = moment(new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate()))

    selectDateRange(startDate.toDate(), endDate.toDate());

    cy.get('[data-cy=submit-book]').should('not.be.disabled')
    cy.get('[data-cy=label-total-price]').should('include.text', endDate.diff(startDate, 'days') * property.price)
    
    cy.get('[data-cy=submit-book]').click()
  })

  it('renders filled booking', () => {
    const property = {
      id: 1,
      name: "My Property",
      imgUrl: "http://",
      price: 120,
      rating: 3,
      description: "A good property",
    } as Property

    const currentDate = new Date();
    const startDate = moment(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), currentDate.getDate()))
    const endDate = moment(new Date(currentDate.getFullYear() + 1, currentDate.getMonth() + 1, currentDate.getDate()))
    const booking = {
      id: 1,
      startDate,
      endDate,
      owner: 'me',
      total: endDate.diff(startDate, 'days') * property.price,
      property: property,
    } as Booking

    cy.mount(
      <Provider store={store}>
        <BrowserRouter>
          <CreateEditBooking updatingBooking={true} booking={booking} property={property}/>
        </BrowserRouter>
      </Provider>
    )
  
    cy.get('[data-cy=property-title]').should('have.text', property.name)
    cy.get('[data-cy=filledStar]').should('have.length', 3)
    cy.get('[data-cy=outlineStar]').should('have.length', 2)
    cy.get('[data-cy=label-price]').should('include.text', property.price.toFixed(2))
    cy.get('[data-cy=label-total-price]').should('include.text', booking.total.toFixed(2))
    cy.get('input[placeholder="Select your dates"]').invoke('val').should('equal', `${booking.startDate.format('YYYY-MM-DD')} ~ ${booking.endDate.format('YYYY-MM-DD')}`)
    cy.get('[data-cy=submit-book]').should('not.be.disabled')
    cy.get('[data-cy=submit-book]').should('have.text', 'Update Booking')
    cy.get('[data-cy=property-description]').should('have.text', property.description)
  })
})

const selectDateRange = (startDate: Date, endDate: Date) => {
  // Open Date Picker input
  cy.get('input[placeholder="Select your dates"]').click()
  console.log(startDate, endDate)

  const currentDate = new Date()
  // Select start date year
  cy.get(`button:contains("${currentDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
  cy.wait(200)
  cy.get(`button:contains("${startDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
  cy.wait(200)
  // Select start date month
  cy.get(`button:contains("${currentDate.toLocaleString('default', {month: 'short'})}")`).first().click()
  cy.wait(200)
  cy.get(`button:contains("${startDate.toLocaleString('default', {month: 'short'})}")`).first().click()
  cy.wait(200)
  // Select start day
  cy.contains(new RegExp(`^${startDate.toLocaleString('default', {day: 'numeric'})}$`, 'g')).click()
  cy.wait(200)

  // Select end date year
  cy.get(`button:contains("${startDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
  cy.wait(200)
  cy.get(`button:contains("${endDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
  cy.wait(200)
  // Select end date month
  cy.get(`button:contains("${startDate.toLocaleString('default', {month: 'short'})}")`).first().click()
  cy.wait(200)
  cy.get(`button:contains("${endDate.toLocaleString('default', {month: 'short'})}")`).first().click()
  cy.wait(200)
  // Select end day
  cy.get('button').contains(new RegExp(`^${endDate.toLocaleString('default', {day: 'numeric'})}$`, 'g')).first().click().click()
}

/// <reference types="cypress" />
import moment from "moment"

describe('Just visit e2e test', () => {
    it('should visit', () => {
        cy.visit('/')
    })
})

describe('Booking e2e test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Create booking', () => {
        // Click on Snowy Chalet
        cy.contains('Snowy Chalet').click()
        // Validate if the page go to the property
        cy.url().should('include', '/property/')

        // Validate if it's rendering Snowy Chalet's info
        cy.contains('Snowy Chalet')
        cy.contains('Reserve now')
        cy.contains('A glamorous chalet near of snow montains.')
        cy.contains('Price per night: $150.56')

        // Select a future date
        cy.get('input[placeholder="Select your dates"]').click()
        const currentDate = new Date()
        const dateToStartBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15)
        const dateToEndBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 20)
        selectDateRange(dateToStartBook, dateToEndBook)

        // Assert total value
        cy.contains('Total for selected dates: $752.80')

        // Reserve
        cy.contains('Book Now').click()

        // Validate if the page go to the bookings list
        cy.url().should('include', '/my-bookings')

        // Check if reservation was created
        cy.contains('Snowy Chalet')
        cy.contains(`From ${moment(dateToStartBook).format('MM-DD-YYYY')} to ${moment(dateToEndBook).format('MM-DD-YYYY')}`)
    })

    it('Delete booking', () => {
        const currentDate = new Date()
        const dateToStartBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15)
        const dateToEndBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 20)

        // Create booking
        createBooking('Snowy Chalet', dateToStartBook, dateToEndBook)

        // Hit delete button
        cy.get('ul li:contains("Snowy Chalet")').contains('Delete').click()
        
        // Validate if the bookings disappear
        cy.get('ul li:contains("Snowy Chalet")').should('not.exist')
    })

    it('Update booking', () => {
        const currentDate = new Date()
        const dateToStartBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 10)
        const dateToEndBook = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 20)

        // Create booking
        createBooking('Snowy Chalet', dateToStartBook, dateToEndBook)

        // Hit update button
        cy.get('ul li:contains("Snowy Chalet")').contains('Update').click()

        // Validate if goes to the edit page
        cy.url().should('include', '/my-bookings/')
        
        // Validate if it's rendering Snowy Chalet's info
        cy.contains('Snowy Chalet')
        cy.contains('Update reservation')
        cy.contains('A glamorous chalet near of snow montains.')
        cy.contains('Price per night: $150.56')

        // Update dates
        const dateToUpdateStart = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 10)
        const dateToUpdateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 23)
        selectDateRange(dateToUpdateStart, dateToUpdateEnd)

        // Check total price
        cy.contains('Total for selected dates: $1957.28')

        // Click to update reservation
        cy.contains('Update Booking').click()

        // Validate if the page goes back to the bookings list
        cy.url().should('include', '/my-bookings')

        // Check if reservation was updated
        cy.contains('Snowy Chalet')
        cy.contains(`From ${moment(dateToUpdateStart).format('MM-DD-YYYY')} to ${moment(dateToUpdateEnd).format('MM-DD-YYYY')}`)
    })
})

const selectDateRange = (startDate: Date, endDate: Date) => {
    // Open Date Picker input
    cy.get('input[placeholder="Select your dates"]').click()

    const currentDate = new Date()
    // Select start date year
    cy.get(`button:contains("${currentDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
    cy.get(`button:contains("${startDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
    // Select start date month
    cy.get(`button:contains("${currentDate.toLocaleString('default', {month: 'short'})}")`).first().click()
    cy.get(`button:contains("${startDate.toLocaleString('default', {month: 'short'})}")`).first().click()
    // Select start day
    cy.contains(new RegExp(`^${startDate.toLocaleString('default', {day: 'numeric'})}$`, 'g')).click()

    // Select end date year
    cy.get(`button:contains("${startDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
    cy.get(`button:contains("${endDate.toLocaleString('default', {year: 'numeric'})}")`).first().click()
    // Select end date month
    cy.get(`button:contains("${startDate.toLocaleString('default', {month: 'short'})}")`).first().click()
    cy.get(`button:contains("${endDate.toLocaleString('default', {month: 'short'})}")`).first().click()
    // Select end day
    cy.get('button').contains(new RegExp(`^${endDate.toLocaleString('default', {day: 'numeric'})}$`, 'g')).first().click().click()
}

const createBooking = (propertyName: string, startDate: Date, endDate: Date) => {
    // Click on Snowy Chalet
    cy.contains(propertyName).click()
    // Validate if the page go to the property
    cy.url().should('include', '/property/')

    // Validate if it's rendering Snowy Chalet's info
    cy.contains(propertyName)
    cy.contains('Reserve now')

    // Select a future date
    selectDateRange(startDate, endDate)

    // Reserve
    cy.contains('Book Now').click()
    // Validate if the page go to the bookings list
    cy.url().should('include', '/my-bookings')

    // Check if reservation was created
    cy.contains(propertyName)
    cy.contains(`From ${moment(startDate).format('MM-DD-YYYY')} to ${moment(endDate).format('MM-DD-YYYY')}`)
}

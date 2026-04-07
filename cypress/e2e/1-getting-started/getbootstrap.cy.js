/// <reference types="cypress" />

describe('Checks getbootstrap navbar', () =>{
    beforeEach( () => {
        cy.visit('https://getbootstrap.com/')
    })

    it('Check navbar items displayed', () => {
        cy.contains('Docs').should('contain.text', 'Docs');
    })
})
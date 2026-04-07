/// <reference types="cypress" />

describe('Checks 8to4studios navbar', () =>{
    beforeEach( () => {
        cy.visit('https://8to4studios.com/')
    })

    it('Check navbar items displayed', () => {
        cy.contains('News').should('have.text', 'News');
        cy.contains('Forum').should('have.text', 'Forum');
        cy.contains('Login').should('have.text', 'Login');
        cy.contains('Register').should('have.text', 'Register');
    })

    it('Check forum post exists', () => {
        cy.get('#mainmenuforumbtn').click();
        cy.contains('Find Me').should('have.text', 'Find Me');
    })
});
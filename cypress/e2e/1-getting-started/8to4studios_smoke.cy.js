/// <reference types="cypress" />

describe('8to4studios smoke test', () => {
    beforeEach(() => {
        cy.visit('https://8to4studios.com/')
    });

    it('Check navbar items displayed', () => {
        cy.contains('News').should('have.text', 'News');
        cy.contains('Forum').should('have.text', 'Forum');
        cy.contains('Login').should('have.text', 'Login');
        cy.contains('Register').should('have.text', 'Register');
    });

    it('Check news article exists', () => {
        cy.contains('This is a title').should('have.text', 'This is a title');
    });

    it('Check forum post exists', () => {
        cy.get('#mainmenuforumbtn').click();
        cy.contains('Find Me').should('have.text', 'Find Me');
    });
});
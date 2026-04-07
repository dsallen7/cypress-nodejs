/// <reference types="cypress" />
 
describe('Go to basic webpage', () => {
  beforeEach(() => {
    cy.visit('https://www.google.com')
  })
 
  it('Displays Google', () => {
    cy.contains('Google');
  })

  it('Query Google', () =>{
    cy.get('.gLFyf').type('Youtube');
    cy.contains('Google Search').click();
    cy.frameLoaded('iframe[title="reCAPTCHA"]');
    cy.iframe('iframe[title="reCAPTCHA"]').find('.recaptcha-checkbox-border').should('be.visible').click();
    cy.frameLoaded('iframe[title="recaptcha challenge expires in two minutes"]');
  })
})
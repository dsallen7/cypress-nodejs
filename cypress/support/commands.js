// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-iframe';

Cypress.Commands.add('home', () => {
    cy.get('#banner').click();
});

Cypress.Commands.add('login', (username) => {   
    cy.get('#loginmenubtn').click()
    cy.env(['password']).then(({ password }) => {
        cy.get('input[name="username"]').first().type(username);
        cy.get('input[name="password"]').first().type(password, { log: false });
        cy.get('#loginbtn').click();

        cy.get('#userDropdownButton').should('have.text', username);
    });
});

Cypress.Commands.add('loginRequest', (username) => {
    var csrfmiddlewaretoken;
    cy.get('input[name="csrfmiddlewaretoken"]').invoke('val').then(mw_token_value => {csrfmiddlewaretoken = mw_token_value;} );
    
    cy.env(['password']).then(({ password }) => {
    
        cy.request({
            headers: {
                'Referer': 'https://8to4studios.com/accounts/login/',
            },
            method: 'POST',
            url: 'accounts/login/',
            form: true,
            body: {
                csrfmiddlewaretoken,
                username,
                password
            }
        });

        cy.home();
        cy.verifyLoggedIn(username);
    });
});

Cypress.Commands.add('verifyLoggedIn', (username) => {
    cy.get('#userDropdownButton').should('have.text', username);
});

Cypress.Commands.add('logout', () => {
    cy.get('#userDropdownButton').click();
    cy.get('#logoutbtn').click();
});
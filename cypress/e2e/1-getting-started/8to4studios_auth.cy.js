/// <reference types="cypress" />

describe('8to4studios authentication', () => {
    beforeEach(() => {
        cy.visit('https://8to4studios.com/')
    });

    it('Log in and out using UI', () => {
        const username = 'testuser1';

        cy.get('#loginmenubtn').click()
        cy.env(['password']).then(({ password }) => {
            cy.get('input[name="username"]').first().type(username);
            cy.get('input[name="password"]').first().type(password, { log: false });
            cy.get('#loginbtn').click();

            cy.get('#userDropdownButton').should('have.text', username);
        });

        cy.get('#userDropdownButton').click();
        cy.get('#logoutbtn').click();
    });

    it('Log in using cy.request', () => {
        const username = 'testuser1';
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

        cy.logout();
    });
});
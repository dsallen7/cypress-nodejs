/// <reference types="cypress" />

describe('Checks 8to4studios navbar', () => {
    beforeEach(() => {
        cy.env(['username', 'password']).then(({ username, password }) => {
            expect(username, 'password was set').to.be.a('string').and.not.be.empty;
            expect(password, 'password was set').to.be.a('string').and.not.be.empty;
        });
        cy.visit('https://8to4studios.com/')
    });

    it('Log in using cy.request', () => {
        var csrfmiddlewaretoken;
        cy.get('input[name="csrfmiddlewaretoken"]').invoke('val').then(mw_token_value => {csrfmiddlewaretoken = mw_token_value;} );
        
        cy.env(['username', 'password']).then(({ username, password }) => {
        
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
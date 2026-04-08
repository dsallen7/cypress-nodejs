/// <reference types="cypress" />

describe('Checks 8to4studios navbar', () => {
    beforeEach(() => {
        cy.env(['username', 'password']).then(({ username, password }) => {
            expect(username, 'password was set').to.be.a('string').and.not.be.empty;
            expect(password, 'password was set').to.be.a('string').and.not.be.empty;
        });
        cy.visit('https://8to4studios.com/')
    });

    it('Upvote then downvote forum post', () => {
        const delay = 3000;

        cy.loginRequest('username', 'password');
        cy.get('#mainmenuforumbtn').click();

        // Upvote
        cy.get('#threadupvotebtn1').click();

        cy.wait(delay);

        // Downvote
        cy.get('#threaddownvotebtn1').click();

        cy.wait(delay);

        // Undo Downvote
        cy.get('#threaddownvotebtn1').click();

        cy.wait(delay);

        cy.logout();
    });
});

// cy.getCookie('csrftoken').value
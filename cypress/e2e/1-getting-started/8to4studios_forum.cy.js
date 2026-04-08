/// <reference types="cypress" />

describe('8to4studios forum', () => {

    beforeEach(() => {
        cy.visit('https://8to4studios.com/')
    });

    it('Upvote then downvote forum post', () => {
        const delay = 3000;

        // Login
        cy.loginRequest('testuser1');

        // Navigate to forums
        cy.get('#mainmenuforumbtn').click();

        // Intercept HTTP calls to thread up or down vote
        cy.intercept('POST', '/forum/votethread').as('threadvote');

        // Upvote
        cy.get('#threadupvotebtn1').click();
        cy.wait('@threadvote').then((interception) => {
            cy.wrap(interception.response.body).should('have.length', 3);
        });

        // Downvote
        cy.get('#threaddownvotebtn1').click();
        cy.wait('@threadvote').then((interception) => {
            cy.wrap(interception.response.body).should('have.length', 3);
        });

        // Undo Downvote
        cy.get('#threaddownvotebtn1').click();
        cy.wait('@threadvote').then((interception) => {
            cy.wrap(interception.response.body).should('have.length', 3);
        });

        cy.wait(delay);

        //cy.logout();
    });

    it('Post text thread in politics board as testuser1', () => {
        // Login as testuser1
        cy.loginRequest('testuser1');

        // Navigate to forums
        cy.get('#mainmenuforumbtn').click();

        // Navigate to Politics board
        cy.get(':nth-child(5) > .boardlink').click();

        // Click New Text Thread button
        cy.get('#newtextthread_a').click();

        cy.fixture('8to4studios').then((data) => {
            // Enter Board Name
            cy.get('[name="id_boardsearch"]').type(data.boardname);

            // Enter Thread Title
            cy.get('[name="title"]').type(data.threadtitle);

            // Enter Thread Text
            cy.get('[name="text"]').type(data.threadtext);

            // Click Post Button
            cy.get('#postbtn').click();

            // Confirm new thread title
            cy.get('.thread-view-column > .column').should('contain.text', data.threadtitle);
        });

        cy.logout();
    });

    it('Delete text thread in politics board as testuser1', () => {
        // Login as testuser1
        cy.loginRequest('testuser1');

        // Navigate to forums
        cy.get('#mainmenuforumbtn').click();

        // Navigate to thread
        cy.fixture('8to4studios').then((data) => {
            cy.contains(data.threadtitle).click();
        });

        // Click Delete Button
        cy.get('#deleteinitial').click();

        // Click Confirm Delete Button
        cy.get('#deletebuttonsconfirm > [type="submit"]').click();

        cy.logout();
    });
});
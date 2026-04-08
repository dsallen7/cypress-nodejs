/// <reference types="cypress" />

describe('Checks 8to4studios navbar', () =>{
    beforeEach( () => {
        cy.env(['username', 'password']).then(({username, password}) => {
            cy.log('Username: ' + username);
            cy.log('Password: ' + password);
            expect(username, 'password was set').to.be.a('string').and.not.be.empty;
            expect(password, 'password was set').to.be.a('string').and.not.be.empty;
        });
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

    it('Log in and out', () => {
        cy.get('#loginmenubtn').click()
        cy.fixture('8to4studios').then((data) => {

            cy.env(['username', 'password']).then(({username, password}) => {
                expect(username, 'password was set').to.be.a('string').and.not.be.empty;
                expect(password, 'password was set').to.be.a('string').and.not.be.empty;            
                cy.get('input[name="username"]').first().type(username);
                cy.get('input[name="password"]').first().type(password, {log: false});
            });
            cy.get('#loginbtn').click();

            cy.get('#userDropdownButton').click();
            cy.get('#logoutbtn').click();
        });
    });
});
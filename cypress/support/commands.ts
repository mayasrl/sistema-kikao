/// <reference types="cypress" />

Cypress.Commands.add('login', (email: string, senha: string) => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(senha);
  cy.get('button[type="submit"]').click();
});

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, senha: string): Chainable<void>;
    }
  }
}

export {};

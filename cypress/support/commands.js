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

Cypress.Commands.add("login", () => {
  cy.session("default-login", () => {
    cy.fixture("user").then((user) => {
      cy.visit("/login");

      cy.get('[data-qa="login-email"]').should("be.visible").type(user.email);
      cy.get('[data-qa="login-password"]')
        .should("be.visible")
        .type(user.password);
      cy.get('[data-qa="login-button"]').click();

      cy.url().should("not.include", "/login");
      cy.get("body").should("not.contain", "Login");
    });
  });

  cy.visit("/");
});

Cypress.Commands.add('login', (user: { email: string; password: string }) => {
  cy.visit('/');

  cy.get('input[name="email"]').type(user.email);
  cy.get('button').contains('Continuar').click();

  cy.get('input[name="password"]').type(user.password);
  cy.get('button').contains('Continuar').click();

  cy.contains('Olá,').should('exist');
});

Cypress.Commands.add('logout', () => {
  
  cy.get('svg.chakra-icon.css-bb721g')
    .should('have.length.greaterThan', 0)
    .last()
    .parents('button')
    .should('be.visible')
    .click({ force: true });

  cy.contains('button', 'Sair')
    .should('be.visible')
    .click();

});


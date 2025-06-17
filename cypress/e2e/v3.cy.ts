import { searchAndClickPatient } from "../support/utils/Patient";

describe('Search For a Patient', () => {
  it('Should search patient and click on first result', () => {
    cy.fixture<UsersFixture>('user').then((users) => {
      const user = users.basic;
      cy.login(user);

      cy.contains('Olá', { timeout: 10000 }).should('exist');
      
      searchAndClickPatient(user);
    });
  });
});

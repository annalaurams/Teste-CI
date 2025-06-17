describe('Login Maia', () => {
  it('Should log in successfully ', () => {
    cy.fixture('user').then((users) => {
      const user = users.basic;
      cy.login(user);  
    });
  });
});

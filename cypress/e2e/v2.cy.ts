describe('Logout Maia', () => {
  it('Should login successfully', () => {
    cy.fixture('user').then((users) => {
      const user = users.basic;
      cy.login(user);  
    });
    cy.logout(); 
  });
});

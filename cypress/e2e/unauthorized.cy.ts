it('should protect the client for unauthorized user by redirection', () => {
   cy.visit('/client').url().should('not.contain', '/client');
});

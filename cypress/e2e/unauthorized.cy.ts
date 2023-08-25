it('should protect the client for unauthorized user', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();

  cy.visit('/client');

  if (cy.get('[data-testid="btnSignOut"]')) {
    cy.get('[data-testid="btnSignOut"]').click();
  }

  cy.visit('/client');
  cy.url().should('not.contain', '/client');
});

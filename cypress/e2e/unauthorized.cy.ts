it('should protect the client for unauthorized user', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();
  // cy.clear();
  

  // cy.visit('/client');

  // cy.get('button').then((btn) => {
  //   if (btn.hasClass('btn-sign-out')) {
  //     cy.get('[data-testid="btnSignOut"]').click();
  //   }
  // });

  cy.visit('/client');
  cy.url().should('not.contain', '/client');
});

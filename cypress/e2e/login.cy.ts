import { environment } from 'src/environments/environment';
// import '../support/commands';

it('should login valid user', () => {
  cy.visit('/');
  cy.login(environment.guest.email,environment.guest.password);
  cy.url().should('contain', '/client');
  cy.get('[data-testid="btnSignOut"]').click();
});

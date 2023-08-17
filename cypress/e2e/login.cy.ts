import {environment} from 'src/environments/environment'

it("should login valid user", () =>{
    cy.visit("/");
    cy.get('[data-testid="email"]').type(environment.guest.email);
    cy.get('[data-testid="password"]').type(environment.guest.password);
    cy.get('[data-testid="submitLoginForm"]').click();
    cy.contains('client works');
});
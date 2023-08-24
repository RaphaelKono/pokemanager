import {environment} from 'src/environments/environment'

it("should sign up valid user", () =>{
    cy.visit("/");
    cy.get('[data-testid="routeToSignUp"]').click();
    cy.get('[data-testid="email"]').type(environment.testGuest.email);
    cy.get('[data-testid="password1"]').type(environment.testGuest.password);
    cy.get('[data-testid="password2"]').type(environment.testGuest.password);
    cy.get('[data-testid="submitSignUpForm"]').click();
    cy.contains('verification works');
});
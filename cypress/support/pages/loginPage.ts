export default class LoginPage {
    // Elements on the Login Page
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = '[type="submit"]';
    invalidCredentialsAlert = '.oxd-alert'
    usernameFieldValidation = ':nth-child(2) > .oxd-input-group > .oxd-text';
    passwordFieldValidation = ':nth-child(3) > .oxd-input-group > .oxd-text';

    // Methods
    login(username: string, password: string) {
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        this.clickLoginButton();
    }

    verifyLoginSuccessful(url: string) {
        cy.url().should('eq', url);
        cy.get(this.usernameField).should('not.exist');
        cy.get(this.passwordField).should('not.exist');
    }

    verifyLoginFailed() {
        cy.url().should('eq', Cypress.config("baseUrl"));
        cy.get(this.usernameField).should('be.visible');
        cy.get(this.passwordField).should('be.visible');
        cy.get(this.invalidCredentialsAlert).should('be.visible').should('have.text', 'Invalid credentials');
    }

    clickLoginButton() {
        cy.get(this.loginButton).click();
    }

    verifyUsernameFieldValidation() {
        cy.get(this.usernameField).should('be.empty');
        cy.get(this.usernameFieldValidation).should('be.visible').should('have.text', 'Required');
    }

    verifyPasswordFieldValidation() {
        cy.get(this.passwordField).should('be.empty');
        cy.get(this.passwordFieldValidation).should('be.visible').should('have.text', 'Required');
    }
}
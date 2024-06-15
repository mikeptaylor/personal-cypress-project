export default class LoginPage {
    // Elements on the Login Page
    usernameField = 'input[name="username"]';
    passwordField = 'input[name="password"]';
    loginButton = '[type="submit"]';

    // Methods
    login(username: string, password: string) {
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.loginButton).click();
    }
}
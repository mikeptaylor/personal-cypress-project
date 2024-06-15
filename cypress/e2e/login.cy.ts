import LoginPage from "../support/pages/loginPage";
import {INVALID_PASSWORD, INVALID_USERNAME, PASSWORD, USERNAME} from "../support/Utils/credentialUtils";
import DashboardPage from "../support/pages/dashboardPage";
import {UserMenuOptions} from "../support/Utils/userMenuUtils";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('Testing Login and Logout Functionality', () => {
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it('Logs in using valid credentials', () => {
    loginPage.login(USERNAME, PASSWORD);
    loginPage.verifyLoginSuccessful(dashboardPage.dashboardUrl);
  });

  it('Logs out', () => {
    loginPage.login(USERNAME, PASSWORD);
    loginPage.verifyLoginSuccessful(dashboardPage.dashboardUrl);
    dashboardPage.openUserMenuAndSelectOption(UserMenuOptions.Logout);
    cy.url().should('eq', Cypress.config("baseUrl"));
  });

  it('Attempts to log in with an invalid username and a valid password', () => {
    loginPage.login(INVALID_USERNAME, PASSWORD);
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in with a valid username and an invalid password', () => {
    loginPage.login(USERNAME, INVALID_PASSWORD);
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in with an invalid username and an invalid password', () => {
    loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in without entering a username or password', () => {
    loginPage.clickLoginButton();
    loginPage.verifyUsernameFieldValidation();
    loginPage.verifyPasswordFieldValidation();
  });

  it('Verfies that the auth/validate API call returns a 302 status code when logging in', () => {
      cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('login');
      cy.get(loginPage.usernameField).clear().type(USERNAME).should('have.value', USERNAME);
      cy.get(loginPage.passwordField).clear().type(PASSWORD).should('have.value', PASSWORD);
      loginPage.clickLoginButton();
      cy.wait('@login').its('response.statusCode').should('eq', 302);
    });
});
import LoginPage from "../support/pages/loginPage";
import {INVALID_PASSWORD, INVALID_USERNAME, PASSWORD, USERNAME} from "../support/utils/credentialUtils";
import DashboardPage from "../support/pages/dashboardPage";
import {UserMenuOptions} from "../support/utils/userMenuUtils";

const loginPage: LoginPage = new LoginPage();
const dashboardPage: DashboardPage = new DashboardPage();

describe('Testing Login and Logout Functionality', () => {
  // Before each test, visit the base URL
  beforeEach(() => {
    cy.visit(Cypress.config("baseUrl"));
  });

  it('Logs in using valid credentials', () => {
    // Log in using valid credentials
    loginPage.login(USERNAME, PASSWORD);
    // Verify that the login was successful by checking the URL and the absence of the Username and Password fields
    loginPage.verifyLoginSuccessful(dashboardPage.dashboardUrl);
  });

  it('Logs out', () => {
    // Log in using valid credentials
    loginPage.login(USERNAME, PASSWORD);
    // Verify that the login was successful by checking the URL and the absence of the Username and Password fields
    loginPage.verifyLoginSuccessful(dashboardPage.dashboardUrl);
    // Open the User menu and select the Logout option
    dashboardPage.openUserMenuAndSelectOption(UserMenuOptions.Logout);
    // Verify that the logout was successful by checking the URL and the presence of the Username and Password fields
    loginPage.verifyLogoutSuccessful(Cypress.config("baseUrl"));
  });

  it('Attempts to log in with an invalid username and a valid password', () => {
    // Attempt to log in with an invalid username and a valid password
    loginPage.login(INVALID_USERNAME, PASSWORD);
    // Verify that the login failed by checking the URL, the presence of the Username and Password fields and the Invalid Credentials alert
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in with a valid username and an invalid password', () => {
    // Attempt to log in with a valid username and an invalid password
    loginPage.login(USERNAME, INVALID_PASSWORD);
    // Verify that the login failed by checking the URL, the presence of the Username and Password fields and the Invalid Credentials alert
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in with an invalid username and an invalid password', () => {
    // Attempt to log in with an invalid username and an invalid password
    loginPage.login(INVALID_USERNAME, INVALID_PASSWORD);
    // Verify that the login failed by checking the URL, the presence of the Username and Password fields and the Invalid Credentials alert
    loginPage.verifyLoginFailed();
  });

  it('Attempts to log in without entering a username or password', () => {
    // Clicks the Log In button without entering a username or password
    loginPage.clickLoginButton();
    // Verify that the Username and Password fields have validation messages
    loginPage.verifyUsernameFieldValidation();
    loginPage.verifyPasswordFieldValidation();
  });

  it('Verfies that the auth/validate API call returns a 200 status code when logging in', () => {
    // Intercept the POST request to the auth/validate API endpoint
    cy.intercept('POST', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate').as('login');
    // Enter a valid username and password and click the Log In button
    cy.get(loginPage.usernameField).clear().type(USERNAME).should('have.value', USERNAME);
    cy.get(loginPage.passwordField).clear().type(PASSWORD).should('have.value', PASSWORD);
    loginPage.clickLoginButton();
    // Wait for the POST request to the auth/validate API endpoint to be completed and verify that it returns a 200 status code
    cy.wait('@login').its('response.statusCode').should('eq', 200);
  });
});

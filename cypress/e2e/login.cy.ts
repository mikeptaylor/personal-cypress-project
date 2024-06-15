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
});
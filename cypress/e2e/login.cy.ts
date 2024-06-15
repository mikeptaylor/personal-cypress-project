import LoginPage from "../support/pages/loginPage";
import {PASSWORD, USERNAME} from "../support/Utils/credentialUtils";

const loginPage = new LoginPage();

describe('Testing Login Functionality', () => {
  it('Logs in using valid credentials', () => {
    cy.visit(Cypress.config("baseUrl"));
    loginPage.login(USERNAME, PASSWORD);
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
  })
})
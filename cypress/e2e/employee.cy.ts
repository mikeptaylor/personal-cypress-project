import LoginPage from "../support/pages/loginPage";
import {PASSWORD, USERNAME} from "../support/utils/credentialUtils";
import DashboardPage from "../support/pages/dashboardPage";
import {DashboardNavigationMenuOptions} from "../support/utils/dashboardUtils";

const loginPage: LoginPage = new LoginPage();
const dashboardPage: DashboardPage = new DashboardPage();

describe('Testing the Employee page', () => {
    // Before each test, visit the base URL
    beforeEach(() => {
        cy.visit(Cypress.config("baseUrl"));
    });

    it('Adds a new employee to the company directory', () => {
        // Log in using valid credentials
        loginPage.login(USERNAME, PASSWORD);
        // Verify that the login was successful by checking the URL and the absence of the Username and Password fields
        loginPage.verifyLoginSuccessful(dashboardPage.dashboardUrl);
        // Gets the left hand menu and selects an option
        dashboardPage.selectOptionFromDashboardNavigationMenu(DashboardNavigationMenuOptions.PIM);
        // Checks the URL to confirm that the correct page was loaded
        cy.url().should('include', '/pim/viewEmployeeList');
    });
});

import BasePage from './basePage';

const basePage: BasePage = new BasePage();

export default class PIMPage {
    // PIM URL
    pimUrl: string = 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList';

    // Elements on the PIM Page
    addEmployeeButton: string = '.orangehrm-header-container > .oxd-button';
    employeeFirstNameField: string = '[placeholder="First Name"]';
    employeeMiddleNameField: string = '[placeholder="Middle Name"]';
    employeeLastNameField: string = '[placeholder="Last Name"]';
    employeeIdField: string = '.oxd-input oxd-input--active';
    createLoginDetailsToggle: string = '.oxd-switch-input';
    saveButton: string = '.oxd-button--secondary';


    // Methods
    addEmployee(firstName: string, middleName: string, lastName: string, employeeId?: string, addEmployeeId?: boolean, createLoginDetails?: boolean): void {
        cy.get(this.addEmployeeButton).should('be.visible').contains(' Add ').click();
        basePage.waitForLoadingSpinnerToDisappear();
        cy.get(this.employeeFirstNameField).click().clear().type(firstName);
        cy.get(this.employeeMiddleNameField).click().clear().type(middleName);
        cy.get(this.employeeLastNameField).click().clear().type(lastName);
        cy.get(this.employeeIdField).should('not.be.empty');
        if (addEmployeeId) {
            cy.get(this.employeeIdField).click().clear().type(employeeId);
        }
        if (createLoginDetails) {
            cy.get(this.createLoginDetailsToggle).click();
        }
        // Intercept the POST request to save the employee
        cy.intercept('POST', '**/api/v2/pim/employees**').as('saveEmployee');
        cy.get(this.saveButton).click();
        cy.wait('@saveEmployee').its('response.statusCode').should('eq', 200);
        basePage.waitForLoadingSpinnerToDisappear();
    }
}
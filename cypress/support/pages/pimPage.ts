export default class PIMPage {
    // PIM URL
    pimUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList';

    // Elements on the PIM Page
    loadingSpinner: string = '.oxd-loading-spinner';
    addEmployeeButton: string = '.orangehrm-header-container > .oxd-button';
    employeeFirstNameField: string = ':nth-child(1) > :nth-child(2) > .oxd-input';
    employeeMiddleNameField: string = ':nth-child(2) > :nth-child(2) > .oxd-input';
    employeeLastNameField: string = ':nth-child(3) > :nth-child(2) > .oxd-input';
    employeeIdField: string = '.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input';
    createLoginDetailsToggle = '.oxd-switch-input';
    saveButton = '.oxd-button--secondary';


    // Methods
    addEmployee(firstName: string, middleName: string, lastName: string, employeeId: string, createLoginDetails?: boolean): void {
        cy.get(this.addEmployeeButton).should('be.visible').click();
        cy.get(this.employeeFirstNameField).click().clear().type(firstName);
        cy.get(this.employeeMiddleNameField).click().clear().type(middleName);
        cy.get(this.employeeLastNameField).click().clear().type(lastName);
        cy.get(this.employeeIdField).should('not.be.empty');
        if (createLoginDetails) {
            cy.get(this.createLoginDetailsToggle).click();
        }
        cy.get(this.saveButton).click();
    }
}
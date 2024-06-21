export default class BasePage {
    // Shared Elements across the site
    loadingSpinner: string = '.oxd-loading-spinner';

    // Methods
    waitForLoadingSpinnerToDisappear(): void {
        cy.get(this.loadingSpinner, {timeout: 15000}).should('not.exist');
    }
}
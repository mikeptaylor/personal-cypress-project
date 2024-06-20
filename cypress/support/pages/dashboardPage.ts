import {UserMenuOptions} from "../utils/userMenuUtils";
import {DashboardNavigationMenuOptions} from "../utils/dashboardUtils";

export default class DashboardPage {
    // Dashboard URL
    dashboardUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

    // Elements on the Dashboard Page
    dashboardNavigationMenu = 'ul.oxd-main-menu';
    userMenuButton = '.oxd-userdropdown-tab';
    userMenuDropdownList = '.oxd-dropdown-menu';

    // Methods
    openUserMenuAndSelectOption(userMenuOption: UserMenuOptions): void {
        cy.get(this.userMenuButton).click();
        cy.get(this.userMenuDropdownList).contains(userMenuOption).click();
    }

    selectOptionFromDashboardNavigationMenu(menuOption: DashboardNavigationMenuOptions): void {
        cy.get(this.dashboardNavigationMenu, { timeout: 15000 }).should('be.visible').contains(menuOption).click();
    }
}
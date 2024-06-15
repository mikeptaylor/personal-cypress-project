import {UserMenuOptions} from "../Utils/userMenuUtils";

export default class DashboardPage {
    // Dashboard URL
    dashboardUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index';

    // Elements on the Dashboard Page
    userMenuButton = '.oxd-userdropdown-tab';
    userMenuDropdownList = '.oxd-dropdown-menu';

    // Methods
    openUserMenuAndSelectOption(userMenuOption: UserMenuOptions): void {
        cy.get(this.userMenuButton).click();
        cy.get(this.userMenuDropdownList).contains(userMenuOption).click();
    }
}
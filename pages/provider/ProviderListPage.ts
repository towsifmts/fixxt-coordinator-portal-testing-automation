import { 
  Page, 
  Locator 
} from '@playwright/test';

import { AGENCY_ID } from '../../test-data/provider';

export class ProviderListPage {
  readonly page: Page;

  readonly activeProvidersPath =
    `/agency/${AGENCY_ID}/provider/list/active`;

  readonly addButton: Locator;
  readonly providerRows: Locator;

  readonly firstProviderRow: Locator;
  readonly firstProviderName: Locator;
  readonly firstProviderActionMenu: Locator;

  // Archive popup
  readonly archiveDialog: Locator;
  readonly archiveDialogTitle: Locator;
  readonly archiveDialogMessage: Locator;
  readonly archiveNoButton: Locator;
  readonly archiveYesButton: Locator;
  
  readonly archiveSuccessMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Add provider button
    this.addButton = page.locator(
      '.tooltip-label.ag-right-icon[aria-label="Add"]'
    );

    // Provider rows
    this.providerRows = page.locator(
      '[role="row"][row-index]'
    );

    // First provider Name link
    this.firstProviderName = this.providerRows
      .first()
      .locator('[role="gridcell"][col-id="name"] a');

    // First provider row
    this.firstProviderRow = page.locator(
      '[role="row"][row-index="0"]'
    );

    // First provider row action menu
    this.firstProviderActionMenu =
      this.firstProviderRow.locator(
        '[col-id="actionMenu"] [data-testid="MoreVertIcon"]'
      );

    // Archive dialog
    this.archiveDialog = page.getByRole('dialog');

    this.archiveDialogTitle =
      this.archiveDialog.getByText(
        'Archive - Provider',
        { 
          exact: true 
        }
      );

    this.archiveDialogMessage =
      this.archiveDialog.getByText(
        'Are you sure you want to archive this provider?',
        { 
          exact: true 
        }
      );

    this.archiveNoButton =
      this.archiveDialog.getByRole('button', {
        name: 'No',
        exact: true,
      });

    this.archiveYesButton =
      this.archiveDialog.getByRole('button', {
        name: 'Yes',
        exact: true,
      });

    this.archiveSuccessMessage =
      page.getByText(
        'The provider has been archived successfully',
        { exact: true }
      );
  }

  async gotoActiveProviders() {
    await this.page.goto(this.activeProvidersPath);
  }

  async clickAdd() {
    await this.addButton.click();
  }

  async clickFirstProviderName() {
    await this.firstProviderName.click();
  }

  async getFirstProviderId() {
    const href = await this.firstProviderName.getAttribute('href');

    if (!href) {
      throw new Error(
        'First provider Name does not have an href.'
      );
    }

    const providerId = href.split('/').pop();

    if (!providerId) {
      throw new Error(
        `Could not get provider ID from href: ${href}`
      );
    }

    return providerId;
  }

  async goToFirstProviderEdit(providerId:string) {
    await this.page.goto(
      `/agency/${AGENCY_ID}/provider/edit/${providerId}`
    );
  }

  // Archive

  async openFirstProviderActionMenu() {
    await this.firstProviderActionMenu.click();
  }

  async clickFirstProviderArchive() {
    await this.openFirstProviderActionMenu();

    await this.page.getByRole('menuitem', {
      name: 'Archive',
      exact: true,
    }).click();
  }

  async confirmArchive() {
    await this.archiveYesButton.click();
  }

  async archiveFirstProvider() {
    await this.clickFirstProviderArchive();

    await this.archiveYesButton.click();
  }
}
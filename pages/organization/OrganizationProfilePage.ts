import 
{ 
  Page, 
  Locator 
} from '@playwright/test';

import 
{ 
  AGENCY_ID 
} from '../../test-data/provider';

export class OrganizationProfilePage 
{
  readonly page: Page;

  readonly organizationProfilePath = 
    `/agency/${AGENCY_ID}/profile`;

  readonly providersMenu: Locator;
  readonly activeProvidersLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.providersMenu = page
      .getByText('Providers', { exact: true });

    this.activeProvidersLink = page
      .getByRole('link', { name: 'Active Providers' });
  }

  async clickProvidersMenu() {
    await this.providersMenu.click();
  }

  async goToActiveProviders() 
  {
    await this.clickProvidersMenu();
    await this.activeProvidersLink.click();
  }
}
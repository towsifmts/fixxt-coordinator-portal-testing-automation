import 
{ 
  Page, 
  Locator
} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly organisationLookup: Locator;
  readonly organisationOptions: Locator;

  constructor(page: Page) {
    this.page = page;

    this.organisationLookup = page
      .getByRole('combobox', { 
          name: 'Organisation Lookup' 
        });

    this.organisationOptions = page.getByRole('option');
  }

  async selectOrganisation(organisationIdOrName: string) {
    
    await this.organisationLookup.fill(organisationIdOrName);

    await this.organisationOptions.first().waitFor();
    await this.organisationOptions.first().hover();
    await this.organisationOptions.first().click();
  }
}
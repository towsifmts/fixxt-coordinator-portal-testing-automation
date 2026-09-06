import 
{ 
  Page, 
  Locator 
} from '@playwright/test';

import 
{ 
  AGENCY_ID 
} from '../../test-data/provider';

export class ProviderListPage 
{
  readonly page: Page;

  readonly activeProvidersPath =
    `/agency/${AGENCY_ID}/provider/list/active`;

  readonly addButton: Locator;

  constructor(page: Page) 
  {
    this.page = page;

    this.addButton = page
        .locator('.tooltip-label.ag-right-icon[aria-label="Add"]');
  }

  async gotoActiveProviders() 
  {
    await this.page.goto(this.activeProvidersPath);
  }

  async clickAdd() 
  {
    await this.addButton.click();
  }
}
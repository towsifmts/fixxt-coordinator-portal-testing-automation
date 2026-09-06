import 
{ 
  Page, 
  Locator,
  expect 
} from '@playwright/test';

import 
{ 
    AGENCY_ID 
} from '../../test-data/provider';

export class ProviderDetailPage
{
    readonly page: Page;

    readonly providerDetailsPath = 
        `/agency/${AGENCY_ID}/provider/details`;
        
    readonly providerDetailsUrlPattern = 
        new RegExp( `${this.providerDetailsPath}/[^/]+$`);

    readonly pageTitle: Locator;
    readonly abnValue: Locator;
    readonly entityNameValue: Locator;
    readonly firstNameValue: Locator;
    readonly lastNameValue: Locator;
    readonly emailValue: Locator;
    readonly mobileValue: Locator;
    readonly supportTypeValue: Locator;
    readonly serviceTypesValue: Locator;
    readonly specialisationsValue: Locator;

    constructor(page: Page) {
        this.page = page;

        this.pageTitle = page
            .getByRole('heading', {
                name: 'Provider Details',
            });

        this.abnValue = this.getDetailValue('ABN');
        this.entityNameValue = this.getDetailValue('Entity Name');
        this.firstNameValue = this.getDetailValue('First Name');
        this.lastNameValue = this.getDetailValue('Last Name');
        this.emailValue = this.getDetailValue('Email');
        this.mobileValue = this.getDetailValue('Mobile');
        this.supportTypeValue = this.getDetailValue('Support Type');
        this.serviceTypesValue = this.getDetailValue('Service Types');
        this.specialisationsValue = this.getDetailValue('Specialisations');
    }

    private getDetailValue(label: string): Locator {
        return this.page
            .locator('.details-field')
            .filter({
                has: this.page.locator('.details-field-label', {
                    hasText: label,
                }),
            })
            .locator('.details-field-value');
    }
} 
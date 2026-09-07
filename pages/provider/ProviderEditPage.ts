import { 
    Page, 
    Locator 
} from '@playwright/test';

import { AGENCY_ID } from '../../test-data/provider';

export class ProviderEditPage {
  readonly page: Page;

  readonly providerEditPath =
    `/agency/${AGENCY_ID}/provider/edit`;

  readonly providerEditUrlPattern = new RegExp(
    `${this.providerEditPath}/[A-Z0-9]+$` //TODO: Need to confirm
  );

  readonly pageTitle: Locator;
  readonly providerDetailsSection: Locator;
  readonly primaryContactSection: Locator;
  readonly supportDetailsSection: Locator;

  readonly abnInput: Locator;
  readonly abnSearchButton: Locator;
  readonly entityNameInput: Locator;
  readonly nameInput: Locator;
  readonly knownAsInput: Locator;
  readonly branchInput: Locator;
  readonly statusInput: Locator;
  readonly addressInput: Locator;
  readonly suburbInput: Locator;
  readonly stateInput: Locator;
  readonly postcodeInput: Locator;
  readonly additionalInformationInput: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly mobileInput: Locator;
  readonly phoneInput: Locator;

  readonly supportTypeInput: Locator;
  readonly serviceTypesInput: Locator;
  readonly specialisationsInput: Locator;

  // Save
  readonly saveButton: Locator;

  // Messages
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Page sections
    this.pageTitle = page.getByRole('heading', {
      name: 'Edit Provider'
    });

    this.providerDetailsSection = page.getByRole(
      'heading',
      {
        name: 'Provider Details'
      }
    );

    this.primaryContactSection = page.getByRole(
      'heading',
      {
        name: 'Primary Contact',
      }
    );

    this.supportDetailsSection = page.getByRole(
      'heading',
      {
        name: 'Support Details',
      }
    );

    // Provider Details
    this.abnInput = page.getByRole('textbox', {
      name: 'ABN',
      exact: true,
    });

    this.abnSearchButton = page.locator(
      '.abn-search-icon-button'
    );

    this.entityNameInput =
      page.getByLabel('Entity Name');

    this.nameInput =
      page.getByLabel('Name');

    this.knownAsInput =
      page.getByLabel('Known As');

    this.branchInput =
      page.getByLabel('Branch');

    this.statusInput = page.getByRole('combobox', {
      name: 'Status',
      exact: true,
    });

    this.addressInput =
      page.getByLabel('Address');

    this.suburbInput = page.getByRole('combobox', {
      name: 'Suburb',
    });

    this.stateInput =
      page.getByLabel('State');

    this.postcodeInput =
      page.getByLabel('Postcode');

    this.additionalInformationInput =
      page.getByLabel('Additional Information');

    // Primary Contact
    this.firstNameInput =
      page.getByLabel('First Name');

    this.lastNameInput =
      page.getByLabel('Last Name');

    this.emailInput =
      page.getByLabel('Email');

    this.mobileInput = page.getByRole('textbox', {
      name: 'Mobile',
      exact: true,
    });

    this.phoneInput = page.getByRole('textbox', {
      name: 'Phone',
      exact: true,
    });

    // Support Details
    this.supportTypeInput = page.getByRole(
      'combobox',
      {
        name: 'Support Type',
        exact: true,
      }
    );

    this.serviceTypesInput = page.getByRole(
      'combobox',
      {
        name: 'Service Types',
        exact: true,
      }
    );

    this.specialisationsInput = page.getByRole(
      'combobox',
      {
        name: 'Specialisations',
        exact: true,
      }
    );

    // Save
    this.saveButton = page.getByRole('button', {
      name: 'Save',
    });

    // Success message
    this.successMessage = page
      .getByRole('alert')
      .filter({
          hasText: 'The provider has been updated successfully',
      });
  }

  async goto(providerId: string) {
    await this.page.goto(
      `${this.providerEditPath}/${providerId}`
    );
  }

  async fillAbn(abn: string) {
    await this.abnInput.fill(abn);
  }

  async clickAbnSearch() {
    await this.abnSearchButton.click();
  }

  async fillAbnAndSearch(abn: string) {
    await this.fillAbn(abn);
    await this.clickAbnSearch();
  }

  async openStatusDropdown() {
    await this.statusInput.click();
  }

  async selectStatus(status: string) {
    await this.openStatusDropdown();

    await this.page
      .getByRole('option', {
        name: status,
        exact: true,
      })
      .click();
  }

  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillMobile(mobile: string) {
    await this.mobileInput.fill(mobile);
  }

  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async openSupportTypeDropdown() {
    await this.supportTypeInput.click();
  }

  async selectSupportType(supportType: string) {
    await this.openSupportTypeDropdown();

    await this.page
      .getByRole('option', {
        name: supportType,
        exact: true,
      })
      .click();
  }

  async openServiceTypesDropdown() {
    await this.serviceTypesInput.click();
  }

  getServiceTypeOptions() {
    return this.page.locator(
      '[role="option"][data-value]'
    );
  }

  async selectServiceType(serviceType: string) {
    await this.openServiceTypesDropdown();

    await this.page
      .getByRole('option', {
        name: serviceType,
        exact: true,
      })
      .click();
  }

  async selectServiceTypes(serviceTypes: string[]) {
    await this.openServiceTypesDropdown();

    for (const serviceType of serviceTypes) {
      await this.page
        .getByRole('option', {
          name: serviceType,
          exact: true,
        })
        .click();
    }
  }

  async openSpecialisationsDropdown() {
    await this.specialisationsInput.click();
  }

  async selectSpecialisation(
    specialisation: string
  ) {
    await this.openSpecialisationsDropdown();

    await this.page
      .getByRole('option', {
        name: specialisation,
        exact: true,
      })
      .click();
  }

  async selectSpecialisations(
    specialisations: string[]
  ) {
    await this.openSpecialisationsDropdown();

    for (const specialisation of specialisations) {
      await this.page
        .getByRole('option', {
          name: specialisation,
          exact: true,
        })
        .click();
    }
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
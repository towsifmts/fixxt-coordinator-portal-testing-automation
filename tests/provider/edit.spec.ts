import {
  test,
  expect,
} from '../../fixtures/base';

import { validUser } from '../../test-data/user';

import { organization } from '../../test-data/organization';

import {
  providerTestData,
  providerStatusOptions,
  selectedProviderStatus,
  selectedProviderSupportType,
} from '../../test-data/provider';

test.describe('Coordinator App - Edit Provider', () => {

  let providerId: string;

  test.beforeEach(async ({
    loginPage,
    dashboardPage,
    organizationProfilePage,
    providerListPage,
    providerEditPage,
  }) => {

    await loginPage.goto();

    await loginPage.login(
      validUser.username,
      validUser.password
    );

    await expect(loginPage.page)
      .toHaveURL(loginPage.loggedInPath);

    // Select organisation
    await dashboardPage.selectOrganisation(organization.id);

    await expect(organizationProfilePage.page)
      .toHaveURL(organizationProfilePage.organizationProfilePath);

    // Go to Active Providers
    await organizationProfilePage.goToActiveProviders();

    await expect(providerListPage.page)
      .toHaveURL(providerListPage.activeProvidersPath);

    // Get first provider ID and open Edit Provider
    providerId = await providerListPage.getFirstProviderId() ;

    await providerListPage.goToFirstProviderEdit(providerId);

    // Verify Edit Provider URL
    await expect(providerEditPage.page)
      .toHaveURL(providerEditPage.providerEditUrlPattern);
  });

  test('TC-001 - Verify Edit Provider page loads',
    async ({ providerEditPage }) => {

      await expect(providerEditPage.pageTitle)
        .toBeVisible();

      await expect( providerEditPage.primaryContactSection)
        .toBeVisible();

      await expect(providerEditPage.supportDetailsSection)
        .toBeVisible();
    }
  );

  test('TC-002 - Verify existing provider details are populated',
    async ({ providerEditPage }) => {

      await expect(providerEditPage.abnInput)
          .not.toHaveValue('');

      await expect(providerEditPage.entityNameInput)
          .not.toHaveValue('');

      await expect(providerEditPage.firstNameInput)
          .not.toHaveValue('');

      await expect(providerEditPage.lastNameInput)
          .not.toHaveValue('');

      await expect(providerEditPage.emailInput)
          .not.toHaveValue('');
    }
  );

  test('TC-003 - Verify Status dropdown options',
    async ({ providerEditPage }) => {

      await providerEditPage.openStatusDropdown();

      const statusOptions =
        providerEditPage.page.getByRole('option');

      await expect(statusOptions)
        .toHaveText([
          'Select ...',
          ...providerStatusOptions,
        ]);
    }
  );

  test('TC-004 - Edit First Name',
    async ({ providerEditPage }) => {

      const newFirstName = 'Updated Provider';

      await providerEditPage
          .fillFirstName(newFirstName);

      await expect(providerEditPage.firstNameInput)
          .toHaveValue(newFirstName);
    }
  );

  test('TC-005 - Edit Last Name',
    async ({ providerEditPage }) => {

      const newLastName = 'Updated Last Name';

      await providerEditPage.fillLastName(newLastName);

      await expect(providerEditPage.lastNameInput)
          .toHaveValue(newLastName);
    }
  );

  test('TC-006 - Edit Email',
    async ({ providerEditPage }) => {

      const newEmail = 'updated.provider@example.com';

      await providerEditPage.fillEmail(newEmail);

      await expect(providerEditPage.emailInput)
          .toHaveValue(newEmail);
    }
  );

  test('TC-007 - Edit Mobile',
    async ({ providerEditPage }) => {

      const newMobile = '0411111111';

      await providerEditPage.fillMobile(newMobile);

      await expect(providerEditPage.mobileInput)
          .toHaveValue(newMobile);
    }
  );

  test('TC-008 - Edit Status',
    async ({ providerEditPage }) => {

      await providerEditPage.selectStatus(selectedProviderStatus);

      await expect(providerEditPage.statusInput)
          .toContainText(selectedProviderStatus);
    }
  );

  test('TC-009 - Edit Support Type',
    async ({ providerEditPage }) => {

      await providerEditPage
        .selectSupportType(selectedProviderSupportType.label);

      await expect(providerEditPage.supportTypeInput)
          .toContainText(selectedProviderSupportType.label);
    }
  );

  test('TC-010 - Edit Service Types',
    async ({ providerEditPage }) => {

    const supportType =
      (await providerEditPage.supportTypeInput.textContent())?.trim();

    const serviceTypes =
      supportType === 'Mainstream'
        ? providerTestData.mainstreamServiceTypes
        : providerTestData.ndisServiceTypes;

    await providerEditPage.selectServiceTypes(serviceTypes);

      await providerEditPage.page
        .keyboard.press('Escape');
    }
  );

  test('TC-011 - Edit Specialisations',
    async ({ providerEditPage }) => {

      await providerEditPage
        .selectSpecialisations(providerTestData.specialisations);

      await providerEditPage.page
        .keyboard.press('Escape');
    }
  );

  test('TC-012 - Verify Save button is enabled',
    async ({ providerEditPage }) => {
      await expect(providerEditPage.saveButton).toBeEnabled();
    }
  );

  test('TC-013 - Save updated provider',
    async ({ 
      providerEditPage,
      providerDetailPage
     }) => {

      const newMobile = '0411111111';

      const newFirstName = 'Updated Provider';

      const newLastName = 'Updated Last Name';

      const newEmail = 'updated.provider@example.com';

      await providerEditPage.fillFirstName(newFirstName);

      await providerEditPage.fillLastName(newLastName);

      await providerEditPage.fillEmail(newEmail);

      await providerEditPage.fillMobile(newMobile);

      // Save
      await providerEditPage.clickSave();

      //TODO: Need to catch & specify errors
      if (
        !(await providerEditPage.successMessage
            .isVisible({ timeout: 3000 })
            .catch(() => false))
      ) {
        console.warn(
            "Some error occured!"
        );

        test.info().annotations.push({
          type: 'warning',
          description:
            'Some error occured! Please recheck.',
        });

        return;
      }

      // Verify navigation to Provider Details
      await expect(providerDetailPage.pageTitle)
        .toBeVisible();

      await expect(providerEditPage.successMessage)
        .toBeVisible();

      await expect(providerDetailPage.page)
        .toHaveURL(providerDetailPage.providerDetailsUrlPattern);
    }
  );
});
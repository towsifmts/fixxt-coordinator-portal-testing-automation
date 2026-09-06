import 
{ 
    test, 
    expect 
} from '../../fixtures/base';

import 
{ 
    validUser 
} from '../../test-data/user';

import 
{ 
    organization 
} from '../../test-data/organization';

import 
{ 
    providerTestData,
    providerStatusOptions,
    selectedProviderStatus,
    selectedProviderSupportType,
    mainstreamServiceTypesOptions,
    ndisServiceTypesOptions,
    abnVerify
} from '../../test-data/provider';

test.describe('Coordinator App - Create Provider', () => 
{
  test.beforeEach(
    async ({
        loginPage,
        dashboardPage,
        organizationProfilePage,
        providerListPage,
        providerCreatePage,
      }) => 
    {
      await loginPage.goto();

      await loginPage.login(
        validUser.username, 
        validUser.password
      );

      await expect(loginPage.page)
        .toHaveURL(loginPage.loggedInPath);

      await dashboardPage
        .selectOrganisation(organization.id);

      await expect(organizationProfilePage.page)
        .toHaveURL(organizationProfilePage.organizationProfilePath);

      await organizationProfilePage
        .goToActiveProviders();

      await expect(providerListPage.page)
        .toHaveURL(providerListPage.activeProvidersPath);

      await providerListPage.clickAdd();

      await expect(providerCreatePage.page)
        .toHaveURL(providerCreatePage.providerCreatePath);
    }
  );

  test('TC-001 - Verify Create Provider page loads',
    async ({ providerCreatePage }) => 
    {
      await expect( providerCreatePage.pageTitle)
        .toBeVisible();

      await expect(providerCreatePage.providerDetailsSection)
        .toBeVisible();

      await expect(providerCreatePage.primaryContactSection)
        .toBeVisible();

      await expect(providerCreatePage.supportDetailsSection)
        .toBeVisible();
    }
  );

  test('TC-002 - Verify verified ABN populates Entity Name and Name',
    async ({ providerCreatePage }) => 
    {
      const digitsOnly = /^\d+$/;

      const abn = providerTestData.verifiedAbn;

      const normalizedAbn = abn.replace(/\s/g, '');
      
      if (
        !normalizedAbn ||
        !digitsOnly.test(normalizedAbn) ||
        normalizedAbn.length !== 11
      ) {
        const message = `ABN is not valid: "${abn}"`;

        console.warn(`${message}`);

        test.info().annotations.push({
          type: 'warning',
          description: message,
        });

        return;
      }
        
      await providerCreatePage
        .verifyAbn(providerTestData.verifiedAbn);

      await expect(providerCreatePage.entityNameInput)
        .not.toHaveValue('');
    }
  );

  test('TC-003 - Verify Status dropdown options', 
    async ({providerCreatePage}) =>
    {
      await providerCreatePage
        .verifyAbn(providerTestData.verifiedAbn);

      await expect(providerCreatePage.entityNameInput)
        .not.toHaveValue('');

      await providerCreatePage
        .openStatusDropdown();

      const statusOptions = providerCreatePage
        .page.getByRole('option');

      await expect(statusOptions)
        .toHaveText([ 
          'Select ...', 
          ...providerStatusOptions 
        ]);
    }
  );
  
  test('TC-004 - Select Service Types as per Support type', 
    async ({ providerCreatePage }) => 
    {
      await providerCreatePage
        .verifyAbn(providerTestData.verifiedAbn);

      // Test: service types for support type "Mainstream"
      await providerCreatePage
        .selectSupportType(providerTestData.mainstreamSupportType);

      await providerCreatePage
        .openServiceTypesDropdown();
      
      await expect(providerCreatePage.getServiceTypeOptions())
        .toHaveText(mainstreamServiceTypesOptions);

      await providerCreatePage
        .page.keyboard.press('Escape');

      // Test: service types for support type "NDIS"
      await providerCreatePage
        .selectSupportType(providerTestData.ndisSupportType);

      await providerCreatePage
        .openServiceTypesDropdown();

      await expect(providerCreatePage.getServiceTypeOptions())
        .toHaveText(ndisServiceTypesOptions);
    }
  );

  test('TC-005 - Verify required fields can be populated after ABN verification',
    async ({ providerCreatePage }) => 
    {
      const digitsOnly = /^\d+$/;

      const abn = providerTestData.verifiedAbn;

      const normalizedAbn = abn.replace(/\s/g, '');
      
      if (
        !normalizedAbn ||
        !digitsOnly.test(normalizedAbn) ||
        normalizedAbn.length !== 11
      ) {
        const message = `ABN is not valid: "${abn}"`;

        console.warn(`${message}`);

        test.info().annotations.push({
          type: 'warning',
          description: message,
        });

        return;
      }
      
      await providerCreatePage
        .verifyAbn(providerTestData.verifiedAbn);

      await expect(providerCreatePage.entityNameInput)
        .not.toHaveValue('');

      await providerCreatePage
        .selectStatus(selectedProviderStatus);

      await providerCreatePage
        .fillFirstName(providerTestData.firstName);

      await providerCreatePage
        .fillLastName(providerTestData.lastName);

      await providerCreatePage
        .fillEmail(providerTestData.email);

      await providerCreatePage
        .fillMobile(providerTestData.mobile);

      await providerCreatePage
        .selectSupportType(selectedProviderSupportType.label);

      await providerCreatePage
        .selectServiceTypes(providerTestData.ndisServiceTypes);

      await providerCreatePage
        .page.keyboard.press('Escape');

      await providerCreatePage
        .selectSpecialisations(providerTestData.specialisations);

      await providerCreatePage
        .page.keyboard.press('Escape');

      await expect(providerCreatePage.statusInput)
        .toContainText(selectedProviderStatus);

      // Verify
      await expect(providerCreatePage.firstNameInput)
        .toHaveValue(providerTestData.firstName);

      await expect(providerCreatePage.lastNameInput)
        .toHaveValue(providerTestData.lastName);

      await expect(providerCreatePage.emailInput)
        .toHaveValue(providerTestData.email);

      await expect(providerCreatePage.mobileInput)
        .toHaveValue(providerTestData.mobile);

      await expect(providerCreatePage.supportTypeInput)
        .toContainText(selectedProviderSupportType.label);
    }
  );

  test(
    'TC-006 - Create provider with valid details',
    async ({ providerCreatePage, providerDetailPage }) => 
    {
      const digitsOnly = /^\d+$/;

      const abn = providerTestData.verifiedAbn;
      
      const normalizedAbn = abn.replace(/\s/g, '');
      
      if (
        !normalizedAbn ||
        !digitsOnly.test(normalizedAbn) ||
        normalizedAbn.length !== 11
      ) {
        const message = `ABN is not valid: "${abn}"`;

        console.warn(`${message}`);

        test.info().annotations.push({
          type: 'warning',
          description: message,
        });

        return;
      }
      
      await providerCreatePage
        .verifyAbn(providerTestData.verifiedAbn);

      await expect(providerCreatePage.entityNameInput)
        .not.toHaveValue('');

      await providerCreatePage
        .selectStatus(selectedProviderStatus);

      await providerCreatePage
        .fillFirstName(providerTestData.firstName);

      await providerCreatePage
        .fillLastName(providerTestData.lastName);

      await providerCreatePage
        .fillEmail(providerTestData.email);

      // Either Mobile or Phone is required.
      await providerCreatePage
        .fillMobile(providerTestData.mobile);

      await providerCreatePage
        .selectSupportType(selectedProviderSupportType.label);

      await providerCreatePage
        .selectServiceTypes(providerTestData.ndisServiceTypes);

      await providerCreatePage
        .page.keyboard.press('Escape');

      await providerCreatePage
        .selectSpecialisations(providerTestData.specialisations);

      await providerCreatePage
        .page.keyboard.press('Escape');

      await expect(providerCreatePage.statusInput)
        .toContainText(selectedProviderStatus);

      await expect(providerCreatePage.firstNameInput)
        .toHaveValue(providerTestData.firstName);

      await expect(providerCreatePage.lastNameInput)
        .toHaveValue(providerTestData.lastName);

      await expect(providerCreatePage.emailInput)
        .toHaveValue(providerTestData.email);

      await expect(providerCreatePage.mobileInput)
        .toHaveValue(providerTestData.mobile);

      await expect(providerCreatePage.supportTypeInput)
        .toContainText(selectedProviderSupportType.label);

      await expect(providerCreatePage.saveButton)
        .toBeEnabled();

      // Save
      await providerCreatePage.clickSave();

      // Check for duplicate provider error
      if (
        await providerCreatePage.providerAlreadyExistsMessage
          .isVisible({ timeout: 3000 })
          .catch(() => false)
      ) {
        console.warn(
           "This provider already exists and cannot be added"
        );

        test.info().annotations.push({
          type: 'warning',
          description:
            'Provider already exists. Remaining steps were skipped.',
        });

        return;
      }

      // Verify navigation to Provider Details
      await expect(providerDetailPage.pageTitle)
        .toBeVisible();

      await expect(providerCreatePage.successMessage)
        .toBeVisible();

      await expect(providerDetailPage.page)
        .toHaveURL(providerDetailPage.providerDetailsUrlPattern);

      // Verify newly created provider details
      await expect(providerDetailPage.abnValue)
        .toContainText(abnVerify.verifiedAbn);

      await expect(providerDetailPage.firstNameValue)
        .toContainText(providerTestData.firstName);

      await expect(providerDetailPage.lastNameValue)
        .toContainText(providerTestData.lastName);

      await expect(providerDetailPage.emailValue)
        .toContainText(providerTestData.email);

      await expect(providerDetailPage.mobileValue)
        .toContainText(providerTestData.mobile);

      await expect(providerDetailPage.supportTypeValue)
        .toContainText(selectedProviderSupportType.label);
    }
  );
});
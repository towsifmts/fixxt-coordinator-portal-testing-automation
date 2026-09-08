import {
  test,
  expect,
} from '../../fixtures/base';

import { validUser } from '../../test-data/user';

import { organization } from '../../test-data/organization';

test.describe('Coordinator App - Archive Provider', () => {
    test.beforeEach(async ({
      loginPage,
      dashboardPage,
      organizationProfilePage,
      providerListPage,
    }) => {

        await loginPage.goto();

        await loginPage.login(
            validUser.username,
            validUser.password
        );

        await expect(loginPage.page)
            .toHaveURL(loginPage.loggedInPath);

        await dashboardPage.selectOrganisation(organization.id);

        await expect(organizationProfilePage.page)
            .toHaveURL(organizationProfilePage.organizationProfilePath);

        await organizationProfilePage.goToActiveProviders();

        await expect(providerListPage.page)
            .toHaveURL(providerListPage.activeProvidersPath);
    });

    test('TC-001 - Verify first provider action menu has archive',
      async ({ providerListPage }) => {

        await providerListPage
          .openFirstProviderActionMenu();

        await expect(
          providerListPage.page.getByRole(
            'menuitem',
            {
              name: 'Archive',
              exact: true,
            }
          )
        ).toBeVisible();
      }
    );

    test('TC-002 - Verify Archive option opens confirmation popup',
      async ({ providerListPage }) => {

        await providerListPage
            .clickFirstProviderArchive();

        await expect(providerListPage.archiveDialog)
            .toBeVisible();

        await expect(providerListPage.archiveDialogTitle)
            .toBeVisible();

        await expect(providerListPage.archiveDialogMessage)
            .toBeVisible();

        await expect(providerListPage.archiveNoButton)
            .toBeVisible();

        await expect(providerListPage.archiveYesButton)
            .toBeVisible();
      }
    );

    test('TC-003 - Verify No button closes Archive popup',
      async ({ providerListPage }) => {

        await providerListPage
            .clickFirstProviderArchive();

        await expect(providerListPage.archiveDialog)
            .toBeVisible();

        await providerListPage.archiveNoButton.click();

        await expect(providerListPage.archiveDialog)
            .not.toBeVisible();

        // User should remain on Active Providers
        await expect(providerListPage.page)
          .toHaveURL(providerListPage.activeProvidersPath);
      }
    );

    test('TC-004 - Archive first provider successfully',
      async ({ providerListPage }) => {

        // Open Archive popup
        await providerListPage
            .clickFirstProviderArchive();

        // Verify popup
        await expect(providerListPage.archiveDialog)
            .toBeVisible();

        await expect(providerListPage.archiveDialogMessage)
            .toHaveText('Are you sure you want to archive this provider?');

        // Confirm Archive
        await providerListPage.confirmArchive();

        // Verify we remain on Active Providers
        await expect(providerListPage.page)
          .toHaveURL(providerListPage.activeProvidersPath);

        // Verify success message
        await expect(providerListPage.archiveSuccessMessage)
            .toBeVisible();
      }
    );
    
  }
);
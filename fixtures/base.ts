import { 
  test as base, 
  expect 
} from '@playwright/test';

import { LoginPage } from '../pages/account/LoginPage';

import { ForgotUsernamePage } from '../pages/account/ForgotUsernamePage';

import { ForgotPasswordPage } from '../pages/account/ForgotPasswordPage';

import { DashboardPage } from '../pages/dashboard/DashboardPage';

import { OrganizationProfilePage } from '../pages/organization/OrganizationProfilePage';

import { ProviderCreatePage } from '../pages/provider/ProviderCreatePage';

import { ProviderEditPage } from '../pages/provider/ProviderEditPage';

import { ProviderDetailPage } from '../pages/provider/ProviderDetailPage';

import { ProviderListPage } from '../pages/provider/ProviderListPage';

type Fixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  organizationProfilePage: OrganizationProfilePage;

  forgotUsernamePage: ForgotUsernamePage;
  forgotPasswordPage: ForgotPasswordPage;

  providerCreatePage: ProviderCreatePage;
  providerEditPage: ProviderEditPage;
  providerDetailPage: ProviderDetailPage;
  providerListPage: ProviderListPage;
};

export const test = base.extend<Fixtures>({
  loginPage: 
    async ({ page }, use) => {
      await use(new LoginPage(page));
    },

  dashboardPage: 
    async ({ page }, use) => {
      await use(new DashboardPage(page));
    },

  organizationProfilePage: 
    async ({ page }, use) => {
        await use(new OrganizationProfilePage(page));
      },

  forgotUsernamePage: 
    async ({ page }, use) => {
      await use(new ForgotUsernamePage(page));
    },

  forgotPasswordPage: 
    async ({ page }, use) => {
      await use(new ForgotPasswordPage(page));
    },

  providerCreatePage: 
    async ({ page }, use) => {
      await use(new ProviderCreatePage(page));
    },

  providerEditPage: 
    async ({ page }, use) => {
      await use(new ProviderEditPage(page));
    },

  providerDetailPage: 
    async ({ page }, use) => {
      await use(new ProviderDetailPage(page));
    },

  providerListPage: 
    async ({ page }, use) => {
      await use(new ProviderListPage(page));
    }
});

export { expect };

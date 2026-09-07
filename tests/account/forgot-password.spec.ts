import { 
  test, 
  expect 
} from '../../fixtures/base';

import { HtmlAttribute } from '../../utils/constants';

import { testUser } from '../../test-data/user';

test.describe('Coordinator App - Forgot Password Page', () => {
  test.beforeEach(async ({ forgotPasswordPage }) => {
      await forgotPasswordPage.goto();
    }
  );

  test('TC-001: Forgot Password page should load successfully', 
    async ({ forgotPasswordPage }) => {
      await expect(forgotPasswordPage.pageTitle)
        .toBeVisible();

      await expect(forgotPasswordPage.pageDescription)
        .toBeVisible();

      await expect(forgotPasswordPage.pageSubDescription)
        .toBeVisible();

      await expect(forgotPasswordPage.usernameInput)
        .toBeVisible();

      await expect(forgotPasswordPage.submitButton)
        .toBeVisible();
    }
  );

  test('TC-002: User Name field should be required', 
    async ({ forgotPasswordPage }) => {
      await expect(forgotPasswordPage.usernameInput)
        .toHaveAttribute(HtmlAttribute.REQUIRED, '');
    }
  );

  test('TC-003: User Name field should accept a valid username', 
    async ({ forgotPasswordPage }) => {
      await forgotPasswordPage
        .fillUsername(testUser.username);

      await expect(forgotPasswordPage.usernameInput)
        .toHaveValue(testUser.username);
    }
  );

  test('TC-004: Submit with empty User Name should not leave Forgot Password page', 
    async ({ page, forgotPasswordPage }) => {
      await forgotPasswordPage
        .clickSubmit();

      await expect(forgotPasswordPage.usernameInput)
        .toHaveAttribute(HtmlAttribute.REQUIRED, '');

      await expect(page)
        .toHaveURL(forgotPasswordPage.forgotPasswordPath);
    }
  );

  test('TC-005: Forgot User Name link should navigate to Forgot Username page', 
    async ({ page, forgotPasswordPage }) => {
      await expect(forgotPasswordPage.forgotUsernameLink)
        .toHaveAttribute(
          HtmlAttribute.HREF,
          forgotPasswordPage.forgotUsernamePath
        );

      await forgotPasswordPage
        .goToForgotUsername();

      await expect(page)
        .toHaveURL(forgotPasswordPage.forgotUsernamePath);
    }
  );

  test('TC-006: Back to Login link should navigate to Login page', 
    async ({ page, forgotPasswordPage }) => {
      await expect(forgotPasswordPage.backToLoginLink)
        .toHaveAttribute(
          HtmlAttribute.HREF,
          forgotPasswordPage.signInPath
        );

      await forgotPasswordPage
        .goBackToLogin();

      await expect(page)
        .toHaveURL(forgotPasswordPage.signInPath);
    }
  );

  test('TC-007: Privacy Policy link should contain the correct URL', 
    async ({ forgotPasswordPage }) => {
      await expect(forgotPasswordPage.privacyPolicyLink)
        .toHaveAttribute(
          HtmlAttribute.HREF,
          forgotPasswordPage.privacyPolicyExternalLink
        );
    }
  );
});
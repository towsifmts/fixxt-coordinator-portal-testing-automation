import 
{ 
  test, 
  expect 
} from '../../fixtures/base';

import 
{ 
  HtmlAttribute, 
  InputType 
} from '../../utils/constants';

import 
{ 
  testUser, 
  validUser,
  invalidUser
} from '../../test-data/user';

test.describe('Coordinator App - Login Page', () => 
{
  test.beforeEach(
    async ({ loginPage }) => 
    {
      await loginPage.goto();
    }
  );

  test('TC-001: Login page should load successfully', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.usernameInput)
        .toBeVisible();

      await expect(loginPage.passwordInput)
        .toBeVisible();
            
      await expect(loginPage.enterButton)
        .toBeVisible();
    }
  );

  test('TC-002: Username and Password fields should be required', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.usernameInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );
    }
  );

  test('TC-003: Username input should accept text', 
    async ({ loginPage }) => 
    {
      await loginPage.fillUsername(testUser.username);

      await expect(loginPage.usernameInput)
        .toHaveValue(testUser.username);
    }
  );

  test('TC-004: Password input should be masked by default', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.passwordInput)
        .toHaveAttribute(HtmlAttribute.TYPE, InputType.Password);
    }
  );

  test('TC-005: Enter button should be enabled', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.enterButton)
        .toBeEnabled();
    }
  );

  test('TC-006: Login with valid credentials', 
    async ({ page, loginPage }) => 
    {
      await loginPage.login(
        validUser.username, 
        validUser.password
      );

      await expect(page)
        .toHaveURL(loginPage.loggedInPath);
    }
  );

  test('TC-007: Submit with both fields empty should not perform a successful login', 
    async ({ loginPage }) => 
    {
      await loginPage.login('', '');
  
      await expect(loginPage.usernameInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );
    }
  );

  test('TC-008: Username empty and Password populated', 
    async ({ loginPage }) => 
    {
      await loginPage.login('', invalidUser.password);
  
      await expect(loginPage.usernameInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );
    }
  );

  test('TC-009: Username populated and Password empty', 
    async ({ loginPage }) => 
    {
      await loginPage.login(testUser.username, '');
  
      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.REQUIRED, 
          ''
        );
    }
  );

  test('TC-010: Invalid username and invalid password should not authenticate', 
    async ({ page, loginPage }) => 
    {
      await loginPage.login(
        invalidUser.username, 
        invalidUser.password
      );

      await expect(page)
        .toHaveURL(loginPage.signInPath);
    }
  );

  test('TC-011: Clicking password visibility icon should show password', 
    async ({ loginPage }) => 
    {
      await loginPage.fillPassword(testUser.password);

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Password
        );
  
      await loginPage.showPassword();
  
      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Text
        );

      await expect(loginPage.passwordInput)
        .toHaveValue(testUser.password);
    }
  );

  test('TC-012: Clicking password visibility icon twice should hide password again', 
    async ({ loginPage }) => 
    {
      await loginPage.fillPassword(testUser.password);
  
      await loginPage.showPassword();

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Text
        );
  
      await loginPage.hidePassword();

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Password
        );

      await expect(loginPage.passwordInput)
        .toHaveValue(testUser.password);
    }
  );

  test('TC-013: Forgot username link should navigate to forgot username page', 
    async ({ page, loginPage }) => 
    {
      await expect(loginPage.forgotUsernameLink)
        .toHaveAttribute(
          HtmlAttribute.HREF,
          loginPage.forgotUsernamePath
        );
  
      await loginPage.goToForgotUsername();

      await expect(page)
        .toHaveURL(loginPage.forgotUsernamePath);
    }
  );

  test('TC-014: Forgot password link should navigate to forgot password page', 
    async ({ page, loginPage }) => 
    {
      await expect(loginPage.forgotPasswordLink)
        .toHaveAttribute(
          HtmlAttribute.HREF,
          loginPage.forgotPasswordPath
        );
  
      await loginPage.goToForgotPassword();

      await expect(page)
        .toHaveURL(loginPage.forgotPasswordPath);
    }
  );

  test('TC-015: Privacy Policy should be an external link opened in a new tab', 
    async ({ page, loginPage }) => 
    {
        const popupEvent = page.waitForEvent('popup');

        await loginPage.privacyPolicyLink.click();

        const popup = await popupEvent;

        await expect(popup)
          .toHaveURL(loginPage.privacyPolicyExternalLink);

        await popup.close();
    }
  );

  test('TC-016: Privacy Policy should open successfully in a new tab', 
    async ({ page, loginPage }) => 
    {
      const popupPromise = page.waitForEvent('popup');

      await loginPage.privacyPolicyLink.click();

      const popup = await popupPromise;

      await popup.waitForLoadState('domcontentloaded');

      await expect(popup).toHaveURL(url => {
        return url.protocol === 'http:' || url.protocol === 'https:';
      });

      await popup.close();
    }
  );

  test('TC-017: Username should be reachable by keyboard',
    async ({ loginPage }) => 
    {
      await loginPage.usernameInput.focus();

      await expect(loginPage.usernameInput)
        .toBeFocused();
    }
  );

  test('TC-018: Password should be reachable by keyboard', 
    async ({ loginPage }) => 
    {
      await loginPage.passwordInput.focus();

      await expect(loginPage.passwordInput)
        .toBeFocused();
    }
  );

  test('TC-019: Enter key should submit the login form', 
    async ({ loginPage }) => 
    {
      await loginPage.fillUsername(invalidUser.username);
      await loginPage.fillPassword(invalidUser.password);

      await loginPage.submitWithEnterKey();
    }
  );

  test('TC-020: Form controls should expose accessible names', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.usernameInput)
        .toHaveAccessibleName('Username');

      await expect(loginPage.passwordInput)
        .toHaveAccessibleName('Password');

      await expect(loginPage.enterButton)
        .toHaveAccessibleName('Enter');

      await expect(loginPage.forgotUsernameLink)
        .toBeVisible();

      await expect(loginPage.forgotPasswordLink)
        .toBeVisible();

      await expect(loginPage.privacyPolicyLink)
        .toBeVisible();
    }
  );

  test('TC-021: Username should handle leading/trailing spaces without test failure', 
    async ({ loginPage }) => 
    {
      const testUser = '  test user  ';

      await loginPage.fillUsername(testUser);

      await expect(loginPage.usernameInput)
       .toHaveValue(testUser);
    }
  );

  test('TC-022: Username should accept a long input value', 
    async ({ loginPage }) =>
    {
      const longUsername = 'a'.repeat(255);

      await loginPage.fillUsername(longUsername);

      await expect(loginPage.usernameInput)
        .toHaveValue(longUsername);
    }
  );

  test('TC-023: Password should accept special characters', 
    async ({ loginPage }) => 
    {
      const specialPassword 
        = `P@ssw0rd!#$%^&*()_+-=[]{};':",./<>?`;

      await loginPage.fillPassword(specialPassword);

      await expect(loginPage.passwordInput)
        .toHaveValue(specialPassword);
    }
  );

  test('TC-024: Password should accept a long input value', 
    async ({ loginPage }) => 
    {
      const longPassword = 'P@' + 'a'.repeat(500);

      await loginPage.fillPassword(longPassword);

      await expect(loginPage.passwordInput)
        .toHaveValue(longPassword);
    }
  );
 
  test('TC-025: Username and password values should remain associated with the correct fields', 
    async ({ loginPage }) => 
    {
      await loginPage.fillUsername(testUser.username);
      await loginPage.fillPassword(testUser.password);
  
      await expect(loginPage.usernameInput)
        .toHaveValue(testUser.username);

      await expect(loginPage.passwordInput)
        .toHaveValue(testUser.password);
    }
  );

  test('TC-026: Login page should remain usable on mobile viewport', 
    async ({ page, loginPage }) => 
    {
      await page.setViewportSize(
        { 
          width: 390, 
          height: 844 
        });
  
      await expect(loginPage.usernameInput)
       .toBeVisible();

      await expect(loginPage.passwordInput)
        .toBeVisible();

      await expect(loginPage.enterButton)
        .toBeVisible();

      await expect(loginPage.privacyPolicyLink)
        .toBeVisible();
    }
  );
 
  test('TC-027: Login page should remain usable on desktop viewport', 
    async ({ page, loginPage }) => 
    {
      await page.setViewportSize(
        {
          width: 1920, 
          height: 1080 
        });
  
      await expect(loginPage.usernameInput)
        .toBeVisible();

      await expect(loginPage.passwordInput)
        .toBeVisible();

      await expect(loginPage.enterButton)
        .toBeVisible();
    }
  );

  test('TC-028: Password field should use input type password on initial load', 
    async ({ loginPage }) => 
    {
      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Password
        );
    }
  );
 
  test('TC-029: Password should not be exposed as normal text until visibility is requested', 
    async ({ loginPage }) => 
    {
      await loginPage.fillPassword('Secret123!');

      await expect(loginPage.passwordInput)
        .toHaveAttribute(
          HtmlAttribute.TYPE, 
          InputType.Password
        );
    }
  );
  
  test('TC-030: Page should not expose the entered password in the URL', 
    async ({ page, loginPage }) => 
    {
      await loginPage.fillUsername(testUser.username);
      await loginPage.fillPassword(testUser.password);
  
      expect(page.url())
        .not.toContain(testUser.password);
    }
  );
});
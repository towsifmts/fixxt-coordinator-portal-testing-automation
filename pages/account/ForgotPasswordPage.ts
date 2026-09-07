import { 
  Page, 
  Locator 
} from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;

  readonly signInPath = '/account/sign-in';
  readonly forgotUsernamePath = '/account/forgot-username';
  readonly forgotPasswordPath = '/account/forgot-password';

  readonly privacyPolicyExternalLink =
    'https://credsys.com.au/privacy-policy';

  readonly pageTitle: Locator;
  readonly pageDescription: Locator;
  readonly pageSubDescription: Locator;

  readonly usernameInput: Locator;
  readonly submitButton: Locator;

  readonly forgotUsernameLink: Locator;
  readonly backToLoginLink: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page
      .getByText('Reset Password');

    this.pageDescription = page
      .getByText('Please enter your User Name');

    this.pageSubDescription = page
      .getByText('This can NOT be an email address');

    this.usernameInput = page.getByLabel('User Name');

    this.submitButton = page
      .getByRole('button', { 
        name: 'Submit' 
      });

    this.forgotUsernameLink = page
      .getByRole('link', {
        name: 'Forgot User Name?'
      });

    this.backToLoginLink = page
      .getByRole('link', {
        name: 'Back to Login'
      });

    this.privacyPolicyLink = page
      .getByRole('link', {
        name: 'Privacy Policy'
      });
  }

  async goto() {
    await this.page.goto(this.forgotPasswordPath);
  }

  async fillUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async submitUsername(username: string) {
    await this.fillUsername(username);
    await this.clickSubmit();
  }

  async goToForgotUsername() {
    await this.forgotUsernameLink.click();
  }

  async goBackToLogin() {
    await this.backToLoginLink.click();
  }
}
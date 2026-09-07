import 
{ 
  Page, 
  Locator
} from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly signInPath = '/account/sign-in';
  readonly loggedInPath = '/dashboard';
  readonly forgotUsernamePath = '/account/forgot-username';
  readonly forgotPasswordPath = '/account/forgot-password';

  readonly privacyPolicyExternalLink = 
    'https://credsys.com.au/privacy-policy/';

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;

  readonly enterButton: Locator;
  readonly visibilityShowButton: Locator;
  readonly visibilityHideButton: Locator;

  readonly forgotUsernameLink: Locator;
  readonly forgotPasswordLink: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    
    this.enterButton = page.getByRole('button', { name: 'Enter' });

    this.forgotUsernameLink = page.getByRole('link', { name: 'Forgot username?' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.privacyPolicyLink = page.getByRole('link', { name: 'Privacy Policy' });

    this.visibilityShowButton = page.locator('button:has([data-testid="VisibilityIcon"])');
    this.visibilityHideButton = page.locator('button:has([data-testid="VisibilityOffIcon"])');
  }

  async goto() {
    await this.page.goto(this.signInPath);
  }

  async fillUsername(value: string) {
    await this.usernameInput.fill(value);
  }

  async fillPassword(value: string) {
    await this.passwordInput.fill(value);
  }

  async clickEnter() {
    await this.enterButton.click();
  }
  
  async login(username: string, password: string) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    
    await this.clickEnter();
  }
  
  async submitWithEnterKey() {
    await this.passwordInput.press('Enter');
  }

  async showPassword() {
    await this.visibilityShowButton.click();
  }

  async hidePassword() {
    await this.visibilityHideButton.click();
  }

  async goToForgotUsername() {
    await this.forgotUsernameLink.click();
  }

  async goToForgotPassword() {
    await this.forgotPasswordLink.click();
  }
}
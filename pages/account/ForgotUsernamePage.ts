import 
{ 
  Page, 
  Locator 
} from '@playwright/test';

export class ForgotUsernamePage 
{
  readonly page: Page;

  readonly signInPath = '/account/sign-in';
  readonly forgotUsernamePath = '/account/forgot-username';
  readonly forgotPasswordPath = '/account/forgot-password';
  
  readonly privacyPolicyExternalLink = 
    'https://credsys.com.au/privacy-policy/';

  readonly pageTitle: Locator;
  readonly pageDescription: Locator;

  readonly emailInput: Locator;
  readonly submitButton: Locator;

  readonly forgotPasswordLink: Locator;
  readonly backToLoginLink: Locator;
  readonly privacyPolicyLink: Locator;

  constructor(page: Page) 
  {
    this.page = page;

    this.pageTitle = page
      .getByText('Forgot User Name');

    this.pageDescription = page
      .getByText('Please enter your email');

    this.emailInput = page
      .getByLabel('Email');

    this.submitButton = page
      .getByRole('button', 
        { 
          name: 'Submit' 
        });

    this.forgotPasswordLink = page
      .getByRole('link', 
        {
          name: 'Forgot password?'
        });

    this.backToLoginLink = page
      .getByRole('link', 
        {
          name: 'Back to Login'
        });

    this.privacyPolicyLink = page
      .getByRole('link', 
        {
          name: 'Privacy Policy'
        });
  }

  async goto() 
  {
    await this.page.goto(this.forgotUsernamePath);
  }

  async fillEmail(email: string) 
  {
    await this.emailInput.fill(email);
  }

  async clickSubmit() 
  {
    await this.submitButton.click();
  }

  async submitEmail(email: string) 
  {
    await this.fillEmail(email);
    await this.clickSubmit();
  }

  async goToForgotPassword() 
  {
    await this.forgotPasswordLink.click();
  }

  async goBackToLogin()
  {
    await this.backToLoginLink.click();
  }
}
import { 
    test, 
    expect 
} from '../../fixtures/base';

import { HtmlAttribute } from '../../utils/constants';

import { emailAddress } from '../../test-data/user';

test.describe('Coordinator App - Forgot Username Page', () => {
    test.beforeEach(
        async ({ forgotUsernamePage }) => {
            await forgotUsernamePage.goto();
        });

    test('TC-001: Forgot Username page should load successfully', 
        async ({ forgotUsernamePage }) => {
            await expect(forgotUsernamePage.pageTitle)
                .toBeVisible();

            await expect(forgotUsernamePage.pageDescription)
                .toBeVisible();

            await expect(forgotUsernamePage.emailInput)
                .toBeVisible();

            await expect(forgotUsernamePage.submitButton)
                .toBeVisible();
        }
    );

    test('TC-002: Email field should be required', 
        async ({ forgotUsernamePage }) => {
            await expect(forgotUsernamePage.emailInput)
                .toHaveAttribute(HtmlAttribute.REQUIRED, '');
        }
    );

    test('TC-003: Email field should accept a valid email address', 
        async ({ forgotUsernamePage }) => {
            const email = emailAddress.testEmail;

            await forgotUsernamePage.fillEmail(email);

            await expect(forgotUsernamePage.emailInput)
                .toHaveValue(email);
        }
    );

    test('TC-004: Submit with empty email should not leave Forgot Username page', 
        async ({ 
            page, 
            forgotUsernamePage 
        }) => {
            await forgotUsernamePage.clickSubmit();

            await expect(forgotUsernamePage.emailInput)
                .toHaveAttribute(HtmlAttribute.REQUIRED, '');

            await expect(page)
                .toHaveURL(forgotUsernamePage.forgotUsernamePath);
        }
    );

    test('TC-005: Forgot password link should navigate to Forgot Password page', 
        async ({ 
            page, 
            forgotUsernamePage 
        }) => {
            await expect(forgotUsernamePage.forgotPasswordLink)
                .toHaveAttribute(
                    HtmlAttribute.HREF,
                    forgotUsernamePage.forgotPasswordPath
                );

            await forgotUsernamePage.goToForgotPassword();

            await expect(page)
                .toHaveURL(forgotUsernamePage.forgotPasswordPath);
        }
    );

    test('TC-006: Back to Login link should navigate to Login page', 
        async ({ 
            page, 
            forgotUsernamePage 
        }) => {
            await expect(forgotUsernamePage.backToLoginLink)
                .toHaveAttribute(
                    HtmlAttribute.HREF,
                    forgotUsernamePage.signInPath
                );

            await forgotUsernamePage.goBackToLogin();

            await expect(page)
                .toHaveURL(forgotUsernamePage.signInPath);
        }
    );

    test('TC-007: Privacy Policy should open in a new tab', 
        async ({ 
            page, 
            forgotUsernamePage 
        }) => {
            const popupEvent = page.waitForEvent('popup');

            await forgotUsernamePage.privacyPolicyLink.click();

            const popup = await popupEvent;

            await expect(popup)
                .toHaveURL(forgotUsernamePage.privacyPolicyExternalLink);

            await popup.close();
        }
    );
});
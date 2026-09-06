import 
{ 
  defineConfig, 
  devices 
} from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 180 * 1000,
  fullyParallel: true,
  workers: 1, 
  reporter: 'html',

  expect: {
    timeout: 5000
  },
  
  use: {
    baseURL: 'http://localhost:3003',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 2000
    }
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'] 
      },
    }
  ]
});

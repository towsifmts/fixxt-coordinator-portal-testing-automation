import dotenv from 'dotenv';

dotenv.config();

export const testUser = {
  username: 'test-user',
  password: 'P@ssw0rd'
};

export const validUser = {
  username: process.env.LOGIN_USERNAME || '',
  password: process.env.LOGIN_PASSWORD || ''
};

export const invalidUser = {
  username: 'invalid-user',
  password: 'InvalidPassword123!'
};

export const emailAddress = {
  validEmail: 'towsif@faqi.com.au',
  invalidEmail: 'invalidemail@abc.com',
  testEmail: 'test.user@example.com'
};
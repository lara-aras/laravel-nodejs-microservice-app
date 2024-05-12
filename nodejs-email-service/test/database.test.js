const database = require('../src/database/database');

describe('database.js tests', () => {
  it('should store email send success', () => {
    database.storeEmailSendSuccess('test@test.com', 'Test', '<h1>Test</h1>');
    // Add assertions to check if the email was stored successfully
  });

  it('should store email send failure', () => {
    database.storeEmailSendFailure('test@test.com', 'Test', '<h1>Test</h1>', 'Error');
    // Add assertions to check if the failure was stored successfully
  });
});
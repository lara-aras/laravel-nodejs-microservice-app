const handleSendEmailRequest = require('../src/server/handle-send-email-request');
const httpMocks = require('node-mocks-http');

describe('handle-send-email-request.js tests', () => {
  it('should handle request and response', () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/send-email',
      body: {
        template: 'test',
        recipient: 'test@test.com',
        subject: 'Test',
        parameters: {}
      }
    });
    const res = httpMocks.createResponse();
    handleSendEmailRequest(req, res);
    expect(res._getStatusCode()).toBe(200);
  });
});
const sendEmail = require("../src/email/send-email");

describe("send-email.js tests", () => {
  it("should send email", (done) => {
    const request = {
      recipient: "test@test.com",
      subject: "Test",
      html: "<h1>Test</h1>",
    };
    
    sendEmail(request, (err, sentEmail) => {
      expect(err).toBeNull();
      expect(sentEmail).toBeDefined();
      done();
    });
  });
});

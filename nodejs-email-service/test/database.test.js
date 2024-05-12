const database = require("../src/database/database");

describe("database.js tests", () => {
  it("should store email send success", () => {
    database.storeEmailSendSuccess("test@test.com", "Test", "<h1>Test</h1>");
  });

  it("should store email render failure", () => {
    database.storeEmailSendFailure("test@test.com", "Test", null, "Error");
  });

  it("should store email send failure", () => {
    database.storeEmailSendFailure("test@test.com", "Test", "<h1>Test</h1>", "Error");
  });
});

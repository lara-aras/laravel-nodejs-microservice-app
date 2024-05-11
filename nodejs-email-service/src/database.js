const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./nodejs_email_service.sqlite");

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS sent_emails (email TEXT, subject TEXT, html TEXT, date_sent TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS failed_emails (email TEXT, subject TEXT, html TEXT, error TEXT, date_failed TEXT)"
  );
});

module.exports = {
  storeEmailSendSuccess: (email, subject, html) => {
    const date_sent = new Date().toISOString();
    db.run(
        "INSERT INTO sent_emails VALUES (?, ?, ?, ?)", email, subject, html, date_sent
    );
  },
  storeEmailSendFailure: (email, subject, html, error) => {
    const date_failed = new Date().toISOString();
    db.run(
      "INSERT INTO failed_emails VALUES (?, ?, ?, ?, ?)", email, subject, html, error, date_failed
    );
  },
};
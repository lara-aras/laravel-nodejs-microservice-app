const sqlite3 = require("sqlite3").verbose();
const config = require('../../config/config');

const db = new sqlite3.Database(config.databasePath);

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS sent_emails (recipient TEXT NOT NULL, subject TEXT NOT NULL, html TEXT NOT NULL, date_sent TEXT NOT NULL)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS failed_emails (recipient TEXT NOT NULL, subject TEXT NOT NULL, html TEXT, error TEXT NOT NULL, date_failed TEXT NOT NULL)"
  );
});

module.exports = {
  storeEmailSendSuccess: (recipient, subject, html) => {
    const date_sent = new Date().toISOString();
    db.run(
        "INSERT INTO sent_emails VALUES (?, ?, ?, ?)", recipient, subject, html, date_sent
    );
  },
  storeEmailSendFailure: (recipient, subject, html, error) => {
    const date_failed = new Date().toISOString();
    db.run(
      "INSERT INTO failed_emails VALUES (?, ?, ?, ?, ?)", recipient, subject, html, error, date_failed
    );
  },
};
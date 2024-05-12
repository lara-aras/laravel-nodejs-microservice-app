const sqlite3 = require("sqlite3");
const config = require("../../config/config");

const db = new sqlite3.Database(config.databasePath);

db.serialize(function () {
  db.run(
    `CREATE TABLE IF NOT EXISTS sent_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      html TEXT NOT NULL,
      date_sent DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
  db.run(
    `CREATE TABLE IF NOT EXISTS failed_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      recipient VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      html TEXT,
      error TEXT NOT NULL,
      date_failed DATETIME DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

module.exports = {
  storeEmailSendSuccess: (recipient, subject, html) => {
    const date_sent = new Date().toISOString();

    db.run(
      "INSERT INTO sent_emails VALUES (?, ?, ?, ?)",
      recipient,
      subject,
      html,
      date_sent
    );
  },
  storeEmailSendFailure: (recipient, subject, html, error) => {
    const date_failed = new Date().toISOString();
    db.run(
      "INSERT INTO failed_emails VALUES (?, ?, ?, ?, ?)",
      
      recipient,
      subject,
      html,
      error,
      date_failed
    );
  },
};

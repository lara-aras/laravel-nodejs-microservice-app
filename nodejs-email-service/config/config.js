require("dotenv").config();

module.exports = {
  databasePath: process.env.SQLITE_DATABASE_PATH,
  reservationsEmailAddress: process.env.RESERVATIONS_EMAIL_ADDRESS,
  supportEmailAddress: process.env.SUPPORT_EMAIL_ADDRESS,
};

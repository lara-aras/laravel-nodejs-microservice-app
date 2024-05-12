const ejs = require("ejs");
const path = require("path");
const config = require("../../config/config");

module.exports = (request, callback) => {
  const { template, parameters } = request;

  const filePath = path.resolve(__dirname, `../templates/${template}.ejs`);

  // Render the email template and return the HTML
  ejs.renderFile(
    filePath,
    { ...parameters, supportEmailAddress: config.supportEmailAddress },
    (err, html) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, html);
      }
    }
  );
};

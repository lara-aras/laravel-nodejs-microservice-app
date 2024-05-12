const ejs = require("ejs");
const path = require("path");

module.exports = (request, callback) => {
  const { template, parameters } = request;

  const filePath = path.resolve(__dirname, `./templates/${template}.ejs`);

  // Render the email template and return the HTML
  ejs.renderFile(
    filePath,
    parameters,
    (err, html) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, html);
      }
    }
  );
};

const ejs = require("ejs");
const path = require("path");

module.exports = (request, callback) => {
  const { template, parameters } = request;

  ejs.renderFile(
    path.resolve(__dirname, `./templates/${template}.ejs`),
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

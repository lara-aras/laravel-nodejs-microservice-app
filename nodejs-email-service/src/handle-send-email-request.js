const renderEmail = require("./render-email");

module.exports = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const { template, email, subject, parameters } = JSON.parse(body);

    res.end(`Email "${template}" sent successfully.`);
  });
};

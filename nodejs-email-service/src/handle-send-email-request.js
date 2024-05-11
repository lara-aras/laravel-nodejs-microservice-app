const renderEmail = require("./render-email");

module.exports = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const requestBody = JSON.parse(body);

    renderEmail(requestBody, (err, html) => {
      if (err) {
        console.error(err.message);

        res.statusCode = 500;
        res.end("An error occured while rendering the email.");
      } else {
        const emailHtml = html;
        
        console.log(emailHtml);

        res.statusCode = 200;
        res.end(`Email "${requestBody.template}" sent successfully.`);
      }
    });
  });
};

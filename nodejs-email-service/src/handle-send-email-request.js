const renderEmail = require("./render-email");
const sendEmail = require("./send-email");

module.exports = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const requestBody = JSON.parse(body);

    let emailHtml;

    renderEmail(requestBody, (err, html) => {
      if (err) {
        console.error(err.message);

        res.statusCode = 500;
        res.end("An error occured while rendering the email.");
      } else {
        emailHtml = html;
      }
    });

    sendEmail({ ...requestBody, html: emailHtml }, (err, sentEmail) => {
      if (err) {
        console.error(err.message);

        res.statusCode = 500;
        res.end("An error occured while sending the email.");
      } else {
        console.log(sentEmail);
        
        res.end("Email sent successfully.");
      }
    });
  });
};
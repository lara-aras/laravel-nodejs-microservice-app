const renderEmail = require("./email/render-email");
const sendEmail = require("./email/send-email");
const database = require("./database/database");

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
        database.storeEmailSendFailure(requestBody.email, requestBody.subject, null, err.message);

        res.statusCode = 500;
        res.end("An error occured while rendering the email.");
      } else {
        emailHtml = html;
      }
    });

    sendEmail({ ...requestBody, html: emailHtml }, (err, sentEmail) => {
      if (err) {
        console.error(err.message);
        database.storeEmailSendFailure(requestBody.email, requestBody.subject, emailHtml, err.message);

        res.statusCode = 500;
        res.end("An error occured while sending the email.");
      } else {
        console.log(sentEmail);
        database.storeEmailSendSuccess(requestBody.email, requestBody.subject, emailHtml);

        res.end("Email sent successfully.");
      }
    });
  });
};

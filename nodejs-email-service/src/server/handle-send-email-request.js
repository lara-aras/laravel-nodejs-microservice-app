const renderEmail = require("../email/render-email");
const sendEmail = require("../email/send-email");
const database = require("../database/database");

module.exports = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const requestBody = validateRequestBody(body);

    let emailHtml;

    renderEmail(requestBody, (err, html) => {
      if (err) {
        console.error(err.message);

        database.storeEmailSendFailure(
          requestBody.recipient,
          requestBody.subject,
          null,
          err.message
        );

        res.statusCode = 500;
        res.end("An error occured while rendering the email.");
      } else {
        emailHtml = html;
      }
    });

    sendEmail({ ...requestBody, html: emailHtml }, (err, sentEmail) => {
      if (err) {
        console.error(err.message);

        database.storeEmailSendFailure(
          requestBody.recipient,
          requestBody.subject,
          emailHtml,
          err.message
        );

        res.statusCode = 500;
        res.end("An error occured while sending the email.");
      } else {
        console.log(sentEmail);

        database.storeEmailSendSuccess(
          requestBody.recipient,
          requestBody.subject,
          emailHtml
        );

        res.end("Email sent successfully.");
      }
    });
  });
};

const validateRequestBody = (input) => {
  let requestBody;

  try {
    requestBody = JSON.parse(input);
  } catch (err) {
    console.error(err.message);

    res.statusCode = 400;
    res.end("Invalid JSON input.");
  }

  const requiredFields = ["template", "recipient", "subject", "parameters"];

  for (const field of requiredFields) {
    if (!requestBody[field]) {
      res.statusCode = 400;
      res.end(`Missing required field: ${field}`);
    }
  }

  return requestBody;
};

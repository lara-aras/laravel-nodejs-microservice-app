const http = require("http");
const handleSendEmailRequest = require("./handle-send-email-request");

module.exports = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/send-email" && method === "POST") {
    return handleSendEmailRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});
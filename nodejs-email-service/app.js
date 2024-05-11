const http = require("http");
const handleSendEmailRequest = require("./src/handle-send-email-request");

const server = http.createServer((req, res) => {
  if (req.url === "/send-email" && req.method === "POST") {
    return handleSendEmailRequest(req, res);
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

server.listen(4001, () => {
  console.log("Server listening on port 4001");
});

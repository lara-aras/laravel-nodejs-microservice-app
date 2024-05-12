module.exports = (request, callback) => {
    const { recipient, subject, html } = request;

    const emailToSend = {
        from: "reservations@parkos.com",
        recipient: recipient,
        subject,
        html
    };

    callback(null, emailToSend);
}

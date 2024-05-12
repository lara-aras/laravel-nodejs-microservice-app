module.exports = (request, callback) => {
    const { email, subject, html } = request;

    const emailToSend = {
        from: "reservations@parkos.com",
        to: email,
        subject,
        html
    };

    callback(null, emailToSend);
}

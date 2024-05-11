module.exports = (request, callback) => {
    const { email, subject, html } = request;

    if (!html) {
        callback(new Error('No content supplied for email'), null);
    }

    if (!email) {
        callback(new Error('No recipient specified'), null);
    }

    if (!subject) {
        callback(new Error('No subject specified'), null);
    }

    const emailToSend = {
        from: "reservations@parkos.com",
        to: email,
        subject,
        html
    };

    callback(null, emailToSend);
}

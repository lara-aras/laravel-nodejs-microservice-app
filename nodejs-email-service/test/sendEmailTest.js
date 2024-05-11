const assert = require('assert');
const sendEmail = require('../src/send-email');

describe('sendEmail', function() {
    it('should return the correct email object when all parameters are provided', function(done) {
        const request = {
            email: 'test@example.com',
            subject: 'Test Subject',
            html: '<h1>Test Content</h1>'
        };

        sendEmail(request, (err, emailToSend) => {
            assert.ifError(err);
            assert.deepStrictEqual(emailToSend, {
                from: 'reservations@parkos.com',
                to: 'test@example.com',
                subject: 'Test Subject',
                html: '<h1>Test Content</h1>'
            });
            done();
        });
    });

    it('should return an error when no html is provided', function(done) {
        const request = {
            email: 'test@example.com',
            subject: 'Test Subject'
        };

        sendEmail(request, (err) => {
            assert.strictEqual(err.message, 'No content supplied for email');
            done();
        });
    });

    it('should return an error when no email is provided', function(done) {
        const request = {
            subject: 'Test Subject',
            html: '<h1>Test Content</h1>'
        };

        sendEmail(request, (err) => {
            assert.strictEqual(err.message, 'No recipient specified');
            done();
        });
    });

    it('should return an error when no subject is provided', function(done) {
        const request = {
            email: 'test@example.com',
            html: '<h1>Test Content</h1>'
        };

        sendEmail(request, (err) => {
            assert.strictEqual(err.message, 'No subject specified');
            done();
        });
    });
});
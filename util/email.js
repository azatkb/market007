"use strict";
exports.__esModule = true;
exports.sendEmail = void 0;
var secrets_1 = require("../util/secrets");
var sgMail = require('@sendgrid/mail');
sgMail.setApiKey(secrets_1.SENDGRID_API_KEY);
exports.sendEmail = function (email, subject, text, html) {
    if (html === void 0) { html = null; }
    return new Promise(function (resolve, reject) {
        var msg = {
            to: email,
            from: 'support@ovpcoin.io',
            subject: subject,
            text: text,
            html: html
        };
        sgMail
            .send(msg)
            .then(function () {
            resolve({ code: 200 });
        })["catch"](function (error) {
            reject(error);
        });
    });
};
//# sourceMappingURL=email.js.map
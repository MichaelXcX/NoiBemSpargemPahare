const nodemailer = require('nodemailer');
const { contactFormTemplate } = require('./email.templates');

const mailUser = "cosmingcv17@gmail.com";
const mailPassword = "jupzvjrqwzbfizwh";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: mailUser,
    pass: mailPassword,
  },
});

async function sendEmail(receiverEmail, content) {
  const contacts = {
    from: mailUser,
    to: receiverEmail,
  };
  await transporter.sendMail(Object.assign({}, content, contacts));
}

async function sendContactFormEmail(contactFormData) {
  await sendEmail(
    mailUser,
    contactFormTemplate(contactFormData.name, contactFormData.email, contactFormData.message),
  );
}

module.exports = { sendContactFormEmail, sendEmail };
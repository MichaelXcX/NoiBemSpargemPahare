const contactFormTemplate = (name, email, message) => ({
    subject: `Contact Form from ${name}`,
    text: `${name} has sent the following message:\n\n${message}\n\n You can contact them at ${email}`,
});

const resetPasswordTemplate = link => ({
    subject: 'Reset password for Ce spun automatistii',
    text: `A request for resetting the password of your account was sent.\nClick on this link to reset your password: ${link}\nThis link will expire in 10 minutes`,
});

module.exports = { contactFormTemplate, resetPasswordTemplate };
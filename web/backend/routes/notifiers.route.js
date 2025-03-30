const express = require('express')
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const mailer = require('../helpers/mailer.js')
const router = express.Router()

const accountSid = "AC33858891cdeec5b6afa720bcc30e41ff";
const authToken = "f1f61c80f21b1d7ab21f8bbdcaed9d61";
const client = require('twilio')(accountSid, authToken);


router.post('/warn', async (req, res) => {
    // const message = await client.messages.create({
    //     body: "One of your elders has fallen. Please check on them.",
    //     from: "+15642346384",
    //     to: "+40737924300",
    //   });
    //   console.log(message.body);
    const { phone } = req.body;
    const content = {
        subject: "Elder fall warning",
        text: `One of your elders has fallen. Please check on them.`,
    };
    try {
        await mailer.sendEmail("ciuciuletemihaicm@gmail.com", content);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
})

module.exports = router
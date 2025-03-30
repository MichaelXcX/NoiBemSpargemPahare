const express = require('express')
require('dotenv').config();  // Add this line to load .env file
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const mailer = require('../helpers/mailer.js')
const router = express.Router()
const { Elder } = require('../models/elder.model.js')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.post('/warn', async (req, res) => {
    const { phone, location } = req.body;
    // Date format YYYY-MM-DD hh:mm:ss
    console.log(phone, location)
    const today = new Date().toISOString().slice(0, 19).replace("T", " ");
    const elder = await Elder.findOne({ phone });
    const content = {
        subject: "Elder fall warning",
        text: `One of your elders, ${elder.name}, has fallen. Please check on them. Their location is ${location}. Time when the fall was detected: ${today}.`,
    };
    try {
        await mailer.sendEmail("ciuciuletemihaicm@gmail.com", content);
        console.log("Email sent successfully");
    } 
    catch (error) {
        console.error("Error sending email:", error);
    }

    try {
        if (!client) {
            throw new Error("Twilio credentials not configured. Check your environment variables.");
        }
        const message = await client.messages.create({
            body: `One of your elders, ${elder.name}, has fallen. Please check on them. Their location is ${location}. Time when the fall was detected: ${today}.`,
            from: "+15642346384",
            to: "+40737924300",
        });
        console.log(message.body);
    }
    catch (error) {
        console.error("Error sending SMS:", error.message);
    }
})

module.exports = router
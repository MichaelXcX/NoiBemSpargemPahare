const express = require('express')
require('dotenv').config();  // Add this line to load .env file
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const mailer = require('../helpers/mailer.js')
const router = express.Router()
const { Elder } = require('../models/elder.model.js')
const { Alert } = require('../models/alert.model.js')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


router.post('/warn', async (req, res) => {
    const { phone, location } = req.body;
    // Date format YYYY-MM-DD hh:mm:ss
    const today = new Date().toISOString().slice(0, 19).replace("T", " ");
    const elder = await Elder.findOne({ phone });
    const content = {
        subject: "Elder fall warning",
        text: `One of your elders, ${elder.name}, has fallen. Please check on them. Their location is ${location}. Time when the fall was detected: ${today}.`,
    };
    const alert = new Alert({
        location: location,
        time: today,
        isResolved: false,
        careTaker: elder.caretakerId,
        description: `${elder.name} has fallen. Please check on them. Their location is ${location}`,
        type: "fall",
    });
    try {
        await mailer.sendEmail("ciuciuletemihaicm@gmail.com", content);
        await alert.save();
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
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

router.post('/check-in', async (req, res) => {
    const { phone, location } = req.body;
    const today = new Date().toISOString().slice(0, 19).replace("T", " ");
    const elder = await Elder.findOne({ phone });

    let content = {
        subject: "Elder check-in alert",
        text: `One of your elders, ${elder.name}, requires a check-in at this location ${location}. Message detected at: ${today}.`,
    };

    const alert = new Alert({
        location: location,
        time: today,
        isResolved: false,
        careTaker: elder.caretakerId,
        description: `requires a check-in at this location ${location}.`,
        type: "check-in",
    });
    
    try {
        await mailer.sendEmail("ciuciuletemihaicm@gmail.com", content);
        await alert.save();
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
    } 
    catch (error) {
        console.error("Error sending email:", error);
    }
})

module.exports = router
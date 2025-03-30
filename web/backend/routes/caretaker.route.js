const express = require('express')
const { Caretaker } = require('../models/caretaker.model.js')
const router = express.Router()

// Create a new caretaker
router.post('/', async (req, res) => {
    const { name, age, location, email, phone } = req.body

    const caretaker = new Caretaker({
        name,
        age,
        location,
        email,
        phone
    })

    try {
        await caretaker.save()
        res.status(201).json(caretaker)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

// Get caretaker by email
router.get('/:email', async (req, res) => {
    const { email } = req.params
    console.log(email)
    try {
        // Add await here - this is the fix
        const caretaker = await Caretaker.findOne({ email: email })
        if (!caretaker) {
            return res.status(404).json({ message: 'Caretaker not found' })
        }
        res.status(200).json(caretaker)
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ error: err.message })
    }
})

module.exports = router
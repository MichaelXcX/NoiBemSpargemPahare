const express = require('express')
const router = express.Router()

const { Elder } = require('../models/elder.model.js')
const { Caretaker } = require('../models/caretaker.model.js')

// Create a new elder
router.post('/', async (req, res) => {
    const { name, email, phone, caretakerId } = req.body

    const elder = new Elder({
        name,
        email,
        phone,
        caretakerId
    })

    try {
        await elder.save()
        res.status(201).json(elder)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
// Get all elders from a specific caretaker
router.get('/:caretakerId', async (req, res) => {
    const { caretakerId } = req.params
    try {
        const elders = await Elder.find({ caretakerId })
        res.status(200).json(elders)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

module.exports = router
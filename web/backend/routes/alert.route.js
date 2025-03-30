const express = require('express');
const router = express.Router();
const {Alert} = require('../models/alert.model');

// Create a new alert
router.post('/', async (req, res) => {
    try {
        const {location, time, isResolved, careTaker, description} = req.body;
        const alert = new Alert({location, time, isResolved, careTaker, description});
        await alert.save();
        res.status(201).json(alert);
    } catch (error) {
        res.status(500).json({message: 'Error creating alert', error: error.message});
    }
});

// Get all alerts
router.get('/', async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(500).json({message: 'Error getting alerts', error: error.message});
    }
}); 

// Get a single alert by ID
router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const alert = await Alert.findById(id);
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({message: 'Error getting alert', error: error.message});
    }
});

// Update an alert by ID
router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {location, time, isResolved, careTaker, description} = req.body;
        const alert = await Alert.findByIdAndUpdate(id, {location, time, isResolved, careTaker, description}, {new: true});
        res.status(200).json(alert);
    } catch (error) {
        res.status(500).json({message: 'Error updating alert', error: error.message});
    }
});

// Delete an alert by ID
router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await Alert.findByIdAndDelete(id);
        res.status(200).json({message: 'Alert deleted successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error deleting alert', error: error.message});
    }
});

module.exports = router;







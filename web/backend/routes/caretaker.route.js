const express = require('express')
const { Caretaker } = require('../models/caretaker.model.js')
const router = express.Router()

// Login route for caretakers
router.post('/login', async (req, res) => {
    try {
      const { email } = req.body;
      
      // For now, authenticate just by email (add password authentication later)
      const caretaker = await Caretaker.findOne({ email });
      
      if (!caretaker) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Return user details (exclude sensitive information)
      res.status(200).json({
        id: caretaker._id,
        name: caretaker.name,
        email: caretaker.email,
        phone: caretaker.phone,
        role: 'caretaker'
      });
    } catch (error) {
      res.status(500).json({ message: 'Error during authentication', error: error.message });
    }
  });
  
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

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        
        // Validate required fields
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required fields' });
        }
        
        // Find caretaker by ID and update
        const caretaker = await Caretaker.findById(id);
        
        if (!caretaker) {
            return res.status(404).json({ message: 'Caretaker not found' });
        }
        
        // Check if email is being changed and if it would cause a conflict
        if (email !== caretaker.email) {
            const existingCaretaker = await Caretaker.findOne({ email });
            if (existingCaretaker && existingCaretaker._id.toString() !== id) {
                return res.status(400).json({ message: 'Email already in use by another caretaker' });
            }
        }
        
        // Update caretaker fields
        caretaker.name = name;
        caretaker.email = email;
        caretaker.phone = phone;
        
        // Save the updated caretaker
        const updatedCaretaker = await caretaker.save();
        
        // Return the updated caretaker
        res.status(200).json({
            id: updatedCaretaker._id,
            name: updatedCaretaker.name,
            email: updatedCaretaker.email,
            phone: updatedCaretaker.phone,
        });
    } catch (error) {
        console.error('Error updating caretaker:', error);
        res.status(500).json({ message: 'Error updating caretaker', error: error.message });
    }
});

module.exports = router
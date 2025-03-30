const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const {Elder} = require('./models/elder.model.js')
const {Caretaker} = require('./models/caretaker.model.js')
const notifyRoute = require('./routes/notifiers.route.js')
const eldersRoute = require('./routes/elders.route.js')
const caretakersRoute = require('./routes/caretaker.route.js')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/notifiers', notifyRoute)
app.use('/api/elders', eldersRoute)
app.use('/api/caretakers', caretakersRoute)
// Connect to MongoDB
mongoose.connect('mongodb+srv://MeHigh:MXmskfMqgpCwJ1oC@cluster.60g9n.mongodb.net/hack_it')
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    // seeder()
})

const seeder = async () => {
    try {
        // First check if data already exists to prevent duplicates
        const existingCaretakers = await Caretaker.find({});
        if (existingCaretakers.length > 0) {
            console.log("Database already seeded, skipping...");
            return;
        }

        // Create a caretaker
        const caretaker = new Caretaker({
            name: "Caretaker 1",
            age: 30,
            location: "Location 1",
            email: "caretaker1@gmail.com",
            phone: "+21412345678",
        });

        // Save the caretaker first to get its ID
        await caretaker.save();

        // Create elders and associate them with the caretaker
        // Using caretakerId instead of caretaker to match the schema
        const elders = [
            new Elder({
                name: "Elder 1",
                caretakerId: caretaker._id, // Changed from caretaker to caretakerId
                phone: "+40112345678",
                email: "elder1@example.com", // Added email
            }),
            new Elder({
                name: "Elder 2", 
                caretakerId: caretaker._id, // Changed from caretaker to caretakerId
                phone: "+40112345679",
                email: "elder2@example.com", // Added email
            }),
        ];

        // Save all elders concurrently
        const savedElders = await Promise.all(elders.map(elder => elder.save()));

        // Add elder IDs to the caretaker's assignees
        caretaker.assignees = savedElders.map(elder => elder._id);

        // Save the updated caretaker
        await caretaker.save();

        console.log("Database seeded successfully!");
        console.log("Caretaker:", caretaker);
        console.log("Elders:", savedElders);
    } catch (error) {
        console.error("Error seeding the database:", error.message);
        // Log more detailed error info if available
        if (error.errors) {
            Object.keys(error.errors).forEach(key => {
                console.error(`Field "${key}": ${error.errors[key].message}`);
            });
        }
    }
};
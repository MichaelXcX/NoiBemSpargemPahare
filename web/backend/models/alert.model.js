const Mongoose = require('mongoose');

const mongoose = Mongoose;
const AlertSchema = new Mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now,
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false,
    },
    careTaker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareTaker',
        required: true,
    },
    description: {  
        type: String,
        required: false,
    },
    type: {
        type: String,
        required: true,
    },
});

const Alert = Mongoose.model('Alert', AlertSchema);
module.exports = { Alert };
    

    


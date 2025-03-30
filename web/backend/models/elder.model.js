const Mongoose = require("mongoose");
const {Caretaker} = require("./caretaker.model");
const mongoose = Mongoose;

const elderSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    caretakerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Caretaker,
        required: true
    }
})

const Elder = mongoose.model("Elder", elderSchema);
module.exports = {Elder};
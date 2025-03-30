const Mongoose = require("mongoose");
const {Elder} = require("./elder.model");

const mongoose = Mongoose;
const caretakerSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    assignees: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Elder",
        required: false,
    }
})

const Caretaker = mongoose.model("Caretaker", caretakerSchema);
// export default Caretaker;
module.exports = {Caretaker};
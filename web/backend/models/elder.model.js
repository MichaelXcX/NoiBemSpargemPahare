import { Mongoose } from "mongoose";
import Caretaker from "./caretaker.model";

const mongoose = Mongoose;

const elderSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
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
export default Elder;
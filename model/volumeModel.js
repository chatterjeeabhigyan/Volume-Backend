const mongoose = require("mongoose");
const volumeSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        unique: false
    },
    members: {
        type: [String],
        required: false,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },
    private: {
        type: Boolean,
        required: true,
        unique: false,
        default: false
    }
})
module.exports = mongoose.model("Volumes", volumeSchema);
const mongoose = require("mongoose");
const dimensionSchema = new mongoose.Schema({
    volume: {
        type: String,
        required: true,
        unique: false
    },
    type: {
        type: String,
        required: true,
        unique: false
    },
    name: {
        type: String,
        required: true,
        unique: false
    },

})
module.exports = mongoose.model("Dimensions", dimensionSchema);
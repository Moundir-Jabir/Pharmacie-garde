const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please ADD Name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please ADD Email'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please ADD Email'],
        trim: true,
        min: 6,
        max: 12
    },
    token: {
        type: String,
        unique: true
    },
    role: {
        type: String,
        default: "admin"
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("Admin", authSchema);
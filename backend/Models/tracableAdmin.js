const { ObjectID } = require("bson")
const mongoose = require("mongoose")

const Tracable = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Pharmacie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacie',
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Tracable', Tracable)
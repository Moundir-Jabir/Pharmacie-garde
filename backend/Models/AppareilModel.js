const mongoose = require("mongoose")

const Appareil = mongoose.Schema({
    AdresseIp: {
        type: String,
        required: true,
    },
    e: {
        type: String,
        required: true,
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Appareil', Appareil)
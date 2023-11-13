const mongoose = require("mongoose")

const Pharmacie = mongoose.Schema({
    Nom: {
        type: String,
        required: true,
    },
    Adresse: {
        type: String,
        required: true,
    },
    HeurOpen:{
        type: String,
        required: true,
    },
    HeurClose:{
        type: String,
        required: true,
    },
    Services:{
        type: [String],
        required: true
    },
    NumeroTele: {
        type: String,
        required: true,
    },
    Images:{
        type: [String],
        required: true
    },
    Lon: {
        type: String,
        required: true 
    },
    Lat: {
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Pharmacie', Pharmacie)
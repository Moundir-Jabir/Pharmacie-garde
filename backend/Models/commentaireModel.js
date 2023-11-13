const mongoose = require("mongoose")

const CommentaireSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Commentair: {
        type: String,
        required: true,
    },
    Review: {
        type: Number,
        required: true,
    },
    Pharmacie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pharmacies',
        required: true,
    }
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Commentaire', CommentaireSchema)
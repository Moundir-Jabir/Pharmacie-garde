const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const CommentaireSchema = new Schema({
    nom_utilisateur: {
        type: String,
        trim: true,
        required: true,
        maxlength: 50
    },
    commentaire: {
        type: String,
        trim: true,
        required: true,
        maxlength: 500
    },
    pharmacie: {
        type: ObjectId,
        ref: 'PharmacieModel',
        required: true
    },
    statut: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Commentaire', CommentaireSchema);
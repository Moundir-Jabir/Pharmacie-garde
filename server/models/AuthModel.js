const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "SVP Entrer Votre Name"]
    },
    email: {
        type: String,
        require: [true, "SVP Entrer Votre E-mail"]
    },
    password: {
        type: String,
        require: [true, "SVP Entrer Votre Mot de passe"]
    },
    role: {
        type: String,
        default: "admin"
    },
})

module.exports = mongoose.model("Admin", authSchema);
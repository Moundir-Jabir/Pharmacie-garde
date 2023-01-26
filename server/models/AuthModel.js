const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    Full_Name: {
        type: String,
        require: [true, "SVP Entrer Votre Name"]
    },
    Email: {
        type: String,
        require: [true, "SVP Entrer Votre E-mail"]
    },
    Password: {
        type: String,
        require: [true, "SVP Entrer Votre Mot de passe"]
    },
    Role: {
        type: String,
        default: "admin"
    },
})

module.exports = mongoose.model("Admin", authSchema);
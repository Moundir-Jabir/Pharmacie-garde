const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const Admin = require('../models/AuthModel');
const cookie = require('cookie-parser')

// method : post
// url : api/auth/register
// acces : Public
const register = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Merci de compléter tous les champs !" })
    }
    // Check Email if already exist
    const AdminExists = await Admin.findOne({ email })
    if (AdminExists) {
        return res.status(400).json({ message: "L'administrateur existe déjà" })
    }
    // hash password :
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create Admin : 
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        role
    })
    if (admin) {
        return res.status(201).json({ message: "Administrateur créé avec succès !" })
    } else { return res.status(400).json({ message: "Erreur veuillez réessayer plus tard !" }) }
})

// method : post
// url : api/auth/login
// acces : Public
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check for admin email 
    const admin = await Admin.findOne({ email, role: 'admin' })
    if (admin) {
        const verified = await bcrypt.compare(password, admin.password)
        if (verified) {
            const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET, {
                expiresIn: '24h'
            });
            return res.status(200).json({ token, admin })
        } else {
            return res.status(400).json({ message: "Les informations d'identification invalides" })
        }
    }
    else {
        return res.status(400).json({ message: "Les informations d'identification invalides" })
    }
})


module.exports = { register, login };
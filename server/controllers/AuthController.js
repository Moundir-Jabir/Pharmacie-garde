const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const Admin = require('../Models/AuthModel')
const resetPasswordEmail = require('../Utils/SendEmail')
const cookie = require('cookie-parser')

// method : post
// url : api/auth/register
// acces : Public
const register = asyncHandler(async (req, res) => {

    const { name, email, password, token, role } = req.body
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please ADD All Fields' })
    }

    // Check if user exists
    adminExists = await Admin.findOne({ email })
    if (adminExists) {
        return res.status(400).json({ message: 'User already exists' })
    }

    // Hashed Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User
    const admin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        token: generateToken(),
        role,
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
    const admin = await Admin.findOne({ email }).populate('role')

    if (admin && (await bcrypt.compare(password, admin.password))) {
        const tokengenerat = generateToken(admin._id)
        res.cookie('access', tokengenerat)
        if (admin) {
            res.status(200).json({
                message: 'Welcome to profil',
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token: tokengenerat,
                role : admin.role
            })
            return res.status(200)
        } else {
            res.status(401).json({ message: 'User not verified' })
        }
    } else {
        res.status(401).json({ message: 'Invalid Email Or Password' })
    }
})

// Generate JSON WEB TOKEN (JWT)
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}

module.exports = { register, login }
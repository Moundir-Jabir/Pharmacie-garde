const express = require('express')
const router = express.Router()

//Les Function Authentification
const { register, login, forgetPassword, resetPassword } = require('../controllers/AuthController')

//url : /api/auth

router.post('/register', register)
router.post('/login', login)
router.post('/forgetpassword', forgetPassword)
router.post('/resetpassword/:token', resetPassword)

module.exports = router
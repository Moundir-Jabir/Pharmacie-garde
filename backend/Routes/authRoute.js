const express = require('express')
const router = express.Router()

const { login, forget_password, resetpassword, logout, verify_email_rest } = require('../Controllers/authController')

router.post('/login', login)
router.post('/forgotpassword', forget_password)
router.get('/forgetPassword/:token', verify_email_rest)
router.post('/resetpassword/:token', resetpassword)
router.get('/logout', logout)

module.exports = router
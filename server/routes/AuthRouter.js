const express = require('express')
const router = express.Router()

//Les Function Authentification
const {register,login} = require('../controllers/AuthController')

//url : /api/auth

router.post('/register', register)
router.post('/login', login)

module.exports = router
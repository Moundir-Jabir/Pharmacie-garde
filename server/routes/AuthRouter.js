const express = require('express')
const router = express.Router()

//Les Function Authentification
const {login,register} = require('../controllers/AuthController')

//url : /api/auth
router.post('/login', login)
router.post('/register/', register)

module.exports = router
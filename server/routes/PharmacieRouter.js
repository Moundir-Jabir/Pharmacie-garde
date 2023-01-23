const router = require('express').Router()
const {createPharmacie} = require('../controllers/PharmacieController')

router.post('/createPharmacie', createPharmacie)


module.exports = router
const router = require('express').Router()
const {createPharmacie, updatePharmacie} = require('../controllers/PharmacieController')
const {upload} = require('../middlewares/malter')

router.post('/createPharmacie', upload, createPharmacie)
router.put('/updatePharmacie/:id', updatePharmacie)


module.exports = router
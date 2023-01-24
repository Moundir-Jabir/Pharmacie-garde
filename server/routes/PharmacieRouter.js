const router = require('express').Router()
const {createPharmacie, updatePharmacie, getAllPharmacie} = require('../controllers/PharmacieController')
const {upload} = require('../middlewares/malter')

router.post('/createPharmacie', upload, createPharmacie)
router.put('/updatePharmacie/:id', updatePharmacie)
router.get('/getAllPharmacie', getAllPharmacie)


module.exports = router
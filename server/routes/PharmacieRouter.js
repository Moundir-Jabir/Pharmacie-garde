const router = require('express').Router()
const {createPharmacie, updatePharmacie, getAllPharmacie, getPharmacieById, deletePharmacie,getOpenPharmacies} = require('../controllers/PharmacieController')
const {upload} = require('../middlewares/malter')

router.post('/createPharmacie', upload, createPharmacie)
router.put('/updatePharmacie/:id', upload, updatePharmacie)
router.get('/getAllPharmacie', getAllPharmacie)
router.get('/getPharmacieById/:id', getPharmacieById)
router.get('/getPharmaciesdeGarde', getOpenPharmacies)
router.delete('/deletePharmacie/:id', deletePharmacie)


module.exports = router

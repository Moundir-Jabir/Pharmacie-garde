const express = require('express')
const router = express.Router()
const { upload } = require('../Utils/fileUpload')

const { addPharmacie, updatePharmacie, GetAllPharmacie, GetSinglePharmacie, CountPharmacie, deletePharmacie, GetSinglePha, updateStatus } = require('../Controllers/PharmacieController')

router.post('/add', upload.array('files'), addPharmacie)
router.put('/updatePharmacie/:id', upload.array('files'), updatePharmacie)
router.get('/getAllPharmacie', GetAllPharmacie)
router.get('/getOnePharmacie/:id', GetSinglePharmacie)
router.get('/countPharmacie', CountPharmacie)
router.delete('/deletePharmacie/:id', deletePharmacie)
router.get('/GetSinglePha/:id', GetSinglePha)
router.put('/updateStatus/:id', updateStatus)



module.exports = router
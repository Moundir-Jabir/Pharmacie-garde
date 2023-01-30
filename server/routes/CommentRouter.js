const router = require('express').Router()
const { addComment,getComment } = require('../controllers/commentController')

router.post('/addComment', addComment)
router.get('/getComment/:id', getComment)

// router.put('/updatePharmacie/:id', upload, updatePharmacie)
// router.get('/getAllPharmacie', getAllPharmacie)
// router.get('/getPharmacieById/:id', getPharmacieById)
// router.delete('/deletePharmacie/:id', deletePharmacie)


module.exports = router
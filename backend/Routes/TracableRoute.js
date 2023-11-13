const express = require('express')
const router = express.Router()

const { addTracable, getAllTracable } = require('../Controllers/TracableController')

router.post('/add', addTracable)
router.get('/getall', getAllTracable)


module.exports = router
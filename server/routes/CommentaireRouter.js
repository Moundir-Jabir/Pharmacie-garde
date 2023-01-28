const express = require('express')
const router = express.Router()
const { createCommentaire } = require('../controllers/CommentaireController')

router.post('/:idPharmacie', createCommentaire)

module.exports = router
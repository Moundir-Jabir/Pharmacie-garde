const express = require('express')
const router = express.Router()

const { addCommentair, deleteCommentair, getAllCommentaire, countCommentair } = require('../Controllers/CommentairController')

router.post('/add', addCommentair)
router.delete('/delete/:id', deleteCommentair)
router.get('/getAllCommentaire', getAllCommentaire)
router.get('/countCommentair', countCommentair)


module.exports = router
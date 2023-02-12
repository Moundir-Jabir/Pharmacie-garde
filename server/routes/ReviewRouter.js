const router = require('express').Router()

const {createReview, getAllReviewByIdPharmacie} = require('../controllers/ReviewController')

router.post('/createReview/:id', createReview)
router.get('/getAllReviewByIdPharmacie/:id', getAllReviewByIdPharmacie)


module.exports = router
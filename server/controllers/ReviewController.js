const { tryCatch } = require('../middlewares/tryCatch')
const ReviewModel = require('../models/ReviewModel')
const Pharmacie = require('../models/PharmacieModel')
const asyncHandler = require('express-async-handler')


/**
 * @api {post} api/review/createReview/:id
 * @apiName createReview
 */

const createReview = asyncHandler(async (req, res) => {
    const id = req.params.id
    const review = req.body.review
    const name = req.body.name

    if (!review || !name) {
        res.status(400).json({ mess: 'Please add All fildes' })
    }

    const pharma = await Pharmacie.findById({ _id: id })
    if (!pharma) {
       return res.status(400).json({ mess: 'Pharmacie not found' })
    }

    const reviews = await ReviewModel.create({
        name: name,
        review: review,
        idPharamcie: id
    })

    if (!reviews) {
        res.status(400).json({ mess: 'Riview in not created' })
    }
    if (reviews.review > 5 || reviews.review < 0) {
        res.json({ mess: 'Please add a number between 0 and 5' }, 400)
    }

    return (res.status(201).json({
        reviews,
        mess: 'review created successfuly'
    }))
})


const getAllReviewByIdPharmacie = async (req, res) => {
    const id = req.params.id
    try {
        const pharma = await Pharmacie.findOne({ _id: id })
        if(!pharma) return 
        const getAllReview = await ReviewModel.aggregate([
            {
                $match: {
                    idPharamcie : pharma._id
                }
            },
            {
                $group: {
                    _id: '$idPharamcie',
                    avgRating: { $avg: "$review" },
                },
            },
        ])

        return (res.status(200).json({
            getAllReview,
            mess: 'Review create successfuly'
        }))


    } catch (err) {
        console.log(err);
    }

}



module.exports = { createReview, getAllReviewByIdPharmacie }       
const {tryCatch} = require('../middlewares/tryCatch')
const ReviewModel = require('../models/ReviewModel')
const Pharmacie = require('../models/PharmacieModel')


/**
 * @api {post} api/review/createReview/:id
 * @apiName createReview
 */

const createReview = tryCatch( async (req, res) => {
    const id = req.params.id
    const review = req.body.review

    if (!review) {
        res.status(400).json({mess : 'Please add review'})
    }

    const reviews = await ReviewModel.create({
        review : review,
        idPharamcie : id
    })

    if (!reviews) {
        res.status(400).json({mess : 'Riview in not created'})
    }

    return (res.status(201).json({
        reviews,
        mess : 'review created successfuly'
    }))
})


const getAllReviewByIdPharmacie = async (req, res) => {

    
    
    try {
        const id = await Pharmacie.findOne({ _id: req.params.id })

        // if(!id) return 

        const getAllReview = await ReviewModel.aggregate([

            {
                $match: {
                    
                    idPharamcie: id._id
                }
            },

            {
                $group: {
                    _id: '$idPharamcie',
                    avgRating: { $avg: "$review" },
                },
            },
        ])
        res.send(getAllReview)
        
    } catch (err) {
        console.log(err);
    }

}



module.exports = {createReview, getAllReviewByIdPharmacie}
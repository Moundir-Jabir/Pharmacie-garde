const Commentaire = require('../Models/commentaireModel')
const asyncHandler = require('express-async-handler');


// method  : post
// url     : api/commentair/add
// acces   : private
const addCommentair = asyncHandler(async (req, res) => {
    const { Name, Commentair, Review, Pharmacie } = req.body
    if (!Name || !Commentair || !Review || !Pharmacie) {
        res.status(400)
        throw new Error('please add all fields')
    } else {
        try {
            const commantair = await Commentaire.create({
                Name,
                Commentair,
                Review,
                Pharmacie
            });

            res.status(200).send(commantair)

        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }
})

// method  : delete
// url     : api/commentair/delete/:id
// acces   : private
const deleteCommentair = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const commantair = await Commentaire.findOneAndRemove({ _id: id });
        res.status(200).send({ message: "deleted success" })
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// method  : get
// url     : api/commentair/getAllCommentair
// acces   : private
const getAllCommentaire = asyncHandler(async (req, res) => {
    try {
        const commentair = await Commentaire.find();
        res.status(200).send(commentair)
    }
    catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

// method  : get 
// url     : api/commentair/countCommentair
// acces   : private
const countCommentair = asyncHandler(async (req, res) => {
    const Count = await Commentaire.find({}).countDocuments()
    return res.status(200).send(Count.toString())
})


module.exports = { addCommentair, deleteCommentair, getAllCommentaire, countCommentair }
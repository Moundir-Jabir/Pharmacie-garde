const Tracable = require('../Models/tracableAdmin')
const asyncHandler = require('express-async-handler');


// method  : post
// url     : api/Tracable/add
// acces   : private
const addTracable = asyncHandler(async (req, res) => {
    const { Name, Pharmacie } = req.body
    if (!Name || !Pharmacie) {
        res.status(400)
        throw new Error('please add all fields')
    } else {
        try {
            const tracable = await Tracable.create({
                Name,
                Date: new Date(Date.now()),
                Pharmacie
            });

            res.status(200).send(tracable)

        } catch (error) {
            res.status(400)
            throw new Error(error)
        }
    }
})



// method  : get
// url     : api/tracable/getAll
// acces   : private
const getAllTracable = asyncHandler(async (req, res) => {
    try {
        const tracables = await Tracable.find().populate('Pharmacie')
        res.status(200).send(tracables)
    }
    catch (error) {
        res.status(400)
        throw new Error(error)
    }
})


module.exports = { addTracable, getAllTracable }
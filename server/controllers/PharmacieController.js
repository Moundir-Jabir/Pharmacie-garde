const asyncHandler = require('express-async-handler')
const PharmacieModel = require('../models/PharmacieModel')


/**
 * @api {post} api/pharmacies/createPharmacie 
 * @apiName createPharmacie
 */

const createPharmacie = asyncHandler(async (req, res) => {

    const { name, address, phone, date } = req.body

    if (!name || !address || !phone || !date) {
        res.status(400).json({
            mess: 'Please Add All filed'
        })
    }
    try {
        const pharmacie = await PharmacieModel.create({
            name: name,
            phone: phone,
            address: address,
            date: date
        })

        res.status(201).json({
            pharmacie
        })

    } catch (err) {
        console.log(err);
    }

})





module.exports = { createPharmacie }
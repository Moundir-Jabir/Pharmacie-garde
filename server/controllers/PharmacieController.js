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
        const img = [];
        await req.files.forEach((filePath) => {
            const path = filePath.path.split("\\")
            console.log(path);
            const imgPath = "/" + path[1];
            img.push(imgPath);
        });

        const pharmacie = await PharmacieModel.create({
            image : img,
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

/**
 * @api {put} api/pharmacies/updatePharmacie/:id
 * @apiName updatePharmacie
 */

const updatePharmacie = asyncHandler(async (req, res) => {
    const id = req.params.id


})


module.exports = { createPharmacie, updatePharmacie }
const asyncHandler = require('express-async-handler')
const PharmacieModel = require('../models/PharmacieModel')
const { tryCatch } = require('../middlewares/tryCatch')




/**
 * @api {post} api/pharmacie/createPharmacie 
 * @apiName createPharmacie
 */

const createPharmacie = tryCatch(async (req, res) => {

   

    const { name, address, phone, date } = req.body

    console.log(req.body);

    if (!name || !address || !phone || !date) {
      res.status(400).json({mess : 'Add All fileds'})
    }
    


    const img = [];
    await req.files?.forEach((filePath) => {
        const path = filePath.path.split("\\")
        console.log(path);
        const imgPath = "/" + path[1];
        img.push(imgPath);
    });

    const pharmacie = await PharmacieModel.create({
        image: img,
        name: name,
        phone: phone,
        address: address,
        date: date
    })

    console.log(pharmacie);

    if (!pharmacie) {
        res.status(400).json({mess :'pharmacie not created' })
    }

    return (
        res.status(201).json({
            pharmacie,
            mess: 'pharmacie cretae successfuly'
        })
    )
})

/**
 * @api {put} api/pharmacie/updatePharmacie/:id
 * @apiName updatePharmacie
 */

const updatePharmacie = tryCatch(async (req, res) => {
    const id = req.params.id

    const { name, address, phone, date } = req.body

    if (!name || !address || !phone || !date) {
        res.status(400).json({mess : 'Add All fileds'})
    }

    const img = [];
    await req.files.forEach((filePath) => {
        const path = filePath.path.split("\\")
        console.log(path);
        const imgPath = "/" + path[1];
        img.push(imgPath);
    });

    const pharmacie = await PharmacieModel.findByIdAndUpdate({ _id: id },
        {
            image: img,
            name: name,
            phone: phone,
            address: address,
            date: date
        },{new: true})


        return (
            res.status(201).json({
                pharmacie,
                mess : 'pharmacie update successfuly'
            })
        )

})


/**
 * @api {get} api/pharmacies/getAllPharmacie
 * @apiName getAllPharmacie
 */

const getAllPharmacie = tryCatch(async (req, res) => {

    const pharmacie = await PharmacieModel.find({})

    if (!pharmacie) {
        res.status(400).json({mess : 'Not found'})
    }

    return res.status(200).json({ pharmacie })

})


/**
 * @api {get} api/pharmacies/getPharmacieById/:id
 * @apiName getPharmacieById
 */

const getPharmacieById = tryCatch(async (req, res) => {
     const id = req.params.id

     const pharmacie = await PharmacieModel.findById({_id : id})

     if(!pharmacie){
        res.status(400).json({mess : 'Not Found'})
     }

     return (
        res.status(200).json({
            pharmacie
        })
     )
})

/**
 * @api {delete} api/pharmacies/deletePharmacie/:id
 * @apiName deletePharmacie
 */

const deletePharmacie = tryCatch(async (req, res) => {
    const id = req.params.id

    const pharmacie = await PharmacieModel.findByIdAndDelete({_id : id})

    if(!pharmacie){
        res.status(400).json({mess : 'Not Found'})
    }

    return (
        res.status(201).json({
            pharmacie,
            mess : 'pharmacie delete successfuly'
        })
    )
})


module.exports = { createPharmacie, updatePharmacie, getAllPharmacie, getPharmacieById, deletePharmacie}
const asyncHandler = require('express-async-handler')
const PharmacieModel = require('../models/PharmacieModel')
const { tryCatch } = require('../middlewares/tryCatch')




/**
 * @api {post} api/pharmacie/createPharmacie 
 * @apiName createPharmacie
 */

const createPharmacie = tryCatch(async (req, res) => {


    const { name, address, phone, date_start, date_end, latitude, longtitude } = req.body
 

    if (!name || !address || !phone || !date_start || !date_end || !latitude || !longtitude) {
      res.status(400).json({mess : 'Add All fileds'})
    }

    const img = [];
    await req.files.forEach((filePath) => {
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
        date_start: date_start,
        date_end:date_end,
        latitude:latitude,
        longtitude:longtitude,

    })

    if (!pharmacie) {
        res.status(400).json({ mess: 'pharmacie not created' })
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

    const { name, address, phone, date_start, date_end, latitude, longtitude } = req.body
 

    if (!name || !address || !phone || !date_start || !date_end || !latitude || !longtitude) {
        res.status(400).json({mess : 'Add All fileds'})
    }

    // const img = [];
    // await req.files.forEach((filePath) => {
    //     const path = filePath.path.split("\\")
    //     console.log(path);
    //     const imgPath = "/" + path[1];
    //     img.push(imgPath);
    // });

    const pharmacie = await PharmacieModel.findByIdAndUpdate({ _id: id },
        {
            // image: img,
            name: name,
            phone: phone,
            address: address,
            date_start: date_start,
            date_end:date_end,
            latitude:latitude,
            longtitude:longtitude,
        },{new: true})


    return (
        res.status(201).json({
            pharmacie,
            mess: 'pharmacie update successfuly'
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
        res.status(400).json({ mess: 'Not found' })
    }

    return res.status(200).json({ pharmacie })

})


/**
 * @api {get} api/pharmacie/getPharmacieById/:id
 * @apiName getPharmacieById
 */

const getPharmacieById = tryCatch(async (req, res) => {
 
    const pharmacie = await PharmacieModel.findById(req.params.id)
   
        if(!pharmacie){
            res.status(400).send('Not Found')
        }
        else{
            res.status(200).json({pharmacie})
        }
         
})


/**
 * @api {delete} api/pharmacies/deletePharmacie/:id
 * @apiName deletePharmacie
 */

const deletePharmacie = tryCatch(async (req, res) => {
    const id = req.params.id

    const pharmacie = await PharmacieModel.findByIdAndDelete({ _id: id })

    if (!pharmacie) {
        res.status(400).json({ mess: 'Not Found' })
    }

    return (
        res.status(201).json({
            pharmacie,
            mess: 'pharmacie delete successfuly'
        })
    )
})




const getOpenPharmacies = tryCatch(async (req, res) => {

  const currentDate = new Date();
  const openPharmacies = await PharmacieModel.find({
    open_date: { $lte: currentDate },
    close_date: { $gte: currentDate }
  });

  if(!openPharmacies){
    res.status(400).json({mess : 'No Pharmacy Found'})
}

return (
    res.status(201).json({
        openPharmacies,
        mess : 'pharmacie  de Guarde'
    })
)
})




module.exports = { createPharmacie, updatePharmacie, getAllPharmacie, getPharmacieById, deletePharmacie, getOpenPharmacies}

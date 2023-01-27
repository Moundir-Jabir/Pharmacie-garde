const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ReviewSchema = new Schema({
    review : {
        type : Number,
        required : true,
        enum: [0,1,2,3,4,5]
    },
    idPharamcie : {
        type : mongoose.Types.ObjectId, 
        ref: 'PharmacieModel'
    }
})

module.exports = mongoose.model('ReviewModel',  ReviewSchema);